import type { FC } from "hono/jsx";
import type { LessonMeta } from "../lib/lessons.ts";

interface BaseLayoutProps {
	title: string;
	lessons: LessonMeta[];
	currentSlug?: string;
	children: unknown;
}

export const BaseLayout: FC<BaseLayoutProps> = ({
	title,
	lessons,
	currentSlug,
	children,
}) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{title}</title>
				<meta
					name="description"
					content="Learn to use OpenCode, the open source AI coding agent."
				/>
				<link rel="stylesheet" href="/styles/main.css" />
				<link rel="stylesheet" href="/styles/custom.css" />
			</head>
			<body class="font-mono min-h-screen">
				<div class="flex min-h-screen">
					{/* Mobile header */}
					<header class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)] lg:hidden">
						<a href="/" class="text-xl font-medium tracking-tight">
							opencode
							<span class="text-[var(--color-accent)]">.school</span>
						</a>
						<button
							type="button"
							id="sidebar-toggle"
							class="p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
							aria-label="Toggle navigation"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								<path d="M3 5h14M3 10h14M3 15h14" />
							</svg>
						</button>
					</header>

					{/* Sidebar overlay for mobile */}
					<div
						id="sidebar-overlay"
						class="fixed inset-0 z-40 bg-black/50 hidden lg:hidden"
					/>

					{/* Sidebar */}
					<aside
						id="sidebar"
						class="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--color-surface-alt)] border-r border-[var(--color-border)] p-6 flex flex-col shrink-0 transform -translate-x-full transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 xl:w-80"
					>
						<a href="/" class="text-xl font-medium tracking-tight mb-8 hidden lg:block">
							opencode
							<span class="text-[var(--color-accent)]">.school</span>
						</a>

						{/* Close button for mobile */}
						<button
							type="button"
							id="sidebar-close"
							class="absolute top-4 right-4 p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] lg:hidden"
							aria-label="Close navigation"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								<path d="M5 5l10 10M15 5L5 15" />
							</svg>
						</button>

						<nav class="flex-1 overflow-y-auto mt-12 lg:mt-0">
							<a
								href="/"
								class={`flex items-center gap-2 px-3 py-2 rounded text-sm mb-1 transition-colors ${
									!currentSlug
										? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
										: "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
								}`}
							>
								Home
							</a>

							<div class="mt-4 mb-2 px-3 text-xs text-[var(--color-ink-muted)] uppercase tracking-wider">
								Lessons
							</div>

							{lessons.map((lesson) => (
								<a
									key={lesson.slug}
									href={`/lessons/${lesson.slug}`}
									class={`flex items-center gap-2.5 px-3 py-1.5 rounded text-sm transition-colors ${
										currentSlug === lesson.slug
											? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
											: "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
									}`}
								>
									<span class="text-xs opacity-50 w-5 shrink-0">
										{String(lesson.order).padStart(2, "0")}
									</span>
									<span class="truncate">{lesson.title}</span>
								</a>
							))}
						</nav>

						<div class="text-xs text-[var(--color-ink-muted)] mt-auto pt-4 border-t border-[var(--color-border)]">
							<a
								href="https://github.com/zeke/opencode.school"
								class="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 98 96"
									fill="currentColor"
									class="shrink-0 opacity-60"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
									/>
								</svg>
								<span>View source</span>
							</a>
						</div>
					</aside>

					{/* Main content */}
					<main class="flex-1 min-w-0 pt-14 lg:pt-0">
						<div class="p-6 lg:p-8">{children}</div>
					</main>
				</div>

				{/* Sidebar toggle script */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
					const toggle = document.getElementById('sidebar-toggle');
					const close = document.getElementById('sidebar-close');
					const sidebar = document.getElementById('sidebar');
					const overlay = document.getElementById('sidebar-overlay');

					function openSidebar() {
						sidebar.classList.add('sidebar-open');
						overlay.classList.remove('hidden');
						document.body.style.overflow = 'hidden';
					}

					function closeSidebar() {
						sidebar.classList.remove('sidebar-open');
						overlay.classList.add('hidden');
						document.body.style.overflow = '';
					}

					if (toggle) toggle.addEventListener('click', openSidebar);
					if (close) close.addEventListener('click', closeSidebar);
					if (overlay) overlay.addEventListener('click', closeSidebar);

					// Livereload: poll the server for changes and reload when the worker restarts
					(function() {
						let lastBuildId = null;
						async function check() {
							try {
								const res = await fetch('/dev/reload');
								const data = await res.json();
								if (lastBuildId && lastBuildId !== data.buildId) {
									location.reload();
								}
								lastBuildId = data.buildId;
							} catch {}
						}
						setInterval(check, 1000);
						check();
					})();
				`,
					}}
				/>
			</body>
		</html>
	);
};
