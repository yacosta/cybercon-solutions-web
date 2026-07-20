import { privacyContent } from '../data/privacy';
import { services } from '../data/services';

function servicesMarkdown(locale: 'en' | 'es'): string {
  return services
    .map((s) => {
      const items = s.items.map((i) => `- ${i[locale]}`).join('\n');
      return `### ${s.id} — ${s.title[locale]}\n\n${items}`;
    })
    .join('\n\n');
}

const pages: Record<string, string> = {
  '/': `---
title: "Managed IT Services & Cybersecurity in South Florida | Cybercon Solutions"
description: "Managed IT, cybersecurity, cloud, and AI for South Florida businesses. Proactive by design. Secure by default."
---

# Cybercon Solutions

Your new IT department is being built.

The full site is under construction. While we finish, our team is already doing what we do best — preventing problems before they cost you.

**Proactive by design. Secure by default.**

## Book a free assessment

No jargon, no obligation — just a clear read on where your technology stands.

Submit name, company, and work email via the form on https://cybercon-solutions.com/ (protected by Cloudflare Turnstile).

## What we handle

One partner for your entire technology stack.

${servicesMarkdown('en')}

## Contact

info@cybercon-solutions.com · 973-573-0007 · Cooper City & Davie, Florida
`,
  '/es/': `---
title: "Servicios de TI Administrados y Ciberseguridad en el Sur de Florida | Cybercon Solutions"
description: "TI administrada, ciberseguridad, nube e IA para empresas del sur de Florida. Proactivos por diseño. Seguros por defecto."
---

# Cybercon Solutions

Estamos construyendo tu nuevo departamento de TI.

**Proactivos por diseño. Seguros por defecto.**

## Solicita una evaluación gratuita

Sin tecnicismos ni compromisos.

## Lo que gestionamos

${servicesMarkdown('es')}

## Contacto

info@cybercon-solutions.com · 973-573-0007
`,
  '/privacy/': privacyToMarkdown('en'),
  '/privacy': privacyToMarkdown('en'),
  '/es/privacy/': privacyToMarkdown('es'),
  '/es/privacy': privacyToMarkdown('es'),
  '/search/': `---
title: "Search | Cybercon Solutions"
---

# Search

Find pages and services across cybercon-solutions.com using the on-site search powered by Pagefind.
`,
  '/search': `---
title: "Search | Cybercon Solutions"
---

# Search

Find pages and services across cybercon-solutions.com using the on-site search powered by Pagefind.
`,
};

function privacyToMarkdown(locale: 'en' | 'es'): string {
  const p = privacyContent[locale];
  const parts = [
    '---',
    `title: "${p.metaTitle}"`,
    `description: "${p.metaDescription}"`,
    '---',
    '',
    `# ${p.title}`,
    '',
    p.lastUpdated,
    '',
    p.intro,
    '',
    `## ${p.controllerHeading}`,
    '',
    p.controller,
  ];

  for (const section of p.sections) {
    parts.push('', `## ${section.heading}`, '');
    if ('body' in section && section.body) parts.push(section.body, '');
    if ('blocks' in section && section.blocks) {
      for (const b of section.blocks) {
        parts.push(`### ${b.sub}`, '', b.body, '');
      }
    }
    if ('list' in section && section.list) {
      for (const item of section.list) parts.push(`- ${item}`);
      parts.push('');
    }
    if ('table' in section && section.table) {
      const { headers, rows } = section.table;
      parts.push(`| ${headers.join(' | ')} |`);
      parts.push(`| ${headers.map(() => '---').join(' | ')} |`);
      for (const row of rows) parts.push(`| ${row.join(' | ')} |`);
      parts.push('');
    }
    if ('after' in section && section.after) parts.push(section.after, '');
  }

  return parts.join('\n');
}

export function getPageMarkdown(pathname: string): string | null {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname : pathname;
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  const withoutSlash = withSlash === '/' ? '/' : withSlash.slice(0, -1);
  return pages[withSlash] ?? pages[withoutSlash] ?? pages[pathname] ?? null;
}
