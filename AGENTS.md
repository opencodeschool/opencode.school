## Project overview

OpenCode School (opencode.school) is an interactive course that teaches people how to use OpenCode. Built with Astro 6, deployed to Cloudflare Workers, with student progress tracked via Cloudflare KV.

## Stack

- [Astro](https://astro.build) — static site framework
- [Cloudflare Workers](https://workers.cloudflare.com) — hosting
- [Cloudflare KV](https://developers.cloudflare.com/kv/) — student progress storage
- [Cloudflare R2](https://developers.cloudflare.com/r2/) — video asset storage (bucket: `opencodeschool-assets`, served at `https://assets.opencode.school`)

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

## Lesson authoring guidelines

### Quiz format

Lessons with `quiz: true` in their frontmatter use a teach → quiz → verify flow. The set of quiz lessons may grow over time. The shared quiz boilerplate is defined in `src/lib/quiz-instructions.ts` and injected by the API layer at runtime — do not copy it into individual MDX files.

For these lessons, `agentInstructions` in the MDX should contain only:

1. A list of four topics to teach and quiz (numbered, one sentence each)
2. A verification step describing what file to read and what to confirm (omit for lessons with no file-system check)

Keep the instructions concise — the API appends the quiz boilerplate automatically.

### Adding new lessons

When adding a new OpenCode-based lesson with sufficient content:

- Set `quiz: true` in the lesson's frontmatter
- Write `agentInstructions` with four topics and a verification step (no quiz boilerplate)
- Default to four quiz questions; vary only if the lesson has notably more or fewer natural topics
- For stub lessons (`Coming soon.` body), set `quiz: false` until the lesson body is written

## API endpoints

See `public/api/openapi.json` for the full OpenAPI 3.1 spec, including all routes, request/response schemas, and examples. All endpoints return JSON with CORS headers. No authentication required.

## Content stripping

The lessons API returns prose-only markdown (HTML, scripts, and interactive components stripped). The stripping logic is in `src/lib/mdx-to-prose.ts`. If you add new interactive HTML patterns to lesson MDX files, check that the stripping function handles them correctly.

## Styles

Use Tailwind's `stone` palette for all dark mode colors (backgrounds, borders, text). Do not use `gray` for dark mode. Light mode may continue to use `gray`.

## Scripts

All development tasks have a corresponding script in the `script/` directory. Always run `script/lint` before committing.

## CI/CD

Four GitHub Actions workflows handle automation:

- `ci.yml` — runs lint and tests on every PR
- `deploy.yml` — builds and deploys to Cloudflare Workers on push to main; do not run `script/deploy` manually
- `preview.yml` — builds and deploys a preview Worker version on PR open/update, accessible at `https://pr-{N}-opencodeschool.ziki.workers.dev`
- `preview-cleanup.yml` — deletes the preview version and marks the deployment inactive when a PR is closed
