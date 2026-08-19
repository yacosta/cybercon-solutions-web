import type { BreachCheckResult } from './types';

/** Illustrative sample — not a live HIBP lookup. */
export function getSampleResult(locale: 'en' | 'es'): BreachCheckResult {
  const es = locale === 'es';
  return {
    email_masked: 'a***@hibp-integration-tests.com',
    breach_count: 3,
    status: 'elevated',
    status_label: es ? 'Exposición elevada' : 'Elevated exposure',
    one_line_summary: es
      ? 'Ejemplo: esta dirección aparece en varias filtraciones conocidas — un avance lite, no un informe completo.'
      : 'Sample: this address appears in several known breaches — a lite teaser, not a full investigation.',
    top_finding: es
      ? 'Las filtraciones de ejemplo incluyen clases de datos como correos y contraseñas. En una evaluación real priorizaríamos rotación de credenciales y MFA.'
      : 'Sample breaches include data classes such as emails and passwords. In a real assessment we would prioritize credential rotation and MFA.',
    breaches: [
      {
        name: 'Adobe',
        title: 'Adobe',
        breachDate: '2013-10-04',
        dataClasses: es
          ? ['Direcciones de correo', 'Pistas de contraseña', 'Contraseñas', 'Nombres de usuario']
          : ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
        isVerified: true,
        isSensitive: false,
      },
      {
        name: 'LinkedIn',
        title: 'LinkedIn',
        breachDate: '2012-05-05',
        dataClasses: es ? ['Direcciones de correo', 'Contraseñas'] : ['Email addresses', 'Passwords'],
        isVerified: true,
        isSensitive: false,
      },
      {
        name: 'Collection1',
        title: 'Collection #1',
        breachDate: '2019-01-07',
        dataClasses: es ? ['Direcciones de correo', 'Contraseñas'] : ['Email addresses', 'Passwords'],
        isVerified: false,
        isSensitive: false,
      },
    ],
    additional_breach_count: 0,
    hibp_checked: false,
    sample: true,
  };
}
