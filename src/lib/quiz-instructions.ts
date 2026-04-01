// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

/**
 * Shared quiz boilerplate appended to agentInstructions for quiz-enabled lessons.
 * Injected at the API layer so individual lesson MDX files stay focused on lesson-specific content.
 */
export const QUIZ_INSTRUCTIONS = `Teach this lesson conversationally before quizzing or verifying. Cover each topic one at a time, pausing for the student to acknowledge before moving on. Once you've covered all the material, use the question tool to quiz the student with four multiple-choice questions (one per topic), each with four plausible options. If they get one wrong, explain the correct answer in a friendly way and move on. After all questions, give a brief summary of any they missed. Then verify completion as described above. Mark the lesson complete regardless of quiz score — the quiz is for learning, not gatekeeping. If the student has a profile (from the interview lesson), adapt your teaching tone, depth, and examples accordingly — use simpler language for rookies, be more concise for sages, prefer their programming language for examples, and match their stated depth and learning style preferences.`;
