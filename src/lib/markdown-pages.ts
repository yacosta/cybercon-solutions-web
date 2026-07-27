import { privacyContent } from '../data/privacy';
import { services } from '../data/services';
import { getServiceDetails } from '../data/service-details';
import { industries } from '../data/industries';
import enterpriseAiAdoptionRoi from '../content/blog/enterprise-ai-adoption-roi.md?raw';
import enterpriseAiAdoptionRoiEs from '../content/blog/es/enterprise-ai-adoption-roi.md?raw';
import fractionalCioFirst90Days from '../content/blog/fractional-cio-first-90-days.md?raw';
import fractionalCioFirst90DaysEs from '../content/blog/es/fractional-cio-first-90-days.md?raw';
import managedItReportsLikeCio from '../content/blog/managed-it-reports-like-cio.md?raw';
import managedItReportsLikeCioEs from '../content/blog/es/managed-it-reports-like-cio.md?raw';
import zeroTrustMidMarketRollout from '../content/blog/zero-trust-mid-market-rollout.md?raw';
import zeroTrustMidMarketRolloutEs from '../content/blog/es/zero-trust-mid-market-rollout.md?raw';
import { formatMailingAddress, site } from './site';

function industriesMarkdown(locale: 'en' | 'es'): string {
  return industries
    .map((industry) => {
      const url = `https://cybercon-solutions.com${locale === 'es' ? '/es' : ''}/industries/${industry.slug}/`;
      return `- [${industry.title[locale]}](${url}): ${industry.summary[locale]}`;
    })
    .join('\n');
}

function industryPageMarkdown(slug: string, locale: 'en' | 'es'): string | null {
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return null;
  const help = industry.help
    .map((item) => `### ${item.title[locale]}\n\n${item.body[locale]}`)
    .join('\n\n');
  const challenges = industry.challenges.map((item) => `- ${item[locale]}`).join('\n');
  return `---
title: "${industry.metaTitle[locale]}"
description: "${industry.metaDescription[locale]}"
---

# ${industry.title[locale]}

${industry.lede[locale]}

${industry.overview[locale]}

## ${industry.challengesLabel[locale]}

${challenges}

## ${industry.helpLabel[locale]}

${help}
`;
}

function servicesMarkdown(locale: 'en' | 'es'): string {
  return services
    .map((s) => {
      const details = getServiceDetails(s.slug);
      const items = s.items.map((i) => `- ${i[locale]}`).join('\n');
      const audience = details ? `\n\n**${locale === 'es' ? 'Para quién' : 'Who it’s for'}:** ${details.audience[locale]}` : '';
      const overview = details ? `\n\n${details.overview[locale]}` : '';
      return `### ${s.id} — ${s.title[locale]}\n\n${s.summary[locale]}${audience}${overview}\n\n${items}`;
    })
    .join('\n\n');
}

const blogIndexEn = `---
title: "Blog | Cybercon Solutions"
description: "Practical notes on enterprise AI, managed IT, and cybersecurity for South Florida leaders."
---

# Blog

Insights for technology leaders: workflows that ship, governance that accelerates, and metrics that survive budget season.

## Posts

- [Enterprise AI Adoption and ROI: What Actually Works](https://cybercon-solutions.com/blog/enterprise-ai-adoption-roi/)
- [The Fractional CIO Agenda: First 90 Days](https://cybercon-solutions.com/blog/fractional-cio-first-90-days/)
- [Zero Trust Without the Buzzwords: A Practical Rollout for Mid-Market IT](https://cybercon-solutions.com/blog/zero-trust-mid-market-rollout/)
- [Managed IT That Reports Like a CIO](https://cybercon-solutions.com/blog/managed-it-reports-like-cio/)
`;

const blogIndexEs = `---
title: "Blog | Cybercon Solutions"
description: "Notas prácticas sobre IA empresarial, TI administrada y ciberseguridad para líderes del Sur de Florida."
---

# Blog

Perspectivas para líderes de tecnología: flujos que llegan a producción, gobernanza que acelera y métricas que aguantan la temporada de presupuestos.

## Entradas

- [Adopción de IA empresarial y ROI: lo que realmente funciona](https://cybercon-solutions.com/es/blog/enterprise-ai-adoption-roi/)
- [La agenda del CIO fraccionario: los primeros 90 días](https://cybercon-solutions.com/es/blog/fractional-cio-first-90-days/)
- [Zero Trust sin jerga: un despliegue práctico para TI de mercado medio](https://cybercon-solutions.com/es/blog/zero-trust-mid-market-rollout/)
- [TI administrada que reporta como un CIO: SLAs, KPIs y revisiones trimestrales que importan](https://cybercon-solutions.com/es/blog/managed-it-reports-like-cio/)
`;

const contactEn = `---
title: "Contact Cybercon Solutions | South Florida IT"
description: "Tell Cybercon what’s broken, what it’s costing you, or where your team needs backup. Cooper City, Davie, and South Florida. A real engineer replies within one business day."
---

# Contact Cybercon Solutions

Tell us what’s broken — or what it’s costing you. Unpredictable IT spend, surprise invoices, or a team buried in routine tickets — we absorb the noise so you can run the business. A real engineer replies within one business day. No obligation.

- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Service area: ${site.serviceAreaFocus}
- Mailing address: ${formatMailingAddress()}

Send a message at https://cybercon-solutions.com/contact/ (protected by Cloudflare Turnstile), book a cost-and-risk assessment at https://cybercon-solutions.com/assessment/, or run the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check.
`;

const contactEs = `---
title: "Contacto Cybercon Solutions | TI Sur de Florida"
description: "Cuéntale a Cybercon qué falla, cuánto te está costando o dónde tu equipo necesita refuerzo. Cooper City, Davie y el Sur de Florida. Un ingeniero real responde en un día hábil."
---

# Contacto Cybercon Solutions

Cuéntanos qué falla — o cuánto te está costando. Gasto de TI impredecible, facturas sorpresa o un equipo enterrado en tickets rutinarios — absorbemos el ruido para que tú operes el negocio. Un ingeniero real responde en un día hábil. Sin compromiso.

- Teléfono: ${site.phoneDisplay}
- Correo: ${site.email}
- Zona de servicio: Cooper City, Davie y el sur de Florida
- Dirección postal: ${formatMailingAddress()}

Envía un mensaje en https://cybercon-solutions.com/es/contact/ (protegido con Cloudflare Turnstile), agenda una evaluación en https://cybercon-solutions.com/es/assessment/, o haz la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check.
`;

const assessmentEn = `---
title: "Free IT Cost & Risk Assessment | Cybercon Solutions"
description: "Free assessment for South Florida businesses: spend, gaps, and what to retire. Managed IT, cybersecurity, and fractional CIO guidance — clear next steps within one business day."
---

# Free IT Cost & Risk Assessment

See what your IT actually costs. Plain English. No obligation. A clear picture of spend, gaps, and which risks are funded.

Submit name, company, and work email via https://cybercon-solutions.com/assessment/ (protected by Cloudflare Turnstile). A real engineer replies within one business day.

Prefer a fast technical read first? Run the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check. General inquiry? Use https://cybercon-solutions.com/contact/.
`;

const assessmentEs = `---
title: "Evaluación gratuita de costo y riesgo de TI | Cybercon Solutions"
description: "Evaluación gratuita para empresas del Sur de Florida: gasto, brechas y qué retirar. TI administrada, ciberseguridad y CIO fraccional — siguientes pasos claros en un día hábil."
---

# Evaluación gratuita de costo y riesgo de TI

Mira lo que realmente cuesta tu TI. Sin tecnicismos. Sin compromiso. Una lectura clara del gasto, las brechas y qué riesgos están cubiertos.

Envía nombre, empresa y correo de trabajo en https://cybercon-solutions.com/es/assessment/ (protegido con Cloudflare Turnstile). Un ingeniero real responde en un día hábil.

¿Prefieres primero una lectura técnica rápida? Haz la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check. ¿Consulta general? Usa https://cybercon-solutions.com/es/contact/.
`;

const pages: Record<string, string> = {
  '/': `---
title: "Managed IT & Cybersecurity in Cooper City & Davie | Cybercon"
description: "Predictable per-user IT for South Florida businesses — no break/fix surprises. 24/7 help desk, monitoring, and SOC-backed security. Free site check or assessment."
---

# Cybercon Solutions

Technology, handled.

Your IT department — without the overhead, the surprise invoices, or the 2 a.m. scramble. Predictable per-user pricing, 24/7 help desk, monitoring, and SOC-backed escalation when your team needs backup.

## See what your IT actually costs

Plain English. No obligation. A clear picture of spend, gaps, and which risks are funded. Prefer a fast technical read first? Run the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check.

Submit name, company, and work email via the form on https://cybercon-solutions.com/ (protected by Cloudflare Turnstile).

## What we handle

One partner for the stack. One bill you can plan around. Proactive managed IT with per-user pricing — no break/fix surprises. We take routine patching, monitoring, and helpdesk noise off your plate so your people execute strategy.

${servicesMarkdown('en')}

## Industries

Where industry knowledge meets IT that holds up. See https://cybercon-solutions.com/#industries

${industriesMarkdown('en')}

## How an engagement works

Three phases. No surprises mid-project.

1. **Discovery** — We scope your environment with you: what’s broken, what’s growing, and the constraints that matter — so the plan reflects how your business actually runs.
2. **Strategy** — You get a clear picture of priorities, risks, timeline, and next steps. Nothing kicks off until you’ve approved the scope and the approach.
3. **Execution** — We run it, and we don’t disappear. We deliver the work, keep you informed on a cadence that fits, and stay accountable through sign-off and beyond.

## Contact

info@cybercon-solutions.com · (305) 320-5335 · Cooper City & Davie, Florida
`,
  '/es/': `---
title: "TI y ciberseguridad en Cooper City y Davie | Cybercon"
description: "TI predecible por usuario para empresas del Sur de Florida — sin sorpresas por averías. Mesa de ayuda 24/7, monitoreo y seguridad con respaldo SOC. Revisión gratuita del sitio o evaluación."
---

# Cybercon Solutions

Technology, handled.

Tu departamento de TI — sin la sobrecarga, las facturas sorpresa ni la carrera a las 2 a.m. Precio predecible por usuario, mesa de ayuda 24/7, monitoreo y escalación con respaldo SOC cuando tu equipo necesita refuerzo.

## Mira lo que realmente cuesta tu TI

Sin tecnicismos. Sin compromiso. Una lectura clara del gasto, las brechas y qué riesgos están cubiertos. ¿Prefieres primero una lectura técnica rápida? Haz la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check.

Envía nombre, empresa y correo de trabajo en el formulario de https://cybercon-solutions.com/es/ (protegido con Cloudflare Turnstile).

## Lo que gestionamos

Un solo aliado para el stack. Una factura que puedes planificar. TI administrada proactiva con precio por usuario — sin sorpresas por averías. Quitamos el parcheo rutinario, el monitoreo y el ruido del helpdesk de tu plato para que tu gente ejecute estrategia.

${servicesMarkdown('es')}

## Industrias

Donde el conocimiento del sector se encuentra con TI que resiste. Ver https://cybercon-solutions.com/es/#industries

${industriesMarkdown('es')}

## Cómo funciona un engagement

Tres fases. Sin sorpresas a mitad de camino.

1. **Descubrimiento** — Definimos el alcance contigo: qué falla, qué crece y las restricciones que importan — para que el plan refleje cómo opera tu negocio de verdad.
2. **Estrategia** — Recibes un panorama claro de prioridades, riesgos, plazos y siguientes pasos. Nada arranca hasta que apruebas el alcance y el enfoque.
3. **Ejecución** — Lo llevamos adelante y no desaparecemos. Entregamos el trabajo, te informamos con la cadencia que necesitas y respondemos hasta el cierre y después.

## Contacto

info@cybercon-solutions.com · (305) 320-5335 · Cooper City y Davie, Florida
`,
  '/privacy/': privacyToMarkdown('en'),
  '/privacy': privacyToMarkdown('en'),
  '/es/privacy/': privacyToMarkdown('es'),
  '/es/privacy': privacyToMarkdown('es'),
  '/contact/': contactEn,
  '/contact': contactEn,
  '/es/contact/': contactEs,
  '/es/contact': contactEs,
  '/assessment/': assessmentEn,
  '/assessment': assessmentEn,
  '/es/assessment/': assessmentEs,
  '/es/assessment': assessmentEs,
  '/search/': `---
title: "Search | Cybercon"
---

# Search

Find pages and services across cybercon-solutions.com using the on-site search powered by Pagefind.
`,
  '/search': `---
title: "Search | Cybercon"
---

# Search

Find pages and services across cybercon-solutions.com using the on-site search powered by Pagefind.
`,
  '/es/search/': `---
title: "Buscar | Cybercon"
---

# Buscar

Encuentra páginas y servicios en cybercon-solutions.com con la búsqueda del sitio (Pagefind).
`,
  '/es/search': `---
title: "Buscar | Cybercon"
---

# Buscar

Encuentra páginas y servicios en cybercon-solutions.com con la búsqueda del sitio (Pagefind).
`,
  '/blog/': blogIndexEn,
  '/blog': blogIndexEn,
  '/es/blog/': blogIndexEs,
  '/es/blog': blogIndexEs,
  '/blog/enterprise-ai-adoption-roi/': enterpriseAiAdoptionRoi,
  '/blog/enterprise-ai-adoption-roi': enterpriseAiAdoptionRoi,
  '/es/blog/enterprise-ai-adoption-roi/': enterpriseAiAdoptionRoiEs,
  '/es/blog/enterprise-ai-adoption-roi': enterpriseAiAdoptionRoiEs,
  '/blog/fractional-cio-first-90-days/': fractionalCioFirst90Days,
  '/blog/fractional-cio-first-90-days': fractionalCioFirst90Days,
  '/es/blog/fractional-cio-first-90-days/': fractionalCioFirst90DaysEs,
  '/es/blog/fractional-cio-first-90-days': fractionalCioFirst90DaysEs,
  '/blog/zero-trust-mid-market-rollout/': zeroTrustMidMarketRollout,
  '/blog/zero-trust-mid-market-rollout': zeroTrustMidMarketRollout,
  '/es/blog/zero-trust-mid-market-rollout/': zeroTrustMidMarketRolloutEs,
  '/es/blog/zero-trust-mid-market-rollout': zeroTrustMidMarketRolloutEs,
  '/blog/managed-it-reports-like-cio/': managedItReportsLikeCio,
  '/blog/managed-it-reports-like-cio': managedItReportsLikeCio,
  '/es/blog/managed-it-reports-like-cio/': managedItReportsLikeCioEs,
  '/es/blog/managed-it-reports-like-cio': managedItReportsLikeCioEs,
};

for (const industry of industries) {
  const en = industryPageMarkdown(industry.slug, 'en');
  const es = industryPageMarkdown(industry.slug, 'es');
  if (en) {
    pages[`/industries/${industry.slug}/`] = en;
    pages[`/industries/${industry.slug}`] = en;
  }
  if (es) {
    pages[`/es/industries/${industry.slug}/`] = es;
    pages[`/es/industries/${industry.slug}`] = es;
  }
}

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
