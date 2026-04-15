// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { APIRoute } from "astro";
import { getLocalizedLessons } from "../../../i18n/content";
import type { Locale } from "../../../i18n/locales";
import { CONFIG_VALIDATION_INSTRUCTIONS } from "../../../lib/config-validation-instructions";
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

export const GET: APIRoute = async ({ params, request }) => {
	const url = new URL(request.url);
	const origin = url.origin;
	const locale = (url.searchParams.get("locale") || "en") as Locale;
	const lessons = await getLocalizedLessons(locale);
	const lesson = lessons.find((l) => l.data.slug === params.slug);

	if (!lesson) {
		return new Response(JSON.stringify({ error: "Lesson not found" }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
				...corsHeaders,
			},
		});
	}

	let rawInstructions = lesson.data.agentInstructions;
	if (lesson.data.modifiesGlobalConfig) {
		rawInstructions += `\n\n${CONFIG_VALIDATION_INSTRUCTIONS}`;
	}
	if (lesson.data.quiz) {
		rawInstructions += `\n\n${QUIZ_INSTRUCTIONS}`;
	}
	const agentInstructions = rawInstructions.replaceAll("{origin}", origin);

	const result = {
		order: lesson.data.order,
		slug: lesson.data.slug,
		title: lesson.data.title,
		description: lesson.data.description,
		agentOnly: lesson.data.agentOnly,
		agentInstructions,
		content: mdxToProse(lesson.body),
	};

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders,
		},
	});
};
