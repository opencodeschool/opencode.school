---
name: school-analytics
description: Fetch and analyze OpenCode School enrollment and progress data from Cloudflare KV
---

## When to use

Use this skill when asked about enrollments, student counts, progress stats, lesson completion rates, exercise completions, demographics, or any analytics about OpenCode School students.

## Requirements

Requires the Cloudflare MCP server (github.com/cloudflare/mcp). The `cloudflare-api_execute` tool provides a pre-set `accountId` variable and a `cloudflare.request()` helper for authenticated API calls.

## Data source

Student records are stored in Cloudflare KV. To find the namespace ID, read `wrangler.jsonc` from the project root and find the KV namespace with binding `PROGRESS`. Use its `id` value.

## Fetching all keys

Use the Cloudflare API, not the wrangler CLI. `wrangler kv key list` returns only 25 keys and has no pagination flag.

List keys via `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/keys` with a limit of 1000. The response includes `result_info.cursor` for pagination -- keep fetching until the cursor is absent or the result set is empty. Each key object has a `name` field.

## Fetching all values

Fetch each value via `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/values/{key}` (URL-encode the key). The API returns the value as a JSON string, not a parsed object -- always `JSON.parse()` the result. Fetch in parallel batches of ~20 to stay under rate limits.

## Record schema

Each student record has these fields:

- `createdAt` -- ISO 8601 string, set at enrollment time
- `updatedAt` -- ISO 8601 string, updated on every write
- `completedLessons` -- array; items are either bare strings (legacy format) or objects with `slug`, `completedAt`, `source`, and optional `model`. Normalize by extracting the `slug` field from objects.
- `completedExercises` -- same shape as `completedLessons`
- `profile` -- optional object with fields: `codingExperience`, `aiTools`, `editor`, `terminalComfort`, `learningStyle`, `depthPreference`, `languages`, `os`
- `deviceId` -- optional UUID string, present only if the client sent one at enrollment

## Aggregate inside the sandbox

The `cloudflare-api_execute` tool truncates responses over ~6000 tokens. Always compute aggregates (counts, buckets, funnels) inside the sandbox function. Never return raw student records.

## Common analyses

- **Time-window filtering**: compare `createdAt` against a cutoff timestamp
- **Hourly/daily enrollment rates**: bucket by the date or date-hour portion of `createdAt`
- **Lesson completion funnel**: count how many students completed each lesson slug
- **Exercise completions**: count how many students completed each exercise slug
- **Profile demographics**: count by `profile.os`, `profile.editor`, `profile.codingExperience`
- **Progress depth**: bucket students by number of lessons completed (0, 1-3, 4-7, 8+, all)
