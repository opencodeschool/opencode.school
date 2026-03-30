// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { APIRoute } from "astro";

export const GET: APIRoute = (context) => {
	const origin = new URL(context.request.url).origin;

	const spec = {
		openapi: "3.1.0",
		info: {
			title: "OpenCode School API",
			description:
				"API for fetching lesson content, enrolling students, and tracking progress through OpenCode School.",
			version: "1.0.0",
		},
		servers: [{ url: origin }],
		paths: {
			"/api/lessons": {
				get: {
					summary: "List all lessons",
					description:
						"Returns all lessons sorted by order, including content (as prose markdown), acceptance criteria, and optional agent instructions.",
					responses: {
						"200": {
							description: "Array of all lessons",
							content: {
								"application/json": {
									schema: {
										type: "array",
										items: { $ref: "#/components/schemas/Lesson" },
									},
								},
							},
						},
					},
				},
			},
			"/api/lessons/{slug}": {
				get: {
					summary: "Get a single lesson",
					description:
						"Returns a single lesson by slug, including content (as prose markdown), acceptance criteria, and optional agent instructions.",
					parameters: [
						{
							name: "slug",
							in: "path",
							required: true,
							schema: { type: "string" },
							example: "configuration",
						},
					],
					responses: {
						"200": {
							description: "Lesson found",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Lesson" },
								},
							},
						},
						"404": {
							description: "Lesson not found",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Error" },
								},
							},
						},
					},
				},
			},
			"/api/enroll": {
				post: {
					summary: "Enroll a new student",
					description:
						"Generates a unique student ID (format: adjective-noun-nnnn) and creates an empty progress record.",
					responses: {
						"201": {
							description: "Student enrolled",
							content: {
								"application/json": {
									schema: {
										type: "object",
										properties: {
											studentId: {
												type: "string",
												example: "analytical-pilgrim-5076",
											},
											progress: { $ref: "#/components/schemas/Progress" },
										},
										required: ["studentId", "progress"],
									},
								},
							},
						},
					},
				},
			},
			"/api/progress/{studentId}": {
				get: {
					summary: "Get student progress",
					description:
						"Returns the student's progress, including which lessons they have completed.",
					parameters: [
						{
							name: "studentId",
							in: "path",
							required: true,
							schema: { type: "string" },
							example: "analytical-pilgrim-5076",
						},
					],
					responses: {
						"200": {
							description: "Progress found",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Progress" },
								},
							},
						},
						"400": {
							description: "Invalid student ID format",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Error" },
								},
							},
						},
						"404": {
							description: "Student not found",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Error" },
								},
							},
						},
					},
				},
				put: {
					summary: "Mark a lesson as complete",
					description:
						"Marks a lesson as complete for the given student. Idempotent — marking an already-completed lesson has no effect.",
					parameters: [
						{
							name: "studentId",
							in: "path",
							required: true,
							schema: { type: "string" },
							example: "analytical-pilgrim-5076",
						},
					],
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										lessonSlug: {
											type: "string",
											example: "configuration",
										},
										source: {
											type: "string",
											enum: ["browser", "agent"],
											description:
												'Who marked the lesson complete. Omit or use "browser" for student-initiated completions; use "agent" when an AI agent marks it complete on the student\'s behalf.',
											example: "agent",
										},
										model: {
											type: "string",
											description:
												"The model ID used by the agent to complete this lesson. Agents should always include this field. Example: anthropic/claude-sonnet-4-5",
											example: "anthropic/claude-sonnet-4-5",
										},
									},
									required: ["lessonSlug"],
								},
							},
						},
					},
					responses: {
						"200": {
							description: "Progress updated",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Progress" },
								},
							},
						},
						"400": {
							description: "Invalid request",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Error" },
								},
							},
						},
						"404": {
							description: "Student not found",
							content: {
								"application/json": {
									schema: { $ref: "#/components/schemas/Error" },
								},
							},
						},
					},
				},
			},
		},
		components: {
			schemas: {
				Lesson: {
					type: "object",
					properties: {
						order: { type: "integer", example: 3 },
						slug: { type: "string", example: "configuration" },
						title: { type: "string", example: "Configuration" },
						description: {
							type: "string",
							example: "Create a global configuration file for OpenCode.",
						},
						agentInstructions: {
							type: "string",
							example:
								"Verify completion by reading ~/.config/opencode/opencode.jsonc and confirming it contains the expected keys.",
						},
						content: {
							type: "string",
							description:
								"Lesson content as prose markdown (HTML and scripts stripped).",
						},
					},
					required: [
						"order",
						"slug",
						"title",
						"description",
						"agentInstructions",
						"content",
					],
				},
				CompletedLesson: {
					type: "object",
					properties: {
						slug: { type: "string", example: "configuration" },
						completedAt: { type: "string", format: "date-time" },
						source: { type: "string", enum: ["browser", "agent"] },
						model: {
							type: "string",
							description:
								"The model ID used by the agent to complete this lesson, if applicable.",
							example: "anthropic/claude-sonnet-4-5",
						},
					},
					required: ["slug", "completedAt", "source"],
				},
				Progress: {
					type: "object",
					properties: {
						completedLessons: {
							type: "array",
							items: { $ref: "#/components/schemas/CompletedLesson" },
							example: [
								{
									slug: "installation",
									completedAt: "2026-03-17T12:00:00Z",
									source: "browser",
								},
							],
						},
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
					},
					required: ["completedLessons", "createdAt", "updatedAt"],
				},
				Error: {
					type: "object",
					properties: {
						error: { type: "string" },
					},
					required: ["error"],
				},
			},
		},
	};

	return new Response(JSON.stringify(spec, null, 2), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
