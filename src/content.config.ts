import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const lessons = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/lessons" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

export const collections = { lessons };
