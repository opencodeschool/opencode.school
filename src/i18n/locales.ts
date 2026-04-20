// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

export const defaultLocale = "en" as const;

export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
	en: "English",
	pt: "Português",
};

/**
 * Extract the locale from a URL pathname.
 * Returns the locale if the path starts with a known locale prefix,
 * otherwise returns the default locale.
 */
export function getLocaleFromPath(pathname: string): Locale {
	const segments = pathname.split("/").filter(Boolean);
	const first = segments[0];
	if (first && locales.includes(first as Locale) && first !== defaultLocale) {
		return first as Locale;
	}
	return defaultLocale;
}

/**
 * Remove the locale prefix from a pathname to get the base path.
 */
export function removeLocalePrefix(pathname: string): string {
	const locale = getLocaleFromPath(pathname);
	if (locale === defaultLocale) return pathname;
	return pathname.replace(`/${locale}`, "") || "/";
}

/**
 * Add a locale prefix to a path. Skips prefix for the default locale.
 */
export function localePath(path: string, locale: Locale): string {
	if (locale === defaultLocale) return path;
	// Don't double-prefix
	if (path.startsWith(`/${locale}/`) || path === `/${locale}`) return path;
	return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Return static paths for the `[...locale]` rest parameter.
 * English maps to `undefined` (no prefix), other locales map to their code.
 */
export function getLocaleStaticPaths() {
	return locales.map((l) => ({
		params: { locale: l === defaultLocale ? undefined : l },
	}));
}

/**
 * Validate and return the locale from the `[...locale]` rest parameter.
 * Returns `null` if the value is not a valid locale.
 */
export function parseLocaleParam(param: string | undefined): Locale | null {
	if (param === undefined) return defaultLocale;
	if (locales.includes(param as Locale) && param !== defaultLocale) {
		return param as Locale;
	}
	return null;
}

/**
 * Get the date locale string for toLocaleDateString().
 */
export function getDateLocale(locale: Locale): string {
	const map: Record<Locale, string> = {
		en: "en-US",
		pt: "pt-PT",
	};
	return map[locale];
}

/**
 * Generate a content collection ID that includes the locale directory prefix.
 * For `en/01-installation.mdx` this produces `en/installation`,
 * allowing the same slug to exist in multiple locale directories.
 *
 * Used as the `generateId` option for Astro's glob content loader.
 */
export function localeAwareId({ entry }: { entry: string }): string {
	// entry is like "en/01-installation.mdx" or "pt/06-models.mdx"
	const parts = entry.replace(/\.\w+$/, "").split("/");
	const locale = parts[0]; // "en" or "pt"
	const filename = parts.slice(1).join("/");
	// Strip numeric prefix (e.g. "01-" from "01-installation")
	const slug = filename.replace(/^\d+-/, "");
	return `${locale}/${slug}`;
}
