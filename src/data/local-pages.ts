export type LocaleText = { en: string; es: string };

export type LocalPage = {
  slug: 'cooper-city' | 'davie' | 'broward-county';
  /** Proper place name — not translated. */
  place: string;
  metaTitle: LocaleText;
  metaDescription: LocaleText;
  eyebrow: LocaleText;
  h1: LocaleText;
  lede: LocaleText;
  onsite: { title: LocaleText; body: LocaleText };
  industries: {
    title: LocaleText;
    items: { title: LocaleText; body: LocaleText }[];
  };
  local: { title: LocaleText; paragraphs: LocaleText[] };
  faqs: { question: LocaleText; answer: LocaleText }[];
  cta: { title: LocaleText; body: LocaleText };
};

export const localPages: LocalPage[] = [
  {
    slug: 'cooper-city',
    place: 'Cooper City',
    metaTitle: {
      en: 'Managed IT Support in Cooper City, FL | Cybercon Solutions',
      es: 'TI administrada en Cooper City, FL | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Local managed IT and cybersecurity for Cooper City, FL businesses — help desk, monitoring, onsite support, and predictable per-user pricing. Free assessment.',
      es: 'TI administrada y ciberseguridad locales para empresas de Cooper City, FL — mesa de ayuda, monitoreo, soporte en sitio y precio predecible. Evaluación gratuita.',
    },
    eyebrow: { en: 'Managed IT in Cooper City, FL', es: 'TI administrada en Cooper City, FL' },
    h1: {
      en: 'Managed IT support for Cooper City businesses',
      es: 'Soporte de TI administrada para empresas de Cooper City',
    },
    lede: {
      en: 'Cybercon Solutions is headquartered in Cooper City — this is our home turf, not a territory we cover from an hour away. Medical and dental offices, law practices, and family-run businesses along Griffin Road and Stirling Road rely on us for help desk, monitoring, and onsite support at a predictable monthly cost.',
      es: 'Cybercon Solutions tiene su base en Cooper City — este es nuestro territorio local, no una zona que cubrimos desde una hora de distancia. Consultorios médicos y dentales, despachos legales y negocios familiares a lo largo de Griffin Road y Stirling Road confían en nosotros para mesa de ayuda, monitoreo y soporte en sitio a un costo mensual predecible.',
    },
    onsite: {
      title: { en: 'Onsite coverage built around Cooper City', es: 'Cobertura en sitio pensada para Cooper City' },
      body: {
        en: 'Because our team is based here, Cooper City offices typically get same-day onsite response for hardware failures, network drops, and office moves — not a multi-day queue behind clients across the county. Remote monitoring and patching run continuously; a technician shows up in person when a keyboard, switch, or cable actually needs hands on it.',
        es: 'Como nuestro equipo tiene base aquí, las oficinas de Cooper City suelen recibir respuesta en sitio el mismo día para fallos de hardware, caídas de red y mudanzas de oficina — no una cola de varios días detrás de clientes en todo el condado. El monitoreo y los parches remotos corren de forma continua; un técnico se presenta en persona cuando un teclado, switch o cable realmente necesita manos encima.',
      },
    },
    industries: {
      title: { en: 'Who we support in Cooper City', es: 'A quién apoyamos en Cooper City' },
      items: [
        {
          title: { en: 'Medical & dental practices', es: 'Consultorios médicos y dentales' },
          body: {
            en: 'Patient scheduling systems, imaging workstations, and HIPAA-aware access controls that keep the front desk moving without exposing records.',
            es: 'Sistemas de agenda de pacientes, estaciones de imagenología y controles de acceso conscientes de HIPAA que mantienen la recepción fluida sin exponer historiales.',
          },
        },
        {
          title: { en: 'Law & professional services firms', es: 'Despachos legales y de servicios profesionales' },
          body: {
            en: 'Document security, email continuity, and remote access for attorneys and staff who work across the courthouse, the office, and home.',
            es: 'Seguridad documental, continuidad de correo y acceso remoto para abogados y personal que trabajan entre el juzgado, la oficina y casa.',
          },
        },
        {
          title: { en: 'Family-owned retail & franchises', es: 'Comercios familiares y franquicias' },
          body: {
            en: 'Point-of-sale reliability, guest Wi-Fi separated from business systems, and backup that actually restores after a bad week.',
            es: 'Fiabilidad del punto de venta, Wi-Fi de invitados separado de los sistemas del negocio y copias de seguridad que sí restauran después de una mala semana.',
          },
        },
        {
          title: { en: 'Equestrian & agribusiness operators', es: 'Operadores ecuestres y agroindustriales' },
          body: {
            en: 'Reliable connectivity and device support for offices tucked into Cooper City’s remaining equestrian and agricultural properties.',
            es: 'Conectividad fiable y soporte de dispositivos para oficinas ubicadas en las propiedades ecuestres y agrícolas que aún quedan en Cooper City.',
          },
        },
      ],
    },
    local: {
      title: { en: 'Why a Cooper City provider matters', es: 'Por qué importa un proveedor con base en Cooper City' },
      paragraphs: [
        {
          en: 'Cooper City is a planned suburban community best known for its top-rated public schools, master-planned neighborhoods, and a small-town feel that dates back to its equestrian roots — you can still find horse properties tucked between newer developments. Businesses here tend to be owner-operated: the dentist who also handles billing, the law office running on three staff, the franchise owner managing two locations. IT problems land directly on the owner’s desk, which is exactly why we built Cybercon here.',
          es: 'Cooper City es una comunidad suburbana planificada, conocida por sus escuelas públicas de alto desempeño, sus vecindarios diseñados con visión de conjunto y un ambiente de pueblo pequeño que viene de sus raíces ecuestres — todavía se encuentran propiedades con caballos entre desarrollos más nuevos. Los negocios de aquí suelen ser dirigidos por sus propios dueños: el dentista que también lleva la facturación, el despacho legal con tres personas, el dueño de franquicia que administra dos locales. Los problemas de TI caen directamente sobre el escritorio del dueño, y por eso fundamos Cybercon aquí.',
        },
        {
          en: 'Being based in Cooper City means we know which office parks have unreliable ISP coverage, which strip centers share a single internet drop across multiple tenants, and which building managers need advance notice before a technician can bring in a ladder. That local knowledge shortens troubleshooting time compared to a national MSP dispatching from outside the county.',
          es: 'Tener base en Cooper City significa que sabemos qué parques de oficinas tienen cobertura de internet poco fiable, qué centros comerciales comparten una sola conexión entre varios locales y qué administradores de edificio necesitan aviso previo antes de que un técnico lleve una escalera. Ese conocimiento local acorta el tiempo de diagnóstico frente a un MSP nacional que despacha desde fuera del condado.',
        },
      ],
    },
    faqs: [
      {
        question: { en: 'Do you have an office in Cooper City?', es: '¿Tienen oficina en Cooper City?' },
        answer: {
          en: 'Cybercon Solutions is founder-led and based in Cooper City, which is where our onsite technicians start their day. Our registered mailing address is a Miami Beach PMB (no customer visits there) — service delivery and onsite support are centered on Cooper City, Davie, and Broward County.',
          es: 'Cybercon Solutions está liderada por su fundador y tiene base en Cooper City, donde nuestros técnicos en sitio comienzan el día. Nuestra dirección postal registrada es un PMB en Miami Beach (sin visitas de clientes ahí) — la entrega del servicio y el soporte en sitio se centran en Cooper City, Davie y el condado de Broward.',
        },
      },
      {
        question: { en: 'How fast can you respond onsite in Cooper City?', es: '¿Qué tan rápido responden en sitio en Cooper City?' },
        answer: {
          en: 'Most Cooper City hardware and network issues get same-day onsite response since our team already works in the area. Response time depends on your support plan and issue severity.',
          es: 'La mayoría de los problemas de hardware y red en Cooper City reciben respuesta en sitio el mismo día, ya que nuestro equipo ya trabaja en la zona. El tiempo de respuesta depende de tu plan de soporte y la severidad del problema.',
        },
      },
      {
        question: { en: 'Do you work with small, owner-operated Cooper City businesses?', es: '¿Trabajan con pequeños negocios de Cooper City dirigidos por sus dueños?' },
        answer: {
          en: 'Yes. Many of our Cooper City clients are single-location practices and franchises with 15–150 employees — small enough that IT should not require a full-time hire, large enough that break/fix billing gets expensive fast.',
          es: 'Sí. Muchos de nuestros clientes en Cooper City son consultorios y franquicias de una sola sede con 15 a 150 empleados — lo bastante pequeños para no necesitar un puesto de TI a tiempo completo, y lo bastante grandes para que el cobro por falla se vuelva caro rápido.',
        },
      },
      {
        question: { en: 'Can you support a Cooper City office alongside locations in Davie or Broward County?', es: '¿Pueden dar soporte a una oficina en Cooper City junto con sedes en Davie o el condado de Broward?' },
        answer: {
          en: 'Yes. Most of our Cooper City clients also have staff, vendors, or a second location elsewhere in Broward County, so standardized monitoring, patching, and reporting across sites is part of the normal engagement.',
          es: 'Sí. La mayoría de nuestros clientes en Cooper City también tienen personal, proveedores o una segunda sede en otra parte del condado de Broward, así que el monitoreo, los parches y los reportes estandarizados entre sedes forman parte del servicio habitual.',
        },
      },
    ],
    cta: {
      title: { en: 'Ready to fix IT in your Cooper City office?', es: '¿Listo para arreglar la TI de tu oficina en Cooper City?' },
      body: {
        en: 'Book a free IT cost and risk review with a Cooper City–based engineer. We reply within one business day.', 
        es: 'Agenda una revisión gratuita de costo y riesgo en TI con un ingeniero con base en Cooper City. Respondemos en un día hábil.',
      },
    },
  },
  {
    slug: 'davie',
    place: 'Davie',
    metaTitle: {
      en: 'Managed IT Support in Davie, FL | Cybercon Solutions',
      es: 'TI administrada en Davie, FL | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Managed IT and cybersecurity for Davie, FL businesses near Nova Southeastern University — help desk, monitoring, onsite support, and predictable pricing.',
      es: 'TI y ciberseguridad para empresas de Davie cerca de Nova Southeastern University: mesa de ayuda, monitoreo, soporte en sitio y precio predecible.',
    },
    eyebrow: { en: 'Managed IT in Davie, FL', es: 'TI administrada en Davie, FL' },
    h1: {
      en: 'Managed IT support for Davie businesses',
      es: 'Soporte de TI administrada para empresas de Davie',
    },
    lede: {
      en: 'Davie sits minutes from Cooper City, where Cybercon Solutions is based — so onsite support for Davie offices, veterinary practices, and organizations near Nova Southeastern University does not mean waiting on a technician driving in from Miami or Boca.',
      es: 'Davie está a minutos de Cooper City, donde tiene base Cybercon Solutions — así que el soporte en sitio para oficinas, clínicas veterinarias y organizaciones cerca de Nova Southeastern University en Davie no significa esperar a un técnico que viene desde Miami o Boca.',
    },
    onsite: {
      title: { en: 'Onsite coverage across Davie', es: 'Cobertura en sitio en todo Davie' },
      body: {
        en: 'From the older ranch-style office parks near State Road 84 to newer development along Griffin Road and around Nova Southeastern University, we schedule onsite visits without the multi-day lead time a distant provider needs. Rural and equestrian-zoned parcels — Davie still requires hitching posts at some public buildings — get the same monitoring and patching discipline as any office tower.',
        es: 'Desde los parques de oficinas de estilo rancho cerca de la State Road 84 hasta los desarrollos más nuevos a lo largo de Griffin Road y alrededor de Nova Southeastern University, programamos visitas en sitio sin el plazo de varios días que necesita un proveedor lejano. Las parcelas rurales y con zonificación ecuestre — Davie todavía exige postes para amarrar caballos en algunos edificios públicos — reciben la misma disciplina de monitoreo y parches que cualquier torre de oficinas.',
      },
    },
    industries: {
      title: { en: 'Who we support in Davie', es: 'A quién apoyamos en Davie' },
      items: [
        {
          title: { en: 'Veterinary & animal-care practices', es: 'Clínicas veterinarias y de cuidado animal' },
          body: {
            en: 'Reliable network uptime for practice management software, imaging equipment, and payment systems in a city with a strong equestrian and agricultural heritage.',
            es: 'Disponibilidad de red confiable para el software de gestión de la clínica, equipos de imagenología y sistemas de pago en una ciudad con fuerte herencia ecuestre y agrícola.',
          },
        },
        {
          title: { en: 'Education & university-adjacent organizations', es: 'Organizaciones educativas y cercanas a la universidad' },
          body: {
            en: 'Vendors, clinics, and nonprofits that work alongside Nova Southeastern University and Broward College need identity, access, and compliance support that keeps pace with academic-calendar turnover.',
            es: 'Proveedores, clínicas y organizaciones sin fines de lucro que trabajan junto a Nova Southeastern University y Broward College necesitan identidad, acceso y cumplimiento acordes con la rotación del calendario académico.',
          },
        },
        {
          title: { en: 'Healthcare & allied health offices', es: 'Consultorios de salud y terapias' },
          body: {
            en: 'HIPAA-aware endpoint and identity management for the physical therapy, chiropractic, and specialty practices clustered around Davie’s medical corridors.',
            es: 'Gestión de endpoints e identidad consciente de HIPAA para las prácticas de fisioterapia, quiropráctica y especialidades agrupadas en los corredores médicos de Davie.',
          },
        },
        {
          title: { en: 'Real estate & land-development firms', es: 'Firmas inmobiliarias y de desarrollo de suelo' },
          body: {
            en: 'Secure file sharing and remote access for teams managing western Davie’s ongoing residential and commercial buildout.',
            es: 'Uso compartido de archivos seguro y acceso remoto para equipos que gestionan el desarrollo residencial y comercial continuo del oeste de Davie.',
          },
        },
      ],
    },
    local: {
      title: { en: 'Why local support fits Davie', es: 'Por qué el soporte local encaja en Davie' },
      paragraphs: [
        {
          en: 'Davie carries a deliberate western heritage — a town ordinance still requires hitching posts on public buildings, and the Bergeron Rodeo Grounds hosts rodeo events that draw families from across Broward County. At the same time, Nova Southeastern University and Broward College bring a steady flow of healthcare, legal, and business-services organizations that need enterprise-grade IT discipline without an enterprise IT budget.',
          es: 'Davie mantiene una herencia occidental deliberada — una ordenanza municipal todavía exige postes para amarrar caballos en los edificios públicos, y los Bergeron Rodeo Grounds acogen eventos de rodeo que atraen familias de todo el condado de Broward. Al mismo tiempo, Nova Southeastern University y Broward College traen un flujo constante de organizaciones de salud, legales y de servicios empresariales que necesitan disciplina de TI de nivel empresarial sin un presupuesto de TI empresarial.',
        },
        {
          en: 'That mix — agricultural-zoned parcels next to university-adjacent medical offices — means a Davie IT partner needs to be comfortable with both a barn office running on a single ISP line and a multi-provider clinic handling protected health information. We run both patterns today.',
          es: 'Esa mezcla — parcelas con zonificación agrícola junto a consultorios médicos cercanos a la universidad — significa que un proveedor de TI en Davie debe sentirse cómodo tanto con una oficina en un establo con una sola línea de internet como con una clínica multiproveedor que maneja información de salud protegida. Hoy operamos ambos escenarios.',
        },
      ],
    },
    faqs: [
      {
        question: { en: 'How close is Cybercon to Davie?', es: '¿Qué tan cerca está Cybercon de Davie?' },
        answer: {
          en: 'Cybercon Solutions is based in neighboring Cooper City, minutes from most of Davie. Our registered mailing address is a Miami Beach PMB (no customer visits there); onsite support is centered on Davie, Cooper City, and greater Broward County.',
          es: 'Cybercon Solutions tiene base en la vecina Cooper City, a minutos de la mayor parte de Davie. Nuestra dirección postal registrada es un PMB en Miami Beach (sin visitas de clientes ahí); el soporte en sitio se centra en Davie, Cooper City y el condado de Broward.',
        },
      },
      {
        question: { en: 'Do you support veterinary and agricultural offices?', es: '¿Dan soporte a oficinas veterinarias y agrícolas?' },
        answer: {
          en: 'Yes. We support veterinary practices, equestrian operations, and agricultural offices across Davie alongside more conventional office environments.',
          es: 'Sí. Damos soporte a clínicas veterinarias, operaciones ecuestres y oficinas agrícolas en Davie, junto con entornos de oficina más convencionales.',
        },
      },
      {
        question: { en: 'Can you work with vendors and clinics near Nova Southeastern University?', es: '¿Pueden trabajar con proveedores y clínicas cerca de Nova Southeastern University?' },
        answer: {
          en: 'Yes. We support businesses and clinics that operate near NSU and Broward College, including HIPAA-aware setups for healthcare-adjacent practices.',
          es: 'Sí. Apoyamos negocios y clínicas que operan cerca de NSU y Broward College, incluyendo configuraciones conscientes de HIPAA para prácticas relacionadas con la salud.',
        },
      },
      {
        question: { en: 'Is pricing different for Davie compared to other South Florida locations?', es: '¿El precio es distinto en Davie respecto a otras zonas del sur de Florida?' },
        answer: {
          en: 'No. Managed IT pricing is per-user and consistent across our South Florida service area — Davie clients pay the same predictable rate as Cooper City or greater Broward County clients.',
          es: 'No. El precio de la TI administrada es por usuario y consistente en toda nuestra zona de servicio del sur de Florida — los clientes en Davie pagan la misma tarifa predecible que los clientes en Cooper City o el resto del condado de Broward.',
        },
      },
    ],
    cta: {
      title: { en: 'Ready to fix IT in your Davie office?', es: '¿Listo para arreglar la TI de tu oficina en Davie?' },
      body: {
        en: 'Book a free IT cost and risk review with an engineer who already works in Davie. We reply within one business day.',
        es: 'Agenda una revisión gratuita de costo y riesgo en TI con un ingeniero que ya trabaja en Davie. Respondemos en un día hábil.',
      },
    },
  },
  {
    slug: 'broward-county',
    place: 'Broward County',
    metaTitle: {
      en: 'Managed IT Support in Broward County, FL | Cybercon Solutions',
      es: 'TI administrada en Broward County | Cybercon Solutions',
    },
    metaDescription: {
      en: 'Managed IT and cybersecurity across Broward County — Fort Lauderdale, Plantation, Sunrise, Pembroke Pines, and more. Help desk, monitoring, onsite support.',
      es: 'TI y ciberseguridad en el condado de Broward — Fort Lauderdale, Plantation, Sunrise, Pembroke Pines y más. Mesa de ayuda, monitoreo y soporte en sitio.',
    },
    eyebrow: { en: 'Managed IT across Broward County, FL', es: 'TI administrada en el condado de Broward, FL' },
    h1: {
      en: 'Managed IT support across Broward County',
      es: 'Soporte de TI administrada en todo el condado de Broward',
    },
    lede: {
      en: 'Broward County spans more than 30 municipalities — from downtown Fort Lauderdale to Plantation, Sunrise, Pembroke Pines, Weston, Hollywood, and Pompano Beach. Cybercon Solutions is based in Cooper City and provides managed IT and onsite support across the county for businesses that need one accountable partner instead of coordinating separate vendors per location.',
      es: 'El condado de Broward abarca más de 30 municipios — desde el centro de Fort Lauderdale hasta Plantation, Sunrise, Pembroke Pines, Weston, Hollywood y Pompano Beach. Cybercon Solutions tiene base en Cooper City y ofrece TI administrada y soporte en sitio en todo el condado para empresas que necesitan un solo proveedor responsable en lugar de coordinar proveedores distintos por sede.',
    },
    onsite: {
      title: { en: 'County-wide onsite coverage', es: 'Cobertura en sitio en todo el condado' },
      body: {
        en: 'Multi-location businesses in Broward County — a professional-services firm with offices in Plantation and Hollywood, a healthcare group with clinics from Pompano Beach to Pembroke Pines — get one standardized monitoring, patching, and reporting baseline across every site, plus onsite response scheduled around the county’s traffic corridors rather than a single downtown office.',
        es: 'Los negocios con varias sedes en el condado de Broward — una firma de servicios profesionales con oficinas en Plantation y Hollywood, un grupo de salud con clínicas desde Pompano Beach hasta Pembroke Pines — reciben una sola base estandarizada de monitoreo, parches y reportes en cada sede, además de respuesta en sitio programada según los corredores de tráfico del condado y no según una sola oficina céntrica.',
      },
    },
    industries: {
      title: { en: 'Who we support across the county', es: 'A quién apoyamos en todo el condado' },
      items: [
        {
          title: { en: 'Multi-location professional services', es: 'Servicios profesionales con varias sedes' },
          body: {
            en: 'Law, accounting, and consulting firms with offices spread across Fort Lauderdale’s business districts and surrounding cities that need identity and data controls to match across every location.',
            es: 'Firmas legales, contables y de consultoría con oficinas repartidas por los distritos de negocios de Fort Lauderdale y ciudades cercanas que necesitan controles de identidad y datos consistentes en cada sede.',
          },
        },
        {
          title: { en: 'Healthcare systems & clinic groups', es: 'Sistemas de salud y grupos de clínicas' },
          body: {
            en: 'Multi-clinic healthcare operators near Broward Health and Memorial Healthcare System campuses that need HIPAA-aligned controls standardized across sites.',
            es: 'Operadores de salud con varias clínicas cerca de los campus de Broward Health y Memorial Healthcare System que necesitan controles alineados con HIPAA estandarizados entre sedes.',
          },
        },
        {
          title: { en: 'Logistics, trade & marine-industry businesses', es: 'Logística, comercio e industria marina' },
          body: {
            en: 'Companies tied to Port Everglades, Fort Lauderdale-Hollywood International Airport, and the region’s marine and yachting trade that need dependable connectivity and after-hours support.',
            es: 'Empresas vinculadas a Port Everglades, el Aeropuerto Internacional de Fort Lauderdale-Hollywood y el comercio marino y náutico de la región que necesitan conectividad confiable y soporte fuera de horario.',
          },
        },
        {
          title: { en: 'Nonprofits & financial-services firms', es: 'Organizaciones sin fines de lucro y firmas de servicios financieros' },
          body: {
            en: 'Board-governed organizations across the county that need compliance-ready reporting and a vCIO relationship, not just ticket resolution.',
            es: 'Organizaciones gobernadas por juntas directivas en todo el condado que necesitan reportes listos para cumplimiento y una relación de vCIO, no solo cierre de tickets.',
          },
        },
      ],
    },
    local: {
      title: { en: 'A local partner sized for the whole county', es: 'Un proveedor local a la medida de todo el condado' },
      paragraphs: [
        {
          en: 'Broward County is Florida’s second-most-populous county, anchored by Fort Lauderdale as the county seat and home to Port Everglades and Fort Lauderdale-Hollywood International Airport — both major economic engines for logistics, trade, and tourism. The business landscape ranges from downtown Las Olas law firms to the office parks along the Sawgrass Expressway in Sunrise and Plantation, to healthcare campuses tied to Broward Health and Memorial Healthcare System.',
          es: 'El condado de Broward es el segundo más poblado de Florida, con Fort Lauderdale como cabecera y sede de Port Everglades y el Aeropuerto Internacional de Fort Lauderdale-Hollywood — ambos motores económicos clave para la logística, el comercio y el turismo. El panorama empresarial va desde los despachos legales del centro en Las Olas hasta los parques de oficinas junto a la Sawgrass Expressway en Sunrise y Plantation, pasando por los campus de salud vinculados a Broward Health y Memorial Healthcare System.',
        },
        {
          en: 'That breadth is why we built our service model around per-user pricing and standardized monitoring rather than a single-office retainer: a business with three locations across the county pays one predictable rate and gets one reporting baseline, instead of reconciling three separate vendor invoices and three different security postures at renewal time.',
          es: 'Esa amplitud es la razón por la que diseñamos nuestro modelo de servicio con precio por usuario y monitoreo estandarizado, en lugar de un contrato de honorarios de una sola oficina: un negocio con tres sedes en el condado paga una tarifa predecible y obtiene una sola base de reportes, en lugar de conciliar tres facturas de proveedores distintos y tres posturas de seguridad diferentes al momento de renovar.',
        },
      ],
    },
    faqs: [
      {
        question: { en: 'Do you cover all of Broward County, or just certain cities?', es: '¿Cubren todo el condado de Broward o solo ciertas ciudades?' },
        answer: {
          en: 'We provide managed IT and onsite support across Broward County, with an onsite home base in Cooper City. Remote monitoring, patching, and support work the same everywhere in the county; onsite response time depends on distance from our home base and your support plan.',
          es: 'Ofrecemos TI administrada y soporte en sitio en todo el condado de Broward, con base de operaciones en sitio en Cooper City. El monitoreo remoto, los parches y el soporte funcionan igual en todo el condado; el tiempo de respuesta en sitio depende de la distancia desde nuestra base y de tu plan de soporte.',
        },
      },
      {
        question: { en: 'Can you standardize IT across multiple Broward County offices?', es: '¿Pueden estandarizar la TI en varias oficinas del condado de Broward?' },
        answer: {
          en: 'Yes. Multi-location standardization — one monitoring baseline, one patching schedule, one reporting cadence — is a common engagement for Broward County clients with two or more offices.',
          es: 'Sí. La estandarización multisede — una sola base de monitoreo, un calendario de parches y una cadencia de reportes — es un tipo de proyecto habitual para clientes del condado de Broward con dos o más oficinas.',
        },
      },
      {
        question: { en: 'Where is your registered business address?', es: '¿Cuál es su dirección comercial registrada?' },
        answer: {
          en: 'Our registered mailing address is a Miami Beach PMB (no customer visits at that address). Cybercon Solutions is founder-led and operates onsite out of Cooper City, with service delivery focused on Broward County and greater South Florida.',
          es: 'Nuestra dirección postal registrada es un PMB en Miami Beach (sin visitas de clientes en esa dirección). Cybercon Solutions está liderada por su fundador y opera en sitio desde Cooper City, con la entrega del servicio enfocada en el condado de Broward y el sur de Florida.',
        },
      },
      {
        question: { en: 'Do you support healthcare and financial organizations under compliance requirements?', es: '¿Dan soporte a organizaciones de salud y financieras con requisitos de cumplimiento?' },
        answer: {
          en: 'Yes. We support HIPAA-aware healthcare operators and compliance-conscious financial-services and nonprofit organizations across the county, mapping controls to HIPAA, SOC 2, PCI DSS, and GLBA as needed.',
          es: 'Sí. Apoyamos a operadores de salud conscientes de HIPAA y a organizaciones financieras y sin fines de lucro con enfoque en cumplimiento en todo el condado, alineando controles con HIPAA, SOC 2, PCI DSS y GLBA según se necesite.',
        },
      },
    ],
    cta: {
      title: { en: 'Ready for one accountable IT partner across Broward County?', es: '¿Listo para tener un solo proveedor responsable de TI en todo el condado de Broward?' },
      body: {
        en: 'Book a free IT cost and risk review. We’ll map coverage across your locations and reply within one business day.',
        es: 'Agenda una revisión gratuita de costo y riesgo en TI. Mapeamos la cobertura en tus sedes y respondemos en un día hábil.',
      },
    },
  },
];

export function getLocalPage(slug: string): LocalPage | undefined {
  return localPages.find((page) => page.slug === slug);
}

export function localPagePath(locale: string, slug: string): string {
  const base = locale === 'es' ? '/es/services/managed-it' : '/services/managed-it';
  return `${base}/${slug}/`;
}
