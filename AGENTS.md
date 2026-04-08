See [README.md](README.md) for setup instructions and [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

## Project overview

OpenCode School (opencode.school) is an interactive course that teaches people how to use OpenCode. Built with Astro 6, deployed to Cloudflare Workers, with student progress tracked via Cloudflare KV.

OpenCode is a general-purpose AI agent — not exclusively a coding tool. While it has strong capabilities for software development tasks, it can help with writing, research, data analysis, and many other non-coding tasks. When writing lesson content or agent instructions, avoid framing OpenCode as coding-only.

## Stack

- [Astro](https://astro.build) — static site framework
- [Cloudflare Workers](https://workers.cloudflare.com) — hosting
- [Cloudflare KV](https://developers.cloudflare.com/kv/) — student progress storage (binding: `PROGRESS`)
- [Cloudflare R2](https://developers.cloudflare.com/r2/) — video asset storage (bucket: `opencodeschool-assets`, binding: `ASSETS_BUCKET`, served at `https://assets.opencode.school`)

## Agent-facing files

This project serves two audiences: human students (via the website) and AI agents (via the API and discovery files). Three files work together to make the API discoverable:

- `src/pages/llms.txt.ts` — dynamic Astro route that serves a plain-text overview of the site and API for LLM agents at `/llms.txt`. Points to the OpenAPI spec and gives agents their operating instructions. This is the first thing an agent reads when visiting the site. Do not edit `public/llms.txt` directly — it is not used at runtime.
- `src/pages/api/openapi.json.ts` — dynamic Astro route that serves the OpenAPI 3.1 spec at `/api/openapi.json`, describing all API endpoints, request/response schemas, and examples.
- `src/pages/api/lessons/index.ts` and `src/pages/api/lessons/[slug].ts` — the actual API endpoints that serve lesson content and agent instructions as JSON.

When adding or removing API endpoints or lessons, update both of these in the same commit:

1. Add/update the route handler in `src/pages/api/`
2. Update `src/pages/api/openapi.json.ts` with the new endpoint schema

Agent-facing URLs (`/llms.txt`, `/api/openapi.json`, `/api/instructions/{studentId}`, lesson prompts) must use the current request or page origin, not a hardcoded domain. The lessons API replaces the `{origin}` placeholder in `agentInstructions` with the request origin at serve time, so use `{origin}` in MDX frontmatter when an agent-facing URL needs the site origin.

## Lesson content

Each lesson is an MDX file in `src/content/lessons/`. The frontmatter schema (defined in `src/content.config.ts`) includes:

- `title`, `slug`, `description`, `order` — standard metadata
- `agentInstructions` (required) — describes what "done" looks like and how to verify it; used by agents to evaluate and mark completion

When editing lessons, keep `agentInstructions` accurate. It should describe both the verifiable end state and the steps an agent should take to confirm it.

## Lesson authoring guidelines

### Quiz format

Lessons with `quiz: true` in their frontmatter use a teach → quiz → verify flow. The set of quiz lessons may grow over time. The shared quiz boilerplate is defined in `src/lib/quiz-instructions.ts` and injected by the API layer at runtime — do not copy it into individual MDX files.

For these lessons, `agentInstructions` in the MDX should contain only:

1. A list of four topics to teach and quiz (numbered, one sentence each)
2. A verification step describing what file to read and what to confirm (omit for lessons with no file-system check)

Keep the instructions concise — the API appends the quiz boilerplate automatically.

### Adding new lessons

The numeric prefix in filenames (e.g. `01-`, `02-`) is for human readability only. Lesson ordering is controlled by the `order` frontmatter field. Routing and the API use `slug`, not the filename or `order`. When renaming or adding lessons, keep filenames, `order` values, and `slug` values in sync, but the filename prefix has no functional effect.

When adding a new OpenCode-based lesson with sufficient content:

- Set `quiz: true` in the lesson's frontmatter
- Write `agentInstructions` with four topics and a verification step (no quiz boilerplate)
- Default to four quiz questions; vary only if the lesson has notably more or fewer natural topics
- For stub lessons (`Coming soon.` body), set `quiz: false` until the lesson body is written

## API endpoints

See `src/pages/api/openapi.json.ts` for the full OpenAPI 3.1 spec, including all routes, request/response schemas, and examples. All endpoints return JSON with CORS headers. No authentication required.

## Special pages

The site has three non-lesson pages that are linked from lesson content and the sidebar:

- `/glossary` — definitions for terms used in lessons (e.g. `/glossary#gui`). Lesson MDX files link here frequently.
- `/troubleshooting` — common problems and solutions, including the disenroll flow.
- `/disenroll` — lets a student clear their progress and student ID.

## Content stripping

The lessons API returns prose-only markdown (HTML, scripts, and interactive components stripped). The stripping logic is in `src/lib/mdx-to-prose.ts`. If you add new interactive HTML patterns to lesson MDX files, check that the stripping function handles them correctly.

## Video assets

Videos are stored in R2 and served from `https://assets.opencode.school/video/`. Two scripts manage the workflow:

- `script/encode-video` — encodes a green-screen source video to transparent WebM (Chrome/Firefox/Edge) and MOV (Safari) using ffmpeg. Run this first.
- `script/publish-video` — uploads the encoded files to the `opencodeschool-assets` R2 bucket via `wrangler r2 object put`. Run this after encoding.

## Styles

Use Tailwind's `stone` palette for all dark mode colors (backgrounds, borders, text). Do not use `gray` for dark mode. Light mode may continue to use `gray`.

## Scripts

All development tasks have a corresponding script in the `script/` directory. Always run `script/lint` before committing.

## CI/CD

Two GitHub Actions workflows handle automation:

- `ci.yml` — runs lint and tests on every PR and every non-main push
- `deploy.yml` — builds and deploys to Cloudflare Workers on push to main; do not run `script/deploy` manually
