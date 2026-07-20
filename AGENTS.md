## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Cursor Cloud specific instructions

- Node 22 is required (`.node-version`, `engines.node >=22.12`). Package manager is npm (`package-lock.json`).
- Copy `.env.example` to `.env` for local dev (`.env` is gitignored). All third-party keys (Turnstile, Web3Forms, Auth0) are optional locally — the app degrades gracefully without them.
- The dev server (`astro dev --background`, port 4321) serves everything needed to test the site: EN/ES homepages, `/privacy/`, `/api/health`, and the assessment form.
- Assessment form (`/api/assessment`, core lead-capture flow) works with no keys: when `TURNSTILE_SECRET_KEY` is unset the Turnstile widget/verification is skipped, and when `WEB3FORMS_ACCESS_KEY` is unset the submission is logged to the dev server console (`[assessment] {...}`) and returns `{ok:true}`. To see logs use `astro dev logs`.
- There are no lint or test scripts. `astro check` is not wired up (it would prompt to install `@astrojs/check`, which is not a project dependency), so build is the main validation gate.
- `npm run build` runs `astro build` then Pagefind indexing into `dist/client/pagefind`; site search only works against a build, not the dev server.
- Cloudflare types: `npm run generate-types` (wrangler) writes the gitignored `worker-configuration.d.ts`. Deploy (`wrangler deploy`) requires Cloudflare OAuth and is not runnable in this environment.
- Styling: Tailwind CSS v4 is wired via the `@tailwindcss/vite` plugin (`astro.config.mjs` → `vite.plugins`) and imported in `src/styles/global.css`. Preflight (Tailwind's reset) is intentionally excluded — `global.css` imports only `tailwindcss/theme.css` + `tailwindcss/utilities.css` — because the site ships its own hand-authored reset/design and full Preflight would collapse heading sizes. Utilities live in `@layer utilities`, while the site's base/component CSS is unlayered, so unlayered site rules win over utility classes on the same element/property (e.g. a `bg-*` utility on `<body>` loses to the existing `body` background). This is fine for styling new markup; to override an existing global rule, edit that rule or use `!` (e.g. `bg-white!`).
- Tailwind dev gotcha: the dev server scans source files for used classes at startup. If you add a brand-new file using utilities that don't appear anywhere else, restart `astro dev` so the new utilities are generated (production `astro build` always regenerates from scratch).
