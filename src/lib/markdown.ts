import { Marked } from "marked";

export async function renderMarkdown(markdown: string): Promise<string> {
	const marked = new Marked({
		renderer: {
			code({ text, lang }) {
				const language = lang || "text";
				const escapedText = escapeHtml(text);
				const attrSafe = escapeAttr(text);

				return [
					`<div class="code-block not-prose">`,
					`<div class="code-block-header">`,
					`<span>${escapeHtml(language)}</span>`,
					`<button class="copy-btn" data-code="${attrSafe}" onclick="navigator.clipboard.writeText(this.dataset.code);this.textContent='copied!';setTimeout(()=>this.textContent='copy',1500)">copy</button>`,
					"</div>",
					`<pre><code class="language-${escapeHtml(language)}">${escapedText}</code></pre>`,
					"</div>",
				].join("");
			},
		},
	});

	return await marked.parse(markdown);
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** Escape for use inside an HTML attribute value — also encodes newlines. */
function escapeAttr(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/\n/g, "&#10;")
		.replace(/\r/g, "&#13;");
}
