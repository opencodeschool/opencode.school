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
		slug: "desktop-provider-flow",
		date: "2026-04-12",
		title: "Updated provider setup instructions",
		description:
			"The [models lesson](/lessons/models) now describes how to add providers in OpenCode Desktop, with the terminal `/connect` command as an alternative.",
	},
	{
		slug: "config-validation",
		date: "2026-04-12",
		title: "Improved config file validation",
		description:
			"Lessons that modify the global OpenCode configuration now automatically validate the file format after each edit, preventing syntax errors that could break OpenCode on restart.",
	},
	{
		slug: "mcp-discovery-links",
		date: "2026-04-12",
		title: "Improved MCP server discovery guidance",
		description:
			"The [Tools](/lessons/tools) lesson now links directly to the official MCP registry and explains how OpenCode can help find and install servers.",
	},
	{
		slug: "external-directory-config",
		date: "2026-04-12",
		title: "External directory configuration",
		description:
			"The [Configuration](/lessons/configuration) lesson now covers the `external_directory` setting, and the [Tips](/tips) page includes guidance on opening higher-level directories for broader project access.",
	},
	{
		slug: "agent-only-lessons",
		date: "2026-04-12",
		title: "Prevent skipping of agent-only lessons",
		description:
			"Certain lessons like the [interview](/lessons/interview) can now only be completed from within OpenCode, preventing students from accidentally skipping important agent-based activities.",
	},
	{
		slug: "config-backup-protection",
		date: "2026-04-12",
		title: "Safer configuration file handling",
		description:
			"The [Configuration](/lessons/configuration) lesson now requires agents to create timestamped backups before modifying existing global OpenCode config files, preventing accidental overwrites.",
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
