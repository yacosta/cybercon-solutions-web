export type LocaleCopy = { en: string; es: string };

export type WebDesignPageCopy = {
  displayTitle: LocaleCopy;
  lede: LocaleCopy;
  replyNote: LocaleCopy;
  audience: {
    label: LocaleCopy;
    title: LocaleCopy;
    paragraphs: LocaleCopy[];
  };
  process: {
    label: LocaleCopy;
    steps: Array<{
      number: string;
      title: LocaleCopy;
      body: LocaleCopy;
    }>;
  };
  afterLaunch: {
    label: LocaleCopy;
    title: LocaleCopy;
    body: LocaleCopy;
    imageAlt: LocaleCopy;
  };
  faqLabel: LocaleCopy;
  cta: {
    title: LocaleCopy;
    button: LocaleCopy;
  };
};

/** Editorial layout copy for /services/web-design-development/ */
export const webDesignPage: WebDesignPageCopy = {
  displayTitle: {
    en: 'Web design & development.',
    es: 'Diseño y desarrollo web.',
  },
  lede: {
    en: 'Accessible, on-brand websites and custom applications — designed, built, hosted securely, and supported after launch. For South Florida businesses whose current site undersells the quality of their real-world work.',
    es: 'Sitios accesibles y con tu marca, y aplicaciones a medida — diseñados, construidos, alojados de forma segura y con soporte tras el lanzamiento. Para empresas del sur de Florida cuyo sitio actual no refleja la calidad de su trabajo en la vida real.',
  },
  replyNote: {
    en: 'A real engineer replies within one business day',
    es: 'Un ingeniero real responde en un día hábil',
  },
  audience: {
    label: {
      en: "Who it's for",
      es: 'Para quién es',
    },
    title: {
      en: 'A careful buyer already has questions. The site should answer them.',
      es: 'Un comprador cuidadoso ya tiene preguntas. El sitio debería responderlas.',
    },
    paragraphs: [
      {
        en: 'Who you are, where you serve, how to reach a human, and why to trust you. We design for that clarity — for Cooper City and Davie organizations that care about accessibility, brand consistency, and secure operations.',
        es: 'Quién eres, dónde atiendes, cómo hablar con una persona y por qué confiar. Diseñamos para esa claridad — para organizaciones en Cooper City y Davie que cuidan accesibilidad, marca y operación segura.',
      },
      {
        en: 'Analytics consent and SEO foundations are planned from the start, so the new site can be found and measured without bolting tools on later.',
        es: 'El consentimiento de analítica y las bases de SEO se planifican desde el inicio, para que el sitio nuevo se pueda encontrar y medir sin improvisar herramientas después.',
      },
    ],
  },
  process: {
    label: {
      en: 'How we work',
      es: 'Cómo trabajamos',
    },
    steps: [
      {
        number: '01',
        title: { en: 'Goals & structure', es: 'Objetivos y estructura' },
        body: {
          en: 'Clarify audience, offers, and information architecture so every page supports real conversations — and conversions.',
          es: 'Aclaramos audiencia, ofertas y arquitectura de información para que cada página apoye conversaciones reales — y conversiones.',
        },
      },
      {
        number: '02',
        title: { en: 'Design & build', es: 'Diseño y construcción' },
        body: {
          en: 'An accessible, on-brand experience, implemented with secure hosting in mind from the first commit.',
          es: 'Una experiencia accesible y con tu marca, implementada pensando en hosting seguro desde el primer commit.',
        },
      },
      {
        number: '03',
        title: { en: 'Launch & support', es: 'Lanzamiento y soporte' },
        body: {
          en: 'Ship, monitor, and stay available — content changes and security updates never stall.',
          es: 'Publicamos, monitoreamos y seguimos disponibles — los cambios de contenido y las actualizaciones de seguridad no se estancan.',
        },
      },
    ],
  },
  afterLaunch: {
    label: {
      en: 'After launch',
      es: 'Después del lanzamiento',
    },
    title: {
      en: 'A durable digital front door.',
      es: 'Una puerta digital duradera.',
    },
    body: {
      en: 'We stay in the loop for content updates and security hygiene, with hosting included — a site that matches how you sell and support customers in person, not a brochure that ages poorly.',
      es: 'Seguimos en el circuito para actualizaciones de contenido e higiene de seguridad, con hosting incluido — un sitio alineado con cómo vendes y das soporte en persona, no un folleto que envejece mal.',
    },
    imageAlt: {
      en: 'Server room photographed in black and white',
      es: 'Sala de servidores fotografiada en blanco y negro',
    },
  },
  faqLabel: {
    en: 'FAQ',
    es: 'FAQ',
  },
  cta: {
    title: {
      en: 'Want a clear picture of where your tech stands?',
      es: '¿Quieres ver con claridad cómo está tu tecnología?',
    },
    button: {
      en: 'Book a free assessment',
      es: 'Solicita una evaluación gratuita',
    },
  },
};
