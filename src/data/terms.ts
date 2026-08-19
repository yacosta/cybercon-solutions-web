export type TermsLocale = 'en' | 'es';

export type TermsSection = {
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
    phoneLabel: string;
    phoneDisplay: string;
    phoneHref: string;
  };
};

export const termsContent = {
  en: {
    metaTitle: 'Terms and Conditions | Cybercon',
    metaDescription:
      'Terms governing use of cybercon-solutions.com: acceptable use, intellectual property, disclaimers, liability limits, and Florida governing law.',
    title: 'Terms and Conditions',
    eyebrow: 'Legal',
    /** ISO date for JSON-LD dateModified (keep in sync with lastUpdated copy). */
    dateModified: '2026-08-02',
    lastUpdated: 'Last updated: August 2, 2026',
    intro:
      'These Terms and Conditions (“Terms”) govern your use of the website at cybercon-solutions.com (including the Spanish locale at /es/) (the “Site”), operated by Cybercon Solutions LLC (“Cybercon Solutions,” “we,” “us,” or “our”). By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.',
    introLink: {
      before: 'For information about how we collect and use personal information, see our ',
      label: 'Privacy & Cookie Policy',
      path: '/privacy/',
      after: '.',
    },
    sections: [
      {
        heading: 'Use of the Site',
        body: 'You agree to use the Site only for lawful purposes. You agree not to:',
        list: [
          'Use the Site in any way that violates applicable law or regulation.',
          'Attempt to gain unauthorized access to the Site, our systems, the client area, or any account or data not belonging to you.',
          'Scrape, harvest, or systematically extract content from the Site without our prior written consent.',
          'Impersonate any person or entity, or misrepresent your affiliation with any person or entity, when submitting information through a form, chat, or other feature on the Site.',
          'Interfere with or disrupt the operation of the Site or the servers or networks connected to it.',
          'Abuse rate-limited tools (including assessment, site check, breach check, AI readiness check, or chat) in a way that harms the Site or other users.',
        ],
        after: 'We reserve the right to restrict or terminate access to the Site for anyone who violates these Terms.',
      },
      {
        heading: 'Intellectual Property',
        body: 'The Site, including its design, text, graphics, photography, logos, blog posts, case studies, white papers, and other content, are owned by Cybercon Solutions LLC or our licensors and are protected by copyright, trademark, and other intellectual property laws.',
        after:
          'You may view and print content from the Site for your own personal, non-commercial reference. You may not reproduce, distribute, modify, or create derivative works from any content on the Site without our prior written permission.',
      },
      {
        heading: 'Third-Party Links',
        body: 'The Site may contain links to third-party websites, including social media platforms, vendor documentation, and partner resources. These links are provided for convenience only. We do not control and are not responsible for the content, privacy practices, or availability of any linked third-party site.',
      },
      {
        heading: 'No Professional Advice',
        body: 'Content on the Site, including blog posts, case studies, checklists, sample reports, and service descriptions, is provided for general informational purposes only. It does not constitute IT, cybersecurity, legal, compliance, accounting, or other professional advice specific to your situation, and should not be relied upon as such. You should seek advice tailored to your own circumstances before acting on anything described on the Site.',
      },
      {
        heading: 'Disclaimer of Warranties',
        body: 'The Site and its content are provided “as is” and “as available,” without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or completely secure, or that any information on the Site is current, complete, or accurate at all times.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'To the fullest extent permitted by law, Cybercon Solutions LLC will not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of, or inability to use, the Site.',
      },
      {
        heading: 'Indemnification',
        body: 'You agree to indemnify and hold Cybercon Solutions LLC harmless from any claims, damages, or expenses (including reasonable attorneys’ fees) arising from your violation of these Terms or your misuse of the Site.',
      },
      {
        heading: 'Changes to These Terms',
        body: 'We may update these Terms from time to time. Material changes will be reflected by an updated “Last updated” date above. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.',
      },
      {
        heading: 'Governing Law',
        body: 'These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts located in Florida.',
      },
      {
        heading: 'Contact Us',
        contact: {
          org: 'Cybercon Solutions LLC',
          mailingLabel: 'Mailing address',
          mailing: '407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, FL 33139, United States',
          emailLabel: 'Email',
          email: 'info@cybercon-solutions.com',
          phoneLabel: 'Phone',
          phoneDisplay: '(754) 300-9786',
          phoneHref: 'tel:+1-754-300-9786',
        },
      },
    ] satisfies TermsSection[],
  },
  es: {
    metaTitle: 'Términos y condiciones | Cybercon',
    metaDescription:
      'Términos de uso de cybercon-solutions.com: uso aceptable, propiedad intelectual, exclusiones de responsabilidad, límites de responsabilidad y ley de Florida.',
    title: 'Términos y condiciones',
    eyebrow: 'Legal',
    dateModified: '2026-08-02',
    lastUpdated: 'Última actualización: 2 de agosto de 2026',
    intro:
      'Estos Términos y condiciones (“Términos”) rigen el uso del sitio web en cybercon-solutions.com (incluida la versión en español en /es/) (el “Sitio”), operado por Cybercon Solutions LLC (“Cybercon Solutions”, “nosotros” o “nuestro”). Al usar el Sitio, aceptas estos Términos. Si no estás de acuerdo, no uses el Sitio.',
    introLink: {
      before: 'Para información sobre cómo recopilamos y usamos datos personales, consulta nuestra ',
      label: 'Política de privacidad y cookies',
      path: '/privacy/',
      after: '.',
    },
    sections: [
      {
        heading: 'Uso del Sitio',
        body: 'Aceptas usar el Sitio solo con fines lícitos. Aceptas no:',
        list: [
          'Usar el Sitio de forma que infrinja la ley o la normativa aplicable.',
          'Intentar obtener acceso no autorizado al Sitio, a nuestros sistemas, al área de clientes o a cualquier cuenta o datos que no te pertenezcan.',
          'Hacer scraping, recolectar o extraer de forma sistemática contenido del Sitio sin nuestro consentimiento previo por escrito.',
          'Suplantar a una persona o entidad, o falsear tu vínculo con ella, al enviar información por un formulario, chat u otra función del Sitio.',
          'Interferir o interrumpir el funcionamiento del Sitio o de los servidores o redes conectados a él.',
          'Abusar de herramientas con límite de uso (incluida la evaluación, la revisión del sitio, la revisión de filtraciones, la revisión de preparación en IA o el chat) de forma que perjudique el Sitio u otros usuarios.',
        ],
        after: 'Nos reservamos el derecho de restringir o terminar el acceso al Sitio a quien incumpla estos Términos.',
      },
      {
        heading: 'Propiedad intelectual',
        body: 'El Sitio, incluido su diseño, texto, gráficos, fotografía, logotipos, entradas del blog, estudios de caso, informes técnicos y demás contenido, es propiedad de Cybercon Solutions LLC o de nuestros licenciantes y está protegido por leyes de derechos de autor, marcas y otra propiedad intelectual.',
        after:
          'Puedes ver e imprimir contenido del Sitio para tu referencia personal y no comercial. No puedes reproducir, distribuir, modificar ni crear obras derivadas del contenido del Sitio sin nuestro permiso previo por escrito.',
      },
      {
        heading: 'Enlaces a terceros',
        body: 'El Sitio puede incluir enlaces a sitios de terceros, incluidas plataformas de redes sociales, documentación de proveedores y recursos de colaboradores. Esos enlaces se ofrecen solo por conveniencia. No controlamos ni somos responsables del contenido, las prácticas de privacidad ni la disponibilidad de ningún sitio de terceros enlazado.',
      },
      {
        heading: 'Sin asesoría profesional',
        body: 'El contenido del Sitio, incluidas entradas del blog, estudios de caso, listas de verificación, informes de muestra y descripciones de servicios, se ofrece solo con fines informativos generales. No constituye asesoría de TI, ciberseguridad, jurídica, de cumplimiento, contable u otra asesoría profesional específica para tu situación, y no debe usarse como tal. Debes buscar asesoría adaptada a tus circunstancias antes de actuar con base en lo descrito en el Sitio.',
      },
      {
        heading: 'Exclusión de garantías',
        body: 'El Sitio y su contenido se ofrecen “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas. No garantizamos que el Sitio esté ininterrumpido, libre de errores o completamente seguro, ni que la información del Sitio esté siempre actualizada, completa o exacta.',
      },
      {
        heading: 'Limitación de responsabilidad',
        body: 'En la máxima medida permitida por la ley, Cybercon Solutions LLC no será responsable de daños indirectos, incidentales, especiales o consecuentes derivados de o relacionados con tu uso, o la imposibilidad de usar, el Sitio.',
      },
      {
        heading: 'Indemnización',
        body: 'Aceptas indemnizar y mantener indemne a Cybercon Solutions LLC frente a reclamos, daños o gastos (incluidos honorarios razonables de abogados) que surjan de tu incumplimiento de estos Términos o del mal uso del Sitio.',
      },
      {
        heading: 'Cambios a estos Términos',
        body: 'Podemos actualizar estos Términos de vez en cuando. Los cambios importantes se reflejarán con una fecha de “Última actualización” revisada arriba. El uso continuo del Sitio después de publicar cambios constituye la aceptación de los Términos revisados.',
      },
      {
        heading: 'Ley aplicable',
        body: 'Estos Términos se rigen por las leyes del Estado de Florida, sin tener en cuenta principios de conflicto de leyes. Cualquier disputa que surja bajo estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales ubicados en Florida.',
      },
      {
        heading: 'Contáctanos',
        contact: {
          org: 'Cybercon Solutions LLC',
          mailingLabel: 'Dirección postal',
          mailing: '407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, FL 33139, Estados Unidos',
          emailLabel: 'Correo',
          email: 'info@cybercon-solutions.com',
          phoneLabel: 'Teléfono',
          phoneDisplay: '(754) 300-9786',
          phoneHref: 'tel:+1-754-300-9786',
        },
      },
    ] satisfies TermsSection[],
  },
} as const;
