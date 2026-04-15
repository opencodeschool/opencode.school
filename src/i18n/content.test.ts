// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Parse frontmatter from an MDX file. Returns the YAML block as key-value pairs.
 */
function parseFrontmatter(content: string): Record<string, string> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const result: Record<string, string> = {};
	for (const line of match[1].split("\n")) {
		const kv = line.match(/^(\w+):\s*(.+)/);
		if (kv) {
			result[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
		}
	}
	return result;
}

const lessonsDir = join(process.cwd(), "src/content/lessons");
const exercisesDir = join(process.cwd(), "src/content/exercises");

function listMdx(dir: string): string[] {
	try {
		return readdirSync(dir).filter((f) => f.endsWith(".mdx"));
	} catch {
		return [];
	}
}

const enLessons = listMdx(join(lessonsDir, "en"));
const ptLessons = listMdx(join(lessonsDir, "pt"));
const enExercises = listMdx(join(exercisesDir, "en"));
const ptExercises = listMdx(join(exercisesDir, "pt"));

// Build slug sets for fallback tests
function slugsFromDir(dir: string, files: string[]): Set<string> {
	const slugs = new Set<string>();
	for (const file of files) {
		const content = readFileSync(join(dir, file), "utf-8");
		const fm = parseFrontmatter(content);
		if (fm.slug) slugs.add(fm.slug);
	}
	return slugs;
}

const enLessonSlugs = slugsFromDir(join(lessonsDir, "en"), enLessons);
const ptLessonSlugs = slugsFromDir(join(lessonsDir, "pt"), ptLessons);
const enExerciseSlugs = slugsFromDir(join(exercisesDir, "en"), enExercises);
const ptExerciseSlugs = slugsFromDir(join(exercisesDir, "pt"), ptExercises);

// ── Portuguese lesson files ─────────────────────────────────────────

describe("Portuguese lesson content files", () => {
	it("does not have more files than English (no orphaned translations)", () => {
		expect(ptLessons.length).toBeLessThanOrEqual(enLessons.length);
	});

	it("has no orphaned PT lessons (every PT slug exists in EN)", () => {
		for (const slug of ptLessonSlugs) {
			expect(enLessonSlugs.has(slug)).toBe(true);
		}
	});

	it("preserves English slugs in Portuguese files", () => {
		for (const file of ptLessons) {
			const enContent = readFileSync(join(lessonsDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(lessonsDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.slug).toBe(enFm.slug);
		}
	});

	it("preserves English titles in Portuguese lesson files", () => {
		for (const file of ptLessons) {
			const enContent = readFileSync(join(lessonsDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(lessonsDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.title).toBe(enFm.title);
		}
	});

	it("preserves order values in Portuguese files", () => {
		for (const file of ptLessons) {
			const enContent = readFileSync(join(lessonsDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(lessonsDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.order).toBe(enFm.order);
		}
	});

	it("has translated descriptions (different from English)", () => {
		for (const file of ptLessons) {
			const enContent = readFileSync(join(lessonsDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(lessonsDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.description).not.toBe(enFm.description);
		}
	});
});

// ── Portuguese exercise files ───────────────────────────────────────

describe("Portuguese exercise content files", () => {
	it("does not have more files than English (no orphaned translations)", () => {
		expect(ptExercises.length).toBeLessThanOrEqual(enExercises.length);
	});

	it("has no orphaned PT exercises (every PT slug exists in EN)", () => {
		for (const slug of ptExerciseSlugs) {
			expect(enExerciseSlugs.has(slug)).toBe(true);
		}
	});

	it("preserves English slugs in Portuguese files", () => {
		for (const file of ptExercises) {
			const enContent = readFileSync(join(exercisesDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(exercisesDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.slug).toBe(enFm.slug);
		}
	});

	it("has translated titles (different from English)", () => {
		for (const file of ptExercises) {
			const enContent = readFileSync(join(exercisesDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(exercisesDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.title).not.toBe(enFm.title);
		}
	});

	it("has translated descriptions (different from English)", () => {
		for (const file of ptExercises) {
			const enContent = readFileSync(join(exercisesDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(exercisesDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.description).not.toBe(enFm.description);
		}
	});

	it("preserves order values in Portuguese files", () => {
		for (const file of ptExercises) {
			const enContent = readFileSync(join(exercisesDir, "en", file), "utf-8");
			const ptContent = readFileSync(join(exercisesDir, "pt", file), "utf-8");
			const enFm = parseFrontmatter(enContent);
			const ptFm = parseFrontmatter(ptContent);
			expect(ptFm.order).toBe(enFm.order);
		}
	});
});

// ── Per-item fallback contract ──────────────────────────────────────

describe("per-item fallback contract", () => {
	it("PT lesson slugs are a subset of EN lesson slugs", () => {
		for (const slug of ptLessonSlugs) {
			expect(enLessonSlugs.has(slug)).toBe(true);
		}
	});

	it("PT exercise slugs are a subset of EN exercise slugs", () => {
		for (const slug of ptExerciseSlugs) {
			expect(enExerciseSlugs.has(slug)).toBe(true);
		}
	});

	it("at least one EN exercise lacks a PT translation (fallback is exercised)", () => {
		// This confirms the per-item fallback path is real: at least one
		// English exercise has no Portuguese counterpart and will fall back
		// to English content on /pt/ pages. Remove this test if/when all
		// exercises are fully translated.
		const untranslated = [...enExerciseSlugs].filter(
			(s) => !ptExerciseSlugs.has(s),
		);
		expect(untranslated.length).toBeGreaterThan(0);
	});

	it("all EN lessons currently have PT translations", () => {
		// All 14 lessons are translated. If a new lesson is added without
		// a translation, update this test or remove it.
		for (const slug of enLessonSlugs) {
			expect(ptLessonSlugs.has(slug)).toBe(true);
		}
	});
});
