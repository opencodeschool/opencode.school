// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { initWasm, Resvg } from "@resvg/resvg-wasm";
// @ts-expect-error — Cloudflare Workers handles .wasm imports natively
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";

// Track whether WASM has been initialized
let wasmInitialized = false;

async function ensureWasmInitialized() {
	if (!wasmInitialized) {
		await initWasm(resvgWasm);
		wasmInitialized = true;
	}
}

// Escape XML special characters
export function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

// Wrap text at a given character width, returning lines
export function wrapText(text: string, maxChars: number): string[] {
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

export async function svgToPng(svg: string): Promise<Uint8Array> {
	await ensureWasmInitialized();
	const resvg = new Resvg(svg, {
		fitTo: { mode: "original" },
	});
	const rendered = resvg.render();
	const png = rendered.asPng();
	rendered.free();
	resvg.free();
	return png;
}
