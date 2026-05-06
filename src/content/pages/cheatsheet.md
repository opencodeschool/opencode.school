---
title: "Cheatsheet"
slug: cheatsheet
description: "Slash commands, prompt syntax, keyboard shortcuts, CLI commands, and file paths at a glance."
---

A quick reference drawn from the [OpenCode docs](https://opencode.ai/docs) and the lessons in this course. Most things work in both OpenCode Desktop and the OpenCode [TUI](/glossary#tui); items specific to one or the other are noted.

For deeper context on any item, follow the links to the relevant lesson or to the official docs.

## Slash commands

Type these inside the OpenCode prompt. Type `/` on its own to see the full list of available commands in your current session.

| Command | What it does |
| --- | --- |
| `/new` (alias `/clear`) | Start a new [session](/lessons/sessions); the current one stays in your history |
| `/sessions` (aliases `/resume`, `/continue`) | List and switch between sessions |
| `/help` | Show the help dialog and the list of available commands |
| `/init` | Guided setup for creating or updating a project-level `AGENTS.md` — see [Instructions](/lessons/instructions) |
| `/connect` | Add a model provider and configure its API key (TUI) |
| `/models` | Open the model picker to switch [models](/lessons/models) |
| `/mcp` | List configured MCP servers and their connection status — see [Tools](/lessons/tools) |
| `/themes` | List and switch between themes (TUI) |
| `/share` | Share the current session as a public link at `opncd.ai/s/<id>` |
| `/unshare` | Stop sharing the current session and remove the shared data |
| `/undo` | Revert the last user message and any file changes the agent made — run multiple times to keep undoing |
| `/redo` | Restore a message and its file changes after `/undo` |
| `/compact` (alias `/summarize`) | Summarize the current session to free up context window space |
| `/details` | Toggle whether tool execution details are shown inline |
| `/thinking` | Toggle visibility of the model's reasoning blocks (display only — does not change model capability) |
| `/editor` | Open the editor set in `$EDITOR` to compose a longer message (TUI) |
| `/export` | Export the current conversation as Markdown and open in `$EDITOR` (TUI) |
| `/exit` (aliases `/quit`, `/q`) | Exit OpenCode (TUI) |
| `/<your command>` | Run a [custom command](/lessons/commands) you've defined in `~/.config/opencode/commands/` or `.opencode/commands/` |

> **Note:** `/undo` and `/redo` use Git under the hood, so they only work in projects that are Git repositories.

## Prompt syntax

Special characters that change how a prompt is interpreted.

| Syntax | What it does |
| --- | --- |
| `@<path>` | Reference a file or directory; fuzzy search runs as you type, and the file's contents are added to the conversation (e.g. `Explain @src/index.ts`) |
| `!<command>` | Run a shell command from the prompt; the output is added to the conversation as a tool result (e.g. `!ls -la`) |

## Keyboard shortcuts

### Desktop and TUI (shared)

| Shortcut | What it does |
| --- | --- |
| `Return` / `Enter` | Send the current message |
| `Shift+Return` (or `Ctrl+Return`, `Alt+Return`, `Ctrl+J`) | Insert a newline in the prompt without sending |
| `Cmd+V` (Mac) / `Ctrl+V` (Windows/Linux) | Paste an [image](/lessons/images) or text from the clipboard into the prompt |
| Drag and drop | Drag an image file from your desktop or file manager into the OpenCode window to attach it |
| `Esc` | Interrupt a running response or close popovers |

### Prompt input editing (Readline / Emacs style)

Built into the OpenCode Desktop prompt input. The TUI has equivalent `input_*` bindings that can be remapped in `tui.json`.

| Shortcut | What it does |
| --- | --- |
| `Ctrl+A` | Move to start of current line |
| `Ctrl+E` | Move to end of current line |
| `Ctrl+B` / `Ctrl+F` | Move cursor back / forward one character |
| `Alt+B` / `Alt+F` | Move cursor back / forward one word |
| `Ctrl+D` | Delete character under cursor |
| `Ctrl+K` | Delete to end of line |
| `Ctrl+U` | Delete to start of line |
| `Ctrl+W` | Delete previous word |
| `Alt+D` | Delete next word |
| `Ctrl+T` | Transpose characters (Desktop only — in the TUI, `Ctrl+T` cycles model variants) |
| `Ctrl+G` | Cancel popovers / abort running response |

### TUI keybinds

The TUI uses `Ctrl+X` as the leader key by default — press `Ctrl+X`, release, then press the next key. You can change the leader and any binding in `tui.json`. See the [keybinds docs](https://opencode.ai/docs/keybinds) for the full list.

**Leader combos**

| Shortcut | What it does |
| --- | --- |
| `Ctrl+X N` | New session |
| `Ctrl+X L` | List sessions |
| `Ctrl+X C` | Compact session |
| `Ctrl+X U` | Undo last message |
| `Ctrl+X R` | Redo last undone message |
| `Ctrl+X X` | Export conversation |
| `Ctrl+X E` | Open external editor |
| `Ctrl+X M` | Model picker |
| `Ctrl+X T` | Theme picker |
| `Ctrl+X A` | Agent picker |
| `Ctrl+X Q` | Quit |
| `Ctrl+X B` | Toggle sidebar |
| `Ctrl+X S` | Status view |
| `Ctrl+X Y` | Copy last message |

**Standalone**

| Shortcut | What it does |
| --- | --- |
| `Tab` / `Shift+Tab` | Cycle [agents](/lessons/agents) (Plan ↔ Build) — Desktop uses the agent dropdown below the prompt instead |
| `Ctrl+P` | Command palette |
| `Ctrl+T` | Cycle model variants (e.g. reasoning on/off) |
| `F2` / `Shift+F2` | Cycle through recently used models |
| `Ctrl+R` | Rename current session |

## CLI commands

Type these in your terminal, not in the OpenCode prompt. The `opencode` CLI ships with both OpenCode Desktop and the standalone TUI install. For the full list of subcommands and flags, see the [CLI docs](https://opencode.ai/docs/cli).

| Command | What it does |
| --- | --- |
| `opencode run "<prompt>"` | Run a single prompt non-interactively and exit |
| `opencode session list` | List every [session](/lessons/sessions) across all your projects |
| `opencode export [sessionID]` | Export a session as JSON; prompts you to pick if the ID is omitted |
| `opencode mcp auth [name]` | Authenticate an OAuth-enabled MCP server — see [Tools](/lessons/tools) |
| `opencode mcp auth list` (alias `ls`) | Show OAuth status for all configured servers |
| `opencode mcp debug <name>` | Print debug info for an MCP server connection |

## File paths

Where OpenCode looks for config and customization files. Global paths apply to every project; per-project paths apply only inside that project.

### Global

| Path | What it is |
| --- | --- |
| `~/.config/opencode/opencode.json` | Main config: providers, permissions, MCP servers, etc |
| `~/.config/opencode/AGENTS.md` | Custom [instructions](/lessons/instructions) loaded at the start of every session |
| `~/.config/opencode/commands/` | Custom [slash commands](/lessons/commands) |
| `~/.config/opencode/skills/` | Reusable [skills](/lessons/skills) |
| `~/.config/opencode/plugins/` | JS/TS [plugins](/lessons/plugins) that extend OpenCode |

### Per-project

| Path | What it is |
| --- | --- |
| `<project>/AGENTS.md` | Project-specific instructions, typically committed to Git |
| `<project>/.opencode/opencode.json` | Project-specific config overrides |
| `<project>/.opencode/commands/` | Project-specific slash commands |
| `<project>/.opencode/skills/` | Project-specific skills |
| `<project>/.opencode/plugins/` | Project-specific plugins |

## Where to look next

- The [OpenCode docs](https://opencode.ai/docs) are the canonical reference for everything above.
- The [keybinds docs](https://opencode.ai/docs/keybinds) cover every default TUI binding and how to remap them in `tui.json`.
- The [CLI docs](https://opencode.ai/docs/cli) document every flag and subcommand in detail.
- The [Glossary](/glossary) defines the terms used throughout this cheatsheet and the lessons.
