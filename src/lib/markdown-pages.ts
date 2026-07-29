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
description: "Tell Cybercon what’s broken, what it’s costing you, or where your team needs backup. Cooper City, Davie, and South Florida. We reply within one business day."
---

# Contact Cybercon Solutions

Tell us what’s broken — or what it’s costing you. Unpredictable IT spend, surprise invoices, or a team buried in routine tickets — we take that noise so you can run the business. Someone on our engineering team replies within one business day. No obligation.

- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Service area: ${site.serviceAreaFocus}
- Mailing address: ${formatMailingAddress()}

Send a message at https://cybercon-solutions.com/contact/ (protected by Cloudflare Turnstile), book a cost-and-risk assessment at https://cybercon-solutions.com/assessment/, or run the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check.
`;

const contactEs = `---
title: "Contacto Cybercon Solutions | TI Sur de Florida"
description: "Cuéntale a Cybercon qué falla, cuánto te está costando o dónde tu equipo necesita refuerzo. Cooper City, Davie y el Sur de Florida. Respondemos en un día hábil."
---

# Contacto Cybercon Solutions

Cuéntanos qué falla — o cuánto te está costando. Gasto de TI impredecible, facturas sorpresa o un equipo enterrado en tickets rutinarios — nos llevamos ese ruido para que tú operes el negocio. Alguien de nuestro equipo de ingeniería responde en un día hábil. Sin compromiso.

- Teléfono: ${site.phoneDisplay}
- Correo: ${site.email}
- Zona de servicio: Cooper City, Davie y el sur de Florida
- Dirección postal: ${formatMailingAddress()}

Envía un mensaje en https://cybercon-solutions.com/es/contact/ (protegido con Cloudflare Turnstile), agenda una evaluación en https://cybercon-solutions.com/es/assessment/, o haz la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check.
`;

const assessmentEn = `---
title: "Free IT Cost & Risk Assessment | Cybercon Solutions"
description: "Free assessment for South Florida businesses: spend, gaps, and what to retire. Managed IT, cybersecurity, fractional CIO — reply in one business day."
---

# Free IT Cost & Risk Assessment

See what your IT actually costs. No jargon tour. No obligation. We’ll walk through what you’re spending, what’s covered, and what’s left open.

Submit name, company, and work email via https://cybercon-solutions.com/assessment/ (protected by Cloudflare Turnstile). A real engineer replies within one business day. We never share your details.

Prefer a fast technical skim first? Start with the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check, then book the assessment for the deeper pass. General inquiry? Use https://cybercon-solutions.com/contact/.
`;

const assessmentEs = `---
title: "Evaluación gratuita de costo y riesgo de TI | Cybercon Solutions"
description: "Evaluación gratuita en el Sur de Florida: gasto, vacíos y qué retirar. TI administrada, ciberseguridad y CIO fraccional — en un día hábil."
---

# Evaluación gratuita de costo y riesgo de TI

Mira lo que realmente cuesta tu TI. Sin rodeos. Sin compromiso. Revisamos juntos qué estás gastando, qué está cubierto y qué queda abierto.

Envía nombre, empresa y correo de trabajo en https://cybercon-solutions.com/es/assessment/ (protegido con Cloudflare Turnstile). Un ingeniero de nuestro equipo responde en un día hábil. Nunca compartimos tus datos.

¿Prefieres primero un vistazo técnico rápido? Empieza con la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check y luego agenda la evaluación para el pase más profundo. ¿Consulta general? Usa https://cybercon-solutions.com/es/contact/.
`;

const pages: Record<string, string> = {
  '/': `---
title: "Managed IT & Cybersecurity in Cooper City & Davie | Cybercon"
description: "Predictable per-user IT for South Florida — no break/fix surprises. 24/7 help desk, monitoring, SOC-backed security. Free site check or assessment."
---

# Cybercon Solutions

Technology, handled.

Your IT department — without the overhead, the surprise invoices, or the 2 a.m. scramble. Predictable per-user pricing, 24/7 help desk, monitoring, and SOC-backed escalation when your team needs backup.

## See what your IT actually costs

No jargon tour. No obligation. We’ll walk through what you’re spending, what’s covered, and what’s left open. Prefer a fast technical skim first? Start with the free site check at https://cybercon-solutions.com/services/web-design-development/#site-check, then book the assessment for the deeper pass.

Submit name, company, and work email via the form on https://cybercon-solutions.com/ (protected by Cloudflare Turnstile).

## What we handle

One partner for the stack. One bill you can plan around. Proactive managed IT with per-user pricing — no break/fix surprises. We handle patching, monitoring, and the help desk so your people aren’t stuck being IT. When something serious hits, we escalate with you.

${servicesMarkdown('en')}

## Industries

IT that matches how your industry actually runs. See https://cybercon-solutions.com/#industries

${industriesMarkdown('en')}

## How an engagement works

Three phases. No surprises mid-project.

1. **Discovery** — What’s broken, what’s growing, and the budget and risk constraints that matter. You leave with priorities, gaps, and what to fund next — written so you can share it with whoever signs the checks.
2. **Strategy** — Priorities, risks, timeline, and next steps. Nothing starts until you’ve approved the scope and the approach.
3. **Execution** — We run the work, report on the cadence you choose, and stay on the hook through sign-off — and after, if you keep us on.

## Contact

info@cybercon-solutions.com · (305) 320-5335 · Cooper City & Davie, Florida
`,
  '/es/': `---
title: "TI y ciberseguridad en Cooper City y Davie | Cybercon"
description: "TI predecible por usuario en el Sur de Florida — sin sorpresas por fallas. Mesa 24/7, monitoreo y soporte del SOC. Revisión del sitio o evaluación."
---

# Cybercon Solutions

Tecnología, resuelta.

Tu departamento de TI — sin la sobrecarga, las facturas sorpresa ni la carrera a las 2 a.m. Precio predecible por usuario, mesa de ayuda 24/7, monitoreo y escalación con soporte del SOC cuando tu equipo necesita refuerzo.

## Mira lo que realmente cuesta tu TI

Sin rodeos. Sin compromiso. Revisamos juntos qué estás gastando, qué está cubierto y qué queda abierto. ¿Prefieres primero un vistazo técnico rápido? Empieza con la revisión gratuita del sitio en https://cybercon-solutions.com/es/services/web-design-development/#site-check y luego agenda la evaluación para el pase más profundo.

Envía nombre, empresa y correo de trabajo en el formulario de https://cybercon-solutions.com/es/ (protegido con Cloudflare Turnstile).

## Lo que gestionamos

Un solo proveedor para el stack tecnológico. Una factura que puedes planificar. TI administrada proactiva con precio por usuario — sin sorpresas por fallas. Nos ocupamos del parcheo, el monitoreo y la mesa de ayuda para que tu gente no tenga que hacer de TI. Cuando algo serio ocurre, escalamos contigo.

${servicesMarkdown('es')}

## Industrias

TI que encaja con cómo opera tu sector de verdad. Ver https://cybercon-solutions.com/es/#industries

${industriesMarkdown('es')}

## Cómo trabajamos juntos

Tres fases. Sin sorpresas a mitad de camino.

1. **Descubrimiento** — Qué falla, qué crece y las restricciones de presupuesto y riesgo que importan. Sales con prioridades, vacíos y qué financiar después — escrito para que puedas compartirlo con quien aprueba el presupuesto.
2. **Estrategia** — Prioridades, riesgos, plazos y siguientes pasos. Nada arranca hasta que apruebas el alcance y el enfoque.
3. **Ejecución** — Llevamos el trabajo, reportamos con la cadencia que elijas y respondemos hasta el cierre — y después, si nos mantienes.

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
