export type LocaleText = { en: string; es: string };

export type ServiceDetails = {
  metaTitle: LocaleText;
  metaDescription: LocaleText;
  audience: LocaleText;
  overview: LocaleText;
  process: { title: LocaleText; body: LocaleText }[];
  faqs: { question: LocaleText; answer: LocaleText; id?: string }[];
};

export const serviceDetails: Record<string, ServiceDetails> = {
  'managed-it': {
    metaTitle: {
      en: 'Managed IT Services in South Florida | Cybercon',
      es: 'TI administrada en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Managed IT for Cooper City & Davie businesses: 24/7 help desk, monitoring, onsite support, and predictable per-user pricing. Book a free assessment.',
      es: 'TI administrada para empresas en Cooper City y Davie: mesa de ayuda 24/7, monitoreo, soporte en sitio y precio predecible por usuario. Evaluación gratuita.',
    },
    audience: {
      en: 'Growing South Florida organizations in Cooper City, Davie, and nearby cities that want a reliable IT partner without hiring a full internal department. Ideal when break/fix bills feel unpredictable, tickets linger, or leadership needs one accountable team for day-to-day technology.',
      es: 'Organizaciones en crecimiento en Cooper City, Davie y zonas cercanas del sur de Florida que quieren un proveedor de TI fiable sin armar un departamento interno completo. Encaja cuando las facturas por falla son impredecibles, los tickets se alargan o la dirección necesita un solo equipo responsable de la tecnología diaria.',
    },
    overview: {
      en: 'Cybercon Solutions runs managed IT as your outsourced IT department: we monitor endpoints and servers, patch on a schedule, and answer when something breaks. Support is local and available 24/7/365 by phone, with onsite help for hardware failures, network issues, rollouts, and office moves across South Florida.\n\nPricing is packaged per user so monthly costs stay predictable. You get proactive maintenance instead of waiting for the next outage, and a clear owner when priorities compete.',
      es: 'Cybercon Solutions opera la TI administrada como tu departamento de TI tercerizado: monitoreamos endpoints y servidores, aplicamos parches con calendario y respondemos cuando algo falla. El soporte es local y está disponible 24/7/365 por teléfono, con ayuda en sitio para fallos de hardware, red, despliegues y mudanzas de oficina en el sur de Florida.\n\nEl precio va por usuario para que el costo mensual sea predecible. Obtienes mantenimiento proactivo en lugar de esperar la próxima caída, y un responsable claro cuando hay prioridades en conflicto.',
    },
    process: [
      {
        title: {
          en: '1. Free assessment',
          es: '1. Evaluación gratuita',
        },
        body: {
          en: 'We review your current stack, support pain points, and coverage gaps. You’ll get a written summary of where you stand and what to tackle first.',
          es: 'Revisamos tu stack tecnológico actual, los dolores de soporte y los huecos de cobertura. Recibes un resumen escrito de dónde estás y qué conviene abordar primero.',
        },
      },
      {
        title: {
          en: '2. Onboarding & baselines',
          es: '2. Incorporación y líneas base',
        },
        body: {
          en: 'We inventory devices, set monitoring and patching baselines, and align ticket priorities with your business hours and risk tolerance.',
          es: 'Inventariamos dispositivos, definimos líneas base de monitoreo y parches, y alineamos prioridades de tickets con tus horarios y tolerancia al riesgo.',
        },
      },
      {
        title: {
          en: '3. Steady-state support',
          es: '3. Soporte en régimen',
        },
        body: {
          en: 'Day-to-day help desk, proactive maintenance, and onsite response when remote fixes are not enough. You get one partner instead of juggling vendors.',
          es: 'Mesa de ayuda diaria, mantenimiento proactivo y respuesta en sitio cuando lo remoto no basta. Un solo proveedor en lugar de malabarismos con varios.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Is support really 24/7 with a live phone response?',
          es: '¿El soporte es realmente 24/7 con respuesta telefónica en vivo?',
        },
        answer: {
          en: 'Yes. Our local help desk is available 24/7/365 with live phone response, not only email or chat bots.',
          es: 'Sí. Nuestra mesa de ayuda local está disponible 24/7/365 con respuesta telefónica en vivo, no solo correo o bots de chat.',
        },
      },
      {
        question: {
          en: 'How is pricing structured?',
          es: '¿Cómo se estructura el precio?',
        },
        answer: {
          en: 'We use per-user packages instead of break/fix billing, so you can plan monthly IT spend without surprise trip charges for every incident.',
          es: 'Usamos paquetes por usuario en lugar de cobro por falla, para que puedas planificar el gasto mensual de TI sin cobros sorpresa por cada incidente.',
        },
      },
      {
        question: {
          en: 'Do you come onsite in Cooper City and Davie?',
          es: '¿Van en sitio a Cooper City y Davie?',
        },
        answer: {
          en: 'Yes. We provide onsite IT support across our South Florida service area, including Cooper City and Davie, for hardware, network, rollouts, and office moves.',
          es: 'Sí. Damos soporte de TI en sitio en nuestra zona del sur de Florida, incluidos Cooper City y Davie, para hardware, red, despliegues y mudanzas de oficina.',
        },
      },
      {
        id: 'sample-qbr',
        question: {
          en: 'Can I see a sample quarterly business review?',
          es: '¿Puedo ver una revisión trimestral de muestra?',
        },
        answer: {
          en: 'Yes. Download our anonymized sample QBR (PDF) with real decision outcomes — approved, deferred, and declined items included: https://cybercon-solutions.com/downloads/cybercon-sample-qbr-anonymized.pdf',
          es: 'Sí. Descarga nuestra QBR de muestra anonimizada (PDF) con decisiones reales — aprobadas, aplazadas y rechazadas: https://cybercon-solutions.com/downloads/cybercon-sample-qbr-anonymized.pdf',
        },
      },
    ],
  },

  cybersecurity: {
    metaTitle: {
      en: 'Cybersecurity & Compliance in South Florida | Cybercon',
      es: 'Ciberseguridad y cumplimiento | Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Endpoint protection, 24/7 SOC monitoring, and compliance support for HIPAA, SOC 2, PCI DSS, and GLBA for South Florida businesses.',
      es: 'Protección de endpoints, monitoreo SOC 24/7 y apoyo al cumplimiento HIPAA, SOC 2, PCI DSS y GLBA para empresas del sur de Florida.',
    },
    audience: {
      en: 'South Florida companies that handle sensitive data or face customer and insurer expectations around security. Especially useful for teams aligning controls to HIPAA, SOC 2, PCI DSS, or GLBA without staffing a full security department.',
      es: 'Empresas del sur de Florida que manejan datos sensibles o enfrentan expectativas de clientes y aseguradoras sobre seguridad. Especialmente útil si alineas controles con HIPAA, SOC 2, PCI DSS o GLBA sin un departamento de seguridad completo.',
    },
    overview: {
      en: 'We combine endpoint protection (EDR/XDR), firewalls, and layered threat detection with 24/7 SOC monitoring, SIEM logging, and incident response. The goal is practical defense: stop common attacks early, keep visibility when something looks wrong, and document controls in language auditors and leadership can use.\n\nCompliance support maps your environment to HIPAA, SOC 2, PCI DSS, and GLBA. We size controls for growing South Florida businesses that need security that fits operations, not a binder on a shelf.',
      es: 'Combinamos protección de endpoints (EDR/XDR), firewalls y detección en capas con monitoreo SOC 24/7, registro SIEM y respuesta a incidentes. La meta es defensa práctica: frenar ataques comunes a tiempo, mantener visibilidad cuando algo falla y documentar controles en lenguaje útil para auditores y dirección.\n\nEl apoyo al cumplimiento alinea tu entorno con HIPAA, SOC 2, PCI DSS y GLBA. Dimensionamos controles para empresas en crecimiento del sur de Florida que necesitan seguridad operable, no un manual que nadie usa.',
    },
    process: [
      {
        title: { en: '1. Risk & control review', es: '1. Revisión de riesgos y controles' },
        body: {
          en: 'We assess endpoints, identity, logging, and compliance targets so recommendations match how you actually work.',
          es: 'Evaluamos endpoints, identidad, registro y objetivos de cumplimiento para que las recomendaciones encajen con cómo trabajas de verdad.',
        },
      },
      {
        title: { en: '2. Protect & monitor', es: '2. Proteger y monitorear' },
        body: {
          en: 'Deploy or tune endpoint protection, monitoring, and alerting. SOC coverage watches for threats around the clock.',
          es: 'Desplegamos o afinamos protección de endpoints, monitoreo y alertas. La cobertura SOC vigila amenazas las 24 horas.',
        },
      },
      {
        title: { en: '3. Respond & improve', es: '3. Responder y mejorar' },
        body: {
          en: 'When incidents happen, we respond, document, and tighten controls. Compliance mapping stays current as your stack changes.',
          es: 'Cuando hay incidentes, respondemos, documentamos y reforzamos controles. El mapeo de cumplimiento se mantiene al día conforme cambia tu stack tecnológico.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Which compliance frameworks do you support?',
          es: '¿Qué marcos de cumplimiento apoyan?',
        },
        answer: {
          en: 'We provide compliance support mapped to HIPAA, SOC 2, PCI DSS, and GLBA.',
          es: 'Damos apoyo al cumplimiento alineado con HIPAA, SOC 2, PCI DSS y GLBA.',
        },
      },
      {
        question: {
          en: 'Do you offer 24/7 security monitoring?',
          es: '¿Ofrecen monitoreo de seguridad 24/7?',
        },
        answer: {
          en: 'Yes. Managed IT security includes 24/7 SOC monitoring, SIEM logging, and incident response.',
          es: 'Sí. La seguridad de TI administrada incluye monitoreo SOC 24/7, SIEM y respuesta a incidentes.',
        },
      },
      {
        question: {
          en: 'Is this only for large enterprises?',
          es: '¿Esto es solo para grandes empresas?',
        },
        answer: {
          en: 'No. We design controls for growing South Florida organizations that need strong security without an enterprise-sized program or headcount.',
          es: 'No. Diseñamos controles para organizaciones en crecimiento del sur de Florida que necesitan seguridad sólida sin un programa ni una planta de personal de tamaño empresarial.',
        },
      },
      {
        question: {
          en: 'Can I check if a work email has been in a breach?',
          es: '¿Puedo revisar si un correo de trabajo ha estado en una filtración?',
        },
        answer: {
          en: 'Yes. Use the free lite breach check on this page (powered by Have I Been Pwned). It is a quick exposure snapshot — not a full investigation — and we can follow up with MFA, identity, and monitoring next steps.',
          es: 'Sí. Usa la revisión lite gratuita de filtraciones en esta página (con Have I Been Pwned). Es un panorama rápido de exposición — no una investigación completa — y podemos continuar con MFA, identidad y monitoreo.',
        },
      },
    ],
  },

  'ai-security': {
    metaTitle: {
      en: 'AI Security in South Florida | Cybercon Solutions',
      es: 'Seguridad de IA en el Sur de Florida | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Secure AI for South Florida businesses: governance, data-leakage controls, workspace protection, and a free AI security readiness check.',
      es: 'IA segura para empresas del sur de Florida: gobernanza, control de filtraciones, protección del espacio de trabajo y revisión gratuita de preparación.',
    },
    audience: {
      en: 'South Florida organizations adopting copilots, chatbots, and browser AI that need governance and leakage controls without hiring a full security department — especially Cooper City and Davie teams handling customer, patient, or financial data.',
      es: 'Organizaciones del sur de Florida que adoptan copilots, chatbots e IA en el navegador y necesitan gobernanza y control de filtraciones sin un departamento de seguridad completo — especialmente equipos en Cooper City y Davie que manejan datos de clientes, pacientes o finanzas.',
    },
    overview: {
      en: 'AI Security from Cybercon Solutions helps Cooper City and Davie businesses adopt AI without exposing intellectual property, sensitive data, or compliance gaps. We combine AI usage governance, data-leakage controls, and continuous oversight with unified workspace security across identity, email, endpoints, awareness, and exposure.\n\nTraditional cybersecurity still matters — endpoints, identity, email — but it was not designed to answer which AI tools are allowed, with which data, and who can prove it. We close that gap with enforceable policies, monitoring of AI-enabled workflows, and SOC-backed response when something looks wrong.',
      es: 'La Seguridad de IA de Cybercon Solutions ayuda a empresas en Cooper City y Davie a adoptar IA sin exponer propiedad intelectual, datos sensibles o vacíos de cumplimiento. Combinamos gobernanza del uso de IA, control de filtraciones y supervisión continua con seguridad unificada del espacio de trabajo en identidad, correo, endpoints, concientización y exposición.\n\nLa ciberseguridad tradicional sigue importando — endpoints, identidad, correo — pero no fue diseñada para responder qué herramientas de IA están permitidas, con qué datos y quién puede demostrarlo. Cerramos ese vacío con políticas aplicables, monitoreo de flujos con IA y respuesta respaldada por SOC cuando algo falla.',
    },
    process: [
      {
        title: { en: '1. Assess AI risk & usage', es: '1. Evaluar riesgo y uso de IA' },
        body: {
          en: 'Inventory tools in use, classify sensitive data paths, and score governance gaps against how your team actually works.',
          es: 'Inventariamos herramientas en uso, clasificamos rutas de datos sensibles y puntuamos vacíos de gobernanza según cómo trabaja de verdad tu equipo.',
        },
      },
      {
        title: { en: '2. Deploy guardrails & controls', es: '2. Desplegar pautas de control y controles' },
        body: {
          en: 'Approve tools, restrict high-risk AI workflows, and unify identity, email, endpoint, and exposure protections.',
          es: 'Aprobamos herramientas, restringimos flujos de IA de alto riesgo y unificamos protecciones de identidad, correo, endpoint y exposición.',
        },
      },
      {
        title: { en: '3. Monitor, respond & prove value', es: '3. Monitorear, responder y demostrar valor' },
        body: {
          en: 'Correlate signals, rehearse AI-related incident response, and report posture in language leadership and insurers understand.',
          es: 'Correlacionamos señales, ensayamos respuesta a incidentes relacionados con IA e informamos la postura en lenguaje que entienden dirección y aseguradoras.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do we need AI security if we already have cybersecurity tools?',
          es: '¿Necesitamos seguridad de IA si ya tenemos herramientas de ciberseguridad?',
        },
        answer: {
          en: 'Yes. Traditional tools protect endpoints, identity, and email — but they do not fully account for how AI tools access, process, and expose data.',
          es: 'Sí. Las herramientas tradicionales protegen endpoints, identidad y correo — pero no contemplan del todo cómo las herramientas de IA acceden, procesan y exponen datos.',
        },
      },
      {
        question: {
          en: 'Is AI security only for large enterprises?',
          es: '¿La seguridad de IA es solo para grandes empresas?',
        },
        answer: {
          en: 'No. Growing South Florida businesses often face more risk because AI tools are adopted informally without governance.',
          es: 'No. Las empresas en crecimiento del sur de Florida suelen enfrentar más riesgo porque las herramientas de IA se adoptan de forma informal sin gobernanza.',
        },
      },
    ],
  },

  cloud: {
    metaTitle: {
      en: 'Cloud Services in South Florida | Cybercon',
      es: 'Servicios de nube en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Microsoft 365 and Google Workspace migrations, Entra ID identity, and secure file/server consolidation for Cooper City & Davie businesses.',
      es: 'Migraciones a Microsoft 365 y Google Workspace, identidad con Entra ID y consolidación segura de archivos/servidores para Cooper City y Davie.',
    },
    audience: {
      en: 'Teams moving off aging servers or fragmented SaaS, or consolidating Microsoft 365 / Google Workspace with cleaner identity. Common for South Florida offices that need migration discipline and ongoing cloud management. If your team is mid-migration or stuck between a file server and a half-finished tenant, we help you finish the job without stranding users.',
      es: 'Equipos que dejan servidores antiguos o SaaS fragmentado, o consolidan Microsoft 365 / Google Workspace con identidad más limpia. Habitual en oficinas del sur de Florida que necesitan migraciones ordenadas y gestión continua en la nube. Si tu equipo está a mitad de migración o atrapado entre un servidor de archivos y un tenant a medias, te ayudamos a terminar sin dejar usuarios colgados.',
    },
    overview: {
      en: 'We plan and run cloud migrations to Microsoft 365 and Google Workspace, set up identity with Microsoft Entra ID / Azure AD (including provisioning and SSO), and consolidate files and servers securely. The work is sequenced to reduce downtime and keep users productive during cutover.\n\nAfter migration, we stay involved so identity, sharing, and administration do not drift. Serving Cooper City, Davie, and greater South Florida, we pair remote cloud work with onsite help when devices or network paths need hands-on attention.',
      es: 'Planificamos y ejecutamos migraciones a Microsoft 365 y Google Workspace, configuramos identidad con Microsoft Entra ID / Azure AD (incluido aprovisionamiento y SSO) y consolidamos archivos y servidores de forma segura. El trabajo se secuencia para reducir caídas y mantener a la gente productiva durante el corte.\n\nTras la migración seguimos involucrados para que identidad, uso compartido y administración no se desvíen. Atendemos Cooper City, Davie y el sur de Florida, combinando trabajo remoto en la nube con ayuda en sitio cuando hace falta tocar dispositivos o la red.',
    },
    process: [
      {
        title: { en: '1. Discovery & design', es: '1. Descubrimiento y diseño' },
        body: {
          en: 'Map mailboxes, files, apps, and identity dependencies. Agree on target tenants, SSO needs, and a cutover window that fits your business.',
          es: 'Mapeamos buzones, archivos, apps y dependencias de identidad. Acordamos tenants destino, necesidades de SSO y una ventana de corte que encaje con tu negocio.',
        },
      },
      {
        title: { en: '2. Migrate & harden', es: '2. Migrar y reforzar' },
        body: {
          en: 'Move workloads in phases, validate access, and apply secure defaults for identity and sharing.',
          es: 'Movemos cargas por fases, validamos el acceso y aplicamos valores seguros por defecto en identidad y uso compartido.',
        },
      },
      {
        title: { en: '3. Operate', es: '3. Operar' },
        body: {
          en: 'Ongoing cloud management, identity housekeeping, and support so the new environment stays usable and secure.',
          es: 'Gestión continua en la nube, mantenimiento de identidad y soporte para que el nuevo entorno siga usable y seguro.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you migrate both Microsoft 365 and Google Workspace?',
          es: '¿Migran tanto Microsoft 365 como Google Workspace?',
        },
        answer: {
          en: 'Yes. Cloud migrations and management cover Microsoft 365 and Google Workspace.',
          es: 'Sí. Las migraciones y la gestión en la nube cubren Microsoft 365 y Google Workspace.',
        },
      },
      {
        question: {
          en: 'Can you set up Entra ID / Azure AD and SSO?',
          es: '¿Pueden configurar Entra ID / Azure AD y SSO?',
        },
        answer: {
          en: 'Yes. We handle Microsoft Entra ID / Azure AD identity provisioning and SSO as part of cloud architecture work.',
          es: 'Sí. Gestionamos aprovisionamiento de identidades y SSO con Microsoft Entra ID / Azure AD como parte de la arquitectura en la nube.',
        },
      },
      {
        question: {
          en: 'Will users lose access during migration?',
          es: '¿Los usuarios perderán acceso durante la migración?',
        },
        answer: {
          en: 'We phase cutovers and validate access to reduce disruption. Exact downtime depends on scope; we plan windows around your operations.',
          es: 'Secuenciamos los cortes y validamos el acceso para reducir interrupciones. El tiempo exacto de caída depende del alcance; planificamos ventanas según tu operación.',
        },
      },
    ],
  },

  'it-consulting': {
    metaTitle: {
      en: 'IT Consulting in South Florida | Cybercon',
      es: 'Consultoría de TI en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Virtual CIO guidance for South Florida businesses: roadmaps, risk assessments, budgets, and quarterly business reviews. Free assessment available.',
      es: 'Orientación de CIO virtual para empresas del sur de Florida: planes estratégicos, riesgos, presupuestos y revisiones trimestrales. Evaluación gratuita.',
    },
    audience: {
      en: 'Owners and operators who need strategic IT leadership without a full-time CIO. Fits Cooper City and Davie organizations balancing growth, risk, and budget with limited internal IT leadership bandwidth. Bring us in when renewals stack up, priorities conflict, or you need an independent voice before a major purchase.',
      es: 'Dueños y operadores que necesitan liderazgo estratégico de TI sin un CIO a tiempo completo. Encaja en organizaciones de Cooper City y Davie que equilibran crecimiento, riesgo y presupuesto con poca capacidad de liderazgo interno de TI. Llámanos cuando se acumulen renovaciones, choquen prioridades o necesites una voz independiente antes de una compra grande.',
    },
    overview: {
      en: 'Our virtual CIO (vCIO) service gives you roadmaps, risk assessments, budgets, and quarterly business reviews. We translate technology choices into business tradeoffs: what to fund now, what to defer, and what creates unnecessary risk.\n\nSessions stay practical. You leave with priorities, owners, and a timeline you can explain to finance and operations. We serve South Florida businesses that want calm, accountable IT planning alongside day-to-day managed services when needed.',
      es: 'Nuestro servicio de CIO virtual (vCIO) ofrece planes estratégicos, evaluaciones de riesgo, presupuestos y revisiones trimestrales. Traducimos las decisiones tecnológicas a equilibrios de negocio: qué financiar ahora, qué aplazar y qué crea riesgo innecesario.\n\nLas sesiones son prácticas. Sales con prioridades, responsables y un calendario que puedes explicar a finanzas y operaciones. Atendemos empresas del sur de Florida que quieren planificación de TI serena y con dueño, junto a servicios administrados del día a día cuando haga falta.',
    },
    process: [
      {
        title: { en: '1. Current-state briefing', es: '1. Briefing del estado actual' },
        body: {
          en: 'We review systems, vendors, risks, and spending so advice starts from reality, not a template.',
          es: 'Revisamos sistemas, proveedores, riesgos y gasto para que el consejo parta de la realidad, no de una plantilla.',
        },
      },
      {
        title: { en: '2. Roadmap & budget', es: '2. Plan estratégico y presupuesto' },
        body: {
          en: 'Build a sequenced plan with risk notes and budget ranges leadership can approve.',
          es: 'Construimos un plan secuenciado con notas de riesgo y rangos de presupuesto que la dirección pueda aprobar.',
        },
      },
      {
        title: { en: '3. Quarterly reviews', es: '3. Revisiones trimestrales' },
        body: {
          en: 'Revisit progress, refresh priorities, and adjust when the business or threat landscape changes.',
          es: 'Revisamos avances, actualizamos prioridades y ajustamos cuando cambia el negocio o el panorama de amenazas.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'What does a virtual CIO actually deliver?',
          es: '¿Qué entrega en concreto un CIO virtual?',
        },
        answer: {
          en: 'Roadmapping, risk assessments, budget guidance, and quarterly business reviews oriented to your goals.',
          es: 'Plan estratégico, evaluaciones de riesgo, orientación presupuestaria y revisiones trimestrales orientadas a tus objetivos.',
        },
      },
      {
        question: {
          en: 'Is vCIO separate from managed IT?',
          es: '¿El vCIO es aparte de la TI administrada?',
        },
        answer: {
          en: 'It can stand alone or pair with managed services. Strategy sets direction; operations execute the plan.',
          es: 'Puede ir solo o junto a servicios administrados. La estrategia marca dirección; las operaciones ejecutan el plan.',
        },
      },
      {
        question: {
          en: 'How often do we meet?',
          es: '¿Con qué frecuencia nos reunimos?',
        },
        answer: {
          en: 'Quarterly business reviews are the cadence; we schedule deeper planning when projects or risks demand it.',
          es: 'Las revisiones trimestrales marcan el ritmo; programamos planificación más profunda cuando proyectos o riesgos lo exigen.',
        },
      },
      {
        question: {
          en: 'Do you work with our existing IT vendors?',
          es: '¿Trabajan con nuestros proveedores de TI actuales?',
        },
        answer: {
          en: 'Yes. vCIO guidance can include reviewing vendor roadmaps and helping you decide what to keep, renegotiate, or replace without disrupting day-to-day support.',
          es: 'Sí. La orientación de vCIO puede incluir revisar planes estratégicos de proveedores y ayudarte a decidir qué mantener, renegociar o reemplazar sin romper el soporte diario.',
        },
      },
    ],
  },

  'backup-disaster-recovery': {
    metaTitle: {
      en: 'Backup & DR in South Florida | Cybercon',
      es: 'Copia de seguridad | Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Automated backups, off-site replication, and recovery validation for South Florida businesses so an outage does not become a crisis.',
      es: 'Copias de seguridad automatizadas, replicación externa y validación de recuperación para empresas del sur de Florida, para que una caída no sea una crisis.',
    },
    audience: {
      en: 'Organizations that cannot afford prolonged downtime or silent backup failures. Fits South Florida offices that need proven recovery, not just a backup checkbox. If you are unsure whether last night’s backup would restore payroll or patient files today, that uncertainty is the problem we solve.',
      es: 'Organizaciones que no pueden permitirse caídas largas o copias de seguridad que fallan en silencio. Encaja en oficinas del sur de Florida que necesitan recuperación comprobada, no solo un ejercicio de mero cumplimiento. Si no estás seguro de que el respaldo de anoche restauraría nómina o archivos críticos hoy, esa incertidumbre es el problema que resolvemos.',
    },
    overview: {
      en: 'We implement automated backups, off-site replication, and recovery validation so you know restores work before you need them. Protection covers the systems that keep Cooper City and Davie operations running, with monitoring so failures do not go unnoticed.\n\nDisaster recovery planning focuses on clear recovery points and realistic timelines. When something fails, the goal is a controlled restore, not improvisation under pressure.',
      es: 'Implementamos copias de seguridad automatizadas, replicación externa y validación de recuperación para saber que las restauraciones funcionan antes de necesitarlas. La protección cubre los sistemas que mantienen la operación en Cooper City y Davie, con monitoreo para que los fallos no pasen desapercibidos.\n\nLa planificación ante desastres se centra en puntos de recuperación claros y plazos realistas. Cuando algo falla, la meta es una restauración controlada, no improvisar bajo presión.',
    },
    process: [
      {
        title: { en: '1. Protect what matters', es: '1. Proteger lo importante' },
        body: {
          en: 'Identify critical systems and data, then configure automated backups with off-site replication.',
          es: 'Identificamos sistemas y datos críticos y configuramos copias de seguridad automatizadas con replicación externa.',
        },
      },
      {
        title: { en: '2. Validate restores', es: '2. Validar restauraciones' },
        body: {
          en: 'Test recovery so backup jobs are proven, not assumed. Fix gaps before an incident.',
          es: 'Probamos la recuperación para que los trabajos de respaldo estén demostrados, no supuestos. Corregimos vacíos antes de un incidente.',
        },
      },
      {
        title: { en: '3. Monitor & refine', es: '3. Monitorear y afinar' },
        body: {
          en: 'Watch backup health and adjust retention or scope as your environment changes.',
          es: 'Vigilamos la salud de las copias de seguridad y ajustamos retención o alcance cuando cambia el entorno.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you only configure backups, or also test them?',
          es: '¿Solo configuran copias de seguridad o también las prueban?',
        },
        answer: {
          en: 'We include recovery validation so restores are tested, not just scheduled.',
          es: 'Incluimos validación de recuperación para que las restauraciones se prueben, no solo se programen.',
        },
      },
      {
        question: {
          en: 'Is off-site replication included?',
          es: '¿Incluye replicación externa?',
        },
        answer: {
          en: 'Yes. Data protection includes automated backups, off-site replication, and recovery validation.',
          es: 'Sí. La protección de datos incluye copias de seguridad automatizadas, replicación externa y validación de recuperación.',
        },
      },
      {
        question: {
          en: 'Who is this for in South Florida?',
          es: '¿Para quién es esto en el sur de Florida?',
        },
        answer: {
          en: 'Businesses in Cooper City, Davie, and nearby areas that need outages handled as recoverable events, not crises.',
          es: 'Empresas en Cooper City, Davie y zonas cercanas que necesitan tratar las interrupciones como eventos recuperables, no como crisis.',
        },
      },
      {
        question: {
          en: 'How quickly can we restore after a failure?',
          es: '¿Qué tan rápido podemos restaurar tras un fallo?',
        },
        answer: {
          en: 'Recovery time depends on what failed and how much data must return. During design we set realistic recovery objectives and validate them with restore tests, not guesses.',
          es: 'El tiempo de recuperación depende de qué falló y cuántos datos deben volver. En el diseño fijamos objetivos realistas y los validamos con pruebas de restauración, no con suposiciones.',
        },
      },
    ],
  },

  'ai-consulting': {
    metaTitle: {
      en: 'AI Consulting in South Florida | Cybercon',
      es: 'Consultoría de IA en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Practical AI roadmaps and honest ROI assessment for South Florida businesses. Start where value is high and risk is low.',
      es: 'Planes estratégicos de IA prácticos y evaluación honesta de ROI para empresas del sur de Florida. Empieza donde hay más valor y menos riesgo.',
    },
    audience: {
      en: 'Leaders curious about AI but wary of hype. Built for South Florida organizations that want a clear roadmap and an honest ROI read before buying tools. Use this when leadership wants a decision memo before committing budget.',
      es: 'Líderes curiosos por la IA pero recelosos del bombo. Pensado para organizaciones del sur de Florida que quieren un plan estratégico claro y un ROI honesto antes de comprar herramientas. Úsalo cuando la dirección quiera un memo de decisión antes de comprometer presupuesto.',
    },
    overview: {
      en: 'We build practical AI roadmaps and run readiness and ROI assessments that say where AI fits and where it does not. Work starts with highest-value, lower-risk opportunities so early projects teach your team without putting core operations at stake.\n\nAdvice stays grounded in your stack, data quality, and capacity. Serving Cooper City, Davie, and greater South Florida, we keep recommendations implementable by the people who will own them.',
      es: 'Construimos planes estratégicos de IA prácticos y hacemos evaluaciones de preparación y ROI que dicen dónde encaja la IA y dónde no. Empezamos por oportunidades de alto valor y menor riesgo para que los primeros proyectos enseñen al equipo sin poner en juego la operación central.\n\nEl consejo se ancla en tu stack tecnológico, la calidad de datos y la capacidad real. Atendemos Cooper City, Davie y el sur de Florida, y mantenemos recomendaciones ejecutables por quienes las van a poseer.',
    },
    process: [
      {
        title: { en: '1. Readiness & ROI', es: '1. Preparación y ROI' },
        body: {
          en: 'Honest evaluation of data, workflows, and constraints. Separate promising use cases from distractions.',
          es: 'Evaluación honesta de datos, flujos y límites. Separar casos prometedores de distracciones.',
        },
      },
      {
        title: { en: '2. Roadmap', es: '2. Plan estratégico' },
        body: {
          en: 'Sequence adoption starting with highest-value opportunities and clear success measures.',
          es: 'Secuenciar la adopción empezando por las oportunidades de mayor valor y medidas de éxito claras.',
        },
      },
      {
        title: { en: '3. Guided next steps', es: '3. Siguientes pasos guiados' },
        body: {
          en: 'Help prioritize pilots and hand off to integration work when you are ready to build.',
          es: 'Ayudamos a priorizar pilotos y pasamos a integración cuando estés listo para construir.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Will you recommend AI everywhere?',
          es: '¿Recomendarán IA en todas partes?',
        },
        answer: {
          en: 'No. Readiness and ROI assessment includes where AI does not fit, not only where it does.',
          es: 'No. La evaluación de preparación y ROI incluye dónde la IA no encaja, no solo dónde sí.',
        },
      },
      {
        question: {
          en: 'What do we get at the end?',
          es: '¿Qué obtenemos al final?',
        },
        answer: {
          en: 'A practical roadmap and prioritized opportunities tied to value and risk, scoped to what your team can actually run.',
          es: 'Un plan estratégico práctico y oportunidades priorizadas según valor y riesgo, acotadas a lo que tu equipo puede operar de verdad.',
        },
      },
      {
        question: {
          en: 'Can this lead into implementation?',
          es: '¿Puede llevar a la implementación?',
        },
        answer: {
          en: 'Yes. Strategy can continue into AI integration and automation when you choose to build.',
          es: 'Sí. La estrategia puede continuar en integración y automatización de IA cuando decidas construir.',
        },
      },
      {
        question: {
          en: 'How long does an AI roadmap engagement take?',
          es: '¿Cuánto dura un proyecto de plan estratégico de IA?',
        },
        answer: {
          en: 'Most readiness and roadmap work fits in a short engagement measured in weeks, not months, so leadership can decide quickly whether to fund pilots.',
          es: 'La mayor parte del trabajo de preparación y plan estratégico cabe en un proyecto corto medido en semanas, no meses, para que la dirección decida rápido si financiar pilotos.',
        },
      },
    ],
  },

  'ai-integration': {
    metaTitle: {
      en: 'AI Integration in South Florida | Cybercon',
      es: 'Integración de IA en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Connect AI tools to ERP, CRM, and your stack. Automate repetitive work with ongoing tuning for South Florida businesses.',
      es: 'Conecta herramientas de IA con ERP, CRM y tu stack tecnológico. Automatiza lo repetitivo con ajuste continuo para empresas del sur de Florida.',
    },
    audience: {
      en: 'Teams that already know where AI should help and need it wired into ERP, CRM, and existing systems. Suited to South Florida companies ready for automation with ongoing tuning. Best when a pilot already proved value and you need production-grade connections with monitoring.',
      es: 'Equipos que ya saben dónde debe ayudar la IA y necesitan conectarla a ERP, CRM y sistemas actuales. Ideal para empresas del sur de Florida listas para automatizar con ajuste continuo. Ideal cuando un piloto ya demostró valor y necesitas conexiones de producción con monitoreo.',
    },
    overview: {
      en: 'We connect AI tools to your ERP, CRM, and existing stack, then automate repetitive work with monitoring and ongoing tuning. Integration focuses on reliable handoffs between systems, clear failure modes, and human review where it matters.\n\nProjects stay scoped. We prefer durable automations your staff can trust over fragile demos. Delivery supports Cooper City, Davie, and greater South Florida operations with remote build work and onsite coordination when needed.',
      es: 'Conectamos herramientas de IA con tu ERP, CRM y stack tecnológico actual, y automatizamos lo repetitivo con monitoreo y ajuste continuo. La integración se centra en traspasos fiables entre sistemas, modos de fallo claros y revisión humana donde importa.\n\nLos proyectos tienen alcance acotado. Preferimos automatizaciones duraderas en las que el equipo confíe, no demostraciones frágiles. Entregamos para operaciones en Cooper City, Davie y el sur de Florida con trabajo remoto y coordinación en sitio cuando hace falta.',
    },
    process: [
      {
        title: { en: '1. Integration design', es: '1. Diseño de integración' },
        body: {
          en: 'Map systems, data flows, and approval points. Define what automation owns versus what stays human.',
          es: 'Mapeamos sistemas, flujos de datos y puntos de aprobación. Definimos qué posee la automatización y qué sigue siendo humano.',
        },
      },
      {
        title: { en: '2. Build & connect', es: '2. Construir y conectar' },
        body: {
          en: 'Wire AI tools into ERP, CRM, and related systems with logging and rollback paths.',
          es: 'Conectamos herramientas de IA a ERP, CRM y sistemas relacionados con registro y rutas de reversión.',
        },
      },
      {
        title: { en: '3. Tune in production', es: '3. Afinar en producción' },
        body: {
          en: 'Monitor outcomes, fix edge cases, and refine prompts or workflows as usage grows.',
          es: 'Monitoreamos resultados, corregimos casos límite y afinamos prompts o flujos conforme crece el uso.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Which systems can you connect?',
          es: '¿Qué sistemas pueden conectar?',
        },
        answer: {
          en: 'We connect AI tools to ERP, CRM, and your existing stack as part of systems integration.',
          es: 'Conectamos herramientas de IA con ERP, CRM y tu stack tecnológico actual como parte de la integración de sistemas.',
        },
      },
      {
        question: {
          en: 'Do you support the automation after launch?',
          es: '¿Dan soporte a la automatización después del lanzamiento?',
        },
        answer: {
          en: 'Yes. We include ongoing tuning so repetitive-work automations stay reliable as processes change.',
          es: 'Sí. Incluimos ajuste continuo para que las automatizaciones de lo repetitivo sigan fiables cuando cambian los procesos.',
        },
      },
      {
        question: {
          en: 'Is this the same as AI strategy consulting?',
          es: '¿Es lo mismo que la consultoría de estrategia de IA?',
        },
        answer: {
          en: 'No. Integration builds on a clear use case. If you still need prioritization, start with AI consulting and strategy.',
          es: 'No. La integración parte de un caso de uso claro. Si aún necesitas priorizar, empieza por consultoría y estrategia de IA.',
        },
      },
      {
        question: {
          en: 'What if our ERP or CRM is heavily customized?',
          es: '¿Y si nuestro ERP o CRM está muy personalizado?',
        },
        answer: {
          en: 'Custom fields and workflows are normal. We map them during design so automations respect your real process instead of a generic template.',
          es: 'Los campos y flujos a medida son normales. Los mapeamos en el diseño para que las automatizaciones respeten tu proceso real y no una plantilla genérica.',
        },
      },
    ],
  },

  'conversational-ai': {
    metaTitle: {
      en: 'Conversational AI in South Florida | Cybercon',
      es: 'IA conversacional en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Chatbots and AI voice systems for South Florida businesses: handle routine questions, escalate exceptions, and keep humans in the loop.',
      es: 'Chatbots y sistemas de voz con IA para empresas del sur de Florida que resuelven lo rutinario y dejan lo excepcional a personas.',
    },
    audience: {
      en: 'Support and front-office teams buried in repetitive questions. Fits South Florida businesses that want chat or voice AI without abandoning human help for hard cases. Especially helpful when call volume or chat volume is growing faster than headcount. When volume spikes seasonally, conversational AI absorbs the predictable layer so your South Florida staff is not drowning in the same ten questions. Clear ownership of answers and escalations keeps the experience consistent across seasons.',
      es: 'Equipos de soporte y recepción saturados de preguntas repetitivas. Encaja en empresas del sur de Florida que quieren chat o voz con IA sin abandonar la ayuda humana en casos difíciles. Especialmente útil cuando el volumen de llamadas o chat crece más rápido que la planta de personal. Cuando el volumen sube por temporada, la IA conversacional absorbe la capa predecible para que tu personal del sur de Florida no se ahogue con las mismas diez preguntas. Una propiedad clara de respuestas y escalados mantiene la experiencia consistente entre temporadas.',
    },
    overview: {
      en: 'We implement chatbots and AI voice systems that answer routine questions and escalate exceptions to people. The design goal is fewer repetitive tickets, faster answers for common issues, and clearer handoffs when a human should take over.\n\nContent and escalation rules stay under your control. We serve Cooper City, Davie, and greater South Florida organizations that need conversational AI aligned with real support workflows.',
      es: 'Implementamos chatbots y sistemas de voz con IA que responden lo rutinario y escalan excepciones a personas. El objetivo es menos tickets repetitivos, respuestas más rápidas a lo común y traspasos claros cuando debe intervenir un humano.\n\nEl contenido y las reglas de escalado siguen bajo tu control. Atendemos organizaciones de Cooper City, Davie y el sur de Florida que necesitan IA conversacional alineada con flujos de soporte reales.',
    },
    process: [
      {
        title: { en: '1. Intent & escalation map', es: '1. Mapa de intenciones y escalado' },
        body: {
          en: 'List frequent questions, define safe answers, and set rules for when humans must step in.',
          es: 'Listamos preguntas frecuentes, definimos respuestas seguras y reglas de cuándo debe entrar una persona.',
        },
      },
      {
        title: { en: '2. Build channels', es: '2. Construir canales' },
        body: {
          en: 'Stand up chat and/or voice experiences connected to your knowledge and support tools.',
          es: 'Levantamos experiencias de chat y/o voz conectadas a tu conocimiento y herramientas de soporte.',
        },
      },
      {
        title: { en: '3. Measure & refine', es: '3. Medir y refinar' },
        body: {
          en: 'Review containment, escalations, and gaps. Improve answers without hiding failures.',
          es: 'Revisamos contención, escalados y huecos. Mejoramos respuestas sin ocultar fallos.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Will this replace our support team?',
          es: '¿Esto reemplazará a nuestro equipo de soporte?',
        },
        answer: {
          en: 'No. Chatbots handle routine questions so human support can focus on exceptions.',
          es: 'No. Los chatbots resuelven lo rutinario para que el soporte humano se centre en las excepciones.',
        },
      },
      {
        question: {
          en: 'Do you offer voice as well as chat?',
          es: '¿Ofrecen voz además de chat?',
        },
        answer: {
          en: 'Yes. Conversational AI covers chatbots and AI voice systems.',
          es: 'Sí. La IA conversacional cubre chatbots y sistemas de voz con IA.',
        },
      },
      {
        question: {
          en: 'Can we control what the bot says?',
          es: '¿Podemos controlar lo que dice el bot?',
        },
        answer: {
          en: 'Yes. We design intents, approved answers, and escalation paths with your team.',
          es: 'Sí. Diseñamos intenciones, respuestas aprobadas y rutas de escalado con tu equipo.',
        },
      },
      {
        question: {
          en: 'Can the bot hand off to our existing help desk?',
          es: '¿El bot puede pasar a nuestra mesa de ayuda actual?',
        },
        answer: {
          en: 'Yes. We design escalations into your current support channels so people receive context instead of a cold restart.',
          es: 'Sí. Diseñamos escalados hacia tus canales de soporte actuales para que las personas reciban contexto en lugar de empezar de cero.',
        },
      },
    ],
  },

  'web-design-development': {
    metaTitle: {
      en: 'Web Design & Redesign in South Florida | Cybercon',
      es: 'Diseño y rediseño web en el Sur de Florida | Cybercon',
    },
    metaDescription: {
      en: 'Website design for South Florida — Essential $750, Growth from $1,150. You own domain and files. Free 60-second security snapshot.',
      es: 'Diseño web en el sur de Florida — Esencial $750, Crecimiento desde $1,150. El dominio y los archivos son tuyos. Instantánea de seguridad en 60 s.',
    },
    audience: {
      en: 'Businesses that need a credible web presence or a focused custom application, with ownership of domain, files, and hosting from day one. Aimed at South Florida organizations that care about accessibility, brand consistency, and secure operations. Choose this when your current site undersells the quality of your real-world service delivery. After launch you can run it yourself or have us host, monitor, and patch it.',
      es: 'Empresas que necesitan presencia web creíble o una aplicación a medida enfocada, con dominio, archivos y hosting a su nombre desde el primer día. Orientado a organizaciones del sur de Florida que cuidan accesibilidad, marca y operación segura. Elige esto cuando tu sitio actual vende por debajo de la calidad de tu servicio en la vida real. Después del lanzamiento lo puedes operar tú o nosotros lo alojamos, monitoreamos y parcheamos.',
    },
    overview: {
      en: 'We design and build accessible, on-brand sites and custom applications at published, fixed-scope prices. UX work focuses on clarity: visitors should understand what you offer and how to contact you without friction.\n\nYou own everything at launch. Run it yourself, or have us host and care for it. Projects commonly support Cooper City and Davie businesses that want a durable site, not a one-off brochure that ages poorly.',
      es: 'Diseñamos y construimos sitios accesibles y con tu marca, y aplicaciones a medida, a precios publicados de alcance fijo. El UX busca claridad: el visitante debe entender qué ofreces y cómo contactarte sin fricción.\n\nAl lanzar, todo es tuyo. Lo operas tú, o nosotros lo alojamos y cuidamos. Los proyectos suelen apoyar a empresas de Cooper City y Davie que quieren un sitio duradero, no un folleto que envejece mal.',
    },
    process: [
      {
        title: { en: 'Goals & structure', es: 'Objetivos y estructura' },
        body: {
          en: 'Clarify audience, offers, and information architecture so every page supports real conversations — and conversions.',
          es: 'Aclaramos audiencia, ofertas y arquitectura de información para que cada página apoye conversaciones reales — y conversiones.',
        },
      },
      {
        title: { en: 'Design & build', es: 'Diseño y construcción' },
        body: {
          en: 'An accessible, on-brand experience, implemented with secure hosting in mind from the first commit.',
          es: 'Una experiencia accesible y con tu marca, implementada pensando en hosting seguro desde el primer commit.',
        },
      },
      {
        title: { en: 'Launch & support', es: 'Lanzamiento y soporte' },
        body: {
          en: 'Ship, monitor, and stay available — content changes and security updates never stall.',
          es: 'Publicamos, monitoreamos y seguimos disponibles — los cambios de contenido y las actualizaciones de seguridad no se estancan.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'How much does website design or redesign cost?',
          es: '¿Cuánto cuesta el diseño o rediseño de un sitio web?',
        },
        answer: {
          en: 'Essential one-page sites are $750. Growth sites are $1,150 for five pages, or $1,500 for ten with dedicated service and location pages. Custom work — e-commerce, member portals, integrations, web apps, multi-language — is a written scoped quote: you approve the number before we build. Domain, files, and hosting are in your name from day one.',
          es: 'Los sitios de una página Esencial cuestan $750. Los de Crecimiento son $1,150 por cinco páginas, o $1,500 por diez con páginas dedicadas de servicios y ubicaciones. El trabajo a medida — comercio electrónico, portales de miembros, integraciones, aplicaciones web, multiidioma — es una cotización con alcance por escrito: apruebas el número antes de construir. Dominio, archivos y hosting quedan a tu nombre desde el primer día.',
        },
      },
      {
        question: {
          en: 'Do you only design marketing sites?',
          es: '¿Solo diseñan sitios de marketing?',
        },
        answer: {
          en: 'No. We build accessible, on-brand sites and custom applications. Hosting and ongoing care are optional after launch.',
          es: 'No. Construimos sitios accesibles y con tu marca, y aplicaciones a medida. El hosting y el cuidado continuo son opcionales después del lanzamiento.',
        },
      },
      {
        question: {
          en: 'Is accessibility part of the work?',
          es: '¿La accesibilidad forma parte del trabajo?',
        },
        answer: {
          en: 'Yes. Website design and UX emphasize accessible, on-brand experiences.',
          es: 'Sí. El diseño web y UX enfatizan experiencias accesibles y alineadas con tu marca.',
        },
      },
      {
        question: {
          en: 'Do you support the site after launch?',
          es: '¿Dan soporte al sitio después del lanzamiento?',
        },
        answer: {
          en: 'Yes. Run it yourself — no platform fee and no lock-in. Or have us host, monitor, patch, and update it on a monthly care plan, cancel anytime. Two revision rounds and a recorded walkthrough are included at handoff.',
          es: 'Sí. Lo operas tú — sin tarifa de plataforma ni atadura. O nosotros lo alojamos, monitoreamos, parcheamos y actualizamos en un plan mensual de cuidado; lo cancelas cuando quieras. Dos rondas de revisión y un recorrido grabado van en el traspaso.',
        },
      },
      {
        question: {
          en: 'Do you write the website copy too?',
          es: '¿También redactan el copy del sitio?',
        },
        answer: {
          en: 'We help structure pages and clarify messaging. Final claims stay yours — we will not invent offers or credentials you did not approve.',
          es: 'Ayudamos a estructurar páginas y aclarar el mensaje. Las afirmaciones finales son tuyas — no inventamos ofertas ni credenciales que no hayas aprobado.',
        },
      },
    ],
  },
};

export function getServiceDetails(slug: string): ServiceDetails | undefined {
  return serviceDetails[slug];
}
