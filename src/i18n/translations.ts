import { Locale } from "@/hooks/useTranslation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations: Record<Locale, Record<string, any>> = {
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      events: "Events",
      projects: "Projects",
      merch: "Merch",
      contactUs: "Contact Us",
      supportUs: "Support Us",
      organizationName: "Active Inland Empire",
    },
    landing: {
      eventCalendars: "Our Event Calendars",
      shopTitle: "Shop Active Inland Empire",
      donate: "Donate",
      volunteer: "Volunteer",
      readBlog: "Read Our Blog",
      contrastTherapyTitle: "Contrast Therapy Pop-Ups",
      contrastTherapyTeaser:
        "We bring mobile cold plunge and contrast therapy pop-up events to gyms, teams, and private events across the Inland Empire — equipment, power, ice, and on-site operation all handled for you.",
      contrastTherapyCta: "View packages & inquire",
    },
    products: {
      title: "Our Products",
      description:
        "Help support Active Inland Empire and our mission to help build community through sport, health, and wellness.",
    },
    events: {
      title: "Join Our Events",
      ourCalendar: "Our Event Calendar",
      sweatpalsCalendar: "Our SweatPals Events Calendar",
      surveyPrompt:
        "We want to hear from you, the community, on how we can best serve you and have our in-person events. By clicking the button below, we can learn how to better serve you to support you on your health journey.",
      takeSurvey: "Take the Program Schedule Survey",
      surveyTitle: "Program Schedule Survey",
      close: "Close",
    },
    projects: {
      title: "Projects",
      description:
        "These are our current ongoing projects and efforts across the Inland Empire.",
      bikeRampTitle: "Bike Ramp Project Update",
      publicCommentTitle: "Public Comment Board",
      publicCommentDescription:
        "Let us know what we should add to the bike park with the comment form below.",
    },
    addc: {
      title: "Anti-Detox Detox Club",
      description: "Get more information about Anti-Detox Detox Club",
    },
    donation: {
      yourProceeds: "Your Proceeds",
      proceedsDescription:
        'While we continue our capacity and program efforts, your contribution helps support our efforts, test, build, and sustain these "third-place" program. Every contribution made we also ask contributors if they want regular updates on the impact their proceeds made.',
      partnerDescription:
        "If you want to partner with us to help build a better, healthier, and safer Inland Empire you can contribute to our General Contribution Fund. Monthly we look to allocate 10% of the proceeds given to be used on the other efforts listed below.",
      additionalBenefits:
        "Additional Benefits to Setting up Monthly, Quarterly, or Annual Contributions",
      directImpact:
        "If you are looking to make a direct impact with a specific effort we are supporting here are the projects we are assisting with.",
    },
    contact: {
      inquiries: "Inquiries:",
      email: "organization@activeie.org",
    },
    support: {
      sponsorshipTitle: "Interested in Sponsorship?",
      sponsorshipDescription:
        "In the health and wellness space and looking to grow your brand? Expand with us!",
      getInTouch: "Get in touch",
    },
    volunteer: {
      description:
        "Want to work our events or be a part of our organization? Fill out the form below to express your interest.",
    },
    footer: {
      nonprofitInfo:
        "Active: Inland Empire Inc is a 501(c)(3) non-profit organization",
      ein: "Federal EIN 33-1746388 - All donations are tax-deductible",
      moreInfo:
        "More information is available on our Guidestar page or by opening an inquiry at",
    },
    common: {
      scrollToContinue: "Scroll to continue",
      loading: "Loading...",
      loadingInstagram: "Loading Instagram post...",
      loadingFundraiser: "Loading fundraiser...",
      ourBlog: "Our Blog",
      activeInlandEmpire: "Active Inland Empire",
      viewOnGofundme: "View on GoFundMe",
      close: "Close",
      home: "Home",
    },
    burnchart: {
      bikeParkFunding: "Bike Park Funding",
      goalCappedAt20k: "Goal (Capped at $20k)",
      amountRaised: "Amount Raised",
      currentTotal: "Current Total",
      goal: "Goal",
      fundingSourcesBreakdown: "Funding Sources Breakdown",
      government: "Government",
      grants: "Grants",
      fundraising: "Fundraising",
      sponsors: "Sponsors",
      dashboardNote:
        "Note: This dashboard gets regular updates every 12-24 hours.",
    },
    specialEvent: {
      joinOurCommunity: "Join Our Community",
      wantToWorkEvents:
        "Want to work our events or be a part of our organization?",
      clickToSubscribe: "Click here to subscribe to our newsletter.",
      newsletterSubscribe: "Newsletter Subscribe",
      ourEventCalendar: "Our Event Calendar",
      popOutWindowDescription:
        "By selecting the pup-out window option from the image below you will be taken to the file hosted on Google Drive to provide feedback on the bike ramp project. Have a voice in the planning of the project. You must be signed in to a registered Google account to participate.",
    },
    privacy: {
      title: "Privacy Policy",
      content:
        "All Active Inland Empire events will have photos and videos taken during participation. Active Inland Empire reserves the right to reuse and distribute material in our marketing, grant reporting, and social media channels. Request for removal can be sent to organization@activeie.org. Surveys and content written by willing participants will remain confidential and will abide by California privacy laws. No information provided through such surveys will be retained long-term by Active Inland Empire. You will only be reached out to by event and support profiles directly from the organization.",
    },
    contrastTherapy: {
      logoAlt: "Active Inland Empire shield logo",
      subtitle: "Contrast Therapy Services — Mobile Cold Plunge & Recovery",
      contactWebsite: "activeie.org",
      contactLocation: "Rancho Cucamonga, California",
      metaLine:
        "Pricing Sheet • Effective June 2026 • Prices valid 30 days from quote",
      intro:
        "Mobile contrast therapy — cold plunge and recovery setups delivered, set up, and operated at your location. Every package includes equipment, generator power, fuel, and ice. Choose on-site water (we pump from your source) or let us bring the water to you.",
      packagesHeading: "Packages (per event / per day)",
      pkgSingle: "Single Plunge",
      pkgParty: "Party Plunge",
      pkgCustom: "Custom / Large",
      gallonsSingle: "100 gallons",
      gallonsParty: "400 gallons",
      gallonsCustom: "400+ gallons",
      waterOnSiteCaption: "Water available on-site",
      weBringCaption: "We bring the water",
      customNoteLead: "Custom / Large events:",
      customNoteBody:
        "beyond 400 gallons, add $200 per additional 400-gallon increment. Large volumes include us bringing the water.",
      includesHeading: "What every package includes",
      includes1: "Delivery, setup & breakdown at your location",
      includes2: "Cold plunge / contrast therapy equipment rental",
      includes3: "On-site generator power for the full event",
      includes4: "Generator & pump fuel",
      includes5: "Ice & ice delivery, sized to your plunge volume",
      includes6: "On-site operation & water management during the event",
      waterHeading: "Water options",
      waterColOption: "Option",
      waterColMeaning: "What it means",
      waterColPricing: "Pricing",
      waterOnSiteOption: "Water on-site",
      waterOnSiteMeaning: "We fill on location.",
      waterOnSitePricing: "Base package price",
      waterBringOption: "We bring the water",
      waterBringMeaning:
        "No usable water at the venue. We haul water in by truck and trailer and fill on arrival.",
      waterBringPricing: "Base + $200",
      depositHeading: "Deposit & booking terms",
      depositTerms:
        "A 50% deposit of the total reserves your date; the balance is due the day of the event before setup. Deposits are refundable up to 7 days out, then may be applied to a rescheduled date.",
      depositColPackage: "Package",
      depositColTotal: "Total",
      depositColDeposit: "50% deposit",
      depositColBalance: "Balance due",
      depositRowSingleOnSite: "Single Plunge — on-site water",
      depositRowSingleBring: "Single Plunge — we bring water",
      depositRowPartyOnSite: "Party Plunge — on-site water",
      depositRowPartyBring: "Party Plunge — we bring water",
      finePrint: "Mileage beyond the local service area may add $0.29/mile.",
      videoComingSoon: "Video coming soon",
      photoComingSoon: "Photo coming soon",
      form: {
        heading: "Book your event / Inquire",
        intro:
          "Tell us about your event and we'll get back to you with availability and a quote.",
        requiredNote: "* Required fields",
        nameLabel: "Name",
        emailLabel: "Email",
        phoneLabel: "Phone",
        eventDateLabel: "Event date",
        eventLocationLabel: "Event location / city",
        packageLabel: "Package interest",
        messageLabel: "Message",
        optionSingle: "Single Plunge",
        optionParty: "Party Plunge",
        optionCustom: "Custom / Large",
        optionNotSure: "Not sure",
        errorNameRequired: "Please enter your name.",
        errorEmailRequired: "Please enter your email address.",
        errorEmailInvalid: "Please enter a valid email address.",
        errorMessageRequired:
          "Please include a short message about your event.",
        submit: "Send inquiry",
        sending: "Sending…",
        successTitle: "Thank you — your inquiry has been sent.",
        successBody:
          "We'll get back to you as soon as possible at the email you provided.",
        errorSubmit:
          "Something went wrong and your inquiry was not sent. Please try again, or email us directly at",
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      blog: "Blog",
      events: "Eventos",
      projects: "Proyectos",
      merch: "Mercancía",
      contactUs: "Contáctenos",
      supportUs: "Apóyenos",
      organizationName: "Active Inland Empire",
    },
    landing: {
      eventCalendars: "Nuestros Calendarios de Eventos",
      shopTitle: "Compra Active Inland Empire",
      donate: "Donar",
      volunteer: "Voluntario",
      readBlog: "Lee Nuestro Blog",
      contrastTherapyTitle: "Pop-Ups de Terapia de Contraste",
      contrastTherapyTeaser:
        "Llevamos eventos pop-up móviles de inmersión en frío y terapia de contraste a gimnasios, equipos y eventos privados en todo el Inland Empire — equipo, energía, hielo y operación en el sitio, todo a nuestro cargo.",
      contrastTherapyCta: "Ver paquetes y consultar",
    },
    products: {
      title: "Nuestros Productos",
      description:
        "Ayuda a apoyar Active Inland Empire y nuestra misión de construir comunidad a través del deporte, la salud y el bienestar.",
    },
    events: {
      title: "Únete a Nuestros Eventos",
      ourCalendar: "Nuestro Calendario de Eventos",
      sweatpalsCalendar: "Nuestro Calendario de Eventos SweatPals",
      surveyPrompt:
        "Queremos escuchar de ti, la comunidad, sobre cómo podemos servirte mejor y realizar nuestros eventos en persona. Al hacer clic en el botón a continuación, podemos aprender cómo servirte mejor para apoyarte en tu viaje de salud.",
      takeSurvey: "Tomar la Encuesta de Horario del Programa",
      surveyTitle: "Encuesta de Horario del Programa",
      close: "Cerrar",
    },
    projects: {
      title: "Proyectos",
      description:
        "Estos son nuestros proyectos y esfuerzos actuales en todo el Inland Empire.",
      bikeRampTitle: "Actualización del Proyecto de Rampa para Bicicletas",
      publicCommentTitle: "Tablero de Comentarios Públicos",
      publicCommentDescription:
        "Déjanos saber qué deberíamos agregar al parque de bicicletas con el formulario de comentarios a continuación.",
    },
    addc: {
      title: "Club Anti-Detox Detox",
      description: "Obtén más información sobre el Club Anti-Detox Detox",
    },
    donation: {
      yourProceeds: "Tus Contribuciones",
      proceedsDescription:
        'Mientras continuamos nuestros esfuerzos de capacidad y programa, tu contribución ayuda a apoyar nuestros esfuerzos, probar, construir y sostener estos programas de "tercer lugar". Cada contribución realizada también preguntamos a los contribuyentes si desean actualizaciones regulares sobre el impacto que tuvieron sus contribuciones.',
      partnerDescription:
        "Si quieres asociarte con nosotros para ayudar a construir un Inland Empire mejor, más saludable y más seguro, puedes contribuir a nuestro Fondo de Contribución General. Mensualmente buscamos asignar el 10% de las contribuciones dadas para ser utilizadas en los otros esfuerzos enumerados a continuación.",
      additionalBenefits:
        "Beneficios Adicionales al Configurar Contribuciones Mensuales, Trimestrales o Anuales",
      directImpact:
        "Si estás buscando tener un impacto directo con un esfuerzo específico que estamos apoyando, aquí están los proyectos con los que estamos ayudando.",
    },
    contact: {
      inquiries: "Consultas:",
      email: "organization@activeie.org",
    },
    support: {
      sponsorshipTitle: "¿Interesado en Patrocinio?",
      sponsorshipDescription:
        "¿Estás en el espacio de salud y bienestar y buscas hacer crecer tu marca? ¡Expande con nosotros!",
      getInTouch: "Ponte en contacto",
    },
    volunteer: {
      description:
        "¿Quieres trabajar en nuestros eventos o ser parte de nuestra organización? Completa el formulario a continuación para expresar tu interés.",
    },
    footer: {
      nonprofitInfo:
        "Active: Inland Empire Inc es una organización sin fines de lucro 501(c)(3)",
      ein: "EIN Federal 33-1746388 - Todas las donaciones son deducibles de impuestos",
      moreInfo:
        "Más información está disponible en nuestra página de Guidestar o abriendo una consulta en",
    },
    common: {
      scrollToContinue: "Desplázate para continuar",
      loading: "Cargando...",
      loadingInstagram: "Cargando publicación de Instagram...",
      loadingFundraiser: "Cargando recaudación de fondos...",
      ourBlog: "Nuestro Blog",
      activeInlandEmpire: "Active Inland Empire",
      viewOnGofundme: "Ver en GoFundMe",
      close: "Cerrar",
      home: "Inicio",
    },
    burnchart: {
      bikeParkFunding: "Financiamiento del Parque de Bicicletas",
      goalCappedAt20k: "Meta (Limitada a $20k)",
      amountRaised: "Cantidad Recaudada",
      currentTotal: "Total Actual",
      goal: "Meta",
      fundingSourcesBreakdown: "Desglose de Fuentes de Financiamiento",
      government: "Gobierno",
      grants: "Subvenciones",
      fundraising: "Recaudación de Fondos",
      sponsors: "Patrocinadores",
      dashboardNote:
        "Nota: Este panel se actualiza regularmente cada 12-24 horas.",
    },
    specialEvent: {
      joinOurCommunity: "Únete a Nuestra Comunidad",
      wantToWorkEvents:
        "¿Quieres trabajar en nuestros eventos o ser parte de nuestra organización?",
      clickToSubscribe: "Haz clic aquí para suscribirte a nuestro boletín.",
      newsletterSubscribe: "Suscribirse al Boletín",
      ourEventCalendar: "Nuestro Calendario de Eventos",
      popOutWindowDescription:
        "Al seleccionar la opción de ventana emergente de la imagen a continuación, serás llevado al archivo alojado en Google Drive para proporcionar comentarios sobre el proyecto de rampa para bicicletas. Ten voz en la planificación del proyecto. Debes iniciar sesión en una cuenta de Google registrada para participar.",
    },
    privacy: {
      title: "Política de Privacidad",
      content:
        "Todos los eventos de Active Inland Empire tendrán fotos y videos tomados durante la participación. Active Inland Empire se reserva el derecho de reutilizar y distribuir material en nuestros canales de marketing, informes de subvenciones y redes sociales. Las solicitudes de eliminación se pueden enviar a organization@activeie.org. Las encuestas y el contenido escrito por participantes voluntarios permanecerán confidenciales y cumplirán con las leyes de privacidad de California. Ninguna información proporcionada a través de dichas encuestas será retenida a largo plazo por Active Inland Empire. Solo serás contactado por perfiles de eventos y soporte directamente de la organización.",
    },
    contrastTherapy: {
      logoAlt: "Logotipo del escudo de Active Inland Empire",
      subtitle:
        "Servicios de Terapia de Contraste — Inmersión en Frío Móvil y Recuperación",
      contactWebsite: "activeie.org",
      contactLocation: "Rancho Cucamonga, California",
      metaLine:
        "Hoja de Precios • Vigente desde junio de 2026 • Precios válidos por 30 días desde la cotización",
      intro:
        "Terapia de contraste móvil — equipos de inmersión en frío y recuperación entregados, instalados y operados en tu ubicación. Cada paquete incluye equipo, energía de generador, combustible y hielo. Elige agua en el sitio (bombeamos desde tu fuente) o deja que nosotros llevemos el agua.",
      packagesHeading: "Paquetes (por evento / por día)",
      pkgSingle: "Inmersión Individual",
      pkgParty: "Inmersión para Fiestas",
      pkgCustom: "Personalizado / Grande",
      gallonsSingle: "100 galones",
      gallonsParty: "400 galones",
      gallonsCustom: "400+ galones",
      waterOnSiteCaption: "Agua disponible en el sitio",
      weBringCaption: "Nosotros llevamos el agua",
      customNoteLead: "Eventos personalizados / grandes:",
      customNoteBody:
        "más allá de 400 galones, agrega $200 por cada incremento adicional de 400 galones. Los volúmenes grandes incluyen que nosotros llevemos el agua.",
      includesHeading: "Qué incluye cada paquete",
      includes1: "Entrega, instalación y desmontaje en tu ubicación",
      includes2:
        "Alquiler de equipo de inmersión en frío / terapia de contraste",
      includes3: "Energía de generador en el sitio durante todo el evento",
      includes4: "Combustible para el generador y la bomba",
      includes5: "Hielo y entrega de hielo, según el volumen de tu inmersión",
      includes6: "Operación en el sitio y manejo del agua durante el evento",
      waterHeading: "Opciones de agua",
      waterColOption: "Opción",
      waterColMeaning: "Qué significa",
      waterColPricing: "Precio",
      waterOnSiteOption: "Agua en el sitio",
      waterOnSiteMeaning: "Llenamos en el lugar.",
      waterOnSitePricing: "Precio base del paquete",
      waterBringOption: "Nosotros llevamos el agua",
      waterBringMeaning:
        "No hay agua utilizable en el lugar. Transportamos el agua en camión y remolque y llenamos al llegar.",
      waterBringPricing: "Base + $200",
      depositHeading: "Términos de depósito y reserva",
      depositTerms:
        "Un depósito del 50% del total reserva tu fecha; el saldo se paga el día del evento antes de la instalación. Los depósitos son reembolsables hasta 7 días antes; después pueden aplicarse a una fecha reprogramada.",
      depositColPackage: "Paquete",
      depositColTotal: "Total",
      depositColDeposit: "Depósito del 50%",
      depositColBalance: "Saldo pendiente",
      depositRowSingleOnSite: "Inmersión Individual — agua en el sitio",
      depositRowSingleBring: "Inmersión Individual — nosotros llevamos el agua",
      depositRowPartyOnSite: "Inmersión para Fiestas — agua en el sitio",
      depositRowPartyBring:
        "Inmersión para Fiestas — nosotros llevamos el agua",
      finePrint:
        "El millaje fuera del área de servicio local puede agregar $0.29 por milla.",
      videoComingSoon: "Video próximamente",
      photoComingSoon: "Foto próximamente",
      form: {
        heading: "Reserva tu evento / Consulta",
        intro:
          "Cuéntanos sobre tu evento y te responderemos con disponibilidad y una cotización.",
        requiredNote: "* Campos obligatorios",
        nameLabel: "Nombre",
        emailLabel: "Correo electrónico",
        phoneLabel: "Teléfono",
        eventDateLabel: "Fecha del evento",
        eventLocationLabel: "Lugar del evento / ciudad",
        packageLabel: "Paquete de interés",
        messageLabel: "Mensaje",
        optionSingle: "Inmersión Individual",
        optionParty: "Inmersión para Fiestas",
        optionCustom: "Personalizado / Grande",
        optionNotSure: "No estoy seguro",
        errorNameRequired: "Por favor ingresa tu nombre.",
        errorEmailRequired: "Por favor ingresa tu correo electrónico.",
        errorEmailInvalid: "Por favor ingresa un correo electrónico válido.",
        errorMessageRequired:
          "Por favor incluye un mensaje breve sobre tu evento.",
        submit: "Enviar consulta",
        sending: "Enviando…",
        successTitle: "Gracias — tu consulta ha sido enviada.",
        successBody:
          "Te responderemos lo antes posible al correo que proporcionaste.",
        errorSubmit:
          "Algo salió mal y tu consulta no fue enviada. Por favor intenta de nuevo, o escríbenos directamente a",
      },
    },
  },
  tl: {
    nav: {
      home: "Tahanan",
      blog: "Blog",
      events: "Mga Kaganapan",
      projects: "Mga Proyekto",
      merch: "Mga Produkto",
      contactUs: "Makipag-ugnayan",
      supportUs: "Suportahan Kami",
      organizationName: "Active Inland Empire",
    },
    landing: {
      eventCalendars: "Aming Mga Kalendaryo ng Kaganapan",
      shopTitle: "Bumili sa Active Inland Empire",
      donate: "Mag-donate",
      volunteer: "Magboluntaryo",
      readBlog: "Basahin ang Aming Blog",
      contrastTherapyTitle: "Contrast Therapy Pop-Ups",
      contrastTherapyTeaser:
        "Nagdadala kami ng mobile cold plunge at contrast therapy pop-up events sa mga gym, team, at pribadong kaganapan sa buong Inland Empire — kagamitan, kuryente, yelo, at operasyon sa site, kami na ang bahala.",
      contrastTherapyCta: "Tingnan ang mga package at magtanong",
    },
    products: {
      title: "Aming Mga Produkto",
      description:
        "Tumulong na suportahan ang Active Inland Empire at ang aming misyon na bumuo ng komunidad sa pamamagitan ng palakasan, kalusugan, at wellness.",
    },
    events: {
      title: "Sumali sa Aming Mga Kaganapan",
      ourCalendar: "Aming Kalendaryo ng Kaganapan",
      sweatpalsCalendar: "Aming SweatPals Kalendaryo ng Kaganapan",
      surveyPrompt:
        "Gusto naming marinig mula sa iyo, ang komunidad, kung paano kami makakapaglingkod sa iyo nang mas mahusay at magkaroon ng aming mga personal na kaganapan. Sa pag-click sa button sa ibaba, matututunan namin kung paano ka mas mahusay na paglingkuran upang suportahan ka sa iyong paglalakbay sa kalusugan.",
      takeSurvey: "Kunin ang Survey ng Iskedyul ng Programa",
      surveyTitle: "Survey ng Iskedyul ng Programa",
      close: "Isara",
    },
    projects: {
      title: "Mga Proyekto",
      description:
        "Ito ang aming kasalukuyang mga proyekto at pagsisikap sa buong Inland Empire.",
      bikeRampTitle: "Pagbabago sa Proyekto ng Rampa ng Bisikleta",
      publicCommentTitle: "Lupon ng Pampublikong Komento",
      publicCommentDescription:
        "Ipaalam sa amin kung ano ang dapat naming idagdag sa bike park sa pamamagitan ng form ng komento sa ibaba.",
    },
    addc: {
      title: "Anti-Detox Detox Club",
      description:
        "Kumuha ng higit pang impormasyon tungkol sa Anti-Detox Detox Club",
    },
    donation: {
      yourProceeds: "Ang Iyong Mga Kontribusyon",
      proceedsDescription:
        'Habang ipinagpapatuloy namin ang aming mga pagsisikap sa kapasidad at programa, ang iyong kontribusyon ay tumutulong na suportahan ang aming mga pagsisikap, subukan, bumuo, at panatilihin ang mga programang "third-place" na ito. Bawat kontribusyon na ginawa, tinatanong din namin ang mga nag-ambag kung gusto nila ng regular na mga update sa epekto ng kanilang mga kontribusyon.',
      partnerDescription:
        "Kung gusto mong makipagtulungan sa amin upang tumulong na bumuo ng mas mahusay, mas malusog, at mas ligtas na Inland Empire, maaari kang mag-ambag sa aming General Contribution Fund. Buwanang naglalaan kami ng 10% ng mga kontribusyong ibinigay upang magamit sa iba pang mga pagsisikap na nakalista sa ibaba.",
      additionalBenefits:
        "Karagdagang Benepisyo sa Pag-setup ng Buwanang, Quarterly, o Taunang Kontribusyon",
      directImpact:
        "Kung naghahanap ka ng direktang epekto sa isang partikular na pagsisikap na sinusuportahan namin, narito ang mga proyektong tinutulungan namin.",
    },
    contact: {
      inquiries: "Mga Katanungan:",
      email: "organization@activeie.org",
    },
    support: {
      sponsorshipTitle: "Interesado sa Sponsorship?",
      sponsorshipDescription:
        "Nasa larangan ng kalusugan at wellness at gustong palakasin ang iyong brand? Lumaki kasama namin!",
      getInTouch: "Makipag-ugnayan",
    },
    volunteer: {
      description:
        "Gusto mo bang magtrabaho sa aming mga kaganapan o maging bahagi ng aming organisasyon? Punan ang form sa ibaba upang ipahayag ang iyong interes.",
    },
    footer: {
      nonprofitInfo:
        "Ang Active: Inland Empire Inc ay isang 501(c)(3) non-profit organization",
      ein: "Federal EIN 33-1746388 - Lahat ng donasyon ay tax-deductible",
      moreInfo:
        "Ang higit pang impormasyon ay available sa aming Guidestar page o sa pamamagitan ng pagbubukas ng inquiry sa",
    },
    common: {
      scrollToContinue: "Mag-scroll upang magpatuloy",
      loading: "Naglo-load...",
      loadingInstagram: "Naglo-load ng Instagram post...",
      loadingFundraiser: "Naglo-load ng fundraiser...",
      ourBlog: "Aming Blog",
      activeInlandEmpire: "Active Inland Empire",
      viewOnGofundme: "Tingnan sa GoFundMe",
      close: "Isara",
      home: "Tahanan",
    },
    burnchart: {
      bikeParkFunding: "Pagpopondo ng Bike Park",
      goalCappedAt20k: "Layunin (Limitado sa $20k)",
      amountRaised: "Halagang Nakolekta",
      currentTotal: "Kasalukuyang Kabuuan",
      goal: "Layunin",
      fundingSourcesBreakdown: "Detalye ng mga Pinagmumulan ng Pondo",
      government: "Gobyerno",
      grants: "Mga Grant",
      fundraising: "Pagkolekta ng Pondo",
      sponsors: "Mga Sponsor",
      dashboardNote:
        "Paalala: Ang dashboard na ito ay regular na nag-update bawat 12-24 oras.",
    },
    specialEvent: {
      joinOurCommunity: "Sumali sa Aming Komunidad",
      wantToWorkEvents:
        "Gusto mo bang magtrabaho sa aming mga kaganapan o maging bahagi ng aming organisasyon?",
      clickToSubscribe:
        "Mag-click dito upang mag-subscribe sa aming newsletter.",
      newsletterSubscribe: "Mag-subscribe sa Newsletter",
      ourEventCalendar: "Aming Kalendaryo ng Kaganapan",
      popOutWindowDescription:
        "Sa pagpili ng pop-out window option mula sa larawan sa ibaba, dadalhin ka sa file na naka-host sa Google Drive upang magbigay ng feedback sa bike ramp project. Magkaroon ng boses sa pagpaplano ng proyekto. Dapat kang naka-sign in sa isang rehistradong Google account upang makilahok.",
    },
    privacy: {
      title: "Patakaran sa Privacy",
      content:
        "Lahat ng mga kaganapan ng Active Inland Empire ay magkakaroon ng mga larawan at video na kinuha sa panahon ng paglahok. Ang Active Inland Empire ay naglalaan ng karapatan na muling gamitin at ipamahagi ang materyales sa aming marketing, grant reporting, at social media channels. Ang kahilingan para sa pag-alis ay maaaring ipadala sa organization@activeie.org. Ang mga survey at nilalaman na isinulat ng mga kusang kalahok ay mananatiling kumpidensyal at susundin ang mga batas sa privacy ng California. Walang impormasyong ibinigay sa pamamagitan ng mga survey na ito na itatago ng matagal ng Active Inland Empire. Makikipag-ugnayan lamang sa iyo ang mga profile ng kaganapan at suporta direkta mula sa organisasyon.",
    },
    contrastTherapy: {
      logoAlt: "Shield logo ng Active Inland Empire",
      subtitle:
        "Mga Serbisyo ng Contrast Therapy — Mobile Cold Plunge at Recovery",
      contactWebsite: "activeie.org",
      contactLocation: "Rancho Cucamonga, California",
      metaLine:
        "Listahan ng Presyo • Simula Hunyo 2026 • May bisa ang presyo sa loob ng 30 araw mula sa quote",
      intro:
        "Mobile contrast therapy — mga cold plunge at recovery setup na inihahatid, ini-set up, at pinapatakbo sa iyong lokasyon. Kasama sa bawat package ang kagamitan, kuryente mula sa generator, gasolina, at yelo. Piliin ang tubig mula sa site (magbobomba kami mula sa iyong pinagkukunan) o hayaang kami ang magdala ng tubig sa iyo.",
      packagesHeading: "Mga Package (bawat kaganapan / bawat araw)",
      pkgSingle: "Single Plunge",
      pkgParty: "Party Plunge",
      pkgCustom: "Custom / Malaki",
      gallonsSingle: "100 galon",
      gallonsParty: "400 galon",
      gallonsCustom: "400+ galon",
      waterOnSiteCaption: "May tubig sa mismong lugar",
      weBringCaption: "Kami ang magdadala ng tubig",
      customNoteLead: "Custom / malalaking kaganapan:",
      customNoteBody:
        "lampas sa 400 galon, magdagdag ng $200 para sa bawat karagdagang 400 galon. Kasama na sa malalaking volume ang pagdadala namin ng tubig.",
      includesHeading: "Ano ang kasama sa bawat package",
      includes1: "Paghahatid, pag-set up, at pag-baklas sa iyong lokasyon",
      includes2: "Rental ng cold plunge / contrast therapy equipment",
      includes3: "Generator power sa site sa buong kaganapan",
      includes4: "Gasolina para sa generator at bomba",
      includes5: "Yelo at paghahatid ng yelo, ayon sa laki ng iyong plunge",
      includes6:
        "Operasyon sa site at pamamahala ng tubig habang may kaganapan",
      waterHeading: "Mga opsyon sa tubig",
      waterColOption: "Opsyon",
      waterColMeaning: "Ano ang ibig sabihin",
      waterColPricing: "Presyo",
      waterOnSiteOption: "Tubig sa site",
      waterOnSiteMeaning: "Kami ang maglalagay ng tubig sa mismong lugar.",
      waterOnSitePricing: "Batayang presyo ng package",
      waterBringOption: "Kami ang magdadala ng tubig",
      waterBringMeaning:
        "Walang magagamit na tubig sa venue. Maghahakot kami ng tubig gamit ang truck at trailer at maglalagay pagdating.",
      waterBringPricing: "Base + $200",
      depositHeading: "Mga tuntunin sa deposito at booking",
      depositTerms:
        "Ang 50% deposito ng kabuuan ang nagre-reserba ng iyong petsa; ang balanse ay babayaran sa araw ng kaganapan bago ang setup. Ang deposito ay maaaring i-refund hanggang 7 araw bago ang kaganapan; pagkatapos nito, maaari itong ilipat sa bagong petsa.",
      depositColPackage: "Package",
      depositColTotal: "Kabuuan",
      depositColDeposit: "50% deposito",
      depositColBalance: "Balanseng babayaran",
      depositRowSingleOnSite: "Single Plunge — tubig sa site",
      depositRowSingleBring: "Single Plunge — kami ang magdadala ng tubig",
      depositRowPartyOnSite: "Party Plunge — tubig sa site",
      depositRowPartyBring: "Party Plunge — kami ang magdadala ng tubig",
      finePrint:
        "Ang milyahe lampas sa lokal na service area ay maaaring magdagdag ng $0.29 bawat milya.",
      videoComingSoon: "Malapit nang dumating ang video",
      photoComingSoon: "Malapit nang dumating ang larawan",
      form: {
        heading: "I-book ang iyong kaganapan / Magtanong",
        intro:
          "Ikuwento sa amin ang iyong kaganapan at babalikan ka namin tungkol sa availability at presyo.",
        requiredNote: "* Mga kinakailangang field",
        nameLabel: "Pangalan",
        emailLabel: "Email",
        phoneLabel: "Telepono",
        eventDateLabel: "Petsa ng kaganapan",
        eventLocationLabel: "Lokasyon ng kaganapan / lungsod",
        packageLabel: "Package na interesado ka",
        messageLabel: "Mensahe",
        optionSingle: "Single Plunge",
        optionParty: "Party Plunge",
        optionCustom: "Custom / Malaki",
        optionNotSure: "Hindi pa sigurado",
        errorNameRequired: "Pakilagay ang iyong pangalan.",
        errorEmailRequired: "Pakilagay ang iyong email address.",
        errorEmailInvalid: "Pakilagay ang wastong email address.",
        errorMessageRequired:
          "Pakilagay ang maikling mensahe tungkol sa iyong kaganapan.",
        submit: "Ipadala ang katanungan",
        sending: "Ipinapadala…",
        successTitle: "Salamat — naipadala na ang iyong katanungan.",
        successBody:
          "Babalikan ka namin sa lalong madaling panahon sa email na ibinigay mo.",
        errorSubmit:
          "May problemang naganap at hindi naipadala ang iyong katanungan. Pakisubukang muli, o mag-email nang direkta sa",
      },
    },
  },
};
