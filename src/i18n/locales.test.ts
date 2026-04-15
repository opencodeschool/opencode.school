// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { describe, expect, it } from "vitest";
import {
	defaultLocale,
	getDateLocale,
	getLocaleFromPath,
	localeAwareId,
	localeNames,
	localePath,
	locales,
	removeLocalePrefix,
} from "./locales";

describe("locales config", () => {
	it("has en as default locale", () => {
		expect(defaultLocale).toBe("en");
	});

	it("includes en and pt", () => {
		expect(locales).toContain("en");
		expect(locales).toContain("pt");
	});

	it("has display names for each locale", () => {
		expect(localeNames.en).toBe("English");
		expect(localeNames.pt).toBe("Português");
	});
});

describe("getLocaleFromPath", () => {
	it("returns default locale for root path", () => {
		expect(getLocaleFromPath("/")).toBe("en");
	});

	it("returns default locale for English paths", () => {
		expect(getLocaleFromPath("/lessons/installation")).toBe("en");
		expect(getLocaleFromPath("/exercises")).toBe("en");
		expect(getLocaleFromPath("/about")).toBe("en");
	});

	it("returns pt for Portuguese paths", () => {
		expect(getLocaleFromPath("/pt")).toBe("pt");
		expect(getLocaleFromPath("/pt/lessons/installation")).toBe("pt");
		expect(getLocaleFromPath("/pt/exercises")).toBe("pt");
		expect(getLocaleFromPath("/pt/about")).toBe("pt");
	});

	it("returns default locale for unknown prefixes", () => {
		expect(getLocaleFromPath("/fr/lessons/installation")).toBe("en");
		expect(getLocaleFromPath("/de")).toBe("en");
	});

	it("does not treat en as a locale prefix", () => {
		expect(getLocaleFromPath("/en/lessons/installation")).toBe("en");
	});
});

describe("removeLocalePrefix", () => {
	it("returns path unchanged for default locale", () => {
		expect(removeLocalePrefix("/lessons/installation")).toBe(
			"/lessons/installation",
		);
		expect(removeLocalePrefix("/")).toBe("/");
	});

	it("removes pt prefix", () => {
		expect(removeLocalePrefix("/pt/lessons/installation")).toBe(
			"/lessons/installation",
		);
		expect(removeLocalePrefix("/pt/exercises")).toBe("/exercises");
	});

	it("returns / for bare locale path", () => {
		expect(removeLocalePrefix("/pt")).toBe("/");
	});
});

describe("localePath", () => {
	it("returns path unchanged for default locale", () => {
		expect(localePath("/lessons/installation", "en")).toBe(
			"/lessons/installation",
		);
		expect(localePath("/", "en")).toBe("/");
	});

	it("adds locale prefix for non-default locale", () => {
		expect(localePath("/lessons/installation", "pt")).toBe(
			"/pt/lessons/installation",
		);
		expect(localePath("/", "pt")).toBe("/pt/");
		expect(localePath("/exercises", "pt")).toBe("/pt/exercises");
	});

	it("does not double-prefix", () => {
		expect(localePath("/pt/lessons/installation", "pt")).toBe(
			"/pt/lessons/installation",
		);
	});
});

describe("getDateLocale", () => {
	it("returns en-US for English", () => {
		expect(getDateLocale("en")).toBe("en-US");
	});

	it("returns pt-PT for Portuguese", () => {
		expect(getDateLocale("pt")).toBe("pt-PT");
	});
});

describe("localeAwareId", () => {
	it("generates en/slug for English lesson files", () => {
		expect(localeAwareId({ entry: "en/01-installation.mdx" })).toBe(
			"en/installation",
		);
		expect(localeAwareId({ entry: "en/06-models.mdx" })).toBe("en/models");
		expect(localeAwareId({ entry: "en/14-workspaces.mdx" })).toBe(
			"en/workspaces",
		);
	});

	it("generates pt/slug for Portuguese lesson files", () => {
		expect(localeAwareId({ entry: "pt/01-installation.mdx" })).toBe(
			"pt/installation",
		);
		expect(localeAwareId({ entry: "pt/06-models.mdx" })).toBe("pt/models");
	});

	it("generates correct IDs for exercise files", () => {
		expect(localeAwareId({ entry: "en/01-build-a-website.mdx" })).toBe(
			"en/build-a-website",
		);
		expect(localeAwareId({ entry: "pt/05-drive-a-browser.mdx" })).toBe(
			"pt/drive-a-browser",
		);
	});

	it("handles .md extension", () => {
		expect(localeAwareId({ entry: "en/01-installation.md" })).toBe(
			"en/installation",
		);
	});

	it("produces unique IDs for same slug in different locales", () => {
		const enId = localeAwareId({ entry: "en/01-installation.mdx" });
		const ptId = localeAwareId({ entry: "pt/01-installation.mdx" });
		expect(enId).not.toBe(ptId);
		expect(enId).toBe("en/installation");
		expect(ptId).toBe("pt/installation");
	});
});
