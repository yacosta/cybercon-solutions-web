export type LocaleCopy = { en: string; es: string };

export type AiSecurityPageCopy = {
  metaTitle: LocaleCopy;
  metaDescription: LocaleCopy;
  breadcrumb: LocaleCopy;
  hero: {
    eyebrow: LocaleCopy;
    brand: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    cta: LocaleCopy;
    ctaSecondary: LocaleCopy;
    replyNote: LocaleCopy;
    imageAlt: LocaleCopy;
  };
  trust: {
    label: LocaleCopy;
    items: Array<{ value: LocaleCopy; label: LocaleCopy }>;
  };
  pitch: {
    label: LocaleCopy;
    title: LocaleCopy;
    body: LocaleCopy[];
  };
  covers: {
    label: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    pillars: Array<{
      title: LocaleCopy;
      body: LocaleCopy;
      items: LocaleCopy[];
    }>;
  };
  platform: {
    label: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    layers: Array<{
      id: string;
      name: LocaleCopy;
      summary: LocaleCopy;
      detail: LocaleCopy;
    }>;
  };
  ops: {
    label: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    steps: Array<{
      number: string;
      title: LocaleCopy;
      body: LocaleCopy;
    }>;
  };
  ready: {
    eyebrow: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    start: LocaleCopy;
    next: LocaleCopy;
    back: LocaleCopy;
    seeResult: LocaleCopy;
    progress: LocaleCopy;
    questions: Array<{
      id: string;
      prompt: LocaleCopy;
      options: Array<{ id: string; label: LocaleCopy; score: number }>;
    }>;
    results: {
      low: { title: LocaleCopy; body: LocaleCopy };
      mid: { title: LocaleCopy; body: LocaleCopy };
      high: { title: LocaleCopy; body: LocaleCopy };
    };
    scoreLabel: LocaleCopy;
    emailLabel: LocaleCopy;
    emailPlaceholder: LocaleCopy;
    nameLabel: LocaleCopy;
    namePlaceholder: LocaleCopy;
    companyLabel: LocaleCopy;
    companyPlaceholder: LocaleCopy;
    submit: LocaleCopy;
    disclosure: LocaleCopy;
    thanksTitle: LocaleCopy;
    thanksBody: LocaleCopy;
    restart: LocaleCopy;
    bookAssessment: LocaleCopy;
    error: LocaleCopy;
    turnstileError: LocaleCopy;
    requiredError: LocaleCopy;
  };
  faq: {
    label: LocaleCopy;
    items: Array<{ question: LocaleCopy; answer: LocaleCopy }>;
  };
  cta: {
    title: LocaleCopy;
    body: LocaleCopy;
    button: LocaleCopy;
    secondary: LocaleCopy;
  };
};

/** Editorial + interactive copy for /services/ai-security/ */
export const aiSecurityPage: AiSecurityPageCopy = {
  metaTitle: {
    en: 'AI Security in South Florida | Cybercon Solutions',
    es: 'Seguridad de IA en el Sur de Florida | Cybercon Solutions',
  },
  metaDescription: {
    en: 'Secure responsible AI use for Cooper City, Davie, and South Florida businesses. Governance, data-leakage controls, unified workspace protection, and a free AI security readiness check.',
    es: 'IA responsable y segura para empresas en Cooper City, Davie y el sur de Florida. Gobernanza, control de filtraciones, protección unificada del espacio de trabajo y una revisión gratuita de preparación en seguridad de IA.',
  },
  breadcrumb: {
    en: 'AI Security',
    es: 'Seguridad de IA',
  },
  hero: {
    eyebrow: {
      en: 'Cooper City, Davie & South Florida',
      es: 'Cooper City, Davie y el sur de Florida',
    },
    brand: {
      en: 'Cybercon Solutions',
      es: 'Cybercon Solutions',
    },
    title: {
      en: 'AI security without slowing the work down.',
      es: 'Seguridad de IA sin frenar el trabajo.',
    },
    lede: {
      en: 'Teams adopt copilots, chatbots, and browser AI faster than most security frameworks were built for. We put guardrails around that adoption — so innovation does not become your weakest link.',
      es: 'Los equipos adoptan copilots, chatbots e IA en el navegador más rápido de lo que contemplan la mayoría de los marcos de seguridad. Ponemos barandillas a esa adopción — para que la innovación no sea tu eslabón más débil.',
    },
    cta: {
      en: 'Book a free AI security review',
      es: 'Agenda una revisión gratuita de seguridad de IA',
    },
    ctaSecondary: {
      en: 'Run the free readiness check',
      es: 'Haz la revisión gratuita de preparación',
    },
    replyNote: {
      en: 'A real engineer replies within one business day',
      es: 'Un ingeniero real responde en un día hábil',
    },
    imageAlt: {
      en: 'Security analyst reviewing layered network defenses on dual monitors',
      es: 'Analista de seguridad revisando defensas de red en capas en dos monitores',
    },
  },
  trust: {
    label: {
      en: 'Built for businesses that cannot afford guesswork',
      es: 'Para empresas que no pueden permitirse adivinar',
    },
    items: [
      {
        value: { en: 'SOC-backed', es: 'Con SOC' },
        label: {
          en: '24/7 monitoring when alerts matter',
          es: 'Monitoreo 24/7 cuando las alertas importan',
        },
      },
      {
        value: { en: 'Per-user', es: 'Por usuario' },
        label: {
          en: 'Predictable pricing, not break/fix theater',
          es: 'Precio predecible, no teatro de averías',
        },
      },
      {
        value: { en: 'Local', es: 'Local' },
        label: {
          en: 'Cooper City, Davie & South Florida focus',
          es: 'Enfoque en Cooper City, Davie y el sur de Florida',
        },
      },
      {
        value: { en: 'HIPAA → GLBA', es: 'HIPAA → GLBA' },
        label: {
          en: 'Compliance mapped to how you actually operate',
          es: 'Cumplimiento alineado con cómo operas de verdad',
        },
      },
    ],
  },
  pitch: {
    label: {
      en: 'Why AI security now',
      es: 'Por qué seguridad de IA ahora',
    },
    title: {
      en: 'AI tools are inside your identity, email, and data paths every day.',
      es: 'Las herramientas de IA ya están en tu identidad, correo y datos todos los días.',
    },
    body: [
      {
        en: 'Employees paste customer records into public models. Vendors ship copilots into browsers and SaaS apps. Extensions and automations touch finance, EHR, and CRM systems without a clear owner.',
        es: 'Los empleados pegan datos de clientes en modelos públicos. Los proveedores meten copilots en navegadores y apps SaaS. Extensiones y automatizaciones tocan finanzas, EHR y CRM sin un dueño claro.',
      },
      {
        en: 'Traditional cybersecurity still matters — endpoints, identity, email — but it was not designed to answer “which AI tools are allowed, with which data, and who can prove it.” That gap is where IP leaks, insurance friction, and quiet compliance failures start.',
        es: 'La ciberseguridad tradicional sigue importando — endpoints, identidad, correo — pero no fue diseñada para responder “qué herramientas de IA están permitidas, con qué datos y quién puede demostrarlo.” Esa brecha es donde empiezan las filtraciones de IP, la fricción con seguros y los fallos silenciosos de cumplimiento.',
      },
    ],
  },
  covers: {
    label: {
      en: 'What AI security actually covers',
      es: 'Qué cubre de verdad la seguridad de IA',
    },
    title: {
      en: 'Risk ownership — not buzzwords.',
      es: 'Dueños del riesgo — no eslóganes.',
    },
    lede: {
      en: 'For Cooper City and Davie organizations adopting AI without exposing intellectual property, sensitive data, or compliance gaps.',
      es: 'Para organizaciones en Cooper City y Davie que adoptan IA sin exponer propiedad intelectual, datos sensibles o brechas de cumplimiento.',
    },
    pillars: [
      {
        title: { en: 'AI usage governance', es: 'Gobernanza del uso de IA' },
        body: {
          en: 'Clear, enforceable policies so leadership knows what is approved — and what is not.',
          es: 'Políticas claras y aplicables para que la dirección sepa qué está aprobado — y qué no.',
        },
        items: [
          { en: 'Approved vs restricted AI tools', es: 'Herramientas de IA aprobadas vs restringidas' },
          { en: 'Data types that can (and cannot) enter AI workflows', es: 'Tipos de datos que pueden (y no pueden) entrar en flujos de IA' },
          { en: 'Employee accountability and auditability', es: 'Responsabilidad del personal y auditabilidad' },
        ],
      },
      {
        title: { en: 'Data leakage & AI exposure control', es: 'Control de filtraciones y exposición a la IA' },
        body: {
          en: 'Keep sensitive data out of public models and unvetted copilots.',
          es: 'Mantén los datos sensibles fuera de modelos públicos y copilots no evaluados.',
        },
        items: [
          { en: 'Prevent sensitive data from entering public AI models', es: 'Evitar que datos sensibles entren en modelos de IA públicos' },
          { en: 'Secure browser extensions and AI copilots', es: 'Asegurar extensiones del navegador y copilots de IA' },
          { en: 'Monitor AI-enabled workflows for unintended exposure', es: 'Monitorear flujos con IA ante exposición no intencionada' },
        ],
      },
      {
        title: { en: 'Continuous oversight & incident readiness', es: 'Supervisión continua y preparación ante incidentes' },
        body: {
          en: 'Visibility when something looks wrong — and a plan when AI misuse or exposure occurs.',
          es: 'Visibilidad cuando algo falla — y un plan si hay mal uso o exposición por IA.',
        },
        items: [
          { en: 'Ongoing monitoring of AI-related risks', es: 'Monitoreo continuo de riesgos relacionados con IA' },
          { en: 'Rapid response planning for AI misuse or exposure', es: 'Plan de respuesta rápida ante mal uso o exposición por IA' },
          { en: 'Alignment with cyber insurance and regulatory expectations', es: 'Alineación con seguros cibernéticos y expectativas regulatorias' },
        ],
      },
    ],
  },
  platform: {
    label: {
      en: 'Unified workspace security',
      es: 'Seguridad unificada del espacio de trabajo',
    },
    title: {
      en: 'Attackers do not think in silos. Neither should your stack.',
      es: 'Los atacantes no piensan en silos. Tu stack tampoco debería.',
    },
    lede: {
      en: 'Identity, email, endpoints, web, awareness, and data sit on one operating model — so signals correlate, priorities stay clear, and your team can act before risk spreads. Select a control layer to see how Cybercon covers it.',
      es: 'Identidad, correo, endpoints, web, concienciación y datos en un mismo modelo operativo — para correlacionar señales, priorizar con claridad y actuar antes de que el riesgo se propague. Elige una capa de control para ver cómo la cubre Cybercon.',
    },
    layers: [
      {
        id: 'identity',
        name: { en: 'Identity', es: 'Identidad' },
        summary: {
          en: 'ITDR-minded access, MFA, and least privilege across Microsoft 365 / Google Workspace.',
          es: 'Acceso con mentalidad ITDR, MFA y mínimo privilegio en Microsoft 365 / Google Workspace.',
        },
        detail: {
          en: 'We harden identity providers, review privileged roles, and watch for anomalous sign-ins — including AI apps that request broad OAuth scopes. Compromised identity is still the shortest path into copilots and SaaS data.',
          es: 'Endurecemos proveedores de identidad, revisamos roles privilegiados y vigilamos inicios anómalos — incluidas apps de IA que piden scopes OAuth amplios. La identidad comprometida sigue siendo el camino más corto a copilots y datos SaaS.',
        },
      },
      {
        id: 'email',
        name: { en: 'Email', es: 'Correo' },
        summary: {
          en: 'Phishing defense and mailbox hygiene where AI-assisted attacks show up first.',
          es: 'Defensa ante phishing e higiene del buzón, donde aparecen primero los ataques asistidos por IA.',
        },
        detail: {
          en: 'AI makes phishing copy and deepfake voice notes cheaper. We layer filtering, reporting workflows, and awareness so suspicious mail is caught early — and mailbox rules that forward data to personal AI tools get reviewed.',
          es: 'La IA abarata el copy de phishing y las notas de voz deepfake. Apilamos filtrado, flujos de reporte y concienciación para atrapar correo sospechoso a tiempo — y revisamos reglas de buzón que reenvían datos a herramientas de IA personales.',
        },
      },
      {
        id: 'endpoint',
        name: { en: 'Endpoints', es: 'Endpoints' },
        summary: {
          en: 'EDR/XDR with patching so AI desktop agents cannot silently expand the blast radius.',
          es: 'EDR/XDR con parches para que agentes de IA en el escritorio no amplíen el radio de impacto en silencio.',
        },
        detail: {
          en: 'Local AI helpers, browser extensions, and unmanaged devices all increase endpoint risk. We deploy and tune endpoint protection, keep systems patched, and flag software that phones home with company context.',
          es: 'Ayudantes locales de IA, extensiones y dispositivos no gestionados elevan el riesgo en el endpoint. Desplegamos y afinamos protección, mantenemos parches al día y detectamos software que envía contexto de la empresa hacia fuera.',
        },
      },
      {
        id: 'data',
        name: { en: 'Data & AI', es: 'Datos e IA' },
        summary: {
          en: 'Guardrails for what may enter public models, copilots, and automations.',
          es: 'Barandillas sobre qué puede entrar en modelos públicos, copilots y automatizaciones.',
        },
        detail: {
          en: 'Policies alone do not stop paste-into-ChatGPT. We classify sensitive data types, restrict high-risk tools, and monitor workflows where AI touches customer, patient, or financial records.',
          es: 'Las políticas solas no detienen el “pegar en ChatGPT”. Clasificamos tipos de datos sensibles, restringimos herramientas de alto riesgo y monitoreamos flujos donde la IA toca registros de clientes, pacientes o finanzas.',
        },
      },
      {
        id: 'awareness',
        name: { en: 'Awareness', es: 'Concienciación' },
        summary: {
          en: 'Training that covers AI misuse — not only classic phishing.',
          es: 'Formación que cubre el mal uso de la IA — no solo el phishing clásico.',
        },
        detail: {
          en: 'People adopt tools that make work faster. We teach what is safe to share with AI, how to report shadow AI, and how deepfake or prompt-injection tricks show up in day-to-day roles.',
          es: 'La gente adopta lo que acelera el trabajo. Enseñamos qué es seguro compartir con IA, cómo reportar IA en la sombra y cómo aparecen deepfakes o inyecciones de prompts en el día a día.',
        },
      },
      {
        id: 'exposure',
        name: { en: 'Exposure', es: 'Exposición' },
        summary: {
          en: 'Breach posture, attack surface, and credentials already in the wild.',
          es: 'Postura ante filtraciones, superficie de ataque y credenciales ya en circulación.',
        },
        detail: {
          en: 'Start with what is already exposed. Free breach checks for work emails, plus ongoing review of public assets and leaked credentials that attackers reuse against AI-enabled accounts.',
          es: 'Empieza por lo ya expuesto. Revisiones gratuitas de filtraciones para correos de trabajo, más revisión continua de activos públicos y credenciales filtradas que los atacantes reutilizan contra cuentas con IA.',
        },
      },
      {
        id: 'mdr',
        name: { en: 'Agentic MDR', es: 'MDR agentico' },
        summary: {
          en: 'Correlate signals, prioritize, and respond — with humans in the loop.',
          es: 'Correlacionar señales, priorizar y responder — con humanos en el circuito.',
        },
        detail: {
          en: 'Noise is the enemy of small security teams. We correlate identity, email, endpoint, and exposure signals so your engineers see what matters, act faster, and document the value behind each action for leadership and insurers.',
          es: 'El ruido es el enemigo de los equipos pequeños de seguridad. Correlacionamos señales de identidad, correo, endpoint y exposición para que tus ingenieros vean lo que importa, actúen más rápido y documenten el valor de cada acción para dirección y aseguradoras.',
        },
      },
    ],
  },
  ops: {
    label: {
      en: 'Security operations, modernized',
      es: 'Operaciones de seguridad, modernizadas',
    },
    title: {
      en: 'Deploy. Detect. Prove the value.',
      es: 'Desplegar. Detectar. Demostrar el valor.',
    },
    lede: {
      en: 'Unified-platform clarity for MSP-backed South Florida teams: the right controls, automated detection where it helps, and reporting clients and boards can understand.',
      es: 'Claridad de plataforma unificada para equipos del sur de Florida respaldados por MSP: los controles correctos, detección automatizada donde ayuda e informes que clientes y juntas entienden.',
    },
    steps: [
      {
        number: '01',
        title: {
          en: 'Deploy the right security controls',
          es: 'Desplegar los controles correctos',
        },
        body: {
          en: 'Bring identity, endpoint, email, data, awareness, and exposure protection together under one operating rhythm — sized for how your Cooper City or Davie team actually works.',
          es: 'Unimos identidad, endpoint, correo, datos, concienciación y exposición en un mismo ritmo operativo — dimensionado a cómo trabaja de verdad tu equipo en Cooper City o Davie.',
        },
      },
      {
        number: '02',
        title: {
          en: 'Automated detection and response',
          es: 'Detección y respuesta automatizadas',
        },
        body: {
          en: 'Correlate related activity across environments, prioritize before risk spreads, and keep humans in the loop for decisions that need judgment — not ticket theater.',
          es: 'Correlacionamos actividad relacionada entre entornos, priorizamos antes de que el riesgo se propague y mantenemos humanos en el circuito para decisiones que requieren criterio — no teatro de tickets.',
        },
      },
      {
        number: '03',
        title: {
          en: 'Make security visible and valuable',
          es: 'Hacer la seguridad visible y valiosa',
        },
        body: {
          en: 'Turn posture gains, compliance progress, and threat remediation into plain-English insights leadership, auditors, and cyber insurers can use.',
          es: 'Convertimos mejoras de postura, avance de cumplimiento y remediación de amenazas en insights en lenguaje claro para dirección, auditores y aseguradoras cibernéticas.',
        },
      },
    ],
  },
  ready: {
    eyebrow: {
      en: 'Free interactive check · ~2 minutes',
      es: 'Revisión interactiva gratuita · ~2 minutos',
    },
    title: {
      en: 'How ready is your AI security posture?',
      es: '¿Qué tan lista está tu postura de seguridad de IA?',
    },
    lede: {
      en: 'Answer five practical questions. Get a scored snapshot, then leave a work email if you want a follow-up from a Cybercon engineer — no obligation.',
      es: 'Responde cinco preguntas prácticas. Obtén una instantánea con puntuación y, si quieres, deja un correo de trabajo para que un ingeniero de Cybercon te contacte — sin compromiso.',
    },
    start: { en: 'Start the readiness check', es: 'Empezar la revisión de preparación' },
    next: { en: 'Next question', es: 'Siguiente pregunta' },
    back: { en: 'Previous question', es: 'Pregunta anterior' },
    seeResult: { en: 'See my result', es: 'Ver mi resultado' },
    progress: { en: 'Question {current} of {total}', es: 'Pregunta {current} de {total}' },
    questions: [
      {
        id: 'policy',
        prompt: {
          en: 'Do you have a written policy for which AI tools employees may use with company data?',
          es: '¿Tienes una política escrita sobre qué herramientas de IA pueden usar los empleados con datos de la empresa?',
        },
        options: [
          { id: 'yes', label: { en: 'Yes — documented and communicated', es: 'Sí — documentada y comunicada' }, score: 2 },
          { id: 'partial', label: { en: 'Informal guidance only', es: 'Solo orientación informal' }, score: 1 },
          { id: 'no', label: { en: 'No policy yet', es: 'Aún no hay política' }, score: 0 },
        ],
      },
      {
        id: 'shadow',
        prompt: {
          en: 'How visible is “shadow AI” (personal ChatGPT, browser extensions, unapproved copilots) in your organization?',
          es: '¿Qué tan visible es la “IA en la sombra” (ChatGPT personal, extensiones, copilots no aprobados) en tu organización?',
        },
        options: [
          { id: 'tracked', label: { en: 'We inventory and review AI tools', es: 'Inventariamos y revisamos herramientas de IA' }, score: 2 },
          { id: 'some', label: { en: 'We know some of it happens', es: 'Sabemos que ocurre en parte' }, score: 1 },
          { id: 'blind', label: { en: 'We have little to no visibility', es: 'Tenemos poca o ninguna visibilidad' }, score: 0 },
        ],
      },
      {
        id: 'sensitive',
        prompt: {
          en: 'Are customer, patient, financial, or IP data blocked from public AI models?',
          es: '¿Están bloqueados los datos de clientes, pacientes, finanzas o PI en modelos de IA públicos?',
        },
        options: [
          { id: 'controls', label: { en: 'Technical and policy controls in place', es: 'Controles técnicos y de política en marcha' }, score: 2 },
          { id: 'policy', label: { en: 'Policy only — limited enforcement', es: 'Solo política — poco cumplimiento' }, score: 1 },
          { id: 'none', label: { en: 'Not controlled today', es: 'Hoy no está controlado' }, score: 0 },
        ],
      },
      {
        id: 'stack',
        prompt: {
          en: 'Are identity, email, and endpoint signals correlated when something looks wrong?',
          es: '¿Se correlacionan las señales de identidad, correo y endpoint cuando algo falla?',
        },
        options: [
          { id: 'unified', label: { en: 'Yes — shared monitoring / response', es: 'Sí — monitoreo / respuesta compartidos' }, score: 2 },
          { id: 'silos', label: { en: 'Separate tools, manual correlation', es: 'Herramientas separadas, correlación manual' }, score: 1 },
          { id: 'gaps', label: { en: 'Major visibility gaps', es: 'Brechas importantes de visibilidad' }, score: 0 },
        ],
      },
      {
        id: 'incident',
        prompt: {
          en: 'If an employee leaked sensitive data into a public AI tool tomorrow, do you have a response plan?',
          es: 'Si mañana un empleado filtrara datos sensibles a una herramienta de IA pública, ¿tienes un plan de respuesta?',
        },
        options: [
          { id: 'ready', label: { en: 'Yes — playbook and owners defined', es: 'Sí — playbook y responsables definidos' }, score: 2 },
          { id: 'partial', label: { en: 'We would improvise from general IR', es: 'Improvisaríamos desde IR general' }, score: 1 },
          { id: 'none', label: { en: 'No AI-specific plan', es: 'Sin plan específico para IA' }, score: 0 },
        ],
      },
    ],
    results: {
      low: {
        title: {
          en: 'AI adoption is outrunning your guardrails.',
          es: 'La adopción de IA va por delante de tus barandillas.',
        },
        body: {
          en: 'You are not alone — most South Florida SMBs land here first. Prioritize a written AI-use policy, a quick inventory of tools in use, and exposure checks on work emails while we map identity and data controls.',
          es: 'No estás solo — la mayoría de las pymes del sur de Florida empiezan aquí. Prioriza una política escrita de uso de IA, un inventario rápido de herramientas y revisiones de exposición en correos de trabajo mientras mapeamos identidad y controles de datos.',
        },
      },
      mid: {
        title: {
          en: 'Solid instincts — uneven enforcement.',
          es: 'Buenos instintos — cumplimiento desigual.',
        },
        body: {
          en: 'You have pieces of the puzzle. The next step is correlating identity, email, and endpoint signals and closing the gap between policy and technical controls on public AI tools.',
          es: 'Tienes piezas del rompecabezas. El siguiente paso es correlacionar señales de identidad, correo y endpoint y cerrar la brecha entre política y controles técnicos sobre herramientas de IA públicas.',
        },
      },
      high: {
        title: {
          en: 'Strong foundation — keep proving it.',
          es: 'Base sólida — sigue demostrándolo.',
        },
        body: {
          en: 'You are ahead of most peers. Focus on continuous oversight, insurance-ready documentation, and making AI-related controls visible to leadership without slowing teams down.',
          es: 'Vas por delante de la mayoría. Enfócate en supervisión continua, documentación lista para seguros y hacer visibles los controles de IA a la dirección sin frenar a los equipos.',
        },
      },
    },
    scoreLabel: { en: 'Readiness score', es: 'Puntuación de preparación' },
    emailLabel: { en: 'Work email', es: 'Correo de trabajo' },
    emailPlaceholder: { en: 'you@company.com', es: 'tu@empresa.com' },
    nameLabel: { en: 'Name', es: 'Nombre' },
    namePlaceholder: { en: 'Enter your name', es: 'Introduce tu nombre' },
    companyLabel: { en: 'Company', es: 'Empresa' },
    companyPlaceholder: { en: 'Enter your company', es: 'Introduce tu empresa' },
    submit: {
      en: 'Send my result to Cybercon',
      es: 'Enviar mi resultado a Cybercon',
    },
    disclosure: {
      en: 'We use this only to follow up on your AI security readiness check. A real engineer replies within one business day.',
      es: 'Lo usamos solo para dar seguimiento a tu revisión de preparación en seguridad de IA. Un ingeniero real responde en un día hábil.',
    },
    thanksTitle: {
      en: 'Thanks — we have your readiness snapshot.',
      es: 'Gracias — ya tenemos tu instantánea de preparación.',
    },
    thanksBody: {
      en: 'We will follow up within one business day with clear next steps. No sales pressure.',
      es: 'Te contactaremos en un día hábil con pasos claros. Sin presión comercial.',
    },
    restart: { en: 'Retake the check', es: 'Repetir la revisión' },
    bookAssessment: {
      en: 'Book a deeper AI security review',
      es: 'Agenda una revisión más profunda de seguridad de IA',
    },
    error: {
      en: 'Something went wrong. Please try again.',
      es: 'Algo salió mal. Inténtalo de nuevo.',
    },
    turnstileError: {
      en: 'Please complete the verification check.',
      es: 'Completa la verificación.',
    },
    requiredError: {
      en: 'Please complete all fields.',
      es: 'Completa todos los campos.',
    },
  },
  faq: {
    label: { en: 'Frequently asked questions', es: 'Preguntas frecuentes' },
    items: [
      {
        question: {
          en: 'Do we need AI security if we already have cybersecurity tools?',
          es: '¿Necesitamos seguridad de IA si ya tenemos herramientas de ciberseguridad?',
        },
        answer: {
          en: 'Yes. Traditional tools protect endpoints, identity, and email — but they do not fully account for how AI tools access, process, and expose data, or which models employees are allowed to use.',
          es: 'Sí. Las herramientas tradicionales protegen endpoints, identidad y correo — pero no contemplan del todo cómo las herramientas de IA acceden, procesan y exponen datos, ni qué modelos pueden usar los empleados.',
        },
      },
      {
        question: {
          en: 'Is AI security only for large enterprises?',
          es: '¿La seguridad de IA es solo para grandes empresas?',
        },
        answer: {
          en: 'No. Growing South Florida businesses often face more risk because AI tools are adopted informally — without governance, inventory, or incident playbooks.',
          es: 'No. Las empresas en crecimiento del sur de Florida suelen enfrentar más riesgo porque las herramientas de IA se adoptan de forma informal — sin gobernanza, inventario ni playbooks de incidentes.',
        },
      },
      {
        question: {
          en: 'Can AI security slow down innovation?',
          es: '¿La seguridad de IA puede frenar la innovación?',
        },
        answer: {
          en: 'When done right, it accelerates adoption by removing uncertainty. Clear approved tools and data rules let teams move faster without guessing what will upset compliance or insurers.',
          es: 'Bien hecha, acelera la adopción al quitar incertidumbre. Herramientas aprobadas y reglas de datos claras permiten avanzar más rápido sin adivinar qué molestará a cumplimiento o aseguradoras.',
        },
      },
      {
        question: {
          en: 'How is this different from your Cybersecurity & Compliance service?',
          es: '¿En qué se diferencia de Ciberseguridad y Cumplimiento?',
        },
        answer: {
          en: 'Cybersecurity & Compliance is the broader SOC, EDR, and framework foundation. AI Security layers governance, leakage controls, and oversight specifically for copilots, public models, and AI-enabled workflows — on top of that stack.',
          es: 'Ciberseguridad y Cumplimiento es la base más amplia de SOC, EDR y marcos. Seguridad de IA añade gobernanza, control de filtraciones y supervisión específicamente para copilots, modelos públicos y flujos con IA — encima de ese stack.',
        },
      },
      {
        question: {
          en: 'What does the free readiness check do with my answers?',
          es: '¿Qué hace la revisión gratuita de preparación con mis respuestas?',
        },
        answer: {
          en: 'Scoring happens in your browser. If you choose to share name, company, and work email, we store the score with your request so an engineer can follow up — same privacy standards as our assessment form.',
          es: 'La puntuación ocurre en tu navegador. Si eliges compartir nombre, empresa y correo de trabajo, guardamos la puntuación con tu solicitud para que un ingeniero pueda dar seguimiento — mismos estándares de privacidad que el formulario de evaluación.',
        },
      },
    ],
  },
  cta: {
    title: {
      en: 'Ready to leverage AI the safer way?',
      es: '¿Listo para aprovechar la IA de forma más segura?',
    },
    body: {
      en: 'Tell us how your team uses AI today. We will map governance gaps, exposure risk, and a practical control plan — plain English, within one business day.',
      es: 'Cuéntanos cómo usa IA tu equipo hoy. Mapearemos brechas de gobernanza, riesgo de exposición y un plan de control práctico — en lenguaje claro, en un día hábil.',
    },
    button: {
      en: 'Book a free AI security review',
      es: 'Agenda una revisión gratuita de seguridad de IA',
    },
    secondary: {
      en: 'Check a work email for breaches',
      es: 'Revisar filtraciones de un correo de trabajo',
    },
  },
};

export function pickLocale<T extends Record<'en' | 'es', string>>(copy: T, locale: 'en' | 'es'): string {
  return copy[locale];
}
