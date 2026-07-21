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
description: "Free assessment for managed IT, cybersecurity, cloud, and AI in Cooper City & Davie, Florida. We catch issues early and treat security as the baseline."
---

# Cybercon Solutions

Your IT department, without the overhead.

Managed IT, cybersecurity, cloud, and AI. We catch problems early, and we treat security as the baseline. Tell us where to start and a real engineer will follow up within one business day.

**We catch issues early and treat security as the baseline.**

## Book a free assessment

Plain English, no obligation. You get a clear picture of where your technology stands.

Submit name, company, and work email via the form on https://cybercon-solutions.com/ (protected by Cloudflare Turnstile).

## What we handle

One partner for all of your technology. We manage everything below proactively, with predictable per-user pricing. No break/fix surprises, and no jargon.

${servicesMarkdown('en')}

## Contact

info@cybercon-solutions.com · 973-573-0007 · Cooper City & Davie, Florida
`,
  '/es/': `---
title: "Servicios de TI Administrados y Ciberseguridad en el Sur de Florida | Cybercon Solutions"
description: "Evaluación gratuita de TI administrada, ciberseguridad, nube e IA en Cooper City y Davie, Florida. Detectamos problemas a tiempo y tratamos la seguridad como la base."
---

# Cybercon Solutions

Tu departamento de TI, sin la sobrecarga.

TI administrada, ciberseguridad, nube e IA. Detectamos los problemas a tiempo y tratamos la seguridad como la base. Dinos por dónde empezar y un ingeniero real te responde en un día hábil.

**Detectamos problemas a tiempo y tratamos la seguridad como la base.**

## Solicita una evaluación gratuita

Sin tecnicismos y sin compromiso. Te damos una lectura clara del estado de tu tecnología.

Envía nombre, empresa y correo de trabajo en el formulario de https://cybercon-solutions.com/es/ (protegido con Cloudflare Turnstile).

## Lo que gestionamos

Un solo aliado para toda tu tecnología. Gestionamos todo lo siguiente de forma proactiva, con un precio predecible por usuario. Sin sorpresas por averías y sin tecnicismos.

${servicesMarkdown('es')}

## Contacto

info@cybercon-solutions.com · 973-573-0007 · Cooper City y Davie, Florida
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
  '/es/search/': `---
title: "Buscar | Cybercon Solutions"
---

# Buscar

Encuentra páginas y servicios en cybercon-solutions.com con la búsqueda del sitio (Pagefind).
`,
  '/es/search': `---
title: "Buscar | Cybercon Solutions"
---

# Buscar

Encuentra páginas y servicios en cybercon-solutions.com con la búsqueda del sitio (Pagefind).
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
