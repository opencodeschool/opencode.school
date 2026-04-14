// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import { describe, expect, it } from "vitest";
import { t } from "./ui";

describe("t() translation helper", () => {
	it("returns English string by default", () => {
		expect(t("site.name")).toBe("OpenCode School");
	});

	it("returns English string when locale is en", () => {
		expect(t("site.name", "en")).toBe("OpenCode School");
	});

	it("returns Portuguese string when locale is pt", () => {
		expect(t("nav.allLessons", "pt")).toBe("Todas as lições");
	});

	it("returns English strings for navigation keys", () => {
		expect(t("nav.allLessons", "en")).toBe("All lessons");
		expect(t("nav.exercises", "en")).toBe("Exercises");
		expect(t("nav.about", "en")).toBe("About");
	});

	it("returns Portuguese strings for navigation keys", () => {
		expect(t("nav.exercises", "pt")).toBe("Exercícios");
		expect(t("nav.about", "pt")).toBe("Sobre");
		expect(t("nav.glossary", "pt")).toBe("Glossário");
	});

	it("returns array values for list keys", () => {
		const enList = t("home.whatYoullLearnList", "en");
		expect(Array.isArray(enList)).toBe(true);
		expect((enList as string[]).length).toBeGreaterThan(0);

		const ptList = t("home.whatYoullLearnList", "pt");
		expect(Array.isArray(ptList)).toBe(true);
		expect((ptList as string[]).length).toBe((enList as string[]).length);
	});

	it("returns different descriptions per locale", () => {
		const en = t("site.description", "en") as string;
		const pt = t("site.description", "pt") as string;
		expect(en).not.toBe(pt);
		expect(en).toContain("OpenCode");
		expect(pt).toContain("OpenCode");
	});

	it("returns lesson-related strings per locale", () => {
		expect(t("lesson.completed", "en")).toBe("You completed this lesson!");
		expect(t("lesson.completed", "pt")).toBe("Concluiu esta lição!");
	});

	it("returns exercise-related strings per locale", () => {
		expect(t("exercise.completed", "en")).toBe("You completed this exercise!");
		expect(t("exercise.completed", "pt")).toBe("Concluiu este exercício!");
	});

	it("returns 404 strings per locale", () => {
		expect(t("404.message", "en")).toBe("Page not found.");
		expect(t("404.message", "pt")).toBe("Página não encontrada.");
	});
});

describe("t() completeness", () => {
	it("has Portuguese translations for all CTA buttons", () => {
		expect(t("cta.continue", "pt")).toBe("Continuar");
		expect(t("cta.start", "pt")).toBe("Começar");
	});

	it("has Portuguese translations for agent prompt", () => {
		expect(t("agentPrompt.label", "pt")).toBe("Prompt para o OpenCode");
		expect(t("agentPrompt.copy", "pt")).toBe("Copiar");
	});

	it("has Portuguese translations for disenroll page", () => {
		expect(t("disenroll.title", "pt")).toBe("Cancelar inscrição");
		expect(t("disenroll.resetButton", "pt")).toBe("Repor o meu progresso");
	});
});
