// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createStudent,
	getProgress,
	markExerciseComplete,
	markExerciseIncomplete,
	markLessonComplete,
	markLessonIncomplete,
	resetProgress,
} from "./progress";

/** Simple in-memory KV mock. */
function createMockKv(): KVNamespace {
	const store = new Map<string, string>();
	return {
		get: vi.fn(async (key: string, format?: string) => {
			const val = store.get(key) ?? null;
			if (val && format === "json") return JSON.parse(val);
			return val;
		}),
		put: vi.fn(async (key: string, value: string) => {
			store.set(key, value);
		}),
		delete: vi.fn(async (key: string) => {
			store.delete(key);
		}),
		list: vi.fn(),
		getWithMetadata: vi.fn(),
	} as unknown as KVNamespace;
}

describe("createStudent", () => {
	it("creates a new student with empty progress", async () => {
		const kv = createMockKv();
		const progress = await createStudent(kv, "curious-hacker-1234");

		expect(progress.completedLessons).toEqual([]);
		expect(progress.createdAt).toBeTruthy();
		expect(progress.updatedAt).toBeTruthy();
		expect(progress.deviceId).toBeUndefined();
		expect(kv.put).toHaveBeenCalledWith(
			"student:curious-hacker-1234",
			expect.any(String),
		);
	});

	it("stores deviceId when provided", async () => {
		const kv = createMockKv();
		const deviceId = "550e8400-e29b-41d4-a716-446655440000";
		const progress = await createStudent(kv, "crafty-tinkerer-7890", deviceId);

		expect(progress.deviceId).toBe(deviceId);
		const stored = JSON.parse(
			(await kv.get("student:crafty-tinkerer-7890")) as string,
		);
		expect(stored.deviceId).toBe(deviceId);
	});

	it("omits deviceId from stored record when not provided", async () => {
		const kv = createMockKv();
		await createStudent(kv, "vibing-operator-1111");
		const stored = JSON.parse(
			(await kv.get("student:vibing-operator-1111")) as string,
		);
		expect(stored.deviceId).toBeUndefined();
	});
});

describe("getProgress", () => {
	let kv: KVNamespace;

	beforeEach(() => {
		kv = createMockKv();
	});

	it("returns null for a non-existent student", async () => {
		const result = await getProgress(kv, "nobody-here-0000");
		expect(result).toBeNull();
	});

	it("returns progress for an existing student", async () => {
		await createStudent(kv, "sharp-coder-5678");
		const result = await getProgress(kv, "sharp-coder-5678");

		expect(result).not.toBeNull();
		expect(result?.completedLessons).toEqual([]);
	});

	it("normalizes legacy string-based completedLessons", async () => {
		const legacy = {
			completedLessons: ["enrollment", "install-opencode"],
			createdAt: "2025-01-01T00:00:00.000Z",
			updatedAt: "2025-06-15T00:00:00.000Z",
		};
		await kv.put("student:legacy-user-1111", JSON.stringify(legacy));

		const result = await getProgress(kv, "legacy-user-1111");
		expect(result).not.toBeNull();
		expect(result?.completedLessons).toHaveLength(2);
		expect(result?.completedLessons[0]).toEqual({
			slug: "enrollment",
			completedAt: "2025-06-15T00:00:00.000Z",
			source: "browser",
		});
		expect(result?.completedLessons[1]).toEqual({
			slug: "install-opencode",
			completedAt: "2025-06-15T00:00:00.000Z",
			source: "browser",
		});
	});
});

describe("markLessonComplete", () => {
	let kv: KVNamespace;

	beforeEach(() => {
		kv = createMockKv();
	});

	it("returns null for a non-existent student", async () => {
		const result = await markLessonComplete(
			kv,
			"nobody-here-0000",
			"enrollment",
		);
		expect(result).toBeNull();
	});

	it("marks a lesson complete", async () => {
		await createStudent(kv, "clever-maker-3333");
		const result = await markLessonComplete(
			kv,
			"clever-maker-3333",
			"enrollment",
		);

		expect(result).not.toBeNull();
		expect(result?.completedLessons).toHaveLength(1);
		expect(result?.completedLessons[0].slug).toBe("enrollment");
		expect(result?.completedLessons[0].source).toBe("browser");
	});

	it("accepts a source parameter", async () => {
		await createStudent(kv, "nimble-wizard-4444");
		const result = await markLessonComplete(
			kv,
			"nimble-wizard-4444",
			"install-opencode",
			"agent",
		);

		expect(result?.completedLessons[0].source).toBe("agent");
	});

	it("is idempotent — marking the same lesson twice does not duplicate", async () => {
		await createStudent(kv, "smooth-builder-5555");
		await markLessonComplete(kv, "smooth-builder-5555", "enrollment");
		const result = await markLessonComplete(
			kv,
			"smooth-builder-5555",
			"enrollment",
		);

		expect(result?.completedLessons).toHaveLength(1);
	});

	it("can mark multiple different lessons", async () => {
		await createStudent(kv, "lucky-scholar-6666");
		await markLessonComplete(kv, "lucky-scholar-6666", "enrollment");
		const result = await markLessonComplete(
			kv,
			"lucky-scholar-6666",
			"install-opencode",
		);

		expect(result?.completedLessons).toHaveLength(2);
		expect(result?.completedLessons.map((l) => l.slug)).toEqual([
			"enrollment",
			"install-opencode",
		]);
	});
});

describe("markLessonIncomplete", () => {
	let kv: KVNamespace;

	beforeEach(() => {
		kv = createMockKv();
	});

	it("returns null for a non-existent student", async () => {
		const result = await markLessonIncomplete(
			kv,
			"nobody-here-0000",
			"enrollment",
		);
		expect(result).toBeNull();
	});

	it("removes a completed lesson", async () => {
		await createStudent(kv, "eager-learner-1111");
		await markLessonComplete(kv, "eager-learner-1111", "enrollment");
		await markLessonComplete(kv, "eager-learner-1111", "installation");

		const result = await markLessonIncomplete(
			kv,
			"eager-learner-1111",
			"enrollment",
		);

		expect(result?.completedLessons).toHaveLength(1);
		expect(result?.completedLessons[0].slug).toBe("installation");
	});

	it("is a no-op for a lesson that was not completed", async () => {
		await createStudent(kv, "calm-coder-2222");
		await markLessonComplete(kv, "calm-coder-2222", "enrollment");

		const result = await markLessonIncomplete(
			kv,
			"calm-coder-2222",
			"installation",
		);

		expect(result?.completedLessons).toHaveLength(1);
		expect(result?.completedLessons[0].slug).toBe("enrollment");
	});
});

describe("markExerciseIncomplete", () => {
	let kv: KVNamespace;

	beforeEach(() => {
		kv = createMockKv();
	});

	it("returns null for a non-existent student", async () => {
		const result = await markExerciseIncomplete(
			kv,
			"nobody-here-0000",
			"build-a-website",
		);
		expect(result).toBeNull();
	});

	it("removes a completed exercise", async () => {
		await createStudent(kv, "brave-builder-3333");
		await markExerciseComplete(kv, "brave-builder-3333", "build-a-website");
		await markExerciseComplete(kv, "brave-builder-3333", "edit-videos");

		const result = await markExerciseIncomplete(
			kv,
			"brave-builder-3333",
			"build-a-website",
		);

		expect(result?.completedExercises).toHaveLength(1);
		expect(result?.completedExercises[0].slug).toBe("edit-videos");
	});

	it("is a no-op for an exercise that was not completed", async () => {
		await createStudent(kv, "quick-thinker-4444");

		const result = await markExerciseIncomplete(
			kv,
			"quick-thinker-4444",
			"build-a-website",
		);

		expect(result?.completedExercises).toHaveLength(0);
	});
});

describe("resetProgress", () => {
	let kv: KVNamespace;

	beforeEach(() => {
		kv = createMockKv();
	});

	it("returns null for a non-existent student", async () => {
		const result = await resetProgress(kv, "nobody-here-0000");
		expect(result).toBeNull();
	});

	it("clears all lessons and exercises", async () => {
		await createStudent(kv, "fresh-start-5555");
		await markLessonComplete(kv, "fresh-start-5555", "enrollment");
		await markLessonComplete(kv, "fresh-start-5555", "installation");
		await markExerciseComplete(kv, "fresh-start-5555", "build-a-website");

		const result = await resetProgress(kv, "fresh-start-5555");

		expect(result?.completedLessons).toEqual([]);
		expect(result?.completedExercises).toEqual([]);
	});

	it("preserves profile, createdAt, and deviceId", async () => {
		const deviceId = "550e8400-e29b-41d4-a716-446655440000";
		await createStudent(kv, "keeper-of-data-6666", deviceId);
		await markLessonComplete(kv, "keeper-of-data-6666", "enrollment");

		// Manually set a profile on the record
		const progress = await getProgress(kv, "keeper-of-data-6666");
		const stored = {
			...progress,
			profile: { codingExperience: "builder" as const },
		};
		await kv.put("student:keeper-of-data-6666", JSON.stringify(stored));

		const result = await resetProgress(kv, "keeper-of-data-6666");

		expect(result?.completedLessons).toEqual([]);
		expect(result?.profile?.codingExperience).toBe("builder");
		expect(result?.createdAt).toBe(progress?.createdAt);
		expect(result?.deviceId).toBe(deviceId);
	});
});
