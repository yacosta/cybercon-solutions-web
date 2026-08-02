export type AccessibilityLocale = 'en' | 'es';

export type AccessibilitySection = {
  heading: string;
  body?: string;
  list?: string[];
  after?: string;
  contact?: {
    org: string;
    mailingLabel: string;
    mailing: string;
    emailLabel: string;
    email: string;
    formLabel: string;
    formHref: string;
    formDisplay: string;
  };
};

export const accessibilityContent = {
  en: {
    metaTitle: 'Accessibility Statement | Cybercon',
    metaDescription:
      'How Cybercon Solutions works toward WCAG 2.2 Level AA on cybercon-solutions.com, what we are improving, and how to report accessibility barriers.',
    title: 'Accessibility Statement',
    eyebrow: 'Legal',
    /** ISO date for JSON-LD dateModified (keep in sync with lastUpdated copy). */
    dateModified: '2026-08-02',
    lastUpdated: 'Last updated: August 2, 2026',
    intro:
      'Cybercon Solutions LLC (“Cybercon Solutions,” “we,” “us,” or “our”) is committed to improving digital accessibility for people with disabilities. This Accessibility Statement applies to cybercon-solutions.com (including the Spanish locale at /es/). Accessibility is an ongoing effort, and we continue to review and improve our website, content, and digital experiences over time.',
    sections: [
      {
        heading: 'Our approach',
        body: 'We work toward accessibility in a practical, ongoing way and use the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA, as our reference standard for website updates, content practices, and future improvements. We recognize that accessibility requires continuous review, improvement, and adaptation.',
      },
      {
        heading: 'What we are doing',
        list: [
          'Considering accessibility in website updates, new content, forms, and user-facing features.',
          'Providing a skip link to the main content and a clear primary landmark on each page.',
          'Providing visible keyboard focus indicators on links, buttons, and form fields.',
          'Maintaining a logical heading structure to support navigation by screen reader users.',
          'Using descriptive link text so destinations are clear out of context (avoiding bare “Learn more” / “Saber más”).',
          'Keeping brand text and accents at WCAG AA contrast on cream and white backgrounds.',
          'Marking decorative images so assistive technology can skip them, and writing meaningful alternative text for informative images.',
          'Respecting prefers-reduced-motion for homepage hero motion and other non-essential animation.',
          'Requiring prior consent before loading non-essential analytics cookies and similar trackers.',
          'Reviewing reported issues and making reasonable efforts to address barriers within our control.',
        ],
      },
      {
        heading: 'Current status',
        body: 'Accessibility is an ongoing effort. This website has not yet undergone a formal third-party accessibility audit, certification, or remediation program. For that reason, Cybercon Solutions does not represent that the website fully conforms to WCAG 2.2 Level AA or any other specific accessibility standard at this time.',
      },
      {
        heading: 'Third-party content and tools',
        body: 'Some features or content may rely on third-party platforms, plugins, or embedded tools that are not fully controlled by Cybercon Solutions. These may include Cloudflare Turnstile (form bot protection), Pagefind (site search), optional Google Analytics (only after consent), Auth0 (client-area sign-in), the Have I Been Pwned breach-check lookup, and the on-site chat assistant when AI providers are configured.',
        after:
          'While we work to choose and maintain tools that support accessibility, we cannot guarantee the accessibility of third-party content, integrations, or vendor-controlled features.',
      },
      {
        heading: 'Feedback and assistance',
        body: 'If you experience difficulty accessing any content, feature, form, or document on this website, please contact us and include the webpage or feature you were trying to access, a description of the issue, and, if possible, the device, browser, or assistive technology you were using.',
        after:
          'We will make reasonable efforts to provide the information, item, or service you need through an accessible communication method or alternative format, as applicable. We also welcome feedback and suggestions that may help improve accessibility across the site.',
      },
      {
        heading: 'Contact us',
        contact: {
          org: 'Cybercon Solutions LLC',
          mailingLabel: 'Mailing address',
          mailing: '407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, FL 33139, United States',
          emailLabel: 'Email',
          email: 'info@cybercon-solutions.com',
          formLabel: 'Contact form',
          formHref: 'https://cybercon-solutions.com/contact/',
          formDisplay: 'cybercon-solutions.com/contact/',
        },
        after: 'Response time: We aim to reply within one business day.',
      },
      {
        heading: 'Statement updates',
        body: 'We may update this Accessibility Statement from time to time as our website, content, and accessibility efforts continue to evolve. Material changes will be reflected by an updated “Last updated” date above.',
      },
    ] satisfies AccessibilitySection[],
  },
  es: {
    metaTitle: 'Declaración de accesibilidad | Cybercon',
    metaDescription:
      'Cómo Cybercon Solutions trabaja hacia WCAG 2.2 Nivel AA en cybercon-solutions.com, qué mejoramos y cómo reportar barreras de accesibilidad.',
    title: 'Declaración de accesibilidad',
    eyebrow: 'Legal',
    dateModified: '2026-08-02',
    lastUpdated: 'Última actualización: 2 de agosto de 2026',
    intro:
      'Cybercon Solutions LLC (“Cybercon Solutions”, “nosotros” o “nuestro”) se compromete a mejorar la accesibilidad digital para las personas con discapacidad. Esta Declaración de accesibilidad aplica a cybercon-solutions.com (incluida la versión en español en /es/). La accesibilidad es un esfuerzo continuo, y seguimos revisando y mejorando el sitio, el contenido y las experiencias digitales con el tiempo.',
    sections: [
      {
        heading: 'Nuestro enfoque',
        body: 'Trabajamos la accesibilidad de forma práctica y continua, y usamos las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, Nivel AA, como referencia para actualizaciones del sitio, prácticas de contenido y mejoras futuras. Reconocemos que la accesibilidad exige revisión, mejora y adaptación constantes.',
      },
      {
        heading: 'Qué estamos haciendo',
        list: [
          'Considerar la accesibilidad en actualizaciones del sitio, contenido nuevo, formularios y funciones orientadas al usuario.',
          'Ofrecer un enlace para saltar al contenido principal y un landmark principal claro en cada página.',
          'Mostrar indicadores de foco visibles en enlaces, botones y campos de formulario.',
          'Mantener una estructura de encabezados lógica para la navegación con lectores de pantalla.',
          'Usar texto de enlace descriptivo para que el destino quede claro fuera de contexto (evitar “Saber más” / “Learn more” genéricos).',
          'Mantener el contraste AA del texto y acentos de marca sobre fondos crema y blanco.',
          'Marcar imágenes decorativas para que la tecnología de asistencia las omita, y escribir texto alternativo útil en imágenes informativas.',
          'Respetar prefers-reduced-motion en el hero de inicio y en animaciones no esenciales.',
          'Exigir consentimiento previo antes de cargar cookies de analítica no esenciales y rastreadores similares.',
          'Revisar problemas reportados y hacer esfuerzos razonables para corregir barreras bajo nuestro control.',
        ],
      },
      {
        heading: 'Estado actual',
        body: 'La accesibilidad es un esfuerzo continuo. Este sitio aún no ha pasado por una auditoría formal de accesibilidad de terceros, certificación o programa de remediación. Por eso, Cybercon Solutions no afirma que el sitio cumpla por completo con WCAG 2.2 Nivel AA ni con otro estándar de accesibilidad específico en este momento.',
      },
      {
        heading: 'Contenido y herramientas de terceros',
        body: 'Algunas funciones o contenidos pueden depender de plataformas, plugins o herramientas integradas de terceros que Cybercon Solutions no controla por completo. Pueden incluir Cloudflare Turnstile (protección antibots en formularios), Pagefind (búsqueda del sitio), Google Analytics opcional (solo tras consentimiento), Auth0 (inicio de sesión del área de clientes), la consulta de filtraciones Have I Been Pwned y el asistente de chat del sitio cuando hay proveedores de IA configurados.',
        after:
          'Aunque buscamos elegir y mantener herramientas que apoyen la accesibilidad, no podemos garantizar la accesibilidad del contenido de terceros, integraciones o funciones controladas por proveedores.',
      },
      {
        heading: 'Comentarios y asistencia',
        body: 'Si tienes dificultad para acceder a algún contenido, función, formulario o documento de este sitio, contáctanos e incluye la página o función que intentabas usar, una descripción del problema y, si es posible, el dispositivo, navegador o tecnología de asistencia que usabas.',
        after:
          'Haremos esfuerzos razonables para entregarte la información, el elemento o el servicio que necesitas por un método de comunicación accesible o en un formato alternativo, según corresponda. También recibimos con gusto comentarios y sugerencias que ayuden a mejorar la accesibilidad del sitio.',
      },
      {
        heading: 'Contáctanos',
        contact: {
          org: 'Cybercon Solutions LLC',
          mailingLabel: 'Dirección postal',
          mailing: '407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, FL 33139, Estados Unidos',
          emailLabel: 'Correo',
          email: 'info@cybercon-solutions.com',
          formLabel: 'Formulario de contacto',
          formHref: 'https://cybercon-solutions.com/es/contact/',
          formDisplay: 'cybercon-solutions.com/es/contact/',
        },
        after: 'Tiempo de respuesta: Buscamos responder en un día hábil.',
      },
      {
        heading: 'Actualizaciones de esta declaración',
        body: 'Podemos actualizar esta Declaración de accesibilidad de vez en cuando a medida que evolucionen el sitio, el contenido y nuestros esfuerzos de accesibilidad. Los cambios importantes se reflejarán con una fecha de “Última actualización” revisada arriba.',
      },
    ] satisfies AccessibilitySection[],
  },
} as const;
