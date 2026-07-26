import { privacyContent } from '../data/privacy';
import { services } from '../data/services';
import { getServiceDetails } from '../data/service-details';
import enterpriseAiAdoptionRoi from '../content/blog/enterprise-ai-adoption-roi.md?raw';
import fractionalCioFirst90Days from '../content/blog/fractional-cio-first-90-days.md?raw';
import managedItReportsLikeCio from '../content/blog/managed-it-reports-like-cio.md?raw';
import zeroTrustMidMarketRollout from '../content/blog/zero-trust-mid-market-rollout.md?raw';
import { formatMailingAddress, site } from './site';

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

- [Enterprise AI Adoption and ROI: What Actually Works](https://cybercon-solutions.com/es/blog/enterprise-ai-adoption-roi/) (artículo en inglés)
- [The Fractional CIO Agenda: First 90 Days](https://cybercon-solutions.com/es/blog/fractional-cio-first-90-days/) (artículo en inglés)
- [Zero Trust Without the Buzzwords](https://cybercon-solutions.com/es/blog/zero-trust-mid-market-rollout/) (artículo en inglés)
- [Managed IT That Reports Like a CIO](https://cybercon-solutions.com/es/blog/managed-it-reports-like-cio/) (artículo en inglés)
`;

const contactEn = `---
title: "Contact Cybercon Solutions | South Florida IT"
description: "Contact Cybercon Solutions for managed IT, cybersecurity, cloud, and AI in Cooper City, Davie, and South Florida. A real engineer replies within one business day."
---

# Contact Cybercon Solutions

Let's work together. Tell us what is broken, what is growing, or what you want clarified. We reply within one business day — no obligation.

- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Service area: ${site.serviceAreaFocus}
- Mailing address: ${formatMailingAddress()}

Submit the contact form at https://cybercon-solutions.com/contact/ (protected by Cloudflare Turnstile), or book a free assessment at https://cybercon-solutions.com/assessment/.
`;

const contactEs = `---
title: "Contacto Cybercon Solutions | TI Sur de Florida"
description: "Contacta a Cybercon Solutions para TI administrada, ciberseguridad, nube e IA en Cooper City, Davie y el Sur de Florida. Un ingeniero real responde en un día hábil."
---

# Contacto Cybercon Solutions

Trabajemos juntos. Cuéntanos qué está fallando, qué está creciendo o qué quieres aclarar. Respondemos en un día hábil — sin compromiso.

- Teléfono: ${site.phoneDisplay}
- Correo: ${site.email}
- Zona de servicio: Cooper City, Davie y el sur de Florida
- Dirección postal: ${formatMailingAddress()}

Envía el formulario en https://cybercon-solutions.com/es/contact/ (protegido con Cloudflare Turnstile), o solicita una evaluación en https://cybercon-solutions.com/es/assessment/.
`;

const assessmentEn = `---
title: "Free IT Assessment | Cybercon Solutions"
description: "Book a free IT assessment with Cybercon Solutions. South Florida managed IT, cybersecurity, and fractional CIO guidance — clear next steps within one business day. No obligation."
---

# Free IT Assessment

Book a free assessment. Plain English, no obligation. You get a clear picture of where your technology stands.

Submit name, company, and work email via https://cybercon-solutions.com/assessment/ (protected by Cloudflare Turnstile). A real engineer replies within one business day.

Prefer a general inquiry? Use https://cybercon-solutions.com/contact/.
`;

const assessmentEs = `---
title: "Evaluación de TI gratuita | Cybercon Solutions"
description: "Agenda una evaluación de TI gratuita con Cybercon Solutions. TI administrada, ciberseguridad y CIO fraccional en el Sur de Florida — siguientes pasos claros en un día hábil. Sin compromiso."
---

# Evaluación de TI gratuita

Solicita una evaluación gratuita. Sin tecnicismos y sin compromiso. Te damos una lectura clara del estado de tu tecnología.

Envía nombre, empresa y correo de trabajo en https://cybercon-solutions.com/es/assessment/ (protegido con Cloudflare Turnstile). Un ingeniero real responde en un día hábil.

¿Prefieres una consulta general? Usa https://cybercon-solutions.com/es/contact/.
`;

const pages: Record<string, string> = {
  '/': `---
title: "Managed IT & Cybersecurity in South Florida | Cybercon"
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

## Industries

Where industry knowledge meets IT that holds up. Cooper City, Davie, and South Florida organizations with real compliance, uptime, and client-trust pressure.

- **Healthcare & clinics** — HIPAA-aware environments for practices and care teams that need secure access, reliable systems, and clear incident handling.
- **Legal & professional services** — Confidentiality-first IT for firms that bill for time — fast support, secure remote access, and tools that stay out of the way.
- **Financial services & insurance** — Controls and monitoring that match client trust and audit expectations, without slowing day-to-day operations.
- **Education & nonprofits** — Practical IT for schools, foundations, churches, and community orgs — predictable cost, strong security, and staff who are not “the IT person.”
- **Construction & real estate** — Field-ready access, job-site coordination, and office systems that keep projects moving when crews and vendors are everywhere.
- **Distribution, retail & manufacturing** — Uptime for warehouses, storefronts, and light industrial ops in Davie and nearby — inventory, connectivity, and recovery that work.

## How an engagement works

Three phases. No surprises mid-project.

1. **Discovery** — We scope your environment with you: what’s broken, what’s growing, and the constraints that matter — so the plan reflects how your business actually runs.
2. **Strategy** — You get a clear picture of priorities, risks, timeline, and next steps. Nothing kicks off until you’ve approved the scope and the approach.
3. **Execution** — We run it, and we don’t disappear. We deliver the work, keep you informed on a cadence that fits, and stay accountable through sign-off and beyond.

## Contact

info@cybercon-solutions.com · (305) 320-5335 · Cooper City & Davie, Florida
`,
  '/es/': `---
title: "TI y ciberseguridad en el Sur de Florida | Cybercon"
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

## Industrias

Donde el conocimiento del sector se encuentra con TI que resiste. Organizaciones de Cooper City, Davie y el Sur de Florida con presión real de cumplimiento, disponibilidad y confianza del cliente.

- **Salud y clínicas** — Entornos conscientes de HIPAA para prácticas y equipos de atención que necesitan acceso seguro, sistemas fiables y respuesta clara ante incidentes.
- **Legal y servicios profesionales** — TI centrada en la confidencialidad para firmas que facturan por tiempo: soporte rápido, acceso remoto seguro y herramientas que no estorban.
- **Servicios financieros y seguros** — Controles y monitoreo a la altura de la confianza del cliente y las auditorías, sin frenar el día a día.
- **Educación y organizaciones sin fines de lucro** — TI práctica para escuelas, fundaciones, iglesias y organizaciones comunitarias: costo predecible, seguridad fuerte y personal que no es “el de TI”.
- **Construcción e inmobiliario** — Acceso listo para campo, coordinación en obra y sistemas de oficina que mantienen los proyectos en marcha.
- **Distribución, retail y manufactura** — Disponibilidad para almacenes, tiendas e industria ligera en Davie y alrededores.

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
  '/es/blog/enterprise-ai-adoption-roi/': enterpriseAiAdoptionRoi,
  '/es/blog/enterprise-ai-adoption-roi': enterpriseAiAdoptionRoi,
  '/blog/fractional-cio-first-90-days/': fractionalCioFirst90Days,
  '/blog/fractional-cio-first-90-days': fractionalCioFirst90Days,
  '/es/blog/fractional-cio-first-90-days/': fractionalCioFirst90Days,
  '/es/blog/fractional-cio-first-90-days': fractionalCioFirst90Days,
  '/blog/zero-trust-mid-market-rollout/': zeroTrustMidMarketRollout,
  '/blog/zero-trust-mid-market-rollout': zeroTrustMidMarketRollout,
  '/es/blog/zero-trust-mid-market-rollout/': zeroTrustMidMarketRollout,
  '/es/blog/zero-trust-mid-market-rollout': zeroTrustMidMarketRollout,
  '/blog/managed-it-reports-like-cio/': managedItReportsLikeCio,
  '/blog/managed-it-reports-like-cio': managedItReportsLikeCio,
  '/es/blog/managed-it-reports-like-cio/': managedItReportsLikeCio,
  '/es/blog/managed-it-reports-like-cio': managedItReportsLikeCio,
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
