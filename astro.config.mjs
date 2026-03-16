import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [mdx()],
	security: {
		checkOrigin: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
