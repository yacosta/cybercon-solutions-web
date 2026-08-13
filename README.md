# Cybercon Solutions Web

Astro site for [cybercon-solutions.com](https://cybercon-solutions.com) — managed IT & cybersecurity (South Florida).

**Stack:** Astro 7 · Cloudflare Workers (`@astrojs/cloudflare`) · Turnstile · Pagefind · Auth0 client area

**Brand:** [cybercon-brand-identity](../cybercon-brand-identity)

## Cutover note

Production should serve this Astro Worker (`cybercon-solutions-web`), not the older static coming-soon HTML. After merge to `main`, trigger the Cloudflare Workers Git deploy (or `npm run deploy` with Wrangler auth). Confirm `/services/managed-it/`, `/sitemap-index.xml`, and `/llms.txt` return 200.

## Features

- EN / ES homepage with full-bleed hero video (server racks), assessment form + Turnstile
- Free lite website check on Web Design & Development (`/services/web-design-development/#site-check`, short URL `/site-check/` redirects) → `/api/site-check` — surface teaser (live fetch, BuiltWith, Gemini/OpenAI/Anthropic or heuristic) that surfaces one finding and CTAs to call / book a deeper assessment; Attio lead capture
- Free lite breach check on Cybersecurity (`/services/cybersecurity/#breach-check`, short URL `/breach-check/` redirects) → `/api/breach-check` — Have I Been Pwned email exposure snapshot + assessment CTA; Attio lead capture
- Lead-assist chat widget sitewide → `/api/chat` — rotating AI guides (**Sophia**, **Luci**, **Gabriella**, **Angel**) with headshots; in-widget language toggle; allowlisted Cybercon knowledge (Gemini/OpenAI/Anthropic or FAQ fallback); CTA chips to assessment / site check / contact; optional Attio lead when a work email appears
- Privacy & Cookie Policy (`/privacy/`, `/es/privacy/`) + consent banner with prior opt-in for non-essential cookies (`cybercon_consent` / `cybercon-consent-v1`)
- Analytics gated behind consent (`PUBLIC_GA_MEASUREMENT_ID`, Apollo.io website tracker) with Google Consent Mode v2 defaults denied
- SEO: meta, OG/Twitter, JSON-LD, sitemap, hreflang
- ADA: skip link, landmarks, labels, focus styles, reduced-motion hero fallback
- Agent-ready (isitagentready.com): `robots.txt` + Content Signals + AI bot rules, `llms.txt`, Markdown negotiation (`Accept: text/markdown`), Link headers, API catalog, auth.md, MCP server card, Agent Skills, WebMCP tools, Web Bot Auth JWKS
- Pagefind site search
- Auth0-protected `/client/` area

### Cookie consent & ePrivacy (prior consent)

Non-essential cookies and trackers (Google Analytics; Apollo.io website tracker; optional Zaraz tools) must not run until the visitor accepts them in the banner. Rejecting non-essential cookies leaves only strictly necessary ones (consent preference, Turnstile on forms, client-area session).

| Piece | Behavior |
|-------|----------|
| Banner | Visible on first visit; Accept analytics / Reject non-essential; reopen via footer **Cookie settings** |
| Storage | First-party cookie `cybercon_consent` + `localStorage` key `cybercon-consent-v1` (`accept` \| `decline`) |
| Google Consent Mode | Defaults `analytics_storage` / ads to `denied` in `<head>`; gtag.js loads only after accept |
| Zaraz | If Zaraz Consent Management is enabled in the dashboard, the banner syncs via `zaraz.consent.setAll()` |

**Cloudflare Zaraz Consent Management (dashboard):** when you load tools through Zaraz, enable CMP so tools wait for consent:

1. Cloudflare dashboard → **Zaraz** → **Consent** for zone `cybercon-solutions.com`
2. Turn on **Enable Consent Management**
3. Add a purpose (e.g. “Analytics”) and assign GA / other non-essential tools to it
4. Prefer **hiding Zaraz’s default modal** (or leave it off) — this site’s banner is the UI; it calls the Zaraz Consent API when present
5. Re-check purpose assignment whenever you add a new Zaraz tool (unassigned tools skip consent by default)

Do **not** load third-party marketing/analytics scripts outside this consent gate.
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
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with the **Edit Cloudflare Workers** template permissions. For the Zaraz cache-header step, also add **Zone → Transform Rules → Edit** (and **Account → Account Rulesets → Read**). |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account ID (`61ffaf16829b400974986c7576f6165d`) |

Zone ID for `cybercon-solutions.com` is `41a145bf2688a227f9e321a31055fe19` (wired into `deploy.yml` for the Zaraz cache step; not a secret).

#### Zaraz `s.js` browser cache (Lighthouse)

`/cdn-cgi/zaraz/s.js` is injected by Cloudflare Zaraz — it is **not** covered by `public/_headers`. Deploy runs `npm run cf:zaraz-cache` to upsert a Response Header Transform (`Cache-Control: public, max-age=604800`).

If that step fails (token missing Transform Rules Edit), create the rule once in the dashboard:

1. Rules → Overview → Create rule → **Modify response header**
2. When: `(starts_with(http.request.uri.path, "/cdn-cgi/zaraz/s.js"))`
3. Then: Set static → `Cache-Control` = `public, max-age=604800` (7 days)

#### Legacy WordPress URLs (GSC crawl errors)

Path leftovers live in `public/_redirects` (301, not 404/5xx):

| Old URL | Destination |
|---------|-------------|
| `/home/` | `/` |
| `/under-construction/` | `/` |
| `/comments/feed/`, `/feed/` | `/blog/` |
| `/phone-systems/` | `/services/managed-it/` (legacy VoIP page — not a live URL to index) |
| `/wp-admin/admin-ajax.php` | leave 404 (WordPress backend stub) |

`/?page_id=82` (and `?p=`) cannot be matched in `_redirects` — query matching is unsupported. The prerendered homepage would 200 the same HTML, which GSC flags as a soft 404. **`npm run build` wraps the Worker** (`scripts/wrap-worker-wp-query.mjs`) so GitHub `wrangler deploy` 301s those URLs to `/` or `/es/` without extra Cloudflare token scopes. `run_worker_first` is limited to `/` and `/es/` so other prerendered pages stay static-first.

`npm run cf:wp-query-redirect` can still upsert a zone Single Redirect if the token later gains **Redirect Rules Edit**; it is optional (the Worker wrapper is the source of truth).

If Googlebot still sees **403** on a URL that already 301s in `_redirects` (historically `/phone-systems/`), it is zone WAF / Super Bot Fight / leftover WordPress **Automatic Platform Optimization** (`cf-apo-via` on HTML responses) — skip Googlebot in the firewall and disable APO (this site is a Worker, not WordPress). Do not add a new page for a retired slug.

Runtime variables/secrets (Turnstile, Web3Forms, Auth0, `SESSION_SECRET`) are **not** needed by the workflows — set those on the Worker itself (table below). GitHub Actions is an alternative to the dashboard **Workers Builds** Git integration above; use one or the other to avoid double deploys.

### Environment variables (Workers → Settings → Variables and Secrets)

Set these on the **Worker** `cybercon-solutions-web` (not GitHub Actions secrets). The app reads them at runtime via `cloudflare:workers`.

**Important:** Prefer **Secret** type for anything sensitive. Plaintext dashboard vars used to be wiped on each GitHub deploy; the Worker now uses `keep_vars` so plaintext vars persist. Secrets (like `ATTIO_API_KEY`) always persist.

| Variable | Required | Notes |
|----------|----------|--------|
| `PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod forms) | Cloudflare Turnstile site key (also set as a **Build** var if you want it baked into prerendered HTML) |
| `TURNSTILE_SECRET_KEY` | Yes (prod forms) | Turnstile secret |
| `WEB3FORMS_ACCESS_KEY` | Optional | Email alert for assessment submissions (backup; Attio is primary) |
| `ATTIO_API_KEY` | **Required for CRM** | Upserts form submitters to Attio as People/Companies (prospects) |
| `ATTIO_PROSPECTS_LIST_ID` | Optional | Attio People list ID/slug to add each prospect into |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID; loads only after Accept analytics |
| `PUBLIC_APOLLO_APP_ID` | Optional | Apollo.io website tracker app ID; defaults on; set `off` to disable; loads only after Accept analytics |
| `AUTH0_DOMAIN` | For client area | e.g. `your-tenant.auth0.com` |
| `AUTH0_CLIENT_ID` | For client area | |
| `AUTH0_CLIENT_SECRET` | For client area | Secret |
| `AUTH0_BASE_URL` | For client area | `https://cybercon-solutions.com` |
| `AUTH0_AUDIENCE` | Optional | |
| `SESSION_SECRET` | For client area | Long random string (Secret) |
| `ANTHROPIC_API_KEY` | For AI site check | One of Gemini / OpenAI / Anthropic (Secret). Auto-picks Gemini → OpenAI → Anthropic |
| `GEMINI_API_KEY` | Preferred for site check | Google AI Studio key — Gemini Flash + Search grounding (recommended) |
| `OPENAI_API_KEY` | Alt for site check | OpenAI key — Responses API + web_search, else chat JSON |
| `SITE_CHECK_AI_PROVIDER` | Optional | Force `gemini` \| `openai` \| `anthropic` |
| `SITE_CHECK_AI_MODEL` | Optional | Override default model for the chosen provider |
| `BUILTWITH_API_KEY` | Optional | BuiltWith Free API — tech chips / verification |
| `SITE_CHECK_WEBHOOK_URL` | Optional | If set, proxy scans to n8n (or similar) instead of the native Worker pipeline |
| `SITE_CHECK_IP_DAILY_LIMIT` | Optional | Soft per-IP daily cap (default `2`) |
| `SITE_CHECK_GLOBAL_DAILY_LIMIT` | Optional | Soft global daily cap (default `25`) |
| `HIBP_API_KEY` | For breach check | Have I Been Pwned API v3 key (Secret) — https://haveibeenpwned.com/API/Key |
| `BREACH_CHECK_IP_DAILY_LIMIT` | Optional | Soft per-IP daily cap (default `2`) |
| `BREACH_CHECK_GLOBAL_DAILY_LIMIT` | Optional | Soft global daily cap (default `25`) |

Optional build variable: `NODE_VERSION=22`.

**Verify bindings:** `GET https://cybercon-solutions.com/api/health` should return `"attio": true` (and `"turnstile": true` / `"auth0": true` / `siteCheck.builtwith` / `breachCheck.hibp` when those secrets are set). If those flags are `false`, the Worker does not have the secret yet — form submits will still return `{ ok: true }` but skip CRM, and `/client/` will not start Auth0 login.

### Connect Attio (assessment form → CRM)

Website forms already call Attio when `ATTIO_API_KEY` is present. Production is live when `/api/health` shows `"attio": true`.

1. In [Attio](https://app.attio.com/) → **Workspace settings → Developers → API keys**, create a key with:
   - `record_permission:read-write`
   - `object_configuration:read`
   - `note:read-write`
   - Optional (prospects list): `list_entry:read-write`, `list_configuration:read`
2. Cloudflare dashboard → **Workers & Pages** → **`cybercon-solutions-web`** → **Settings → Variables and Secrets**:
   - Add **`ATTIO_API_KEY`** as a **Secret** (paste the Attio key)
   - Optional: **`ATTIO_PROSPECTS_LIST_ID`** (People list ID or slug)
3. Confirm: `GET https://cybercon-solutions.com/api/health` → `"attio": true`
4. Submit `/assessment/` once — a Person (+ Company, note) should appear in Attio within seconds

Do **not** put the Attio key in GitHub. Only the Worker needs it.

### Auth0 client area (`/client/`)

The login UI and OAuth routes are already in the app. You only need an Auth0 Application + Worker secrets.

1. In [Auth0 Dashboard](https://manage.auth0.com/) → **Applications → Applications → Create Application**
   - Name: `Cybercon Solutions Web`
   - Type: **Regular Web Application**
2. On the app **Settings** tab, set:

| Field | Value |
|-------|--------|
| **Allowed Callback URLs** | `https://cybercon-solutions.com/client/callback` (plus `http://localhost:4321/client/callback` for local) |
| **Allowed Logout URLs** | `https://cybercon-solutions.com/client/` (plus `http://localhost:4321/client/`) |
| **Allowed Web Origins** | `https://cybercon-solutions.com` (plus `http://localhost:4321`) |

3. Copy **Domain**, **Client ID**, and **Client Secret** from that page.
4. On Cloudflare → Workers → `cybercon-solutions-web` → **Settings → Variables and Secrets**, add:

| Name | Type | Value |
|------|------|--------|
| `AUTH0_DOMAIN` | Text or Secret | e.g. `your-tenant.us.auth0.com` (no `https://`) |
| `AUTH0_CLIENT_ID` | Text or Secret | from Auth0 |
| `AUTH0_CLIENT_SECRET` | **Secret** | from Auth0 |
| `AUTH0_BASE_URL` | Text or Secret | `https://cybercon-solutions.com` |
| `SESSION_SECRET` | **Secret** | long random string (`openssl rand -base64 48`) |

Re-add these after enabling `keep_vars` if a prior deploy cleared plaintext values. Then confirm `/api/health` → `"auth0": true`.

5. Confirm: `GET /api/health` → `"auth0": true`, then open `/client/` → **Sign in**.

Optional: create a test user under Auth0 → **User Management → Users** if you are not using a social connection yet. Leave `AUTH0_AUDIENCE` empty unless you also configure an Auth0 API.

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
  components/   Hero, AssessmentForm, SiteCheck, CookieBanner, PrivacyPage, …
  layouts/      BaseLayout (SEO + ADA + WebMCP)
  pages/        /, /es/, /services/, /privacy/, /client/, /api/, /search/
  lib/          auth0, turnstile, seo, markdown-pages, site-check/
public/
  robots.txt, llms.txt, auth.md, openapi.json, _headers, .assetsignore
  .well-known/  api-catalog, mcp, agent-skills, web-bot-auth JWKS
  videos/       hero-server-racks.webm, hero-poster.{avif,webp,jpg} (+ 768/960w)
```
