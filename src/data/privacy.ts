export type PrivacyLocale = 'en' | 'es';

export const privacyContent = {
  en: {
    metaTitle: 'Privacy & Cookie Policy | Cybercon',
    metaDescription:
      'How Cybercon Solutions collects, uses, and protects your information. Cookie categories, analytics consent, Turnstile, CCPA rights, and contact details.',
    title: 'Privacy & Cookie Policy',
    eyebrow: 'Legal',
    /** ISO date for JSON-LD dateModified (keep in sync with lastUpdated copy). */
    dateModified: '2026-08-03',
    lastUpdated: 'Last updated: August 3, 2026',
    intro:
      'This policy explains what information CYBERCON SOLUTIONS collects when you use this website, how we use and protect it, the cookies and analytics we rely on, and the choices and rights you have. Non-essential cookies and similar trackers are not set or loaded until you give prior consent (or you may reject them and continue browsing).',
    controllerHeading: 'Who is responsible for your data',
    controller:
      'CYBERCON SOLUTIONS (Cybercon Solutions LLC), 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, United States, serving Cooper City & Davie, Florida. Questions about this policy or your data: info@cybercon-solutions.com · (754) 300-9786.',
    sections: [
      {
        heading: '1. Information we collect',
        blocks: [
          {
            sub: 'Information you give us',
            body: 'When you submit the assessment or contact form, we collect the full name, work email, and (when provided) company name and message. When you use the free breach check on the Cybersecurity page (or the same check on the AI Security page), we collect the work email you enter so we can look up known breaches and follow up. When you complete the free AI security readiness check and choose to send your result, we collect your name, company, work email, and the readiness score/answers so we can follow up. We use these only to respond to your request and to contact you about the services you asked about.',
          },
          {
            sub: 'Information collected automatically',
            body: 'If you consent to analytics, we collect standard usage data (pages viewed, approximate location by country, device and browser type, and referral source) to understand site traffic. With the same consent, Apollo.io may identify the company associated with a visit (globally) and, when person-level tracking is enabled in Apollo, visitors in the United States, so we can follow up with relevant B2B outreach. For security, our bot-protection provider (Cloudflare Turnstile) processes limited technical data (including your IP address) when you complete the form’s human-verification check.',
          },
        ],
      },
      {
        heading: '2. Cookies & similar technologies',
        body: 'Under the ePrivacy Directive and GDPR, we do not set or load non-essential cookies or trackers until you give prior consent via the banner. Strictly necessary cookies run by default so the site and security features work. Analytics cookies, the Apollo.io website tracker, and optional Zaraz tools (if configured) load only after you choose “Accept analytics.” Choosing “Reject non-essential” keeps those tools off. You can change or withdraw your choice at any time using “Cookie settings” in the footer.',
        table: {
          headers: ['Name / provider', 'Purpose', 'Category'],
          rows: [
            [
              'Cloudflare Turnstile (Cloudflare, Inc.)',
              'Protects the contact form from spam and abuse by verifying you are human.',
              'Strictly necessary',
            ],
            [
              'Consent preference (cookie: cybercon_consent; local storage: cybercon-consent-v1)',
              'Remembers whether you accepted or rejected non-essential analytics so we don’t ask again. Stored for up to one year.',
              'Strictly necessary',
            ],
            [
              'Session cookie (cybercon_session)',
              'Keeps you signed in to the client area after Auth0 authentication.',
              'Strictly necessary (client area only)',
            ],
            [
              'Google Analytics (_ga, _ga_*) — Google LLC',
              'Measures site traffic and usage. Loaded only after you accept analytics. Google Consent Mode defaults remain denied until then.',
              'Analytics (optional)',
            ],
            [
              'Apollo.io website tracker — Apollo Graph, Inc.',
              'Identifies visiting companies (global) and, when enabled in Apollo, people in the United States for B2B outreach. Loaded only after you accept analytics.',
              'Analytics (optional)',
            ],
          ],
        },
      },
      {
        heading: '3. How we use your information',
        list: [
          'To respond to your assessment request and communicate with you about our services.',
          'To keep the website secure and prevent spam and abuse.',
          'With your consent, to measure and improve site performance and content.',
          'With your consent, to identify companies (and, where enabled, U.S. visitors) who use the site so we can follow up about our services.',
          'To authenticate and protect the client area when you sign in.',
        ],
      },
      {
        heading: '4. Legal bases (for EEA/UK visitors)',
        list: [
          'Consent — for analytics cookies, similar tracking technologies, and related processing. Consent is collected before those tools run; you may withdraw it at any time via Cookie settings.',
          'Steps taken at your request / legitimate interests — to respond to your inquiry and provide the information you asked for.',
          'Legitimate interests — to protect our website and services from abuse (including strictly necessary security checks such as Turnstile on forms).',
        ],
      },
      {
        heading: '5. Sharing & service providers',
        body: 'We do not sell or rent your personal information. We share it only with service providers who process it on our behalf:',
        list: [
          'Attio — our CRM; stores your assessment, contact, site-check, or breach-check request as a contact/company prospect so we can follow up.',
          'Web3Forms (or equivalent form delivery) — may deliver your form submission to us by email.',
          'Have I Been Pwned — when you use the free breach check, we send the email address you enter to Have I Been Pwned’s API to look up known data breaches. We do not send passwords.',
          'Cloudflare — website hosting (Cloudflare Workers), bot protection (Turnstile), and CDN.',
          'Auth0 — authentication for the client area.',
          'Google — analytics, only if you consent.',
          'Apollo.io — website visitor identification (companies globally; people in the United States when person-level tracking is enabled), only if you consent.',
        ],
        after:
          'These providers may process data outside your country; where required, appropriate safeguards (such as Standard Contractual Clauses) apply.',
      },
      {
        heading: '6. Data retention',
        body: 'We keep form submissions only as long as needed to respond to your request and for reasonable business records, then delete them. Analytics data is retained according to Google Analytics’ retention settings. Apollo.io retains visitor-identification data according to its own retention settings. Client-area session cookies expire after a limited period of inactivity.',
      },
      {
        heading: '7. Your rights',
        body: 'Depending on where you live, you may have the right to access, correct, delete, or restrict use of your personal information, to object to processing, to data portability, and to withdraw consent. Under U.S. state laws such as the CCPA/CPRA, you may request to know or delete your information and to opt out of “sale” or “sharing” — we do not sell or share personal information as those terms are defined. To exercise any right, contact us at info@cybercon-solutions.com.',
      },
      {
        heading: '8. Children’s privacy',
        body: 'This site is intended for businesses and is not directed to children under 13, and we do not knowingly collect their information.',
      },
      {
        heading: '9. Changes to this policy',
        body: 'We may update this policy as our services and legal obligations evolve. The “Last updated” date above reflects the latest revision.',
      },
      {
        heading: '10. Contact us',
        body: 'CYBERCON SOLUTIONS — info@cybercon-solutions.com · (754) 300-9786 · 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, United States.',
      },
    ],
  },
  es: {
    metaTitle: 'Política de Privacidad y Cookies | Cybercon',
    metaDescription:
      'Cómo Cybercon Solutions recopila, usa y protege tu información. Categorías de cookies, consentimiento de analítica, Turnstile, derechos CCPA y contacto.',
    title: 'Política de Privacidad y Cookies',
    eyebrow: 'Legal',
    dateModified: '2026-08-03',
    lastUpdated: 'Última actualización: 3 de agosto de 2026',
    intro:
      'Esta política explica qué información recopila CYBERCON SOLUTIONS cuando usas este sitio, cómo la usamos y protegemos, las cookies y la analítica que empleamos, y las opciones y derechos que tienes. Las cookies no esenciales y rastreadores similares no se establecen ni se cargan hasta que des tu consentimiento previo (o puedes rechazarlas y seguir navegando).',
    controllerHeading: 'Quién es responsable de tus datos',
    controller:
      'CYBERCON SOLUTIONS (Cybercon Solutions LLC), 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, Estados Unidos, con servicio en Cooper City y Davie, Florida. Preguntas sobre esta política o tus datos: info@cybercon-solutions.com · (754) 300-9786.',
    sections: [
      {
        heading: '1. Información que recopilamos',
        blocks: [
          {
            sub: 'Información que nos das',
            body: 'Cuando envías el formulario de evaluación o de contacto, recopilamos el nombre completo, el correo de trabajo y (si los indicas) el nombre de la empresa y el mensaje. Cuando usas la revisión gratuita de filtraciones en la página de Ciberseguridad (o la misma revisión en Seguridad de IA), recopilamos el correo de trabajo que ingresas para consultar filtraciones conocidas y dar seguimiento. Cuando completas la revisión gratuita de preparación en seguridad de IA y eliges enviar tu resultado, recopilamos tu nombre, empresa, correo de trabajo y la puntuación/respuestas de preparación para dar seguimiento. Los usamos solo para responder a tu solicitud y contactarte sobre los servicios que pediste.',
          },
          {
            sub: 'Información recopilada automáticamente',
            body: 'Si consientes la analítica, recopilamos datos de uso estándar (páginas vistas, ubicación aproximada por país, tipo de dispositivo y navegador, y fuente de referencia) para entender el tráfico del sitio. Con el mismo consentimiento, Apollo.io puede identificar la empresa asociada a una visita (a nivel global) y, cuando el seguimiento a nivel de persona esté activado en Apollo, a visitantes en Estados Unidos, para que podamos dar seguimiento B2B relevante. Por seguridad, nuestro proveedor de protección antibots (Cloudflare Turnstile) procesa datos técnicos limitados (incluida tu dirección IP) cuando completas la verificación humana del formulario.',
          },
        ],
      },
      {
        heading: '2. Cookies y tecnologías similares',
        body: 'Según la Directiva ePrivacy y el RGPD, no establecemos ni cargamos cookies o rastreadores no esenciales hasta que des tu consentimiento previo en el banner. Las cookies estrictamente necesarias funcionan por defecto para que el sitio y la seguridad operen. Las cookies de analítica, el rastreador web de Apollo.io y las herramientas opcionales de Zaraz (si están configuradas) se cargan solo si eliges “Aceptar analítica”. “Rechazar no esenciales” mantiene esas herramientas desactivadas. Puedes cambiar o retirar tu elección en cualquier momento con “Configuración de cookies” en el pie de página.',
        table: {
          headers: ['Nombre / proveedor', 'Finalidad', 'Categoría'],
          rows: [
            [
              'Cloudflare Turnstile (Cloudflare, Inc.)',
              'Protege el formulario de contacto del spam verificando que eres humano.',
              'Estrictamente necesarias',
            ],
            [
              'Preferencia de consentimiento (cookie: cybercon_consent; almacenamiento local: cybercon-consent-v1)',
              'Recuerda si aceptaste o rechazaste la analítica no esencial para no volver a preguntar. Se conserva hasta un año.',
              'Estrictamente necesarias',
            ],
            [
              'Cookie de sesión (cybercon_session)',
              'Mantiene tu sesión en el área de clientes tras autenticarte con Auth0.',
              'Estrictamente necesarias (solo área de clientes)',
            ],
            [
              'Google Analytics (_ga, _ga_*) — Google LLC',
              'Mide el tráfico y el uso del sitio. Se carga solo si aceptas la analítica. El modo de consentimiento de Google permanece denegado hasta entonces.',
              'Analítica (opcional)',
            ],
            [
              'Rastreador web de Apollo.io — Apollo Graph, Inc.',
              'Identifica empresas visitando el sitio (global) y, cuando está activado en Apollo, personas en Estados Unidos para seguimiento B2B. Se carga solo si aceptas la analítica.',
              'Analítica (opcional)',
            ],
          ],
        },
      },
      {
        heading: '3. Cómo usamos tu información',
        list: [
          'Para responder a tu solicitud de evaluación y comunicarnos contigo sobre nuestros servicios.',
          'Para mantener el sitio seguro y prevenir spam y abusos.',
          'Con tu consentimiento, para medir y mejorar el rendimiento y el contenido del sitio.',
          'Con tu consentimiento, para identificar empresas (y, cuando esté activado, visitantes en EE. UU.) que usan el sitio y dar seguimiento sobre nuestros servicios.',
          'Para autenticar y proteger el área de clientes cuando inicias sesión.',
        ],
      },
      {
        heading: '4. Bases legales (visitantes del EEE/Reino Unido)',
        list: [
          'Consentimiento — para cookies de analítica, tecnologías de seguimiento similares y el tratamiento relacionado. El consentimiento se recoge antes de que esas herramientas se ejecuten; puedes retirarlo en cualquier momento con Configuración de cookies.',
          'Pasos a tu solicitud / intereses legítimos — para responder a tu consulta y darte la información pedida.',
          'Intereses legítimos — para proteger nuestro sitio y servicios del abuso (incluidas comprobaciones de seguridad estrictamente necesarias como Turnstile en formularios).',
        ],
      },
      {
        heading: '5. Compartir datos y proveedores',
        body: 'No vendemos ni alquilamos tu información personal. Solo la compartimos con proveedores que la procesan en nuestro nombre:',
        list: [
          'Attio — nuestro CRM; guarda tu solicitud de evaluación, contacto, revisión de sitio o de filtraciones como prospecto (contacto/empresa) para el seguimiento.',
          'Web3Forms (o equivalente) — puede entregar tu envío de formulario por correo.',
          'Have I Been Pwned — cuando usas la revisión gratuita de filtraciones, enviamos el correo que ingresas a la API de Have I Been Pwned para consultar filtraciones conocidas. No enviamos contraseñas.',
          'Cloudflare — alojamiento (Cloudflare Workers), protección antibots (Turnstile) y CDN.',
          'Auth0 — autenticación del área de clientes.',
          'Google — analítica, solo si consientes.',
          'Apollo.io — identificación de visitantes del sitio (empresas a nivel global; personas en Estados Unidos cuando el seguimiento a nivel de persona está activado), solo si consientes.',
        ],
        after:
          'Estos proveedores pueden procesar datos fuera de tu país; cuando corresponda, se aplican salvaguardas adecuadas (como las Cláusulas Contractuales Tipo).',
      },
      {
        heading: '6. Conservación de datos',
        body: 'Conservamos los envíos del formulario solo el tiempo necesario para responder y para registros comerciales razonables, y luego los eliminamos. Los datos de analítica se conservan según la configuración de Google Analytics. Apollo.io conserva los datos de identificación de visitantes según su propia configuración de retención. Las cookies de sesión del área de clientes caducan tras un periodo limitado de inactividad.',
      },
      {
        heading: '7. Tus derechos',
        body: 'Según dónde vivas, puedes tener derecho a acceder, corregir, eliminar o restringir el uso de tu información personal, a oponerte al tratamiento, a la portabilidad y a retirar el consentimiento. Bajo leyes estatales de EE. UU. como la CCPA/CPRA, puedes solicitar conocer o eliminar tu información y optar por no participar en la “venta” o “compartición” — no vendemos ni compartimos información personal según esas definiciones. Para ejercer cualquier derecho, contáctanos en info@cybercon-solutions.com.',
      },
      {
        heading: '8. Privacidad de menores',
        body: 'Este sitio está dirigido a empresas, no a menores de 13 años, y no recopilamos a sabiendas su información.',
      },
      {
        heading: '9. Cambios a esta política',
        body: 'Podemos actualizar esta política a medida que evolucionen nuestros servicios y obligaciones legales. La fecha de “Última actualización” refleja la revisión más reciente.',
      },
      {
        heading: '10. Contáctanos',
        body: 'CYBERCON SOLUTIONS — info@cybercon-solutions.com · (754) 300-9786 · 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, Estados Unidos.',
      },
    ],
  },
} as const;
