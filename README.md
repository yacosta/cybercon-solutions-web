# Cybercon Solutions Web

Astro site for [cybercon-solutions.com](https://cybercon-solutions.com) — managed IT & cybersecurity (South Florida).

**Stack:** Astro 7 · Cloudflare Workers (`@astrojs/cloudflare`) · Turnstile · Pagefind · Auth0 client area

**Brand:** [cybercon-brand-identity](../cybercon-brand-identity)

## Cutover note

Production should serve this Astro Worker (`cybercon-solutions-web`), not the older static coming-soon HTML. After merge to `main`, trigger the Cloudflare Workers Git deploy (or `npm run deploy` with Wrangler auth). Confirm `/services/managed-it/`, `/sitemap-index.xml`, and `/llms.txt` return 200.

## Features

- EN / ES homepage with full-bleed hero video (server racks), assessment form + Turnstile
- Privacy & Cookie Policy (`/privacy/`, `/es/privacy/`) + consent banner (`cybercon-consent-v1`)
- Analytics gated behind consent (`PUBLIC_GA_MEASUREMENT_ID`)
- SEO: meta, OG/Twitter, JSON-LD, sitemap, hreflang
- ADA: skip link, landmarks, labels, focus styles, reduced-motion hero fallback
- Agent-ready (isitagentready.com): `robots.txt` + Content Signals + AI bot rules, `llms.txt`, Markdown negotiation (`Accept: text/markdown`), Link headers, API catalog, auth.md, MCP server card, Agent Skills, WebMCP tools, Web Bot Auth JWKS
- Pagefind site search
- Auth0-protected `/client/` area

## Hosting: Cloudflare Workers (Workers & Pages)

**Do not create a legacy Pages project.** Astro 7 + `@astrojs/cloudflare` deploys as a **Worker with static assets** (SSR for forms, Turnstile, Auth0 `/client/`). Use the shared **Workers & Pages** area, but create/connect a **Worker** named `cybercon-solutions-web`.

Worker / package name: `cybercon-solutions-web` (`wrangler.jsonc` + `package.json`).

### One-click: connect GitHub in the dashboard

1. Push this repo to GitHub: [yacosta/cybercon-solutions-web](https://github.com/yacosta/cybercon-solutions-web) (initial commit required if the remote is empty).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** (Import a repository / Connect to Git).
3. Select GitHub repo `yacosta/cybercon-solutions-web`, production branch `main`.
4. Name the Worker: **`cybercon-solutions-web`**.
5. Use these **Build** settings:

| Setting | Value |
|---------|--------|
| **Project / Worker name** | `cybercon-solutions-web` |
| **Root directory** | `/` (repo root; leave blank) |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| **Non-production deploy** | `npx wrangler versions upload` (default) |
| **Node version** | `22` (Build variable `NODE_VERSION=22`, or ensure account default ≥ 22.12) |

6. After the first successful build, open the Worker → **Settings → Domains & Routes** (Custom Domains) and attach `cybercon-solutions.com` (and `www` if needed).
7. Set **runtime** env vars under **Settings → Variables and Secrets** (table below). Build-only vars go under **Settings → Build** if you need secrets at compile time; this project reads secrets at runtime.

`npm run build` runs `astro build` then Pagefind into `dist/client/pagefind`. Astro redirects Wrangler to `dist/server/wrangler.json` and serves assets from `dist/client`.

### CLI deploy (local)

Requires `npx wrangler login` once (OAuth). Not authenticated in this environment yet.

```bash
npm run build
npx wrangler deploy
# or: npm run deploy   # build + deploy
```

### CI/CD: GitHub Actions → Cloudflare Workers

This repo ships two workflows in `.github/workflows/`:

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Pull requests to `main`, pushes to non-`main` branches | `npm ci` → `npm run build` → `wrangler deploy --dry-run` (bundles the Worker, no Cloudflare credentials needed) |
| `deploy.yml` | Pushes to `main`, manual `workflow_dispatch` | `npm ci` → `npm run build` → `wrangler deploy` (production) |

Add these **GitHub repository secrets** (Settings → Secrets and variables → Actions) for `deploy.yml`:

| Secret | Notes |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with the **Edit Cloudflare Workers** template permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account ID |

Runtime variables/secrets (Turnstile, Web3Forms, Auth0, `SESSION_SECRET`) are **not** needed by the workflows — set those on the Worker itself (table below). GitHub Actions is an alternative to the dashboard **Workers Builds** Git integration above; use one or the other to avoid double deploys.

### Environment variables (Workers → Settings → Variables and Secrets)

Set these on the **Worker** `cybercon-solutions-web` (not GitHub Actions secrets). The app reads them at runtime via `cloudflare:workers`.

| Variable | Required | Notes |
|----------|----------|--------|
| `PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod forms) | Cloudflare Turnstile site key (also set as a **Build** var if you want it baked into prerendered HTML) |
| `TURNSTILE_SECRET_KEY` | Yes (prod forms) | Turnstile secret |
| `WEB3FORMS_ACCESS_KEY` | Optional | Email alert for assessment submissions |
| `ATTIO_API_KEY` | Recommended | Upserts form submitters to Attio as People/Companies (prospects) |
| `ATTIO_PROSPECTS_LIST_ID` | Optional | Attio People list ID/slug to add each prospect into |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID; loads only after Accept analytics |
| `AUTH0_DOMAIN` | For client area | e.g. `your-tenant.auth0.com` |
| `AUTH0_CLIENT_ID` | For client area | |
| `AUTH0_CLIENT_SECRET` | For client area | Secret |
| `AUTH0_BASE_URL` | For client area | `https://cybercon-solutions.com` |
| `AUTH0_AUDIENCE` | Optional | |
| `SESSION_SECRET` | For client area | Long random string (Secret) |

Optional build variable: `NODE_VERSION=22`.

**Verify bindings:** `GET https://cybercon-solutions.com/api/health` should return `"attio": true` (and `"turnstile": true` when that secret is set). If those flags are `false`, the Worker does not have the secret yet — form submits will still return `{ ok: true }` but skip CRM.

Auth0 application callback URL: `https://cybercon-solutions.com/client/callback`  
Logout return: `https://cybercon-solutions.com/client/`

### DNS-AID (optional, Level 5 agent score)

In Cloudflare DNS for `cybercon-solutions.com`, add SVCB/HTTPS discovery:

- Name: `_index._agents`
- Type: `SVCB` (or HTTPS)
- Target: `cybercon-solutions.com`
- ALPN: `h2,h3` port `443`

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

```bash
npm run build    # astro build + pagefind
npm run preview
```

## Agent readiness checklist

After deploy, scan: `POST https://isitagentready.com/api/scan` with `{"url":"https://cybercon-solutions.com"}`

Expect passes for content-site checks:

- Discoverability: robots.txt, sitemap, Link headers
- Content: Markdown negotiation
- Bot control: AI bot rules + Content Signals + Web Bot Auth directory
- Protocol: API catalog, auth.md, MCP card, OAuth discovery (Auth0 or stub), Agent Skills, WebMCP

## Privacy & cookies

- Banner: accept / decline analytics; `localStorage.cybercon-consent-v1`
- Footer **Cookie settings** reopens the dialog
- Policy pages mirror live-site legal content (Auth0, Turnstile, Workers hosting)

## Project layout

```
src/
  components/   Hero, AssessmentForm, CookieBanner, PrivacyPage, …
  layouts/      BaseLayout (SEO + ADA + WebMCP)
  pages/        /, /es/, /privacy/, /client/, /api/, /search/
  lib/          auth0, turnstile, seo, markdown-pages
public/
  robots.txt, llms.txt, auth.md, openapi.json, _headers, .assetsignore
  .well-known/  api-catalog, mcp, agent-skills, web-bot-auth JWKS
  videos/       hero-server-racks.webm, hero-poster.jpg
```
