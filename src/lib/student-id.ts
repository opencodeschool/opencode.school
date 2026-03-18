const adjectives = [
	"based",
	"clever",
	"crafty",
	"curious",
	"extra",
	"hyped",
	"lowkey",
	"lucky",
	"nimble",
	"online",
	"scrappy",
	"sharp",
	"smooth",
	"vibing",
];

const nouns = [
	"builder",
	"coder",
	"crafter",
	"hacker",
	"maker",
	"minion",
	"operator",
	"scholar",
	"student",
	"tinkerer",
	"wizard",
];

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(): number {
	return Math.floor(Math.random() * 9000) + 1000; // 1000-9999
}

/**
 * Generate a student ID like "curious-hacker-2019".
 *
 * If a KV namespace is provided, checks for collisions and retries
 * up to `maxRetries` times.
 */
export async function generateStudentId(
	kv?: KVNamespace,
	maxRetries = 10,
): Promise<string> {
	for (let i = 0; i < maxRetries; i++) {
		const id = `${pick(adjectives)}-${pick(nouns)}-${randomNumber()}`;
		if (!kv) return id;

		const existing = await kv.get(`student:${id}`);
		if (!existing) return id;
	}
	throw new Error("Failed to generate a unique student ID after retries");
}

/** Validate that a string looks like a valid student ID format. */
export function isValidStudentId(id: string): boolean {
	return /^[a-z]+-[a-z]+-\d{4}$/.test(id);
}
