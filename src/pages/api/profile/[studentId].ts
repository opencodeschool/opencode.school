// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { type StudentProfile, updateProfile } from "../../../lib/progress";
import { isValidStudentId } from "../../../lib/student-id";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "PUT, OPTIONS",
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

const TERMINAL_COMFORT_VALUES = ["beginner", "some", "comfortable"] as const;
const PRIMARY_GOAL_VALUES = [
	"ai-coding",
	"automate",
	"build-projects",
	"curious",
] as const;
const AI_PROVIDER_VALUES = [
	"openai",
	"anthropic",
	"google",
	"local",
	"none",
] as const;

export const OPTIONS: APIRoute = async () => {
	return new Response(null, { status: 204, headers: corsHeaders });
};

export const PUT: APIRoute = async ({ params, request }) => {
	const { studentId } = params;
	if (!studentId || !isValidStudentId(studentId)) {
		return badRequest("Invalid student ID format");
	}

	let body: Partial<StudentProfile>;
	try {
		body = await request.json();
	} catch {
		return badRequest("Invalid JSON body");
	}

	const profile: StudentProfile = {};

	if (typeof body.isSoftwareEngineer === "boolean") {
		profile.isSoftwareEngineer = body.isSoftwareEngineer;
	}

	if (
		body.terminalComfort !== undefined &&
		TERMINAL_COMFORT_VALUES.includes(
			body.terminalComfort as (typeof TERMINAL_COMFORT_VALUES)[number],
		)
	) {
		profile.terminalComfort = body.terminalComfort;
	}

	if (
		body.primaryGoal !== undefined &&
		PRIMARY_GOAL_VALUES.includes(
			body.primaryGoal as (typeof PRIMARY_GOAL_VALUES)[number],
		)
	) {
		profile.primaryGoal = body.primaryGoal;
	}

	if (Array.isArray(body.aiProviders)) {
		profile.aiProviders = body.aiProviders.filter((p) =>
			AI_PROVIDER_VALUES.includes(p as (typeof AI_PROVIDER_VALUES)[number]),
		) as StudentProfile["aiProviders"];
	}

	const progress = await updateProfile(env.PROGRESS, studentId, profile);
	if (!progress) {
		return notFound("Student not found");
	}

	return new Response(JSON.stringify(progress), {
		headers: { "Content-Type": "application/json", ...corsHeaders },
	});
};
