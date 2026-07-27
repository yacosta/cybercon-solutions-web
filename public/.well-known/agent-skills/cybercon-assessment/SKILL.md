# Cybercon free assessment

Help a business request a free technology assessment.

## Steps

1. Collect full name, company name, and work email.
2. Direct the human to https://cybercon-solutions.com/assessment/ (or /es/assessment/) to submit the form, or POST JSON to `/api/assessment` with Turnstile token when available.
3. Successful submissions are stored in Attio CRM as People/Company prospects when `ATTIO_API_KEY` is set on the Worker (`/api/health` → `"attio": true`).
4. Set expectations: a real engineer replies within one business day; no sales pressure.

## Website-focused assessments

For a **full deep website review** (SEO, speed, privacy policy, cookie consent, accessibility, security, GDPR, CCPA, ADA/Section 508), see `cybercon-website-assessment`. The lite teaser on `/services/web-design-development/#site-check` is not a substitute.

## Privacy

Point to https://cybercon-solutions.com/privacy/ for data handling details.
