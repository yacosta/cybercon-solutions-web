---
title: 'Seguridad del correo que sí frena la suplantación: SPF, DKIM y DMARC'
description: 'Por qué “tenemos Microsoft 365” no es autenticación del correo. Guía práctica de mercado medio sobre SPF, DKIM y DMARC: alineación, aplicación de políticas y un despliegue que frena la suplantación del dominio.'
pubDate: 2026-08-10
banner: cybersecurity-lock
bannerAlt:
  en: 'Digital padlock and circuit-style security imagery representing layered cybersecurity controls'
  es: 'Candado digital e imágenes de circuitos que representan controles de ciberseguridad en capas'
---

Finanzas recibe un correo que parece venir del CEO. El dominio es el de ustedes. La firma está bien. La urgencia es familiar: un cierre que no puede esperar, un proveedor que necesita una transferencia hoy, un paquete para la junta que de algún modo se convirtió en una instrucción de pago. Alguien del equipo responde. El dinero se mueve. Una hora después, el CEO real pregunta de qué pago están hablando.

Eso no es una historia sobre contraseñas débiles. No es una historia sobre antivirus. Es una historia sobre **suplantación del correo** (*email spoofing*): un atacante usa el nombre de tu dominio en el campo Remitente sin iniciar sesión nunca en tu tenant de Microsoft 365 o Google Workspace. El mensaje nunca salió de tus buzones. Solo afirmó haberlo hecho.

La mayoría de las organizaciones de mercado medio todavía tratan esto como un tema técnico de nicho. No lo es. La suplantación del dominio es cómo el fraude de facturas, la suplantación de proveedores y el “fraude del CEO” siguen llegando a bandejas de entrada que, por lo demás, se ven bien protegidas. El MFA no lo detiene. La detección en el endpoint no lo detiene. Un filtro antispam vistoso, solo, no lo detiene. Lo que lo detiene — o al menos lo hace mucho más difícil para que extraños abusen de tu marca en el correo — es un trío de registros DNS que la mayoría de los equipos de liderazgo ha oído una vez y nunca verificó: **SPF, DKIM y DMARC**.

Esta guía es la versión práctica. No un club de lectura de estándares. No un programa empresarial con un equipo de doce personas de seguridad del correo. Un panorama claro de qué hace cada control, por qué “activamos algo en Microsoft” no es lo mismo que aplicar una política, cómo las organizaciones rompen su propio correo al intentar arreglar esto, y una secuencia que Cybercon usa con equipos del Sur de Florida y de mercado medio que necesitan resistencia a la suplantación sin romper remitentes legítimos.

Si ya corriste nuestra [revisión gratuita de seguridad del dominio](/es/services/web-design-development/#site-check) y viste rojo o amarillo en SPF, DKIM o DMARC, este es el artículo que explica qué te están diciendo esos puntajes — y qué hacer después.

## La verdad incómoda: tu dominio se puede usar como un disfraz

El correo se diseñó en una época en la que internet era más pequeña y la confianza salía más barata. El protocolo central que mueve mensajes entre servidores (SMTP) no demuestra, por sí solo, que quien afirma ser `ceo@tuempresa.com` controla esa dirección. Sin capas extra de autenticación, cualquier servidor en internet puede poner tu dominio en la línea Remitente visible. Los sistemas receptores pueden notarlo… o no. Muchos todavía entregan el mensaje si otras señales se ven “suficientemente bien”.

Por eso la suplantación se siente tan injusta para dueños de negocio. Pagaste el dominio. Pagas Microsoft 365. Capacitaste a la gente para no hacer clic en enlaces sospechosos. Y de algún modo un desconocido todavía usó tu logo y tu dominio para pedir dinero.

Hay dos problemas distintos que la gente mezcla, y necesitas nombrar ambos con claridad:

1. **Un externo suplanta tu dominio.** Alguien envía correo que *parece* venir de ustedes, pero nunca tocó tu tenant. SPF, DKIM y DMARC son la defensa principal aquí.
2. **Compromiso de una cuenta interna.** Alguien hace phishing a un colaborador real, inicia sesión en un buzón real y envía correo que *de verdad* salió de ustedes. Los registros de autenticación a menudo pasan, porque el correo es “legítimo” desde el punto de vista del protocolo. Ese problema necesita endurecimiento de identidad, MFA, monitoreo de buzones y el tipo de [programa de endpoint e identidad](/es/blog/endpoint-security-beyond-the-endpoint/) sobre el que ya hemos escrito.

Este artículo se centra en el problema uno. Si lo omites, los atacantes ni siquiera necesitan robar una contraseña para prestar tu marca. Si solo arreglas el problema uno e ignoras el dos, igual te queman — solo que de otra forma. La seguridad seria del correo cubre ambos. Empieza por los controles de suplantación porque son trabajo de DNS con un retorno desproporcionado, y luego sigue.

## Qué significa de verdad “autenticación del correo”

Piensa en SPF, DKIM y DMARC como tres preguntas que un sistema receptor puede hacer sobre un mensaje que afirma venir de tu dominio:

- **SPF pregunta:** “¿Este mensaje vino de un servidor que ustedes dijeron que podía enviar por este dominio?”
- **DKIM pregunta:** “¿Este mensaje está firmado criptográficamente de forma que demuestra autorización por la clave de firma del dominio, y que partes clave no se alteraron en tránsito?”
- **DMARC pregunta:** “Dados los resultados de SPF y DKIM — y si esos resultados se alinean con el dominio que ve el usuario — ¿qué debo hacer: entregar, poner en cuarentena o rechazar? ¿Y a dónde envío el reporte?”

Fíjate que el último es la capa de política. SPF y DKIM son evidencia. DMARC es la decisión. Por eso organizaciones con “SPF configurado” y “DKIM habilitado” siguen siendo suplantadas: sin aplicación de DMARC, muchos receptores tratan las fallas como avisos. El disfraz sigue funcionando.

También fíjate en la palabra **alineación**. Esto tropieza a más equipos de TI que cualquier otro detalle. Un mensaje puede pasar SPF por un dominio de flujo de correo que no es el que ve el lector humano. Un mensaje puede pasar DKIM por un dominio de firma que no es tu Remitente visible. A DMARC le importa si la identidad autenticada coincide con la marca que el destinatario cree estar leyendo. Sin alineación, un “aprobado” es una tecnicidad, no protección.

## SPF: la lista de invitados de servidores que pueden enviar como ustedes

**SPF (Sender Policy Framework)** es un registro TXT en DNS que lista qué servidores de correo pueden enviar mensajes por tu dominio. Cuando un servidor receptor recibe un mensaje, compara la IP de envío con tu lista publicada.

En español sencillo: SPF es una lista de invitados. Si el servidor no está en la lista, SPF falla.

### Cómo se ve un SPF sano en la práctica

Una empresa típica de mercado medio en Microsoft 365 podría publicar algo conceptualmente así: “La infraestructura de envío de Microsoft está permitida; nadie más”. Plataformas de marketing, sistemas de facturación, CRM y herramientas de mesa de ayuda que envían como `@tuempresa.com` también deben representarse — directo o mediante los `include` que documentan esos proveedores.

Lo difícil no es la sintaxis. Lo difícil es el **inventario**. La mayoría de las organizaciones tiene más remitentes de los que cree:

- Microsoft 365 / Google Workspace (correo principal)
- Herramientas de marketing (boletines, campañas)
- Plataformas de facturación y cobro
- CRM y sistemas de recaudación de fondos
- Notificaciones de RR. HH. / nómina
- Alertas de tickets y monitoreo
- Herramientas “temporales” que alguien conectó hace dos años y olvidó

Si publicas un SPF estricto antes de terminar ese inventario, el correo legítimo empieza a fallar. Si dejas SPF abierto para siempre, los suplantes siguen usando los vacíos. El trabajo es encontrar cada sistema que pone tu dominio en el correo saliente y luego codificar esa realidad en DNS.

### Límites de SPF que debes respetar

SPF tiene techos conocidos. El grande: consultas DNS. Un registro SPF puede disparar una cadena de mecanismos `include:`, y los receptores dejan de evaluar después de demasiadas consultas. Los SPF inflados se rompen de formas misteriosas. La solución no es “agregar un include más y esperar”. Es consolidar, usar los registros recomendados por el proveedor y, a veces, rediseñar qué dominios envían qué correo.

SPF también autentica una identidad de ruta de retorno / sobre que no siempre es idéntica a la dirección Remitente que ven las personas. Esa es una razón por la que SPF solo nunca terminó el problema de la suplantación — y por la que tuvieron que llegar DKIM y DMARC.

Regla práctica: **trata SPF como necesario, nunca suficiente.** Publícalo con cuidado. Manténlo corto. Revísalo cada vez que agregues un SaaS que envíe como tu dominio.

## DKIM: el sello a prueba de manipulación del mensaje

**DKIM (DomainKeys Identified Mail)** adjunta una firma criptográfica a los mensajes salientes. Tu plataforma de envío firma con una clave privada. Tú publicas la clave pública correspondiente en DNS. Los sistemas receptores verifican la firma. Si los encabezados importantes y el cuerpo coinciden con lo firmado, DKIM pasa.

En español sencillo: DKIM es un sello a prueba de manipulación. No solo pregunta “¿qué servidor envió esto?”. Pregunta “¿un firmante autorizado produjo exactamente este mensaje?”.

### Por qué DKIM importa cuando SPF ya existe

El reenvío de correo rompe SPF con frecuencia. Un mensaje va de tu servidor a una lista o a una regla de reenvío; el siguiente salto tiene otra IP; SPF falla aunque el contenido siga siendo tuyo. DKIM puede sobrevivir ese camino si el contenido firmado no se alteró. Esa resiliencia es una razón por la que las estrategias modernas de DMARC se apoyan mucho en la alineación de DKIM en flujos reales.

DKIM también ayuda a la integridad de marca de un modo que SPF no puede. Una firma ligada a tu dominio es evidencia más fuerte para receptores que construyen señales de confianza con el tiempo — incluidos, eventualmente, indicadores de marca que algunas bandejas muestran cuando la aplicación de DMARC es sólida.

### Dónde suele romperse DKIM en mercado medio

- **DKIM de Microsoft 365 no habilitado para dominios personalizados.** Muchos tenants corren años con un comportamiento de firma por defecto que no te da la alineación DKIM de dominio personalizado que crees tener. Alguien marcó una casilla de verificación una vez en una guía de instalación y nunca verificó DNS.
- **Remitentes de terceros sin DKIM.** Tu CRM envía como ustedes con include de SPF pero sin DKIM. Entonces DMARC en modo de aplicación se vuelve un volado según la alineación de SPF.
- **Selectores envejecidos.** Se rotan claves y selectores, quedan restos en DNS, o una migración deja la mitad de tus flujos firmados y la otra sin firmar.
- **Modificación del cuerpo por sistemas intermedios.** Algunos gateways antiguos alteran contenido e invalidan firmas. Eso es un olor de arquitectura, no una razón para saltarse DKIM.

Regla práctica: **cada plataforma que envíe como tus dominios principales debería firmar con DKIM con un dominio alineado** siempre que el proveedor lo soporte. Si un proveedor no puede, aísla ese tráfico en un subdominio con su propia historia de autenticación — no dejes que un SaaS terco mantenga tu dominio apex eternamente en `p=none`.

## DMARC: la política que convierte evidencia en acción

**DMARC (Domain-based Message Authentication, Reporting, and Conformance)** ata SPF y DKIM al dominio del encabezado Remitente visible y le dice a los receptores qué hacer ante una falla. También te da reportes para ver quién está enviando como ustedes: sistemas legítimos que olvidaste, y sistemas hostiles que nunca autorizaste.

### La escalera de políticas

Las políticas DMARC no son un interruptor. Son una escalera:

1. **`p=none` (monitoreo).** Los receptores todavía entregan mensajes que fallan en la mayoría de los casos, pero recibes reportes agregados. Aquí descubres tu inventario real de remitentes.
2. **`p=quarantine`.** Los mensajes que fallan deberían ir a spam/correo no deseado. La suplantación se vuelve mucho más difícil de usar para fraude de transferencias porque la urgencia muere en la carpeta de basura.
3. **`p=reject`.** Los mensajes que fallan deberían rechazarse. Este es el destino para dominios que no deberían poder falsificarse — sobre todo tu dominio corporativo principal.

Pasar de la nada a `p=reject` de un día para otro es cómo rompes la facturación de fin de mes y los boletines de la junta al mismo tiempo. Quedarte en `p=none` tres años porque “seguimos monitoreando” es cómo mantienes un perchero de disfraces para atacantes. La disciplina es aplicación gradual con ojos en los reportes.

### La alineación es todo el juego

DMARC no pregunta “¿pasó algún chequeo relacionado con esta empresa?”. Pregunta si SPF o DKIM pasaron **y** se alinearon con el dominio Remitente. Por eso copiar includes de SPF de un proveedor sin revisar dominios Remitente igual te deja expuesto. También por eso importa la estrategia de subdominios: `mail.marketing.tuempresa.com` puede tener una postura DMARC distinta a `tuempresa.com` mientras limpias herramientas de marketing.

### Los reportes no son decoración opcional

DMARC sin leer reportes es una alarma de humo sin baterías. Los reportes agregados (RUA) muestran volumen por origen. Las muestras forenses/de falla (RUF), donde existan y sean apropiadas en privacidad, pueden ayudar en investigaciones. Para equipos de mercado medio, el hábito semanal se ve así:

- ¿Qué IPs/orígenes están enviando como nosotros?
- ¿Cuáles están autenticados?
- ¿Cuáles fallan, y son nuestros u hostiles?
- ¿Apareció un SaaS nuevo después de que un área compró una herramienta con tarjeta corporativa?

Si nadie es dueño de esa revisión, DMARC se vuelve otro registro DNS que se veía bien en una lista de auditoría y no hizo nada en producción.

## Una escena concreta: cómo sigue funcionando la suplantación cuando la “seguridad del correo” está a medias

Imagina una organización sin fines de lucro con Microsoft 365, MFA activo y un filtro antispam reputado. Su SPF incluye Microsoft. DKIM se “configuró” en la migración. DMARC está en `p=none` con una dirección de reporte que nadie lee.

Un atacante no registra nada sofisticado. Redacta mensajes que afirman venir de la dirección del director de desarrollo en el dominio real de la organización. Como DMARC solo monitorea, muchos sistemas receptores todavía entregan a donantes y miembros de junta. Unos cuantos son cuidadosos. Una persona está ocupada. Un donativo destinado a la organización se desvía. La organización pasa semanas deshaciendo banca, confianza de donantes y una conversación de junta que nunca debió ser necesaria.

Ahora cambia un solo control: DMARC en `p=reject` con DKIM alineado para Microsoft 365 y la plataforma de recaudación de fondos. La misma suplantación falla la autenticación frente a la política. Los receptores la rechazan. El miembro de junta ocupado nunca ve el disfraz.

Esa es la diferencia que hacen estos registros. No teórica. Operativa.

## Lo que esto *no* detiene (para que no compres la comodidad equivocada)

Sé honesto con el liderazgo sobre la cobertura:

- **Los buzones comprometidos** siguen enviando correo autenticado. DMARC no te salva de una cuenta de CFO phisheada. Eso es identidad, protección de sesión, monitoreo de anomalías y respuesta rápida.
- **Los dominios parecidos** (`tuemprsaa.com`, `tuempresa-mail.com`) son otra pelea: monitoreo de marca, alertas de registro, capacitación que enseña a leer dominios con cuidado y filtrado que puntúa imitaciones.
- **Ataques de nombre visible** (“Nombre del CEO” mostrado mientras la dirección real no tiene relación) siguen engañando a lectores apurados cuando el dominio real no está involucrado. Aquí importan la concientización y las advertencias del cliente de correo.
- **El compromiso de un proveedor comercial** puede enviar correo “legítimo” desde un dominio externo de confianza. Tu DMARC no controla su dominio. El riesgo de proveedores y los procedimientos de verificación para cambios de pago siguen importando.

SPF/DKIM/DMARC son cómo evitas que desconocidos usen *tu* dominio. Repite esa frase en los QBR para que el control no se confunda con un programa completo anti-phishing.

## El despliegue de mercado medio que sí funciona

Esta es una secuencia dimensionada para equipos sin un ingeniero dedicado de autenticación del correo.

### Semana 1: Panorama e inventario

- Corre una línea base en tus dominios principales y subdominios clave (apex, `www` si hay rarezas de correo, dominios de marketing, dominios heredados que siguen en firmas).
- Exporta o lista cada sistema que pueda enviar como esos dominios.
- Saca el DNS actual de SPF/DKIM/DMARC. Toma captura. Vas a querer la foto del antes.
- Identifica dueños: quién puede cambiar DNS, quién administra Microsoft 365 / Google, quién es dueño de las herramientas de marketing.

Si quieres una lectura externa rápida, usa la [revisión de seguridad del dominio](/es/services/web-design-development/#site-check). Luego valida con tu propio DNS y centros de administración: las herramientas son un punto de partida, no un sustituto de la realidad del tenant.

### Semanas 2–3: Arreglar las bases de envío

- Habilita y verifica DKIM para dominios personalizados de Microsoft 365 / Google Workspace.
- Corrige SPF para incluir remitentes conocidos sin pasar el límite de consultas.
- Agrega DKIM para los grandes remitentes de terceros donde se soporte.
- Publica o corrige DMARC en `p=none` con reporte a un buzón o servicio que alguien de verdad revise.
- Crea un registro simple de remitentes: sistema, dominio usado, método SPF, selector DKIM, dueño, fecha de verificación.

### Semanas 4–6: Limpiar la cola larga

- Mueve herramientas tercas o parcialmente autenticadas a subdominios dedicados cuando haga falta.
- Detén que el personal use relays SMTP aleatorios “solo para esta campaña”.
- Arregla el SPF inflado. Quita includes muertos.
- Confirma alineación: pasa SPF/DKIM *para el dominio Remitente que te importa*, no para un primo mail-from cualquiera.
- Revisa de dos a cuatro semanas de datos agregados de DMARC. Clasifica orígenes: aprobados, necesitan trabajo, hostiles/desconocidos.

### Semanas 7–10: Aplicar política

- Pasa DMARC a `p=quarantine` cuando los remitentes aprobados estén lo bastante limpios como para que el correo de negocio no desaparezca en silencio hacia no deseados.
- Comunica con finanzas, RR. HH. y recaudación de fondos antes del corte. Ellos sienten primero las fallas de correo.
- Monitorea tickets de mesa de ayuda y reportes DMARC a diario durante una semana.
- Avanza a `p=reject` en el dominio corporativo principal cuando la cuarentena sea aburrida: es decir, las fallas son hostiles o despreciables, no tu plataforma de facturación.

### Continuo: trata DNS como producción

- Cualquier SaaS nuevo que envíe como ustedes pasa por el registro de remitentes antes de salir a producción.
- Revisión trimestral de reportes DMARC y DNS.
- Incluye el estado de autenticación del correo en los QBR de ciberseguridad junto a cobertura MFA y pruebas de restauración de copia de seguridad. Si quieres la postura de reporte que hace útil esa revisión, nuestra nota sobre [TI administrada que reporta como un CIO](/es/blog/managed-it-reports-like-cio/) es el hábito operativo; la línea de DMARC pertenece ahí.
- Cuando retires dominios, no los dejes sin autenticar. Los dominios viejos en libretas de direcciones siguen siendo disfraces suplantes. Estaciónalos con políticas DMARC de tipo denegación apropiadas a “este dominio no debería enviar correo”.

Esto no es una transformación de varios años. Para muchas organizaciones es un proyecto enfocado medido en semanas, y luego un ritmo operativo ligero.

## Patrones de falla comunes que vemos en evaluaciones

**“Microsoft se encarga de la seguridad del correo.”** Microsoft ofrece excelentes bloques de construcción. Tu DNS y tus remitentes de terceros siguen siendo tu problema. Los tenants se pueden configurar bien o mal. La resistencia a la suplantación no es automática porque el logo esté en la factura.

**DMARC eterno en `p=none`.** Monitorear sin aplicar es investigación, no control. A los atacantes no les importa que tus reportes sean fascinantes.

**Includes de SPF copiados de un blog de 2019.** Los proveedores cambian. Los límites de consulta castigan la nostalgia. Actualiza desde la documentación vigente del proveedor.

**TI de marketing y TI corporativa nunca comparten un diagrama.** La plataforma de boletines suele ser la que rompe los plazos de aplicación. Pon a marketing en la primera reunión de inventario, no en la de emergencia después de `p=reject`.

**Solo se protege el dominio apex.** Los atacantes suplantarían `support.`, `billing.`, `mail.`, o un dominio de marca olvidado de una adquisición. Inventaría dominios, no solo el dominio de la página de inicio.

**Sin dueño.** Si los reportes DMARC caen en un buzón compartido que nadie abre, no tienes DMARC. Tienes folklore de TXT.

## Cómo encaja esto en un programa más amplio de ciberseguridad

La autenticación del correo es un muro de carga, no todo el edificio. Combínala con:

- MFA resistente al phishing y acceso condicional en el tenant
- Auditoría de buzones para reglas de reenvío y concesiones de consentimiento
- EDR en endpoints donde todavía empieza el robo de credenciales
- Procedimientos de verificación de cambios de pago que confirmen fuera de banda las actualizaciones bancarias de proveedores
- Disciplina de copia de seguridad y restauración para cuando un incidente no sea “solo correo”

Si estás secuenciando un programa más amplio, empieza por identidad y correo — los dos lugares donde los atacantes de mercado medio todavía logran victorias baratas — y luego amplía con el patrón de [despliegue práctico de Zero Trust](/es/blog/zero-trust-mid-market-rollout/) en lugar de comprar un tablero con marca nueva y darlo por hecho.

Para organizaciones que necesitan esto operado más que explicado, pertenece dentro del trabajo de [ciberseguridad y cumplimiento](/es/services/cybersecurity/): inventario, cambios de DNS, coordinación con proveedores, aplicación de política y monitoreo — dimensionado para equipos que todavía tienen un trabajo de día.

## Una explicación lista para junta en seis oraciones

Si necesitas lenguaje para liderazgo:

El correo se puede falsificar a menos que publiquemos y apliquemos estándares de autenticación. SPF lista qué servidores pueden enviar como nosotros. DKIM firma criptográficamente nuestro correo para que los receptores detecten manipulación y verifiquen autorización. DMARC les dice a los receptores que pongan en cuarentena o rechacen el correo que falle esos chequeos para nuestro dominio, y reporta quién está enviando como nosotros. Primero monitoreamos para no romper facturación y marketing; luego aplicamos para que los criminales no puedan usar nuestro dominio como disfraz. Esto no reemplaza MFA ni la cautela de los usuarios, pero elimina una ruta de fraude que en 2026 ya no deberíamos dejar abierta.

Eso basta para la mayoría de las juntas. El resto es ejecución.

## Por dónde empezar esta semana

1. Revisa SPF, DKIM y DMARC de tu dominio principal — por fuera y en tu centro de administración.
2. Escribe cada sistema que envía como ese dominio.
3. Publica DMARC en `p=none` con reporte si no lo tienes.
4. Arregla la alineación DKIM de Microsoft / Google para dominios personalizados.
5. Agenda la decisión de cuarentena a treinta o sesenta días, con un dueño con nombre y apellido.

No esperes un cuento de hadas de inventario perfecto. Empieza la política de monitoreo, aprende de los reportes, aplica cuando el gráfico sea aburrido.

¿Curioso qué pueden ver ya los externos en tu dominio? Corre la [revisión gratuita de seguridad del dominio](/es/services/web-design-development/#site-check) para SPF, DKIM, DMARC, SSL, higiene DNS y exposición a filtraciones. Si quieres que un humano convierta los hallazgos en un plan de aplicación que no rompa el cierre de mes, [agenda una revisión gratuita de costo y riesgo de 20 minutos](/es/assessment/).

Tu logo no debería ser un disfraz que cualquiera pueda ponerse en la bandeja de entrada de otra persona.

## Fuentes

**[1]** IETF, *Sender Policy Framework (SPF)* — RFC 7208. Resumen: [RFC 7208](https://www.rfc-editor.org/rfc/rfc7208).

**[2]** IETF, *DomainKeys Identified Mail (DKIM) Signatures* — RFC 6376. Resumen: [RFC 6376](https://www.rfc-editor.org/rfc/rfc6376).

**[3]** IETF, *Domain-based Message Authentication, Reporting, and Conformance (DMARC)* — RFC 7489. Resumen: [RFC 7489](https://datatracker.ietf.org/doc/html/rfc7489).

**[4]** FBI Internet Crime Complaint Center (IC3), reportes anuales de pérdidas por compromiso del correo empresarial y suplantación. Resumen: [IC3 annual reports](https://www.ic3.gov/AnnualReport/Reports).

**[5]** Verizon, *Data Breach Investigations Report* (anual). Ingeniería social y fraude impulsado por correo siguen siendo rutas de alta frecuencia hacia pérdida financiera. Resumen: [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/).

---

*Cybercon Solutions ayuda a organizaciones de mercado medio y del Sur de Florida a autenticar su correo — SPF, DKIM y DMARC con aplicación real — para que tu dominio sea más difícil de usar como arma que un logo raspado de tu sitio web.*
