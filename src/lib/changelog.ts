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
		slug: "open-source",
		date: "2026-04-07",
		title: "OpenCode School is now open source",
		description:
			"The [source code](https://github.com/opencodeschool/opencode.school) is available on GitHub under the Apache 2.0 license. Contributions are welcome.",
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
