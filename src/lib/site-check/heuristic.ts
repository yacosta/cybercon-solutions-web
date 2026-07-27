import type {
  BuiltWithEvidence,
  LiveEvidence,
  LetterGrade,
  SiteCheckLocale,
  SiteCheckResult,
} from './types';
import { categoryNamesFor } from './types';

/**
 * Honest heuristic fallback when AI is unavailable.
 * Follows accuracy rules: never invent CDN absence; Performance stays N.
 */
export function heuristicResult(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  locale: SiteCheckLocale | string = 'en',
): SiteCheckResult {
  const es = locale === 'es';
  const o = live.observed;
  const securityNotes: string[] = [];
  let securityScore = 0;

  if (!live.ok) {
    securityNotes.push(
      live.status
        ? es
          ? `El host respondió (HTTP ${live.status})${o.cloudflare ? ' detrás de Cloudflare' : ''}, pero no pudimos obtener un HTML limpio de la página de inicio en este paso.`
          : `The host responded (HTTP ${live.status})${o.cloudflare ? ' behind Cloudflare' : ''}, but we could not retrieve a clean homepage HTML body in this pass.`
        : es
          ? `No pudimos cargar una respuesta en vivo de ${domain} en este paso (${live.error ?? 'inalcanzable'}).`
          : `We could not load a live response from ${domain} in this pass (${live.error ?? 'unreachable'}).`,
    );
    if (o.cloudflare) {
      securityNotes.push(
        es
          ? 'Aparecen señales de Cloudflare en los encabezados de respuesta o en los registros DNS NS.'
          : 'Cloudflare signals appear in response headers or DNS NS records.',
      );
    }
  } else {
    if (o.https) {
      securityScore += 2;
      securityNotes.push(
        es ? 'La página de inicio cargó por HTTPS.' : 'The homepage loaded over HTTPS.',
      );
    } else {
      securityNotes.push(
        es
          ? 'La respuesta en vivo no se mantuvo en HTTPS.'
          : 'The live response did not stay on HTTPS.',
      );
    }
    if (o.hasHsts) {
      securityScore += 1;
      securityNotes.push(
        es
          ? 'Strict-Transport-Security está presente en la respuesta.'
          : 'Strict-Transport-Security is present on the response.',
      );
    }
    if (o.hasXFrameOptions || o.hasCsp) {
      securityScore += 1;
      securityNotes.push(
        o.hasCsp
          ? es
            ? 'Hay un encabezado Content-Security-Policy.'
            : 'A Content-Security-Policy header is present.'
          : es
            ? 'X-Frame-Options está configurado en la respuesta.'
            : 'X-Frame-Options is set on the response.',
      );
    }
    if (o.cloudflare) {
      securityNotes.push(
        es
          ? 'Aparecen señales de Cloudflare en encabezados o registros DNS NS.'
          : 'Cloudflare signals appear in headers or DNS NS records.',
      );
    } else if (o.cloudfront) {
      securityNotes.push(
        es
          ? 'Aparecen señales de Amazon CloudFront en los encabezados de respuesta.'
          : 'Amazon CloudFront signals appear in response headers.',
      );
    }
  }

  const securityGrade: LetterGrade | 'N' = !live.ok
    ? o.cloudflare || o.hasHsts
      ? 'C'
      : 'N'
    : securityScore >= 3
      ? 'B'
      : securityScore >= 2
        ? 'C'
        : 'D';

  const trustNotes: string[] = [];
  let trustGrade: LetterGrade | 'N' = 'N';
  if (o.title) {
    trustNotes.push(
      es
        ? `Título en vivo: “${o.title.slice(0, 80)}”.`
        : `Live title: “${o.title.slice(0, 80)}”.`,
    );
    trustGrade = o.metaDescription ? 'B' : 'C';
    if (o.metaDescription) {
      trustNotes.push(
        es
          ? 'Hay una meta descripción en la página de inicio.'
          : 'A meta description is present on the homepage.',
      );
    } else {
      trustNotes.push(
        es
          ? 'No apareció una meta descripción en los primeros bytes de la página.'
          : 'No meta description showed up in the first bytes of the homepage.',
      );
    }
    if (o.copyrightYear) {
      trustNotes.push(
        es
          ? `Año de copyright visible en el HTML: ${o.copyrightYear}.`
          : `Copyright year visible in the HTML snippet: ${o.copyrightYear}.`,
      );
    }
  } else if (live.ok) {
    trustNotes.push(
      es
        ? 'La página en vivo devolvió HTML, pero no pudimos leer un <title> claro.'
        : 'The live page returned HTML, but we could not read a clear <title>.',
    );
    trustGrade = 'D';
  } else {
    trustNotes.push(
      es
        ? 'Las señales de confianza necesitan una página de inicio alcanzable — no pudimos confirmarlas en vivo.'
        : 'Trust signals need a reachable homepage — we could not confirm them live.',
    );
  }

  const searchNote = o.title
    ? es
      ? 'Revisión lite solamente — el título en vivo está presente; la profundidad de búsqueda local es para la evaluación completa.'
      : 'Lite check only — live title is present; local search depth is for the full assessment.'
    : es
      ? 'La visibilidad en búsqueda necesita más que un vistazo superficial — eso forma parte de la evaluación completa.'
      : 'Search visibility needs more than a surface peek — that is part of the full assessment.';

  const overall: LetterGrade = !live.ok
    ? 'D'
    : securityGrade === 'B' && (trustGrade === 'B' || trustGrade === 'C')
      ? 'B'
      : securityGrade === 'D' || trustGrade === 'D'
        ? 'D'
        : 'C';

  const siteName = o.title?.split(/[|\-–—]/)[0]?.trim().slice(0, 80) || domain;
  const names = categoryNamesFor(es ? 'es' : 'en');

  // Prefer observed infra in the short note (accuracy: claim presence only, never absence).
  const preferredSecurityNotes = [
    ...securityNotes.filter((n) => /cloudflare|cloudfront/i.test(n)),
    ...securityNotes.filter((n) =>
      /HTTPS|HSTS|Content-Security|X-Frame|responded|could not|respondió|pudimos|encabezado/i.test(n),
    ),
  ];
  const securityNote =
    [...new Set(preferredSecurityNotes)].slice(0, 2).join(' ') ||
    securityNotes.slice(0, 2).join(' ') ||
    (es
      ? 'Encabezados de seguridad limitados observados en la respuesta en vivo.'
      : 'Limited security headers observed on the live response.');

  return {
    site_name: siteName,
    domain,
    live_checked: live.ok,
    verified: builtWith.ok,
    overall_grade: overall,
    one_line_summary: live.ok
      ? es
        ? `Un vistazo superficial a ${domain} — suficiente para iniciar una conversación, no una evaluación completa.`
        : `A lite surface peek at ${domain} — enough to start a conversation, not a full assessment.`
      : es
        ? `Alcanzamos ${domain} pero no pudimos terminar una revisión limpia del HTML en vivo; las calificaciones se mantienen conservadoras.`
        : `We reached ${domain} but could not finish a clean live HTML review; grades stay conservative.`,
    categories: [
      {
        name: names[0]!,
        grade: securityGrade,
        note: securityNote,
      },
      {
        name: names[1]!,
        grade: 'N',
        note: es
          ? 'No se califica en una revisión lite — tiempos y Core Web Vitals son lo que mide la evaluación completa.'
          : 'Not graded on a lite check — timing and Core Web Vitals are what the full assessment measures.',
      },
      {
        name: names[2]!,
        grade: trustGrade,
        note: trustNotes.slice(0, 2).join(' '),
      },
      {
        name: names[3]!,
        grade: 'N',
        note: searchNote,
      },
    ],
    top_finding: live.ok
      ? es
        ? `Desde una mirada externa rápida a ${domain}: ${securityNotes[0] ?? 'revisamos encabezados de respuesta y el HTML inicial.'} Una evaluación gratuita de 30 minutos es donde profundizamos — y mapeamos correcciones si quieres ayuda.`
        : `From a quick outside look at ${domain}: ${securityNotes[0] ?? 'we reviewed response headers and the opening HTML.'} A free 30-minute assessment is where we go deeper — and map fixes if you want help.`
      : es
        ? `No pudimos obtener un HTML limpio de la página de inicio de ${domain}${o.cloudflare ? ' (Cloudflare está delante del host)' : ''}. Eso solo ya vale una llamada breve para confirmar alcance, protección contra bots y monitoreo — y hablar de siguientes pasos.`
        : `We could not retrieve a clean live homepage body for ${domain}${o.cloudflare ? ' (Cloudflare is in front of the host)' : ''}. That alone is worth a short call so we can confirm reachability, bot protection, and monitoring — and talk through next steps.`,
    additional_findings_count: 4,
    tech_chips: builtWith.tech_chips,
  };
}
