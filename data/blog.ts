/* ─────────────────────────────────────────────────────────────────────────────
 *  BLOG — Casos de Interés LegalTech
 *  Cada BlogPost representa un caso real analizado desde la óptica jurídica,
 *  técnica y del cambio que propone el movimiento LegalTech.
 * ───────────────────────────────────────────────────────────────────────────── */

export type RiskLevel = "alto" | "medio" | "bajo";
export type Category =
  | "Ciberseguridad"
  | "Blockchain"
  | "Inteligencia Artificial"
  | "Privacidad y Datos"
  | "Fintech"
  | "Regulación"
  | "Contratos Digitales"
  | "Acceso a la Justicia";

export interface BlogSection {
  /** Número de sección: "01", "02", … */
  number: string;
  /** Etiqueta corta (ej. "Resumen Ejecutivo") */
  label: string;
  /** Título completo de la sección */
  title: string;
  /** Párrafo(s) de contenido */
  content: string;
  /** Lista de ítems opcionales (ej. acciones de respuesta, recomendaciones) */
  bullets?: string[];
}

export interface BlogTimeline {
  date: string;
  event: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Frase de una línea que complementa el título */
  subtitle: string;
  /** ISO date string: "2026-04-20" */
  date: string;
  category: Category;
  tags: string[];
  riskLevel: RiskLevel;
  /** Color acento coherente con la paleta del sistema */
  color: string;
  /** Resumen ejecutivo de máx. 3 frases — aparece en la tarjeta del listado */
  excerpt: string;
  sections: BlogSection[];
  timeline?: BlogTimeline[];
  /** 3–5 conclusiones clave para el operador jurídico / LegalTech */
  keyTakeaways?: string[];
  /** Marco normativo colombiano o internacional relevante */
  legalFramework?: string;
  /** Fuentes y referencias del caso */
  sources?: string[];
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  CASOS
 * ───────────────────────────────────────────────────────────────────────────── */

export const blogPosts: BlogPost[] = [
    /* ── CASO 1 ──────────────────────────────────────────────────────────────── */
  {
    slug: "hack-vercel-cadena-suministro-2026",
    title: "Hack en Vercel expone credenciales de millones de frontends",
    subtitle: "El vector de ataque que nadie vio venir: de un script de Roblox a una crisis global",
    date: "2026-04-19",
    category: "Ciberseguridad",
    tags: ["cadena de suministro", "OAuth", "shadow AI", "criptomonedas", "Web3", "malware", "Vercel"],
    riskLevel: "alto",
    color: "#EF4444",
    excerpt:
      "Un empleado descarga un auto-farm de Roblox infectado con el malware Lumma Stealer. Meses después, un atacante exige USD $2 millones a Vercel con datos de claves API, código fuente y tokens de millones de proyectos web — incluyendo DeFi y wallets cripto. El caso ilustra cómo una sola concesión de permisos OAuth puede convertirse en el eslabón débil de toda una cadena empresarial.",
    sections: [
      {
        number: "01",
        label: "Resumen Ejecutivo",
        title: "El vector de ataque que nadie vio venir",
        content:
          "La brecha de seguridad que sufrió Vercel (la plataforma de despliegue web que impulsa millones de sitios, incluyendo incontables aplicaciones Web3 y de criptomonedas) el 19 de abril de 2026, ha sido catalogada como uno de los incidentes de cadena de suministro más graves y sofisticados del año.\n\nLa intrusión comenzó con la descarga de un \"auto-farm script\" para un videojuego por parte de un empleado de una pequeña startup de IA, y culminó con un atacante exigiendo un rescate de USD $2 millones por datos que incluyen claves API, código fuente y tokens de despliegue de clientes de Vercel. El incidente puso de manifiesto la fragilidad de la confianza en las integraciones de software modernas, especialmente a través de OAuth, y provocó una respuesta de emergencia en todo el ecosistema cripto para proteger interfaces de usuario y fondos.",
      },
      {
        number: "02",
        label: "El Punto de Origen",
        title: "De un script de Roblox a un desastre empresarial",
        content:
          "La cadena de ataque no comenzó en Vercel, sino meses antes en un contexto completamente inesperado: una infección de malware en un empleado de Context.ai, una pequeña empresa que ofrece un \"AI Office Suite\".\n\nEl Paciente Cero: En febrero de 2026, un empleado de Context.ai fue infectado con el malware Lumma Stealer. El vector de infección fue singular: según la firma de ciberseguridad Hudson Rock, el empleado estaba buscando y descargando activamente scripts de \"auto-farm\" para el videojuego Roblox, un conocido canal de distribución para infostealers.\n\nEl Botín Robado: El malware Lumma Stealer robó todas las credenciales almacenadas en la máquina del empleado, incluyendo credenciales de Google Workspace de Context.ai, así como claves de acceso a Supabase, Datadog y Authkit. Entre las cuentas comprometidas se encontraba el núcleo del equipo de desarrollo, como la cuenta support@context.ai.\n\nEl Ascenso del Atacante: Con estas credenciales, en marzo de 2026, los atacantes accedieron al entorno de AWS de Context.ai. Una vez dentro, descubrieron que Context.ai operaba como una aplicación OAuth de Google Workspace, lo que significa que sus clientes le habían otorgado permisos para acceder a sus propias cuentas de Google.\n\nConclusión Clave: El atacante pasó de robar credenciales de un videojuego a tener las llaves de la identidad corporativa de una empresa y, potencialmente, de sus clientes.",
      },
      {
        number: "03",
        label: "La Cadena de Ataque",
        title: "Cómo el OAuth se convirtió en el arma definitiva",
        content:
          "El verdadero desastre se desencadenó cuando la brecha en Context.ai se encontró con un empleado de Vercel que utilizaba la herramienta de IA.\n\nEl Eslabón de Vercel: Al menos un empleado de Vercel se había registrado en Context.ai utilizando su cuenta corporativa de Google Workspace y le había otorgado permisos amplios de \"Permitir Todo\" (Allow All).\n\nEl Pivote del Atacante: Al comprometer Context.ai y sus tokens OAuth, los atacantes heredaron esos permisos. Utilizaron el token OAuth del empleado de Vercel para tomar el control total de su cuenta de Google Workspace. Este es un punto crítico: el atacante no necesitó vulnerar la contraseña ni la MFA del empleado; simplemente utilizó un token de acceso preautorizado y legítimo.\n\nEl Movimiento Lateral: Ya dentro del Google Workspace de Vercel, el atacante se movió lateralmente hacia los sistemas internos y accedió a sus entornos de producción.\n\nLa Exposición de Datos: Los atacantes enumeraron y accedieron a las variables de entorno de los proyectos de Vercel que no estaban marcadas como \"sensibles\". Estas variables —claves API, credenciales de bases de datos y tokens de firma— estaban almacenadas en texto plano. Vercel confirmó que las variables marcadas como \"sensibles\" estaban cifradas de forma diferente y no fueron accedidas.",
      },
      {
        number: "04",
        label: "Impacto en Web3 & Cripto",
        title: "Pánico en los frontends descentralizados",
        content:
          "Aunque Vercel declaró que solo un \"subconjunto limitado\" de clientes se vio directamente afectado, el incidente desató una ola de pánico en el ecosistema cripto, que depende masivamente de Vercel para sus interfaces de usuario (frontends).\n\nRiesgo de \"Wallet Drainers\": La principal preocupación para los proyectos cripto es que un atacante, con acceso a las claves API de Vercel, podría modificar el frontend de una dApp o billetera para insertar un script malicioso que roba los fondos de los usuarios. La investigadora de seguridad de CertiK, Natalie Newson, advirtió que los usuarios que interactúan con una página de confianza no esperarían ninguna actividad maliciosa.\n\nRespuesta de emergencia en la industria:",
        bullets: [
          "Orca (DEX en Solana) confirmó que su frontend está en Vercel y rotó preventivamente todas sus claves de despliegue. El protocolo on-chain y los fondos no se vieron comprometidos.",
          "Binance emitió un comunicado confirmando que su equipo realizó una verificación exhaustiva y que ni la plataforma ni los activos de los usuarios se vieron afectados.",
          "El hackeo coincidió con un exploit de USD $292 millones en el token rsETH de Kelp DAO, convirtiendo abril en uno de los peores meses para los exploits cripto del año.",
        ],
      },
      {
        number: "05",
        label: "La Respuesta de Vercel",
        title: "Contención, investigación y un rescate millonario",
        content:
          "Vercel actuó con relativa rapidez una vez que se hizo pública la brecha.\n\nAcciones de Vercel:",
        bullets: [
          "Divulgación: Publicó un boletín de seguridad el 19 de abril confirmando el acceso no autorizado.",
          "Investigación Forense: Contrató a Mandiant (firma de ciberseguridad de Google) y otras empresas para liderar la investigación y remediación. Notificó a las autoridades.",
          "Análisis de la Cadena de Suministro: Colaboró con GitHub, Microsoft, npm y Socket para confirmar que sus paquetes de código abierto (como Next.js) no fueron alterados.",
          "Mejoras de Seguridad: Anunció que, por defecto, las nuevas variables de entorno se crearán como \"sensibles\", añadiendo cifrado adicional por defecto.",
          "El Rescate de $2M: Un actor de amenazas afiliado al grupo ShinyHunters publicó en BreachForums que estaba vendiendo datos robados de Vercel —incluyendo claves de API, código fuente y una base de datos con registros de 580 empleados— por USD $2 millones en Bitcoin.",
        ],
      },
      {
        number: "06",
        label: "Cronología",
        title: "De una descarga a una crisis global",
        content:
          "Una mirada paso a paso a cómo un script de videojuego desencadenó un incidente de seguridad global:",
      },
      {
        number: "07",
        label: "Reacciones de la Industria",
        title: "Un llamado de atención sobre el riesgo de terceros y la IA",
        content:
          "El incidente fue un duro recordatorio de los peligros de la cadena de suministro de software moderna.\n\nEl Riesgo del OAuth y las Integraciones SaaS: Expertos señalaron que este ataque no explotó una vulnerabilidad de código, sino una configuración de confianza. Cory Michal, CISO de AppOmni, comentó que el incidente ilustra cómo \"una aplicación de terceros poco conocida puede convertirse en un trampolín hacia un entorno corporativo mucho más grande\". El atacante simplemente abusó de un token de acceso que se le había otorgado legítimamente.\n\nEl Auge del Shadow AI: El incidente puso de relieve los riesgos del \"Shadow AI\" —el uso de herramientas de IA por parte de los empleados sin supervisión del departamento de TI. La adopción no regulada de estas herramientas puede crear puntos ciegos masivos en la seguridad empresarial.",
      },
      {
        number: "08",
        label: "Lecciones Aprendidas",
        title: "Cómo blindarse ante la próxima brecha",
        content:
          "El incidente de Vercel deja lecciones críticas para empresas y desarrolladores:",
        bullets: [
          "Rotación Inmediata de Secretos: Si su empresa utiliza Vercel o cualquier plataforma similar, rote inmediatamente todas las claves API, tokens de acceso y credenciales de bases de datos almacenadas como variables de entorno, especialmente las no marcadas como sensibles.",
          "Auditar Permisos OAuth: Revise y audite regularmente todas las aplicaciones de terceros que tienen acceso a su Google Workspace, GitHub u otros sistemas centrales. Revise los permisos otorgados y elimine aquellos que no sean estrictamente necesarios.",
          "Principio de Privilegio Mínimo: Los empleados no deberían tener más permisos de los que necesitan para hacer su trabajo.",
          "Proteger las Variables de Entorno: Marque todas las variables de entorno sensibles como \"sensibles\" en Vercel para que se almacenen cifradas.",
          "Gobernanza de Herramientas de IA: Establezca una política clara para el uso de herramientas de IA de terceros. Eduque sobre los riesgos de conceder permisos amplios a aplicaciones no verificadas.",
        ],
      },
    ],
    timeline: [
      {
        date: "Febrero 2026",
        event:
          "Un empleado de Context.ai descarga un script malicioso para Roblox y se infecta con el malware Lumma Stealer. Sus credenciales corporativas son robadas.",
      },
      {
        date: "Marzo 2026",
        event:
          "Los atacantes usan las credenciales robadas para comprometer el entorno de AWS de Context.ai y obtienen acceso a los tokens OAuth de sus clientes.",
      },
      {
        date: "19 Abril 2026",
        event:
          "Vercel publica un boletín de seguridad confirmando un acceso no autorizado a sus sistemas internos.",
      },
      {
        date: "19-20 Abril 2026",
        event:
          "Un actor de amenazas pone a la venta los datos supuestamente robados de Vercel en BreachForums por $2 millones.",
      },
      {
        date: "20 Abril 2026",
        event:
          "El CEO de Vercel, Guillermo Rauch, confirma que el vector de ataque inicial fue la herramienta de IA Context.ai. Proyectos cripto como Orca comienzan a rotar sus claves de emergencia.",
      },
    ],
    keyTakeaways: [
      "El OAuth mal configurado es una puerta trasera corporativa: otorgar permisos 'Allow All' a apps de terceros sin auditoría es equivalente a dejar una llave maestra bajo el tapete.",
      "La cadena de suministro de software es tan fuerte como su eslabón más débil. Una startup de IA desconocida fue suficiente para comprometer uno de los mayores proveedores de infraestructura web del mundo.",
      "El Shadow AI —uso de herramientas de IA sin supervisión de TI— crea puntos ciegos regulatorios y de seguridad que ninguna política de MFA o contraseña puede cubrir.",
      "En Colombia, la Ley 1581 de 2012 (Habeas Data) y las directrices de la SIC obligan a las empresas a implementar medidas técnicas y organizativas para proteger datos personales. Un incidente como este generaría responsabilidad administrativa y civil para el responsable del tratamiento.",
      "Para las plataformas LegalTech que usan Vercel o infraestructura similar: sus variables de entorno son activos jurídicos — su exposición puede implicar violación de secretos empresariales y datos personales de clientes.",
    ],
    legalFramework:
      "Colombia: Ley 1581/2012 (Habeas Data), Ley 527/1999 (Comercio Electrónico), Decreto 1377/2013, Circular SIC 002/2024. Internacional: GDPR (Reglamento UE 2016/679), NIST Cybersecurity Framework.",
    sources: [
      "Vercel Security Advisory — 19 de abril de 2026",
      "Hudson Rock — Análisis del vector de ataque Lumma Stealer",
      "CertiK Security — Riesgo de wallet drainers en frontends comprometidos",
      "BreachForums — Publicación del actor de amenazas (afiliado ShinyHunters)",
      "Declaraciones de Guillermo Rauch (CEO Vercel) — 20 de abril de 2026",
    ],
  },

  /* ── CASO 2 ──────────────────────────────────────────────────────────────── */
  {
    slug: "junger-arquitectura-legal-healthtech-colombia",
    title: "JUNGER: cómo construir una plataforma de salud mental que sí cumple la ley",
    subtitle:
      "Del consultorio al código — la arquitectura jurídica y tecnológica de un HealthTech en Colombia",
    date: "2026-04-21",
    category: "Privacidad y Datos",
    tags: [
      "HealthTech",
      "salud mental",
      "historia clínica electrónica",
      "IA en salud",
      "Ley 1581",
      "Ley 2015",
      "SaaS Colombia",
      "datos sensibles",
    ],
    riskLevel: "medio",
    color: "#3B82F6",
    excerpt:
      "JUNGER es una plataforma integral para psicólogos colombianos que integra IA para documentación clínica y gestión de consultorio. Su caso ilustra cómo la normativa colombiana (Ley 1581, Ley 2015, Resolución 1995/1999) no es un obstáculo sino el plano arquitectónico de un producto LegalTech: quién puede ver qué, cómo se guarda y por cuánto tiempo. Un manual práctico de lo que significa construir HealthTech con rigor jurídico en Colombia.",
    sections: [
      {
        number: "01",
        label: "Resumen Ejecutivo",
        title: "La ley como plano de construcción",
        content:
          "JUNGER es un excelente software asistente para psicólogos. Es un caso de estudio sobre cómo la regulación colombiana de datos de salud puede y debe convertirse en ventaja competitiva para un producto LegalTech.\n\nEl sector de la salud mental en Colombia enfrenta una paradoja: 2.5 millones de personas padecen depresión, pero solo el 12% de quienes necesitan atención psicológica acceden a tratamiento. La barrera no es solo de oferta, es también de eficiencia. Un psicólogo independiente en Colombia dedica entre 2 y 4 horas diarias a documentación clínica, agendamiento y facturación. Tiempo que podría estar con su paciente.\n\nJUNGER nace para resolver este problema con IA, pero el verdadero desafío no es técnico... Es jurídico: los datos de salud mental son la categoría más sensible de datos personales reconocida por el ordenamiento colombiano. Construir una plataforma que los gestione bien no es una opción ética, es una obligación legal.",
      },
      {
        number: "02",
        label: "El Contexto",
        title: "La brecha que JUNGER quiere cerrar",
        content:
          "El ecosistema HealthTech colombiano es uno de los más dinámicos de América Latina, con más de 300 empresas activas y una operación superior a USD 300 millones. Medellín, en particular, se ha consolidado como hub de innovación regional.\n\nSin embargo, el mercado de software especializado para psicólogos está fragmentado. Las soluciones existentes (Eholo, AgendaPro, Serenity Plus) atacan problemas puntuales: agendamiento, notas de evolución por voz, gestión de pacientes. Ninguna integra documentación clínica asistida por IA con cumplimiento normativo colombiano y una experiencia de usuario diseñada para el profesional de la psicología.\n\nEl nombre JUNGER evoca deliberadamente dos ideas: la \"jungla\" como ecosistema complejo e interconectado, y Carl Jung como padre de la psicología analítica. Es una declaración de intenciones, una plataforma tan compleja por dentro como sencilla por fuera.\n\nSegmentos de mercado objetivo:",
        bullets: [
          "Psicólogos independientes: el segmento más grande y atomizado, con consulta privada propia.",
          "Centros y clínicas de psicología: instituciones con múltiples profesionales que requieren coordinación centralizada.",
          "Universidades y centros de formación: con necesidades pedagógicas específicas para la formación clínica.",
        ],
      },
      {
        number: "03",
        label: "El Marco Legal",
        title: "Las normas que lo gobiernan todo",
        content:
          "Los datos de salud mental son \"datos sensibles\" en el sentido técnico-jurídico del término. En Colombia, eso no es una etiqueta — es una categoría legal con consecuencias directas sobre cómo se diseña el sistema.\n\nLey 1581 de 2012 (Habeas Data): Regula el tratamiento de datos personales y eleva los datos de salud a la categoría de sensibles, exigiendo autorización explícita del titular, implementación de medidas técnicas de seguridad de nivel superior y garantía de los derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Una plataforma como JUNGER es, por definición, un responsable del tratamiento de datos sensibles — con responsabilidad demostrada (accountability) ante la SIC.\n\nLey 2015 de 2020 (Historia Clínica Electrónica Interoperable — IHCE): Esta es la norma estructurante. Exige que los sistemas de historia clínica electrónica garanticen seguridad, integridad, autenticidad, confiabilidad, exactitud, conservación, disponibilidad y acceso. No es una lista de buenas prácticas — es una lista de obligaciones legales cuyo incumplimiento puede derivar en cancelación de habilitación sanitaria.\n\nResolución 1995 de 1999 (modificada por Res. 1715 de 2005): Define el contenido mínimo, el formato, los plazos de conservación y las condiciones de custodia de la historia clínica. JUNGER debe cumplir esta norma para que los registros generados tengan validez legal.\n\nProyecto de Ley 043 de 2025 (Regulación de IA): Aunque aún en trámite legislativo, este proyecto introduce principios de transparencia algorítmica y clasificación de sistemas de IA por nivel de riesgo. Un sistema que genera borradores de historia clínica podría clasificarse como IA de alto riesgo en el ámbito de la salud — con exigencias de auditoría y explicabilidad.",
      },
      {
        number: "04",
        label: "La Tensión Tecnológica",
        title: "Blockchain vs. arquitectura pragmática: un debate LegalTech",
        content:
          "Uno de los momentos más reveladores del caso JUNGER es la decisión de descartar Blockchain y el esquema de Shamir's Secret Sharing (SSS) para la custodia de historias clínicas, a pesar de su elegancia conceptual.\n\nEl modelo SSS propone fragmentar la clave de cifrado de cada historia clínica entre múltiples custodios — el paciente, el profesional y la plataforma — de modo que ninguno pueda acceder solo. Es criptográficamente brillante. Pero introduce un riesgo operativo que la normativa colombiana no tolera: si el paciente pierde su fragmento de clave, la historia clínica se vuelve irrecuperable. La Resolución 1995 exige disponibilidad y conservación. Un sistema que puede perder registros por error del usuario incumple la norma.\n\nLa solución adoptada — AES-256 en reposo, gestión de claves con AWS KMS, logs inmutables con AWS CloudTrail y firma digital por sesión — es menos disruptiva en su narrativa pero más robusta en su cumplimiento legal. Es el ejemplo perfecto de la tensión LegalTech: entre la innovación que fascina y la obligación que protege.\n\nArquitectura de seguridad adoptada:",
        bullets: [
          "Cifrado en reposo: AES-256 para todos los datos de historia clínica, el mismo estándar que usan entidades bancarias y gubernos.",
          "Gestión de claves (KMS): AWS KMS con rotación automática y registro de auditoría de cada acceso — nadie accede sin dejar huella.",
          "Trazabilidad: AWS CloudTrail genera logs inmutables de cada operación sobre datos clínicos, cumpliendo el requisito de auditabilidad de la Ley 2015.",
          "Firma digital: cada nota de evolución validada por el profesional se firma digitalmente, garantizando autoría, integridad y no repudio.",
        ],
      },
      {
        number: "05",
        label: "IA en el Consultorio",
        title: "Documentar con IA sin delegar la responsabilidad clínica",
        content:
          "El módulo estrella de JUNGER es la documentación clínica asistida por IA: transcripción de la sesión con Whisper API de OpenAI y generación automática de una nota de evolución en formato SOAP (Subjetivo, Objetivo, Análisis, Plan) mediante GPT-4o mini.\n\nEl costo técnico es despreciable — menos de USD $0.05 por sesión de una hora. El desafío no es económico: es jurídico y ético.\n\nEl principio \"Human-in-the-Loop\" (HITL) es la respuesta: el borrador generado por la IA nunca se guarda directamente en la historia clínica. El profesional lo revisa, edita y valida antes de firmarlo. Este diseño no es un capricho de UX — es una obligación legal. La Resolución 1995 y los principios del Proyecto de Ley de IA 043/2025 exigen que el profesional mantenga la responsabilidad sobre el contenido del registro clínico. Una IA que firma sola viola la ley.\n\nEsta decisión de diseño también es una respuesta anticipada a la regulación de IA en salud: si el sistema se clasifica como IA de alto riesgo, el HITL obligatorio es la primera línea de defensa frente a una eventual auditoría regulatoria.\n\nImplicaciones legales del uso de IA para documentación clínica:",
        bullets: [
          "Titular del registro: el profesional que firma es el responsable del contenido, no la IA. El borrador es una herramienta, no un acto profesional.",
          "Consentimiento informado del paciente: grabar la sesión para transcripción requiere autorización explícita bajo la Ley 1581 — debe documentarse antes de cada sesión.",
          "Retención y eliminación de audio: los archivos de audio son datos sensibles. JUNGER debe definir políticas claras de retención — ¿se eliminan tras la transcripción?",
          "Auditoría algorítmica: si el modelo de IA toma decisiones que afectan el registro clínico, el Proyecto de Ley 043/2025 exigiría explicabilidad y documentación del modelo.",
        ],
      },
      {
        number: "06",
        label: "Cronología del Proyecto",
        title: "De la idea al mercado",
        content:
          "La hoja de ruta de JUNGER es un ejercicio de realismo LegalTech: cada hito técnico tiene su correlato legal.",
      },
      {
        number: "07",
        label: "El Modelo de Negocio",
        title: "SaaS, pricing y viabilidad en el mercado colombiano",
        content:
          "JUNGER adopta un modelo SaaS con cuatro niveles de suscripción mensual en pesos colombianos, una decisión que refleja la madurez del mercado: el psicólogo independiente colombiano no compra en dólares.\n\nPlan Esencial ($79.000 COP/mes): hasta 30 pacientes, agenda, historial básico. Plan Profesional ($159.000/mes): pacientes ilimitados, IA para notas SOAP. Plan Premium ($259.000/mes): investigación contextual e informes avanzados. Centros (desde $699.000/mes): gestión multi-profesional.\n\nLa proyección conservadora para el Año 1 — 200 profesionales en el plan Profesional — genera ingresos anuales de aproximadamente USD $95.400. Para el Año 3, con 1.200 profesionales y 30 centros, el ingreso anual proyectado supera los USD $635.000. Los márgenes son favorables: el costo de infraestructura AWS y APIs de IA para 200 usuarios no supera los USD $900 mensuales.\n\nRiesgos de cumplimiento con impacto en el modelo:",
        bullets: [
          "Riesgo de IA mal usada (bajo, impacto alto): si el profesional publica notas sin revisar y ocurre un daño al paciente, la responsabilidad recae en quien firmó — pero la plataforma podría ser demandada por facilitar el error. El HITL obligatorio es el seguro.",
          "Cambios regulatorios (medio, impacto alto): la aprobación del Proyecto de Ley 043/2025 podría exigir certificación de los modelos de IA usados en salud. Arquitectura modular como ventaja.",
          "Adopción lenta (medio, impacto alto): el psicólogo colombiano promedio no es early adopter tecnológico. La estrategia piloto con 20-30 profesionales es la respuesta correcta.",
        ],
      },
      {
        number: "08",
        label: "Lecciones LegalTech",
        title: "Lo que JUNGER nos enseña sobre construir con la ley, no contra ella",
        content:
          "JUNGER es un caso de manual para el estudiante de LegalTech porque demuestra que la regulación puede ser un activo estratégico en lugar de un obstáculo burocrático.\n\nCada decisión técnica relevante en el diseño de JUNGER tiene una motivación legal directa. El cifrado AES-256 no es solo buena práctica — es lo que exige la Ley 1581 para datos sensibles. El HITL no es solo un salvavidas ético — es el mecanismo que preserva la responsabilidad profesional del psicólogo. Los logs inmutables no son solo DevOps — son el cumplimiento del requisito de trazabilidad de la Ley 2015.\n\nLecciones concretas para el equipo fundador de cualquier HealthTech en Colombia:",
        bullets: [
          "El abogado entra al diseño, no al final: las decisiones de arquitectura (dónde se guardan los datos, quién puede acceder, cómo se cifran) son decisiones legales disfrazadas de decisiones técnicas.",
          "El consentimiento informado digital es un producto, no un trámite: la pantalla donde el paciente autoriza la grabación de su sesión debe ser tan cuidadosa como cualquier otra pantalla de la app.",
          "La residencia de datos importa: AWS región São Paulo (sa-east-1) no es una decisión de latencia — es una respuesta a la pregunta de si los datos de colombianos pueden salir del país bajo la Ley 1581.",
          "Prepararse para la regulación de IA antes de que llegue: el Proyecto de Ley 043/2025 convertirá la explicabilidad algorítmica en obligación. JUNGER ya diseña con ese criterio — eso es ventaja competitiva.",
          "El cumplimiento es marketing: en salud mental, la confianza del paciente es todo. Una plataforma que puede demostrar cumplimiento con la Ley 1581 y la Ley 2015 tiene un diferenciador que ninguna campaña publicitaria puede comprar.",
        ],
      },
    ],
    timeline: [
      {
        date: "Q2 2026",
        event:
          "Constitución legal de JUNGER. Registro de marca, asesoría legal inicial y encuestas de validación a 50 psicólogos colombianos.",
      },
      {
        date: "Q3 2026",
        event:
          "Desarrollo del MVP (\"JUNGER Core\"): módulo de gestión de citas, historial clínico básico y transcripción de voz con Whisper API.",
      },
      {
        date: "Q4 2026",
        event:
          "Pilotaje con 20-30 psicólogos early adopters en Medellín. Recolección de feedback clínico y legal. Ajustes al modelo de consentimiento informado digital.",
      },
      {
        date: "Q1 2027",
        event:
          "Lanzamiento Versión 1.0: integración completa de IA para notas SOAP (GPT-4o mini + HITL obligatorio), mejoras basadas en el pilotaje.",
      },
      {
        date: "Q2 2027",
        event:
          "Desarrollo de facturación electrónica con integración a proveedores certificados por la DIAN.",
      },
      {
        date: "Q3-Q4 2027",
        event:
          "Lanzamiento del Portal del Paciente y primera campaña comercial. Objetivo: 200 profesionales suscritos.",
      },
      {
        date: "2028",
        event:
          "Expansión funcional: módulo de investigación contextual (Elicit API), preparación para entrada al mercado mexicano.",
      },
    ],
    keyTakeaways: [
      "Los datos de salud mental son \"datos sensibles\" bajo la Ley 1581/2012: su tratamiento exige autorización explícita, medidas de seguridad reforzadas y responsabilidad demostrada (accountability) ante la SIC — no basta con una política de privacidad estándar.",
      "La Ley 2015 de 2020 convierte los requisitos de seguridad e integridad de la historia clínica en obligaciones legales exigibles. Una plataforma que no puede garantizar disponibilidad y trazabilidad de los registros puede perder su habilitación sanitaria.",
      "El principio \"Human-in-the-Loop\" en IA médica no es una decisión de diseño — es una obligación jurídica: el profesional de salud mantiene la responsabilidad sobre el contenido del registro clínico, la IA es solo un borrador.",
      "La decisión de no implementar Blockchain/SSS ilustra una lección LegalTech fundamental: la innovación disruptiva debe ceder cuando entra en conflicto con la disponibilidad e integridad exigidas por la norma. La elegancia técnica no excusa el incumplimiento.",
      "El Proyecto de Ley 043/2025 de regulación de IA en Colombia es una señal temprana: las plataformas de salud que usen IA deben preparar hoy su documentación de explicabilidad algorítmica. El cumplimiento anticipado es ventaja competitiva.",
    ],
    legalFramework:
      "Colombia: Ley 1581/2012 (Habeas Data y datos sensibles), Ley 2015/2020 (IHCE — Historia Clínica Electrónica Interoperable), Resolución 1995/1999 y Resolución 1715/2005 (manejo de historia clínica), Decreto 1377/2013, Proyecto de Ley 043/2025 (regulación de IA). Estándares técnicos: FHIR (HL7), NIST SP 800-111 (cifrado de datos en salud), ISO 27001.",
    sources: [
      "JUNGER — Documento de producto y arquitectura legal, Medellín, Abril 2026",
      "Colegio Colombiano de Psicólogos (Colpsic) — Estadísticas de profesionales habilitados",
      "Ministerio de Salud de Colombia — Lineamientos Ley 2015/2020 e interoperabilidad FHIR",
      "Superintendencia de Industria y Comercio (SIC) — Guía de implementación Ley 1581/2012 para datos sensibles",
      "OpenAI — Whisper API y GPT-4o mini: documentación técnica y precios",
      "Congreso de Colombia — Proyecto de Ley 043/2025, regulación de inteligencia artificial",
    ],
  },

  /* ── CASO 3 ──────────────────────────────────────────────────────────────── */
  {
    slug: "iot-condiciones-responsabilidad-zonas-grises-colombia",
    title: "IoT (Intertnet of Things) en Colombia",
    subtitle:
      "Derechos, deberes, responsabilidades y zonas grises del Internet de las Cosas bajo el ordenamiento colombiano",
    date: "2026-04-22",
    category: "Regulación",
    tags: [
      "IoT",
      "biometría",
      "cerraduras inteligentes",
      "datos personales",
      "Ley 1581",
      "responsabilidad del fabricante",
      "privacidad",
      "CONPES 3995",
    ],
    riskLevel: "medio",
    color: "#F59E0B",
    excerpt:
      "Cuando instalas una bombilla inteligente, una cerradura con huella o un asistente de voz, estás firmando un contrato de tratamiento de datos que probablemente nunca leíste y que, en muchos casos, no cumple con la ley colombiana. El IoT ya es masivo, pero la regulación lo mira apenas de reojo. Este caso desglosa quién responde, qué derechos tienes, dónde están las zonas grises y por qué en unos años cambiar la llave de tu casa por biometría planteará preguntas de derecho constitucional.",
    sections: [
      {
        number: "01",
        label: "El Problema Central",
        title: "El objeto que te escucha, te mide y te clasifica",
        content:
          "Un termóstato inteligente sabe a qué hora llegas a casa, cuándo estás de vacaciones y cuántos hay en tu familia. Una cerradura con huella guarda tu dato biométrico más permanente, el que no puedes cambiar si lo hackean. Un asistente de voz graba fragmentos de tus conversaciones para \"mejorar el servicio\". Un smartwatch registra tu frecuencia cardíaca, tus horas de sueño y tus niveles de estrés.\n\nNinguno de estos dispositivos nació siendo una herramienta de vigilancia. Pero todos se convirtieron en una. Y la ley colombiana, diseñada en una época donde los objetos no tenían dirección IP, los mira desde categorías jurídicas que no fueron hechas para ellos.\n\nEl Internet de las Cosas (IoT) es ya una realidad masiva en Colombia. Más de 12 millones de dispositivos conectados operan en el país; cámaras de seguridad, medidores inteligentes, electrodomésticos, wearables, vehículos. El número se duplicará antes de 2028. Y con cada dispositivo nuevo, se crea un nuevo punto de recolección de datos personales, un nuevo eslabón de responsabilidad jurídica y una nueva zona gris donde la ley no llega con claridad.",
      },
      {
        number: "02",
        label: "Marco Normativo",
        title: "El patchwork legal que intenta regular lo que no imaginó",
        content:
          "Colombia no tiene una ley de IoT. Lo que tiene es un conjunto de normas diseñadas para otros contextos que, aplicadas con criterio, cubren (parcialmente) los riesgos que el IoT introduce.\n\nLey 1581 de 2012 (Habeas Data): Es la norma más relevante. Todo dispositivo IoT que recolecte datos personales de colombianos activa su aplicación. El fabricante o la plataforma que opera el dispositivo es un \"responsable del tratamiento\" o un \"encargado\", con obligaciones de autorización previa, finalidad determinada, seguridad reforzada y garantía de derechos ARCO. El problema: la mayoría de los fabricantes son chinos, coreanos o estadounidenses que no conocen (o ignoran) la norma colombiana.\n\nLey 1480 de 2011 (Estatuto del Consumidor): Regula la garantía y responsabilidad por productos defectuosos. Si un dispositivo IoT falla y causa un daño, ejemplo; una cerradura inteligente que se queda bloqueada, una cámara que transmite la señal de tu hogar a terceros, el consumidor colombiano tiene derecho a garantía, reparación o indemnización. El fabricante y el distribuidor responden solidariamente.\n\nLey 1273 de 2009 (Delitos informáticos): El acceso no autorizado a un dispositivo IoT — hackear una cámara, interceptar el tráfico de un smartwatch, configura delitos de acceso abusivo a sistema informático (art. 269A) con penas de 48 a 96 meses de prisión. La norma aplica tanto al atacante externo como al fabricante que accede sin consentimiento.\n\nCONPES 3995 de 2020 (Política Nacional de Confianza y Seguridad Digital): Establece los lineamientos de ciberseguridad para entidades públicas y privadas, incluyendo infraestructura crítica conectada. Define la protección de dispositivos IoT como un eje estratégico — pero sin crear obligaciones legales directas para fabricantes privados.\n\nDecreto 090 de 2023: Actualiza las competencias de la SIC en materia de protección de datos digitales y le otorga facultades de inspección y sanción sobre plataformas que operan en Colombia, incluidas las que gestionan dispositivos IoT.",
      },
      {
        number: "03",
        label: "Régimen de Responsabilidad",
        title: "Fabricante, distribuidor, plataforma y usuario: quién responde por qué",
        content:
          "La cadena de responsabilidad en un ecosistema IoT tiene al menos cuatro eslabones. Determinar cuál responde requiere entender qué función cumple cada uno — y dónde ocurrió el fallo.\n\nEl fabricante del hardware: Responsable por defectos de diseño o fabricación bajo la Ley 1480. Si el dispositivo tiene una vulnerabilidad de seguridad conocida y no fue corregida, el fabricante responde. En Colombia, el importador actúa como fabricante cuando este no tiene representación local — lo que significa que el distribuidor colombiano puede quedar expuesto a reclamaciones que no anticipó.\n\nEl desarrollador del firmware y la app: El software que controla el dispositivo es tan parte del producto como el hardware. Si la app transmite datos sin cifrar, no implementa autenticación robusta o vende la información a terceros sin consentimiento válido, el desarrollador es responsable bajo la Ley 1581 como responsable del tratamiento.\n\nLa plataforma cloud: La nube donde se almacenan los datos del dispositivo es un \"encargado del tratamiento\" bajo la Ley 1581, con obligaciones contractuales hacia el responsable y obligaciones legales directas hacia el titular de los datos. Si la nube está en China o Estados Unidos, la transferencia internacional de datos requiere garantías adicionales.\n\nEl usuario: También tiene responsabilidades. Quien instala una cámara de seguridad en un espacio compartido (pasillo de edificio, oficina) es responsable del tratamiento de los datos de las personas captadas. Ignorar este rol no exime, la Ley 1581 aplica independientemente de si el responsable es una empresa o una persona natural.",
        bullets: [
          "Fabricante/importador: responde por defectos del producto (Ley 1480) y por vulnerabilidades de seguridad no corregidas.",
          "Desarrollador de software/firmware: responsable del tratamiento de datos recolectados por la app y del cumplimiento de la Ley 1581.",
          "Plataforma cloud: encargada del tratamiento con obligaciones de seguridad, confidencialidad y limitación de uso.",
          "Usuario final: responsable del tratamiento cuando instala dispositivos que captan datos de terceros (cámaras, micrófonos en espacios compartidos).",
        ],
      },
      {
        number: "04",
        label: "Datos y Privacidad",
        title: "Lo que el dispositivo sabe de ti — y lo que la ley dice sobre eso",
        content:
          "No todos los datos que recolecta un dispositivo IoT tienen el mismo tratamiento jurídico. La Ley 1581 establece una jerarquía que, aplicada al IoT, produce consecuencias muy distintas según el tipo de dato.\n\nDatos de uso y hábitos (termóstato, smart TV, electrodomésticos): Son datos personales ordinarios. Requieren autorización, finalidad determinada y medidas de seguridad básicas. En la práctica, la mayoría de los dispositivos obtienen esta autorización en términos y condiciones que nadie lee.\n\nDatos de localización (GPS en smartwatches, rastreadores vehiculares, celulares): Son datos personales con potencial altamente sensible — permiten inferir lugares de trabajo, lugares de culto, relaciones sentimentales, condición de salud. La SIC los ha tratado con estándar elevado en sus decisiones sancionatorias.\n\nDatos biométricos (huella dactilar en cerraduras, reconocimiento facial en cámaras, voz en asistentes): Son datos sensibles bajo la Ley 1581 — la categoría más protegida. Su tratamiento requiere autorización explícita, finalidad específica y medidas de seguridad reforzadas. La mayoría de las cerraduras inteligentes que se venden hoy en Colombia no cumplen con este estándar: almacenan la huella en un servidor externo sin que el usuario sepa dónde.\n\nDatos de salud (wearables, básculas inteligentes, monitores de glucosa): También son datos sensibles. Una aseguradora que acceda a estos datos sin autorización estaría violando simultáneamente la Ley 1581 y potencialmente el derecho fundamental a la salud.",
        bullets: [
          "Hábitos y uso: datos ordinarios — requieren autorización y finalidad, pero estándar básico.",
          "Localización: datos con potencial sensible — estándar elevado en práctica sancionatoria de la SIC.",
          "Biometría: datos sensibles — autorización explícita obligatoria, prohibición de uso sin consentimiento, medidas de seguridad reforzadas.",
          "Salud: datos sensibles — misma categoría que biometría, con implicaciones adicionales en seguros y empleo.",
        ],
      },
      {
        number: "05",
        label: "Zonas Grises",
        title: "Lo que la ley no resuelve todavía",
        content:
          "Las zonas grises del IoT no son fallas de la ley — son el resultado de que la tecnología evoluciona más rápido que el proceso legislativo. Estas son las más relevantes para el operador jurídico colombiano.\n\nCámaras en espacios compartidos: ¿Puede el administrador de un edificio de propiedad horizontal instalar cámaras en los pasillos sin consentimiento de los residentes? La Ley 675 de 2001 (propiedad horizontal) permite medidas de seguridad, pero no regula explícitamente la vigilancia biométrica. La Ley 1581 exige informar a los captados — ¿basta un aviso en la cartelera? La SIC no ha respondido con claridad.\n\nEl apagado remoto por el fabricante: Varios fabricantes de dispositivos IoT se reservan el derecho contractual de deshabilitar el producto de forma remota (Sonos lo hizo en 2024 con modelos discontinuados). En Colombia, ¿puede el fabricante hacer inutilizable un bien que el usuario compró? La Ley 1480 protege al consumidor frente a cambios unilaterales que degraden el producto — pero el derecho a la propiedad sobre un dispositivo con firmware controlado remotamente es territorio inexplorado.\n\nDatos de IoT en procesos judiciales: ¿Son admisibles los registros de una cerradura inteligente como prueba de acceso a una vivienda? ¿Con qué cadena de custodia? El Código General del Proceso y el Código de Procedimiento Penal no contemplan específicamente los logs de dispositivos IoT como evidencia digital. El juez tiene discrecionalidad — lo que crea incertidumbre.\n\nIoT y datos de menores: Un smartwatch de niño recolecta ubicación y actividad física. Los menores de 14 años no pueden autorizar el tratamiento de sus datos bajo la Ley 1581 — debe hacerlo su representante legal. La mayoría de los fabricantes de wearables infantiles no tienen un proceso diferenciado para Colombia.\n\nEl vehículo autónomo como dispositivo IoT: Un carro conectado recolecta datos de manejo, rutas, pasajeros y el entorno. En un accidente de vehículo autónomo en Colombia, ¿quién responde — el fabricante, el algoritmo, el \"conductor\"? La legislación de tránsito colombiana no tiene respuesta.",
        bullets: [
          "Cámaras en propiedad horizontal: ¿cuándo el aviso de vigilancia cumple con la Ley 1581?",
          "Apagado remoto por fabricante: ¿puede el software destruir un derecho de propiedad?",
          "Admisibilidad de logs IoT como prueba judicial en Colombia: estándar no definido.",
          "Datos de menores en wearables: obligación de los padres que la industria no facilita.",
          "Responsabilidad en accidentes de vehículos autónomos: vacío normativo total.",
        ],
      },
      {
        number: "06",
        label: "Infracciones Estructurales",
        title: "Las que ocurren por diseño — no por mala fe",
        content:
          "Hay una categoría de infracciones legales en el IoT que son casi inevitables dado el estado actual del mercado y la regulación. No nacen de la intención de dañar — nacen de que el sistema global no fue diseñado con la ley colombiana en mente.\n\nAsistentes de voz (Alexa, Google Home, Siri): El uso de estos dispositivos implica la transmisión continua de fragmentos de audio a servidores en Estados Unidos. Esto es una transferencia internacional de datos personales (incluidos datos de voz, potencialmente biométricos) sin las garantías que exige el Decreto 1377/2013. No existe forma de usar el producto sin aceptarlo. La infracción es estructural — está en el diseño del servicio, no en el usuario.\n\nCerraduras y cámaras de fabricantes asiáticos: La mayoría almacena las huellas dactilares y los videos en servidores en China sin informar claramente al usuario colombiano. Bajo la Ley 1581, esto viola las disposiciones de transferencia internacional de datos sensibles. El producto se vende en tiendas como Éxito, Alkosto y MercadoLibre sin que nadie en la cadena de distribución haya verificado el cumplimiento.\n\nSmartTVs con recolección pasiva de datos: Los televisores inteligentes de Samsung, LG y TCL recolectan metadatos de visualización (qué ves, cuándo, por cuánto tiempo) para venderlos a redes de publicidad. Esta práctica, documentada por la FTC en Estados Unidos, opera igualmente en Colombia sin un equivalente regulatorio que la detenga.\n\nAnillos y pulseras fitness conectados a apps de salud: Los datos de frecuencia cardíaca y sueño que Fitbit, Garmin o Apple Watch recolectan son datos de salud bajo la Ley 1581 — datos sensibles. Las apps los comparten con socios comerciales. En Colombia no existe una autoridad que haya auditado estas transferencias. La infracción existe, pero nadie la está persiguiendo aún.",
        bullets: [
          "Asistentes de voz: transferencia internacional de datos de voz (potencialmente biométricos) sin garantías del Decreto 1377/2013 — imposible de evitar usando el producto.",
          "Cerraduras inteligentes asiáticas: almacenamiento de huellas en servidores extranjeros sin información clara al usuario colombiano.",
          "Smart TVs: recolección pasiva de hábitos de visualización para venta a redes publicitarias — práctica global sin regulador colombiano activo.",
          "Wearables de salud: datos sensibles compartidos con socios comerciales sin cumplimiento de la Ley 1581 para datos de salud.",
        ],
      },
      {
        number: "07",
        label: "El Futuro Biométrico",
        title: "Cuando las llaves físicas desaparezcan — y lo que eso implica",
        content:
          "En menos de una década, cambiaremos masivamente las llaves físicas por biometría, códigos y OTP en las puertas cotidianas. Ya ocurre en apartamentos, oficinas y hoteles. El siguiente paso es la vivienda de interés social, los arrendamientos y las casas familiares.\n\nCuando eso pase, cada puerta se convierte en un punto de datos: quién entró, a qué hora, cuántas veces, con cuánta demora. En un arriendo, ¿puede el arrendador acceder a ese log? El Código Civil colombiano protege la intimidad del arrendatario en el inmueble — pero si la cerradura es del arrendador y el servidor es de la empresa fabricante, ¿quién controla realmente el acceso al registro?\n\nLa biometría como credencial permanente: Un PIN o contraseña comprometida se cambia. Una huella dactilar o un patrón de iris comprometidos no. Si los datos biométricos de una cerradura son filtrados en una brecha de seguridad, el daño es permanente. La Ley 1581 obliga al responsable a notificar las brechas a la SIC y a los titulares — pero ¿qué se le dice al usuario cuya huella ya circula en una base de datos criminal?\n\nDependencia del servidor: Una cerradura inteligente conectada a la nube del fabricante falla si la empresa quiebra, si el servidor cae o si hay un corte de internet. El derecho fundamental a la inviolabilidad del domicilio (art. 28 C.P.) y el derecho a la propiedad privada quedan condicionados a la conectividad de un servidor en Hangzhou o en San Francisco. Colombia no tiene regulación que obligue a los fabricantes de cerraduras inteligentes a garantizar acceso offline.\n\nEl arrendamiento de corta estadía y el acceso remoto: Plataformas como Airbnb permiten gestionar la entrada de huéspedes mediante cerraduras inteligentes con códigos OTP temporales. En Colombia, el Decreto 2590 de 2021 reguló parcialmente el arrendamiento turístico, pero no abordó la dimensión de datos que genera la gestión biométrica del acceso.",
        bullets: [
          "Log de acceso como dato personal: saber cuándo alguien entra y sale de su casa es información íntima protegida por la Ley 1581 — el arrendador no puede acceder sin autorización.",
          "Biometría irrevocable: a diferencia de una contraseña, una huella filtrada es un daño permanente sin remedio técnico.",
          "Derecho al domicilio condicionado a conectividad: cuando el servidor cae, la puerta puede no abrir — una obligación de garantía offline que la ley no contempla aún.",
          "OTP en arrendamientos turísticos: práctica masiva con implicaciones de Ley 1581 que el Decreto 2590/2021 no resuelve.",
        ],
      },
      {
        number: "08",
        label: "Para el Operador Jurídico",
        title: "Qué hacer hoy — antes de que la ley lo exija",
        content:
          "El operador jurídico — abogado, compliance officer, desarrollador LegalTech — que trabaja con IoT no puede esperar a que Colombia tenga una regulación específica. Las normas vigentes ya aplican. El riesgo es presente, no futuro.\n\nPara el usuario-empresa que instala IoT (cámaras, sensores, accesos biométricos):",
        bullets: [
          "Elabore una política de privacidad específica para cada dispositivo IoT instalado — incluyendo qué datos recolecta, quién los almacena, por cuánto tiempo y con quién se comparten.",
          "Implemente avisos de vigilancia visibles para cámaras en espacios de trabajo o áreas comunes (obligación de la Circular SIC 002/2015).",
          "Para accesos biométricos de empleados: obtenga autorización explícita por escrito — el dato biométrico es sensible, no puede tratarse con un clic en una app.",
          "Verifique si los datos van a servidores en el extranjero y asegúrese de que el proveedor tenga cláusulas contractuales de protección de datos compatibles con el Decreto 1377/2013.",
          "Establezca un protocolo de respuesta a brechas de seguridad: si un dispositivo IoT es hackeado, tiene 15 días para notificar a la SIC y a los titulares afectados (Circular SIC 005/2017).",
        ],
      },
    ],
    timeline: [
      {
        date: "2009",
        event:
          "Ley 1273 tipifica delitos informáticos en Colombia. El hackeo a dispositivos conectados a internet queda cubierto — aunque el IoT masivo aún no existía.",
      },
      {
        date: "2012",
        event:
          "Ley 1581 establece la protección de datos personales. Los dispositivos IoT serán, una década después, su caso de aplicación más complejo.",
      },
      {
        date: "2016",
        event:
          "La botnet Mirai infecta 600.000 dispositivos IoT (cámaras, routers) y ejecuta el mayor ataque DDoS de la historia. Colombia no tiene regulación de seguridad IoT — igual que hoy.",
      },
      {
        date: "2020",
        event:
          "CONPES 3995 establece la Política Nacional de Confianza y Seguridad Digital. Menciona IoT como vector de riesgo, pero sin crear obligaciones legales directas para fabricantes.",
      },
      {
        date: "2021",
        event:
          "Decreto 2590 regula el arrendamiento turístico de corta estadía en Colombia — pero no aborda la gestión de accesos biométricos ni los datos generados.",
      },
      {
        date: "2023",
        event:
          "Decreto 090 amplía competencias de la SIC para inspeccionar plataformas digitales que operan en Colombia, incluyendo proveedores de servicios IoT.",
      },
      {
        date: "2024",
        event:
          "Sonos deshabilita remotamente funcionalidades de dispositivos de usuarios que los compraron. En Colombia, el Estatuto del Consumidor no tiene respuesta clara para este escenario.",
      },
      {
        date: "2025",
        event:
          "Proyecto de Ley 043/2025 introduce regulación de IA — cubre sistemas IoT con componentes de IA (reconocimiento facial, análisis de comportamiento). Aún en trámite.",
      },
      {
        date: "2026",
        event:
          "Colombia supera los 12 millones de dispositivos IoT conectados. La SIC no ha emitido aún una guía específica de cumplimiento para fabricantes o distribuidores de IoT.",
      },
    ],
    keyTakeaways: [
      "Todo dispositivo IoT que recolecte datos de colombianos activa la Ley 1581 — sin excepción. El fabricante puede ser extranjero, el servidor puede estar en otro continente, pero si el dato pertenece a un colombiano, la ley colombiana aplica.",
      "Los datos biométricos (huella, iris, voz, rostro) usados en cerraduras, cámaras o asistentes son datos sensibles: su tratamiento sin autorización explícita es una infracción sancionable por la SIC con multas de hasta 2.000 SMLMV.",
      "Las infracciones estructurales — las que ocurren porque el ecosistema global no cumple la ley colombiana — no exoneran de responsabilidad. Distribuir en Colombia un dispositivo que no cumple la Ley 1581 expone al distribuidor a responsabilidad solidaria con el fabricante.",
      "El futuro biométrico plantea una pregunta de derechos fundamentales que Colombia no ha respondido: ¿puede el derecho a acceder a tu propia vivienda quedar condicionado a la conectividad de un servidor en el extranjero? La jurisprudencia de la Corte Constitucional sobre inviolabilidad del domicilio (art. 28 C.P.) tendrá que responderla.",
      "Para el abogado que asesora empresas: la auditoría de cumplimiento IoT no es una cuestión de TI — es una cuestión legal. Cada dispositivo conectado es una variable en la ecuación de responsabilidad de su cliente.",
    ],
    legalFramework:
      "Colombia: Ley 1581/2012 (Habeas Data), Decreto 1377/2013, Circular SIC 002/2015 (videovigilancia), Circular SIC 005/2017 (gestión de incidentes), Ley 1480/2011 (Estatuto del Consumidor), Ley 1273/2009 (delitos informáticos), Ley 675/2001 (propiedad horizontal), CONPES 3995/2020 (seguridad digital), Decreto 090/2023, Proyecto de Ley 043/2025 (regulación IA). Internacional: GDPR (Reglamento UE 2016/679), NIST SP 800-213 (IoT Cybersecurity), ETSI EN 303 645 (estándar de seguridad IoT para consumidor).",
    sources: [
      "Superintendencia de Industria y Comercio (SIC) — Guía de protección de datos para responsables del tratamiento, 2023",
      "Circular SIC 002/2015 — Lineamientos para el uso de sistemas de videovigilancia",
      "CONPES 3995/2020 — Política Nacional de Confianza y Seguridad Digital",
      "NIST SP 800-213 — IoT Device Cybersecurity Guidance for the Federal Government, 2021",
      "ETSI EN 303 645 — Cyber Security for Consumer Internet of Things, 2020",
      "Mirai botnet post-mortem — Krebs on Security, 2016",
      "Congreso de Colombia — Proyecto de Ley 043/2025, regulación de inteligencia artificial",
      "FTC Report — Internet of Things: Privacy & Security in a Connected World, 2015",
    ],
  },


  /* ── CASO 4 ──────────────────────────────────────────────────────────────────────────── */
  {
    slug: "privacidad-vs-proteccion-verificacion-edad-digital-2026",
    title: "Privacidad vs. Protección: el debate global sobre verificación de edad en la era de la IA",
    subtitle:
      "De un discurso viral en el Parlamento Europeo a la cédula digital colombiana: lo que el LegalTech necesita entender",
    date: "2026-04-22",
    category: "Regulación",
    tags: [
      "verificación de edad",
      "menores en internet",
      "Chat Control",
      "zero-knowledge proof",
      "DSA",
      "Ley 2489",
      "cédula digital",
      "cifrado E2EE",
    ],
    riskLevel: "medio",
    color: "#8B5CF6",
    excerpt: "Un europarlamentario denuncia control tecnocrático. Detrás de la retórica hay dos iniciativas que redefinen la arquitectura digital: una app de verificación de edad con zero-knowledge proofs, y el Chat Control que el Parlamento Europeo frenó. Colombia tiene una pieza clave que casi nadie menciona: la cédula digital con chip criptográfico que ya cumple el mismo estándar técnico europeo.",
    sections: [
      {
        number: "01",
        label: "El debate viral en su justa medida",
        title: "Dos iniciativas, una misma tensión",
        content: "El discurso viral de un europarlamentario denunciando una nueva herramienta de 'control tecnocrático' ha cristalizado una tensión fundamental de nuestro tiempo: el choque entre la protección de la infancia en internet y la preservación de la privacidad y las libertades civiles. Detrás de la retórica encendida sobre 'vigilancia masiva' y 'Unión Soviética 2.0' se esconde un debate jurídico y técnico de enorme calado que está redefiniendo la arquitectura misma de la sociedad digital. Para el sector LegalTech, comprender este fenómeno no es una opción: es una necesidad estratégica.\n\nEl europarlamentario se refiere a dos iniciativas europeas distintas, aunque frecuentemente confundidas en el debate público. La primera: una app de verificación de edad que permite demostrar ser mayor de 18 años para acceder a contenidos restringidos sin revelar identidad completa ni datos personales. La segunda: la propuesta de Reglamento CSAM, conocida como 'Chat Control', que pretendía obligar a las plataformas de mensajería a escanear las comunicaciones privadas de sus usuarios en busca de material de abuso sexual infantil.\n\nAmbas propuestas convergen en un mismo punto sensible: la tensión entre la seguridad de los menores y el derecho fundamental a la privacidad de las comunicaciones. La confusión entre ambas en el debate público genera más calor que luz. El trabajo del jurista es separarlas y analizarlas con rigor.",
      },
      {
        number: "02",
        label: "La App de Verificación de Edad",
        title: "Del certificado COVID al zero-knowledge proof",
        content: "En julio de 2025, la Comisión Europea presentó la primera versión de una solución de marca blanca para la verificación de edad, en respuesta a los requisitos del artículo 28 de la Ley de Servicios Digitales (DSA). El sistema funciona de manera similar a los certificados digitales utilizados durante la pandemia de COVID-19: el usuario lo configura una vez con su documento de identidad oficial o un proveedor de confianza acreditado — banco, escuela — y a partir de ese momento genera una prueba de edad que acredita ser mayor de 18 años, sin que la plataforma receptora acceda a ningún otro dato personal.\n\nLa analogía más clara es la del portero de una discoteca. La opción tradicional: mostrar el DNI completo (nombre, dirección, número de documento, fecha exacta de nacimiento). La opción ZKP: mostrar únicamente un certificado que dice 'esta persona es mayor de 18 años'. El portero obtiene la información que necesita; el usuario no revela nada más.\n\nComponente técnico: la prueba de conocimiento cero (zero-knowledge proof, ZKP) es un mecanismo criptográfico que permite demostrar la veracidad de una proposición sin revelar ninguna información adicional. La Comisión especifica que las pruebas siguen el esquema ISO/IEC 18013-5 (licencias de conducción móviles) e ISO/IEC 23220-2 para identificación electrónica genérica. El formato es ISO mDoc; la presentación usa la API de Credenciales Digitales del W3C y OpenID4VP.\n\nEstado en abril de 2026: Ursula von der Leyen confirmó que la aplicación está técnicamente lista. Siete estados miembros (Francia, Dinamarca, Grecia, Italia, España, Chipre e Irlanda) se han posicionado como pioneros. La adopción por las plataformas sigue siendo voluntaria, pero la Comisión espera que se convierta en el estándar de facto para el cumplimiento de la DSA.",
      },
      {
        number: "03",
        label: "La Cédula Digital Colombiana",
        title: "Colombia ya tiene la pieza técnica clave — sin saberlo",
        content: "Este es el dato más relevante para el LegalTech colombiano en todo este debate, y el que menos circula en el análisis local.\n\nLa aplicación de verificación de edad de la UE no es un proyecto aislado: es una pieza dentro del Reglamento eIDAS 2.0 y el European Digital Identity Wallet (EUDI Wallet), adoptado en mayo de 2024. La app sirve de puente hasta que los EUDI Wallets estén plenamente operativos a finales de 2026, momento en que la verificación de edad se incorporará directamente a las carteras de identidad digital nacionales.\n\nLa conexión colombiana: la cédula de ciudadanía digital colombiana, en circulación desde 2020 con chip criptográfico, cumple con el estándar internacional ICAO 9303 para documentos de viaje con chip. Este es exactamente el mismo estándar técnico que utiliza la arquitectura europea para leer y validar documentos de identidad.\n\nEn términos prácticos: un ciudadano colombiano podría, técnicamente, usar su cédula digital para generar una prueba zero-knowledge de mayoría de edad ante una plataforma europea, siempre que exista un puente de confianza bilateral Colombia-UE, similar a los acuerdos de reconocimiento mutuo bajo eIDAS. Este puente no existe hoy, pero su viabilidad técnica está garantizada por la compatibilidad de estándares.\n\nPara el MinTIC: el decreto reglamentario de la Ley 2489/2025 podría — y debería — contemplar la cédula digital como mecanismo de verificación de edad válido, aprovechando la infraestructura criptográfica ya desplegada. Para una plataforma LegalTech: implementar ICAO 9303 + ZKP en Colombia es cumplir simultáneamente con la Ley 2489 y la DSA europea.",
        bullets: [
          "La cédula digital colombiana (chip criptográfico, desde 2020) cumple ICAO 9303 — el mismo estándar de la arquitectura europea. La infraestructura ya existe.",
          "Viabilidad técnica confirmada: un acuerdo de reconocimiento mutuo Colombia-UE (como los de eIDAS) activaría la interoperabilidad sin cambios en la cédula.",
          "Para el MinTIC: el decreto reglamentario de la Ley 2489/2025 debería reconocer la cédula digital como mecanismo de verificación válido bajo el estándar ZKP.",
          "Para plataformas LegalTech: implementar ICAO 9303 + ZKP es cumplir simultáneamente con Ley 2489 (Colombia) y DSA art. 28 (UE). Compliance multijurisdiccional por diseño.",
        ],
      },
      {
        number: "04",
        label: "Chat Control: La Cronología Real",
        title: "La fractura institucional y la batalla por el cifrado E2EE",
        content: "La propuesta de Reglamento CSAM fue presentada por la Comisión Europea en mayo de 2022. En su formulación original pretendía obligar a los servicios de mensajería — WhatsApp, Signal, Telegram — a escanear comunicaciones y archivos en busca de CSAM usando IA. El problema técnico fundamental: este escaneo requiere debilitar o romper el cifrado de extremo a extremo (E2EE) que protege la privacidad de las comunicaciones.\n\nLa cronología real del proceso, frecuentemente distorsionada en el debate público:",
        bullets: [
          "Mayo 2022: Comisión presenta la propuesta original con obligación de escaneo masivo.",
          "Octubre 2025: La votación es cancelada por falta de apoyo. Dinamarca, que presidía el Consejo, revierte su posición sobre la obligatoriedad del escaneo.",
          "26 noviembre 2025: El Consejo de la UE adopta su posición ELIMINANDO la obligación de escanear mensajes cifrados — retroceso significativo respecto a la propuesta original.",
          "Marzo 2026: El Parlamento Europeo vota limitar cualquier escaneo exclusivamente a contenido ya identificado, con sospecha fundamentada y autorización judicial (311 votos contra 228).",
          "4 abril 2026: Expira el régimen temporal (Regl. UE 2021/1232) que permitía el escaneo voluntario. Sin acuerdo, los gigantes tecnológicos deben cesar el escaneo indiscriminado de comunicaciones europeas.",
          "Nota editorial: en el entorno regulatorio europeo son frecuentes los períodos de gracia técnica para evitar vacíos legales abruptos. El sector LegalTech debe monitorear las comunicaciones de la DG HOME en las próximas semanas.",
        ],
      },
      {
        number: "05",
        label: "El Problema Técnico de Fondo",
        title: "Por qué escanear mensajes cifrados tiene un precio inaceptable",
        content: "El debate sobre el Chat Control es, en su núcleo, un debate técnico con consecuencias jurídicas inevitables. El cifrado de extremo a extremo (E2EE) garantiza que solo el emisor y el receptor pueden leer el contenido de un mensaje. Cualquier forma de escaneo antes del cifrado — el llamado client-side scanning — implica instalar un software en el dispositivo del usuario que analiza el contenido antes de que sea cifrado y enviado.\n\nLos expertos en seguridad y criptografía han señalado tres problemas que ningún legislador ha resuelto hasta hoy:",
        bullets: [
          "No existe manera técnicamente viable de escanear mensajes cifrados sin debilitar el cifrado: cualquier mecanismo de client-side scanning crea una vulnerabilidad explotable por actores maliciosos. Una puerta trasera para los buenos es una puerta trasera para todos.",
          "Las tasas de error de los algoritmos de IA son inaceptablemente altas: los sistemas de detección de CSAM generan falsos positivos que pueden someter a ciudadanos inocentes a investigaciones injustificadas. En Colombia, una decisión automatizada así es impugnable bajo la Ley 1581.",
          "Existen alternativas menos intrusivas: mejor aplicación de leyes existentes, apoyo a líneas de denuncia, educación digital y herramientas de control parental — señaladas por EFF y EDRi como igualmente eficaces sin requerir vigilancia masiva.",
          "El precedente del TJUE es vinculante: en Digital Rights Ireland (C-293/12, 2014), el Tribunal declaró inválida la retención masiva de datos de comunicaciones por constituir una injerencia en los derechos de la práctica totalidad de la población sin garantías suficientes.",
        ],
      },
      {
        number: "06",
        label: "El Mundo: EEUU y América Latina",
        title: "Un mosaico de normas con el mismo problema de fondo",
        content: "A diferencia del enfoque centralizado europeo, Estados Unidos presenta una regulación fragmentada por estados, sin equivalente al Chat Control a nivel federal. El enfoque estadounidense se centra en la verificación de edad en el punto de acceso y en obligaciones de seguridad por diseño, sin cuestionar el cifrado E2EE.\n\nPanorama estatal en EEUU: Utah, Texas y Luisiana han promulgado App Store Accountability Laws que exigen a las tiendas de aplicaciones verificar la edad de los usuarios. California aprobó en octubre de 2025 la Digital Age Assurance Act, que obliga a los proveedores de sistemas operativos a enviar una señal con el rango de edad del usuario a los desarrolladores de apps. Illinois plantea ir más lejos con el SB3977: trasladar la verificación al nivel de sistema operativo (Apple, Google, Microsoft) antes del 1 de enero de 2028. A nivel federal, KOSA (Kids Online Safety Act) se centra en transparencia algorítmica y restricción de funciones adictivas, no en escaneo de comunicaciones.\n\nAmérica Latina: Colombia con la Ley 2489/2025 y Brasil con el ECA Digital (Ley 15.211/2025, en vigor desde marzo de 2026) muestran el Efecto Bruselas en acción: estándares europeos adoptados con particularidades locales. La diferencia de exigencia es notable: Colombia focaliza en salvaguardas técnicas y control parental; Brasil prohíbe la autodeclaración de edad, establece multas de hasta 50 millones de reales o el 10% de ingresos anuales, y exige representante legal local para proveedores extranjeros.\n\nAustralia: en noviembre de 2024 aprobó la ley de redes sociales más restrictiva del mundo, prohibiendo el acceso de menores de 16 años a plataformas como TikTok, Instagram y X, sin excepciones por consentimiento parental. Es el punto más extremo del espectro regulatorio.",
        bullets: [
          "EEUU: sin equivalente federal al Chat Control. California Digital Age Assurance Act (oct. 2025) y el enfoque de Illinois (verificación a nivel de SO) son los modelos técnicamente más sofisticados.",
          "Colombia: Ley 2489/2025 activa, decreto reglamentario MinTIC en preparación. Enfoque: salvaguardas técnicas + control parental. Sin restricción general de acceso para menores.",
          "Brasil: ECA Digital en vigor desde marzo 2026. Autodeclaración prohibida, multas severas, representante local obligatorio. El régimen más exigente de la región.",
          "Australia: prohibición directa de acceso de menores de 16 años a redes sociales. El extremo más restrictivo del espectro global — y el más cuestionado en implementación.",
        ],
      },
      {
        number: "07",
        label: "Implicaciones LegalTech",
        title: "Compliance multijurisdiccional, sesgos y el mercado de auditoría",
        content: "El escenario descrito genera cuatro áreas de trabajo concretas para el operador LegalTech colombiano.\n\nCompliance multijurisdiccional modular: las plataformas con presencia en Colombia, Brasil y la UE deben implementar arquitecturas que permitan adaptar los mecanismos de verificación a los requisitos específicos de cada régimen. La diferencia entre Colombia (salvaguardas técnicas) y Brasil (prohibición de autodeclaración + representante local) es suficiente para que un mismo sistema sea válido en uno e inválido en el otro.\n\nPrivacy by Design como estándar legal, no como buena práctica: el artículo 25 del GDPR y los principios del artículo 4 de la Ley 1581 exigen minimización de datos por diseño. Un sistema de verificación que recolecta nombre, foto y documento cuando existe la alternativa ZKP no solo es menos privado — puede ser incompliant. El MinTIC debería establecer la ZKP como estándar de referencia en el decreto reglamentario de la Ley 2489.\n\nSesgo algorítmico en estimación biométrica de edad: varios sistemas comerciales estiman la edad mediante reconocimiento facial. Estos heredan los sesgos de sus datos de entrenamiento: subestiman la edad de personas de piel oscura, sobreestiman la de personas de piel clara. En Colombia, una decisión automatizada que niega acceso a un servicio por estimación errónea de edad es impugnable bajo la Ley 1581 y la jurisprudencia constitucional sobre decisiones automatizadas.\n\nEl mercado de auditoría: el ECA Digital brasileño obliga a plataformas con más de un millón de usuarios menores a publicar informes semestrales de transparencia. La DSA europea tiene exigencias similares. Esto abre un nicho LegalTech concreto: herramientas y servicios de auditoría técnico-jurídica de sistemas de verificación de edad.",
      },
      {
        number: "08",
        label: "La Pregunta sin Respuesta Fácil",
        title: "La tecnología ya resolvió el problema — el desafío ahora es político",
        content: "El debate sobre verificación de edad y Chat Control no es un debate técnico: es un debate sobre valores. Pero tiene una lógica constitucional clara, al menos en Colombia.\n\nEl artículo 15 de la Constitución garantiza la intimidad y el secreto de las comunicaciones. El artículo 44 eleva a derecho fundamental la protección de los niños. Cuando dos derechos fundamentales colisionan, la Corte Constitucional aplica el juicio de proporcionalidad: la medida restrictiva debe ser idónea (sirve al fin), necesaria (no existe alternativa menos restrictiva igualmente eficaz) y proporcional en sentido estricto.\n\nBajo ese juicio, el Chat Control en su versión de escaneo masivo no supera el filtro de necesidad: existe una alternativa menos restrictiva — la vigilancia basada en sospecha concreta y autorizada judicialmente — que es igualmente eficaz para perseguir el delito sin sacrificar el secreto de las comunicaciones de toda la población. El Parlamento Europeo llegó a la misma conclusión con 311 votos.\n\nBajo ese mismo juicio, la verificación de edad mediante ZKP sí podría superar el filtro: es idónea (verifica la edad), necesaria (no hay alternativa igualmente eficaz con menor recolección de datos) y proporcional (costo en privacidad prácticamente nulo).\n\nLa conclusión LegalTech: la tecnología ya resolvió el problema. La ZKP permite verificar sin vigilar. La cédula digital colombiana ya tiene el chip que lo hace posible. El desafío ahora no es técnico ni jurídico — es político: lograr que el MinTIC, en el decreto reglamentario de la Ley 2489/2025, adopte la ZKP como estándar de referencia y no acepte soluciones que sacrifiquen privacidad cuando existe una alternativa que no lo hace.",
      },
    ],
    timeline: [
      {
        date: "Mayo 2022",
        event: "La Comisión Europea presenta la propuesta de Reglamento CSAM (Chat Control).",
      },
      {
        date: "Julio 2025",
        event: "Blueprint inicial de la app de verificación de edad de la UE bajo DSA art. 28.",
      },
      {
        date: "Octubre 2025",
        event: "Segunda versión mejorada del blueprint europeo con ZKP. Votación del Chat Control cancelada por falta de apoyo; Dinamarca revierte su posición.",
      },
      {
        date: "Octubre 2025",
        event: "California aprueba la Digital Age Assurance Act, obligando a los SO a señalizar el rango de edad del usuario a los desarrolladores de apps.",
      },
      {
        date: "26 Noviembre 2025",
        event: "El Consejo de la UE adopta su posición eliminando la obligación de escanear mensajes cifrados.",
      },
      {
        date: "2025",
        event: "Colombia promulga la Ley 2489/2025. Brasil promulga el ECA Digital (Ley 15.211/2025).",
      },
      {
        date: "Marzo 2026",
        event: "El Parlamento Europeo vota limitar cualquier escaneo a contenido ya identificado, con autorización judicial (311 votos contra 228). ECA Digital brasileño entra en vigor.",
      },
      {
        date: "4 Abril 2026",
        event: "Expira el régimen temporal de escaneo voluntario de CSAM (Regl. UE 2021/1232). Sin acuerdo sobre prórroga.",
      },
      {
        date: "15 Abril 2026",
        event: "Von der Leyen confirma la app de verificación de edad técnicamente lista. Siete estados miembros como pioneros.",
      },
      {
        date: "Finales 2026",
        event: "Fecha prevista para operación plena de los EUDI Wallets. La verificación de edad ZKP se integra en carteras de identidad digital nacionales.",
      },
    ],
    keyTakeaways: [
      "La Ley 2489/2025 establece obligaciones de verificación de edad vigentes en Colombia. El decreto reglamentario del MinTIC definirá los estándares técnicos aceptados — el proceso de consulta pública es el momento para exigir que la ZKP sea el estándar de referencia.",
      "La cédula digital colombiana (chip criptográfico ICAO 9303, en circulación desde 2020) es técnicamente compatible con la arquitectura europea de verificación de edad. Un acuerdo de reconocimiento mutuo Colombia-UE activaría la interoperabilidad sin cambios en la infraestructura existente.",
      "El Chat Control en su versión de escaneo masivo no supera el juicio de proporcionalidad constitucional colombiano: el artículo 15 C.P. (secreto de las comunicaciones) protege a todos los ciudadanos, y existe una alternativa menos restrictiva igualmente eficaz.",
      "La ZKP cumple con el principio de minimización de datos de la Ley 1581 mejor que cualquier alternativa comercial disponible. Un sistema de verificación que recolecta documentos y selfies cuando existe la alternativa ZKP puede ser incompliant.",
      "Los sistemas de estimación de edad por IA facial son impugnables en Colombia como decisiones automatizadas discriminatorias (Ley 1581 + jurisprudencia constitucional). El argumento es ya aplicable a los sistemas comerciales de verificación biométrica disponibles en el mercado.",
    ],
    legalFramework: "Colombia: Ley 2489/2025 (entornos digitales seguros para menores), Ley 1581/2012 (minimización de datos, decisiones automatizadas), Constitución Política arts. 15 (intimidad y comunicaciones) y 44 (derechos del niño), Registro Civil — cédula digital ICAO 9303. Unión Europea: DSA Regl. 2022/2065 (art. 28), GDPR Regl. 2016/679 (art. 25 Privacy by Design), eIDAS 2.0 (mayo 2024), Carta DDFF arts. 7-8, TJUE Digital Rights Ireland C-293/12. Brasil: Ley 15.211/2025 (ECA Digital). Estados Unidos: California Digital Age Assurance Act (oct. 2025), Florida HB3 (2024), Illinois SB3977, KOSA. Estándares técnicos: ICAO 9303, ISO/IEC 18013-5, ISO/IEC 23220-2, W3C Digital Credentials API, OpenID4VP.",
    sources: [
      "Comisión Europea — Blueprint app verificación de edad v1 (julio 2025) y v2 (octubre 2025)",
      "Comisión Europea — Anuncio de disponibilidad técnica, declaración Von der Leyen, 15 abril 2026",
      "Parlamento Europeo — Votación Chat Control, 26 marzo 2026 (311-228-92)",
      "Consejo de la UE — Posición sobre Reglamento CSAM, 26 noviembre 2025",
      "TJUE — Digital Rights Ireland, C-293/12 y C-594/12, 2014",
      "Registro Civil Colombia — Especificaciones técnicas cédula digital ICAO 9303",
      "Age Verification Providers Association — Mapa legislación estatal EEUU, agosto 2025",
      "UNICEF — Declaración sobre restricciones de edad en plataformas digitales, diciembre 2025",
      "EFF / EDRi — Análisis técnico-jurídico Chat Control y alternativas, 2025-2026",
      "MinTIC Colombia — Proyecto de decreto reglamentario Ley 2489/2025",
    ],
  },

  /* ── CASO 5: SpinLoyalty ─────────────────────────────────────── */
  {
    slug: "spinloyalty-inteligencia-juridica-predictiva-marcas-colombia",
    title: "SpinLoyalty: Cuando la estadística entra al estrado marcario",
    subtitle: "Una plataforma de inteligencia jurídica predictiva que convierte cientos de resoluciones de la SIC en probabilidades accionables para oposiciones por competencia desleal",
    excerpt: "¿Qué tan parecida tiene que ser una marca para que la SIC la declare desleal? SpinLoyalty intenta responder esa pregunta con modelos bayesianos jerárquicos, distancias de Levenshtein y análisis de componentes principales. Pero el verdadero debate es si ese número —78% de probabilidad de denegación— tiene peso en un estrado.",
    date: "2026-04-21",
    category: "Regulación",
    riskLevel: "medio",
    color: "#10B981",
    tags: ["Decisión 486", "Competencia Desleal", "SIC", "Estadística Bayesiana", "Propiedad Industrial"],
    legalFramework: "Decisión 486 CAN — Art. 136 lit. a): riesgo de confusión directa e indirecta\nDecisión 486 CAN — Art. 137: irregistrabilidad por competencia desleal (aprovechamiento parasitario)\nDecisión 486 CAN — Art. 224: definición y factores de notoriedad marcaria\nLey 256/1996 (Colombia) — Ley de Competencia Desleal: prohibición de aprovechamiento de reputación ajena (Art. 15)\nCódigo General del Proceso — Arts. 227-241: prueba pericial, admisibilidad y contradicción\nDecreto 4886/2008 — Organización y funciones de la SIC\nCaso WooMooN (SD2016/0037470) — Precedente SIC: valoración de mala fe subjetiva a partir de indicios objetivos\nDoctrina TJCA — Carácter indiciario del Art. 137 y carga de la prueba en sede marcaria",
    sources: [
      "Superintendencia de Industria y Comercio — Base de datos de resoluciones de propiedad industrial (acceso público)",
      "Comisión de la Comunidad Andina — Decisión 486 de 2000 (Régimen Común sobre Propiedad Industrial)",
      "Gelman, A. et al. — Bayesian Data Analysis, 3rd ed. (CRC Press, 2013)",
      "Bürkner, P-C. — brms: An R Package for Bayesian Multilevel Models (Journal of Statistical Software, 2017)",
      "van der Loo, M.P.J. — The stringdist Package for Approximate String Matching (R Journal, 2014)",
      "OMPI / WIPO — Estadísticas de Litigiosidad Marcaria en la Comunidad Andina, 2024",
      "LegalTech Co. — Debate comunitario SpinLoyalty (publicación original del autor, abril 2026)",
    ],
    keyTakeaways: [
      "SpinLoyalty convierte cuatro dimensiones jurídicas del Art. 137 — notoriedad, similitud, conexidad y mala fe — en variables estadísticas medibles, combinadas en un modelo bayesiano jerárquico con efectos aleatorios por clase de Niza y por año.",
      "La diferencia estratégica no es el porcentaje en sí, sino el salto epistémico: pasar de 'esto huele a competencia desleal' a 'en el 82% de 347 casos análogos de esta clase, la SIC denegó el registro'. El argumento se vuelve empírico, no retórico.",
      "La admisibilidad ante la SIC depende de cumplir el estándar de prueba pericial del CGP: metodología replicable, experto idóneo y posibilidad de contradicción. Un modelo brms documentado puede cumplirlo; una caja negra, no.",
      "El Bayesian updating es la respuesta al mayor miedo del litigante: que la SIC cambie de criterio. Cada nueva resolución actualiza las distribuciones posteriores; el sistema evoluciona con la jurisprudencia.",
      "La mala fe (Art. 137) tiene un límite estadístico claro: podemos detectar patrones de conducta objetivos, pero la intención subjetiva siempre requerirá valoración humana. SpinLoyalty cuantifica el indicio; el abogado construye el argumento.",
    ],
    timeline: [
      {
        date: "2000",
        event: "Decisión 486 CAN entra en vigor — el Art. 137 establece la competencia desleal como causal autónoma de irregistrabilidad en los cuatro países andinos.",
      },
      {
        date: "2016",
        event: "Caso WooMooN (SD2016/0037470) — la SIC fija doctrina: la mala fe puede inferirse de un patrón de solicitudes que imitan marcas de terceros.",
      },
      {
        date: "2022–2024",
        event: "Explosión de IA jurídica en contratos y due diligence, pero vacío total en análisis predictivo de riesgo marcario en Colombia.",
      },
      {
        date: "2025",
        event: "Nace la idea SpinLoyalty, un software de la categoría LegalTech, con el propósito de estructurar el primer motor estadístico para predecir resoluciones de la SIC sobre Art. 137.",
      },
      {
        date: "Abril 2026",
        event: "Debate público en LegalTech Co. — la idea se abre a la comunidad para resolver las preguntas de admisibilidad, mala fe estadística y modelo de negocio.",
      },
    ],
    sections: [
      {
        number: "01",
        label: "El Problema",
        title: "La pregunta que quita el sueño",
        content: "Hay una pregunta que todo abogado de propiedad industrial conoce de memoria: '¿Qué tan parecida tiene que ser esta marca para que la SIC la considere un aprovechamiento parasitario?'. Es la pregunta que llega cuando el cliente muestra emocionado su nuevo logo y tú notas que se parece peligrosamente al de un competidor consolidado. Y la respuesta honesta, durante décadas, ha sido una mezcla de intuición, experiencia y horas leyendo el complejo buscador de la SIC.\n\nEsa incertidumbre tiene un costo real. Para el emprendedor, es el miedo a lanzar un producto y recibir una demanda ruinosa meses después. Para la empresa establecida, es no saber cuánto valen sus años de construcción de marca frente a un imitador oportunista. Para el abogado, es tener que dar una opinión jurídica robusta sin datos duros que la respalden.\n\nEl artículo 137 de la Decisión 486 de la Comunidad Andina regula esta causal: un signo puede ser irregistrable si su solicitud busca 'perpetrar, facilitar o consolidar un acto de competencia desleal', especialmente el aprovechamiento de la reputación ajena. La norma existe. La jurisprudencia de la SIC existe. Lo que no existía era una forma sistemática de convertir esos cientos de precedentes en una herramienta de análisis predictivo que cualquier abogado pudiera usar.",
        bullets: [
      "La SIC emite decenas de resoluciones anuales sobre Art. 137; sin sistematización, cada caso se analiza desde cero",
      "El sistema de búsqueda público de la SIC no permite análisis de patrones ni exportación masiva de datos",
      "La respuesta 'depende' tiene un costo real: tiempo de investigación, inconsistencia en asesoría y negociaciones sin base empírica",
      "Los litigantes que han memorizado más precedentes tienen ventaja, pero esa ventaja no es escalable ni democratizable",
      ],
      },
      {
        number: "02",
        label: "La Solución",
        title: "SpinLoyalty: del instinto a la evidencia empírica",
        content: "SpinLoyalty es una plataforma de inteligencia jurídica predictiva que combina procesamiento de lenguaje natural (NLP), métodos estadísticos bayesianos y una base de datos exhaustiva de resoluciones de la SIC para calcular la probabilidad de que una oposición por competencia desleal prospere. No es una IA generativa que redacta escritos; es un motor analítico que convierte jurisprudencia en datos accionables.\n\nEl flujo básico es simple: el usuario ingresa los datos del caso (signo solicitado, signo oponente, clase de Niza, antigüedad del oponente, presencia geográfica, historial de solicitudes del solicitante). El sistema devuelve tres hallazgos clave: un semáforo de riesgo con probabilidad e intervalo de credibilidad, un desglose de los factores de mayor peso —¿es la similitud fonética o la notoriedad del oponente lo que mueve más la aguja?— y un listado de resoluciones análogas con enlace directo al PDF oficial de la SIC.\n\nEl módulo de simulación —el más estratégicamente valioso— permite el análisis what-if en tiempo real: cambiar 'Café Mañanero' por 'Café Amanecer Serrano' y ver cómo la probabilidad de conflicto cae del 78% al 22%. Eso transforma la conversación con el cliente: en lugar de 'creo que hay riesgo', puedes decir 'si modificas el elemento denominativo de esta forma, el riesgo cae significativamente según el histórico de la SIC'.",
        bullets: [
      "Predictor de riesgo: probabilidad puntual + intervalo de credibilidad bayesiano para el Art. 137",
      "Simulador what-if: ajuste de variables en tiempo real con recalculación instantánea del riesgo",
      "Analítica de precedentes: dashboard de tendencias por clase de Niza, año, examinador y resultado",
      "Generador de argumentos: líneas argumentales sugeridas con citas de resoluciones análogas y tasas de éxito",
      "Reportes periciales: documentos en formato legal (PDF/Word) listos para adjuntar en escritos de oposición",
      ],
      },
      {
        number: "03",
        label: "Arquitectura Técnico-Jurídica",
        title: "Las cuatro dimensiones del modelo",
        content: "El modelo no es una caja negra. Cada variable tiene su sustento en la Decisión 486 y en la doctrina de la SIC. El Art. 224 define los factores de notoriedad: antigüedad, extensión geográfica, inversión publicitaria, cifras de ventas y conocimiento en el sector. El Art. 136 delimita los planos de similitud: denominativo, gráfico y conceptual. La jurisprudencia sobre conexidad competitiva precisa qué mercados se consideran relacionados. Y el caso WooMooN (SD2016/0037470) fija la doctrina sobre los indicios objetivos de mala fe.\n\nDimensión 1 — Notoriedad: se construye un índice sintético combinando antigüedad de uso, extensión geográfica, inversión publicitaria ajustada por inflación, cifras de ventas y existencia de declaratoria formal. Método integrador: Análisis de Componentes Principales (PCA) para reducir estas variables correlacionadas en un solo predictor robusto (prcomp() sobre la matriz estandarizada, primer componente).\n\nDimensión 2 — Similitud: tres planos medidos con métodos distintos. Fonética: distancia de Levenshtein normalizada (stringdist::stringdist(method='lv')). Gráfica: embeddings de redes convolucionales pre-entrenadas (VGG16) con distancia coseno. Conceptual: Word2Vec o GloVe en español para capturar equivalencias semánticas. Dimensión 3 — Conexidad: MCA sobre clase de Niza, descripciones TF-IDF, canal de comercialización y segmento de precio. Dimensión 4 — Mala Fe: Análisis de Clases Latentes (LCA) sobre patrón de solicitudes previas del mismo solicitante, conocimiento previo inferible y solicitudes en múltiples clases para el mismo signo.",
        bullets: [
      "Notoriedad → PCA sobre 8 variables del Art. 224 → índice sintético [0,1]",
      "Similitud → Levenshtein (fonética) + CNN embeddings (gráfica) + Word2Vec (conceptual) → distancia compuesta",
      "Conexidad → MCA sobre clase Niza + TF-IDF + canal + precio → posición en mercado relevante",
      "Mala Fe → LCA sobre patrón de solicitudes + conocimiento previo + solicitudes multi-clase → perfil de riesgo latente",
      ],
      },
      {
        number: "04",
        label: "El Motor Estadístico",
        title: "Por qué un modelo bayesiano jerárquico",
        content: "El modelo integrador es un modelo logístico bayesiano jerárquico implementado en R con el paquete brms. La variable dependiente es binaria: la SIC aplica o no el Art. 137. Los cuatro índices de dimensión entran como predictores de efectos fijos. La clase de Niza y el año de la resolución entran como efectos aleatorios — interceptos que capturan la heterogeneidad no observada entre industrias y la evolución jurisprudencial en el tiempo.\n\nLa elección bayesiana tiene tres ventajas concretas para el litigio marcario. Primera: incertidumbre cuantificada. El modelo no devuelve '78%' como número puntual, sino una distribución completa de probabilidad con intervalos de credibilidad — 'hay un 95% de probabilidad de que la probabilidad real esté entre 65% y 88%'. Eso es más honesto y más útil ante un cliente o un funcionario que un número sin contexto.\n\nSegunda: Bayesian updating. Cuando la SIC emite un fallo novedoso — digamos, dando peso inesperadamente alto a la identidad de colores del empaque — las distribuciones posteriores se actualizan incorporando el nuevo dato. El modelo aprende con la jurisprudencia, no queda obsoleto con un fallo innovador. Tercera: prioris informativas. El conocimiento experto del abogado puede codificarse formalmente: si sabemos que la similitud fonética históricamente pesa más que la conceptual en la SIC, eso se refleja en la distribución a priori del coeficiente.",
        bullets: [
      "Distribución completa de probabilidad, no solo valor puntual — el intervalo de credibilidad es el argumento real",
      "Bayesian updating: cada nueva resolución SIC actualiza el modelo sin reentrenamiento desde cero",
      "Efectos aleatorios por clase de Niza y por año: la Clase 30 (alimentos) se juzga diferente a la Clase 25 (ropa)",
      "Prioris informativas: el conocimiento experto del abogado entra formalmente al modelo, no se descarta",
      "Implementación transparente en brms (R): código replicable, auditable, listo para peritaje técnico",
      ],
      },
      {
        number: "05",
        label: "El Argumento en el Estrado",
        title: "Del subjetivo al probatorio: la diferencia que importa",
        content: "La diferencia entre el argumento tradicional y el argumento potenciado por SpinLoyalty no es estética, es epistemológica. Argumento tradicional: 'Señor Superintendente, la marca solicitada Café Mañanero evoca de manera innegable a la reconocida Sello Mañanero, generando un riesgo evidente de asociación.' Argumento empírico: 'Señor Superintendente, un análisis de 347 resoluciones de esa misma entidad para la Clase 30 en los últimos 5 años revela que en el 82% de los casos donde concurren una distancia de Levenshtein inferior a 3 caracteres y un índice de notoriedad superior al percentil 75, la decisión fue denegar el registro. Adjuntamos el análisis estadístico y los 284 precedentes análogos que sustentan esta probabilidad.'\n\nLa admisibilidad ante la SIC no es automática. El Código General del Proceso exige que la prueba pericial sea elaborada por experto idóneo, con metodología replicable y susceptible de contradicción (Arts. 227-241 CGP). Una caja negra con un porcentaje nunca pasará ese filtro. Un modelo brms documentado, con código abierto, coeficientes interpretables e intervalos de credibilidad, tiene argumentos mucho más sólidos para ser admitido.\n\nEl límite más importante es el de la mala fe. Los patrones estadísticos pueden detectar indicios objetivos: un solicitante que ha presentado 12 marcas similares a las de sus competidores en los últimos 3 años genera una señal estadística clara. Pero la intención subjetiva — el dolo en sentido jurídico — siempre requerirá valoración humana. SpinLoyalty cuantifica el indicio; el abogado construye el argumento.",
        bullets: [
      "Salto de la percepción a la evidencia: el número no reemplaza al abogado, lo arma con datos objetivos",
      "Estándar CGP para prueba pericial: metodología replicable + experto idóneo + posibilidad de contradicción",
      "Ventaja en negociación: 'tengo 78% de probabilidad según el historial de la SIC' es una posición de fuerza basada en hechos",
      "Mala fe tiene un techo estadístico: detectable como patrón de conducta, pero la intención subjetiva es irreemplazablemente humana",
      "Debida diligencia pre-lanzamiento: empresas evalúan múltiples opciones de branding antes de invertir en posicionamiento",
      ],
      },
      {
        number: "06",
        label: "Debate Abierto",
        title: "Las preguntas que la comunidad debe resolver",
        content: "SpinLoyalty abre cuatro preguntas que el litigio marcario colombiano aún no ha tenido que responder pero deberá responder pronto. La primera es la admisibilidad probatoria en sede administrativa: ¿qué credibilidad le otorgaría la SIC a un informe pericial basado en un modelo estadístico? La respuesta puede llegar antes de lo esperado: la SIC ya acepta encuestas de percepción como prueba directa de notoriedad, y una encuesta es, en esencia, un instrumento estadístico. El paso siguiente es una evolución, no una ruptura.\n\nLa segunda toca el núcleo del Art. 137: ¿puede un patrón estadístico de solicitudes de marcas similares ser suficiente indicio de mala fe? El caso WooMooN mostró que la SIC está dispuesta a inferir mala fe de indicios objetivos. SpinLoyalty propone operacionalizar ese análisis. Pero la línea entre indicio estadístico y presunción iuris et de iure es delicada, y cruzarla sin advertirlo sería un error jurídico con consecuencias serias.\n\nLa tercera es estratégica: ¿qué modelo de acceso tiene sentido? ¿Suscripción mensual para firmas de propiedad industrial? ¿Pay-per-report para litigantes ocasionales? ¿Licencia para la propia SIC como herramienta de análisis interno? La democratización del acceso a inteligencia jurídica basada en evidencia depende tanto del modelo de negocio como de la solidez técnica. La cuarta es la más incómoda: ¿qué pasa cuando el modelo se equivoca? Un intervalo de credibilidad del 95% significa que en 1 de cada 20 casos, la predicción está fuera del rango. En un expediente de alta cuantía, ese 5% puede ser ruinoso si el abogado presentó el número como certeza en lugar de como probabilidad informada.",
        bullets: [
      "Admisibilidad SIC: la entidad ya acepta encuestas estadísticas — el paso a modelos predictivos es una evolución natural",
      "Mala fe estadística: indicio objetivo sí, presunción automática no — la valoración subjetiva es irreemplazablemente humana",
      "Modelo de negocio: el acceso democratizado requiere que el precio no reproduzca las asimetrías que busca corregir",
      "Gestión del error: un modelo que no comunica su incertidumbre es más peligroso que uno que admite el 5% de margen",
      "Variable pendiente: el rol del examinador individual — la SIC no decide de forma homogénea entre funcionarios",
      ],
      },
    ],
  },
];
