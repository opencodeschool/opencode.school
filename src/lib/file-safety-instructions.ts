// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

/**
 * Shared file safety instructions appended to every lesson's agentInstructions.
 * Prevents the agent from overwriting the student's existing config files.
 * Injected at the API layer so individual lesson MDX files don't need to repeat these rules.
 */
export const FILE_SAFETY_INSTRUCTIONS = `CRITICAL — file safety rules for every lesson: Before modifying any file on the student's machine, always read it first. If the file already exists, create a backup by copying it to a .bak file with a timestamp suffix (e.g. opencode.jsonc.bak.2026-04-06T12-00-00) before making any changes. Never overwrite or replace a file wholesale — merge the required changes into the existing content, preserving all settings, comments, and structure the student already has. If you created a backup, tell the student where to find it. These rules apply to config files (opencode.jsonc, opencode.json), instruction files (AGENTS.md), command files, and any other file you are asked to create or modify.`;
