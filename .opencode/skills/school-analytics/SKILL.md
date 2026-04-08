---
name: school-analytics
description: Fetch and analyze OpenCode School enrollment and progress data from Cloudflare KV
---

## When to use

Use this skill when asked about enrollments, student counts, progress stats, lesson completion rates, exercise completions, demographics, or any analytics about OpenCode School students.

## Data source

Student records are stored in Cloudflare KV. To find the namespace ID:

1. Read `wrangler.jsonc` from the project root
2. Find the KV namespace with binding `PROGRESS`
3. Use its `id` value

The `accountId` variable is pre-set in the `cloudflare-api_execute` tool -- use it directly.

## Fetching all keys

Use the Cloudflare API, not the wrangler CLI. `wrangler kv key list` returns only 25 keys and has no pagination flag.

Use `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/keys` with `query: { limit: 1000 }`. Paginate using `result_info.cursor` until no more results are returned:

```javascript
let allKeys = [];
let cursor = undefined;
while (true) {
  const query = { limit: 1000 };
  if (cursor) query.cursor = cursor;
  const res = await cloudflare.request({
    method: 'GET',
    path: `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/keys`,
    query
  });
  allKeys = allKeys.concat(res.result.map(k => k.name));
  if (res.result_info?.cursor && res.result.length > 0) {
    cursor = res.result_info.cursor;
  } else {
    break;
  }
}
```

## Fetching all values

For each key, fetch its value via `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/values/{encodeURIComponent(key)}`.

The result is a JSON string. Always parse it:

```javascript
const data = typeof res.result === 'string' ? JSON.parse(res.result) : res.result;
```

Fetch in parallel batches of ~20 to stay under rate limits:

```javascript
for (let i = 0; i < allKeys.length; i += 20) {
  const batch = allKeys.slice(i, i + 20);
  const results = await Promise.all(batch.map(async (key) => {
    const res = await cloudflare.request({
      method: 'GET',
      path: `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`,
    });
    return { key, data: typeof res.result === 'string' ? JSON.parse(res.result) : res.result };
  }));
  // process results here
}
```

## Record schema

Each student record has these fields:

- `createdAt` -- ISO 8601 string, set at enrollment time
- `updatedAt` -- ISO 8601 string, updated on every write
- `completedLessons` -- array; items are either bare strings (legacy format) or objects `{ slug, completedAt, source, model? }`
- `completedExercises` -- same shape as `completedLessons`
- `profile` -- optional object with fields: `codingExperience`, `aiTools`, `editor`, `terminalComfort`, `learningStyle`, `depthPreference`, `languages`, `os`
- `deviceId` -- optional UUID string, present only if the client sent one at enrollment

To normalize lesson/exercise slugs across both formats:

```javascript
const slugs = items.map(l => typeof l === 'string' ? l : l.slug);
```

## Aggregate inside the sandbox

The `cloudflare-api_execute` tool truncates responses over ~6000 tokens. Always compute aggregates (counts, buckets, funnels) inside the sandbox function. Never return raw student records.

## Common analyses

- **Time-window filtering**: compare `new Date(data.createdAt)` against a cutoff like `new Date(Date.now() - hours * 60 * 60 * 1000)`
- **Hourly enrollment rates**: bucket by `createdAt.substring(0, 13)`
- **Daily enrollment rates**: bucket by `createdAt.substring(0, 10)`
- **Lesson completion funnel**: count how many students completed each lesson slug
- **Exercise completions**: count how many students completed each exercise slug
- **Profile demographics**: count by `profile.os`, `profile.editor`, `profile.codingExperience`
- **Progress depth**: bucket students by number of lessons completed (0, 1-3, 4-7, 8+, all)
