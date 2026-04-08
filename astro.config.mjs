// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

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
		},
	},
	security: {
		checkOrigin: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
