// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

export type CompletionSource = "browser" | "agent";

export interface CompletedLesson {
	slug: string;
	completedAt: string;
	source: CompletionSource;
	model?: string;
}

export interface StudentProfile {
	codingExperience?: "rookie" | "dabbler" | "builder" | "sage";
	aiTools?: string[];
	editor?: string;
	terminalComfort?: "none" | "some" | "very";
	learningStyle?: "concepts-first" | "hands-on" | "examples";
	depthPreference?: "brief" | "some-context" | "all-details";
	languages?: string[];
	os?: string;
}

export interface StudentProgress {
	completedLessons: CompletedLesson[];
	profile?: StudentProfile;
	createdAt: string;
	updatedAt: string;
	deviceId?: string;
}

// Legacy records stored completedLessons as string[]. Normalize on read.
function normalizeProgress(raw: {
	completedLessons: (string | CompletedLesson)[];
	profile?: StudentProfile;
	createdAt: string;
	updatedAt: string;
}): StudentProgress {
	return {
		...raw,
		completedLessons: raw.completedLessons.map((entry) =>
			typeof entry === "string"
				? {
						slug: entry,
						completedAt: raw.updatedAt,
						source: "browser" as CompletionSource,
					}
				: entry,
		),
	};
}

function kvKey(studentId: string): string {
	return `student:${studentId}`;
}

/** Fetch a student's progress from KV. Returns null if not found. */
export async function getProgress(
	kv: KVNamespace,
	studentId: string,
): Promise<StudentProgress | null> {
	const raw = await kv.get<{
		completedLessons: (string | CompletedLesson)[];
		profile?: StudentProfile;
		createdAt: string;
		updatedAt: string;
	}>(kvKey(studentId), "json");
	return raw ? normalizeProgress(raw) : null;
}

/** Create a new student record in KV. Returns the initial progress object. */
export async function createStudent(
	kv: KVNamespace,
	studentId: string,
	deviceId?: string,
): Promise<StudentProgress> {
	const now = new Date().toISOString();
	const progress: StudentProgress = {
		completedLessons: [],
		createdAt: now,
		updatedAt: now,
		...(deviceId ? { deviceId } : {}),
	};
	await kv.put(kvKey(studentId), JSON.stringify(progress));
	return progress;
}

/**
 * Mark a lesson as complete for a student. Idempotent — marking an already-completed
 * lesson is a no-op. Returns the updated progress, or null if the student doesn't exist.
 */
export async function markLessonComplete(
	kv: KVNamespace,
	studentId: string,
	lessonSlug: string,
	source: CompletionSource = "browser",
	model?: string,
): Promise<StudentProgress | null> {
	const progress = await getProgress(kv, studentId);
	if (!progress) return null;

	if (!progress.completedLessons.some((l) => l.slug === lessonSlug)) {
		const entry: CompletedLesson = {
			slug: lessonSlug,
			completedAt: new Date().toISOString(),
			source,
		};
		if (model) entry.model = model;
		progress.completedLessons.push(entry);
	}
	progress.updatedAt = new Date().toISOString();
	await kv.put(kvKey(studentId), JSON.stringify(progress));
	return progress;
}

/** Fetch a student's profile from KV. Returns null if the student doesn't exist. */
export async function getProfile(
	kv: KVNamespace,
	studentId: string,
): Promise<StudentProfile | null> {
	const progress = await getProgress(kv, studentId);
	if (!progress) return null;
	return progress.profile ?? {};
}

/**
 * Merge partial profile data into a student's existing profile. Returns the
 * updated profile, or null if the student doesn't exist.
 */
export async function updateProfile(
	kv: KVNamespace,
	studentId: string,
	profile: Partial<StudentProfile>,
): Promise<StudentProfile | null> {
	const progress = await getProgress(kv, studentId);
	if (!progress) return null;

	progress.profile = { ...progress.profile, ...profile };
	progress.updatedAt = new Date().toISOString();
	await kv.put(kvKey(studentId), JSON.stringify(progress));
	return progress.profile;
}
