import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "static",
	adapter: cloudflare(),
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
});
