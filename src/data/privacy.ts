export type PrivacyLocale = 'en' | 'es';

export const privacyContent = {
  en: {
    metaTitle: 'Privacy & Cookie Policy | Cybercon Solutions',
    metaDescription:
      'How Cybercon Solutions collects, uses, and protects your information. Cookie categories, analytics consent, Turnstile, CCPA rights, and contact details.',
    title: 'Privacy & Cookie Policy',
    lastUpdated: 'Last updated: July 20, 2026',
    intro:
      'This policy explains what information CYBERCON SOLUTIONS collects when you use this website, how we use and protect it, the cookies and analytics we rely on, and the choices and rights you have.',
    controllerHeading: 'Who is responsible for your data',
    controller:
      'CYBERCON SOLUTIONS (Cybercon Solutions LLC), 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, United States, serving Cooper City & Davie, Florida. Questions about this policy or your data: info@cybercon-solutions.com · 973-573-0007.',
    sections: [
      {
        heading: '1. Information we collect',
        blocks: [
          {
            sub: 'Information you give us',
            body: 'When you submit the assessment request form, we collect the full name, company name, and work email you provide. We use these only to respond to your request and to contact you about the services you asked about.',
          },
          {
            sub: 'Information collected automatically',
            body: 'If you consent to analytics, we collect standard usage data (pages viewed, approximate location by country, device and browser type, and referral source) to understand site traffic. For security, our bot-protection provider (Cloudflare Turnstile) processes limited technical data (including your IP address) when you complete the form’s human-verification check.',
          },
        ],
      },
      {
        heading: '2. Cookies & similar technologies',
        body: 'We use only strictly necessary cookies by default. Analytics cookies are set only after you accept them in the consent banner. You can change or withdraw your choice at any time using the “Cookie settings” link in the footer.',
        table: {
          headers: ['Name / provider', 'Purpose', 'Category'],
          rows: [
            [
              'Cloudflare Turnstile (Cloudflare, Inc.)',
              'Protects the contact form from spam and abuse by verifying you are human.',
              'Strictly necessary',
            ],
            [
              'Consent preference (local storage: cybercon-consent-v1)',
              'Remembers whether you accepted or declined analytics so we don’t ask again.',
              'Strictly necessary',
            ],
            [
              'Session cookie (cybercon_session)',
              'Keeps you signed in to the client area after Auth0 authentication.',
              'Strictly necessary (client area only)',
            ],
            [
              'Google Analytics (_ga, _ga_*) — Google LLC',
              'Measures site traffic and usage. Loaded only after you accept analytics.',
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
          'To authenticate and protect the client area when you sign in.',
        ],
      },
      {
        heading: '4. Legal bases (for EEA/UK visitors)',
        list: [
          'Consent — for analytics cookies and related processing. You may withdraw consent at any time.',
          'Steps taken at your request / legitimate interests — to respond to your inquiry and provide the information you asked for.',
          'Legitimate interests — to protect our website and services from abuse.',
        ],
      },
      {
        heading: '5. Sharing & service providers',
        body: 'We do not sell or rent your personal information. We share it only with service providers who process it on our behalf:',
        list: [
          'Attio — our CRM; stores your assessment request as a contact/company prospect so we can follow up.',
          'Web3Forms (or equivalent form delivery) — may deliver your form submission to us by email.',
          'Cloudflare — website hosting (Cloudflare Pages), bot protection (Turnstile), and CDN.',
          'Auth0 — authentication for the client area.',
          'Google — analytics, only if you consent.',
        ],
        after:
          'These providers may process data outside your country; where required, appropriate safeguards (such as Standard Contractual Clauses) apply.',
      },
      {
        heading: '6. Data retention',
        body: 'We keep form submissions only as long as needed to respond to your request and for reasonable business records, then delete them. Analytics data is retained according to Google Analytics’ retention settings. Client-area session cookies expire after a limited period of inactivity.',
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
        body: 'CYBERCON SOLUTIONS — info@cybercon-solutions.com · 973-573-0007 · 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, United States.',
      },
    ],
  },
  es: {
    metaTitle: 'Política de Privacidad y Cookies | Cybercon Solutions',
    metaDescription:
      'Cómo Cybercon Solutions recopila, usa y protege tu información. Categorías de cookies, consentimiento de analítica, Turnstile, derechos CCPA y contacto.',
    title: 'Política de Privacidad y Cookies',
    lastUpdated: 'Última actualización: 20 de julio de 2026',
    intro:
      'Esta política explica qué información recopila CYBERCON SOLUTIONS cuando usas este sitio, cómo la usamos y protegemos, las cookies y la analítica que empleamos, y las opciones y derechos que tienes.',
    controllerHeading: 'Quién es responsable de tus datos',
    controller:
      'CYBERCON SOLUTIONS (Cybercon Solutions LLC), 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, Estados Unidos, con servicio en Cooper City y Davie, Florida. Preguntas sobre esta política o tus datos: info@cybercon-solutions.com · 973-573-0007.',
    sections: [
      {
        heading: '1. Información que recopilamos',
        blocks: [
          {
            sub: 'Información que nos das',
            body: 'Cuando envías el formulario de evaluación, recopilamos el nombre completo, el nombre de la empresa y el correo de trabajo que indiques. Los usamos solo para responder a tu solicitud y contactarte sobre los servicios que pediste.',
          },
          {
            sub: 'Información recopilada automáticamente',
            body: 'Si consientes la analítica, recopilamos datos de uso estándar (páginas vistas, ubicación aproximada por país, tipo de dispositivo y navegador, y fuente de referencia) para entender el tráfico del sitio. Por seguridad, nuestro proveedor de protección antibots (Cloudflare Turnstile) procesa datos técnicos limitados (incluida tu dirección IP) cuando completas la verificación humana del formulario.',
          },
        ],
      },
      {
        heading: '2. Cookies y tecnologías similares',
        body: 'Por defecto usamos solo cookies estrictamente necesarias. Las cookies de analítica se establecen solo después de que las aceptes en el banner de consentimiento. Puedes cambiar o retirar tu elección en cualquier momento con el enlace “Configuración de cookies” del pie de página.',
        table: {
          headers: ['Nombre / proveedor', 'Finalidad', 'Categoría'],
          rows: [
            [
              'Cloudflare Turnstile (Cloudflare, Inc.)',
              'Protege el formulario de contacto del spam verificando que eres humano.',
              'Estrictamente necesarias',
            ],
            [
              'Preferencia de consentimiento (almacenamiento local: cybercon-consent-v1)',
              'Recuerda si aceptaste o rechazaste la analítica para no volver a preguntar.',
              'Estrictamente necesarias',
            ],
            [
              'Cookie de sesión (cybercon_session)',
              'Mantiene tu sesión en el área de clientes tras autenticarte con Auth0.',
              'Estrictamente necesarias (solo área de clientes)',
            ],
            [
              'Google Analytics (_ga, _ga_*) — Google LLC',
              'Mide el tráfico y el uso del sitio. Se carga solo si aceptas la analítica.',
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
          'Para autenticar y proteger el área de clientes cuando inicias sesión.',
        ],
      },
      {
        heading: '4. Bases legales (visitantes del EEE/Reino Unido)',
        list: [
          'Consentimiento — para cookies de analítica y el tratamiento relacionado. Puedes retirar el consentimiento en cualquier momento.',
          'Pasos a tu solicitud / intereses legítimos — para responder a tu consulta y darte la información pedida.',
          'Intereses legítimos — para proteger nuestro sitio y servicios del abuso.',
        ],
      },
      {
        heading: '5. Cesión y proveedores',
        body: 'No vendemos ni alquilamos tu información personal. Solo la compartimos con proveedores que la procesan en nuestro nombre:',
        list: [
          'Attio — nuestro CRM; guarda tu solicitud de evaluación como prospecto (contacto/empresa) para el seguimiento.',
          'Web3Forms (o equivalente) — puede entregar tu envío de formulario por correo.',
          'Cloudflare — alojamiento (Cloudflare Pages), protección antibots (Turnstile) y CDN.',
          'Auth0 — autenticación del área de clientes.',
          'Google — analítica, solo si consientes.',
        ],
        after:
          'Estos proveedores pueden procesar datos fuera de tu país; cuando corresponda, se aplican salvaguardas adecuadas (como las Cláusulas Contractuales Tipo).',
      },
      {
        heading: '6. Conservación de datos',
        body: 'Conservamos los envíos del formulario solo el tiempo necesario para responder y para registros comerciales razonables, y luego los eliminamos. Los datos de analítica se conservan según la configuración de Google Analytics. Las cookies de sesión del área de clientes caducan tras un periodo limitado de inactividad.',
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
        body: 'CYBERCON SOLUTIONS — info@cybercon-solutions.com · 973-573-0007 · 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, Florida 33139, Estados Unidos.',
      },
    ],
  },
} as const;
