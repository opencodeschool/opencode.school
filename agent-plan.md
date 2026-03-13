# agent-plan.md

## What we're building

opencode.school — a website that teaches people how to use OpenCode. Inspired by [nodeschool.io](https://nodeschool.io), it's a community-friendly, open-source learning resource. It borrows the visual aesthetic of [opencode.ai](https://opencode.ai): monospace typography, dark-first palette with light mode support via `prefers-color-scheme`.

## Target audience

People who are new to agentic coding and may not be comfortable using a terminal. The lessons focus on the OpenCode Desktop app as the primary interface. The terminal app (TUI) is mentioned as an alternative for advanced users, but all instructions and walkthroughs center on the Desktop experience.

## What's been built

- Astro 6 site with `@astrojs/cloudflare` adapter, deployed to Cloudflare Workers
- 13 MDX lessons in an Astro content collection (7 with content, 6 stubs)
- Responsive layout with dark/light mode, sidebar nav, prev/next lesson navigation
- Glossary page
- Tailwind CSS v4 with typography plugin
- Biome linting
- GitHub Actions deploy pipeline (push to main)
- Custom domain `opencode.school`
- Student enrollment and progress tracking API (Cloudflare KV)
- Enrollment UI on the enrollment lesson page
- Progress checkmarks on homepage and lesson pages
- Bidirectional sync between website and OpenCode via `?sid=` param

## What changed from the original plan

| Original plan                  | What we built                              |
| ------------------------------ | ------------------------------------------ |
| Hono on Cloudflare Workers     | Astro 6 with `@astrojs/cloudflare` adapter |
| Plain Markdown lessons         | MDX in Astro content collections           |
| `marked` for rendering         | Astro's built-in MDX rendering             |
| `shiki` for syntax highlighting | Astro's built-in code highlighting        |
| `@tailwindcss/cli` build step  | `@tailwindcss/vite` plugin                 |
| `output: "static"`             | `output: "server"` with `prerender: true` on pages |

## Tech stack

- Astro 6 with `@astrojs/cloudflare` adapter
- MDX for lesson content (via `@astrojs/mdx`)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- `@tailwindcss/typography` for prose styling
- Cloudflare KV for student progress storage (`PROGRESS` namespace)
- Vanilla JS for client-side progress tracking (localStorage cache + KV sync)
- TypeScript
- JSONC for Wrangler config
- Biome for linting and formatting

## Deployment

- Custom domain: `opencode.school`
- Workers dev URL: `opencodeschool.ziki.workers.dev`
- GitHub repo: `zeke/opencode.school`
- GitHub Actions: deploy on push to main

## Project structure

```
opencode.school/
  src/
    env.d.ts                     # Cloudflare KV binding types
    content.config.ts            # Astro content collection definition
    content/lessons/             # 13 MDX lesson files
    layouts/Base.astro           # Base HTML layout with sidebar + progress JS
    lib/
      student-id.ts              # Student ID generation (adjective-noun-nnnn)
      progress.ts                # KV helper functions for progress CRUD
    pages/
      index.astro                # Homepage with lesson listing + completion state
      404.astro                  # 404 page
      glossary.astro             # Glossary page
      lessons/[slug].astro       # Dynamic lesson page with mark-complete checkbox
      api/
        enroll.ts                # POST /api/enroll
        progress/[studentId].ts  # GET + PUT /api/progress/:studentId
    styles/main.css              # Tailwind CSS source
  public/                        # Static assets
  lessons/glossary.md            # Glossary content (standalone, not in collection)
  script/
    build                        # npx astro build
    deploy                       # script/build + npx wrangler deploy
    dev                          # npx astro dev
    lint                         # npx biome check .
  .github/workflows/deploy.yml  # Deploy to Cloudflare on push to main
  astro.config.mjs
  biome.json
  wrangler.jsonc
  package.json
  tsconfig.json
  human-plan.md                  # Original project brief (historical)
  agent-plan.md                  # This file (living technical reference)
```

## Lessons

| #  | Slug                 | Title                   | Status   |
| -- | -------------------- | ----------------------- | -------- |
| 0  | intro                | Introduction            | Done     |
| 1  | prerequisites        | Prerequisites           | Done     |
| 2  | installing-opencode  | Installing OpenCode     | Done     |
| 3  | enrollment           | Enrollment              | Done     |
| 4  | configuration        | Configuration           | Done     |
| 5  | permissions          | Permissions             | Done     |
| 6  | agents-md            | AGENTS.md               | Done     |
| 7  | models               | Models                  | Stub     |
| 8  | mcp-servers          | MCP Servers             | Stub     |
| 9  | skills               | Skills                  | Stub     |
| 10 | modes                | Modes                   | Stub     |
| 11 | not-just-for-coding  | Not Just for Coding     | Stub     |
| 12 | workspaces           | Workspaces              | Stub     |

## Progress tracking API

### Endpoints

| Route                        | Method | Description                                        |
| ---------------------------- | ------ | -------------------------------------------------- |
| `/api/enroll`                | POST   | Generate student ID, create empty progress in KV   |
| `/api/progress/:studentId`   | GET    | Fetch progress (404 if student not found)          |
| `/api/progress/:studentId`   | PUT    | Mark a lesson complete (additive, idempotent)      |

All endpoints return JSON with CORS headers. No authentication — student IDs are unguessable enough for low-stakes progress data.

### PUT request format

```json
{ "lessonSlug": "enrollment" }
```

Appends the slug to `completedLessons` if not already present. Idempotent.

### KV schema

Key: `student:{studentId}`

```json
{
  "completedLessons": ["intro", "enrollment"],
  "createdAt": "2026-03-13T...",
  "updatedAt": "2026-03-13T..."
}
```

### Student IDs

Format: `adjective-noun-nnnn` (e.g., `curious-hacker-2019`)

- 36 adjectives, 30 nouns, 4-digit number (1000-9999)
- ~9.7 million possible IDs
- Collision check against KV on generation

### Sync between website and OpenCode

**Website -> OpenCode:** After enrolling, the site shows a copy-paste prompt:

> Let's enroll in https://opencode.school! My student ID is curious-hacker-2019

OpenCode saves the student ID to `~/.config/opencode/school.json` and can call the progress API.

**OpenCode -> Website:** OpenCode can call `POST /api/enroll` to create a student, then give the user a link:

> https://opencode.school?sid=curious-hacker-2019

The site detects the `?sid=` param, saves the student ID to localStorage, and syncs progress.

### Website behavior

- Before enrollment: browse freely, no progress tracking
- Enrollment: click "Enroll" on lesson 3, get a student ID, save to localStorage
- After enrollment: lesson pages show "Mark as complete" checkbox, homepage shows checkmarks
- On page load: if enrolled, fetch progress from KV and update UI
- `?sid=` param: save student ID to localStorage, fetch progress, clean URL

## Remaining work

- Fill in the 6 stub lessons (models, MCP servers, skills, modes, not-just-for-coding, workspaces)
- Set up Vitest with `@cloudflare/vitest-pool-workers`
- Add `script/test` script
- CI workflow for lint + test on PRs (`ci.yml`)
- Preview deployments for PRs (`preview.yml`)
- Copy-to-clipboard on code blocks
- Progress bar on homepage

## Research sources

- The official OpenCode docs at https://opencode.ai/docs are the primary reference.
- The OpenCode source code at https://github.com/anomalyco/opencode is a useful secondary source when the docs or website are insufficient.

## Scripts

| Script          | What it does                        |
| --------------- | ----------------------------------- |
| `script/build`  | `npx astro build`                   |
| `script/dev`    | `npx astro dev`                     |
| `script/lint`   | `npx biome check .`                 |
| `script/deploy` | `script/build` + `npx wrangler deploy` |
