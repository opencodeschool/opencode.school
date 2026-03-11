# agent-plan.md

## What we're building

opencode.school — a static website that teaches people how to use OpenCode. Inspired by [nodeschool.io](https://nodeschool.io), it's a community-friendly, open-source learning resource. It borrows the visual aesthetic of [opencode.ai](https://opencode.ai): monospace typography (Berkeley Mono / IBM Plex Mono fallback stack), dark-first palette with light mode support via `prefers-color-scheme`.

## Target audience

People who are new to agentic coding and may not be comfortable using a terminal. The lessons focus on the OpenCode Desktop app as the primary interface. The terminal app (TUI) is mentioned as an alternative for advanced users, but all instructions, screenshots, and walkthroughs center on the Desktop experience. This keeps the barrier to entry low: download an app, open it, start learning.

## Tech stack

- Hono on Cloudflare Workers (using Hono's JSX renderer for templating)
- Markdown files for lesson content (with YAML frontmatter)
- Static assets served via Workers Assets (`assets.directory` in wrangler.jsonc)
- Tailwind CSS v4 for styling, compiled via the `@tailwindcss/cli` as a build step (outputs to `public/styles/`)
- Cloudflare KV for progress sync (student ID → progress JSON)
- A small amount of vanilla JS for progress tracking (localStorage as local cache, KV as source of truth) and interactive UI (collapsible sections, copy buttons)
- `marked` (or `markdown-it`) for Markdown-to-HTML conversion at request time
- `shiki` for server-side syntax highlighting of code blocks
- TypeScript throughout
- JSONC for Wrangler config (not TOML)
- `.env` for secrets (not `.dev.vars`)

## Deployment

- Initial: `opencodeschool.ziki.workers.dev`
- Custom domain: `opencode.school` (already registered on Cloudflare Registrar)
- GitHub repo: `zeke/opencode.school`

## Project structure

```
opencode.school/
  src/
    index.tsx              # Hono app entry point, all routes
    index.test.ts          # Route-level tests
    layouts/
      base.tsx             # Base HTML layout (head, nav, footer)
    pages/
      home.tsx             # Landing page
      lesson.tsx           # Individual lesson page template
    components/
      header.tsx           # Site header/nav
      footer.tsx           # Footer with GitHub link
      lesson-card.tsx      # Lesson card for homepage listing
      progress.tsx         # Progress indicator component
    lib/
      lessons.ts           # Load and parse lesson markdown files
      lessons.test.ts      # Tests for lesson loading/parsing
      markdown.ts          # Markdown rendering + syntax highlighting config
      markdown.test.ts     # Tests for markdown rendering
      student-id.ts        # Student ID generation (word lists + random number)
      student-id.test.ts   # Tests for student ID generation
  styles/
    main.css               # Tailwind CSS source file (imports, theme, custom styles)
  lessons/
    01-getting-started.md
    02-configuring-opencode.md
    03-agents-md.md
    04-permissions.md
    05-models.md
    06-mcp-servers.md
    07-skills.md
    08-modes.md
    09-not-just-for-coding.md
    10-workspaces.md
  public/
    styles/
      main.css             # Compiled Tailwind output (git-ignored)
    scripts/
      progress.js          # localStorage-based progress tracking
    images/
      github-mark.svg      # GitHub icon for footer
  .github/
    workflows/
      ci.yml               # Lint + test on every push and PR
      deploy.yml           # Deploy to production on push to main
      preview.yml          # Preview deployments for PRs with GitHub Deployments
  script/
    build                  # Build Tailwind CSS
    dev                    # Run local dev server
    lint                   # Run Biome linter
    test                   # Run vitest
    deploy                 # Build + deploy to production
  vitest.config.ts
  biome.json
  wrangler.jsonc
  package.json
  tsconfig.json
  human-plan.md
  agent-plan.md
```

## Lesson format

Each lesson is a Markdown file in `lessons/` with YAML frontmatter:

```yaml
---
title: "Configuring OpenCode"
slug: configuring-opencode
description: "Learn how to set up global config files like opencode.json and AGENTS.md"
order: 2
---

Lesson content here in Markdown...
```

Lessons are read from the filesystem and rendered to HTML by the Hono app at request time. The `order` field controls display order on the homepage. The `slug` determines the URL path (`/lessons/configuring-opencode`).

## Pages and routes

| Route                      | Method | Description                                      |
| -------------------------- | ------ | ------------------------------------------------ |
| `/`                        | GET    | Homepage with lesson listing and intro text      |
| `/lessons/:slug`           | GET    | Individual lesson page                           |
| `/api/enroll`              | POST   | Generate a new student ID, store in KV           |
| `/api/progress/:studentId` | GET    | Fetch progress for a student ID (404 if unknown) |
| `/api/progress/:studentId` | PUT    | Update progress for a student ID                 |

## Lessons to write (v1)

1. **Getting Started** — Download and install the OpenCode Desktop app (macOS, Windows, Linux). Walk through opening it for the first time. Mention that a terminal version also exists for advanced users (`curl -fsSL https://opencode.ai/install | bash`), but keep the focus on Desktop. No `/init` coverage here — just get it installed and launched.

2. **Configuring OpenCode** — The global `~/.config/opencode/opencode.json` config file, the `$schema` property, key settings. Explain how to open this file from within the Desktop app. Mentions that project-level config also exists but focuses on global config.

3. **AGENTS.md** — The global `~/.config/opencode/AGENTS.md` file: what it is, what to put in it, example rules. Mentions project-level AGENTS.md and `/init` briefly, but focuses on the global file as a way to set personal preferences across all sessions.

4. **Permissions** — Start with wide-open permissions: `"permission": {"*": "allow"}`. Explain the three permission levels (`allow`, `ask`, `deny`). Then show how to progressively restrict: deny `.env` reads, require approval for bash commands, etc. Granular object syntax, wildcards.

5. **Models** — Free models included with OpenCode (no API key needed to get started). Upgrading to OpenCode Go ($10/month for open coding models) or Zen (pay-as-you-go for premium models like Claude, GPT, Gemini). Connecting your own Anthropic/OpenAI/Google/other API keys via `/connect`. The providers directory.

6. **MCP Servers** — What MCP is and why it matters. Adding servers in the global opencode.json. Examples: Cloudflare (managing Workers, DNS, etc.), Replicate (running AI models), Chrome DevTools (browser automation), Context7 (searching docs). Local vs. remote servers.

7. **Skills** — What agent skills are. The `SKILL.md` format. Discovery paths (global `~/.config/opencode/skills/`). Installing skills with `npx skills add <owner/repo>`. The [skills.sh](https://skills.sh) directory. The [agentskills.io](https://agentskills.io) spec.

8. **Modes** — Plan mode vs. Build mode. When to use each. The Tab key to switch. Iterating on a plan before executing. Dragging images into the app for visual context.

9. **It's Not Just for Coding** — How non-technical users can use OpenCode to automate everyday tasks without writing code. Examples: scheduling and calendar management, email triage and drafting, social media posting, file organization, research and summarization. Show that "coding agent" doesn't mean "only for coders."

10. **Workspaces** — Run multiple simultaneous OpenCode sessions on the same codebase without them stepping on each other. Each workspace gets its own git worktree, so agents can work in parallel on different tasks without conflicting file changes. Explain when this is useful: working on a bug fix while a feature is being built, running tests in one workspace while iterating in another. In the Desktop app, workspaces are in the sidebar — you can create new ones, switch between them, and see their status. The TUI got initial workspace support in v1.2.24 (March 2026). Note that the feature is still evolving.

## Visual design

- Tailwind CSS v4 with a custom theme extending the opencode.ai aesthetic
- Monospace font stack: `"Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- Dark mode as default, light mode via Tailwind's `dark:` variant with `prefers-color-scheme` media strategy
- Dark palette: dark gray/near-black backgrounds, light gray text, muted accent colors
- Light palette: white/off-white background, dark text, same accent colors
- Clean, minimal layout — generous whitespace, max-width content container (~720px)
- Code blocks with syntax highlighting (shiki, server-side), copy button on hover
- No images beyond the GitHub icon in the footer (keeps it fast and simple)
- Responsive — works on mobile without a hamburger menu (simple vertical nav)
- Tailwind Typography plugin (`@tailwindcss/typography`) for styling rendered Markdown content

## Homepage design

- Site title: "opencode.school" in the monospace style matching opencode.ai's logo treatment
- Tagline: something like "Learn to use OpenCode, the open source AI coding agent" — could also emphasize that no terminal experience is needed
- Lesson listing: ordered cards, each showing title, description, and a completion checkbox
- Progress bar at the top showing X of 10 lessons completed

## Lesson page design

- Lesson title as h1
- Rendered markdown content
- Previous/Next navigation at the bottom
- "Mark as complete" checkbox at the bottom
- Collapsible sections for long code examples
- Copy button on code blocks

## Student IDs

Each user gets a "student ID" — a memorable, unguessable identifier in the format `<adjective>-<noun>-<nnnn>`. Examples: `fastidious-pupil-3451`, `experimental-artist-6780`, `curious-hacker-2019`.

The word lists live in `src/lib/student-id.ts`:

- ~35 adjectives: ambitious, analytical, bold, brilliant, clever, creative, curious, daring, diligent, eager, experimental, fastidious, fearless, focused, inventive, keen, methodical, nimble, observant, persistent, playful, prolific, radical, relentless, resourceful, rigorous, scrappy, sharp, tenacious, thorough, tireless, unconventional, versatile, vivid, whimsical, zealous
- ~30 nouns: apprentice, architect, artist, builder, coder, crafter, detective, dreamer, engineer, explorer, hacker, inventor, learner, maker, navigator, operator, pathfinder, pilgrim, pioneer, practitioner, pupil, researcher, scholar, seeker, student, thinker, tinkerer, traveler, voyager, wizard
- 4-digit number: 1000–9999

That gives ~35 × 30 × 9000 = ~9.5 million possible IDs.

## Progress tracking and sync

Progress is tracked in two layers:

- Cloudflare KV (source of truth): keyed by `student:{studentId}`, stores a JSON object with completed lesson slugs and timestamps
- localStorage (local cache): mirrors the KV state for fast reads, syncs on page load

### KV schema

Key: `student:{studentId}`

```json
{
  "completedLessons": ["getting-started", "modes"],
  "createdAt": "2026-03-10T...",
  "updatedAt": "2026-03-10T..."
}
```

### API

- `POST /api/enroll` — generates a new student ID, writes an empty progress object to KV, returns the student ID
- `GET /api/progress/:studentId` — returns the progress object, or 404 if the student ID doesn't exist (enrollment required)
- `PUT /api/progress/:studentId` — updates the progress object in KV, returns the updated object

No authentication. Student IDs are unguessable enough for low-stakes progress data (just lesson completion booleans).

### Website behavior

- On first visit, no student ID exists. The user browses freely with localStorage-only progress.
- When the user clicks "Enroll" (or similar CTA), the site calls `POST /api/enroll`, gets a student ID, and saves it to localStorage.
- After enrollment, progress writes go to both localStorage and KV (via `PUT /api/progress/:studentId`).
- On page load, if a student ID exists in localStorage, the site fetches progress from KV and merges it with localStorage.
- If the URL contains `?sid=<studentId>`, the site saves that student ID to localStorage and fetches progress from KV. This is how a student ID from OpenCode gets linked to the website.

### Sync with OpenCode

The website and a user's local OpenCode instance can stay in sync through the student ID.

**Website → OpenCode flow:**

After enrolling, the site shows a copy-pasteable prompt:

> Ready to start learning? Open OpenCode and paste this:
>
> `Let's work through the lessons at opencode.school. My student ID is curious-hacker-2019`

OpenCode recognizes the student ID, saves it to `~/.config/opencode/school.json`, and can call the progress API via curl to read/write progress.

**OpenCode → Website flow:**

If a user starts in OpenCode with something like "Let's enroll in opencode.school", the agent:

1. Calls `POST https://opencode.school/api/enroll` to create a new student ID
2. Saves the student ID to `~/.config/opencode/school.json`
3. Gives the user a link: `https://opencode.school?sid=curious-hacker-2019`

The user opens that URL, the site picks up the `?sid=` param, and both sides are synced.

**Local file format** (`~/.config/opencode/school.json`):

```json
{
  "studentId": "curious-hacker-2019"
}
```

No OpenCode skill is required. The agent can call the API via curl and read/write the local JSON file directly.

## Footer

- Text: "opencode.school is an open source project"
- Link to GitHub repo with GitHub icon (SVG inline)
- Small text style, centered

## Testing

Vitest with `@cloudflare/vitest-pool-workers` for running tests inside the Workers runtime.

Tests to write (grow incrementally as features are built):

- **Route tests** (`src/index.test.ts`): homepage returns 200, lesson pages return 200, unknown slugs return 404, correct content-type headers
- **Lesson loader tests** (`src/lib/lessons.test.ts`): frontmatter parsing, ordering by `order` field, slug extraction, handling of missing/malformed frontmatter
- **Markdown rendering tests** (`src/lib/markdown.test.ts`): code blocks get syntax-highlighted, links render correctly, basic HTML output structure

Test commands:
- `script/test` — runs `npx vitest run`
- Tests run on every push and PR via GitHub Actions

## Linting

Biome for linting and formatting. Fast, single tool, minimal config.

- `script/lint` — runs `npx biome check .`
- `script/lint --fix` or `npx biome check --write .` for auto-fixing
- Runs on every push and PR via GitHub Actions
- Biome config in `biome.json` at project root

## CI/CD

Three GitHub Actions workflows:

### `ci.yml` — Lint and test (runs on every push and PR)

1. Checkout code
2. Set up Node.js
3. Install deps (`npm ci`)
4. Build Tailwind (`script/build`)
5. Lint (`script/lint`)
6. Test (`script/test`)

### `deploy.yml` — Deploy to production (runs on push to `main`)

1. Checkout code
2. Set up Node.js
3. Install deps
4. Build Tailwind
5. Deploy via `npx wrangler deploy`
6. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets

### `preview.yml` — Preview deployments for PRs

Runs on `pull_request` events (`opened`, `synchronize`, `reopened`, `closed`).

On PR open/update:
1. Checkout code
2. Set up Node.js, install deps, build Tailwind
3. Deploy a preview version via `npx wrangler versions upload --preview-alias pr-${{ github.event.pull_request.number }}`
4. Create a GitHub Deployment via the GitHub Deployments API with `environment_url` set to the preview URL (`pr-{number}-opencodeschool.ziki.workers.dev`)
5. The PR GUI shows a "View deployment" button linking to the preview

On PR close:
1. Mark the GitHub Deployment as `inactive`
2. The preview URL naturally becomes stale (Cloudflare handles version cleanup)

Requires `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` secrets. The workflow needs `deployments: write` permission for the GitHub token.

## Scripts (scripts-to-rule-them-all)

| Script          | What it does                                   |
| --------------- | ---------------------------------------------- |
| `script/build`  | Compile Tailwind CSS source to public/styles/  |
| `script/dev`    | Start Wrangler dev server + Tailwind watch     |
| `script/lint`   | Run Biome linter                               |
| `script/test`   | Run vitest                                     |
| `script/deploy` | Build + deploy to production via wrangler      |

## Implementation order

1. Scaffold the project: `npm create hono@latest`, configure for Cloudflare Workers
2. Set up wrangler.jsonc with assets directory, TypeScript
3. Install and configure Biome, Vitest with `@cloudflare/vitest-pool-workers`, set up `script/` directory
4. Install and configure Tailwind CSS v4 with `@tailwindcss/cli` build step
5. Build the base layout (head, nav, footer) with Hono JSX and Tailwind classes. Write first route tests (homepage 200, 404 for unknown paths). Keep linter and tests passing.
6. Build the Markdown lesson loader (read files, parse frontmatter). Write lesson loader tests. Keep linter and tests passing.
7. Add Markdown rendering with shiki syntax highlighting. Write rendering tests. Keep linter and tests passing.
8. Build the homepage with lesson listing. Update route tests. Keep linter and tests passing.
9. Build the lesson page template with prev/next nav. Write lesson route tests. Keep linter and tests passing.
10. Add progress tracking (localStorage + vanilla JS)
11. Add copy-to-clipboard on code blocks
12. Write all 10 lesson markdown files
13. Set up GitHub Actions: `ci.yml` (lint + test), `deploy.yml` (production), `preview.yml` (PR previews with GitHub Deployments)
14. Create GitHub repo, push
15. Deploy to `opencodeschool.ziki.workers.dev`
16. Set up custom domain `opencode.school`

## Research sources

- The official OpenCode docs at https://opencode.ai/docs are the primary reference.
- The OpenCode source code at https://github.com/anomalyco/opencode is a useful secondary source when the docs or website are insufficient, or when gathering more context about specific features and capabilities.

## Resolved decisions

- No search feature — there are only 10 lessons.
- Plain Markdown for lessons (not MDX). Keeps contributor barrier low, avoids MDX compile complexity.
- Each lesson links to the relevant opencode.ai/docs page as a "further reading" reference.
- Syntax highlighting via shiki (server-side, at render time). Produces pre-styled HTML so no client-side JS needed for highlighting.
- Tailwind CSS v4 for styling. `@tailwindcss/cli` compiles `styles/main.css` to `public/styles/main.css`. The compiled output is git-ignored; the build step runs before deploy.
- Tailwind's `@tailwindcss/typography` for styling the rendered Markdown prose content.
- Biome for linting and formatting. Single tool, fast, minimal config.
- Vitest with `@cloudflare/vitest-pool-workers` for testing.
- Tests are written incrementally alongside features. Linter and tests must pass at each implementation step.
- GitHub Actions for CI/CD: lint+test on every push/PR, deploy to production on push to main, preview deployments on PRs with GitHub Deployments API integration.
- Preview deployments use `wrangler versions upload --preview-alias` for branch-based preview URLs on workers.dev, with the GitHub Deployments API to surface the URL in the PR GUI.
