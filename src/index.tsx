import { Hono } from "hono";
import { BaseLayout } from "./layouts/base.tsx";
import { getLesson, getLessons } from "./lib/lessons.ts";
import { renderMarkdown } from "./lib/markdown.ts";
import { HomePage } from "./pages/home.tsx";
import { LessonPage } from "./pages/lesson.tsx";

const app = new Hono();

// Livereload: returns a unique ID that changes on each worker restart.
// The client polls this and reloads when the value changes.
const buildId = String(Date.now());
app.get("/dev/reload", (c) => {
	return c.json({ buildId });
});

app.get("/", (c) => {
	const lessons = getLessons();
	const html = (
		<BaseLayout title="opencode.school" lessons={lessons}>
			<HomePage lessons={lessons} />
		</BaseLayout>
	);
	return c.html(html);
});

app.get("/lessons/:slug", async (c) => {
	const slug = c.req.param("slug");
	const lessons = getLessons();
	const lesson = getLesson(slug);

	if (!lesson) {
		return c.text("Lesson not found", 404);
	}

	const renderedContent = await renderMarkdown(lesson.content);
	const currentIndex = lessons.findIndex((l) => l.slug === slug);
	const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null;
	const next =
		currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

	const html = (
		<BaseLayout
			title={`${lesson.title} — opencode.school`}
			lessons={lessons}
			currentSlug={slug}
		>
			<LessonPage
				lesson={lesson}
				lessons={lessons}
				renderedContent={renderedContent}
				prev={prev}
				next={next}
			/>
		</BaseLayout>
	);
	return c.html(html);
});

export default app;
