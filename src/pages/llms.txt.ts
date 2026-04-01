// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { APIRoute } from "astro";

export const GET: APIRoute = (context) => {
	const origin = new URL(context.request.url).origin;
	const content = `# OpenCode School

OpenCode School is an interactive course that teaches people how to use OpenCode. 

Students enroll on the homepage (${origin}), get a student ID, then use OpenCode to work through lessons.

When a student gives you their student ID, use the API to fetch their progress and the lesson they want to work. 

Each lesson has \`agentInstructions\` describing what is required and criteria for knowing when a lesson is considered complete. Follow these instructions.

When the lesson criteria are met, mark the lesson complete via API before telling the student, then summarize the lesson and what was accomplished, and ask if they want to proceed to the next lesson. When marking a lesson complete, always include the \`model\` field in the request body with the model ID you are currently running as (e.g. \`anthropic/claude-sonnet-4-5\`).

When presenting multiple choice questions, do not label any answer choice as "Recommended".

## Support channels

If the student has a problem with OpenCode itself (bugs, crashes, unexpected behavior in the OpenCode tool), direct them to the official Anomaly OpenCode Discord: https://opencode.ai/discord

If the student has a problem with OpenCode School (lesson content, enrollment, progress tracking, site issues), guide them to report it on GitHub: https://github.com/opencodeschool/opencode.school/issues — Walk them through the process: they will need a GitHub account to post an issue. If they don't have one, help them understand how to create a free account at https://github.com/signup, then guide them in writing a clear issue with a descriptive title, steps to reproduce, and what they expected vs. what happened.

Download this schema to know how to interact with the API: ${origin}/api/openapi.json
`;
	return new Response(content, {
		status: 200,
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
