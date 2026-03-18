import { defineMiddleware } from "astro:middleware";

// Serve agent-friendly responses to LLM tools like OpenCode's WebFetch.
// No browser sends "text/markdown" in Accept — it's a reliable agent signal.
export const onRequest = defineMiddleware(async ({ request, url }, next) => {
	if (request.headers.get("Accept")?.includes("text/markdown")) {
		// Homepage → serve llms.txt instead of the HTML page
		if (url.pathname === "/") return fetch(new URL("/llms.txt", url));

		// Lesson page → redirect to the JSON API endpoint
		const m = url.pathname.match(/^\/lessons\/([^/]+)\/?$/);
		if (m) return Response.redirect(new URL(`/api/lessons/${m[1]}`, url), 302);
	}
	return next();
});
