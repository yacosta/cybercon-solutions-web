export type LocaleText = { en: string; es: string };

export type Industry = {
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  metaTitle: LocaleText;
  metaDescription: LocaleText;
  lede: LocaleText;
  overview: LocaleText;
  challengesLabel: LocaleText;
  challenges: LocaleText[];
  helpLabel: LocaleText;
  help: { title: LocaleText; body: LocaleText }[];
  faqs: { question: LocaleText; answer: LocaleText }[];
};

export const industries: Industry[] = [
  {
    slug: 'healthcare-clinics',
    title: { en: 'Healthcare & clinics', es: 'Salud y clínicas' },
    summary: {
      en: 'HIPAA-aware environments for practices and care teams that need secure access, reliable systems, and clear incident handling.',
      es: 'Entornos conscientes de HIPAA para prácticas y equipos de atención que necesitan acceso seguro, sistemas fiables y respuesta clara ante incidentes.',
    },
    metaTitle: {
      en: 'Healthcare IT & HIPAA Support | Cybercon Solutions',
      es: 'TI para salud y HIPAA | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Managed IT and cybersecurity for South Florida clinics and healthcare practices — secure access, HIPAA-aware controls, and clear incident handling.',
      es: 'TI administrada y ciberseguridad para clínicas y prácticas de salud en el Sur de Florida — acceso seguro, controles conscientes de HIPAA y respuesta clara ante incidentes.',
    },
    lede: {
      en: 'Care teams should not have to be the IT department. We keep clinical systems available, access controlled, and incidents handled with a clear owner.',
      es: 'Los equipos clínicos no deberían ser el departamento de TI. Mantenemos los sistemas disponibles, el acceso controlado y los incidentes con un responsable claro.',
    },
    overview: {
      en: 'Cooper City and Davie practices run on shared charts, imaging, billing, and remote access — all under HIPAA expectations. We treat security as the baseline: monitoring, patching, backups, and identity done in a way your staff can actually live with. When something breaks, an engineer answers — not a ticket that sits until Monday.',
      es: 'Las prácticas de Cooper City y Davie dependen de historias clínicas, imagenología, facturación y acceso remoto — todo bajo expectativas de HIPAA. Tratamos la seguridad como la base: monitoreo, parches, respaldos e identidad de forma que el personal pueda vivir. Cuando algo falla, responde un ingeniero — no un ticket que espera hasta el lunes.',
    },
    challengesLabel: { en: 'What clinics feel every week', es: 'Lo que las clínicas sienten cada semana' },
    challenges: [
      {
        en: 'Shared workstations and shared passwords that create audit and privacy risk.',
        es: 'Equipos compartidos y contraseñas compartidas que crean riesgo de auditoría y privacidad.',
      },
      {
        en: 'Slow systems at the front desk while patients are waiting.',
        es: 'Sistemas lentos en recepción mientras los pacientes esperan.',
      },
      {
        en: 'Unclear ownership when the EHR vendor, ISP, and “the IT person” all point at each other.',
        es: 'Responsabilidad poco clara cuando el proveedor de EHR, el ISP y “el de TI” se señalan entre sí.',
      },
      {
        en: 'Backups that exist on paper but have never been restored.',
        es: 'Respaldos que existen en el papel pero nunca se han restaurado.',
      },
    ],
    helpLabel: { en: 'How we help healthcare teams', es: 'Cómo ayudamos a equipos de salud' },
    help: [
      {
        title: { en: 'Secure access that fits the floor', es: 'Acceso seguro que encaja en la planta' },
        body: {
          en: 'Identity, MFA, and remote access set up for providers and staff who move between rooms, sites, and home.',
          es: 'Identidad, MFA y acceso remoto configurados para proveedores y personal que se mueven entre salas, sedes y casa.',
        },
      },
      {
        title: { en: 'HIPAA-aware operations', es: 'Operación consciente de HIPAA' },
        body: {
          en: 'Monitoring, patching, logging, and incident handling with documentation you can show when asked.',
          es: 'Monitoreo, parches, registros y manejo de incidentes con documentación que puedes mostrar cuando te la piden.',
        },
      },
      {
        title: { en: 'Recovery you can trust', es: 'Recuperación en la que puedes confiar' },
        body: {
          en: 'Backups and restore tests so an outage or ransomware event does not erase a day of care.',
          es: 'Respaldos y pruebas de restauración para que una caída o ransomware no borre un día de atención.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you work with our EHR vendor?',
          es: '¿Trabajan con nuestro proveedor de EHR?',
        },
        answer: {
          en: 'Yes. We coordinate with EHR and imaging vendors on access, endpoints, and network issues so your clinic is not stuck in the middle.',
          es: 'Sí. Coordinamos con proveedores de EHR e imagenología en acceso, endpoints y red para que tu clínica no quede en medio.',
        },
      },
      {
        question: {
          en: 'Can you help with HIPAA technical safeguards?',
          es: '¿Pueden ayudar con salvaguardas técnicas de HIPAA?',
        },
        answer: {
          en: 'We implement and operate the technical controls clinics rely on — access control, encryption in transit where applicable, monitoring, and backup — and we document what we manage.',
          es: 'Implementamos y operamos los controles técnicos en los que las clínicas se apoyan — control de acceso, cifrado en tránsito cuando aplica, monitoreo y respaldo — y documentamos lo que gestionamos.',
        },
      },
    ],
  },
  {
    slug: 'legal-professional-services',
    title: { en: 'Legal & professional services', es: 'Legal y servicios profesionales' },
    summary: {
      en: 'Confidentiality-first IT for firms that bill for time — fast support, secure remote access, and tools that stay out of the way.',
      es: 'TI centrada en la confidencialidad para firmas que facturan por tiempo: soporte rápido, acceso remoto seguro y herramientas que no estorban.',
    },
    metaTitle: {
      en: 'IT for Law Firms & Professional Services | Cybercon',
      es: 'TI para bufetes y servicios profesionales | Cybercon',
    },
    metaDescription: {
      en: 'Secure, reliable IT for South Florida law firms and professional services — confidentiality, uptime, and support that protects billable time.',
      es: 'TI segura y fiable para bufetes y servicios profesionales en el Sur de Florida — confidencialidad, disponibilidad y soporte que protege el tiempo facturable.',
    },
    lede: {
      en: 'Billable hours do not wait on a frozen laptop. We keep confidential work protected and systems responsive so your team stays on client work.',
      es: 'Las horas facturables no esperan a un portátil congelado. Protegemos el trabajo confidencial y mantenemos los sistemas responsivos para que el equipo se centre en el cliente.',
    },
    overview: {
      en: 'Law firms and professional practices live on documents, email, and deadlines. Privilege and client trust leave little room for loose access or slow recovery. We run managed IT and security for South Florida firms that need confidentiality without friction — secure remote work, fast support, and clear ownership when something breaks mid-matter.',
      es: 'Los bufetes y prácticas profesionales viven de documentos, correo y plazos. El privilegio y la confianza del cliente dejan poco margen para acceso laxo o recuperación lenta. Operamos TI y seguridad para firmas del Sur de Florida que necesitan confidencialidad sin fricción — trabajo remoto seguro, soporte rápido y un dueño claro cuando algo falla a mitad de un asunto.',
    },
    challengesLabel: { en: 'Pressure points for firms', es: 'Puntos de presión para firmas' },
    challenges: [
      {
        en: 'Attorneys working from court, home, and client sites with uneven security.',
        es: 'Abogados trabajando desde el tribunal, casa y sedes de clientes con seguridad desigual.',
      },
      {
        en: 'Document systems that feel fragile when a laptop dies the day before a filing.',
        es: 'Sistemas de documentos frágiles cuando un portátil muere el día antes de una presentación.',
      },
      {
        en: 'Phishing aimed at wire instructions and client funds.',
        es: 'Phishing dirigido a instrucciones de transferencia y fondos de clientes.',
      },
      {
        en: 'Support that is “cheap” until it costs a billable afternoon.',
        es: 'Soporte “barato” hasta que cuesta una tarde facturable.',
      },
    ],
    helpLabel: { en: 'How we help professional firms', es: 'Cómo ayudamos a firmas profesionales' },
    help: [
      {
        title: { en: 'Confidentiality by default', es: 'Confidencialidad por defecto' },
        body: {
          en: 'Access controls, endpoint protection, and email security tuned for privileged and client-sensitive work.',
          es: 'Controles de acceso, protección de endpoints y seguridad de correo ajustados al trabajo privilegiado y sensible del cliente.',
        },
      },
      {
        title: { en: 'Support that respects billable time', es: 'Soporte que respeta el tiempo facturable' },
        body: {
          en: 'Live help desk and onsite response when a machine or matter cannot wait for a ticket queue.',
          es: 'Mesa de ayuda en vivo y respuesta en sitio cuando un equipo o un asunto no puede esperar en la cola de tickets.',
        },
      },
      {
        title: { en: 'Secure work from anywhere', es: 'Trabajo seguro desde cualquier lugar' },
        body: {
          en: 'Remote access and device standards so court days and hybrid schedules do not invent a second IT environment.',
          es: 'Acceso remoto y estándares de dispositivos para que los días de tribunal y los horarios híbridos no inventen un segundo entorno de TI.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you support legal practice management software?',
          es: '¿Dan soporte a software de gestión de despachos?',
        },
        answer: {
          en: 'We support the endpoints, identity, and network your practice tools run on, and we coordinate with your software vendors when an issue sits between systems.',
          es: 'Soportamos los endpoints, la identidad y la red en los que corren tus herramientas, y coordinamos con tus proveedores de software cuando el problema está entre sistemas.',
        },
      },
      {
        question: {
          en: 'How fast can you respond during a filing deadline?',
          es: '¿Qué tan rápido responden en un plazo de presentación?',
        },
        answer: {
          en: 'Managed clients get live phone support. We treat deadline-blocking outages as priority work and escalate to an engineer who can act, not just log a ticket.',
          es: 'Los clientes gestionados tienen soporte telefónico en vivo. Tratamos las caídas que bloquean plazos como prioridad y escalamos a un ingeniero que puede actuar, no solo registrar un ticket.',
        },
      },
    ],
  },
  {
    slug: 'financial-services-insurance',
    title: { en: 'Financial services & insurance', es: 'Servicios financieros y seguros' },
    summary: {
      en: 'Controls and monitoring that match client trust and audit expectations, without slowing day-to-day operations.',
      es: 'Controles y monitoreo a la altura de la confianza del cliente y las auditorías, sin frenar el día a día.',
    },
    metaTitle: {
      en: 'IT for Financial Services & Insurance | Cybercon',
      es: 'TI para servicios financieros y seguros | Cybercon',
    },
    metaDescription: {
      en: 'Managed IT and cybersecurity for South Florida financial and insurance firms — audit-ready controls, monitoring, and uptime clients expect.',
      es: 'TI administrada y ciberseguridad para firmas financieras y de seguros en el Sur de Florida — controles listos para auditoría, monitoreo y disponibilidad que esperan los clientes.',
    },
    lede: {
      en: 'Client confidence is earned in every login and every restore. We build IT that holds up to scrutiny without making your team fight the tools.',
      es: 'La confianza del cliente se gana en cada inicio de sesión y cada restauración. Construimos TI que resiste el escrutinio sin hacer pelear al equipo con las herramientas.',
    },
    overview: {
      en: 'Financial and insurance teams handle money, PII, and regulated workflows. Downtime and weak controls are not abstract risks — they are client and exam problems. Cybercon runs proactive IT and security for South Florida firms that need monitoring, identity, backup, and documentation that stay ready when auditors or customers ask hard questions.',
      es: 'Los equipos financieros y de seguros manejan dinero, PII y flujos regulados. La caída y los controles débiles no son riesgos abstractos — son problemas de cliente y de examen. Cybercon opera TI y seguridad proactiva para firmas del Sur de Florida que necesitan monitoreo, identidad, respaldo y documentación listos cuando auditores o clientes hacen preguntas difíciles.',
    },
    challengesLabel: { en: 'What we hear from finance teams', es: 'Lo que escuchamos de equipos financieros' },
    challenges: [
      {
        en: 'Exam and vendor questionnaires that expose thin documentation.',
        es: 'Cuestionarios de examen y proveedores que exponen documentación delgada.',
      },
      {
        en: 'Wire fraud and business-email compromise aimed at finance staff.',
        es: 'Fraude de transferencias y compromiso de correo empresarial dirigido al personal financiero.',
      },
      {
        en: 'Legacy servers and line-of-business apps that are hard to patch safely.',
        es: 'Servidores heredados y apps de negocio difíciles de parchear con seguridad.',
      },
      {
        en: '“We think we are backed up” with no recent restore proof.',
        es: '“Creemos que tenemos respaldo” sin prueba reciente de restauración.',
      },
    ],
    helpLabel: { en: 'How we help financial firms', es: 'Cómo ayudamos a firmas financieras' },
    help: [
      {
        title: { en: 'Controls that stay current', es: 'Controles que se mantienen al día' },
        body: {
          en: 'Identity, endpoint protection, logging, and patch discipline aligned to how examiners and clients expect you to operate.',
          es: 'Identidad, protección de endpoints, registros y disciplina de parches alineados a cómo examinadores y clientes esperan que operes.',
        },
      },
      {
        title: { en: 'Monitoring with a human response', es: 'Monitoreo con respuesta humana' },
        body: {
          en: 'Alerts that reach someone who can act — not a dashboard nobody checks after close of business.',
          es: 'Alertas que llegan a alguien que puede actuar — no un panel que nadie revisa después del cierre.',
        },
      },
      {
        title: { en: 'Recovery and continuity', es: 'Recuperación y continuidad' },
        body: {
          en: 'Backups, off-site copies, and restore validation so an outage does not become a client event.',
          es: 'Respaldos, copias fuera del sitio y validación de restauración para que una caída no se convierta en un evento de cliente.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can you help with GLBA / cybersecurity questionnaire responses?',
          es: '¿Pueden ayudar con respuestas a cuestionarios GLBA / de ciberseguridad?',
        },
        answer: {
          en: 'We document the controls we operate and help you answer technical questionnaire items accurately — without inventing a program you do not run.',
          es: 'Documentamos los controles que operamos y te ayudamos a responder con precisión los puntos técnicos — sin inventar un programa que no ejecutas.',
        },
      },
      {
        question: {
          en: 'Do you replace our compliance consultant?',
          es: '¿Reemplazan a nuestro consultor de cumplimiento?',
        },
        answer: {
          en: 'No. We operate the technology and evidence for technical controls. Legal and compliance policy ownership stays with you and your advisors.',
          es: 'No. Operamos la tecnología y la evidencia de controles técnicos. La política legal y de cumplimiento sigue siendo tuya y de tus asesores.',
        },
      },
    ],
  },
  {
    slug: 'education-nonprofits',
    title: { en: 'Education & nonprofits', es: 'Educación y organizaciones sin fines de lucro' },
    summary: {
      en: 'Practical IT for schools, foundations, churches, and community orgs — predictable cost, strong security, and staff who are not “the IT person.”',
      es: 'TI práctica para escuelas, fundaciones, iglesias y organizaciones comunitarias: costo predecible, seguridad fuerte y personal que no es “el de TI”.',
    },
    metaTitle: {
      en: 'IT for Schools, Churches & Nonprofits | Cybercon',
      es: 'TI para escuelas, iglesias y sin fines de lucro | Cybercon',
    },
    metaDescription: {
      en: 'Affordable, secure managed IT for South Florida schools, churches, foundations, and nonprofits — predictable pricing and support that fits mission work.',
      es: 'TI administrada asequible y segura para escuelas, iglesias, fundaciones y organizaciones sin fines de lucro en el Sur de Florida — precio predecible y soporte para el trabajo misional.',
    },
    lede: {
      en: 'Mission work should not depend on whoever happens to know passwords. We give schools, churches, and nonprofits IT that is steady, secure, and priced to plan around.',
      es: 'El trabajo misional no debería depender de quien sepa las contraseñas. Damos a escuelas, iglesias y organizaciones sin fines de lucro una TI estable, segura y con precio planificable.',
    },
    overview: {
      en: 'Education and nonprofit teams in Cooper City and Davie often stretch a small staff across fundraising, programs, and “also IT.” Budgets are real constraints. We provide managed IT and cybersecurity with clear per-user pricing, sensible security defaults, and patient support — so volunteers and staff can stay on the mission instead of chasing printers and phishing emails.',
      es: 'Los equipos educativos y sin fines de lucro en Cooper City y Davie suelen estirar un personal pequeño entre recaudación, programas y “también TI”. Los presupuestos son reales. Ofrecemos TI administrada y ciberseguridad con precio claro por usuario, seguridad sensata y soporte paciente — para que voluntarios y personal se queden en la misión en vez de perseguir impresoras y phishing.',
    },
    challengesLabel: { en: 'Common nonprofit & school gaps', es: 'Brechas comunes en escuelas y nonprofit' },
    challenges: [
      {
        en: 'Shared mailboxes and departed volunteers who still have access.',
        es: 'Buzones compartidos y voluntarios que se fueron y aún tienen acceso.',
      },
      {
        en: 'Grant or board pressure to “be more secure” without a budget for enterprise IT.',
        es: 'Presión de subvenciones o junta para “ser más seguros” sin presupuesto de TI empresarial.',
      },
      {
        en: 'Chromebooks, labs, and hybrid learning that outgrew ad-hoc support.',
        es: 'Chromebooks, laboratorios y aprendizaje híbrido que superaron el soporte improvisado.',
      },
      {
        en: 'Donor and student data sitting on personal machines.',
        es: 'Datos de donantes y estudiantes en equipos personales.',
      },
    ],
    helpLabel: { en: 'How we help mission-driven orgs', es: 'Cómo ayudamos a organizaciones con misión' },
    help: [
      {
        title: { en: 'Predictable monthly cost', es: 'Costo mensual predecible' },
        body: {
          en: 'Per-user packaging so boards and administrators can budget without surprise break/fix invoices.',
          es: 'Paquetes por usuario para que juntas y administradores presupuesten sin facturas sorpresa por fallas.',
        },
      },
      {
        title: { en: 'Security that small teams can run', es: 'Seguridad que equipos pequeños pueden operar' },
        body: {
          en: 'MFA, backups, patching, and email security that fit small teams — not a binder of controls nobody runs.',
          es: 'MFA, respaldos, parches y seguridad de correo que encajan en equipos pequeños — no una carpeta de controles que nadie ejecuta.',
        },
      },
      {
        title: { en: 'Patient support in everyday language', es: 'Soporte paciente y en lenguaje cotidiano' },
        body: {
          en: 'Help desk that works with staff and volunteers who did not sign up to be systems administrators.',
          es: 'Mesa de ayuda que trabaja con personal y voluntarios que no se metieron a ser administradores de sistemas.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you work with churches and small foundations?',
          es: '¿Trabajan con iglesias y fundaciones pequeñas?',
        },
        answer: {
          en: 'Yes. Many of our education and nonprofit clients are small teams. We size the engagement to your staff count and risk, not a Fortune-500 playbook.',
          es: 'Sí. Muchos de nuestros clientes educativos y sin fines de lucro son equipos pequeños. Dimensionamos el acompañamiento a tu personal y riesgo, no a un libro de tácticas Fortune 500.',
        },
      },
      {
        question: {
          en: 'Can you help migrate off a volunteer-run setup?',
          es: '¿Pueden ayudar a salir de un entorno llevado por voluntarios?',
        },
        answer: {
          en: 'That is a common starting point. We document what you have, stabilize the risky parts first, then move you to a maintainable standard.',
          es: 'Es un punto de partida común. Documentamos lo que tienes, estabilizamos primero lo riesgoso y luego te movemos a un estándar mantenible.',
        },
      },
    ],
  },
  {
    slug: 'construction-real-estate',
    title: { en: 'Construction & real estate', es: 'Construcción e inmobiliario' },
    summary: {
      en: 'Field-ready access, job-site coordination, and office systems that keep projects moving when crews and vendors are everywhere.',
      es: 'Acceso listo para campo, coordinación en obra y sistemas de oficina que mantienen los proyectos en marcha con equipos y proveedores en todas partes.',
    },
    metaTitle: {
      en: 'IT for Construction & Real Estate | Cybercon Solutions',
      es: 'TI para construcción e inmobiliario | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Managed IT for South Florida construction and real estate teams — field access, office uptime, and security that keeps projects moving.',
      es: 'TI administrada para equipos de construcción e inmobiliario en el Sur de Florida — acceso de campo, disponibilidad de oficina y seguridad que mantiene los proyectos en marcha.',
    },
    lede: {
      en: 'Job sites and closings do not pause for a VPN that will not connect. We keep field and office technology working as one operation.',
      es: 'Las obras y los cierres no se detienen por un VPN que no conecta. Mantenemos la tecnología de campo y oficina como una sola operación.',
    },
    overview: {
      en: 'Construction and real estate teams split time between trailers, sites, showings, and the office. Files, bids, drawings, and CRM tools have to work on cellular, Wi-Fi, and laptops that take a beating. We support South Florida builders, trades, brokers, and property teams with reliable access, endpoint protection, and support that understands dust, deadlines, and distributed crews.',
      es: 'Los equipos de construcción e inmobiliario dividen el tiempo entre trailers, obras, visitas y la oficina. Archivos, cotizaciones, planos y CRM tienen que funcionar con celular, Wi-Fi y portátiles que sufren. Apoyamos a constructores, oficios, brokers y equipos de propiedades en el Sur de Florida con acceso fiable, protección de endpoints y soporte que entiende polvo, plazos y cuadrillas distribuidas.',
    },
    challengesLabel: { en: 'Field + office friction', es: 'Fricción campo + oficina' },
    challenges: [
      {
        en: 'Project files scattered across USB drives, personal Dropbox, and someone’s truck laptop.',
        es: 'Archivos de proyecto repartidos en USB, Dropbox personal y el portátil de la camioneta de alguien.',
      },
      {
        en: 'Phishing against AP and wire payments on large draws.',
        es: 'Phishing contra cuentas por pagar y transferencias en desembolsos grandes.',
      },
      {
        en: 'Job-site Wi-Fi and printers that only “the one guy” can fix.',
        es: 'Wi-Fi e impresoras de obra que solo “el de siempre” puede arreglar.',
      },
      {
        en: 'New hires and subs who need access today, not after a two-week ticket.',
        es: 'Nuevas contrataciones y subcontratistas que necesitan acceso hoy, no después de un ticket de dos semanas.',
      },
    ],
    helpLabel: { en: 'How we help builders & brokers', es: 'Cómo ayudamos a constructores y brokers' },
    help: [
      {
        title: { en: 'One place for project files', es: 'Un lugar para archivos de proyecto' },
        body: {
          en: 'Cloud file and identity standards so crews pull the current drawing set — not last month’s email attachment.',
          es: 'Estándares de archivos en la nube e identidad para que las cuadrillas usen el plano actual — no el adjunto del mes pasado.',
        },
      },
      {
        title: { en: 'Field-ready devices', es: 'Dispositivos listos para campo' },
        body: {
          en: 'Laptops and mobiles managed with patching, encryption, and remote wipe when a device walks off a site.',
          es: 'Portátiles y móviles gestionados con parches, cifrado y borrado remoto cuando un dispositivo se pierde en obra.',
        },
      },
      {
        title: { en: 'Office + site connectivity', es: 'Conectividad oficina + obra' },
        body: {
          en: 'Help with networks, VoIP, and vendor coordination so trailers and offices stay online when weather and schedules do not wait.',
          es: 'Ayuda con redes, VoIP y coordinación de proveedores para que trailers y oficinas sigan en línea cuando el clima y los plazos no esperan.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can you support multiple job sites?',
          es: '¿Pueden soportar múltiples obras?',
        },
        answer: {
          en: 'Yes. We design access and support for distributed crews — office standards first, then site connectivity and devices as projects ramp.',
          es: 'Sí. Diseñamos acceso y soporte para cuadrillas distribuidas — primero estándares de oficina, luego conectividad y dispositivos conforme suben los proyectos.',
        },
      },
      {
        question: {
          en: 'Do you help with office moves and buildouts?',
          es: '¿Ayudan con mudanzas y acondicionamientos de oficina?',
        },
        answer: {
          en: 'Yes — cabling, connectivity, and cutovers so the new space is usable on day one. Ask about project coordination with your GC and low-voltage vendors.',
          es: 'Sí — cableado, conectividad y cortes para que el nuevo espacio sea usable el día uno. Pregunta por coordinación de proyecto con tu GC y proveedores de baja tensión.',
        },
      },
    ],
  },
  {
    slug: 'distribution-retail-manufacturing',
    title: { en: 'Distribution, retail & manufacturing', es: 'Distribución, retail y manufactura' },
    summary: {
      en: 'Uptime for warehouses, storefronts, and light industrial ops in Davie and nearby — inventory, connectivity, and recovery that work.',
      es: 'Disponibilidad para almacenes, tiendas e industria ligera en Davie y alrededores: inventario, conectividad y recuperación que funcionan.',
    },
    metaTitle: {
      en: 'IT for Distribution, Retail & Manufacturing | Cybercon',
      es: 'TI para distribución, retail y manufactura | Cybercon',
    },
    metaDescription: {
      en: 'Managed IT for South Florida warehouses, retailers, and light manufacturing — uptime, inventory systems, and recovery that keep product moving.',
      es: 'TI administrada para almacenes, retail e industria ligera en el Sur de Florida — disponibilidad, sistemas de inventario y recuperación que mantienen el producto en movimiento.',
    },
    lede: {
      en: 'When scanners, POS, or the ERP stop, the floor stops. We keep distribution and retail technology running so product keeps moving.',
      es: 'Cuando se detienen los escáneres, el POS o el ERP, se detiene el piso. Mantenemos la tecnología de distribución y retail en marcha para que el producto siga moviéndose.',
    },
    overview: {
      en: 'Davie and greater South Florida host warehouses, light manufacturing, and retail operations that live on scanners, POS, ERP, and internet links. Minutes of downtime show up in labor and lost sales. Cybercon provides proactive managed IT, network reliability, and recovery planning for operators who need the floor online — not a lecture about the cloud.',
      es: 'Davie y el Sur de Florida albergan almacenes, industria ligera y retail que viven de escáneres, POS, ERP y enlaces de internet. Minutos de caída se ven en mano de obra y ventas perdidas. Cybercon ofrece TI administrada proactiva, fiabilidad de red y planificación de recuperación para operadores que necesitan el piso en línea — no una charla sobre la nube.',
    },
    challengesLabel: { en: 'What stops the floor', es: 'Lo que detiene el piso' },
    challenges: [
      {
        en: 'Single internet circuits with no failover when the ISP blinks.',
        es: 'Circuitos de internet únicos sin failover cuando el ISP parpadea.',
      },
      {
        en: 'Aging servers hosting inventory or labeling apps nobody wants to touch.',
        es: 'Servidores viejos con apps de inventario o etiquetado que nadie quiere tocar.',
      },
      {
        en: 'Shift changes that create shared-login chaos and audit gaps.',
        es: 'Cambios de turno que crean caos de logins compartidos y huecos de auditoría.',
      },
      {
        en: 'Ransomware risk against operations that cannot afford a multi-day rebuild.',
        es: 'Riesgo de ransomware en operaciones que no pueden permitirse una reconstrucción de varios días.',
      },
    ],
    helpLabel: { en: 'How we help operators', es: 'Cómo ayudamos a operadores' },
    help: [
      {
        title: { en: 'Uptime for the floor', es: 'Disponibilidad para el piso' },
        body: {
          en: 'Monitoring, patching, and onsite response aimed at scanners, POS, Wi-Fi, and the apps that ship product.',
          es: 'Monitoreo, parches y respuesta en sitio orientados a escáneres, POS, Wi-Fi y las apps que despachan producto.',
        },
      },
      {
        title: { en: 'Network resilience', es: 'Resiliencia de red' },
        body: {
          en: 'Circuit design, failover options, and vendor coordination so a single ISP outage does not close the warehouse.',
          es: 'Diseño de circuitos, opciones de failover y coordinación de proveedores para que una caída de ISP no cierre el almacén.',
        },
      },
      {
        title: { en: 'Backup and recovery that match ops', es: 'Respaldo y recuperación a la medida' },
        body: {
          en: 'Restore targets tied to how long you can run without the system — tested, not assumed.',
          es: 'Objetivos de restauración ligados a cuánto puedes operar sin el sistema — probados, no asumidos.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do you support multi-shift operations?',
          es: '¿Dan soporte a operaciones de varios turnos?',
        },
        answer: {
          en: 'Yes. Managed clients get 24/7/365 help desk coverage so second and third shift are not left waiting until morning.',
          es: 'Sí. Los clientes gestionados tienen mesa de ayuda 24/7/365 para que el segundo y tercer turno no esperen hasta la mañana.',
        },
      },
      {
        question: {
          en: 'Can you work with our ERP or WMS vendor?',
          es: '¿Pueden trabajar con nuestro proveedor de ERP o WMS?',
        },
        answer: {
          en: 'We own the infrastructure and endpoints those systems run on, and we join vendor bridges when the issue crosses network, identity, or device boundaries.',
          es: 'Somos dueños de la infraestructura y endpoints en los que corren esos sistemas, y entramos a puentes con el proveedor cuando el problema cruza red, identidad o dispositivos.',
        },
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function industryPath(locale: string, slug: string): string {
  const base = locale === 'es' ? '/es/industries' : '/industries';
  return `${base}/${slug}/`;
}
