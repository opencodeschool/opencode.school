## Project overview

OpenCode School (opencode.school) is an interactive course that teaches people how to use OpenCode. Built with Astro 6, deployed to Cloudflare Workers, with student progress tracked via Cloudflare KV.

## Stack

- [Astro](https://astro.build) — static site framework
- [Cloudflare Workers](https://workers.cloudflare.com) — hosting
- [Cloudflare KV](https://developers.cloudflare.com/kv/) — student progress storage

## Agent-facing files

This project serves two audiences: human students (via the website) and AI agents (via the API and discovery files). Three files work together to make the API discoverable:

- `public/llms.txt` — plain-text overview of the site and API for LLM agents. Points to the OpenAPI spec and lists all lesson API URLs. This is the first thing an agent reads when visiting the site.
- `public/api/openapi.json` — OpenAPI 3.1 spec describing all API endpoints, request/response schemas, and examples.
- `src/pages/api/lessons/index.ts` and `src/pages/api/lessons/[slug].ts` — the actual API endpoints that serve lesson content and agent instructions as JSON.

When adding or removing API endpoints or lessons, update all three of these in the same commit:

1. Add/update the route handler in `src/pages/api/`
2. Update `public/api/openapi.json` with the new endpoint schema
3. Update `public/llms.txt` if the new endpoint or lesson should be listed

## Lesson content

Each lesson is an MDX file in `src/content/lessons/`. The frontmatter schema (defined in `src/content.config.ts`) includes:

- `title`, `slug`, `description`, `order` — standard metadata
- `agentInstructions` (required) — describes what "done" looks like and how to verify it; used by agents to evaluate and mark completion

When editing lessons, keep `agentInstructions` accurate. It should describe both the verifiable end state and the steps an agent should take to confirm it.

## API endpoints

| Route                      | Method | Purpose                                  |
| -------------------------- | ------ | ---------------------------------------- |
| `/api/lessons`             | GET    | All lessons as JSON (content + criteria) |
| `/api/lessons/{slug}`      | GET    | Single lesson by slug                    |
| `/api/enroll`              | POST   | Generate student ID + progress record    |
| `/api/progress/{studentId}`| GET    | Fetch student progress                   |
| `/api/progress/{studentId}`| PUT    | Mark a lesson complete                   |

All endpoints return JSON with CORS headers. No authentication required.

## Content stripping

The lessons API returns prose-only markdown (HTML, scripts, and interactive components stripped). The stripping logic is in `src/lib/mdx-to-prose.ts`. If you add new interactive HTML patterns to lesson MDX files, check that the stripping function handles them correctly.

## Styles

Use Tailwind's `stone` palette for all dark mode colors (backgrounds, borders, text). Do not use `gray` for dark mode. Light mode may continue to use `gray`.

## Scripts

- `script/dev` — start the dev server
- `script/build` — build for production
- `script/lint` — run Biome linter
- `script/deploy` — build + deploy to Cloudflare

Always run `script/lint` before committing.
