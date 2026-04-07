# OpenCode School

A free, self-paced course for learning [OpenCode](https://opencode.ai), the open-source AI coding agent. Built with [Astro](https://astro.build) and deployed to [Cloudflare Workers](https://workers.cloudflare.com).

https://opencode.school

## Getting started

You'll need [Node.js](https://nodejs.org) (v20 or later) installed.

```sh
git clone https://github.com/opencodeschool/opencode.school.git
cd opencode.school
npm install
script/dev     # start the dev server
```

Other useful scripts:

```sh
script/build   # build for production
script/test    # run tests
script/lint    # run linter
```

## Deploying

The site is deployed to Cloudflare Workers via GitHub Actions on push to `main`. If you fork the repo and want to deploy your own instance, you'll need a Cloudflare account with a KV namespace and R2 bucket. See `wrangler.jsonc` for details. Local development does not require a Cloudflare account.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get involved.

## Architecture

See [AGENTS.md](AGENTS.md) for architecture details, content authoring guidelines, and AI agent instructions.

## License

[Apache 2.0](LICENSE)
