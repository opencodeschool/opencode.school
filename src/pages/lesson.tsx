import type { FC } from "hono/jsx";
import type { Lesson, LessonMeta } from "../lib/lessons.ts";

interface LessonPageProps {
	lesson: Lesson;
	lessons: LessonMeta[];
	renderedContent: string;
	prev: LessonMeta | null;
	next: LessonMeta | null;
}

export const LessonPage: FC<LessonPageProps> = ({
	lesson,
	lessons,
	renderedContent,
	prev,
	next,
}) => {
	return (
		<div class="max-w-2xl">
			{/* Breadcrumb */}
			<div class="text-sm text-[var(--color-ink-muted)] mb-6 flex items-center gap-2">
				<a href="/" class="hover:text-[var(--color-accent)] transition-colors">
					Lessons
				</a>
				<span>/</span>
				<span>{lesson.title}</span>
			</div>

			{/* Lesson header */}
			<div class="mb-8">
				<p class="text-sm text-[var(--color-ink-muted)] mb-1">
					Lesson {lesson.order} of {lessons.length}
				</p>
				<h1 class="text-2xl">{lesson.title}</h1>
			</div>

			{/* Prose content — no card wrapper */}
			<div
				class="prose prose-sm max-w-none"
				dangerouslySetInnerHTML={{ __html: renderedContent }}
			/>

			{/* Mark complete */}
			<div class="mt-10 py-4 border-t border-[var(--color-border)]">
				<label class="flex items-center gap-3 cursor-pointer text-sm">
					<input type="checkbox" class="w-4 h-4 accent-violet-600" />
					<span>Mark this lesson as complete</span>
				</label>
			</div>

			{/* Prev/Next */}
			<div class="mt-4 grid grid-cols-2 gap-4">
				{prev ? (
					<a
						href={`/lessons/${prev.slug}`}
						class="border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors"
					>
						<div class="text-xs text-[var(--color-ink-muted)] mb-1">
							Previous
						</div>
						<span class="text-sm text-[var(--color-accent)]">
							← {prev.title}
						</span>
					</a>
				) : (
					<div class="border border-[var(--color-border)] rounded-lg p-4 opacity-40">
						<div class="text-xs text-[var(--color-ink-muted)] mb-1">
							Previous
						</div>
						<span class="text-sm text-[var(--color-ink-muted)]">
							No previous lesson
						</span>
					</div>
				)}
				{next ? (
					<a
						href={`/lessons/${next.slug}`}
						class="border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors text-right"
					>
						<div class="text-xs text-[var(--color-ink-muted)] mb-1">Next</div>
						<span class="text-sm text-[var(--color-accent)]">
							{next.title} →
						</span>
					</a>
				) : (
					<div class="border border-[var(--color-border)] rounded-lg p-4 opacity-40 text-right">
						<div class="text-xs text-[var(--color-ink-muted)] mb-1">Next</div>
						<span class="text-sm text-[var(--color-ink-muted)]">
							No next lesson
						</span>
					</div>
				)}
			</div>

			{/* Footer */}
			<div class="mt-12 text-center text-sm text-[var(--color-ink-muted)]">
				<p>
					opencode.school is an{" "}
					<a
						href="https://github.com/zeke/opencode.school"
						class="underline hover:text-[var(--color-accent)] transition-colors"
					>
						open source project
					</a>
				</p>
			</div>
		</div>
	);
};
