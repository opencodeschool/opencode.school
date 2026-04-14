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
	// Simple line-by-line parse for scalar values (not multi-line)
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

describe("Portuguese lesson content files", () => {
	it("has the same number of files as English", () => {
		expect(ptLessons.length).toBe(enLessons.length);
	});

	it("has a Portuguese file for every English lesson", () => {
		for (const file of enLessons) {
			expect(ptLessons).toContain(file);
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

describe("Portuguese exercise content files", () => {
	it("has the same number of files as English", () => {
		expect(ptExercises.length).toBe(enExercises.length);
	});

	it("has a Portuguese file for every English exercise", () => {
		for (const file of enExercises) {
			expect(ptExercises).toContain(file);
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
