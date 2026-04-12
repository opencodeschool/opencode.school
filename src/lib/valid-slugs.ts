// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { getCollection } from "astro:content";

export async function getValidSlugs(): Promise<{
	lessonSlugs: Set<string>;
	exerciseSlugs: Set<string>;
}> {
	const [lessons, exercises] = await Promise.all([
		getCollection("lessons"),
		getCollection("exercises"),
	]);
	return {
		lessonSlugs: new Set(lessons.map((l) => l.data.slug)),
		exerciseSlugs: new Set(exercises.map((e) => e.data.slug)),
	};
}

/**
 * Validate that a slug exists in the given set. Returns an error message
 * if invalid, or null if valid.
 */
export function validateSlug(
	slug: string,
	validSlugs: Set<string>,
	type: "lesson" | "exercise",
): string | null {
	if (!validSlugs.has(slug)) {
		return `Unknown ${type} slug: "${slug}"`;
	}
	return null;
}
