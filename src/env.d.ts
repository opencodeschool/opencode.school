/// <reference types="astro/client" />

interface CloudflareEnv {
	PROGRESS: KVNamespace;
}

declare module "cloudflare:workers" {
	const env: CloudflareEnv;
	export { env };
}
