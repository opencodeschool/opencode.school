// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStudent, getProgress, markLessonComplete } from "./progress";

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
		expect(kv.put).toHaveBeenCalledWith(
			"student:curious-hacker-1234",
			expect.any(String),
		);
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
