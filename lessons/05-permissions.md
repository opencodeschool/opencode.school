---
title: "Permissions"
slug: permissions
description: "Control what OpenCode can and can't do without asking."
order: 5
---

In the previous lesson, you set `"*": "allow"` in your config — which means OpenCode can do anything without asking for permission. That's convenient for learning, but in practice you'll want more control over what happens on your machine.

## The three permission levels

Every action OpenCode takes is governed by one of three rules:

| Level   | What happens                                                 |
| ------- | ------------------------------------------------------------ |
| `allow` | The action runs immediately, no questions asked              |
| `ask`   | OpenCode pauses and asks for your approval before proceeding |
| `deny`  | The action is blocked entirely                               |

When OpenCode asks for permission, you'll see three options:

- **Allow Once** — approve this specific action, just this time
- **Always** — approve this action and similar ones for the rest of the session
- **Reject** — deny this specific action

## Tighten your permissions

Let's edit your global config to add some safety guardrails. Open `~/.config/opencode/opencode.jsonc` in your text editor and replace its contents with:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    // Allow most things by default
    "*": "allow",
    // But ask before running destructive shell commands
    "bash": {
      "*": "allow",
      "rm *": "ask",
      "rmdir *": "ask",
      "mv *": "ask"
    }
  }
}
```

Save the file. This config:

- Allows most actions automatically (reading files, editing code, running safe commands)
- Asks for your permission before deleting files (`rm`), removing directories (`rmdir`), or moving/renaming files (`mv`)

## How patterns work

Permission rules use simple wildcard matching:

- `*` matches any number of characters
- `rm *` matches any command that starts with `rm ` — like `rm file.txt` or `rm -rf node_modules`
- Rules are checked in order, and the **last matching rule wins**

So in the config above, a command like `git status` matches `"*": "allow"` and runs immediately. But `rm old-file.txt` matches `"rm *": "ask"` and triggers a confirmation prompt.

## Going further

You can get as granular as you want. Here's a more protective config:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "*": "allow",
    "bash": {
      "*": "allow",
      "rm *": "ask",
      "rmdir *": "ask",
      "mv *": "ask",
      "git push *": "ask",
      "git commit *": "ask"
    },
    "edit": {
      "*": "allow",
      "*.env": "deny",
      "*.env.*": "deny"
    }
  }
}
```

This adds:

- **Git safety** — asks before pushing or committing, giving you a chance to review changes first
- **Secret protection** — blocks edits to `.env` files, which often contain API keys and passwords

## Available permissions

Here are some of the actions you can control:

| Permission | What it covers                         |
| ---------- | -------------------------------------- |
| `bash`     | Running shell commands                 |
| `edit`     | Modifying files (edit, write, patch)   |
| `read`     | Reading file contents                  |
| `glob`     | Searching for files by name pattern    |
| `grep`     | Searching file contents                |
| `task`     | Launching sub-agents                   |
| `skill`    | Loading agent [skills](/glossary#skill) |
| `webfetch` | Fetching URLs from the internet        |

For the full list of permissions and pattern syntax, see the [permissions documentation](https://opencode.ai/docs/permissions/).

Once you've saved your updated config with at least one granular permission rule (like `"rm *": "ask"`), this lesson is complete.
