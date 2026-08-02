export type LocaleCopy = { en: string; es: string };

export type WebDesignPricingTier = {
  name: LocaleCopy;
  priceFrom: LocaleCopy;
  priceTo: LocaleCopy;
  description: LocaleCopy;
  features: LocaleCopy[];
  cta: LocaleCopy;
  featured?: boolean;
  badge?: LocaleCopy;
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
    footnote: LocaleCopy;
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
  };
};

/** Editorial layout copy for /services/web-design-development/ */
export const webDesignPage: WebDesignPageCopy = {
  displayTitle: {
    en: 'Web design & redesign.',
    es: 'Diseño y rediseño web.',
  },
  lede: {
    en: 'Accessible, on-brand websites and custom applications — designed, built, hosted securely, and supported after launch. For South Florida businesses whose current site undersells the quality of their real-world work.',
    es: 'Sitios accesibles y con tu marca, y aplicaciones a medida — diseñados, construidos, alojados de forma segura y con soporte tras el lanzamiento. Para empresas del sur de Florida cuyo sitio actual no refleja la calidad de su trabajo en la vida real.',
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
      en: 'Web design packages',
      es: 'Paquetes de diseño web',
    },
    title: {
      en: 'Website design & redesign pricing',
      es: 'Precios de diseño y rediseño web',
    },
    lede: {
      en: 'Transparent flat-rate packages for South Florida businesses',
      es: 'Paquetes a tarifa plana, transparentes, para empresas del sur de Florida',
    },
    footnote: {
      en: 'All packages include discovery, design, development, SEO setup, testing & launch support. Final price depends on exact scope.',
      es: 'Todos los paquetes incluyen descubrimiento, diseño, desarrollo, configuración SEO, pruebas y soporte de lanzamiento. El precio final depende del alcance exacto.',
    },
    tiers: [
      {
        name: { en: 'Basic / Starter', es: 'Básico / Inicial' },
        priceFrom: { en: '$2,000', es: '$2,000' },
        priceTo: { en: '– $6,000', es: '– $6,000' },
        description: {
          en: '5–8 page brochure site, template-based (WordPress or similar), responsive, basic forms & SEO.',
          es: 'Sitio folleto de 5–8 páginas, basado en plantilla (WordPress o similar), responsivo, formularios básicos y SEO.',
        },
        features: [
          { en: 'Template-based design', es: 'Diseño basado en plantilla' },
          { en: 'Fully responsive', es: 'Totalmente responsivo' },
          { en: 'Basic forms & SEO', es: 'Formularios básicos y SEO' },
        ],
        cta: {
          en: 'Get a Basic package quote',
          es: 'Pedir cotización del paquete Básico',
        },
      },
      {
        name: { en: 'Professional', es: 'Profesional' },
        priceFrom: { en: '$6,000', es: '$6,000' },
        priceTo: { en: '– $15,000', es: '– $15,000' },
        description: {
          en: 'Custom design, 8–15 pages, solid UX, CMS, on-page SEO, forms & light integrations. The sweet spot for most local businesses.',
          es: 'Diseño a medida, 8–15 páginas, UX sólido, CMS, SEO on-page, formularios e integraciones ligeras. El punto ideal para la mayoría de negocios locales.',
        },
        features: [
          { en: 'Custom design', es: 'Diseño a medida' },
          { en: 'CMS + solid UX', es: 'CMS + UX sólido' },
          { en: 'On-page SEO included', es: 'SEO on-page incluido' },
          { en: 'Light integrations', es: 'Integraciones ligeras' },
        ],
        cta: {
          en: 'Get a Professional package quote',
          es: 'Pedir cotización del paquete Profesional',
        },
        featured: true,
        badge: { en: 'Most Popular', es: 'Más popular' },
      },
      {
        name: { en: 'Advanced', es: 'Avanzado' },
        priceFrom: { en: '$15,000', es: '$15,000' },
        priceTo: { en: '– $40,000+', es: '– $40,000+' },
        description: {
          en: 'E-commerce, memberships, custom functionality, advanced animations, CRM integrations, multi-language & heavy SEO.',
          es: 'Comercio electrónico, membresías, funcionalidad a medida, animaciones avanzadas, integraciones CRM, multiidioma y SEO intensivo.',
        },
        features: [
          { en: 'E-commerce / memberships', es: 'Comercio electrónico / membresías' },
          { en: 'Custom functionality', es: 'Funcionalidad a medida' },
          { en: 'CRM & advanced integrations', es: 'CRM e integraciones avanzadas' },
        ],
        cta: {
          en: 'Get an Advanced package quote',
          es: 'Pedir cotización del paquete Avanzado',
        },
      },
      {
        name: { en: 'Enterprise', es: 'Empresarial' },
        priceFrom: { en: 'Contact us', es: 'Contáctanos' },
        priceTo: { en: '', es: '' },
        description: {
          en: 'Large sites, custom platforms, heavy integrations, and high-traffic systems.',
          es: 'Sitios grandes, plataformas a medida, integraciones complejas y sistemas de alto tráfico.',
        },
        features: [
          { en: 'Custom platforms', es: 'Plataformas a medida' },
          { en: 'Complex integrations', es: 'Integraciones complejas' },
          { en: 'High-traffic architecture', es: 'Arquitectura para alto tráfico' },
        ],
        cta: {
          en: 'Talk with us about Enterprise scope',
          es: 'Hablar con nosotros sobre alcance Empresarial',
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
      en: 'Ready for a site that matches how you actually sell?',
      es: '¿Listo para un sitio que refleje cómo vendes de verdad?',
    },
    body: {
      en: 'Book a free assessment to scope design, redesign, or a custom build — or run the free site check first for a quick technical skim.',
      es: 'Agenda una evaluación gratuita para definir diseño, rediseño o un desarrollo a medida — o haz primero la revisión gratuita del sitio para un vistazo técnico rápido.',
    },
    button: {
      en: 'Book a web design assessment',
      es: 'Agendar evaluación de diseño web',
    },
  },
};
