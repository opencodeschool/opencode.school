// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { mdxToProse } from "../../../lib/mdx-to-prose";
import { QUIZ_INSTRUCTIONS } from "../../../lib/quiz-instructions";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, { status: 204, headers: corsHeaders });
};

export const GET: APIRoute = async () => {
	const lessons = (await getCollection("lessons")).sort(
		(a, b) => a.data.order - b.data.order,
	);

	const result = lessons.map((lesson) => {
		const agentInstructions = lesson.data.quiz
			? `${lesson.data.agentInstructions}\n\n${QUIZ_INSTRUCTIONS}`
			: lesson.data.agentInstructions;

		return {
			order: lesson.data.order,
			slug: lesson.data.slug,
			title: lesson.data.title,
			description: lesson.data.description,
			agentInstructions,
			content: mdxToProse(lesson.body),
		};
	});

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders,
		},
	});
};
