// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { describe, expect, it } from "vitest";
import { mdxToProse } from "./mdx-to-prose";

describe("mdxToProse", () => {
	it("returns empty string for null/undefined/empty input", () => {
		expect(mdxToProse(null)).toBe("");
		expect(mdxToProse(undefined)).toBe("");
		expect(mdxToProse("")).toBe("");
	});

	it("preserves plain markdown", () => {
		const md = "# Hello\n\nThis is a paragraph.\n\n- item one\n- item two";
		expect(mdxToProse(md)).toBe(md);
	});

	it("strips script tags with content", () => {
		const input = '<script>{`console.log("hi")`}</script>\n\nHello';
		expect(mdxToProse(input)).toBe("Hello");
	});

	it("strips self-closing script tags", () => {
		const input = '<script src="https://cdn.example.com/lib.js"/>\n\nHello';
		expect(mdxToProse(input)).toBe("Hello");
	});

	it("strips script tags with src attribute", () => {
		const input =
			'<script src="https://cdn.example.com/lib.js"></script>\n\nHello';
		expect(mdxToProse(input)).toBe("Hello");
	});

	it("strips HTML block elements with class attributes", () => {
		const input =
			'<div class="interactive">\n<button class="btn">Click</button>\n</div>\n\nParagraph here.';
		expect(mdxToProse(input)).toBe("Paragraph here.");
	});

	it("strips self-closing HTML tags with attributes", () => {
		const input = '<div id="foo" class="bar" />\n\nKeep this.';
		expect(mdxToProse(input)).toBe("Keep this.");
	});

	it("strips wrapper divs but keeps surrounding content", () => {
		const input = '<div id="wrapper">\n\nSome content\n\n</div>';
		expect(mdxToProse(input)).toBe("Some content");
	});

	it("strips p tags with attributes but keeps their content", () => {
		const input = '<p class="intro">Important text</p>';
		expect(mdxToProse(input)).toBe("Important text");
	});

	it("collapses excessive blank lines", () => {
		const input = "Line one\n\n\n\n\nLine two";
		expect(mdxToProse(input)).toBe("Line one\n\nLine two");
	});

	it("handles a realistic MDX snippet", () => {
		const input = [
			"# Lesson Title",
			"",
			"Some intro text.",
			"",
			'<script src="https://cdn.example.com/confetti.js"></script>',
			"",
			'<div class="interactive-widget">',
			'  <button class="btn-primary">Do the thing</button>',
			"</div>",
			"",
			"## Next Section",
			"",
			"More content here.",
		].join("\n");

		const result = mdxToProse(input);
		expect(result).toContain("# Lesson Title");
		expect(result).toContain("Some intro text.");
		expect(result).toContain("## Next Section");
		expect(result).toContain("More content here.");
		expect(result).not.toContain("<script");
		expect(result).not.toContain("<button");
	});
});
