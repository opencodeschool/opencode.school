// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

// Wrap text at a given character width, returning lines
function wrapText(text: string, maxChars: number): string[] {
	const words = text.split(" ");
	const lines: string[] = [];
	let current = "";
	for (const word of words) {
		if (current.length === 0) {
			current = word;
		} else if (current.length + 1 + word.length <= maxChars) {
			current += ` ${word}`;
		} else {
			lines.push(current);
			current = word;
		}
	}
	if (current.length > 0) lines.push(current);
	return lines;
}

// Escape XML special characters
function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ params }) => {
	const { slug } = params;

	const lessons = await getCollection("lessons");
	const lesson = lessons.find((l) => l.data.slug === slug);

	if (!lesson) {
		return new Response("Not found", { status: 404 });
	}

	const orderLabel = `Lesson ${String(lesson.data.order).padStart(2, "0")}`;
	const title = lesson.data.title;
	const description = lesson.data.description;

	// Wrap description to ~52 chars per line
	const descLines = wrapText(description, 52);

	// Build description text elements (up to 2 lines)
	const descY = [430, 470];
	const descElements = descLines
		.slice(0, 2)
		.map(
			(line, i) =>
				`<text x="80" y="${descY[i]}" font-family="'Courier New', Courier, monospace" font-size="28" fill="#a8a29e">${escapeXml(line)}</text>`,
		)
		.join("\n  ");

	const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0a09"/>
      <stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid lines -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#292524" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#292524" stroke-width="1"/>

  <!-- Rainbow accent bar at top -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>

  <!-- Lesson number badge -->
  <text x="80" y="160" font-family="'Courier New', Courier, monospace" font-size="22" fill="#57534e" letter-spacing="2">${escapeXml(orderLabel)} · OpenCode School</text>

  <!-- Lesson title -->
  <text x="80" y="290" font-family="'Courier New', Courier, monospace" font-size="80" font-weight="700" fill="#fafaf9" letter-spacing="-2">${escapeXml(title)}</text>

  <!-- Description lines -->
  ${descElements}

  <!-- Bottom URL -->
  <text x="80" y="560" font-family="'Courier New', Courier, monospace" font-size="22" fill="#57534e" letter-spacing="1">opencode.school</text>

  <!-- Decorative bracket elements -->
  <text x="1020" y="320" font-family="'Courier New', Courier, monospace" font-size="200" font-weight="700" fill="#1c1917" letter-spacing="-10">{ }</text>

  <!-- Small CF logo hint (orange dot) -->
  <circle cx="1120" cy="560" r="6" fill="#ea580c"/>
  <text x="1135" y="565" font-family="'Courier New', Courier, monospace" font-size="18" fill="#57534e">Cloudflare</text>
</svg>`;

	return new Response(svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
