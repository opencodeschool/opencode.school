// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { getCollection } from "astro:content";
import { defaultLocale, type Locale } from "./locales";

/**
 * Astro's glob loader generates content collection IDs from the file path
 * relative to the base directory, stripping numeric prefixes. For files in
 * `src/content/lessons/en/01-installation.mdx`, the ID might be just
 * "installation" or "en/installation" depending on the Astro version.
 *
 * We detect the ID format at runtime and filter accordingly. If no items
 * have a locale prefix in their ID (because Astro strips directory structure),
 * we return all items (since they're all from the default locale).
 */

function hasLocalePrefix(
	items: Array<{ id: string }>,
	locale: string,
): boolean {
	return items.some(
		(item) =>
			item.id.startsWith(`${locale}/`) || item.id.startsWith(`${locale}\\`),
	);
}

/**
 * Get lessons for a specific locale, falling back to the default locale.
 */
export async function getLocalizedLessons(locale: Locale) {
	const all = await getCollection("lessons");

	// If items have locale prefixes in their IDs, filter by locale
	if (hasLocalePrefix(all, locale)) {
		return all
			.filter((l) => l.id.startsWith(`${locale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	// If requesting non-default locale and those items exist with prefix, use them
	if (locale !== defaultLocale && hasLocalePrefix(all, defaultLocale)) {
		// Fall back to default locale items
		return all
			.filter((l) => l.id.startsWith(`${defaultLocale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	// No locale prefix detected: return all items sorted by order
	// This happens when all content is in the default locale
	return all.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get exercises for a specific locale, falling back to the default locale.
 */
export async function getLocalizedExercises(locale: Locale) {
	const all = await getCollection("exercises");

	if (hasLocalePrefix(all, locale)) {
		return all
			.filter((e) => e.id.startsWith(`${locale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	if (locale !== defaultLocale && hasLocalePrefix(all, defaultLocale)) {
		return all
			.filter((e) => e.id.startsWith(`${defaultLocale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	return all.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Find a single lesson by slug and locale.
 */
export async function getLocalizedLesson(slug: string, locale: Locale) {
	const lessons = await getLocalizedLessons(locale);
	return lessons.find((l) => l.data.slug === slug) || null;
}

/**
 * Find a single exercise by slug and locale.
 */
export async function getLocalizedExercise(slug: string, locale: Locale) {
	const exercises = await getLocalizedExercises(locale);
	return exercises.find((e) => e.data.slug === slug) || null;
}
