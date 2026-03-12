import frontmatter from "./frontmatter.ts";

// Direct imports — wrangler's Text rule handles .md files as strings
import lesson01 from "../../lessons/01-getting-started.md";
import lesson02 from "../../lessons/02-configuring-opencode.md";
import lesson03 from "../../lessons/03-agents-md.md";

const rawLessons: string[] = [lesson01, lesson02, lesson03];

export interface Lesson {
	title: string;
	slug: string;
	description: string;
	order: number;
	content: string;
}

export interface LessonMeta {
	title: string;
	slug: string;
	description: string;
	order: number;
}

function parseLessons(): Lesson[] {
	const lessons: Lesson[] = [];

	for (const raw of rawLessons) {
		const { attributes, body } = frontmatter(raw);

		lessons.push({
			title: String(attributes.title || ""),
			slug: String(attributes.slug || ""),
			description: String(attributes.description || ""),
			order: Number(attributes.order || 0),
			content: body,
		});
	}

	return lessons.sort((a, b) => a.order - b.order);
}

let cachedLessons: Lesson[] | null = null;

export function getLessons(): LessonMeta[] {
	if (!cachedLessons) {
		cachedLessons = parseLessons();
	}
	return cachedLessons.map(({ content: _, ...meta }) => meta);
}

export function getLesson(slug: string): Lesson | undefined {
	if (!cachedLessons) {
		cachedLessons = parseLessons();
	}
	return cachedLessons.find((l) => l.slug === slug);
}
