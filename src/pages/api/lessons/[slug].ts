import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { mdxToProse } from "../../../lib/mdx-to-prose";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, { status: 204, headers: corsHeaders });
};

export const GET: APIRoute = async ({ params }) => {
	const lessons = await getCollection("lessons");
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

	const result = {
		order: lesson.data.order,
		slug: lesson.data.slug,
		title: lesson.data.title,
		description: lesson.data.description,
		acceptanceCriteria: lesson.data.acceptanceCriteria,
		agentInstructions: lesson.data.agentInstructions || null,
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
