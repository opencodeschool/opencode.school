// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { StudentProgress } from "./progress";

export interface AdminStats {
	generatedAt: string;
	enrollment: {
		total: number;
		byDate: Record<string, number>;
		thisWeek: number;
		thisMonth: number;
	};
	lessons: {
		completionCounts: Record<string, number>;
		bySource: { browser: number; agent: number };
	};
	funnel: {
		enrolled: number;
		completedFirst: number;
		completedHalf: number;
		completedAll: number;
	};
	profiles: {
		codingExperience: Record<string, number>;
		editor: Record<string, number>;
		os: Record<string, number>;
		terminalComfort: Record<string, number>;
		learningStyle: Record<string, number>;
		depthPreference: Record<string, number>;
	};
	models: Record<string, number>;
	recentEnrollments: Array<{
		id: string;
		createdAt: string;
		lessonsCompleted: number;
	}>;
}

/** Total number of non-stub lessons in the course. */
const TOTAL_LESSONS = 13;

/** Fetch all student records from KV and compute aggregate stats. */
export async function getAdminStats(kv: KVNamespace): Promise<AdminStats> {
	const records = await fetchAllStudents(kv);
	const now = new Date();

	const weekAgo = new Date(now);
	weekAgo.setDate(weekAgo.getDate() - 7);

	const monthAgo = new Date(now);
	monthAgo.setMonth(monthAgo.getMonth() - 1);

	const byDate: Record<string, number> = {};
	let thisWeek = 0;
	let thisMonth = 0;

	const completionCounts: Record<string, number> = {};
	const bySource = { browser: 0, agent: 0 };

	let completedFirst = 0;
	let completedHalf = 0;
	let completedAll = 0;

	const codingExperience: Record<string, number> = {};
	const editor: Record<string, number> = {};
	const os: Record<string, number> = {};
	const terminalComfort: Record<string, number> = {};
	const learningStyle: Record<string, number> = {};
	const depthPreference: Record<string, number> = {};

	const models: Record<string, number> = {};

	const recentEnrollments: AdminStats["recentEnrollments"] = [];

	for (const { id, data } of records) {
		// Enrollment timeline
		const created = new Date(data.createdAt);
		const dateKey = data.createdAt.slice(0, 10);
		byDate[dateKey] = (byDate[dateKey] || 0) + 1;
		if (created >= weekAgo) thisWeek++;
		if (created >= monthAgo) thisMonth++;

		// Lesson completions
		const lessons = data.completedLessons || [];
		for (const l of lessons) {
			completionCounts[l.slug] = (completionCounts[l.slug] || 0) + 1;
			const source = l.source || "browser";
			if (source === "agent") {
				bySource.agent++;
			} else {
				bySource.browser++;
			}
			if (l.model) {
				models[l.model] = (models[l.model] || 0) + 1;
			}
		}

		// Funnel
		if (lessons.length >= 1) completedFirst++;
		if (lessons.length >= Math.ceil(TOTAL_LESSONS / 2)) completedHalf++;
		if (lessons.length >= TOTAL_LESSONS) completedAll++;

		// Profile
		const profile = data.profile;
		if (profile) {
			if (profile.codingExperience) {
				codingExperience[profile.codingExperience] =
					(codingExperience[profile.codingExperience] || 0) + 1;
			}
			if (profile.editor) {
				editor[profile.editor] = (editor[profile.editor] || 0) + 1;
			}
			if (profile.os) {
				os[profile.os] = (os[profile.os] || 0) + 1;
			}
			if (profile.terminalComfort) {
				terminalComfort[profile.terminalComfort] =
					(terminalComfort[profile.terminalComfort] || 0) + 1;
			}
			if (profile.learningStyle) {
				learningStyle[profile.learningStyle] =
					(learningStyle[profile.learningStyle] || 0) + 1;
			}
			if (profile.depthPreference) {
				depthPreference[profile.depthPreference] =
					(depthPreference[profile.depthPreference] || 0) + 1;
			}
		}

		// Recent enrollments (collect all, sort and slice later)
		recentEnrollments.push({
			id,
			createdAt: data.createdAt,
			lessonsCompleted: lessons.length,
		});
	}

	// Sort recent enrollments by date descending, keep latest 20
	recentEnrollments.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	return {
		generatedAt: now.toISOString(),
		enrollment: {
			total: records.length,
			byDate,
			thisWeek,
			thisMonth,
		},
		lessons: { completionCounts, bySource },
		funnel: {
			enrolled: records.length,
			completedFirst,
			completedHalf,
			completedAll,
		},
		profiles: {
			codingExperience,
			editor,
			os,
			terminalComfort,
			learningStyle,
			depthPreference,
		},
		models,
		recentEnrollments: recentEnrollments.slice(0, 20),
	};
}

// -- internal helpers --------------------------------------------------------

interface StudentRecord {
	id: string;
	data: StudentProgress;
}

async function fetchAllStudents(kv: KVNamespace): Promise<StudentRecord[]> {
	const keys: string[] = [];
	let cursor: string | undefined;

	// Paginate through all student keys
	do {
		const list = await kv.list({
			prefix: "student:",
			...(cursor ? { cursor } : {}),
		});
		for (const key of list.keys) {
			keys.push(key.name);
		}
		cursor = list.list_complete ? undefined : list.cursor;
	} while (cursor);

	// Fetch all records in parallel
	const results = await Promise.all(
		keys.map(async (key) => {
			const data = await kv.get<StudentProgress>(key, "json");
			if (!data) return null;
			return { id: key.replace("student:", ""), data };
		}),
	);

	return results.filter((r): r is StudentRecord => r !== null);
}
