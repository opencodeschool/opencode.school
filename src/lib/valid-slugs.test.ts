// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

import { validateSlug } from "./valid-slugs";

const lessonSlugs = new Set([
	"installation",
	"interview",
	"configuration",
	"permissions",
	"instructions",
]);

const exerciseSlugs = new Set([
	"build-a-website",
	"run-ai-models",
	"edit-videos",
]);

describe("validateSlug", () => {
	it("returns null for a valid lesson slug", () => {
		expect(validateSlug("installation", lessonSlugs, "lesson")).toBeNull();
	});

	it("returns null for a valid exercise slug", () => {
		expect(
			validateSlug("build-a-website", exerciseSlugs, "exercise"),
		).toBeNull();
	});

	it("returns an error for an unknown lesson slug", () => {
		expect(validateSlug("nonexistent", lessonSlugs, "lesson")).toBe(
			'Unknown lesson slug: "nonexistent"',
		);
	});

	it("returns an error for an unknown exercise slug", () => {
		expect(validateSlug("internal-data-mcp", exerciseSlugs, "exercise")).toBe(
			'Unknown exercise slug: "internal-data-mcp"',
		);
	});

	it("returns an error for an empty slug", () => {
		expect(validateSlug("", lessonSlugs, "lesson")).toBe(
			'Unknown lesson slug: ""',
		);
	});

	it("is case-sensitive", () => {
		expect(validateSlug("Installation", lessonSlugs, "lesson")).toBe(
			'Unknown lesson slug: "Installation"',
		);
	});
});
