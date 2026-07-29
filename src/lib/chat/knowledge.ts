import { services } from '../../data/services';
import { formatMailingAddress, site } from '../site';

/** Compact, allowlisted facts the assistant may use. Keep short to control tokens. */
export function buildKnowledgePack(locale: 'en' | 'es'): string {
  const serviceLines = services
    .map((s) => `- ${s.title[locale]}: ${s.summary[locale]}`)
    .join('\n');

  if (locale === 'es') {
    return `Sobre Cybercon Solutions
- Nombre: ${site.name} (${site.legalName})
- Eslogan: Technology, handled.
- Área de servicio: ${site.serviceAreaFocus}
- Dirección postal: ${formatMailingAddress()}
- Teléfono: ${site.phoneDisplay} (${site.phone})
- Email: ${site.email}
- LinkedIn: ${site.social.linkedin}
- Respuesta: un ingeniero de nuestro equipo responde en un día hábil
- Modelo: precio predecible por usuario (no cobro por falla). No inventes precios exactos en dólares.

Servicios
${serviceLines}

Herramientas gratuitas en el sitio
- Evaluación de costo y riesgo de TI: /es/assessment/
- Revisión rápida del sitio web: /es/services/web-design-development/#site-check
- Revisión de filtraciones de correo (HIBP): /es/services/cybersecurity/#breach-check
- Revisión de preparación en seguridad de IA: /es/services/ai-security/#ai-readiness
- Seguridad de IA (página): /es/services/ai-security/
- Contacto: /es/contact/

Reglas
- Solo responde sobre Cybercon, TI administrada, ciberseguridad y cómo empezar.
- Si no sabes algo, dilo y ofrece la evaluación o una llamada.
- No finjas ser soporte 24/7 por chat. La mesa de ayuda 24/7 es telefónica para clientes.
- No inventes certificaciones, clientes, casos de estudio ni precios.
- Empuja con suavidad hacia evaluación, site check o llamada cuando el visitante muestre intención.`;
  }

  return `About Cybercon Solutions
- Name: ${site.name} (${site.legalName})
- Slogan: ${site.slogan}
- Service area: ${site.serviceAreaFocus}
- Mailing address: ${formatMailingAddress()}
- Phone: ${site.phoneDisplay} (${site.phone})
- Email: ${site.email}
- LinkedIn: ${site.social.linkedin}
- Response time: we reply within one business day
- Pricing model: predictable per-user (not break/fix). Never invent dollar prices.

Services
${serviceLines}

Free on-site tools
- IT cost & risk assessment: /assessment/
- Lite website check: /services/web-design-development/#site-check
- Email breach check (HIBP): /services/cybersecurity/#breach-check
- AI security readiness check: /services/ai-security/#ai-readiness
- AI Security page: /services/ai-security/
- Contact: /contact/

Rules
- Answer only about Cybercon, managed IT, cybersecurity, and how to get started.
- If unsure, say so and offer the free assessment or a phone call.
- Do not pretend to be 24/7 chat support. 24/7 help desk is live phone for clients.
- Do not invent certifications, customers, case studies, or prices.
- Gently steer toward assessment, site check, or a call when the visitor shows intent.`;
}

export type FaqEntry = {
  patterns: RegExp[];
  en: string;
  es: string;
  ctas?: Array<'assessment' | 'site-check' | 'breach-check' | 'contact' | 'call'>;
};

export const FAQ: FaqEntry[] = [
  {
    patterns: [
      /who (are|is) (you|cybercon)/i,
      /what (does|is) cybercon/i,
      /qué (es|son|hace) cybercon/i,
      /about (you|cybercon)/i,
      /quiénes? son/i,
    ],
    en: `Cybercon Solutions is a South Florida managed IT and cybersecurity partner focused on Cooper City, Davie, and nearby businesses. We run proactive IT with predictable per-user pricing — help desk, monitoring, security, cloud, backup, and more — so you’re not stuck in break/fix surprises.`,
    es: `Cybercon Solutions es un aliado de TI administrada y ciberseguridad en el sur de Florida, enfocado en Cooper City, Davie y alrededores. Operamos TI de forma proactiva con precio predecible por usuario — mesa de ayuda, monitoreo, seguridad, nube, respaldos y más — para que no quedes atrapado en sorpresas por fallas.`,
    ctas: ['assessment', 'contact'],
  },
  {
    patterns: [/where (are|do) you/i, /service area/i, /cooper city|davie|miami|south florida/i, /dónde (están|atienden|cubren)/i, /área de (servicio|cobertura)/i],
    en: `We serve Cooper City, Davie, and greater South Florida. Our mailing address is in Miami Beach (${formatMailingAddress()}). Onsite and managed services focus on the local South Florida market.`,
    es: `Atendemos Cooper City, Davie y el sur de Florida. Nuestra dirección postal está en Miami Beach (${formatMailingAddress()}). Los servicios en sitio y administrados se centran en el mercado local del sur de Florida.`,
    ctas: ['contact', 'call'],
  },
  {
    patterns: [/pric|cost|how much|budget|quote|tarif|precio|cu[aá]nto cuest/i],
    en: `We use predictable per-user pricing instead of break/fix billing. Exact packages depend on headcount, stack, and risk — that’s what the free assessment is for. You’ll see what you’re spending, what’s covered, and what to fund next.`,
    es: `Usamos precio predecible por usuario en lugar de cobro por falla. Los paquetes exactos dependen del personal, el stack y el riesgo — para eso es la evaluación gratuita. Vas a ver qué estás gastando, qué está cubierto y qué financiar después.`,
    ctas: ['assessment'],
  },
  {
    patterns: [/assess|evaluaci[oó]n|it cost|what.*(it|ti).*(cost|cuesta)/i],
    en: `The free IT cost & risk assessment reviews spend, gaps, and which risks are funded. We reply within one business day — no obligation.`,
    es: `La evaluación gratuita de costo y riesgo de TI revisa gasto, vacíos y qué riesgos están cubiertos. Respondemos en un día hábil — sin compromiso.`,
    ctas: ['assessment'],
  },
  {
    patterns: [/site check|website check|revisi[oó]n.*(sitio|web)|check.*(site|website|dominio)/i],
    en: `Our free lite website check takes about a minute: enter your domain and work email, get one real outside-in finding, then book a deeper assessment if you want fixes.`,
    es: `Nuestra revisión gratuita del sitio toma alrededor de un minuto: ingresa tu dominio y correo de trabajo, recibe un hallazgo real desde fuera, y agenda una evaluación más profunda si quieres correcciones.`,
    ctas: ['site-check', 'assessment'],
  },
  {
    patterns: [/breach|pwned|filtraci[oó]n|hibp|have i been/i],
    en: `On the Cybersecurity page you can run a free breach check against Have I Been Pwned for a work email exposure snapshot, then book an assessment for MFA, identity, and next steps.`,
    es: `En la página de Ciberseguridad puedes hacer una revisión gratuita de filtraciones con Have I Been Pwned para ver la exposición de un correo de trabajo, y luego agendar una evaluación para MFA, identidad y próximos pasos.`,
    ctas: ['breach-check', 'assessment'],
  },
  {
    patterns: [
      /ai security|seguridad de ia|shadow ai|copilot|chatgpt|ai governance|gobernanza.*(ia|ai)|ai readiness|preparaci[oó]n.*(ia|ai)/i,
    ],
    en: `AI Security helps South Florida teams adopt copilots and public AI tools without leaking sensitive data. We cover usage governance, leakage controls, and unified workspace protection (identity, email, endpoints, exposure). Start with the free readiness check on /services/ai-security/#ai-readiness or book an assessment.`,
    es: `Seguridad de IA ayuda a equipos del sur de Florida a adoptar copilots e IA pública sin filtrar datos sensibles. Cubiertos: gobernanza de uso, control de filtraciones y protección unificada del espacio de trabajo (identidad, correo, endpoints, exposición). Empieza con la revisión gratuita en /es/services/ai-security/#ai-readiness o agenda una evaluación.`,
    ctas: ['assessment', 'breach-check'],
  },
  {
    patterns: [/help desk|24\/7|support hours|soporte|mesa de ayuda/i],
    en: `Managed IT clients get a 24/7/365 local help desk with live phone response — not chat-only. This website assistant answers basics and helps you book the right next step.`,
    es: `Los clientes de TI administrada tienen mesa de ayuda local 24/7/365 con respuesta telefónica en vivo — no solo chat. Este asistente del sitio responde lo básico y te ayuda a agendar el siguiente paso correcto.`,
    ctas: ['assessment', 'call'],
  },
  {
    patterns: [/cybersecurity|\bransomware\b|\bhipaa\b|soc\s*2|\bpci\b|cumplimiento|\bciberseguridad\b|\bciber\b/i],
    en: `Cybersecurity & Compliance covers endpoint protection (EDR/XDR), 24/7 SOC monitoring, and compliance mapping for HIPAA, SOC 2, PCI DSS, and GLBA. Want a practical next step? Book the free assessment or run the breach check first.`,
    es: `Ciberseguridad y Cumplimiento cubre protección de endpoints (EDR/XDR), monitoreo SOC 24/7 y alineación con HIPAA, SOC 2, PCI DSS y GLBA. ¿Siguiente paso práctico? Agenda la evaluación gratuita o empieza con la revisión de filtraciones.`,
    ctas: ['breach-check', 'assessment'],
  },
  {
    patterns: [/managed it|msp|outsourcing|ti administrad/i],
    en: `Managed IT includes 24/7 help desk, proactive monitoring and patching, onsite support, and flat-rate per-user packages — so routine IT noise leaves your team’s plate.`,
    es: `TI administrada incluye mesa de ayuda 24/7, monitoreo y parches proactivos, soporte en sitio y paquetes de tarifa plana por usuario — para quitarle a tu equipo el ruido rutinario de TI.`,
    ctas: ['assessment'],
  },
  {
    patterns: [/contact|call|phone|email|hablar|llamar|correo/i],
    en: `You can reach us at ${site.phoneDisplay} or ${site.email}, or use the contact form. Prefer structure first? Book the free assessment — we reply within one business day.`,
    es: `Puedes escribirnos o llamarnos al ${site.phoneDisplay} / ${site.email}, o usar el formulario de contacto. ¿Prefieres primero algo más estructurado? Agenda la evaluación gratuita — respondemos en un día hábil.`,
    ctas: ['contact', 'call', 'assessment'],
  },
];

export function matchFaq(message: string, locale: 'en' | 'es'): FaqEntry | null {
  const text = message.trim();
  if (!text) return null;
  for (const entry of FAQ) {
    if (entry.patterns.some((re) => re.test(text))) return entry;
  }
  return null;
}
