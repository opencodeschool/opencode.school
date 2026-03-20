// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { describe, expect, it, vi } from "vitest";
import { generateStudentId, isValidStudentId } from "./student-id";

describe("isValidStudentId", () => {
	it("accepts valid IDs", () => {
		expect(isValidStudentId("curious-hacker-2019")).toBe(true);
		expect(isValidStudentId("based-wizard-1000")).toBe(true);
		expect(isValidStudentId("sharp-coder-9999")).toBe(true);
	});

	it("rejects IDs with wrong format", () => {
		expect(isValidStudentId("")).toBe(false);
		expect(isValidStudentId("single-1234")).toBe(false);
		expect(isValidStudentId("too-many-parts-1234")).toBe(false);
		expect(isValidStudentId("curious-hacker-123")).toBe(false); // 3 digits
		expect(isValidStudentId("curious-hacker-12345")).toBe(false); // 5 digits
		expect(isValidStudentId("Curious-hacker-1234")).toBe(false); // uppercase
		expect(isValidStudentId("curious-hacker-abcd")).toBe(false); // letters instead of digits
	});
});

describe("generateStudentId", () => {
	it("returns a valid student ID without KV", async () => {
		const id = await generateStudentId();
		expect(isValidStudentId(id)).toBe(true);
	});

	it("generates different IDs on successive calls", async () => {
		const ids = new Set<string>();
		for (let i = 0; i < 20; i++) {
			ids.add(await generateStudentId());
		}
		// With 14 adjectives * 11 nouns * 9000 numbers, collisions in 20 tries are near-impossible
		expect(ids.size).toBe(20);
	});

	it("retries when KV returns a collision", async () => {
		let calls = 0;
		const mockKv = {
			get: vi.fn(async () => {
				calls++;
				// First two calls return a collision, third returns null (available)
				return calls <= 2 ? '{"some":"data"}' : null;
			}),
		} as unknown as KVNamespace;

		const id = await generateStudentId(mockKv);
		expect(isValidStudentId(id)).toBe(true);
		expect(mockKv.get).toHaveBeenCalledTimes(3);
	});

	it("throws after exhausting retries", async () => {
		const mockKv = {
			get: vi.fn(async () => '{"some":"data"}'), // always collides
		} as unknown as KVNamespace;

		await expect(generateStudentId(mockKv, 3)).rejects.toThrow(
			"Failed to generate a unique student ID after retries",
		);
		expect(mockKv.get).toHaveBeenCalledTimes(3);
	});
});
