// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

/**
 * Strip MDX content down to prose-only markdown.
 * Removes:
 * - <script> tags and their contents
 * - HTML block elements (divs, buttons, etc.) used for interactivity
 * - Inline HTML class attributes
 * Preserves:
 * - Markdown headings, paragraphs, lists, links, code blocks
 * - Simple inline HTML like <strong>, <em>
 */
export function mdxToProse(raw: string | undefined | null): string {
	if (!raw) return "";

	let text = raw;

	// Remove <script> blocks (both <script>{`...`}</script> and <script src="..."></script>)
	text = text.replace(/<script[\s\S]*?<\/script>/gi, "");
	text = text.replace(/<script[^>]*\/>/gi, "");

	// Remove HTML block elements with classes (interactive components)
	// This handles <div ...>...</div>, <button ...>...</button>, <pre ...>...</pre>, <span ...>...</span>, <p ...>...</p>
	// We do multiple passes to handle nesting
	for (let i = 0; i < 5; i++) {
		text = text.replace(
			/<(div|button|span|a)\s+[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/\1>/gi,
			"",
		);
	}

	// Remove any remaining self-closing HTML tags with attributes
	text = text.replace(/<(div|button|span|p)\s+[^>]*\/>/gi, "");

	// Remove empty HTML wrapper divs (like <div id="...">)
	text = text.replace(/<div[^>]*>/gi, "");
	text = text.replace(/<\/div>/gi, "");

	// Remove standalone <p> tags with attributes but keep their content
	text = text.replace(/<p[^>]*>/gi, "");
	text = text.replace(/<\/p>/gi, "");

	// Clean up excessive blank lines
	text = text.replace(/\n{3,}/g, "\n\n");

	return text.trim();
}
