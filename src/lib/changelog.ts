// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

export interface ChangelogEntry {
	slug: string;
	date: string; // YYYY-MM-DD
	title: string;
	description: string;
}

export const changelogEntries: ChangelogEntry[] = [
	{
		slug: "config-permission-overrides",
		date: "2026-04-24",
		title: "Permission overrides in config",
		description:
			"The [Configuration](/lessons/configuration) lesson now shows how to set explicit permission overrides for tools like edit and webfetch in your config file.",
	},
	{
		slug: "themed-code-blocks",
		date: "2026-04-22",
		title: "Themed code blocks",
		description:
			"Code blocks in lesson prose now have a themed border and soft glow to match the agent-prompt card style.",
	},
	{
		slug: "contributing-page",
		date: "2026-04-21",
		title: "New page: Contributing",
		description:
			"A [Contributing](/contributing) page that explains how students can share ideas and report issues as GitHub issues.",
	},
	{
		slug: "mcp-reauth-guidance",
		date: "2026-04-20",
		title: "MCP re-authentication guidance",
		description:
			"The [Tools](/lessons/tools) lesson now covers how to handle expired MCP server authentication and add re-authentication instructions.",
	},
	{
		slug: "ai-gateway-exercise",
		date: "2026-04-15",
		title: "New exercise: Use an AI gateway",
		description:
			"A new [Use an AI gateway](/exercises/use-an-ai-gateway) exercise walks through setting up Cloudflare AI Gateway with OpenCode.",
	},
	{
		slug: "inbox-zero-exercise",
		date: "2026-04-15",
		title: "New exercise: Achieve inbox zero",
		description:
			"A new [Achieve inbox zero](/exercises/achieve-inbox-zero) exercise teaches Gmail management using OpenCode and the gws CLI tool.",
	},
	{
		slug: "github-corner-icon",
		date: "2026-04-15",
		title: "GitHub link on every page",
		description:
			"A fixed GitHub icon in the top-right corner of every page links to the project source code.",
	},
	{
		slug: "permission-keyboard-image",
		date: "2026-04-15",
		title: "Permission fatigue keyboard",
		description:
			"The [Permissions](/lessons/permissions) lesson now features a novelty keyboard image illustrating permission fatigue.",
	},
	{
		slug: "realistic-agents-example",
		date: "2026-04-15",
		title: "Improved AGENTS.md example",
		description:
			"The [Instructions](/lessons/instructions) lesson now uses a realistic AGENTS.md example that shows the breadth of what the file can contain.",
	},
	{
		slug: "json-config-default",
		date: "2026-04-14",
		title: "JSON as default config format",
		description:
			"Lessons now recommend `opencode.json` as the default config filename. Existing `opencode.jsonc` files continue to work.",
	},
	{
		slug: "mcp-discovery-links",
		date: "2026-04-12",
		title: "MCP server discovery links",
		description:
			"The [Tools](/lessons/tools) lesson now links directly to MCP server directories and registries instead of vague references to the ecosystem.",
	},
	{
		slug: "external-directory-config",
		date: "2026-04-12",
		title: "External directory config and tip",
		description:
			"The [Configuration](/lessons/configuration) lesson now includes `external_directory` in the recommended config, and [Tips](/tips) has a new tip about opening a higher-level directory for broader file access.",
	},
	{
		slug: "progress-reset",
		date: "2026-04-09",
		title: "Reset your progress",
		description:
			"Students can now undo individual lesson completions or reset all progress from the [disenroll](/disenroll) page.",
	},
	{
		slug: "more-exercises",
		date: "2026-04-08",
		title: "Two new exercises",
		description:
			"[Use Git and GitHub](/exercises/use-git-and-github) and [Post to social media](/exercises/post-to-social-media) join the exercises lineup.",
	},
	{
		slug: "ai-gateway",
		date: "2026-04-08",
		title: "Cloudflare AI Gateway in the models lesson",
		description:
			"The [Models](/lessons/models) lesson now covers Cloudflare AI Gateway and Workers AI as provider options.",
	},
	{
		slug: "anchor-links",
		date: "2026-04-08",
		title: "Shareable heading links",
		description:
			"Prose headings throughout the site now have anchor links, making it easy to link to a specific section.",
	},
	{
		slug: "plugins-lesson",
		date: "2026-04-07",
		title: "New lesson: Plugins",
		description:
			"A new [Plugins](/lessons/plugins) lesson on extending OpenCode with community and custom plugins.",
	},
	{
		slug: "og-images",
		date: "2026-04-07",
		title: "OpenGraph images",
		description:
			"Every lesson and exercise page now has a unique OpenGraph image for better previews when shared on social media.",
	},
	{
		slug: "skill-creator",
		date: "2026-04-07",
		title: "Skill creator in the skills lesson",
		description:
			"The [Skills](/lessons/skills) lesson now walks through building your own skill from scratch.",
	},
	{
		slug: "not-just-coding",
		date: "2026-04-07",
		title: "OpenCode is not just for coding",
		description:
			"Lesson content and site copy now reflect that OpenCode is a general-purpose AI agent, not exclusively a coding tool.",
	},
	{
		slug: "open-source",
		date: "2026-04-07",
		title: "OpenCode School is now open source",
		description:
			"The [source code](https://github.com/opencodeschool/opencode.school) is available on GitHub under the Apache 2.0 license. Contributions are welcome.",
	},
	{
		slug: "plan-mode-default",
		date: "2026-04-06",
		title: "Plan mode as the default",
		description:
			"The [Configuration](/lessons/configuration) lesson now recommends starting in plan mode with defensive bash permissions, so new students can learn safely.",
	},
	{
		slug: "tips-page",
		date: "2026-04-05",
		title: "New page: Tips and tricks",
		description:
			"Practical guidance for getting the most out of OpenCode, collected on a single [Tips](/tips) page.",
	},
	{
		slug: "tools-and-permissions-content",
		date: "2026-04-05",
		title: "New content in Tools and Permissions",
		description:
			"The [Tools](/lessons/tools) lesson now covers the /mcp command and config editing. The [Permissions](/lessons/permissions) lesson covers external_directory. Both lessons note that Plan mode is not a guaranteed sandbox.",
	},
	{
		slug: "exercises",
		date: "2026-04-03",
		title: "Introducing exercises",
		description:
			"Five hands-on [exercises](/exercises) that go beyond the lesson material: build a website, drive a browser, edit videos, run AI models, and transcribe speech.",
	},
	{
		slug: "about-page",
		date: "2026-04-01",
		title: "New page: About",
		description:
			"An [About](/about) page with project info, logos, and links to the community.",
	},
	{
		slug: "desktop-ui-tour",
		date: "2026-04-01",
		title: "Video tour of the desktop UI",
		description:
			"The [Installation](/lessons/installation) lesson now includes a video walkthrough of the OpenCode desktop interface.",
	},
	{
		slug: "context-windows",
		date: "2026-04-01",
		title: "Explaining context windows",
		description:
			"The [Models](/lessons/models) lesson now covers context windows and how they affect model behavior.",
	},
	{
		slug: "auto-navigate",
		date: "2026-03-31",
		title: "Automatic navigation between lessons",
		description:
			"The browser now moves to the next lesson when an agent marks the current one complete. No more manual clicking between lessons.",
	},
	{
		slug: "interview-lesson",
		date: "2026-03-31",
		title: "New: Interviews for new students",
		description:
			"An [interview lesson](/lessons/interview) that asks about your background and preferences to personalize the rest of the course.",
	},
	{
		slug: "quiz-ux",
		date: "2026-03-31",
		title: "All quiz questions shown at once",
		description:
			"Quizzes now present every question on a single screen instead of walking through them one at a time.",
	},
];
