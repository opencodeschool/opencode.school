// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { getCollection } from "astro:content";
import { defaultLocale, type Locale } from "./locales";

/**
 * Get lessons for a specific locale with per-item fallback.
 *
 * For each English lesson, use the translated version if it exists in the
 * requested locale. Otherwise fall back to the English version. This ensures
 * new English content is visible on all locale pages even before it's
 * translated.
 */
export async function getLocalizedLessons(locale: Locale) {
	const all = await getCollection("lessons");

	if (locale === defaultLocale) {
		return all
			.filter((l) => l.id.startsWith(`${defaultLocale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	const enLessons = all.filter((l) => l.id.startsWith(`${defaultLocale}/`));
	const localeLessons = all.filter((l) => l.id.startsWith(`${locale}/`));
	const localeBySlug = new Map(localeLessons.map((l) => [l.data.slug, l]));

	// For each English lesson, prefer the locale version if available
	return enLessons
		.map((en) => localeBySlug.get(en.data.slug) || en)
		.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get exercises for a specific locale with per-item fallback.
 */
export async function getLocalizedExercises(locale: Locale) {
	const all = await getCollection("exercises");

	if (locale === defaultLocale) {
		return all
			.filter((e) => e.id.startsWith(`${defaultLocale}/`))
			.sort((a, b) => a.data.order - b.data.order);
	}

	const enExercises = all.filter((e) => e.id.startsWith(`${defaultLocale}/`));
	const localeExercises = all.filter((e) => e.id.startsWith(`${locale}/`));
	const localeBySlug = new Map(localeExercises.map((e) => [e.data.slug, e]));

	return enExercises
		.map((en) => localeBySlug.get(en.data.slug) || en)
		.sort((a, b) => a.data.order - b.data.order);
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
