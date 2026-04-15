See [README.md](README.md) for setup instructions and [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

## Project overview

OpenCode School (opencode.school) is an interactive course that teaches people how to use OpenCode. Built with Astro 6, deployed to Cloudflare Workers, with student progress tracked via Cloudflare KV.

OpenCode is a general-purpose AI agent — not exclusively a coding tool. While it has strong capabilities for software development tasks, it can help with writing, research, data analysis, and many other non-coding tasks. When writing lesson content or agent instructions, avoid framing OpenCode as coding-only.

## OpenCode Desktop

Students in this course primarily use OpenCode Desktop — a native Electron-based app with a graphical interface (GUI) where students interact using mouse and keyboard. It is different from the OpenCode TUI (terminal interface) and does not support TUI-specific features like the `/connect` slash command.

Install methods:
- macOS: `brew install --cask opencode-desktop` or download .dmg from opencode.ai/download
- Windows: download installer from opencode.ai/download (WSL recommended)
- Linux: download .deb or .rpm from opencode.ai/download

Several lessons require students to quit and reopen Desktop for changes to take effect (e.g. after editing config, adding MCP servers, installing skills, or installing plugins). When writing lesson content or agent instructions that involve restarting, refer to "OpenCode Desktop" specifically, not just "OpenCode".

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

Each lesson is an MDX file in `src/content/lessons/en/` (English) or `src/content/lessons/pt/` (Portuguese). The frontmatter schema (defined in `src/content.config.ts`) includes:

- `title`, `slug`, `description`, `order` — standard metadata
- `agentInstructions` (required) — describes what "done" looks like and how to verify it; used by agents to evaluate and mark completion

When editing lessons, keep `agentInstructions` accurate. It should describe both the verifiable end state and the steps an agent should take to confirm it. Always use YAML literal block scalars (`|`) for `agentInstructions`, never quoted strings. This keeps instructions readable, produces line-level diffs, and allows paragraph breaks between logical sections.

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

### Title casing

Use sentence case for all titles on the site — page titles, exercise titles, headings, etc. ("Post to social media"), not title case ("Post to Social Media"). Exercise titles follow an imperative verb + object format that describes the action ("Build a website", "Edit videos", "Drive a browser"). Lesson titles are single words, so casing is not a concern there.

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

## Internationalization (i18n)

The site supports multiple languages. English is the default locale (no URL prefix). Non-default locales use a path prefix (e.g. `/pt/` for Portuguese). Currently supported: English (`en`) and Portuguese (`pt`).

### Architecture

- Astro's built-in i18n routing: `defaultLocale: "en"`, `locales: ["en", "pt"]`, `prefixDefaultLocale: false`
- `src/i18n/locales.ts` — locale config, path helpers (`getLocaleFromPath`, `localePath`, `removeLocalePrefix`), `localeAwareId` for content collection IDs
- `src/i18n/ui.ts` — ~150 UI string translations with a `t(key, locale)` helper
- `src/i18n/content.ts` — locale-aware content collection helpers with per-item fallback

### Content organization

- Lessons: `src/content/lessons/en/`, `src/content/lessons/pt/`
- Exercises: `src/content/exercises/en/`, `src/content/exercises/pt/`
- Glossary: `lessons/glossary.md` (English), `lessons/glossary.pt.md` (Portuguese)
- Content IDs use locale prefix (`en/installation`, `pt/installation`) generated by `localeAwareId` in `content.config.ts`

### Per-item content fallback

For each English lesson/exercise, the content helper uses the translated version if it exists, otherwise falls back to the English version. This means:

- New English content automatically appears on all locale pages without requiring a simultaneous translation
- Adding a new lesson or exercise never requires adding a translation at the same time
- Run `script/check-translations` to see which content is missing or stale

### Page routes

- English: `src/pages/*.astro`, `src/pages/lessons/[slug].astro`, `src/pages/exercises/[slug].astro`
- Portuguese: `src/pages/pt/*.astro`, `src/pages/pt/lessons/[slug].astro`, `src/pages/pt/exercises/[slug].astro`
- Portuguese pages set `locale = "pt"` and reuse the same component patterns as English

### Translation rules for lessons

- `title` — stays English (lesson titles are single words)
- `description` — translated
- `slug`, `order`, `quiz`, `modifiesGlobalConfig`, `agentOnly` — preserved unchanged
- `agentInstructions` — stays English (agents handle English instructions well regardless of student language)
- Body prose — translated to pt-PT
- Code blocks containing user-facing prose (e.g. AGENTS.md examples, command descriptions) — translated
- Code blocks containing code syntax, JSON config, shell commands — stays English

### Translation rules for exercises

- `title` — translated (exercise titles are descriptive phrases like "Build a website")
- Everything else follows the same rules as lessons

### Agent-facing text stays English

These files are consumed by AI agents, not students directly. They stay in English regardless of locale:

- `agentInstructions` in all MDX files
- `llms.txt`
- Quiz boilerplate (`src/lib/quiz-instructions.ts`)
- Config validation boilerplate (`src/lib/config-validation-instructions.ts`)
- OpenAPI spec descriptions

### AgentPrompt component

`src/components/AgentPrompt.astro` is locale-aware. It reads the locale from the URL path and:

- Translates the label, copy button, and confirmation text via `t()`
- Translates the prompt body ("Estou inscrito na OpenCode School como...")
- Adds "Responde-me em português." for non-English locales so the agent responds in the student's language

### Browser language detection

On English pages, an inline script checks `navigator.language` for matches against available locales. If a match is found and the user hasn't dismissed it before, a subtle banner suggests switching (e.g. "Este site está disponível em Português."). No automatic redirect. Dismissal is stored in `localStorage`.

### Profile language field

- `language` is an optional field on `StudentProfile` (`"en"` or `"pt"`)
- Set automatically during enrollment based on the page locale
- Confirmed or changed during the interview lesson (Question 1)
- Read by the instructions endpoint (`/api/instructions/{studentId}`) to tell agents which language to respond in
- Documented in `llms.txt` under the student profile section

### Checking translation status

Run `script/check-translations` to see missing and stale translations:

- Missing: English files with no Portuguese counterpart
- Stale: Portuguese files where the English version was modified more recently (based on git log timestamps)
- Always exits 0 (informational, not a CI blocker)

### Adding a new locale

1. Add the locale code to `locales` in `src/i18n/locales.ts`
2. Add the display name to `localeNames`
3. Add a date locale mapping in `getDateLocale`
4. Add all UI strings for the new locale in `src/i18n/ui.ts`
5. Create page mirrors under `src/pages/{locale}/`
6. Create content directories `src/content/lessons/{locale}/` and `src/content/exercises/{locale}/`
7. Create `lessons/glossary.{locale}.md`
8. Add the locale to `astro.config.mjs` `i18n.locales`
9. Add a banner message for the new locale in the language detection script in `Base.astro`
10. Add the locale to `VALID_LOCALE` in `src/pages/api/profile/[studentId].ts` and `src/pages/api/enroll.ts`
11. Update `script/check-translations` if the directory structure differs

## Scripts

All development tasks have a corresponding script in the `script/` directory. Always run `script/lint` before committing.

## CI/CD

Two GitHub Actions workflows handle automation:

- `ci.yml` — runs lint and tests on every PR and every non-main push
- `deploy.yml` — builds and deploys to Cloudflare Workers on push to main; do not run `script/deploy` manually
