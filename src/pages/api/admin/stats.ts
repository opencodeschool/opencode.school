// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Authentication is handled by Cloudflare Access (email domain: cloudflare.com).
// No application-level auth check needed.

import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { getAdminStats } from "../../../lib/admin-stats";

export const GET: APIRoute = async () => {
	const stats = await getAdminStats(env.PROGRESS);

	return new Response(JSON.stringify(stats, null, 2), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
