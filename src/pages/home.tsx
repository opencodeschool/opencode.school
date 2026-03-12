import type { FC } from "hono/jsx";
import type { LessonMeta } from "../lib/lessons.ts";

interface HomePageProps {
	lessons: LessonMeta[];
}

export const HomePage: FC<HomePageProps> = ({ lessons }) => {
	return (
		<div class="max-w-2xl">
			{/* Tagline */}
			<div class="mb-8">
				<p class="text-[var(--color-ink-muted)] leading-relaxed">
					Learn to use OpenCode, the open source AI coding agent. No terminal
					experience required.
				</p>
			</div>

			{/* Progress */}
			<div class="mb-8 flex items-center gap-3 text-sm">
				<span class="text-[var(--color-ink-muted)]">Progress</span>
				<div class="flex-1 max-w-48 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
					<div
						class="h-full bg-[var(--color-accent)] rounded-full transition-all"
						style="width: 0%"
					/>
				</div>
				<span class="text-[var(--color-ink-muted)]">0 / {lessons.length}</span>
			</div>

			{/* Lesson list */}
			<div class="space-y-0 divide-y divide-[var(--color-border)]">
				{lessons.map((lesson) => (
					<a
						key={lesson.slug}
						href={`/lessons/${lesson.slug}`}
						class="flex items-start gap-4 py-4 group"
					>
						<span class="text-sm text-[var(--color-ink-muted)] w-6 text-right shrink-0 mt-0.5">
							{String(lesson.order).padStart(2, "0")}
						</span>
						<div class="flex-1 min-w-0">
							<span class="group-hover:text-[var(--color-accent)] transition-colors">
								{lesson.title}
							</span>
							<p class="text-sm text-[var(--color-ink-muted)] mt-0.5">
								{lesson.description}
							</p>
						</div>
					</a>
				))}
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
