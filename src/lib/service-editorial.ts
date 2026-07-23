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
    mediaVariant: 'infra' | 'workspace';
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
        imageAlt: copy.afterLaunch.imageAlt[locale],
        mediaVariant: 'workspace',
        image: {
          jpg: '/images/web-design-workspace.jpg',
          jpgSrcset:
            '/images/web-design-workspace-768.jpg 768w, /images/web-design-workspace-960.jpg 960w, /images/web-design-workspace.jpg 1280w',
          webpSrcset:
            '/images/web-design-workspace-768.webp 768w, /images/web-design-workspace-960.webp 960w, /images/web-design-workspace.webp 1280w',
          width: 1280,
          height: 854,
        },
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

  const imageAlt =
    locale === 'es'
      ? 'Sala de servidores fotografiada en blanco y negro'
      : 'Server room photographed in black and white';
  const replyNote =
    locale === 'es'
      ? 'Un ingeniero real responde en un día hábil'
      : 'A real engineer replies within one business day';
  const overviewLabel = locale === 'es' ? 'Resumen' : 'Overview';
  const overviewParas = paragraphs(details.overview[locale]);

  const audience = buildAudience(details.audience[locale], t.servicePage.audienceTitle);
  let featureOverview = details.overview[locale];
  // When audience is a single sentence, support it with the first overview paragraph
  // and keep the remaining overview for the feature band.
  if (audience.paragraphs.length === 0 && overviewParas.length > 0) {
    audience.paragraphs = [overviewParas[0]];
    featureOverview = overviewParas.slice(1).join('\n\n') || overviewParas[0];
  }

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
    feature: buildFeature(featureOverview, overviewLabel, imageAlt),
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
