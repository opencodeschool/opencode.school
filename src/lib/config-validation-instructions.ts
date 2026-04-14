// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

/**
 * Shared config validation boilerplate appended to agentInstructions for lessons
 * that modify the student's global OpenCode config (~/.config/opencode/opencode.json).
 * Injected at the API layer so individual lesson MDX files stay focused on lesson-specific content.
 */
export const CONFIG_VALIDATION_INSTRUCTIONS = `IMPORTANT — CONFIG FILE VALIDATION: After every write or edit to ~/.config/opencode/opencode.json (or opencode.jsonc for existing students), you MUST immediately re-read the file and validate it is well-formed JSON. To validate: read the full file contents and confirm it parses as valid JSON. If the file has a .jsonc extension, strip any lines that start with optional whitespace followed by // before parsing. If parsing fails, identify and fix the syntax error immediately — common issues include trailing commas after the last property in an object or array, missing commas between properties, unmatched braces or brackets, and unclosed strings. If you cannot fix the error, restore the file from the backup copy you created earlier. Never leave the student with a malformed config file, as OpenCode will fail to start on the next launch.`;
