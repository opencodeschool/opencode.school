export interface StudentProgress {
	completedLessons: string[];
	createdAt: string;
	updatedAt: string;
}

function kvKey(studentId: string): string {
	return `student:${studentId}`;
}

/** Fetch a student's progress from KV. Returns null if not found. */
export async function getProgress(
	kv: KVNamespace,
	studentId: string,
): Promise<StudentProgress | null> {
	return kv.get<StudentProgress>(kvKey(studentId), "json");
}

/** Create a new student record in KV. Returns the initial progress object. */
export async function createStudent(
	kv: KVNamespace,
	studentId: string,
): Promise<StudentProgress> {
	const now = new Date().toISOString();
	const progress: StudentProgress = {
		completedLessons: [],
		createdAt: now,
		updatedAt: now,
	};
	await kv.put(kvKey(studentId), JSON.stringify(progress));
	return progress;
}

/**
 * Mark a lesson as complete for a student. Idempotent — adding an already-completed
 * lesson is a no-op. Returns the updated progress, or null if the student doesn't exist.
 */
export async function markLessonComplete(
	kv: KVNamespace,
	studentId: string,
	lessonSlug: string,
): Promise<StudentProgress | null> {
	const progress = await getProgress(kv, studentId);
	if (!progress) return null;

	if (!progress.completedLessons.includes(lessonSlug)) {
		progress.completedLessons.push(lessonSlug);
	}
	progress.updatedAt = new Date().toISOString();
	await kv.put(kvKey(studentId), JSON.stringify(progress));
	return progress;
}
