import type { SiteCheckLocale, SiteCheckResult } from './types';
import { categoryNamesFor } from './types';

/** Hardcoded illustrative sample — always banner-labeled in the UI. */
export function getSampleResult(locale: SiteCheckLocale | string = 'en'): SiteCheckResult {
  const es = locale === 'es';
  const names = categoryNamesFor(es ? 'es' : 'en');

  return {
    site_name: 'Harbor Street Dental',
    domain: 'example-harborstreet.demo',
    live_checked: true,
    verified: true,
    overall_grade: 'C',
    one_line_summary: es
      ? 'Un sitio viable de pequeño negocio — este vistazo lite encontró algunas brechas que valen una revisión más profunda.'
      : 'A workable small-business site — this lite peek found a few gaps worth a deeper pass.',
    categories: [
      {
        name: names[0]!,
        grade: 'B',
        note: es
          ? 'La página de inicio carga por HTTPS con HSTS presente.'
          : 'Homepage loads over HTTPS with HSTS present.',
      },
      {
        name: names[1]!,
        grade: 'N',
        note: es
          ? 'No se califica en una revisión lite — tiempos y Core Web Vitals forman parte de la evaluación completa.'
          : 'Not graded on a lite check — timing and Core Web Vitals are part of the full assessment.',
      },
      {
        name: names[2]!,
        grade: 'C',
        note: es
          ? 'La página de privacidad aún muestra marcadores de plantilla sin completar.'
          : 'The privacy page still shows leftover template placeholders.',
      },
      {
        name: names[3]!,
        grade: 'C',
        note: es
          ? 'Existen título y meta; la profundidad de búsqueda local necesita una revisión más completa.'
          : 'Title and meta exist; local search depth needs a fuller review.',
      },
    ],
    top_finding: es
      ? 'La política de privacidad todavía contiene texto de plantilla sin terminar donde deberían ir el título de la página y el correo de contacto. Los visitantes lo notan — y es el tipo de corrección que mapearíamos en una llamada breve de evaluación.'
      : 'The privacy policy still contains unfinished template text where a page title and contact email should be. Visitors notice that — and it is the kind of fix we would map on a short assessment call.',
    additional_findings_count: 4,
    tech_chips: ['WordPress', 'MySQL', 'PHP', 'Cloudflare'],
    sample: true,
  };
}

/** @deprecated Prefer getSampleResult(locale) for EN/ES. */
export const SAMPLE_RESULT: SiteCheckResult = getSampleResult('en');
