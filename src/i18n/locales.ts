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
 * Get the date locale string for toLocaleDateString().
 */
export function getDateLocale(locale: Locale): string {
	const map: Record<Locale, string> = {
		en: "en-US",
		pt: "pt-PT",
	};
	return map[locale];
}
