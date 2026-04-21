// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

/**
 * Strip Shiki's per-token colors so code blocks can be styled with the
 * student's chosen theme color via CSS. Tokens are classified using Vesper's
 * foreground palette so the stylesheet can dim comments and emphasize
 * structural tokens without inline styles fighting our rules.
 */
const themeAwareShikiTransformer = {
	name: "school:theme-aware-colors",
	pre(node) {
		if (node.properties && typeof node.properties.style === "string") {
			node.properties.style = node.properties.style
				.split(";")
				.map((d) => d.trim())
				.filter((d) => d && !/^(background-color|color)\s*:/i.test(d))
				.join(";");
			if (!node.properties.style) delete node.properties.style;
		}
	},
	span(node, _line, _col, _lineEl, token) {
		const color = (token?.color || "").toLowerCase();
		const existing = Array.isArray(node.properties?.className)
			? node.properties.className
			: [];
		// Vesper paints comments as #8b8b8b94 (hex + alpha). That prefix is
		// unique to the comment scope in this theme.
		if (color.startsWith("#8b8b8b")) existing.push("tok-comment");
		// #a0a0a0 is Vesper's color for keywords, punctuation, and other
		// structural tokens. Treat them uniformly as "structure".
		else if (color === "#a0a0a0") existing.push("tok-structure");
		node.properties = node.properties || {};
		if (existing.length > 0) node.properties.className = existing;
		if (typeof node.properties.style === "string") {
			node.properties.style = node.properties.style
				.split(";")
				.map((d) => d.trim())
				.filter((d) => d && !/^color\s*:/i.test(d))
				.join(";");
			if (!node.properties.style) delete node.properties.style;
		}
	},
};

export default defineConfig({
	site: "https://opencode.school",
	output: "server",
	adapter: cloudflare(),
	integrations: [mdx()],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{ behavior: "wrap", properties: { class: "heading-anchor" } },
			],
		],
		shikiConfig: {
			theme: "vesper",
			transformers: [themeAwareShikiTransformer],
		},
	},
	security: {
		checkOrigin: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
