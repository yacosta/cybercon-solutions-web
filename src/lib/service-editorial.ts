import type { Service } from './services';
import type { ServiceDetails } from './service-details';
import { webDesignPage } from '../data/web-design-page';
import type { Messages } from '../i18n/en';

export type EditorialCopy = {
  displayTitle: string;
  lede: string;
  replyNote: string;
  audience: {
    label: string;
    title: string;
    paragraphs: string[];
  };
  process: {
    label: string;
    steps: Array<{ number: string; title: string; body: string }>;
  };
  feature: {
    label: string;
    title: string;
    body: string;
    imageAlt: string;
    /** Visual treatment for the feature media */
    mediaVariant: 'infra' | 'photo' | 'cyber';
    image: {
      jpg: string;
      jpgSrcset: string;
      webpSrcset: string;
      width: number;
      height: number;
    };
  };
  included: string[];
  faqs: Array<{ question: string; answer: string }>;
  faqLabel: string;
  cta: { title: string; button: string };
};

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function withPeriod(title: string): string {
  const trimmed = title.trim().replace(/\.+$/, '');
  return `${trimmed}.`;
}

function stripStepIndex(title: string): string {
  return title.replace(/^\d+\.\s*/, '').trim();
}

function buildAudience(audienceText: string, label: string): EditorialCopy['audience'] {
  const parts = sentences(audienceText);
  if (parts.length >= 2) {
    return {
      label,
      title: parts[0],
      paragraphs: [parts.slice(1).join(' ')],
    };
  }
  return {
    label,
    title: parts[0] ?? audienceText,
    paragraphs: [],
  };
}

function responsiveImage(basename: string): EditorialCopy['feature']['image'] {
  return {
    jpg: `/images/${basename}.jpg`,
    jpgSrcset: `/images/${basename}-768.jpg 768w, /images/${basename}-960.jpg 960w, /images/${basename}.jpg 1280w`,
    webpSrcset: `/images/${basename}-768.webp 768w, /images/${basename}-960.webp 960w, /images/${basename}.webp 1280w`,
    width: 1280,
    height: 854,
  };
}

type FeatureMediaConfig = {
  mediaVariant: EditorialCopy['feature']['mediaVariant'];
  basename: string;
  imageAlt: { en: string; es: string };
};

/** Custom feature media by service slug (falls back to infra poster). */
export const SERVICE_FEATURE_MEDIA: Record<string, FeatureMediaConfig> = {
  'managed-it': {
    mediaVariant: 'photo',
    basename: 'managed-it-support',
    imageAlt: {
      en: 'IT support specialists collaborating at a help desk',
      es: 'Especialistas de soporte de TI colaborando en un help desk',
    },
  },
  cybersecurity: {
    mediaVariant: 'cyber',
    basename: 'cybersecurity-lock',
    imageAlt: {
      en: 'Cybersecurity professional at monitors with a digital padlock and global network map',
      es: 'Profesional de ciberseguridad ante monitores con un candado digital y mapa de red global',
    },
  },
  cloud: {
    mediaVariant: 'photo',
    basename: 'cloud-services',
    imageAlt: {
      en: 'Hands presenting a cloud upload network of connected digital services',
      es: 'Manos presentando una red de servicios digitales conectados a la nube',
    },
  },
  'it-consulting': {
    mediaVariant: 'cyber',
    basename: 'it-consulting-gears',
    imageAlt: {
      en: 'Hand sketching interconnected strategy gears labeled goals, vision, and growth',
      es: 'Mano dibujando engranajes de estrategia interconectados con metas, visión y crecimiento',
    },
  },
  'backup-disaster-recovery': {
    mediaVariant: 'cyber',
    basename: 'backup-day',
    imageAlt: {
      en: 'Hard drive circuit board beside wooden tiles spelling Backup Day',
      es: 'Placa de disco duro junto a fichas de madera que dicen Backup Day',
    },
  },
  'cabling-communications': {
    mediaVariant: 'photo',
    basename: 'cabling-network',
    imageAlt: {
      en: 'Dense blue and orange structured cabling on a network backplane',
      es: 'Cableado estructurado azul y naranja en un panel de red',
    },
  },
  'ai-consulting': {
    mediaVariant: 'photo',
    basename: 'ai-consulting-brain',
    imageAlt: {
      en: 'Hand on a tablet with an AI brain overlay connected to analytics icons',
      es: 'Mano sobre una tablet con un cerebro de IA conectado a iconos de analítica',
    },
  },
  'ai-integration': {
    mediaVariant: 'photo',
    basename: 'ai-integration-play',
    imageAlt: {
      en: 'Open hand with an AI play hologram surrounded by media production icons',
      es: 'Mano abierta con un holograma de reproducción de IA rodeado de iconos de medios',
    },
  },
  'conversational-ai': {
    mediaVariant: 'photo',
    basename: 'conversational-ai-mic',
    imageAlt: {
      en: 'Person touching a glowing AI microphone interface with audio waveforms',
      es: 'Persona tocando una interfaz de micrófono de IA con formas de onda de audio',
    },
  },
  'web-design-development': {
    mediaVariant: 'photo',
    basename: 'web-design-workspace',
    imageAlt: {
      en: 'Flat-lay web design workspace with sketchbook wireframes and a phone mockup',
      es: 'Espacio de trabajo de diseño web con wireframes en un sketchbook y un mockup en el teléfono',
    },
  },
};

/** Absolute site path to the full-size feature JPG for a service (for JSON-LD). */
export function getServiceFeatureImagePath(slug: string): string | undefined {
  const config = SERVICE_FEATURE_MEDIA[slug];
  return config ? `/images/${config.basename}.jpg` : undefined;
}

function applyFeatureMedia(
  feature: EditorialCopy['feature'],
  slug: string,
  locale: 'en' | 'es',
): EditorialCopy['feature'] {
  const config = SERVICE_FEATURE_MEDIA[slug];
  if (!config) return feature;
  return {
    ...feature,
    mediaVariant: config.mediaVariant,
    imageAlt: config.imageAlt[locale],
    image: responsiveImage(config.basename),
  };
}

function buildFeature(
  overviewText: string,
  label: string,
  imageAlt: string,
): EditorialCopy['feature'] {
  const infraImage = {
    jpg: '/videos/hero-poster.jpg',
    jpgSrcset: '/videos/hero-poster-768.jpg 768w, /videos/hero-poster-960.jpg 960w, /videos/hero-poster.jpg 1280w',
    webpSrcset:
      '/videos/hero-poster-768.webp 768w, /videos/hero-poster-960.webp 960w, /videos/hero-poster.webp 1280w',
    width: 1280,
    height: 720,
  };

  const paras = paragraphs(overviewText);
  if (paras.length >= 2) {
    const titleSource = paras[paras.length - 1];
    const title = sentences(titleSource)[0] ?? titleSource;
    const bodyParas = paras.slice(0, -1);
    const titleSentences = sentences(titleSource);
    const body =
      titleSentences.length > 1
        ? [...bodyParas, titleSentences.slice(1).join(' ')].join('\n\n')
        : bodyParas.join('\n\n');
    return { label, title, body, imageAlt, mediaVariant: 'infra', image: infraImage };
  }

  const only = paras[0] ?? overviewText;
  const bits = sentences(only);
  return {
    label,
    title: bits[0] ?? only,
    body: bits.slice(1).join(' '),
    imageAlt,
    mediaVariant: 'infra',
    image: infraImage,
  };
}

/** Shared editorial view-model for every service page. */
export function buildServiceEditorial(
  service: Service,
  details: ServiceDetails,
  locale: 'en' | 'es',
  t: Messages,
): EditorialCopy {
  if (service.slug === 'web-design-development') {
    const copy = webDesignPage;
    const media = SERVICE_FEATURE_MEDIA['web-design-development'];
    return {
      displayTitle: copy.displayTitle[locale],
      lede: copy.lede[locale],
      replyNote: copy.replyNote[locale],
      audience: {
        label: copy.audience.label[locale],
        title: copy.audience.title[locale],
        paragraphs: copy.audience.paragraphs.map((p) => p[locale]),
      },
      process: {
        label: copy.process.label[locale],
        steps: copy.process.steps.map((step) => ({
          number: step.number,
          title: step.title[locale],
          body: step.body[locale],
        })),
      },
      feature: {
        label: copy.afterLaunch.label[locale],
        title: copy.afterLaunch.title[locale],
        body: copy.afterLaunch.body[locale],
        imageAlt: media.imageAlt[locale],
        mediaVariant: media.mediaVariant,
        image: responsiveImage(media.basename),
      },
      included: [],
      faqs: details.faqs.map((faq) => ({
        question: faq.question[locale],
        answer: faq.answer[locale],
      })),
      faqLabel: copy.faqLabel[locale],
      cta: {
        title: copy.cta.title[locale],
        button: copy.cta.button[locale],
      },
    };
  }

  const replyNote =
    locale === 'es'
      ? 'Un ingeniero real responde en un día hábil'
      : 'A real engineer replies within one business day';
  const overviewLabel = locale === 'es' ? 'Resumen' : 'Overview';
  const overviewParas = paragraphs(details.overview[locale]);

  const audience = buildAudience(details.audience[locale], t.servicePage.audienceTitle);
  let featureOverview = details.overview[locale];
  if (audience.paragraphs.length === 0 && overviewParas.length > 0) {
    audience.paragraphs = [overviewParas[0]];
    featureOverview = overviewParas.slice(1).join('\n\n') || overviewParas[0];
  }

  const feature = applyFeatureMedia(
    buildFeature(
      featureOverview,
      overviewLabel,
      locale === 'es'
        ? 'Sala de servidores fotografiada en blanco y negro'
        : 'Server room photographed in black and white',
    ),
    service.slug,
    locale,
  );

  return {
    displayTitle: withPeriod(service.title[locale]),
    lede: service.summary[locale],
    replyNote,
    audience,
    process: {
      label: t.servicePage.processTitle,
      steps: details.process.map((step, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: stripStepIndex(step.title[locale]),
        body: step.body[locale],
      })),
    },
    feature,
    included: service.items.map((item) => item[locale]),
    faqs: details.faqs.map((faq) => ({
      question: faq.question[locale],
      answer: faq.answer[locale],
    })),
    faqLabel: t.servicePage.faqTitle,
    cta: {
      title: t.servicePage.ctaTitle,
      button: t.servicePage.cta,
    },
  };
}
