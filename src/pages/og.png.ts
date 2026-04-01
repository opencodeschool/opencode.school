// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { APIRoute } from "astro";
import { svgToPng } from "../lib/og-png";

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

  <!-- Logo / wordmark area -->
  <text x="80" y="200" font-family="'Courier New', Courier, monospace" font-size="72" font-weight="700" fill="#fafaf9" letter-spacing="-2">OpenCode</text>
  <text x="80" y="280" font-family="'Courier New', Courier, monospace" font-size="72" font-weight="700" fill="#78716c" letter-spacing="-2">School</text>

  <!-- Tagline -->
  <text x="80" y="370" font-family="'Courier New', Courier, monospace" font-size="28" fill="#a8a29e" letter-spacing="0">Learn to use OpenCode, the free and</text>
  <text x="80" y="410" font-family="'Courier New', Courier, monospace" font-size="28" fill="#a8a29e" letter-spacing="0">open-source AI coding agent.</text>

  <!-- Bottom URL -->
  <text x="80" y="560" font-family="'Courier New', Courier, monospace" font-size="22" fill="#57534e" letter-spacing="1">opencode.school</text>

  <!-- Decorative bracket elements -->
  <text x="1020" y="320" font-family="'Courier New', Courier, monospace" font-size="200" font-weight="700" fill="#1c1917" letter-spacing="-10">{ }</text>
</svg>`;

export const GET: APIRoute = async () => {
	const png = await svgToPng(svg);
	return new Response(png.buffer as ArrayBuffer, {
		status: 200,
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
