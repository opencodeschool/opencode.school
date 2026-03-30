// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import {
	type CompletionSource,
	getProgress,
	markLessonComplete,
} from "../../../lib/progress";
import { isValidStudentId } from "../../../lib/student-id";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

function notFound(message: string) {
	return new Response(JSON.stringify({ error: message }), {
		status: 404,
		headers: { "Content-Type": "application/json", ...corsHeaders },
	});
}

function badRequest(message: string) {
	return new Response(JSON.stringify({ error: message }), {
		status: 400,
		headers: { "Content-Type": "application/json", ...corsHeaders },
	});
}

export const OPTIONS: APIRoute = async () => {
	return new Response(null, { status: 204, headers: corsHeaders });
};

export const GET: APIRoute = async ({ params }) => {
	const { studentId } = params;
	if (!studentId || !isValidStudentId(studentId)) {
		return badRequest("Invalid student ID format");
	}

	const progress = await getProgress(env.PROGRESS, studentId);
	if (!progress) {
		return notFound("Student not found");
	}

	return new Response(JSON.stringify(progress), {
		headers: { "Content-Type": "application/json", ...corsHeaders },
	});
};

export const PUT: APIRoute = async ({ params, request }) => {
	const { studentId } = params;
	if (!studentId || !isValidStudentId(studentId)) {
		return badRequest("Invalid student ID format");
	}

	let body: { lessonSlug?: string; source?: string; model?: string };
	try {
		body = await request.json();
	} catch {
		return badRequest("Invalid JSON body");
	}

	if (!body.lessonSlug || typeof body.lessonSlug !== "string") {
		return badRequest('Missing or invalid "lessonSlug" field');
	}

	const source: CompletionSource =
		body.source === "agent" ? "agent" : "browser";

	const model =
		typeof body.model === "string" && body.model.trim()
			? body.model.trim()
			: undefined;

	const progress = await markLessonComplete(
		env.PROGRESS,
		studentId,
		body.lessonSlug,
		source,
		model,
	);
	if (!progress) {
		return notFound("Student not found");
	}

	return new Response(JSON.stringify(progress), {
		headers: { "Content-Type": "application/json", ...corsHeaders },
	});
};
