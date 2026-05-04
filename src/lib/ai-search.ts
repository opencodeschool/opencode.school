// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// The Cloudflare AI Search instance URL is configured in wrangler.jsonc under
// `vars.AI_SEARCH_API_URL`. `astro.config.mjs` reads that value at build time
// and inlines it here via Vite's `define`. Leave the var empty in
// wrangler.jsonc to disable the search UI entirely.
declare const __AI_SEARCH_API_URL__: string;

export const AI_SEARCH_API_URL: string = __AI_SEARCH_API_URL__;
