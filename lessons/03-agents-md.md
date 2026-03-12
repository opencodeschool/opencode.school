---
title: "AGENTS.md"
slug: agents-md
description: "Reusable instructions for all your sessions."
order: 3
---

AGENTS.md is a Markdown file that contains instructions for OpenCode. Think of it as a way to tell the agent about your preferences, coding style, and project conventions — once, instead of repeating yourself every session.

## The global AGENTS.md

The global file lives at `~/.config/opencode/AGENTS.md`. It applies to every OpenCode session, regardless of which project you're working on.

Here's an example:

```markdown
## Style guide

- Use TypeScript for all new files
- Prefer `const` over `let`
- Use single quotes for strings
- Always add return types to functions

## Testing

- Write tests for all new functions
- Use vitest as the test runner
```

## Project-level AGENTS.md

You can also create an AGENTS.md file in the root of any project. This one only applies to sessions in that project, and its instructions are merged with the global file.

## What's next?

Next, you'll learn about permissions — controlling what OpenCode can and cannot do on your machine.
