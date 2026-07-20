# auth.md

You are an agent. Cybercon Solutions supports machine-readable discovery for public site content and authenticated client-area access via Auth0.

## Step 1 — Discover

### Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
```

### Authorization Server (Auth0)

When Auth0 is configured for the client area, OpenID Connect discovery is available at:

```http
GET https://{AUTH0_DOMAIN}/.well-known/openid-configuration
```

Also advertised from this site:

```http
GET /.well-known/oauth-authorization-server
```

(This endpoint redirects or proxies Auth0 metadata when `AUTH0_DOMAIN` is set.)

## Step 2 — Public content (no auth)

- `GET /llms.txt` — curated map
- `GET /llms-full.txt` — longer summary
- `GET /openapi.json` — public HTTP API
- `Accept: text/markdown` on HTML pages — Markdown variants
- `GET /api/health` — health check

## Step 3 — Human client area

Browser users sign in via Auth0 at `/client/login` (authorization code + session cookie). Agents should not scrape the client area; use Auth0 with human consent when account actions are required.

## Contact

info@cybercon-solutions.com · https://cybercon-solutions.com/privacy/
