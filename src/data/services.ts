export type Service = {
  id: string;
  title: { en: string; es: string };
  items: { en: string; es: string }[];
};

export const services: Service[] = [
  {
    id: '01',
    title: { en: 'Managed IT Services', es: 'Servicios de TI Administrados' },
    items: [
      {
        en: 'Help Desk Support — 24/7/365 local help desk with live phone response.',
        es: 'Mesa de ayuda — soporte local 24/7/365 con respuesta telefónica en vivo.',
      },
      {
        en: 'Proactive Monitoring & Maintenance — monitoring, patching, and endpoint management.',
        es: 'Monitoreo y mantenimiento proactivo — supervisión, parches y gestión de endpoints.',
      },
      {
        en: 'Onsite IT Support — hardware failures, network issues, rollouts, and office moves.',
        es: 'Soporte in situ — fallos de hardware, red, despliegues y mudanzas de oficina.',
      },
      {
        en: 'Flat-Rate Predictable Support — per-user packages instead of break/fix billing.',
        es: 'Soporte de tarifa plana — paquetes por usuario en lugar de facturación por averías.',
      },
    ],
  },
  {
    id: '02',
    title: { en: 'Cybersecurity & Compliance', es: 'Ciberseguridad y Cumplimiento' },
    items: [
      {
        en: 'Advanced Endpoint Protection — EDR/XDR, firewalls, and multi-layered threat detection.',
        es: 'Protección avanzada de endpoints — EDR/XDR, firewalls y detección en múltiples capas.',
      },
      {
        en: 'Managed IT Security — 24/7 SOC monitoring, SIEM logging, and incident response.',
        es: 'Seguridad de TI administrada — monitoreo SOC 24/7, SIEM y respuesta a incidentes.',
      },
      {
        en: 'Compliance Support — HIPAA, SOC 2, PCI DSS, and GLBA mapping.',
        es: 'Apoyo al cumplimiento — alineación con HIPAA, SOC 2, PCI DSS y GLBA.',
      },
    ],
  },
  {
    id: '03',
    title: { en: 'Cloud Services & Architecture', es: 'Servicios de Nube y Arquitectura' },
    items: [
      {
        en: 'Cloud Migrations & Management — Microsoft 365 and Google Workspace.',
        es: 'Migraciones y gestión en la nube — Microsoft 365 y Google Workspace.',
      },
      {
        en: 'Microsoft Entra ID / Azure AD — identity provisioning and SSO.',
        es: 'Microsoft Entra ID / Azure AD — aprovisionamiento de identidades y SSO.',
      },
    ],
  },
  {
    id: '04',
    title: { en: 'IT Consulting & Strategic Leadership', es: 'Consultoría de TI y Liderazgo Estratégico' },
    items: [
      {
        en: 'Virtual CIO (vCIO) — roadmapping, risk assessments, and quarterly business reviews.',
        es: 'CIO virtual (vCIO) — hoja de ruta, evaluaciones de riesgo y revisiones trimestrales.',
      },
    ],
  },
  {
    id: '05',
    title: { en: 'Backup & Disaster Recovery', es: 'Respaldo y Recuperación ante Desastres' },
    items: [
      {
        en: 'Data Protection — automated backups, off-site replication, and recovery validation.',
        es: 'Protección de datos — respaldos automatizados, replicación externa y validación de recuperación.',
      },
    ],
  },
  {
    id: '06',
    title: { en: 'Structured Cabling & Communications', es: 'Cableado Estructurado y Comunicaciones' },
    items: [
      {
        en: 'Structured Cabling — fiber, low-voltage cabling, and infrastructure labeling.',
        es: 'Cableado estructurado — fibra, cableado de baja tensión y etiquetado de infraestructura.',
      },
      {
        en: 'Business VoIP Systems — unified telephony platforms.',
        es: 'Sistemas VoIP empresariales — plataformas de telefonía unificada.',
      },
    ],
  },
  {
    id: '07',
    title: { en: 'AI Consulting & Strategy', es: 'Consultoría y Estrategia de IA' },
    items: [
      {
        en: 'AI Roadmap & Adoption — practical plans starting with highest-value opportunities.',
        es: 'Hoja de ruta de IA — planes prácticos empezando por las oportunidades de mayor valor.',
      },
      {
        en: 'Readiness & ROI Assessment — honest evaluation of where AI fits and where it does not.',
        es: 'Evaluación de preparación y ROI — valoración honesta de dónde encaja la IA y dónde no.',
      },
    ],
  },
  {
    id: '08',
    title: { en: 'AI Integration & Automation', es: 'Integración y Automatización de IA' },
    items: [
      {
        en: 'Systems Integration — connect AI tools to ERP, CRM, and your existing stack.',
        es: 'Integración de sistemas — conecta herramientas de IA con ERP, CRM y tu stack actual.',
      },
    ],
  },
  {
    id: '09',
    title: { en: 'Conversational AI & Voice', es: 'IA Conversacional y Voz' },
    items: [
      {
        en: 'AI Chatbots — routine questions handled, support elevated.',
        es: 'Chatbots de IA — consultas rutinarias resueltas, soporte elevado.',
      },
    ],
  },
  {
    id: '10',
    title: { en: 'Web Design & Development', es: 'Diseño y Desarrollo Web' },
    items: [
      {
        en: 'Website Design & UX — accessible, on-brand sites that turn visitors into customers.',
        es: 'Diseño web y UX — sitios accesibles, con tu marca, que convierten visitantes en clientes.',
      },
    ],
  },
];
