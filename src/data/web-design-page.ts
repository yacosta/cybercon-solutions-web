export type LocaleCopy = { en: string; es: string };

export type WebDesignPricingTier = {
  name: LocaleCopy;
  priceFrom: LocaleCopy;
  priceTo: LocaleCopy;
  /** USD bounds for Offer JSON-LD; omit when price is quote-only (Custom). */
  priceMinUsd?: number;
  priceMaxUsd?: number;
  description: LocaleCopy;
  features: LocaleCopy[];
  cta: LocaleCopy;
  featured?: boolean;
  badge?: LocaleCopy;
};

export type WebDesignSharedInclusion = {
  title: LocaleCopy;
  body: LocaleCopy;
};

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
  pricing: {
    eyebrow: LocaleCopy;
    title: LocaleCopy;
    lede: LocaleCopy;
    footnote?: LocaleCopy;
    shared: {
      title: LocaleCopy;
      items: WebDesignSharedInclusion[];
    };
    tiers: WebDesignPricingTier[];
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
    body: LocaleCopy;
    button: LocaleCopy;
    secondary: LocaleCopy;
  };
};

/** Editorial layout copy for /services/web-design-development/ */
export const webDesignPage: WebDesignPageCopy = {
  displayTitle: {
    en: 'Web design & redesign.',
    es: 'Diseño y rediseño web.',
  },
  lede: {
    en: 'Accessible, on-brand websites and custom applications — designed and built to a published price. You own the domain and files from day one; hosting and care after launch are your call. For South Florida businesses whose current site undersells the quality of their real-world work.',
    es: 'Sitios accesibles y con tu marca, y aplicaciones a medida — diseñados y construidos a un precio publicado. El dominio y los archivos son tuyos desde el primer día; el hosting y el cuidado después del lanzamiento los decides tú. Para empresas del sur de Florida cuyo sitio actual no refleja la calidad de su trabajo en la vida real.',
  },
  replyNote: {
    en: 'A real engineer replies within one business day',
      es: 'Un ingeniero de nuestro equipo responde en un día hábil',
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
  pricing: {
    eyebrow: {
      en: 'Website pricing',
      es: 'Precios de sitios web',
    },
    title: {
      en: 'Fixed scope. Fixed price. Published — because “it depends” is not a price.',
      es: 'Alcance fijo. Precio fijo. Publicado — porque “depende” no es un precio.',
    },
    lede: {
      en: 'We price websites the same way we price IT: you know the number before you sign. These prices are possible because the scope is fixed — not because the work is light.',
      es: 'Le ponemos precio a los sitios igual que a la TI: conoces el número antes de firmar. Estos precios son posibles porque el alcance es fijo — no porque el trabajo sea liviano.',
    },
    shared: {
      title: {
        en: 'Every website, every tier',
        es: 'En todo sitio, en todo nivel',
      },
      items: [
        {
          title: { en: 'You own everything.', es: 'Todo es tuyo.' },
          body: {
            en: 'Domain, files, and hosting are in your name from day one. Leave whenever you want and take it all with you.',
            es: 'Dominio, archivos y hosting quedan a tu nombre desde el primer día. Te puedes ir cuando quieras y te llevas todo.',
          },
        },
        {
          title: { en: 'Shipped hardened.', es: 'Se entrega endurecido.' },
          body: {
            en: 'SSL, security headers, and SPF/DKIM/DMARC configured and verified before launch — we audit other companies’ websites for a living, so ours don’t leave the shop soft.',
            es: 'SSL, encabezados de seguridad y SPF/DKIM/DMARC configurados y verificados antes del lanzamiento — auditamos sitios de otras empresas de oficio, así que los nuestros no salen blandos del taller.',
          },
        },
        {
          title: { en: 'Two revision rounds included.', es: 'Dos rondas de revisión incluidas.' },
          body: {
            en: 'Recorded walkthrough at handoff.',
            es: 'Recorrido grabado en el traspaso.',
          },
        },
      ],
    },
    tiers: [
      {
        name: { en: 'Essential Website', es: 'Sitio web Esencial' },
        priceFrom: { en: '$750', es: '$750' },
        priceTo: { en: '', es: '' },
        priceMinUsd: 750,
        priceMaxUsd: 750,
        description: {
          en: 'One page, built to sell. For a business that needs a sharp, fast online presence that turns a visit into a call.',
          es: 'Una página, hecha para vender. Para un negocio que necesita una presencia en línea nítida y rápida, que convierta una visita en una llamada.',
        },
        features: [
          {
            en: 'Design, mobile-first build, contact form with spam filtering, on-page SEO, and analytics',
            es: 'Diseño, construcción pensada primero para celular, formulario de contacto con filtro antispam, SEO on-page y analítica',
          },
          {
            en: 'Half to start, half at launch. Clock starts at content handoff.',
            es: 'La mitad al empezar, la mitad al lanzar. El reloj arranca en el traspaso de contenido.',
          },
        ],
        cta: {
          en: 'Get an Essential website plan',
          es: 'Pedir un plan de sitio Esencial',
        },
      },
      {
        name: { en: 'Growth Website', es: 'Sitio web de Crecimiento' },
        priceFrom: { en: '$1,150', es: '$1,150' },
        priceTo: { en: '', es: '' },
        priceMinUsd: 1150,
        priceMaxUsd: 1500,
        description: {
          en: 'Five pages: home, services, and the pages that win local search. Ten pages — with dedicated service and location pages — for $1,500.',
          es: 'Cinco páginas: inicio, servicios y las páginas que ganan búsqueda local. Diez páginas — con páginas dedicadas de servicios y ubicaciones — por $1,500.',
        },
        features: [
          {
            en: 'Per-page titles, meta descriptions, structured data, and a submitted sitemap',
            es: 'Títulos por página, meta descripciones, datos estructurados y un sitemap enviado',
          },
          {
            en: 'Clean, framework-light code — no page-builder bloat',
            es: 'Código limpio y liviano — sin el lastre de un constructor de páginas',
          },
        ],
        cta: {
          en: 'Get a Growth website plan',
          es: 'Pedir un plan de sitio de Crecimiento',
        },
        featured: true,
      },
      {
        name: { en: 'Custom Web Project', es: 'Proyecto web a medida' },
        priceFrom: { en: 'Scoped quote', es: 'Cotización con alcance' },
        priceTo: { en: '', es: '' },
        description: {
          en: 'E-commerce, member portals, integrations, web apps, multi-language. Different animal, different process: we scope it in writing, you approve the number, we build to it.',
          es: 'Comercio electrónico, portales de miembros, integraciones, aplicaciones web, multiidioma. Otro animal, otro proceso: definimos el alcance por escrito, tú apruebas el número, construimos contra eso.',
        },
        features: [
          {
            en: 'Written scope before any build starts',
            es: 'Alcance por escrito antes de construir',
          },
          {
            en: 'You approve the number; we build to the approved scope',
            es: 'Tú apruebas el número; construimos contra el alcance aprobado',
          },
        ],
        cta: {
          en: 'Get a custom web project quote',
          es: 'Pedir cotización de un proyecto web a medida',
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
      en: 'After launch, your call.',
      es: 'Después del lanzamiento, tú decides.',
    },
    body: {
      en: 'Run it yourself — there’s no platform fee and no lock-in. Or have us host, monitor, patch, and update it on a monthly care plan, cancel anytime.',
      es: 'Lo operas tú — no hay tarifa de plataforma ni atadura. O nosotros lo alojamos, monitoreamos, parcheamos y actualizamos en un plan mensual de cuidado; lo cancelas cuando quieras.',
    },
    imageAlt: {
      en: 'Flat-lay web design workspace with sketchbook wireframes and a phone mockup',
      es: 'Espacio de trabajo de diseño web con wireframes en un sketchbook y un mockup en el teléfono',
    },
  },
  faqLabel: {
    en: 'FAQ',
    es: 'FAQ',
  },
  cta: {
    title: {
      en: 'Know the number before you sign.',
      es: 'Conoce el número antes de firmar.',
    },
    body: {
      en: 'Or check your current site first: free security snapshot — SSL, DNS, email authentication — in 60 seconds.',
      es: 'O revisa primero tu sitio actual: instantánea gratuita de seguridad — SSL, DNS, autenticación de correo — en 60 segundos.',
    },
    button: {
      en: 'Get a website plan',
      es: 'Pedir un plan de sitio web',
    },
    secondary: {
      en: 'Free security snapshot of your current site (SSL, DNS, email authentication)',
      es: 'Instantánea gratuita de seguridad de tu sitio actual (SSL, DNS, autenticación de correo)',
    },
  },
};
