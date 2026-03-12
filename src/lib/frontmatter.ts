/**
 * Minimal YAML frontmatter parser.
 * Parses the --- delimited block at the start of a string.
 */
export default function frontmatter(raw: string): {
	attributes: Record<string, string>;
	body: string;
} {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) {
		return { attributes: {}, body: raw };
	}

	const [, yamlBlock, body] = match;
	const attributes: Record<string, string> = {};

	for (const line of yamlBlock.split("\n")) {
		const colonIndex = line.indexOf(":");
		if (colonIndex === -1) continue;
		const key = line.slice(0, colonIndex).trim();
		let value = line.slice(colonIndex + 1).trim();
		// Strip surrounding quotes
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		attributes[key] = value;
	}

	return { attributes, body };
}
