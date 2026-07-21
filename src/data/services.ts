export type Service = {
  id: string;
  slug: string;
  title: { en: string; es: string };
  summary: { en: string; es: string };
  items: { en: string; es: string }[];
};

export const services: Service[] = [
  {
    id: '01',
    slug: 'managed-it',
    title: { en: 'Managed IT Services', es: 'Servicios de TI Administrados' },
    summary: {
      en: 'Help desk, monitoring, and onsite support for South Florida businesses, run proactively. Per-user pricing you can plan around, instead of break/fix surprises.',
      es: 'Mesa de ayuda, monitoreo y soporte in situ para empresas del sur de Florida, con un enfoque proactivo. Precio por usuario que puedes planificar, sin sorpresas por averías.',
    },
    items: [
      {
        en: 'Help Desk Support: 24/7/365 local help desk with live phone response.',
        es: 'Mesa de ayuda: soporte local 24/7/365 con respuesta telefónica en vivo.',
      },
      {
        en: 'Proactive Monitoring & Maintenance: monitoring, patching, and endpoint management.',
        es: 'Monitoreo y mantenimiento proactivo: supervisión, parches y gestión de endpoints.',
      },
      {
        en: 'Onsite IT Support: hardware failures, network issues, rollouts, and office moves.',
        es: 'Soporte in situ: fallos de hardware, red, despliegues y mudanzas de oficina.',
      },
      {
        en: 'Flat-Rate Predictable Support: per-user packages instead of break/fix billing.',
        es: 'Soporte de tarifa plana: paquetes por usuario en lugar de facturación por averías.',
      },
    ],
  },
  {
    id: '02',
    slug: 'cybersecurity',
    title: { en: 'Cybersecurity & Compliance', es: 'Ciberseguridad y Cumplimiento' },
    summary: {
      en: 'Endpoint protection, 24/7 SOC monitoring, and compliance support mapped to HIPAA, SOC 2, PCI DSS, and GLBA.',
      es: 'Protección de endpoints, monitoreo SOC 24/7 y apoyo al cumplimiento alineado con HIPAA, SOC 2, PCI DSS y GLBA.',
    },
    items: [
      {
        en: 'Advanced Endpoint Protection: EDR/XDR, firewalls, and threat detection across layers.',
        es: 'Protección avanzada de endpoints: EDR/XDR, firewalls y detección de amenazas en varias capas.',
      },
      {
        en: 'Managed IT Security: 24/7 SOC monitoring, SIEM logging, and incident response.',
        es: 'Seguridad de TI administrada: monitoreo SOC 24/7, SIEM y respuesta a incidentes.',
      },
      {
        en: 'Compliance Support: HIPAA, SOC 2, PCI DSS, and GLBA mapping.',
        es: 'Apoyo al cumplimiento: alineación con HIPAA, SOC 2, PCI DSS y GLBA.',
      },
    ],
  },
  {
    id: '03',
    slug: 'cloud',
    title: { en: 'Cloud Services & Architecture', es: 'Servicios de Nube y Arquitectura' },
    summary: {
      en: 'Microsoft 365 and Google Workspace migrations, identity with Entra ID, and secure consolidation of files and servers.',
      es: 'Migraciones a Microsoft 365 y Google Workspace, identidad con Entra ID y consolidación segura de archivos y servidores.',
    },
    items: [
      {
        en: 'Cloud Migrations & Management: Microsoft 365 and Google Workspace.',
        es: 'Migraciones y gestión en la nube: Microsoft 365 y Google Workspace.',
      },
      {
        en: 'Microsoft Entra ID / Azure AD: identity provisioning and SSO.',
        es: 'Microsoft Entra ID / Azure AD: aprovisionamiento de identidades y SSO.',
      },
    ],
  },
  {
    id: '04',
    slug: 'it-consulting',
    title: { en: 'IT Consulting & Strategic Leadership', es: 'Consultoría de TI y Liderazgo Estratégico' },
    summary: {
      en: 'Virtual CIO guidance: roadmaps, risk assessments, budgets, and quarterly business reviews.',
      es: 'Orientación de CIO virtual: hojas de ruta, evaluaciones de riesgo, presupuestos y revisiones trimestrales.',
    },
    items: [
      {
        en: 'Virtual CIO (vCIO): roadmapping, risk assessments, and quarterly business reviews.',
        es: 'CIO virtual (vCIO): hoja de ruta, evaluaciones de riesgo y revisiones trimestrales.',
      },
    ],
  },
  {
    id: '05',
    slug: 'backup-disaster-recovery',
    title: { en: 'Backup & Disaster Recovery', es: 'Respaldo y Recuperación ante Desastres' },
    summary: {
      en: 'Automated backups, off-site replication, and recovery validation so an outage does not become a crisis.',
      es: 'Respaldos automatizados, replicación externa y validación de recuperación para que una interrupción no se convierta en crisis.',
    },
    items: [
      {
        en: 'Data Protection: automated backups, off-site replication, and recovery validation.',
        es: 'Protección de datos: respaldos automatizados, replicación externa y validación de recuperación.',
      },
    ],
  },
  {
    id: '06',
    slug: 'cabling-communications',
    title: { en: 'Structured Cabling & Communications', es: 'Cableado Estructurado y Comunicaciones' },
    summary: {
      en: 'Fiber and low-voltage cabling, business VoIP, and workplace AV built for reliable day-to-day operations.',
      es: 'Fibra y cableado de baja tensión, VoIP empresarial y AV de oficina pensados para el día a día.',
    },
    items: [
      {
        en: 'Structured Cabling: fiber, low-voltage cabling, and infrastructure labeling.',
        es: 'Cableado estructurado: fibra, cableado de baja tensión y etiquetado de infraestructura.',
      },
      {
        en: 'Business VoIP Systems: unified telephony platforms.',
        es: 'Sistemas VoIP empresariales: plataformas de telefonía unificada.',
      },
    ],
  },
  {
    id: '07',
    slug: 'ai-consulting',
    title: { en: 'AI Consulting & Strategy', es: 'Consultoría y Estrategia de IA' },
    summary: {
      en: 'Practical AI roadmaps and an honest look at ROI. We start where the value is high and the risk is low.',
      es: 'Hojas de ruta de IA prácticas y una mirada honesta al ROI. Empezamos donde hay más valor y menos riesgo.',
    },
    items: [
      {
        en: 'AI Roadmap & Adoption: practical plans starting with highest-value opportunities.',
        es: 'Hoja de ruta de IA: planes prácticos empezando por las oportunidades de mayor valor.',
      },
      {
        en: 'Readiness & ROI Assessment: honest evaluation of where AI fits and where it does not.',
        es: 'Evaluación de preparación y ROI: valoración honesta de dónde encaja la IA y dónde no.',
      },
    ],
  },
  {
    id: '08',
    slug: 'ai-integration',
    title: { en: 'AI Integration & Automation', es: 'Integración y Automatización de IA' },
    summary: {
      en: 'Connect AI tools to your ERP, CRM, and existing stack; automate repetitive work with ongoing tuning.',
      es: 'Conecta herramientas de IA con tu ERP, CRM y stack actual; automatiza lo repetitivo con ajuste continuo.',
    },
    items: [
      {
        en: 'Systems Integration: connect AI tools to ERP, CRM, and your existing stack.',
        es: 'Integración de sistemas: conecta herramientas de IA con ERP, CRM y tu stack actual.',
      },
    ],
  },
  {
    id: '09',
    slug: 'conversational-ai',
    title: { en: 'Conversational AI & Voice', es: 'IA Conversacional y Voz' },
    summary: {
      en: 'Chatbots and AI voice systems that handle routine questions and keep human support focused on exceptions.',
      es: 'Chatbots y sistemas de voz con IA que resuelven lo rutinario y dejan el soporte humano para las excepciones.',
    },
    items: [
      {
        en: 'AI Chatbots: routine questions handled so human support can focus on exceptions.',
        es: 'Chatbots de IA: resuelven lo rutinario para que el soporte humano se centre en las excepciones.',
      },
    ],
  },
  {
    id: '10',
    slug: 'web-design-development',
    title: { en: 'Web Design & Development', es: 'Diseño y Desarrollo Web' },
    summary: {
      en: 'Accessible, on-brand sites and custom applications with secure hosting and ongoing support.',
      es: 'Sitios accesibles y con tu marca, aplicaciones a medida, hosting seguro y soporte continuo.',
    },
    items: [
      {
        en: 'Website Design & UX: accessible, on-brand sites that turn visitors into customers.',
        es: 'Diseño web y UX: sitios accesibles, con tu marca, que convierten visitantes en clientes.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicePath(locale: string, slug: string): string {
  return locale === 'es' ? `/es/services/${slug}/` : `/services/${slug}/`;
}
