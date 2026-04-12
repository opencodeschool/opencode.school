// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
export const prerender = true;

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { changelogEntries } from "../lib/changelog";

export function GET(context: APIContext) {
	return rss({
		title: "OpenCode School Changelog",
		description: "What's new on OpenCode School.",
		site: context.site?.toString() ?? "https://opencode.school",
		items: changelogEntries.map((entry) => ({
			title: entry.title,
			description: entry.description,
			pubDate: new Date(entry.date),
			link: `/changelog/${entry.slug}`,
		})),
	});
}
