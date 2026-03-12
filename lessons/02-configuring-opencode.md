---
title: "Configuring OpenCode"
slug: configuring-opencode
description: "Set up global config files like opencode.json and AGENTS.md."
order: 2
---

OpenCode uses a global configuration file to control its behavior across all your projects. This file lives at `~/.config/opencode/opencode.json`.

## The config file

Here's a minimal example:

```json
{
  "$schema": "https://opencode.ai/config.schema.json",
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514"
}
```

The `$schema` property gives you autocomplete and validation in your editor. It's optional but helpful.

## Opening the config file

In the Desktop app, you can open the config file from the settings menu. This opens it in your default editor, where you can make changes and save.

## Key settings

- `provider` — which AI provider to use (e.g. `anthropic`, `openai`, `google`)
- `model` — which model to use
- `permission` — control what OpenCode can and cannot do

We'll cover permissions in detail in a later lesson.

## What's next?

Next, you'll learn about AGENTS.md — a file that lets you set reusable instructions for all your OpenCode sessions.
