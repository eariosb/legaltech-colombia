import type { IconName } from "@/components/icons/Icon";

export interface Concept {
  term: string;
  definition: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Challenge {
  title: string;
  description: string;
  type: "risk" | "challenge" | "opportunity" | "practice";
}

export interface LegalNorm {
  name: string;
  description: string;
  scope: string;
  impact: string;
}

export interface MetricCard {
  label: string;
  value: string;
  description: string;
  color: "emerald" | "amber" | "rose" | "violet" | "sky";
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  color?: string;
}

/* ────────────────────────────────────────────────────────────
 *  Marco pedagógico
 * ──────────────────────────────────────────────────────────── */

export interface Analogy {
  title: string;
  metaphor: string;
  bridge: string;
}

export interface LiveDemo {
  tool: string;
  steps: string[];
  outcome: string;
}

export interface PedagogicalAct {
  /** "I" Fundamento · "II" Ejecución · "III" Diálogo Holístico */
  act: "I" | "II" | "III";
  /** Título del acto tal como se anuncia en sala */
  title: string;
  /** Minutos sugeridos de duración */
  duration: string;
  /** Propósito pedagógico del acto, en una o dos frases */
  purpose: string;
  /** Ideas-fuerza del acto (máx. 4, redactadas en voz activa) */
  beats?: string[];
  /** Analogía principal, cuando aplica (típico del Acto I) */
  analogy?: Analogy;
  /** Demostración práctica, cuando aplica (típico del Acto II) */
  demo?: LiveDemo;
}

export interface DisruptiveQuestion {
  /** Audiencia a la que se lanza la pregunta */
  audience: "abogado" | "developer" | "todos";
  /** La pregunta, formulada para provocar diálogo */
  question: string;
  /** Pista de por dónde suele aterrizar la respuesta (no cerrarla) */
  insight?: string;
}

/* ────────────────────────────────────────────────────────────
 *  Dilema forzado — tres opciones que
 *  todas cuestan algo, y un entregable de una página.
 * ──────────────────────────────────────────────────────────── */

export interface DilemmaOption {
  /** Etiqueta corta para citar la opción en sala (A, B, C) */
  label: "A" | "B" | "C";
  /** Título corto de la decisión */
  title: string;
  /** Riesgo jurídico específico, con norma citada cuando aplica */
  legalRisk: string;
  /** Riesgo técnico o de negocio, cuantificado cuando se pueda */
  technicalRisk: string;
}

export interface Dilemma {
  /** El caso real, en una o dos frases concretas */
  scenario: string;
  /** Restricción que obliga a decidir (tiempo, plata, presión externa) */
  constraint: string;
  /** Tres opciones, ninguna sin costo */
  options: DilemmaOption[];
  /** La pregunta que el estudiante debe responder por escrito */
  forcedQuestion: string;
  /** Hacia dónde suele aterrizar la síntesis profesional (no "la respuesta") */
  synthesisHint: string;
  /** Entregable exigido al final: lo que el estudiante escribe */
  deliverable: string;
}

/* ────────────────────────────────────────────────────────────
 *  Competencias medibles — qué sabe hacer el estudiante al
 *  terminar el módulo que no sabía hacer al empezar.
 *  Cada módulo: 1 estrella + 2 de soporte.
 * ──────────────────────────────────────────────────────────── */

export interface Competency {
  /** Estrella = competencia principal del módulo. Soporte = complementaria. */
  role: "star" | "support";
  /** Título accionable (verbo + objeto concreto) */
  title: string;
  /** Definición operativa: qué tiene que poder hacer el estudiante */
  definition: string;
  /** Cómo se mide: entregable o práctica concreta */
  evidence: string;
  /** Métrica pre / post curso */
  metric: {
    before: string;
    after: string;
  };
}

export interface PedagogicalFrame {
  /** Una frase que encuadra el "cambio" que propone el módulo */
  changeLens: string;
  /** Los tres actos del método */
  acts: PedagogicalAct[];
  /** Dilema forzado del Acto III: decisión bajo presión */
  dilemma?: Dilemma;
  /** Preguntas abiertas complementarias (opcional) */
  dialogue: DisruptiveQuestion[];
  /** Cierre humano: ¿y esto cómo aterriza en la vida real? */
  humanFocus: string;
}

/* ────────────────────────────────────────────────────────────
 *  Tier de riesgo — jerarquía práctica: primero lo que, si
 *  falla, hace ilegal todo lo demás.
 * ──────────────────────────────────────────────────────────── */

export type RiskTier = "tier-1" | "tier-2" | "tier-3";

export interface RiskTierMeta {
  id: RiskTier;
  label: string;
  description: string;
  color: string;
}

export const RISK_TIERS: Record<RiskTier, RiskTierMeta> = {
  "tier-1": {
    id: "tier-1",
    label: "Crítico",
    description:
      "Si esto falla, la solución es ilegal o inoperable. Responsabilidad civil, KYC/SARLAFT, protección de datos.",
    color: "#B91C1C",
  },
  "tier-2": {
    id: "tier-2",
    label: "Importante",
    description:
      "Áreas donde el incumplimiento escala a sanciones o pérdida de prueba. Sesgo, cadena de custodia, IA responsable.",
    color: "#B45309",
  },
  "tier-3": {
    id: "tier-3",
    label: "Emergente",
    description:
      "Territorios con marco en construcción: smart contracts, activos digitales, síntesis integradora.",
    color: "#0F766E",
  },
};

export interface Module {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  color: string;
  bgGradient: string;
  objectives: string[];
  concepts: Concept[];
  timeline?: TimelineItem[];
  norms?: LegalNorm[];
  process?: ProcessStep[];
  challenges?: Challenge[];
  metrics?: MetricCard[];
  mindMap: MindMapNode;
  quote: string;
  quoteAuthor?: string;
  tags: string[];
  /** Marco pedagógico profundo: actos, dilema forzado, cierre humano */
  pedagogy?: PedagogicalFrame;
  /** Tier de riesgo: cuán crítico es el módulo si falla su aplicación */
  riskTier?: RiskTier;
  /** Competencias medibles del módulo (1 estrella + 2 soporte) */
  competencies?: Competency[];
}

export const modules: Module[] = [
  {
    id: 1,
    slug: "panorama-legaltech",
    title: "Panorama LegalTech en Colombia",
    subtitle: "Contexto y Fundamentos",
    description:
      "Explora cómo la transformación digital está redefiniendo el derecho colombiano, los actores del ecosistema legal y las oportunidades que emergen de la digitalización jurídica.",
    icon: "compass",
    color: "#1E3A8A",
    bgGradient: "from-blue-900 to-blue-700",
    objectives: [
      "Entender cómo la transformación digital impacta el derecho colombiano",
      "Identificar las leyes clave que han impulsado el LegalTech en Colombia",
      "Reconocer oportunidades y desafíos para diferentes actores del ecosistema legal",
      "Analizar el estado actual y las tendencias futuras del LegalTech nacional",
    ],
    concepts: [
      { term: "LegalTech", definition: "Uso de tecnología para mejorar, automatizar o transformar servicios y procesos legales." },
      { term: "Transformación Digital", definition: "Integración de tecnologías digitales en todas las áreas de una organización, cambiando su funcionamiento y entrega de valor." },
      { term: "Firma Electrónica", definition: "Método digital que permite autenticar la identidad y voluntad de una persona en documentos electrónicos." },
      { term: "Jurimetría", definition: "Aplicación de métodos estadísticos y cuantitativos para analizar decisiones y procesos jurídicos." },
    ],
    timeline: [
      { year: "Pre-1999", title: "Práctica legal tradicional", description: "Los procesos jurídicos se realizaban en papel, con trámites presenciales y archivos físicos, lo que limitaba la eficiencia y el acceso a la justicia." },
      { year: "1999", title: "Ley 527/1999 – Firma electrónica", description: "Esta ley reconoció la validez jurídica de los mensajes de datos y la firma electrónica, sentando las bases para la digitalización." },
      { year: "2020", title: "Decreto 806/2020 – Justicia digital", description: "En respuesta a la pandemia, se impulsó la implementación de expedientes electrónicos y audiencias virtuales." },
      { year: "2022", title: "Ley 2213/2022 – Justicia digital permanente", description: "Esta ley consolidó la justicia digital como política permanente, fortaleciendo la transformación digital del sector." },
      { year: "2024", title: "Circular SIC 002/2024", description: "La Superintendencia de Industria y Comercio reguló el uso de inteligencia artificial y la protección de datos." },
    ],
    challenges: [
      { title: "Resistencia cultural al cambio", description: "Tanto en instituciones como en profesionales acostumbrados a métodos tradicionales, generando necesidad de capacitación específica.", type: "challenge" },
      { title: "Brecha digital", description: "No todos los actores del sector tienen acceso igualitario a herramientas tecnológicas o a la conectividad necesaria.", type: "risk" },
      { title: "Retos regulatorios", description: "La falta de claridad normativa puede frenar la innovación y generar incertidumbre jurídica.", type: "challenge" },
      { title: "Mayor eficiencia en gestión legal", description: "La digitalización permite reducir tiempos y costos para abogados, empresas y usuarios, abriendo nuevos modelos de negocio.", type: "opportunity" },
      { title: "Acceso democratizado a la justicia", description: "El LegalTech facilita el acceso para poblaciones tradicionalmente excluidas, promoviendo inclusión y transparencia.", type: "opportunity" },
    ],
    mindMap: {
      id: "root",
      label: "LegalTech Colombia",
      color: "#1E3A8A",
      children: [
        {
          id: "actors",
          label: "Actores",
          color: "#3B82F6",
          children: [
            { id: "lawyers", label: "Abogados", color: "#60A5FA" },
            { id: "students", label: "Estudiantes", color: "#60A5FA" },
            { id: "devs", label: "Developers", color: "#60A5FA" },
            { id: "startups", label: "Emprendedores", color: "#60A5FA" },
          ],
        },
        {
          id: "laws",
          label: "Marco Legal",
          color: "#8B5CF6",
          children: [
            { id: "l527", label: "Ley 527/1999", color: "#A78BFA" },
            { id: "d806", label: "Decreto 806/2020", color: "#A78BFA" },
            { id: "l2213", label: "Ley 2213/2022", color: "#A78BFA" },
          ],
        },
        {
          id: "tech",
          label: "Tecnologías",
          color: "#10B981",
          children: [
            { id: "ai", label: "IA", color: "#34D399" },
            { id: "blockchain", label: "Blockchain", color: "#34D399" },
            { id: "cloud", label: "Cloud", color: "#34D399" },
          ],
        },
        {
          id: "challenges",
          label: "Desafíos",
          color: "#F59E0B",
          children: [
            { id: "culture", label: "Cultura", color: "#FCD34D" },
            { id: "gap", label: "Brecha Digital", color: "#FCD34D" },
            { id: "regulation", label: "Regulación", color: "#FCD34D" },
          ],
        },
      ],
    },
    quote: "La transformación digital es más que implementar tecnología; representa una oportunidad para democratizar el acceso a la justicia en Colombia.",
    tags: ["Colombia", "Transformación Digital", "Marco Legal", "Ecosistema"],
    riskTier: "tier-1",
    competencies: [
      {
        role: "star",
        title: "Mapear el recorrido digital de un trámite jurídico",
        definition:
          "Diagramar, paso por paso, cómo viaja un memorial desde el Word del abogado hasta el expediente electrónico, señalando en qué punto se produce el valor probatorio pleno y qué norma lo sostiene.",
        evidence:
          "Diagrama de una página sobre un trámite real del despacho, con cita normativa por cada paso.",
        metric: {
          before:
            "Identifica 0–1 pasos y no cita norma aplicable.",
          after:
            "Identifica 5 pasos y cita Ley 527 art. 11, Decreto 806/2020 y Ley 2213/2022 cuando corresponde.",
        },
      },
      {
        role: "support",
        title: "Traducir 'soporte vs contenido' al cliente",
        definition:
          "Explicar a un cliente sin formación técnica por qué un archivo digital puede tener el mismo peso jurídico que un documento en papel.",
        evidence: "Audio o video de 90 segundos con una explicación para cliente real.",
        metric: {
          before: "Respuesta promedio usa 3+ términos técnicos sin explicar.",
          after: "Cero jerga; el cliente reformula la idea con sus propias palabras.",
        },
      },
      {
        role: "support",
        title: "Ubicar la norma aplicable en casos concretos",
        definition:
          "Dado un escenario (audiencia virtual, firma de contrato, radicación digital), identificar qué combinación de Decreto 806/2020, Ley 2213/2022 y Circular SIC 002/2024 aplica.",
        evidence: "Prueba de 5 escenarios cortos resueltos en menos de 15 minutos.",
        metric: {
          before: "Acierta 1–2 de 5.",
          after: "Acierta 4–5 de 5 con fundamento escrito.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "La Ley 527 no cambió. Lo que cambió es el lugar donde vive el Derecho: pasó del papel a los datos. El abogado que entiende ese cambio deja de ser escriba del expediente y empieza a diseñar el flujo de información jurídica que sus clientes necesitan.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Instalar la idea de que la tecnología no reemplaza la Ley; cambia el soporte y la velocidad en que la Ley circula.",
          beats: [
            "La Ley no cambia: Ley 527/1999 sigue siendo la columna vertebral.",
            "Lo que cambia es el soporte (papel → datos) y la velocidad (semanas → segundos).",
            "Quien entiende el flujo diseña servicios; quien solo conoce la norma la administra.",
          ],
          analogy: {
            title: "El Derecho no es una isla, es un río",
            metaphor:
              "Imagina el Derecho como un río que antes corría por acueductos de papel (memoriales, folios, sellos de cera). La tecnología no desvía el río ni cambia el agua; cambia la tubería por fibra óptica.",
            bridge:
              "Por eso una audiencia virtual y una audiencia presencial son jurídicamente equivalentes: cambia el canal, no el caudal de obligaciones y derechos.",
          },
        },
        {
          act: "II",
          title: "Ejecución: la ruta real de un memorial digital",
          duration: "25–30 min",
          purpose:
            "Mostrar en vivo cómo un trámite cotidiano recorre la capa tecnológica sin salir del marco legal.",
          demo: {
            tool: "Word · Token criptográfico · Correo certificado · Reparto judicial",
            steps: [
              "Redactar el memorial en Word y exportar a PDF con metadatos limpios.",
              "Firmarlo con token criptográfico, la firma queda incrustada en el PDF.",
              "Enviarlo por un correo certificado (4-72 u otro proveedor reconocido).",
              "El sistema de Reparto Judicial lo asigna por algoritmo al despacho competente.",
              "Llega al expediente electrónico con hora oficial y número de radicado único.",
            ],
            outcome:
              "En menos de 10 minutos, un memorial recorre la ruta que antes tomaba días. Todo, sin salir del Decreto 806/2020 y la Ley 2213/2022.",
          },
          beats: [
            "Decreto 806/2020 no nació solo para la pandemia: democratiza el acceso a la justicia en regiones.",
            "Ley 2213/2022 hizo permanente la justicia digital; ya no es un régimen excepcional.",
            "El algoritmo de reparto es, en sí mismo, una decisión con efectos jurídicos.",
          ],
        },
        {
          act: "III",
          title: "Dilema y diálogo: ¿dónde está el original?",
          duration: "20 min",
          purpose:
            "Forzar el encuentro interdisciplinar entre la lógica del expediente y la lógica del hash.",
        },
      ],
      dialogue: [
        {
          audience: "abogado",
          question:
            "Si el expediente es digital, ¿dónde está el 'original' que tiene valor probatorio pleno?",
          insight:
            "Pista: el original no es un archivo, es el mensaje de datos con su firma e integridad verificable (Ley 527, art. 8).",
        },
        {
          audience: "developer",
          question:
            "¿Cómo garantizas en código que ese PDF no fue modificado después de que el juez lo firmó?",
          insight:
            "Pista: firma digital sobre el hash del archivo + sellado de tiempo confiable (RFC 3161).",
        },
        {
          audience: "todos",
          question:
            "¿Qué perdió el litigante rural cuando la audiencia pasó a Zoom y qué ganó?",
        },
      ],
      dilemma: {
        scenario:
          "Un juzgado civil de Bogotá te requiere el 'documento original' de un contrato que tu cliente firmó por DocuSign hace dos años. El otro abogado ya insinuó que si no aportas el original, van por tacha de falsedad.",
        constraint:
          "Tienes 3 días hábiles para responder. El token criptográfico con que se firmó el contrato venció. Certicámara puede reemitir certificados, pero no puede 'devolverte' la firma del día exacto.",
        options: [
          {
            label: "A",
            title: "Aportar el PDF firmado tal cual está, con los metadatos que trae.",
            legalRisk:
              "El juez puede no aceptarlo como 'original' si no acreditas la equivalencia funcional (Ley 527/1999, art. 8 y 11). Si la contraparte tacha, el juez decide incidente.",
            technicalRisk:
              "Los metadatos del PDF pueden haberse alterado al reenviarlo por correo. Sin hash calculado en su día, pierdes la fotografía del estado original.",
          },
          {
            label: "B",
            title: "Imprimir el PDF, foliar y aportar copia física autenticada.",
            legalRisk:
              "Renuncias voluntariamente al régimen de la Ley 527: ya no discutes en el terreno del mensaje de datos, sino en el de la copia simple. Abres la puerta a que el original digital sea ignorado.",
            technicalRisk:
              "Cero. Pero también cero trazabilidad: la firma digital deja de ser verificable y se reduce a tinta sobre papel.",
          },
          {
            label: "C",
            title:
              "Contratar peritaje informático que certifique el hash, metadatos y cadena de custodia del PDF.",
            legalRisk:
              "Baja. El peritaje es prueba válida (Ley 906/2004 art. 406) y refuerza la equivalencia funcional (Ley 527 art. 11).",
            technicalRisk:
              "Costo: entre $2 y $6 millones. Tiempo: 5–10 días hábiles. Puede no alcanzar a llegar en 3 días.",
          },
        ],
        forcedQuestion:
          "¿Qué opción presenta el despacho mañana a primera hora, y qué texto escribes para que el juez entienda por qué lo que aportas SÍ es el original?",
        synthesisHint:
          "La síntesis profesional casi siempre combina A y C: se aporta el PDF inmediatamente para cumplir el término (defendiendo la equivalencia funcional de la Ley 527), y se anuncia que el peritaje complementario llegará en el término del incidente. La opción B se evita porque renuncia al terreno fuerte.",
        deliverable:
          "Memorial de 1 página donde el estudiante: (1) cita Ley 527 art. 8 y 11, (2) explica por qué el PDF firmado es 'equivalente funcional' del original, (3) anuncia el peritaje como prueba sobreviniente.",
      },
      humanFocus:
        "Un tendero en Leticia hoy puede asistir a una audiencia en Bogotá sin perder dos días de trabajo. Pero ese acceso solo es real si alguien le enseña a abrir el link y tiene conexión estable. El LegalTech que no baja a esa realidad es un privilegio urbano disfrazado de innovación.",
    },
  },
  {
    id: 2,
    slug: "marcos-normativos",
    title: "Marcos Normativos Clave",
    subtitle: "LegalTech en Colombia",
    description:
      "Comprende el marco regulatorio que habilita la digitalización jurídica, la equivalencia funcional y la responsabilidad ética en el ecosistema LegalTech colombiano.",
    icon: "note",
    color: "#1D4ED8",
    bgGradient: "from-blue-800 to-indigo-700",
    objectives: [
      "Identificar las leyes y decretos que habilitan la digitalización jurídica",
      "Entender la equivalencia funcional y la validez legal de medios electrónicos",
      "Analizar la responsabilidad ética y profesional en la transformación digital",
      "Aplicar la normativa vigente al desarrollo y uso de soluciones LegalTech",
    ],
    concepts: [
      { term: "Equivalencia funcional", definition: "Principio que otorga a los documentos electrónicos el mismo valor legal que a los documentos en papel." },
      { term: "Documento electrónico", definition: "Información generada, enviada o recibida por medios digitales, reconocida legalmente como prueba o contrato." },
      { term: "Firma digital", definition: "Mecanismo criptográfico con validez legal que identifica al firmante y garantiza la integridad del documento." },
      { term: "Firma electrónica", definition: "Cualquier método electrónico que permite identificar a una persona en relación con un documento digital." },
      { term: "Circular normativa", definition: "Comunicación oficial de una entidad reguladora que aclara o establece directrices sobre la aplicación de normas." },
      { term: "Responsabilidad profesional", definition: "Obligación ética y legal de actuar con diligencia, transparencia y respeto a la ley en el ejercicio profesional." },
    ],
    norms: [
      { name: "Ley 527/1999", description: "Regula la equivalencia funcional entre documentos electrónicos y físicos, el mensaje de datos y la validez de la firma electrónica.", scope: "Cualquier persona o entidad que utilice medios digitales para contratos, comunicaciones o procesos legales.", impact: "Permite que abogados, empresas y usuarios confíen en la legalidad de los documentos digitales." },
      { name: "Ley 2213/2022", description: "Transforma la justicia digital en una realidad permanente, permitiendo el uso de medios electrónicos en trámites judiciales.", scope: "Jueces, abogados y partes procesales.", impact: "Impulsa la eficiencia y el acceso a la justicia, consolidando la digitalización." },
      { name: "Decreto 806/2020", description: "Regula el expediente electrónico y el acceso remoto a la justicia, estableciendo procedimientos para la gestión digital.", scope: "Operadores judiciales y litigantes.", impact: "Facilita la continuidad de procesos judiciales durante situaciones excepcionales." },
      { name: "Decretos 2364/2012 y 333/2014", description: "Diferencian la firma digital de la firma electrónica, definiendo requisitos técnicos y legales para cada una.", scope: "Quienes firman documentos digitales y proveedores de servicios de certificación.", impact: "Garantizan la seguridad y autenticidad de las firmas en el entorno digital." },
      { name: "Circular SIC 002/2024", description: "Establece directrices para el uso de inteligencia artificial y la protección de datos en servicios legales.", scope: "Abogados, empresas LegalTech y desarrolladores de soluciones tecnológicas.", impact: "Promueve la transparencia, la ética y la protección de los derechos de los usuarios." },
    ],
    process: [
      { step: 1, title: "Identificar la función legal", description: "Define claramente qué función cumple la herramienta: ¿firma documentos, autentica usuarios, gestiona expedientes o almacena pruebas digitales?" },
      { step: 2, title: "Revisar la norma aplicable", description: "Consulta las leyes y decretos relevantes según el tipo de solución y el sector en que se implementa." },
      { step: 3, title: "Verificar requisitos técnicos y de seguridad", description: "Asegúrate de que la solución cumple con los estándares de integridad, autenticidad y confidencialidad exigidos por la normativa." },
      { step: 4, title: "Documentar procesos regulatorios", description: "Registra y documenta los procedimientos internos para demostrar cumplimiento ante auditorías o requerimientos legales." },
      { step: 5, title: "Evaluar responsabilidad profesional y ética", description: "Analiza los riesgos éticos y legales asociados al uso de la tecnología, como el deber de competencia tecnológica." },
      { step: 6, title: "Mantenerse actualizado", description: "Monitorea circulares, resoluciones y cambios normativos que puedan afectar la solución." },
    ],
    mindMap: {
      id: "root",
      label: "Marco Normativo",
      color: "#1D4ED8",
      children: [
        {
          id: "equiv",
          label: "Equivalencia Funcional",
          color: "#3B82F6",
          children: [
            { id: "doc-elec", label: "Documentos Electrónicos", color: "#60A5FA" },
            { id: "firma-dig", label: "Firma Digital", color: "#60A5FA" },
            { id: "firma-elec", label: "Firma Electrónica", color: "#60A5FA" },
          ],
        },
        {
          id: "leyes",
          label: "Leyes Clave",
          color: "#8B5CF6",
          children: [
            { id: "l527", label: "Ley 527/1999", color: "#A78BFA" },
            { id: "l2213", label: "Ley 2213/2022", color: "#A78BFA" },
            { id: "sic", label: "Circular SIC 002/2024", color: "#A78BFA" },
          ],
        },
        {
          id: "resp",
          label: "Responsabilidades",
          color: "#10B981",
          children: [
            { id: "abog", label: "Abogados", color: "#34D399" },
            { id: "dev-resp", label: "Desarrolladores", color: "#34D399" },
            { id: "emp", label: "Emprendedores", color: "#34D399" },
          ],
        },
      ],
    },
    quote: "La responsabilidad profesional en el LegalTech no termina con el cumplimiento formal: implica ética, transparencia y protección del usuario.",
    tags: ["Normativa", "Firma Digital", "Equivalencia Funcional", "Ética"],
    riskTier: "tier-1",
    competencies: [
      {
        role: "star",
        title: "Decidir qué nivel de firma usar según el acto jurídico",
        definition:
          "Para un acto dado (poder especial, contrato laboral, autorización de datos, compraventa, arrendamiento), decidir si basta firma electrónica (SMS/correo) o si exige firma digital con certificado, citando Decreto 2364/2012 y Ley 527/1999.",
        evidence:
          "Matriz de 10 actos jurídicos con decisión fundamentada en una línea por acto.",
        metric: {
          before:
            "Usa los dos términos como sinónimos y elige por costumbre.",
          after:
            "Distingue con criterio normativo y justifica cada decisión en menos de 2 minutos.",
        },
      },
      {
        role: "support",
        title: "Redactar una cláusula de consentimiento Ley 1581 que el cliente entienda",
        definition:
          "Escribir consentimiento informado para tratamiento de datos con lenguaje que un usuario promedio pueda leer y reformular, sin perder solidez jurídica.",
        evidence:
          "Cláusula de máximo 120 palabras, aprobada en prueba con 3 usuarios reales.",
        metric: {
          before: "Cláusulas de 400+ palabras copiadas de plantillas.",
          after:
            "Cláusula corta, Ley 1581 citada, y 3 de 3 usuarios la reformulan correctamente.",
        },
      },
      {
        role: "support",
        title: "Leer un mensaje de 'firma válida' y saber qué dice el juez con eso",
        definition:
          "Al abrir un PDF firmado, interpretar el panel de firmas de Adobe Reader y traducir 'Firma válida / no verificada' a lenguaje procesal concreto.",
        evidence:
          "Captura de pantalla + 2 renglones de análisis para 5 PDF distintos.",
        metric: {
          before: "Ve 'firma válida' y asume que todo está bien.",
          after:
            "Detecta si el certificado es reconocido, si hay sellado de tiempo y si el firmante coincide.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "La Ley 527/1999 no prohíbe ni permite por capricho: habilita. Es el adaptador universal que permitió enchufar el mundo análogo del Derecho a la red binaria. La Circular SIC 002/2024 es su continuación en clave de IA: el manual de ética del robot que ya convive con nosotros en despachos y fintechs.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Entender que la equivalencia funcional no es una concesión tecnológica, sino un principio que redefine la forma del Derecho.",
          beats: [
            "Equivalencia funcional: mismo valor jurídico, distinto soporte.",
            "Firma electrónica (identidad por correo/SMS) vs firma digital (criptografía asimétrica con certificado).",
            "La SIC no regula tecnología por tecnología: regula confianza.",
          ],
          analogy: {
            title: "El adaptador universal",
            metaphor:
              "La Ley 527 es el enchufe universal que permite conectar electrodomésticos de cualquier país a la red colombiana. Sin ese adaptador, el Derecho no podría 'recibir corriente' desde lo digital.",
            bridge:
              "Sin Ley 527 no habría contratos electrónicos, ni facturación electrónica, ni expediente judicial digital. Es la norma-puente que sostiene todo el ecosistema.",
          },
        },
        {
          act: "II",
          title: "Ejecución: firma digital vs firma electrónica en vivo",
          duration: "25–30 min",
          purpose:
            "Mostrar visualmente por qué una firma electrónica simple y una firma digital con certificado no pesan igual ante un estrado.",
          demo: {
            tool: "Adobe Sign (firma electrónica) · Certicámara + Token USB (firma digital)",
            steps: [
              "Firmar un PDF con Adobe Sign basado en correo electrónico.",
              "Abrirlo en Adobe Reader y leer el mensaje: 'La firma es válida, pero no se pudo verificar la identidad del firmante.'",
              "Firmar el mismo PDF con certificado digital emitido por Certicámara (token USB).",
              "Abrirlo y leer: 'Firma VÁLIDA — Identidad del firmante verificada por Certicámara S.A.'",
              "Comparar ambos mensajes frente a un juez hipotético: ¿cuál tendría que resistir una tacha?",
            ],
            outcome:
              "Esa diferencia visual de dos líneas lo cambia todo en la sala de audiencias. La criptografía no es un detalle técnico; es la garantía legal.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: sesgo algorítmico e igualdad constitucional",
          duration: "20 min",
          purpose:
            "Mostrar que la Circular SIC 002 no es solo compliance técnico, sino un puente con derechos fundamentales.",
        },
      ],
      dialogue: [
        {
          audience: "todos",
          question:
            "Si un algoritmo de IA recomienda negar un crédito basándose en el barrio de la persona, ¿es un problema de programación (datos sucios) o de Derecho Constitucional (art. 13 — igualdad)?",
          insight:
            "Ambos. Es la intersección exacta de la Circular SIC 002 con el bloque de constitucionalidad: sesgo técnico = discriminación jurídica.",
        },
        {
          audience: "abogado",
          question:
            "¿Cómo redactas la cláusula de 'consentimiento informado' cuando el usuario firma con un código SMS y no entiende que está aceptando arbitraje en Delaware?",
        },
        {
          audience: "developer",
          question:
            "¿Cómo certificas ante un juez que tu plataforma cumple con los requisitos técnicos de los Decretos 2364/2012 y 333/2014 sin regalar tu código fuente?",
        },
      ],
      dilemma: {
        scenario:
          "Una PropTech colombiana te contrata para validar su flujo: el inquilino firma el contrato de arrendamiento con un código SMS de 6 dígitos enviado a su celular. Llevan 4.800 contratos firmados así. El CEO pregunta si eso 'es seguro jurídicamente'.",
        constraint:
          "El producto ya está en producción, tiene inversionistas y 12 personas dependen de él. Cambiarlo a firma digital certificada dispara el costo por contrato de $0 a $18.000, y el equipo calcula que eso mata el modelo.",
        options: [
          {
            label: "A",
            title: "Mantener firma por SMS tal cual, con cláusula de aceptación reforzada.",
            legalRisk:
              "Ley 527 art. 7 acepta firma electrónica si es confiable y apropiada. Pero frente a una tacha, la carga de demostrar la identidad del firmante recae sobre la PropTech. Riesgo alto en arrendamientos > 2 SMMLV.",
            technicalRisk:
              "Cero cambio operativo. Pero el log del envío SMS está en un proveedor externo y puede no ser auditable a 2 años.",
          },
          {
            label: "B",
            title:
              "Migrar todo a firma digital certificada (Certicámara/Andes SCD) para contratos > 2 SMMLV.",
            legalRisk:
              "Mínimo. El Decreto 2364/2012 respalda plenamente. La PropTech queda en terreno firme ante cualquier litigio.",
            technicalRisk:
              "Costo por contrato sube $18.000. UX: el inquilino necesita token o app. Tasa de conversión cae al menos un 30 % según benchmarks internos.",
          },
          {
            label: "C",
            title:
              "Firma por SMS + evidencia adicional: selfie, geolocalización, lectura de cédula por OCR, todo con hash guardado en un servicio notarial digital.",
            legalRisk:
              "Bajo. Aunque no es 'firma digital' en sentido técnico, cumple la prueba de confiabilidad del art. 7 con varios factores cruzados.",
            technicalRisk:
              "Costo sube $1.800 por contrato. Integración con proveedor notarial digital: 3–4 semanas de desarrollo.",
          },
        ],
        forcedQuestion:
          "¿Qué recomendación le firma usted al CEO, y en qué casos específicos obliga a usar la opción B aunque duela el costo?",
        synthesisHint:
          "La síntesis profesional casi siempre es C, con regla de corte: arrendamientos hasta X SMMLV = SMS reforzado; por encima = firma digital. Quien redacta la recomendación debe escribirla como política interna firmada, no como consejo verbal.",
        deliverable:
          "Memo legal de 1 página dirigido al CEO: recomendación, normas citadas, umbral de corte en SMMLV y texto de la política interna.",
      },
      humanFocus:
        "Una persona que apenas lee firma con un código de celular el arrendamiento de su casa. Si hay un litigio, ¿esa firma vale lo mismo que la de un abogado con token criptográfico? La respuesta legal es 'depende'. Nuestro deber, como diseñadores de LegalTech, es que ese 'depende' no recaiga sobre el más débil.",
    },
  },
  {
    id: 3,
    slug: "jurimetria-auditoria",
    title: "Jurimetría y Auditoría Algorítmica",
    subtitle: "Estadística en Decisiones Jurídicas",
    description:
      "Descubre cómo los métodos estadísticos y la auditoría de algoritmos transforman la toma de decisiones jurídicas, garantizando equidad, transparencia y confianza en la justicia digital.",
    icon: "chart",
    color: "#8B5CF6",
    bgGradient: "from-violet-700 to-purple-600",
    objectives: [
      "Comprender qué es la jurimetría y cómo la estadística se aplica al derecho colombiano",
      "Identificar los conceptos clave de auditoría algorítmica y métricas de equidad",
      "Analizar el sesgo algorítmico y su impacto en la justicia",
      "Reconocer la normativa relevante sobre IA y datos en Colombia",
    ],
    concepts: [
      { term: "Jurimetría", definition: "Aplicación de métodos estadísticos y análisis de datos para estudiar y predecir fenómenos jurídicos." },
      { term: "Auditoría algorítmica", definition: "Evaluación sistemática de modelos y algoritmos para detectar sesgos y asegurar transparencia en decisiones automatizadas." },
      { term: "Métricas de equidad", definition: "Indicadores como precisión o AUC que permiten medir si un modelo trata a todos los grupos de manera justa." },
      { term: "Sesgo algorítmico", definition: "Distorsión en los resultados de un modelo causada por datos o reglas que favorecen a ciertos grupos." },
      { term: "Intervalo de credibilidad", definition: "Rango estadístico que muestra la incertidumbre de una predicción, útil para interpretar resultados legales." },
    ],
    timeline: [
      { year: "2010s", title: "Primeros estudios de jurimetría", description: "Comienzan a usarse análisis de datos judiciales para identificar patrones y mejorar la gestión de casos en Colombia." },
      { year: "2020", title: "Digitalización acelerada", description: "La pandemia impulsa la adopción de tecnologías digitales y el análisis masivo de datos en la Rama Judicial." },
      { year: "2022", title: "Debate sobre sesgo y transparencia", description: "Surgen discusiones públicas sobre la necesidad de auditar algoritmos y garantizar la equidad en decisiones judiciales automatizadas." },
      { year: "2024", title: "Circular SIC 002/2024", description: "Se emite la primera regulación oficial sobre IA y auditoría algorítmica en servicios legales, estableciendo estándares de transparencia." },
    ],
    metrics: [
      { label: "AUC", value: "> 0.85", description: "Área bajo la curva, mide la capacidad de un modelo para distinguir entre clases; un valor alto indica mejor desempeño.", color: "violet" },
      { label: "Precisión", value: "≥ 80%", description: "Porcentaje de predicciones correctas sobre el total; clave para evaluar la confiabilidad de un modelo legal.", color: "sky" },
      { label: "Sesgo < Umbral", value: "< 5%", description: "Diferencia permitida entre grupos para considerar un modelo equitativo en contextos jurídicos.", color: "emerald" },
      { label: "Int. Credibilidad", value: "95%", description: "Rango que muestra la incertidumbre de una predicción, esencial para la transparencia en modelos legales.", color: "amber" },
    ],
    process: [
      { step: 1, title: "Definir el objetivo del modelo", description: "Establecer para qué se usará: predicción de sentencias, clasificación de casos, recomendaciones, etc." },
      { step: 2, title: "Recopilar y limpiar los datos", description: "Reunir datos judiciales relevantes y asegurarse de que estén completos, actualizados y libres de errores." },
      { step: 3, title: "Seleccionar y entrenar el modelo", description: "Elegir el modelo estadístico más adecuado según el objetivo y entrenarlo con los datos preparados." },
      { step: 4, title: "Medir desempeño con métricas de equidad", description: "Aplicar métricas como precisión, AUC o tasa de falsos positivos para evaluar si el modelo es justo y confiable." },
      { step: 5, title: "Identificar y analizar sesgos", description: "Revisar los resultados para detectar posibles sesgos o desigualdades, y ajustar el modelo si es necesario." },
      { step: 6, title: "Presentar resultados con intervalos de credibilidad", description: "Mostrar los resultados acompañados de intervalos de credibilidad y visualizaciones claras para facilitar la interpretación." },
      { step: 7, title: "Documentar limitaciones y riesgos", description: "Registrar las limitaciones del modelo, explicar los riesgos asociados y dejar constancia de las acciones tomadas para mitigarlos." },
    ],
    challenges: [
      { title: "Sesgo algorítmico", description: "El sesgo ocurre cuando un modelo produce resultados que favorecen o perjudican a ciertos grupos, causando decisiones judiciales injustas.", type: "risk" },
      { title: "Falta de transparencia", description: "La opacidad en los modelos dificulta que usuarios y jueces comprendan cómo se toman las decisiones automatizadas.", type: "challenge" },
      { title: "Protección de datos personales", description: "El uso de datos judiciales debe cumplir con la Ley 1581/2012, exigiendo anonimización y consentimientos necesarios.", type: "risk" },
      { title: "Limitaciones técnicas", description: "Los modelos estadísticos pueden fallar si los datos son insuficientes, están desactualizados o si el modelo no se adapta a cambios normativos.", type: "challenge" },
    ],
    mindMap: {
      id: "root",
      label: "Jurimetría",
      color: "#8B5CF6",
      children: [
        {
          id: "methods",
          label: "Métodos",
          color: "#7C3AED",
          children: [
            { id: "stats", label: "Estadística", color: "#A78BFA" },
            { id: "ml", label: "Machine Learning", color: "#A78BFA" },
            { id: "bayesian", label: "Análisis Bayesiano", color: "#A78BFA" },
          ],
        },
        {
          id: "metrics",
          label: "Métricas",
          color: "#3B82F6",
          children: [
            { id: "auc", label: "AUC", color: "#60A5FA" },
            { id: "precision", label: "Precisión", color: "#60A5FA" },
            { id: "credib", label: "Int. Credibilidad", color: "#60A5FA" },
          ],
        },
        {
          id: "apps",
          label: "Aplicaciones",
          color: "#10B981",
          children: [
            { id: "sentences", label: "Análisis Sentencias", color: "#34D399" },
            { id: "predict", label: "Predicción", color: "#34D399" },
            { id: "bias", label: "Detección Sesgos", color: "#34D399" },
          ],
        },
      ],
    },
    quote: "La transparencia y la equidad son fundamentales: todo modelo predictivo debe mostrar sus limitaciones y explicar cómo maneja la incertidumbre.",
    tags: ["Estadística", "IA", "Equidad", "Transparencia", "Bayesiano"],
    riskTier: "tier-2",
    competencies: [
      {
        role: "star",
        title: "Estimar probabilidad de éxito de una acción con intervalo de credibilidad",
        definition:
          "Dado un universo de sentencias, calcular la probabilidad empírica del resultado que el cliente busca y reportarlo con su intervalo de credibilidad al 95 %.",
        evidence:
          "Reporte de 1 página con metodología, muestra usada e intervalo, entregado al cliente.",
        metric: {
          before:
            "Responde con 'yo creo que...' o porcentajes sin respaldo.",
          after:
            "Reporta '62 % ± 7 %' con N, fuente de datos y limitaciones declaradas.",
        },
      },
      {
        role: "support",
        title: "Detectar cuándo un patrón estadístico es sesgo y cuándo no",
        definition:
          "Distinguir una diferencia estadística que refleja discriminación (art. 13 CN) de una que refleja legítima especialización del despacho.",
        evidence:
          "Análisis escrito de 3 casos ambiguos con conclusión razonada.",
        metric: {
          before: "Llama 'sesgo' a cualquier diferencia porcentual.",
          after:
            "Aplica controles (denominador, especialidad, muestra temporal) antes de concluir.",
        },
      },
      {
        role: "support",
        title: "Traducir intervalos de credibilidad a una conversación con cliente",
        definition:
          "Explicar a un cliente sin formación técnica qué significa '68 % ± 6 %' sin inducir falsa certeza ni pánico.",
        evidence:
          "Simulación grabada de reunión con cliente simulado (abogado que aún no ha visto jurimetría).",
        metric: {
          before: "El cliente sale con la idea de que va a ganar seguro.",
          after:
            "El cliente toma la decisión de litigar o no con conciencia del margen.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "El cambio que introduce la jurimetría no es 'predecir sentencias'. Es medir la inercia del sistema. La justicia como fenómeno humano es azarosa en el individuo, pero predecible en masa. Quien mide individuo/masa/interacción, deja de litigar a ciegas y empieza a gestionar riesgo con el rigor de un actuario.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Destronar la idea de que 'cada caso es único' como coartada para no medir nada. Lo individual es irrepetible; lo agregado, altamente predecible.",
          beats: [
            "Jurimetría ≠ oráculo. Es medición de inercia, no predicción individual.",
            "Intervalo de credibilidad: lenguaje bayesiano para hablar de incertidumbre sin mentir.",
            "Todo modelo jurídico debe declarar sus sesgos y sus datos base (art. 13 CN + Circular SIC 002).",
          ],
          analogy: {
            title: "El tráfico en hora pico",
            metaphor:
              "Un carro particular es impredecible: puede frenar, girar, acelerar. Pero el tráfico de la Avenida Suba a las 6 p.m. es predecible con asombrosa precisión.",
            bridge:
              "Lo mismo ocurre con las sentencias: un caso individual depende del juez, de las pruebas, del día. Pero 10.000 tutelas de salud revelan un patrón casi reloj. La jurimetría mide la hora pico del Derecho.",
          },
        },
        {
          act: "II",
          title: "Ejecución: contando palabras para medir probabilidad",
          duration: "25–30 min",
          purpose:
            "Demostrar que con herramientas simples (R o Python) un abogado puede pasar de intuición a evidencia en una tarde.",
          demo: {
            tool: "R / Python (tidytext, tm) · 1.000 sentencias de tutela en texto plano",
            steps: [
              "Cargar 1.000 sentencias de tutela en salud de los últimos 3 años.",
              "Contar cuántas contienen las palabras 'vida digna' + 'tratamiento' + 'concede'.",
              "Calcular la proporción: probabilidad empírica de concesión con ese patrón discursivo.",
              "Aplicar un modelo beta-binomial bayesiano para obtener el intervalo de credibilidad al 95 %.",
              "Presentar el resultado como '68 % ± 6 %' y no como 'usted ganará'.",
            ],
            outcome:
              "El abogado puede decirle al cliente: 'En casos como el suyo, la probabilidad de éxito oscila entre 60 % y 80 %. ¿Vale la pena el costo del litigio?' Eso es gestión de expectativas con base empírica.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: ¿sesgo del juez o calidad de la justicia?",
          duration: "20 min",
          purpose:
            "Entrenar la lectura crítica del dato: no todo patrón es un error; no toda diferencia es discriminación.",
        },
      ],
      dialogue: [
        {
          audience: "developer",
          question:
            "Si tu modelo dice que el Juzgado 10 niega el 90 % de tutelas de salud, ¿estás midiendo la calidad de la justicia o el sesgo del juez?",
          insight:
            "Depende del denominador: si recibe casos ya pre-seleccionados, el sesgo puede estar aguas arriba. La estadística sin contexto jurídico engaña.",
        },
        {
          audience: "abogado",
          question:
            "¿Usarías ese dato para recusar al juez, para preparar un mejor argumento que contrarreste la tendencia, o para asesorar al cliente sobre el costo-beneficio?",
        },
        {
          audience: "todos",
          question:
            "¿Deberían los ciudadanos tener acceso público a las tasas de éxito de cada despacho? ¿Eso ayuda a la transparencia o presiona indebidamente al juez?",
        },
      ],
      dilemma: {
        scenario:
          "Una firma te encarga un estudio: su cliente quiere demandar por nulidad un contrato. Analizas 840 sentencias sobre ese tipo de nulidad en los últimos 5 años y descubres que el Juzgado 27 de Bogotá niega el 85 % de estas pretensiones, mientras el promedio nacional es 42 %.",
        constraint:
          "El proceso ya está asignado al Juzgado 27 por reparto. Recusar cuesta plata y tiempo. El cliente tiene afán: necesita la escritura libre en 6 meses para vender el inmueble.",
        options: [
          {
            label: "A",
            title:
              "Recusar al juez por presunto prejuzgamiento con base en la estadística de negativas.",
            legalRisk:
              "Alto. La recusación por estadística no está tipificada en el CGP. El juez puede rechazar la recusación, generando incidente adverso y posible sanción disciplinaria por temeridad.",
            technicalRisk:
              "El dato estadístico no necesariamente prueba sesgo: puede haber filtro previo de casos, especialidad del juzgado, composición de la muestra.",
          },
          {
            label: "B",
            title:
              "Ajustar la estrategia: rediseñar la demanda para que encaje con el 15 % de casos concedidos por ese juez.",
            legalRisk:
              "Mínimo. Es trabajo legítimo de defensa: estudiar el criterio del juzgador y presentar argumentos consistentes con él.",
            technicalRisk:
              "Requiere 2–3 días extra de análisis de jurisprudencia del despacho. Posible replanteamiento de pretensiones.",
          },
          {
            label: "C",
            title:
              "Entregar el reporte estadístico al cliente y que decida él, con costo-beneficio: litigar con 15 % de éxito vs transar con la contraparte.",
            legalRisk:
              "Bajo. Es información veraz presentada al cliente para su decisión autónoma (deber de informar).",
            technicalRisk:
              "El cliente puede sentir que lo estás 'desanimando' y buscar otro abogado más optimista. El dato puede estar incompleto si la muestra es pequeña para ese tipo específico.",
          },
        ],
        forcedQuestion:
          "¿Qué hace con el hallazgo del 85 %, y cómo redacta el informe al cliente para que él decida con esa información sin que usted cargue con la culpa si el 15 % no resulta?",
        synthesisHint:
          "El criterio profesional apunta a B + C: rediseño estratégico basado en el patrón + comunicación honesta al cliente. La recusación (A) rara vez se sostiene y suele cerrarle puertas al abogado en ese circuito.",
        deliverable:
          "Reporte al cliente de 1 página: estadística con intervalo, tres escenarios (litigio, transacción, desistimiento) con probabilidad y costo proyectado, recomendación firmada por el abogado.",
      },
      humanFocus:
        "Una ciudadana considera gastar $500.000 en abogado para una tutela. Si el modelo le dice '68 % de probabilidad de ganar', ya no está apostando a ciegas. La jurimetría aterriza cuando le devuelve al cliente el poder de decidir con información, no con esperanza.",
    },
  },
  {
    id: 4,
    slug: "identidad-digital-kyc",
    title: "Identidad Digital, KYC y Autenticación",
    subtitle: "Seguridad en el Sector Legal",
    description:
      "Domina los procesos de verificación de identidad, autenticación segura y protección de datos personales que son fundamentales para soluciones LegalTech confiables y reguladas.",
    icon: "badge",
    color: "#0F766E",
    bgGradient: "from-teal-700 to-emerald-600",
    objectives: [
      "Diferenciar entre firma digital y firma electrónica en el contexto legal colombiano",
      "Comprender los procesos de KYC y autenticación digital aplicados a soluciones legales",
      "Identificar el rol de la biometría y la regulación SARLAFT en la prevención de riesgos",
      "Reconocer la importancia de la protección de datos personales bajo la Ley 1581/2012",
    ],
    concepts: [
      { term: "Identidad digital", definition: "Información y atributos que permiten identificar a una persona en entornos digitales, como plataformas legales o bancarias." },
      { term: "KYC (Know Your Customer)", definition: "Proceso obligatorio para verificar la identidad de clientes y prevenir delitos financieros o fraudes en servicios legales." },
      { term: "Biometría", definition: "Uso de características físicas o conductuales (huella, rostro, voz) para verificar la identidad de una persona." },
      { term: "SARLAFT", definition: "Sistema de prevención de lavado de activos y financiación del terrorismo, que exige controles y verificaciones en procesos legales." },
      { term: "Ley 1581/2012", definition: "Regula la protección de datos personales y define derechos y obligaciones para el tratamiento de información en Colombia." },
    ],
    process: [
      { step: 1, title: "Recopilar información básica", description: "Solicita datos de identificación y contacto del cliente, como nombre, cédula y dirección. Esta información es la base para los siguientes pasos." },
      { step: 2, title: "Verificar identidad electrónicamente", description: "Utiliza mecanismos electrónicos o biométricos para confirmar que la persona es quien dice ser. Esto reduce riesgos de suplantación." },
      { step: 3, title: "Chequeos SARLAFT", description: "Realiza verificaciones en listas de control y analiza el perfil de riesgo del cliente, cumpliendo con las obligaciones de prevención de lavado de activos." },
      { step: 4, title: "Obtener consentimiento informado", description: "Antes de tratar cualquier dato personal, solicita y registra el consentimiento explícito del usuario, explicando el propósito y alcance del tratamiento." },
      { step: 5, title: "Documentar y almacenar registros", description: "Guarda evidencia de todos los pasos de autenticación y verificación, asegurando trazabilidad y cumplimiento ante auditorías." },
      { step: 6, title: "Monitorear y actualizar información", description: "Revisa periódicamente los datos y procesos para detectar cambios en el perfil de riesgo o en la normativa aplicable." },
    ],
    challenges: [
      { title: "Riesgos de suplantación de identidad", description: "La suplantación ocurre cuando un tercero accede a servicios legales haciéndose pasar por otra persona, generando fraudes y problemas legales graves.", type: "risk" },
      { title: "Errores en el proceso de KYC", description: "Fallas en la verificación de identidad pueden llevar a sanciones regulatorias y pérdida de confianza. Incluye aceptar documentos falsos o no detectar usuarios en listas de riesgo.", type: "challenge" },
      { title: "Vulnerabilidades en biometría", description: "El uso de biometría puede ser vulnerable a ataques tecnológicos o a la mala gestión de datos sensibles, representando un riesgo grave para la privacidad.", type: "risk" },
      { title: "Incumplimiento de la Ley 1581/2012", description: "No cumplir con las obligaciones de protección de datos puede resultar en sanciones económicas y reputacionales significativas.", type: "risk" },
      { title: "Buenas prácticas de UX y accesibilidad", description: "Un diseño centrado en el usuario facilita la comprensión de los procesos de autenticación y garantiza que todas las personas puedan usar los servicios digitales.", type: "practice" },
    ],
    mindMap: {
      id: "root",
      label: "Identidad Digital",
      color: "#0F766E",
      children: [
        {
          id: "auth",
          label: "Autenticación",
          color: "#0D9488",
          children: [
            { id: "biometrics", label: "Biometría", color: "#2DD4BF" },
            { id: "mfa", label: "MFA", color: "#2DD4BF" },
            { id: "tokens", label: "Tokens", color: "#2DD4BF" },
          ],
        },
        {
          id: "kyc-proc",
          label: "KYC",
          color: "#1E3A8A",
          children: [
            { id: "verify", label: "Verificación", color: "#3B82F6" },
            { id: "sarlaft", label: "SARLAFT", color: "#3B82F6" },
            { id: "consent", label: "Consentimiento", color: "#3B82F6" },
          ],
        },
        {
          id: "protection",
          label: "Protección de Datos",
          color: "#8B5CF6",
          children: [
            { id: "law1581", label: "Ley 1581/2012", color: "#A78BFA" },
            { id: "encryption", label: "Cifrado", color: "#A78BFA" },
            { id: "rights", label: "Derechos ARCO", color: "#A78BFA" },
          ],
        },
      ],
    },
    quote: "La confianza digital depende de procesos claros, tecnologías seguras y respeto absoluto a los derechos de los usuarios.",
    tags: ["KYC", "Biometría", "SARLAFT", "Datos Personales"],
    riskTier: "tier-1",
    competencies: [
      {
        role: "star",
        title: "Diseñar un flujo de onboarding KYC que resista una auditoría SARLAFT",
        definition:
          "Construir un pipeline con OCR + liveness + cruce de listas + consentimiento Ley 1581, documentado paso por paso, tal que un auditor de la SFC pueda trazarlo sin preguntas.",
        evidence:
          "Diagrama del flujo con nombre de la norma que aplica en cada paso y evidencia digital exigida.",
        metric: {
          before:
            "Describe el onboarding como 'pedimos cédula y selfie'.",
          after:
            "Entrega diagrama con 6–8 pasos, normas citadas y evidencia por paso.",
        },
      },
      {
        role: "support",
        title: "Escribir consentimiento Ley 1581 que no se caiga en segunda instancia",
        definition:
          "Redactar autorización de tratamiento de datos con finalidad específica, término, y canal de revocación, cumpliendo el art. 9 de la Ley 1581/2012 y Decreto 1377/2013.",
        evidence:
          "Autorización de máx. 150 palabras validada en 3 escenarios (financiero, salud, arrendamiento).",
        metric: {
          before: "Copia autorización genérica que cubre 'todo tipo de uso'.",
          after:
            "Autorización por finalidad específica, revocable, con vigencia declarada.",
        },
      },
      {
        role: "support",
        title: "Identificar cuándo la biometría discrimina",
        definition:
          "Detectar casos donde el sistema biométrico excluye personas: huellas desgastadas, rostros que fallan en pieles oscuras, adultos mayores sin foto en BDE, etc., y diseñar rutas alternativas.",
        evidence:
          "Lista de 5 perfiles excluidos comunes, con ruta alternativa para cada uno.",
        metric: {
          before:
            "Asume que la biometría funciona igual para todos.",
          after:
            "Exige tasa de falsos rechazos por segmento al proveedor y reserva ruta humana.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "El cambio es conceptual: en Internet no te identificas, te verificas. La identidad digital dejó de ser un documento (cédula, pasaporte) para convertirse en un conjunto de atributos verificables cruzados en tiempo real: rostro + prueba de vida + listas OFAC + huella de dispositivo. Ya no somos un nombre; somos un vector de confianza.",
      acts: [
        {
          act: "I",
          title: "Fundamento: arquitectura de confianza",
          duration: "15–20 min",
          purpose:
            "Romper la idea infantil de que la identidad digital es un login. La identidad se construye cruzando evidencias, no memorizando secretos.",
          beats: [
            "Identidad digital = conjunto de atributos verificables, no credencial única.",
            "KYC es el pacto que el Estado y el sistema financiero hicieron con la confianza.",
            "SARLAFT no es burocracia: es el cortafuegos nacional contra el lavado.",
          ],
          analogy: {
            title: "El portero que cruza tres libretas",
            metaphor:
              "Imagina un portero que no abre solo con mostrar cédula: compara tu rostro con la foto, te pide decir tu nombre en voz alta (prueba de vida) y revisa si estás en la lista de personas vetadas del edificio.",
            bridge:
              "Eso es KYC digital: OCR de la cédula + liveness detection + cruce con listas OFAC/ONU, todo en 30 segundos. La confianza se construye por triangulación, no por un solo dato.",
          },
        },
        {
          act: "II",
          title: "Ejecución: el flujo real de un onboarding fintech",
          duration: "25–30 min",
          purpose:
            "Ver el pipeline técnico completo y entender dónde cada paso se convierte en una obligación legal bajo la Ley 1581/2012 y SARLAFT.",
          demo: {
            tool: "SDK de un proveedor KYC (Metamap, Truora, Jumio) · Simulador SARLAFT",
            steps: [
              "El usuario sube una foto de la cédula — el OCR extrae texto y valida MRZ.",
              "Se graba un video corto de 3 segundos — el sistema aplica liveness detection.",
              "El rostro del video se compara contra la foto de la cédula (match score > 95 %).",
              "Se cruza el nombre contra listas OFAC, ONU y PEPs (Personas Expuestas Políticamente).",
              "Se registra el consentimiento informado (Ley 1581/2012) con huella de fecha y dispositivo.",
            ],
            outcome:
              "En menos de 1 minuto, el usuario está verificado con evidencia digital auditable. Si mañana llega una investigación, la cadena de custodia del onboarding está intacta.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: ¿inclusión o discriminación tecnológica?",
          duration: "20 min",
          purpose:
            "Forzar al grupo a pensar qué pasa con quienes quedan fuera del patrón biométrico estándar.",
        },
      ],
      dialogue: [
        {
          audience: "todos",
          question:
            "Si una persona mayor no tiene huellas dactilares legibles por el trabajo manual de toda una vida, ¿estamos creando un sistema de discriminación tecnológica? ¿Cómo lo resolvemos como equipo interdisciplinar?",
          insight:
            "La solución no es solo técnica (reconocimiento de voz, firma biométrica alternativa) ni solo legal (testigos, apoderados). Es ambas, diseñadas juntas desde el día uno.",
        },
        {
          audience: "developer",
          question:
            "¿Cómo proteges los datos biométricos ante una filtración, si yo no puedo cambiar mi rostro como cambio una contraseña?",
        },
        {
          audience: "abogado",
          question:
            "Si el cliente es una empresa offshore legítima y su beneficiario final aparece en una lista PEP extranjera, ¿cierras la operación o la reportas? ¿Cuál es el umbral SARLAFT que realmente aplica en Colombia?",
        },
      ],
      dilemma: {
        scenario:
          "Una fintech de microcréditos presume su KYC de 30 segundos: cédula + selfie y listo. Su tasa de conversión es 4x la del banco tradicional. Pero la SFC detectó que tres créditos se otorgaron a personas que no existían: cédulas reales de personas fallecidas cuyas fotos fueron sintetizadas con IA.",
        constraint:
          "La investigación SFC ya está abierta. La fintech tiene 20 días para responder. Parar el flujo significa perder el 80 % del negocio. No pararlo y que aparezca otro caso puede escalar a sanción administrativa y suspensión.",
        options: [
          {
            label: "A",
            title:
              "Seguir con el flujo actual y sumar cruce en tiempo real contra Registraduría (ANI) para validar estado de la cédula.",
            legalRisk:
              "Medio. Fortalece el KYC pero no cubre deepfakes: una foto generada con IA de una persona viva igual pasa.",
            technicalRisk:
              "Costo por consulta ANI: $350 × volumen. Requiere convenio. Tiempo de integración: 2–3 semanas.",
          },
          {
            label: "B",
            title:
              "Añadir liveness 'activo' con reto aleatorio (parpadear, girar, decir número) + detección de deepfake con modelo en el servidor.",
            legalRisk:
              "Bajo. Cumple Circular SIC 002/2024 y muestra a la SFC voluntad de elevar estándar.",
            technicalRisk:
              "Aumenta el tiempo de onboarding de 30 s a 90 s. Tasa de abandono prevista: +15 %. Proveedor especializado: $850–$2.500 mensuales adicionales.",
          },
          {
            label: "C",
            title:
              "Segmentar el flujo: montos < $500.000 siguen con KYC rápido; montos ≥ $500.000 exigen liveness activo + cruce ANI.",
            legalRisk:
              "Bajo, si se documenta la política de riesgo y se justifica el umbral en el Manual SARLAFT.",
            technicalRisk:
              "Requiere doble pipeline y política clara. Si el umbral queda mal calibrado, se abre ventana para fraude escalonado (dividir operaciones).",
          },
        ],
        forcedQuestion:
          "¿Qué arquitectura recomienda al comité de riesgo mañana, y cómo la justifica ante la SFC en el memorial de respuesta a los 20 días?",
        synthesisHint:
          "La síntesis profesional se parece a C con B como obligación para el segmento de mayor riesgo. El dato que convence a la SFC no es la tecnología, sino la política escrita de gestión diferenciada del riesgo.",
        deliverable:
          "Política SARLAFT de 2 páginas con umbrales, controles por segmento y cita de Circular SIC 002/2024, firmada por el oficial de cumplimiento.",
      },
      humanFocus:
        "Una abuela de 80 años en Nariño quiere abrir una cuenta de ahorros para recibir su subsidio. Si no puede completar el KYC digital, ¿qué alternativa le ofrece el banco? La verdadera prueba de inclusión no está en el app store: está en el pueblo donde esa abuela vive.",
    },
  },
  {
    id: 5,
    slug: "cibercrimen-prueba-digital",
    title: "Cibercrimen y Prueba Digital",
    subtitle: "Seguridad Jurídica en la Era Digital",
    description:
      "Comprende los delitos informáticos, el marco legal colombiano, la cadena de custodia digital y el peritaje informático para proteger la integridad de la evidencia en procesos judiciales.",
    icon: "shield",
    color: "#B45309",
    bgGradient: "from-amber-700 to-orange-600",
    objectives: [
      "Identificar los principales delitos informáticos y el marco legal que los regula en Colombia",
      "Comprender el proceso de cadena de custodia digital y su importancia en la prueba judicial",
      "Reconocer el rol del peritaje informático en la investigación de cibercrimen",
      "Aplicar buenas prácticas de ciberseguridad en el desarrollo y uso de soluciones LegalTech",
    ],
    concepts: [
      { term: "Cibercrimen", definition: "Cualquier actividad delictiva que utiliza sistemas informáticos o redes como medio, objetivo o ambos." },
      { term: "Prueba digital", definition: "Evidencia almacenada o transmitida en formato electrónico, utilizada en procesos judiciales." },
      { term: "Cadena de custodia", definition: "Proceso documentado que asegura la integridad y trazabilidad de la evidencia digital desde su recolección hasta su presentación en juicio." },
      { term: "Peritaje informático", definition: "Análisis técnico realizado por expertos para identificar, preservar y validar evidencia digital." },
      { term: "Ley 1273/2009", definition: "Norma colombiana que tipifica y sanciona los delitos informáticos y protege la información de datos." },
      { term: "Convenio de Budapest", definition: "Tratado internacional que establece estándares para la lucha contra el cibercrimen y la cooperación internacional." },
    ],
    timeline: [
      { year: "2009", title: "Ley 1273/2009", description: "Se promulga la ley que tipifica delitos como el acceso abusivo a sistemas, daño informático y violación de datos personales." },
      { year: "2018", title: "Convenio de Budapest (Ley 1928/2018)", description: "Colombia se adhiere al principal tratado internacional sobre cibercrimen, comprometiéndose a armonizar su legislación." },
      { year: "2020", title: "Pandemia y auge de delitos digitales", description: "El aumento del trabajo remoto genera un incremento en los ciberataques y la necesidad de fortalecer la gestión de pruebas electrónicas." },
      { year: "2022-2024", title: "Nuevas guías y fortalecimiento", description: "Se implementan lineamientos y mejores prácticas para la cadena de custodia digital y la admisibilidad de pruebas electrónicas." },
    ],
    process: [
      { step: 1, title: "Identificación y recolección", description: "Detecta y selecciona la evidencia digital relevante, asegurando que no se altere durante la recolección." },
      { step: 2, title: "Documentación detallada", description: "Registra el contexto, origen, fecha y hora de obtención de la prueba, así como los responsables de cada acción." },
      { step: 3, title: "Preservación de la integridad", description: "Utiliza técnicas como el cálculo de hash, copias forenses y registros de acceso para evitar modificaciones no autorizadas." },
      { step: 4, title: "Almacenamiento seguro y trazabilidad", description: "Guarda la evidencia en dispositivos protegidos, con controles de acceso y bitácoras que permitan rastrear cualquier manipulación." },
      { step: 5, title: "Transporte y entrega", description: "Traslada la prueba a la autoridad competente, documentando cada transferencia y asegurando la cadena de custodia con firmas digitales." },
      { step: 6, title: "Presentación y validación", description: "Expón la evidencia ante el juez, respaldada por informes periciales y documentación completa que demuestre su autenticidad e integridad." },
    ],
    challenges: [
      { title: "Pérdida o alteración de evidencia", description: "La pérdida o manipulación de pruebas digitales puede invalidar procesos judiciales y favorecer la impunidad.", type: "risk" },
      { title: "Ataques cibernéticos a plataformas legales", description: "Los sistemas judiciales y plataformas LegalTech son blancos frecuentes de ciberataques que buscan robar, alterar o destruir información.", type: "risk" },
      { title: "Errores en la cadena de custodia", description: "Fallas en la documentación o manipulación indebida pueden llevar a la exclusión de pruebas esenciales.", type: "challenge" },
      { title: "Falta de capacitación técnica", description: "La carencia de conocimientos actualizados en ciberseguridad aumenta la vulnerabilidad de abogados, peritos y desarrolladores.", type: "challenge" },
    ],
    mindMap: {
      id: "root",
      label: "Cibercrimen",
      color: "#B45309",
      children: [
        {
          id: "delitos",
          label: "Delitos Informáticos",
          color: "#D97706",
          children: [
            { id: "acceso", label: "Acceso Abusivo", color: "#FCD34D" },
            { id: "ransom", label: "Ransomware", color: "#FCD34D" },
            { id: "fraude", label: "Fraude Digital", color: "#FCD34D" },
          ],
        },
        {
          id: "evidence",
          label: "Evidencia Digital",
          color: "#1E3A8A",
          children: [
            { id: "chain", label: "Cadena de Custodia", color: "#3B82F6" },
            { id: "forensic", label: "Peritaje", color: "#3B82F6" },
            { id: "hash", label: "Integridad Hash", color: "#3B82F6" },
          ],
        },
        {
          id: "security",
          label: "Ciberseguridad",
          color: "#10B981",
          children: [
            { id: "encrypt", label: "Cifrado", color: "#34D399" },
            { id: "mfa-sec", label: "MFA", color: "#34D399" },
            { id: "backup", label: "Respaldo", color: "#34D399" },
          ],
        },
      ],
    },
    quote: "La validez de una prueba digital depende tanto de la tecnología como del rigor jurídico en su manejo.",
    tags: ["Ciberseguridad", "Evidencia Digital", "Cadena de Custodia", "Peritaje"],
    riskTier: "tier-2",
    competencies: [
      {
        role: "star",
        title: "Preservar evidencia digital con cadena de custodia que resista tacha",
        definition:
          "Recolectar un archivo digital (WhatsApp, correo, video, log de sistema) calculando hash SHA-256, documentando fecha, dispositivo, responsable, y guardándolo de forma que un perito pueda verificar integridad años después.",
        evidence:
          "Acta de recolección + hash + copia forense de un caso real, con formato reutilizable.",
        metric: {
          before:
            "Toma pantallazo y lo envía por correo.",
          after:
            "Entrega hash SHA-256 + copia forense + acta con firmas digitales.",
        },
      },
      {
        role: "support",
        title: "Distinguir entre prueba sobreviniente y prueba mal recolectada",
        definition:
          "Evaluar si una evidencia digital fue obtenida respetando derechos fundamentales (inviolabilidad de comunicaciones, habeas data) y si llega al expediente con cadena de custodia.",
        evidence:
          "Check-list de 8 puntos aplicable antes de aportar prueba digital.",
        metric: {
          before:
            "Aporta lo que el cliente le envíe sin filtrar.",
          after:
            "Filtra, pide peritaje cuando corresponde y declara origen con total transparencia.",
        },
      },
      {
        role: "support",
        title: "Redactar la solicitud de prueba anticipada sobre evidencia volátil",
        definition:
          "Escribir memorial que pida al juez ordenar preservación urgente de chats, videos, accesos o logs antes de que desaparezcan por política de retención del proveedor.",
        evidence:
          "Modelo de memorial aplicable a 3 escenarios (WhatsApp, Twitter, correo corporativo).",
        metric: {
          before:
            "Espera a la etapa probatoria y para entonces el dato ya no existe.",
          after:
            "Solicita prueba anticipada el mismo día que conoce el caso.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "La evidencia digital es volátil y maleable. Un pantallazo no es una prueba: es una ilustración. El cambio, para el abogado del siglo XXI, es dejar de presentar imágenes y empezar a presentar paquetes binarios con su hash. La prueba ya no se muestra; se demuestra matemáticamente.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Enseñar la diferencia entre representar un hecho (pantallazo) y preservar la evidencia de ese hecho (archivo original con integridad verificable).",
          beats: [
            "Prueba digital ≠ imagen digital. La prueba es el mensaje de datos original con metadatos intactos.",
            "La integridad se garantiza con hash criptográfico (SHA-256): una huella única de 64 caracteres.",
            "La Ley 1273/2009 + el Convenio de Budapest (Ley 1928/2018) son el marco que le da dientes al peritaje.",
          ],
          analogy: {
            title: "La foto del crimen vs. la escena del crimen",
            metaphor:
              "Una foto de un cuchillo ensangrentado no es el cuchillo. El cuchillo con huellas dactilares preservado en cadena de custodia es lo que el fiscal presenta al juez.",
            bridge:
              "Un pantallazo de WhatsApp es la foto. El archivo .eml con encabezados, el backup del teléfono con su hash, la extracción forense certificada: eso es la escena. Si aportas la foto, regalas la prueba.",
          },
        },
        {
          act: "II",
          title: "Ejecución: demo de hash SHA-256 en vivo",
          duration: "25–30 min",
          purpose:
            "Dejar que cada asistente toque con sus manos la sensibilidad de un hash: un pixel cambiado cambia el archivo entero.",
          demo: {
            tool: "Línea de comandos (shasum / Get-FileHash) · GIMP o Photoshop",
            steps: [
              "Tomar una foto con el celular. Guardarla como IMG_001.jpg.",
              "Calcular su hash SHA-256 (`shasum -a 256 IMG_001.jpg`) — anotar los 64 caracteres.",
              "Abrir la foto en GIMP y modificar UN solo pixel. Guardar como IMG_001_mod.jpg.",
              "Recalcular el hash de IMG_001_mod.jpg.",
              "Comparar los dos hashes: son completamente distintos, aunque a simple vista las fotos parezcan idénticas.",
            ],
            outcome:
              "El peritaje digital se sostiene en esa propiedad: el hash detecta cualquier alteración, por microscópica que sea. Si el hash coincide hoy con el de hace 6 meses, la prueba está incólume.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: pantallazo vs peritaje forense",
          duration: "20 min",
          purpose:
            "Poner al abogado y al developer frente al mismo caso real: una amenaza por WhatsApp que debe resistir un juicio.",
        },
      ],
      dialogue: [
        {
          audience: "abogado",
          question:
            "Usted tiene un pantallazo de WhatsApp donde su cliente fue amenazado. ¿Cómo convence al juez de que no es un montaje hecho con Photoshop?",
          insight:
            "La respuesta no es 'porque lo digo': es aportar el .opus original, el backup del dispositivo, certificación pericial y, si es posible, extracción UFED Cellebrite.",
        },
        {
          audience: "developer",
          question:
            "¿Cómo demuestras técnicamente que ese mensaje salió realmente del teléfono del demandado y no de un clon o de WhatsApp Web en otro dispositivo?",
        },
        {
          audience: "todos",
          question:
            "Una víctima denuncia un video íntimo no consentido publicado en Twitter y borrado 5 minutos después. ¿Se puede reconstruir esa prueba para una denuncia penal?",
        },
      ],
      dilemma: {
        scenario:
          "Su cliente recibe por WhatsApp una amenaza de muerte acompañada de un audio y una foto de su casa. Quiere denunciar mañana en la Fiscalía. Le muestra los pantallazos ya tomados con el celular de un familiar, no con el suyo.",
        constraint:
          "La amenaza llegó hace 8 horas. WhatsApp borra medios en 30 días si el dispositivo no sincroniza. El cliente ya reenvió los pantallazos a 4 personas por 'solidaridad'. Mañana es fin de semana largo.",
        options: [
          {
            label: "A",
            title:
              "Llevar los pantallazos a denunciar tal como están.",
            legalRisk:
              "Alto. La defensa podrá decir que son montaje en Photoshop. La Ley 1273/2009 sanciona, pero la prueba aportada puede no sostenerse en audiencia.",
            technicalRisk:
              "Cero esfuerzo técnico, cero control sobre la evidencia. Los 4 reenvíos diluyen la trazabilidad.",
          },
          {
            label: "B",
            title:
              "Antes de denunciar, hacer extracción forense del celular del cliente con perito certificado (UFED Cellebrite o MOBILedit).",
            legalRisk:
              "Mínimo. La prueba llega con hash, metadatos completos y reporte pericial.",
            technicalRisk:
              "Costo: $1,5 – 4 millones. Tiempo: 1–2 días. Puede que la Fiscalía luego pida su propio peritaje y el primero quede archivado.",
          },
          {
            label: "C",
            title:
              "Radicar solicitud de prueba anticipada hoy mismo ante juez de control de garantías para preservar el chat antes de la denuncia.",
            legalRisk:
              "Bajo. Art. 274 CGP y práctica de Fiscalía permiten asegurar evidencia volátil. Refuerza la denuncia posterior.",
            technicalRisk:
              "Requiere memorial urgente. Si el juez no despacha por fin de semana largo, puede llegar tarde.",
          },
        ],
        forcedQuestion:
          "¿Qué hace hoy mismo, antes de que WhatsApp purgue el mensaje y antes de que la contraparte alegue montaje?",
        synthesisHint:
          "La síntesis profesional combina B y C: extracción forense del dispositivo del cliente HOY + radicación de prueba anticipada como blindaje adicional. La opción A, sola, regala la prueba.",
        deliverable:
          "Plan de acción de 1 página con tareas, responsables, tiempos y texto del memorial de prueba anticipada listo para radicar.",
      },
      humanFocus:
        "Una víctima de acoso cibernético llega a la Fiscalía con su celular. Si el investigador no sabe calcular un hash ni preservar la cadena de custodia, la prueba puede desaparecer por manipulación. La competencia técnica en lo digital ya no es opcional: es la diferencia entre justicia y revictimización.",
    },
  },
  {
    id: 6,
    slug: "ia-aplicada-derecho",
    title: "Inteligencia Artificial Aplicada al Derecho",
    subtitle: "Métodos y Ética",
    description:
      "Explora los fundamentos técnicos de IA jurídica (LLMs, RAG, ingeniería de prompts) y los desafíos éticos y regulatorios que moldean su adopción responsable en el sistema legal colombiano.",
    icon: "chemistry",
    color: "#6D28D9",
    bgGradient: "from-purple-800 to-violet-600",
    objectives: [
      "Comprender los fundamentos técnicos de la IA jurídica, incluyendo LLMs, RAG y prompts",
      "Analizar los retos éticos y la responsabilidad profesional asociados al uso de IA en el derecho",
      "Identificar el marco regulatorio colombiano aplicable a la IA en los servicios legales",
      "Aplicar conocimientos a través de casos prácticos sobre el uso de IA en el sector jurídico",
    ],
    concepts: [
      { term: "IA (Inteligencia Artificial)", definition: "Sistemas informáticos capaces de realizar tareas que normalmente requieren inteligencia humana, como análisis, predicción o aprendizaje." },
      { term: "LLM (Large Language Model)", definition: "Modelo de IA entrenado con grandes volúmenes de texto para comprender y generar lenguaje natural, siendo útil en el análisis jurídico." },
      { term: "RAG (Retrieval-Augmented Generation)", definition: "Técnica que combina IA generativa con recuperación de información, permitiendo respuestas precisas basadas en fuentes legales." },
      { term: "Prompt engineering", definition: "Instrucción o pregunta formulada para guiar la respuesta de un modelo de IA, clave para obtener resultados útiles y éticos." },
      { term: "Circular SIC 002/2024", definition: "Norma colombiana que regula el uso de IA en servicios legales, exigiendo transparencia, explicabilidad y mitigación de sesgos." },
    ],
    timeline: [
      { year: "2017–2019", title: "Primeras aplicaciones jurídicas de IA", description: "Despachos y startups en Colombia comenzaron a implementar IA para analizar contratos y jurisprudencia." },
      { year: "2020", title: "Aceleración por la pandemia", description: "La crisis sanitaria impulsó el uso de herramientas automatizadas y chatbots legales, facilitando la atención remota." },
      { year: "2022", title: "Debate sobre sesgo y transparencia", description: "La discusión pública se centró en los riesgos de sesgo algorítmico y la necesidad de transparencia en decisiones asistidas por IA." },
      { year: "2024", title: "Circular SIC 002/2024", description: "Se expide la primera norma oficial en Colombia que regula el uso de IA en servicios legales." },
    ],
    process: [
      { step: 1, title: "Identificar el problema legal", description: "Define claramente el objetivo que se busca resolver con IA, delimitando el alcance y los resultados esperados." },
      { step: 2, title: "Seleccionar o entrenar modelos adecuados", description: "Elige modelos de IA que cumplan con los requisitos de la Circular SIC 002/2024, priorizando la transparencia y la mitigación de sesgos." },
      { step: 3, title: "Evaluar y mitigar riesgos", description: "Analiza posibles sesgos, alucinaciones o errores en los resultados del modelo. Implementa controles y auditorías periódicas." },
      { step: 4, title: "Documentar decisiones técnicas y jurídicas", description: "Registra cómo se diseñó, entrenó y validó el modelo, así como los criterios legales aplicados." },
      { step: 5, title: "Asegurar transparencia y explicabilidad", description: "Informa a usuarios y clientes sobre el funcionamiento de la IA, sus limitaciones y el fundamento legal de las recomendaciones." },
      { step: 6, title: "Validar desempeño y métricas", description: "Mide la precisión, equidad y otras métricas relevantes para asegurar que el modelo cumple con los estándares de calidad." },
      { step: 7, title: "Actualizar y auditar el sistema", description: "Revisa periódicamente el modelo y sus resultados, adaptándolo a cambios regulatorios, tecnológicos o de contexto." },
    ],
    challenges: [
      { title: "Sesgo algorítmico", description: "La IA puede reproducir o amplificar sesgos presentes en los datos de entrenamiento, afectando la equidad de las decisiones legales.", type: "risk" },
      { title: "Responsabilidad profesional", description: "Los abogados tienen el deber de competencia tecnológica, lo que implica entender y supervisar el uso de IA en su práctica.", type: "challenge" },
      { title: "Transparencia y explicabilidad", description: "La Circular SIC 002/2024 exige que los sistemas de IA sean transparentes y explicables, permitiendo a los usuarios entender las decisiones.", type: "practice" },
      { title: "Protección de datos personales", description: "El uso de IA jurídica debe cumplir con la Ley 1581/2012, garantizando el consentimiento informado y la seguridad de los datos.", type: "challenge" },
    ],
    mindMap: {
      id: "root",
      label: "IA en el Derecho",
      color: "#6D28D9",
      children: [
        {
          id: "tech-ia",
          label: "Tecnologías",
          color: "#7C3AED",
          children: [
            { id: "llm", label: "LLMs", color: "#A78BFA" },
            { id: "rag", label: "RAG", color: "#A78BFA" },
            { id: "prompts", label: "Prompt Eng.", color: "#A78BFA" },
          ],
        },
        {
          id: "apps-ia",
          label: "Aplicaciones",
          color: "#1E3A8A",
          children: [
            { id: "contracts-ia", label: "Contratos", color: "#3B82F6" },
            { id: "predict-ia", label: "Predicción", color: "#3B82F6" },
            { id: "docs-ia", label: "Documentos", color: "#3B82F6" },
            { id: "chatbot", label: "Asistentes", color: "#3B82F6" },
          ],
        },
        {
          id: "ethics",
          label: "Ética y Regulación",
          color: "#EF4444",
          children: [
            { id: "bias-ia", label: "Sesgo", color: "#FCA5A5" },
            { id: "explain", label: "Explicabilidad", color: "#FCA5A5" },
            { id: "sic-ia", label: "Circular SIC", color: "#FCA5A5" },
          ],
        },
      ],
    },
    quote: "La adopción responsable de la IA en derecho exige rigor técnico, ética profesional y cumplimiento normativo: no basta con innovar, hay que proteger derechos y garantizar transparencia.",
    tags: ["IA", "LLM", "RAG", "Ética", "Transparencia"],
    riskTier: "tier-2",
    competencies: [
      {
        role: "star",
        title: "Diseñar un sistema RAG auditable para consulta jurídica",
        definition:
          "Montar un pipeline donde el LLM solo pueda responder con base en un corpus jurídico cargado (leyes, sentencias, doctrina), con trazabilidad de la fuente por cada respuesta.",
        evidence:
          "Prototipo mínimo con 20 documentos indexados y log de fuentes por respuesta.",
        metric: {
          before:
            "Usa ChatGPT 'pelado' y acepta lo que responda.",
          after:
            "Responde citando artículo, capítulo y página del documento fuente.",
        },
      },
      {
        role: "support",
        title: "Redactar política interna de uso de IA para un despacho",
        definition:
          "Escribir documento de 1 página con qué pueden hacer los abogados con IA, qué está prohibido y cómo se documenta cada uso, cumpliendo Circular SIC 002/2024.",
        evidence:
          "Política firmada por el socio director, con 6 reglas claras.",
        metric: {
          before:
            "No hay política; cada abogado usa ChatGPT como quiere.",
          after:
            "Política vigente, comunicada al equipo y revisada trimestralmente.",
        },
      },
      {
        role: "support",
        title: "Detectar alucinaciones en respuestas de IA jurídica",
        definition:
          "Dado un output de IA que cita jurisprudencia, verificar en menos de 5 minutos si la sentencia existe, si dice lo que el modelo dice y si está vigente.",
        evidence:
          "Revisión de 10 respuestas con tasa de detección de alucinación registrada.",
        metric: {
          before:
            "Confía en las citas que le entregue el modelo.",
          after:
            "Verifica cada cita contra RAMA o LEGIS; detecta al menos 8 de cada 10 invenciones.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "Un LLM no es una base de datos de leyes. Es un predictor de la siguiente palabra, entrenado con medio internet. Sabe cómo suena una ley; no sabe qué significa la justicia. El cambio profesional es aceptar esa asimetría y asumir el rol de verificador humano: la IA acelera, el abogado responde. La Circular SIC 002/2024 lo formaliza en norma.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Instalar una comprensión realista de qué es un LLM antes de dejarlo cerca de un caso real.",
          beats: [
            "LLM = modelo probabilístico, no base de datos. Inventa cuando no sabe (alucina).",
            "RAG (Retrieval-Augmented Generation) acota la respuesta a un corpus controlado.",
            "Prompt engineering = arte de escribir instrucciones que no dejan espacio para improvisar.",
          ],
          analogy: {
            title: "El becario brillante y olvidadizo",
            metaphor:
              "Imagina un becario recién graduado que leyó toda Wikipedia, todo Twitter, todos los libros que pudo. Habla precioso, cita autores… pero a veces cita autores que no existen y leyes que ya fueron derogadas. Lo contratarías, pero nunca le dejarías firmar una demanda.",
            bridge:
              "Ese becario es GPT, Claude, Gemini. Útil para investigar, resumir, redactar borradores. Nunca para cerrar una recomendación jurídica sin que un abogado humano pase su nombre y su firma.",
          },
        },
        {
          act: "II",
          title: "Ejecución: RAG como examen a libro abierto",
          duration: "25–30 min",
          purpose:
            "Mostrar que RAG no es magia: es obligar al LLM a leer de un libro específico antes de responder.",
          demo: {
            tool: "Python + LangChain/LlamaIndex · Ley 820/2003 de Arrendamientos en PDF",
            steps: [
              "Cargar el PDF de la Ley 820/2003 y trocearlo en fragmentos de ~500 tokens.",
              "Generar embeddings de cada fragmento y guardarlos en una base vectorial (FAISS, Chroma).",
              "Al recibir la pregunta del abogado, recuperar los 5 fragmentos más relevantes.",
              "Pasar esos fragmentos al LLM con la instrucción: 'Responde únicamente a partir de este contexto. Si no está, di que no sabes.'",
              "Comparar la respuesta RAG con la respuesta 'pelada' (sin contexto) del mismo LLM.",
            ],
            outcome:
              "La respuesta RAG cita artículo, capítulo y numeral de la Ley 820. La respuesta pelada inventa un artículo que no existe. La diferencia entre un producto profesional y un juguete.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: ¿de quién es la culpa cuando la IA alucina?",
          duration: "20 min",
          purpose:
            "Distribuir la responsabilidad profesional entre desarrollador, abogado y cliente sin que se pierda en el aire.",
        },
      ],
      dialogue: [
        {
          audience: "todos",
          question:
            "Si la IA responde con un artículo de ley que fue derogado ayer, ¿de quién es la culpa: del que programó la base de datos desactualizada, del abogado que no verificó, o de la IA por 'alucinar'?",
          insight:
            "Conclusión firme: la responsabilidad profesional es del humano. La IA no jura ni colegia; el abogado sí. La Circular SIC 002 no admite como excusa 'lo dijo el modelo'.",
        },
        {
          audience: "abogado",
          question:
            "¿Se pueden cobrar honorarios profesionales por un análisis que hizo un LLM en 30 segundos? ¿Qué valor agregado cobra el humano cuando la producción es de la máquina?",
        },
        {
          audience: "developer",
          question:
            "¿Cómo documentas en tu sistema RAG que la respuesta viene del art. 22 de la Ley 820 y no de un fragmento cualquiera del pretraining? (Pista: source attribution + auditoría de prompts).",
        },
      ],
      dilemma: {
        scenario:
          "Una firma boutique de 14 abogados quiere integrar IA. El socio senior pide 'lo último' y recibe tres propuestas: (i) ChatGPT Plus institucional, (ii) un RAG propio sobre Ley 820/2003 y sentencias de tutela, (iii) un contrato con Harvey/CoCounsel por US$ 85.000/año.",
        constraint:
          "Presupuesto del año para tecnología: $120 millones. Dos abogados jóvenes saben Python básico. Un cliente corporativo ya exigió cláusula de uso responsable de IA en el contrato de retainer.",
        options: [
          {
            label: "A",
            title: "ChatGPT Plus con política interna escrita y capacitación al equipo.",
            legalRisk:
              "Medio. Útil para redacción general pero no para investigación jurídica profunda: alto riesgo de alucinaciones si no se verifica cada cita. Requiere política Circular SIC 002/2024.",
            technicalRisk:
              "Costo bajo: ~$2 millones/año. Los datos del cliente salen a OpenAI salvo que se contrate la versión empresarial.",
          },
          {
            label: "B",
            title: "RAG propio sobre corpus controlado (Ley 820, sentencias propias, modelos internos).",
            legalRisk:
              "Bajo si se construye bien. Permite trazabilidad de fuentes, auditoría y cumplimiento Circular SIC 002/2024.",
            technicalRisk:
              "Costo medio: $30–60 millones (desarrollo + infra). Requiere mantenimiento continuo y personal técnico dedicado.",
          },
          {
            label: "C",
            title: "Harvey/CoCounsel: solución LegalTech llave en mano con garantías contractuales.",
            legalRisk:
              "Mínimo. El proveedor responde por el desempeño y asume buena parte de los controles. Cláusulas DPA estándar.",
            technicalRisk:
              "Costo alto: US$ 85.000/año ≈ $340 millones. Supera el presupuesto y crea dependencia del proveedor extranjero.",
          },
        ],
        forcedQuestion:
          "¿Qué arquitectura de IA adopta la firma este año, cómo lo justifica ante el cliente corporativo y cómo lo comunica al equipo de 14 personas?",
        synthesisHint:
          "La síntesis profesional frecuente es A + B por fases: ChatGPT Plus con política escrita desde el día uno (ya mismo), y construcción de un RAG específico para los 2–3 tipos de caso más frecuentes de la firma en los siguientes 6–9 meses. C se descarta por presupuesto, pero se reconsidera al año siguiente si el RAG no escala.",
        deliverable:
          "Roadmap de 1 página con fases, costos, responsables y cláusula de uso responsable de IA para el contrato de retainer.",
      },
      humanFocus:
        "Un ciudadano consulta un chatbot 'legal' sobre su arrendamiento y recibe un consejo equivocado. Pierde 3 millones de pesos. ¿Puede demandar a la IA? No. Puede demandar al abogado o a la empresa que la ofreció sin supervisión humana. Por eso la Circular SIC 002 exige transparencia, explicabilidad y supervisión: para que cuando algo falle, haya una firma humana detrás que responda.",
    },
  },
  {
    id: 7,
    slug: "blockchain-smart-contracts",
    title: "Blockchain, Smart Contracts y Derechos Digitales",
    subtitle: "Nuevos Paradigmas Jurídicos",
    description:
      "Entiende cómo blockchain, smart contracts y NFTs están transformando la propiedad, los contratos y los derechos en Colombia, y los desafíos regulatorios que estas tecnologías plantean.",
    icon: "layers",
    color: "#065F46",
    bgGradient: "from-emerald-800 to-teal-600",
    objectives: [
      "Comprender los fundamentos de blockchain, smart contracts y NFTs en el contexto legal colombiano",
      "Identificar los marcos legales y regulatorios aplicables a estas tecnologías",
      "Analizar la responsabilidad civil derivada del uso de IA y contratos inteligentes",
      "Evaluar riesgos, oportunidades y ejemplos prácticos de LegalTech en este ámbito",
    ],
    concepts: [
      { term: "Blockchain", definition: "Tecnología de registro descentralizado que permite almacenar información de forma segura, transparente e inmutable." },
      { term: "Smart Contract", definition: "Programa informático que ejecuta automáticamente acuerdos cuando se cumplen ciertas condiciones, sin intermediarios." },
      { term: "NFT (Non-Fungible Token)", definition: "Activo digital único que representa propiedad o derechos sobre un bien digital o físico, registrado en blockchain." },
      { term: "Decisión Andina 351/1993", definition: "Norma regional que regula derechos de autor y propiedad intelectual en la Comunidad Andina, relevante para NFTs." },
      { term: "Derechos digitales", definition: "Nuevos derechos relacionados con el uso, acceso y control de información y activos en entornos digitales." },
    ],
    timeline: [
      { year: "2015", title: "Primeros pilotos de blockchain", description: "Instituciones financieras y notariales en Colombia implementan los primeros pilotos de blockchain para la trazabilidad y el registro seguro." },
      { year: "2018", title: "Debate sobre smart contracts", description: "Se inicia una discusión pública sobre los contratos inteligentes y su validez jurídica en el sistema legal colombiano." },
      { year: "2021", title: "Relevancia de NFTs", description: "Los NFTs y activos digitales ganan relevancia en los sectores creativo y jurídico. Surgen los primeros casos de uso en arte, música y marcas." },
      { year: "2022", title: "Regulación y responsabilidad civil por IA", description: "Se intensifican los debates y regulaciones sobre la responsabilidad civil por IA y tecnologías emergentes." },
      { year: "2024", title: "Avances normativos en la región Andina", description: "Se consolidan marcos legales y se reconocen nuevos derechos en entornos digitales en la región Andina." },
    ],
    process: [
      { step: 1, title: "Identificar el problema jurídico", description: "Define claramente el problema a resolver: trazabilidad de activos, automatización de pagos o registro de propiedad." },
      { step: 2, title: "Evaluar la aplicabilidad tecnológica", description: "Analiza si blockchain o smart contracts son la mejor opción para el caso, considerando costos, escalabilidad y beneficios frente a alternativas." },
      { step: 3, title: "Analizar el marco normativo", description: "Revisa las leyes de contratos, la Decisión Andina 351/1993, normas de protección de datos y principios de responsabilidad civil." },
      { step: 4, title: "Diseñar el flujo de funcionamiento", description: "Elabora diagramas y descripciones detalladas del proceso, asegurando que cada paso cumpla requisitos técnicos y jurídicos." },
      { step: 5, title: "Implementar auditoría y transparencia", description: "Incluye mecanismos para que usuarios y autoridades puedan verificar el funcionamiento y la integridad del sistema." },
      { step: 6, title: "Documentar riesgos y advertencias", description: "Redacta términos de uso claros que informen sobre riesgos, limitaciones y responsabilidades legales de la solución." },
      { step: 7, title: "Actualizar y monitorear la solución", description: "Establece procesos de revisión periódica para adaptar la solución a cambios regulatorios y tecnológicos." },
    ],
    challenges: [
      { title: "Validez jurídica de smart contracts", description: "La interpretación de cláusulas automáticas, la jurisdicción aplicable y la ejecución forzosa de smart contracts generan disputas complejas.", type: "challenge" },
      { title: "Privacidad en blockchain", description: "La inmutabilidad de blockchain puede entrar en conflicto con el derecho al olvido y la protección de datos personales.", type: "risk" },
      { title: "NFTs y derechos de autor", description: "Garantizar la autenticidad de NFTs y evitar infracciones de derechos de autor es un reto; la tecnología no impide la copia o uso indebido de obras digitales.", type: "challenge" },
      { title: "Responsabilidad por fallos automáticos", description: "Los errores en contratos inteligentes pueden causar daños sin que haya una persona directamente responsable.", type: "risk" },
      { title: "Registro de activos digitales", description: "El uso de blockchain permite registrar la propiedad intelectual de forma transparente y segura, facilitando la trazabilidad.", type: "opportunity" },
    ],
    mindMap: {
      id: "root",
      label: "Blockchain & Web3",
      color: "#065F46",
      children: [
        {
          id: "bc-tech",
          label: "Blockchain",
          color: "#059669",
          children: [
            { id: "distrib", label: "Descentralización", color: "#34D399" },
            { id: "immut", label: "Inmutabilidad", color: "#34D399" },
            { id: "trace", label: "Trazabilidad", color: "#34D399" },
          ],
        },
        {
          id: "contracts-bc",
          label: "Smart Contracts",
          color: "#1E3A8A",
          children: [
            { id: "auto", label: "Automatización", color: "#3B82F6" },
            { id: "validity", label: "Validez Jurídica", color: "#3B82F6" },
            { id: "exec", label: "Ejecución Forzosa", color: "#3B82F6" },
          ],
        },
        {
          id: "nft-rights",
          label: "NFTs y Derechos",
          color: "#8B5CF6",
          children: [
            { id: "ip", label: "Propiedad Intelectual", color: "#A78BFA" },
            { id: "nft-marks", label: "Marcas Digitales", color: "#A78BFA" },
            { id: "dig-rights", label: "Derechos Digitales", color: "#A78BFA" },
          ],
        },
      ],
    },
    quote: "La innovación tecnológica solo tiene sentido si respeta los derechos de las personas y se integra con el marco legal: blockchain y smart contracts no sustituyen el derecho, lo potencian.",
    tags: ["Blockchain", "Smart Contracts", "NFTs", "Derechos Digitales"],
    riskTier: "tier-3",
    competencies: [
      {
        role: "star",
        title: "Preconstituir prueba de autoría con sello blockchain",
        definition:
          "Registrar el hash de una obra (texto, imagen, audio, contrato) en una blockchain pública (Bitcoin vía OpenTimestamps o similar) y presentar ese registro como prueba en un litigio de propiedad intelectual.",
        evidence:
          "Certificado con bloque, hora y prueba Merkle, traducido a memorial ante juez.",
        metric: {
          before:
            "Prueba de autoría depende de envíos por correo y registros notariales análogos.",
          after:
            "Tiene sello blockchain verificable en línea con prueba matemática.",
        },
      },
      {
        role: "support",
        title: "Evaluar si un caso necesita blockchain o no",
        definition:
          "Frente a una propuesta de 'poner X en blockchain', aplicar un árbol de decisión que descarta la tecnología cuando hay opciones más simples.",
        evidence:
          "Árbol de decisión aplicado a 5 casos reales con conclusión fundamentada.",
        metric: {
          before:
            "Recomienda blockchain por moda o presión comercial.",
          after:
            "Descarta la mayoría de casos y solo recomienda cuando aporta confianza distribuida real.",
        },
      },
      {
        role: "support",
        title: "Redactar términos de uso de un smart contract en lenguaje claro",
        definition:
          "Traducir el código Solidity de un smart contract a términos contractuales en español claro, con jurisdicción, ley aplicable y mecanismo de disputa.",
        evidence:
          "Pareja 'contrato legal + smart contract' revisada para un caso real.",
        metric: {
          before:
            "Deja el smart contract sin 'back-to-back' legal en papel.",
          after:
            "Entrega contrato bilingüe código-prosa, con cláusulas de jurisdicción y resolución de disputas.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "Olvida el Bitcoin. Blockchain en Derecho es una tecnología de sello de tiempo universal e inmutable con trazabilidad incomparable. El cambio es epistemológico: por primera vez tenemos un registro descentralizado donde nadie puede arrancar una hoja sin que toda la red se entere. Eso redefine qué significa 'prueba de preconstitución' y qué puede ser un 'contrato'.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Entender blockchain como tecnología de confianza distribuida, no como sinónimo de criptomonedas especulativas.",
          beats: [
            "Blockchain = red hiperdistribuida con consenso criptográfico e inmutabilidad.",
            "Smart contract ≠ contrato legal. Es una 'alcancía programable' que ejecuta reglas.",
            "El algoritmo SSS (Shamir's Secret Sharing) abre vías para el 'derecho al olvido' sin romper la cadena.",
          ],
          analogy: {
            title: "El cuaderno de contabilidad de tinta indeleble",
            metaphor:
              "Imagina un cuaderno gigante donde todos los vecinos del barrio pueden leer, pero cada hoja está pegada con una fórmula matemática. Si alguien arranca una hoja, todas las demás quedan desalineadas y la red lo nota al instante.",
            bridge:
              "Eso es blockchain. La inmutabilidad no es mágica: es matemática + redundancia + consenso distribuido. Por eso sirve como sello de tiempo confiable ante un juez.",
          },
        },
        {
          act: "II",
          title: "Ejecución: sello de tiempo para obra creativa",
          duration: "25–30 min",
          purpose:
            "Crear en vivo una prueba de preconstitución digital sobre una obra propia, útil para litigios de propiedad intelectual.",
          demo: {
            tool: "OpenTimestamps (Bitcoin) · Remix IDE (Solidity) · OriginStamp",
            steps: [
              "Tomar un archivo de obra creativa (canción, guion, logo). Calcular su hash SHA-256.",
              "Registrar ese hash en la blockchain de Bitcoin usando OpenTimestamps.",
              "Recibir el comprobante con bloque, hora y prueba Merkle.",
              "Como variante: desplegar un smart contract simple en Remix ('alcancía que libera fondos si se cumple X').",
              "Discutir cómo usar SSS (Shamir Secret Sharing) para permitir que un dato se 'olvide' repartiéndolo en fragmentos insuficientes.",
            ],
            outcome:
              "El autor tiene prueba matemática de que, a tal fecha y hora, ya poseía la obra. Frente a una infracción de derechos de autor seis meses después, esa prueba es casi irrebatible ante un juez colombiano.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: ¿un smart contract es un 'escrito' según la Ley 527?",
          duration: "20 min",
          purpose:
            "Tensionar la equivalencia funcional hasta sus límites conceptuales.",
        },
      ],
      dialogue: [
        {
          audience: "abogado",
          question:
            "La ley colombiana exige que ciertos contratos consten por escrito. ¿Un smart contract cuyo código fuente está en Solidity es un 'escrito' según la Ley 527?",
          insight:
            "Argumentable por equivalencia funcional (art. 6 Ley 527). Pero faltan cláusulas de interpretación, jurisdicción y resolución de disputas que el código por sí solo no contempla. Recomendable: contrato legal que incorpora el smart contract como anexo ejecutable.",
        },
        {
          audience: "developer",
          question:
            "Si hay un bug en el código del smart contract y se transfieren $1 millón por error, ¿es técnicamente reversible? ¿Es legalmente deseable que lo sea?",
        },
        {
          audience: "todos",
          question:
            "Un artista colombiano acuña un NFT de su obra. Otra persona lo replica en otra cadena y lo vende en Dubái. ¿A qué jurisdicción corresponde el litigio? ¿La Decisión Andina 351 alcanza hasta ahí?",
        },
      ],
      dilemma: {
        scenario:
          "Una compositora colombiana firma un NFT de su canción inédita en Ethereum el 3 de febrero. El 15 de julio, una productora en Dubái lanza el mismo tema con otro nombre y lo distribuye por Spotify, Apple Music y TikTok. Ella tiene el sello de tiempo; ellos tienen distribución global.",
        constraint:
          "La compositora no tiene $200 millones para un litigio internacional. Spotify pide 'sentencia en firme' para bajar el contenido. TikTok aplica su propia política. La Decisión Andina 351 rige pero su fuerza se evapora fuera del bloque.",
        options: [
          {
            label: "A",
            title:
              "Litigio en Colombia por infracción de derechos de autor y solicitud de medidas cautelares con el NFT como prueba.",
            legalRisk:
              "Competencia territorial disputable porque la demandada está en Dubái. Ejecución en terceros países depende de tratados y exhortos.",
            technicalRisk:
              "Costo de peritos y traducciones: $20–40 millones. Tiempo: 18–36 meses. Riesgo de que la sentencia no se ejecute fuera.",
          },
          {
            label: "B",
            title:
              "Campaña extrajudicial: notificar DMCA a Spotify/Apple/TikTok con el certificado blockchain.",
            legalRisk:
              "La DMCA no es colombiana, pero las plataformas la aceptan. La respuesta es rápida pero no garantiza bajada definitiva.",
            technicalRisk:
              "Costo: $3–8 millones en asesoría. Tiempo: 2–6 semanas. Las plataformas pueden reinstaurar si la contraparte apela.",
          },
          {
            label: "C",
            title:
              "Negociación directa con la productora de Dubái proponiendo licencia retroactiva y regalías.",
            legalRisk:
              "Posible riesgo reputacional si se sabe que 'transó' sin pleito. Exige confidencialidad bien escrita.",
            technicalRisk:
              "Costo bajo. Tiempo: 1–3 meses. Resultado dependiente del apetito comercial de la contraparte.",
          },
        ],
        forcedQuestion:
          "¿Qué combinación de acciones recomienda, en qué orden y con qué presupuesto para que la compositora recupere control sobre su obra sin quebrarse financieramente?",
        synthesisHint:
          "La síntesis profesional casi siempre es B + C en paralelo, dejando A como carta de negociación. El NFT no gana el pleito solo; gana la palanca.",
        deliverable:
          "Plan de acción de 2 páginas: acciones por plataforma, costos, tiempos, texto de notificación DMCA y carta inicial de negociación.",
      },
      humanFocus:
        "Un compositor de música popular del Caribe sella su canción en blockchain el 15 de marzo. Seis meses después, una productora internacional la usa sin permiso. Gracias al sello de tiempo, tiene prueba de preconstitución verificable. La tecnología le dio al creador independiente una herramienta de defensa que antes solo tenían las multinacionales con abogados a sueldo.",
    },
  },
  {
    id: 8,
    slug: "marcas-consumidor-habeas-data",
    title: "Marcas, Consumidor Digital y Habeas Data",
    subtitle: "Derechos en la Economía Digital",
    description:
      "Domina las normativas de protección de marcas, derechos del consumidor digital y habeas data financiero que son pilares para construir soluciones LegalTech responsables y confiables.",
    icon: "tag",
    color: "#9D174D",
    bgGradient: "from-rose-800 to-pink-600",
    objectives: [
      "Identificar normativas clave en protección de marcas, consumidores y datos financieros",
      "Analizar la diferenciación estadística de marcas en LegalTech",
      "Comprender la responsabilidad de plataformas digitales",
      "Aplicar buenas prácticas para soluciones tecnológicas legales y seguras",
    ],
    concepts: [
      { term: "Decisión 486 CAN", definition: "Norma andina que regula la protección de marcas y propiedad industrial en Colombia y la región." },
      { term: "Ley 1480/2011", definition: "Estatuto del Consumidor que protege los derechos de los consumidores, especialmente en entornos digitales." },
      { term: "Ley 1266/2008", definition: "Regula el manejo y protección de datos crediticios y financieros (habeas data financiero)." },
      { term: "Habeas data financiero", definition: "Derecho de toda persona a conocer, actualizar y rectificar su información financiera y crediticia." },
      { term: "Diferenciación estadística de marcas", definition: "Uso de modelos matemáticos para distinguir marcas y detectar posibles infracciones en plataformas digitales." },
    ],
    timeline: [
      { year: "2000", title: "Decisión 486 CAN", description: "Esta norma regional estableció procedimientos claros para el registro y defensa de marcas en Colombia y países andinos." },
      { year: "2008", title: "Ley 1266/2008 – Habeas Data Financiero", description: "Por primera vez, se reguló el tratamiento de datos crediticios y financieros, otorgando derechos a los titulares." },
      { year: "2011", title: "Ley 1480/2011 – Estatuto del Consumidor", description: "Esta ley modernizó la protección de los consumidores, incluyendo derechos en compras digitales y comercio electrónico." },
      { year: "2020-2024", title: "Desafíos regulatorios en la era digital", description: "El auge de LegalTech y la digitalización han exigido nuevas estrategias regulatorias y tecnológicas para la protección de marcas y datos." },
    ],
    process: [
      { step: 1, title: "Identificar riesgos legales y normativos", description: "Analiza los riesgos asociados a marcas, consumidores y datos financieros según la normativa vigente." },
      { step: 2, title: "Integrar vigilancia automatizada de marcas", description: "Implementa modelos estadísticos y algoritmos para monitorear registros y detectar posibles infracciones." },
      { step: 3, title: "Incorporar flujos de atención al consumidor", description: "Diseña canales digitales de reclamación y respuesta conforme a la Ley 1480/2011." },
      { step: 4, title: "Gestionar datos financieros responsablemente", description: "Aplica políticas y herramientas para el manejo seguro de datos, cumpliendo la Ley 1266/2008." },
      { step: 5, title: "Documentar procesos y responsabilidades", description: "Registra los procedimientos, roles y obligaciones de la plataforma ante marcas, usuarios y autoridades." },
      { step: 6, title: "Actualizar según cambios regulatorios", description: "Mantente al día con reformas legales y adapta la solución para asegurar cumplimiento continuo." },
    ],
    challenges: [
      { title: "Riesgos de infracción de marca", description: "La copia o uso indebido de marcas puede generar demandas, sanciones económicas y pérdida de reputación.", type: "risk" },
      { title: "Desafíos en la protección del consumidor digital", description: "Muchos usuarios desconocen sus derechos o encuentran barreras para reclamar, debilitando la protección legal.", type: "challenge" },
      { title: "Vulnerabilidades en el manejo de datos financieros", description: "La filtración o mal manejo de datos financieros puede acarrear sanciones regulatorias y pérdida de confianza.", type: "risk" },
      { title: "Responsabilidad de las plataformas", description: "Las plataformas que no cumplen con sus obligaciones pueden enfrentar sanciones, demandas colectivas y daños reputacionales.", type: "challenge" },
      { title: "Vigilancia estadística de marcas", description: "La aplicación de modelos matemáticos para detectar infracciones permite una defensa automatizada y proactiva de las marcas.", type: "practice" },
    ],
    mindMap: {
      id: "root",
      label: "Protección Digital",
      color: "#9D174D",
      children: [
        {
          id: "brands",
          label: "Marcas",
          color: "#BE185D",
          children: [
            { id: "decision486", label: "Decisión 486 CAN", color: "#F9A8D4" },
            { id: "stats-marks", label: "Diferenciación Estadística", color: "#F9A8D4" },
            { id: "vigilance", label: "Vigilancia Automatizada", color: "#F9A8D4" },
          ],
        },
        {
          id: "consumer",
          label: "Consumidor Digital",
          color: "#1E3A8A",
          children: [
            { id: "l1480", label: "Ley 1480/2011", color: "#3B82F6" },
            { id: "ecommerce", label: "E-commerce", color: "#3B82F6" },
            { id: "claims", label: "Mecanismos de Reclamación", color: "#3B82F6" },
          ],
        },
        {
          id: "habeas",
          label: "Habeas Data",
          color: "#8B5CF6",
          children: [
            { id: "l1266", label: "Ley 1266/2008", color: "#A78BFA" },
            { id: "fintech", label: "Fintech", color: "#A78BFA" },
            { id: "arco", label: "Derechos ARCO", color: "#A78BFA" },
          ],
        },
      ],
    },
    quote: "La protección efectiva de marcas, consumidores y datos financieros es fundamental para generar confianza en la economía digital.",
    tags: ["Marcas", "Consumidor", "Habeas Data", "Fintech"],
    riskTier: "tier-1",
    competencies: [
      {
        role: "star",
        title: "Responder una solicitud de rectificación habeas data dentro de plazo",
        definition:
          "Diseñar el flujo completo (recepción, validación, corrección, notificación al usuario y a centrales de riesgo) para cumplir los plazos de la Ley 1266/2008 y Ley 1581/2012.",
        evidence:
          "Flujo documentado con tiempos, responsables y piezas de comunicación listas.",
        metric: {
          before:
            "Responde por correo cuando puede, sin trazabilidad.",
          after:
            "Responde en ≤10 días hábiles con cadena de tickets auditable.",
        },
      },
      {
        role: "support",
        title: "Redactar un PQRS digital que cumpla la Ley 1480/2011",
        definition:
          "Diseñar la interfaz y el texto del canal PQRS (petición, queja, reclamo) de una plataforma digital, con tiempos de respuesta claros y escalamiento automático.",
        evidence:
          "Wireframe + copia legal + SLAs escritos.",
        metric: {
          before:
            "Formulario genérico sin tiempos declarados.",
          after:
            "Interfaz con plazo visible (15 días hábiles), tipificación y escalamiento.",
        },
      },
      {
        role: "support",
        title: "Vigilar registro de marcas con alertas automatizadas",
        definition:
          "Configurar monitoreo sobre la base de datos SIPI (SIC) o WIPO para detectar solicitudes similares a una marca propia y preparar oposición.",
        evidence:
          "Panel de alertas con reglas de coincidencia fonética y visual activas.",
        metric: {
          before:
            "Se entera de infracciones cuando el cliente llama.",
          after:
            "Recibe alerta dentro de los 3 días posteriores a la publicación en SIPI.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "Tus datos ya no te pertenecen solo a ti: son un activo de riesgo compartido con quien los custodia. El cambio que instauró la Ley 1266/2008 es político, no técnico: el habeas data es un botón de reset que la ley le entregó al ciudadano. Pero ese botón solo funciona si la arquitectura técnica del reportador lo respeta con sinceridad.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Ver los datos financieros como un bien jurídico que se comparte por necesidad, no como propiedad absoluta del ciudadano.",
          beats: [
            "Ley 1266/2008 (habeas data financiero): derecho a conocer, actualizar y rectificar.",
            "Ley 1581/2012 (régimen general de datos): consentimiento, finalidad, derechos ARCO.",
            "Ley 1480/2011 (estatuto del consumidor): protección reforzada en comercio electrónico.",
            "Decisión 486 CAN: marcas como activo digital con vigilancia algorítmica posible.",
          ],
          analogy: {
            title: "Las copias de tus llaves",
            metaphor:
              "Cada vez que das tus datos a un banco, una fintech o una app, dejas una copia de las llaves de tu casa. No puedes llevarte las llaves, pero tienes derecho a saber quién las tiene, por qué y a exigir que las tiren cuando termine la razón para guardarlas.",
            bridge:
              "Ese derecho es habeas data. Y el 'botón de rectificación' de una app fintech es la expresión técnica concreta de ese derecho constitucional.",
          },
        },
        {
          act: "II",
          title: "Ejecución: construir el botón de reset",
          duration: "25–30 min",
          purpose:
            "Traducir un derecho constitucional en tres llamadas de API auditables.",
          demo: {
            tool: "Backend Node.js / Django · BD con réplicas · Integración con centrales de riesgo",
            steps: [
              "El usuario se autentica con doble factor (prueba que es él).",
              "Presiona el botón 'Solicitar rectificación' — la app registra fecha, hora, dispositivo y IP.",
              "Se dispara un ticket automático al área legal con el payload firmado (hash + timestamp).",
              "Simultáneamente, se envía una señal de 'congelamiento' a centrales de riesgo (DataCrédito, Cifin) para que el dato controvertido no circule mientras se resuelve.",
              "Se programa una respuesta al usuario dentro de los plazos de la Ley 1266 (10 días hábiles para respuesta, 15 para solución).",
            ],
            outcome:
              "Un derecho constitucional abstracto ('habeas data') se convierte en un flujo de código replicable, auditable y reportable ante la SIC. Eso es LegalTech de verdad.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: plazos legales vs tiempos técnicos",
          duration: "20 min",
          purpose:
            "Enfrentar al equipo con la tensión real entre la obligación legal y la realidad de la infraestructura.",
        },
      ],
      dialogue: [
        {
          audience: "abogado",
          question:
            "Un usuario pide borrar su dato malo. La Ley 1266 te da 10 días para responder y 15 para corregir. Si tu base de datos replica ese dato en 3 servidores espejo y el borrado propagado toma 15 días por temas de backup, ¿estás incumpliendo o es un 'impedimento técnico justificado'?",
          insight:
            "La SIC viene interpretando que la complejidad técnica no exime: obliga a rediseñar. Pero un plan documentado de remediación puede atenuar. Esto es precisamente donde el abogado y el developer deben hablar diario.",
        },
        {
          audience: "developer",
          question:
            "¿Cómo demuestras ante la SIC que el dato realmente fue borrado y no solo marcado como 'eliminado' en un soft delete? (Hash antes/después, logs de purga, certificación de destrucción de backups).",
        },
        {
          audience: "todos",
          question:
            "Un banco reporta a un cliente como moroso por un error interno. El cliente pierde un crédito para su vivienda. ¿Qué remedio real tiene: tutela, denuncia ante la SIC, proceso civil? ¿Cuál reparación llega antes?",
        },
      ],
      dilemma: {
        scenario:
          "Un usuario de una fintech solicita por escrito la eliminación total de sus datos personales tras cerrar su cuenta. La fintech los necesita por 10 años por Circular SFC 050/2017 (SARLAFT). Además, el dato vive replicado en 3 centrales de riesgo y en backups con política de retención de 90 días.",
        constraint:
          "Ley 1581/2012 obliga a atender la solicitud en 15 días. SARLAFT obliga a conservar por 10 años. Los backups no son borrables selectivamente sin romper la copia completa.",
        options: [
          {
            label: "A",
            title:
              "Borrar todo lo borrable y explicar al usuario por qué una parte se conserva por obligación legal.",
            legalRisk:
              "Bajo si se motiva bien la respuesta citando Circular SFC 050/2017 y art. 11 Ley 1266. Alto si el usuario interpreta la respuesta como evasiva.",
            technicalRisk:
              "Requiere proceso de 'anonimización lógica' (borrar identificadores directos y cifrar identificadores indirectos).",
          },
          {
            label: "B",
            title: "Borrar todo inmediatamente para cumplir con el usuario.",
            legalRisk:
              "Alto. Incumple Circular SFC 050/2017 (SARLAFT) y destruye evidencia que puede ser requerida por autoridad. Sanciones a la fintech.",
            technicalRisk:
              "Requiere reconstruir backups posteriores. Posible pérdida irreversible de trazabilidad.",
          },
          {
            label: "C",
            title:
              "Proponer al usuario un 'congelamiento' de datos: no se borran pero quedan inaccesibles para marketing/scoring y solo visibles por obligación legal.",
            legalRisk:
              "Bajo. Compatible con ambas normas y transparente con el usuario.",
            technicalRisk:
              "Requiere flag 'frozen' en BD y purga automática a los 10 años. Implementación: 2–3 semanas.",
          },
        ],
        forcedQuestion:
          "¿Qué respuesta envía al usuario en los 15 días y qué arquitectura despliega para que esta solicitud y las próximas 1.000 no colapsen al equipo de cumplimiento?",
        synthesisHint:
          "La síntesis profesional suele ser A + C: anonimización lógica inmediata + congelamiento formal + purga automática al vencerse la retención legal. B es el camino rápido que termina en sanción.",
        deliverable:
          "Respuesta de 1 página al usuario (con norma citada) y diseño técnico de 1 página para el equipo de desarrollo.",
      },
      humanFocus:
        "Un comerciante informal queda reportado por error en una central de riesgo. Pierde un crédito agropecuario por $50 millones. La Ley 1266 le da derechos, pero la carga de probar el error suele recaer sobre él. Una buena arquitectura LegalTech acorta ese calvario de meses a horas: ahí la tecnología cumple de verdad con el mandato constitucional.",
    },
  },
  {
    id: 9,
    slug: "habeas-data-proteccion-datos",
    title: "Habeas Data y Protección de Datos Personales",
    subtitle: "El derecho fundamental que atraviesa todo el LegalTech",
    description:
      "Un dato personal mal tratado no es un error técnico: es una violación a un derecho fundamental con nombre propio en el artículo 15 de la Constitución. Este módulo profundiza en la arquitectura normativa colombiana del habeas data (Ley 1266, Ley 1581, Decreto 1377, Ley 2300, Ley 1712, Ley 1341 y Decreto 338) y enseña a diseñar, auditar y defender el tratamiento de datos en productos LegalTech cuando la SIC toca la puerta.",
    icon: "lock",
    color: "#7C2D12",
    bgGradient: "from-orange-900 to-red-900",
    objectives: [
      "Distinguir el habeas data financiero (Ley 1266/2008) del régimen general de protección de datos (Ley 1581/2012) y aplicar cada uno al caso correcto",
      "Diseñar avisos de privacidad, políticas de tratamiento y flujos de consentimiento informado que cumplan el Decreto 1377/2013",
      "Implementar el derecho a la desconexión y el rechazo a contactos comerciales intrusivos bajo la Ley 2300/2023 en soluciones LegalTech de contacto masivo",
      "Navegar la tensión entre transparencia activa (Ley 1712/2014) y protección de datos personales cuando un LegalTech trabaja con entidades públicas",
      "Armonizar la Ley 1341/2009 y el Decreto 338/2022 con la Circular SIC 002/2024 en proyectos de IA que tratan datos personales a escala",
    ],
    concepts: [
      { term: "Habeas data", definition: "Derecho fundamental del titular a conocer, actualizar, rectificar, suprimir y oponerse al tratamiento de sus datos personales. Consagrado en el art. 15 de la Constitución y desarrollado por las leyes 1266 y 1581." },
      { term: "Dato personal", definition: "Cualquier información vinculada o asociable a una persona natural determinada o determinable. Incluye cédula, correo, huella digital, historial crediticio, coordenadas GPS, voz, rostro y patrones de comportamiento." },
      { term: "Dato sensible", definition: "Dato que afecta la intimidad o cuyo uso indebido puede generar discriminación: origen racial, orientación sexual, salud, datos biométricos, convicciones religiosas, filiación política. Requieren autorización reforzada." },
      { term: "Dato semiprivado", definition: "Categoría propia de la Ley 1266/2008 para datos financieros, crediticios y comerciales. No es público pero interesa a terceros legítimos (centrales de riesgo, bancos)." },
      { term: "Tratamiento", definition: "Cualquier operación sobre datos personales: recolección, almacenamiento, uso, circulación, supresión. Toda etapa genera responsabilidades." },
      { term: "Responsable del tratamiento", definition: "Persona natural o jurídica que decide sobre la base de datos y el tratamiento. En un LegalTech suele ser el despacho o la empresa cliente." },
      { term: "Encargado del tratamiento", definition: "Persona que realiza el tratamiento por cuenta del responsable. En un LegalTech SaaS, el proveedor es encargado; debe tener contrato de transmisión de datos firmado." },
      { term: "Aviso de privacidad", definition: "Comunicación verbal o escrita al titular sobre las políticas de tratamiento. Obligatoria antes o al momento de la recolección (Decreto 1377/2013)." },
      { term: "Autorización previa, expresa e informada", definition: "Consentimiento libre del titular que cumple tres requisitos concurrentes: anterior al tratamiento, manifestada de forma inequívoca y precedida de información clara. Sin estos tres, no hay tratamiento legítimo." },
      { term: "Principio de finalidad", definition: "Los datos solo pueden usarse para el fin informado al titular. Reutilizarlos para otro fin requiere nueva autorización." },
      { term: "Derecho a la desconexión", definition: "Facultad del titular, consagrada en la Ley 2300/2023, de no ser contactado con fines comerciales en horarios o canales no deseados. Aplica a SMS, WhatsApp, llamadas y correos masivos." },
      { term: "Transparencia activa", definition: "Obligación de las entidades públicas (Ley 1712/2014) de publicar proactivamente información sin esperar solicitud, siempre que no comprometa datos personales protegidos." },
    ],
    timeline: [
      { year: "1991", title: "Constitución Política, art. 15", description: "Consagra el derecho fundamental a la intimidad personal y familiar, al buen nombre y al habeas data. Es la norma madre de todo el régimen colombiano." },
      { year: "2008", title: "Ley 1266/2008", description: "Primera ley estatutaria de habeas data. Regula el dato financiero, crediticio y comercial. Crea el régimen de las centrales de riesgo (Datacrédito, CIFIN)." },
      { year: "2012", title: "Ley 1581/2012", description: "Ley estatutaria general de protección de datos personales. Introduce los principios de finalidad, libertad, veracidad, transparencia, acceso restringido, seguridad y confidencialidad." },
      { year: "2013", title: "Decreto 1377/2013", description: "Reglamenta parcialmente la Ley 1581. Define aviso de privacidad, política de tratamiento, transferencia vs. transmisión, y obligaciones del encargado." },
      { year: "2014", title: "Ley 1712/2014", description: "Ley de transparencia y del derecho de acceso a la información pública. Obliga a publicar activamente información de interés, con excepciones claras cuando haya datos personales." },
      { year: "2022", title: "Decreto 338/2022", description: "Modifica el marco TIC (Ley 1341/2009) ajustando competencias del MinTIC y CRC en la era de datos masivos." },
      { year: "2023", title: "Ley 2300/2023 'Dejen de fregar'", description: "Regula el contacto comercial no solicitado. Prohíbe llamadas y mensajes en horarios y días específicos, y exige consentimiento verificable y mecanismo de desuscripción inmediato." },
      { year: "2024", title: "Circular SIC 002/2024", description: "Endurece el estándar probatorio sobre autorización de datos en sistemas de IA y exige trazabilidad de consentimiento en cada inferencia." },
    ],
    norms: [
      { name: "Constitución art. 15", description: "Consagra el habeas data como derecho fundamental: toda persona tiene derecho a conocer, actualizar y rectificar las informaciones sobre ella en bancos de datos públicos y privados. Es la norma madre del sistema.", scope: "Toda persona natural en Colombia frente a cualquier responsable público o privado que trate sus datos.", impact: "Habilita acción de tutela ante violaciones. Un LegalTech que ignora el habeas data no solo incumple una ley: viola la Constitución." },
      { name: "Ley 1266/2008 — Habeas Data Financiero", description: "Regula específicamente la información comercial, crediticia y financiera. Define términos de permanencia de datos negativos (cuatro años contados desde el pago), derecho de rectificación y régimen de las centrales de riesgo.", scope: "Bancos, cooperativas, centrales de riesgo, empresas que reportan morosidad, LegalTech de scoring crediticio o verificación financiera.", impact: "Un LegalTech de cobranzas o scoring que no respete los plazos de caducidad del dato negativo enfrenta sanciones de SIC hasta 2.000 SMMLV y demandas masivas." },
      { name: "Ley 1581/2012 — Régimen General", description: "Ley estatutaria que aplica a cualquier dato personal no cubierto por el régimen sectorial financiero. Establece principios, derechos del titular, deberes del responsable, categorías especiales (sensibles y de menores) y régimen sancionatorio.", scope: "Cualquier persona natural o jurídica, pública o privada, que trate datos personales de residentes en Colombia.", impact: "Piedra angular del sistema. Un LegalTech que no tiene política de tratamiento pública y actualizada está en infracción desde el primer día." },
      { name: "Decreto 1377/2013", description: "Reglamenta los procedimientos de la Ley 1581: cómo se redacta un aviso de privacidad, qué debe contener una política de tratamiento, cómo se solicita autorización, cómo se documentan las transferencias internacionales, y qué se hace con datos recolectados antes del 27 de junio de 2013.", scope: "Responsables y encargados del tratamiento.", impact: "Es el manual operativo. Un auditor de la SIC abre una investigación y lo primero que pide es el aviso y la política conforme al Decreto 1377." },
      { name: "Ley 1712/2014 — Transparencia Pública", description: "Impone a entidades públicas y privadas que ejercen función pública publicar proactivamente información: contratos, presupuestos, decisiones, datos abiertos. Establece excepciones cuando el acceso comprometa datos personales protegidos o la seguridad nacional.", scope: "Entidades estatales, contratistas del Estado y LegalTech que operan con datos públicos.", impact: "Un LegalTech de inteligencia jurimétrica puede explotar datos abiertos legalmente; pero si cruza datos públicos con personales para re-identificar, incumple la Ley 1581." },
      { name: "Ley 1341/2009 — Marco TIC", description: "Define principios del sector TIC: neutralidad tecnológica, libre competencia, uso eficiente del espectro, protección al usuario. Creó la Comisión de Regulación de Comunicaciones (CRC) y asigna competencias al MinTIC.", scope: "Operadores de telecomunicaciones, prestadores de servicios digitales, LegalTech que hacen parte de la cadena TIC.", impact: "Es el marco habilitante del ecosistema digital. Fija competencias regulatorias y exige neutralidad tecnológica en las políticas públicas de transformación digital." },
      { name: "Decreto 338/2022", description: "Modifica el Decreto 1078 de 2015 (Único Reglamentario TIC). Ajusta competencias de la CRC y el MinTIC en materia de servicios digitales, datos masivos y protección al usuario de servicios de comunicaciones.", scope: "Operadores TIC, proveedores de servicios digitales y LegalTech de alto volumen de datos personales.", impact: "Moderniza el andamiaje regulatorio TIC para la era de IA, cloud y big data. Un LegalTech que opera como plataforma de comunicación debe revisar sus obligaciones bajo este decreto." },
      { name: "Ley 2300/2023 — 'Dejen de Fregar'", description: "Prohíbe el contacto comercial no solicitado fuera de ciertos horarios (lunes a sábado, 7 a.m. a 7 p.m.), exige consentimiento específico por canal (SMS, WhatsApp, llamada, correo), y obliga a un mecanismo de desuscripción inmediato en cada comunicación.", scope: "Empresas que hacen contacto comercial masivo, centros de llamadas, LegalTech de cobranzas y de marketing jurídico.", impact: "Multas de hasta 1.000 SMMLV por comunicación no autorizada. Un LegalTech de recordatorios judiciales que envía por WhatsApp fuera de horario o sin autorización expresa específica para ese canal, está en infracción." },
    ],
    process: [
      { step: 1, title: "Clasificar el dato", description: "Antes de cualquier tratamiento, clasifica: ¿es dato público, semiprivado, privado o sensible? ¿Financiero (Ley 1266) o general (Ley 1581)? ¿De menor de edad? Esta clasificación determina toda la arquitectura jurídica." },
      { step: 2, title: "Diseñar el aviso de privacidad", description: "Redacta un aviso breve, claro y en lenguaje sencillo: quién recolecta, qué dato, con qué finalidad, por cuánto tiempo, a quién se transfiere, cómo ejerce derechos el titular. Conforme Decreto 1377 art. 14." },
      { step: 3, title: "Obtener autorización previa, expresa e informada", description: "Implementa consentimiento granular por finalidad. Un checkbox global no cumple. Si hay datos sensibles o de menores, el consentimiento debe reforzarse. Guarda prueba verificable del momento y contenido del consentimiento." },
      { step: 4, title: "Redactar y publicar la política de tratamiento", description: "Documento público y auditable con: identificación del responsable, tratamientos previstos, derechos del titular, canal de atención de consultas y reclamos, procedimiento de ejercicio de derechos (máximo 10 días hábiles). Actualizada y fechada." },
      { step: 5, title: "Implementar seguridad proporcional al riesgo", description: "Cifrado en reposo y en tránsito, control de acceso por perfiles, pseudonimización cuando sea posible, logs inmutables, plan de respuesta a incidentes. El estándar no es 'seguridad absoluta'; es 'seguridad razonable al tipo de dato'." },
      { step: 6, title: "Firmar contrato de transmisión con cada encargado", description: "Si un proveedor externo (hosting, analítica, IA) procesa datos, debe firmarse contrato de transmisión con obligaciones equivalentes (Decreto 1377 art. 25). Sin este contrato, el responsable asume todo el riesgo." },
      { step: 7, title: "Atender peticiones de habeas data en 10/15 días hábiles", description: "Consultas: 10 días hábiles prorrogables 5 más. Reclamos: 15 días hábiles prorrogables 8 más. Todo por escrito y con trazabilidad. Un LegalTech que ignora una petición habilita la acción de tutela." },
      { step: 8, title: "Reportar incidentes a la SIC", description: "Ante cualquier vulneración que afecte los datos, se debe notificar a la SIC y, si hay riesgo alto, a los titulares. Guarda el expediente del incidente: detección, contención, análisis, notificación, remediación." },
    ],
    challenges: [
      { title: "Confundir Ley 1266 con Ley 1581", description: "Son leyes complementarias pero distintas. La 1266 es sectorial (financiero-crediticio); la 1581 es general. Un LegalTech que trata scoring crediticio se rige por ambas. Aplicar mal el régimen lleva a sanciones inmediatas.", type: "challenge" },
      { title: "Autorización 'por defecto' o enterrada", description: "Un checkbox premarcado, un consentimiento escondido en términos y condiciones extensos, o un 'al continuar usted acepta' no cumplen el estándar de autorización previa, expresa e informada. La SIC sanciona estos patrones oscuros (dark patterns) como tratamientos ilegítimos.", type: "risk" },
      { title: "Ignorar la Ley 2300 en recordatorios judiciales", description: "Muchos LegalTech envían citaciones y recordatorios por WhatsApp sin autorización específica por canal. La Ley 2300 exige autorización por canal y prohíbe horarios no hábiles. Un recordatorio útil puede convertirse en sanción.", type: "risk" },
      { title: "Tratamiento de datos de menores", description: "Requiere autorización del representante legal y solo cuando el tratamiento responde al interés superior del menor. Un LegalTech educativo o familiar debe reforzar mecanismos de verificación de edad y consentimiento parental.", type: "challenge" },
      { title: "Transferencia internacional de datos", description: "Enviar datos a países sin nivel adecuado de protección (declarado por la SIC) exige cláusulas contractuales específicas o consentimiento expreso para esa transferencia. Cloud con servidores fuera de Colombia: revisar siempre.", type: "challenge" },
      { title: "Auditoría y cultura organizacional", description: "El compliance de datos no es un PDF firmado una vez: es un ritual anual con registro de tratamientos, capacitación, simulacros de incidentes y revisión normativa. Las organizaciones que lo reducen a 'poner el aviso' pierden cuando llega la SIC.", type: "practice" },
    ],
    metrics: [
      { label: "Plazo de respuesta a consultas", value: "≤ 10 días hábiles", description: "Tiempo máximo para responder consultas del titular (Ley 1581, art. 14). Prorrogable 5 días más con justificación documentada.", color: "emerald" },
      { label: "Plazo de respuesta a reclamos", value: "≤ 15 días hábiles", description: "Tiempo máximo para resolver reclamos (Ley 1581, art. 15). Prorrogable 8 días más. Superarlo habilita queja ante la SIC.", color: "amber" },
      { label: "Sanción máxima SIC", value: "2.000 SMMLV", description: "Multa máxima por infracción grave al régimen de datos personales (Ley 1581, art. 23). Más de 2.600 millones COP en 2026.", color: "rose" },
      { label: "Horario permitido Ley 2300", value: "Lun–Sáb 7–19", description: "Ventana horaria permitida para contacto comercial por voz o mensaje. Fuera de ella el contacto requiere autorización expresa reforzada.", color: "sky" },
    ],
    mindMap: {
      id: "root",
      label: "Habeas Data Colombia",
      color: "#7C2D12",
      children: [
        {
          id: "constitucional",
          label: "Fundamento Constitucional",
          color: "#9A3412",
          children: [
            { id: "art15", label: "Art. 15 C.P.", color: "#C2410C" },
            { id: "tutela", label: "Acción de Tutela", color: "#C2410C" },
          ],
        },
        {
          id: "regimenes",
          label: "Dos Regímenes",
          color: "#B91C1C",
          children: [
            { id: "l1266", label: "Ley 1266 · Financiero", color: "#DC2626" },
            { id: "l1581", label: "Ley 1581 · General", color: "#DC2626" },
            { id: "d1377", label: "Decreto 1377", color: "#DC2626" },
          ],
        },
        {
          id: "derechos",
          label: "Derechos del Titular",
          color: "#7E22CE",
          children: [
            { id: "conocer", label: "Conocer", color: "#A855F7" },
            { id: "actualizar", label: "Actualizar", color: "#A855F7" },
            { id: "rectificar", label: "Rectificar", color: "#A855F7" },
            { id: "suprimir", label: "Suprimir", color: "#A855F7" },
            { id: "desconexion", label: "Desconexión · Ley 2300", color: "#A855F7" },
          ],
        },
        {
          id: "marco-tic",
          label: "Marco TIC y Transparencia",
          color: "#0E7490",
          children: [
            { id: "l1341", label: "Ley 1341", color: "#0891B2" },
            { id: "d338", label: "Decreto 338/2022", color: "#0891B2" },
            { id: "l1712", label: "Ley 1712 · Transparencia", color: "#0891B2" },
          ],
        },
        {
          id: "sanciones",
          label: "Autoridad y Sanciones",
          color: "#D97706",
          children: [
            { id: "sic", label: "SIC", color: "#F59E0B" },
            { id: "circ002", label: "Circular 002/2024", color: "#F59E0B" },
            { id: "multa", label: "Hasta 2.000 SMMLV", color: "#F59E0B" },
          ],
        },
      ],
    },
    quote:
      "El habeas data no es una casilla que se marca: es un derecho fundamental que se respeta. Cada dato personal es la huella de una persona con historia, vulnerabilidades y esperanzas. Protegerlo no es cumplimiento: es decencia.",
    tags: ["Habeas Data", "Ley 1581", "Ley 1266", "Ley 2300", "Transparencia", "TIC"],
    riskTier: "tier-1",
    competencies: [
      {
        role: "star",
        title: "Diseñar y auditar el expediente de tratamiento de datos de un producto LegalTech",
        definition:
          "Construir un paquete completo y auditable: aviso de privacidad, política de tratamiento, registro de bases de datos ante la SIC, contratos de transmisión con cada encargado, matriz de autorizaciones por finalidad y canal, plan de respuesta a incidentes.",
        evidence:
          "Carpeta con los 6 documentos, fechados, firmados y publicados, más un informe de brecha frente a la Ley 1581 y el Decreto 1377.",
        metric: {
          before: "Tiene 'términos y condiciones' genéricos copiados de internet.",
          after: "Tiene expediente de tratamiento armonizado con Ley 1266, Ley 1581 y Circular SIC 002, auditable en menos de una hora.",
        },
      },
      {
        role: "support",
        title: "Resolver una petición de habeas data en tiempo y forma",
        definition:
          "Recibir una consulta, reclamo o solicitud de supresión, clasificarla correctamente, instruir al equipo, entregar respuesta escrita y documentada dentro de los plazos legales y con cita normativa por cada decisión.",
        evidence:
          "Tres peticiones simuladas resueltas: una consulta (10 días), un reclamo (15 días) y una revocatoria de autorización con supresión de dato.",
        metric: {
          before: "Responde 'vamos a revisar' sin plazo ni norma.",
          after: "Cita Ley 1581 art. 14 o 15 según el caso, fija plazo y entrega respuesta motivada.",
        },
      },
      {
        role: "support",
        title: "Detectar y remediar un incumplimiento de la Ley 2300 en canales digitales",
        definition:
          "Revisar los flujos de comunicación de un LegalTech (WhatsApp, SMS, correo, llamada) e identificar dónde falta autorización por canal, dónde se excede el horario permitido, dónde falla el mecanismo de desuscripción. Proponer remediación.",
        evidence:
          "Auditoría de un canal real con hallazgos, citas a la Ley 2300/2023 y plan de corrección en 30 días.",
        metric: {
          before: "Envía recordatorios por WhatsApp 'porque así lo hacen todos'.",
          after: "Diferencia autorización global de autorización por canal y ajusta horarios y mecanismos de opt-out.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "El cambio profundo de este módulo es pasar del dato como recurso a explotar al dato como huella de una persona concreta que confió. Un correo, una cédula o un patrón de comportamiento no son filas en una base de datos: son fragmentos de la vida privada de alguien que, en el fondo, no eligió libremente dártelos, eligió entre darlos o no acceder al servicio. El habeas data es la forma jurídica de reconocer esa asimetría y devolverle al titular cierto control sobre su propia historia digital.",
      acts: [
        {
          act: "I",
          title: "Fundamento: el dato es una persona",
          duration: "20–25 min",
          purpose:
            "Desmontar la idea de que los datos son 'materia prima neutra' y anclar la conversación en el art. 15 de la Constitución: detrás de cada dato hay un derecho fundamental.",
          beats: [
            "El dato personal como extensión digital de la persona (art. 15 C.P.).",
            "Clasificación práctica: público, semiprivado, privado, sensible. Caso de menor.",
            "Dos regímenes que conviven: financiero (Ley 1266) y general (Ley 1581).",
            "El Decreto 1377 como manual operativo: aviso, política, autorización, transmisión.",
          ],
          analogy: {
            title: "El expediente médico",
            metaphor:
              "Los datos personales se parecen al expediente médico: el paciente confía información íntima al médico bajo el entendido de que se use solo para sanarlo. Si mañana la clínica vende el expediente a una aseguradora, no importa que sea legal en apariencia: rompió la confianza. El habeas data es la ley que protege esa confianza cuando el médico es un LegalTech.",
            bridge:
              "Este acto cierra con el principio de finalidad: los datos recolectados para una cosa no pueden usarse para otra sin nuevo consentimiento. Ese principio es el corazón operativo de toda la Ley 1581.",
          },
        },
        {
          act: "II",
          title: "Ejecución: auditoría cruzada de un LegalTech real",
          duration: "30–35 min",
          purpose:
            "Aplicar el régimen completo a un producto LegalTech y detectar, en tiempo real, las brechas de cumplimiento bajo las 8 normas del módulo.",
          demo: {
            tool: "Simulación: LegalTech de cobranza extrajudicial que envía recordatorios de deuda por WhatsApp y SMS, con scoring crediticio propio.",
            steps: [
              "Grupo 1 — Ley 1581 y Decreto 1377: revisa aviso de privacidad, política de tratamiento, autorización y registro de bases ante la SIC.",
              "Grupo 2 — Ley 1266: revisa manejo del dato financiero, plazos de permanencia de mora, derechos del titular, reporte a centrales de riesgo.",
              "Grupo 3 — Ley 2300: revisa canales de contacto, horarios, autorización por canal, mecanismo de desuscripción en cada mensaje.",
              "Grupo 4 — Ley 1712 + Ley 1341 + Decreto 338: si el LegalTech presta servicios a un municipio, revisa la tensión entre transparencia activa y protección de datos personales.",
              "Puesta en común: cada grupo presenta 3 hallazgos con norma citada y plan de remediación.",
            ],
            outcome:
              "El grupo descubre que un solo producto puede estar bajo 8 regímenes simultáneos y que 'el legal' no es una casilla; es la arquitectura del producto. Se elabora una matriz unificada de cumplimiento con semáforo de riesgo.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: cuando el titular pide supresión y el negocio se opone",
          duration: "20 min",
          purpose:
            "Consolidar la idea de que el habeas data es innegociable: un derecho fundamental no se compensa con valor comercial del dato.",
        },
      ],
      dialogue: [
        {
          audience: "todos",
          question:
            "Si un cliente pide suprimir todos sus datos y eso implica que el LegalTech pierda funcionalidad o evidencia para un juicio en curso, ¿prima la supresión o la conservación?",
          insight:
            "La Ley 1581 art. 9 impone el deber de supresión salvo que exista obligación legal o contractual que imponga conservación. 'Lo necesitamos para el negocio' no es excepción; 'lo conserva la Ley 906 de procedimiento penal' sí. La justificación debe ser normativa, no comercial.",
        },
        {
          audience: "abogado",
          question:
            "¿Puedes citar un proceso judicial donde el dato personal del cliente se convierta en prueba en su contra, cómo se armoniza con la autorización otorgada para 'prestar servicios legales'?",
        },
        {
          audience: "developer",
          question:
            "¿Tu producto diferencia autorización por finalidad y por canal, o recolecta un checkbox único al registro? ¿Podrías demostrar, dato por dato, bajo qué autorización específica se está tratando hoy?",
        },
      ],
      dilemma: {
        scenario:
          "Una LegalTech colombiana ofrece scoring jurídico: usa datos públicos (Rama Judicial), datos financieros (central de riesgo) y patrones de comportamiento digital (cookies, redes sociales) para predecir la probabilidad de éxito de una demanda. Una empresa de seguros paga por este scoring para decidir si acepta o no a un cliente. Un consumidor rechazado solicita: (a) saber qué datos se usaron, (b) rectificar, (c) suprimir su perfil.",
        constraint:
          "Parte de los datos son públicos (Ley 1712), parte son financieros (Ley 1266), parte son generales (Ley 1581). El modelo usa inferencias algorítmicas (Circular SIC 002/2024). La empresa de seguros alega que 'el LegalTech es solo proveedor de información, no responsable'. El LegalTech alega que 'es solo agregador de datos ya públicos'.",
        options: [
          {
            label: "A",
            title:
              "Responsabilidad exclusiva del LegalTech: es responsable del tratamiento porque decide la finalidad (scoring jurídico) y los medios (modelo).",
            legalRisk:
              "Tesis sólida bajo Ley 1581 art. 4, pero la empresa de seguros se beneficia sin asumir riesgo proporcional al uso que le da al dato.",
            technicalRisk:
              "Desincentiva mercado de datos legítimos; puede trasladar integralmente el costo de compliance al intermediario tecnológico.",
          },
          {
            label: "B",
            title:
              "Corresponsabilidad: LegalTech y empresa de seguros son co-responsables del tratamiento. Ambos deciden sobre la finalidad efectiva (otorgar o negar seguro).",
            legalRisk:
              "Compatible con Ley 1581, Circular SIC 002/2024 y doctrina europea GDPR. Exige contrato de corresponsabilidad con reparto claro de obligaciones de transparencia e información.",
            technicalRisk:
              "Litigios más complejos, pero reparación integral al titular: ambos responden por la decisión automatizada y ambos deben poder explicarla.",
          },
          {
            label: "C",
            title:
              "Responsabilidad principal de la empresa de seguros: es quien toma la decisión que afecta al titular; el LegalTech es encargado.",
            legalRisk:
              "Argumentable si hay contrato de encargo claro, pero el LegalTech decide inferencias autónomas (el modelo) y eso lo saca de la figura pura de encargado.",
            technicalRisk:
              "Libera al LegalTech de deber explicativo sobre su propio modelo y puede dejar al titular sin interlocutor técnico real.",
          },
        ],
        forcedQuestion:
          "Como Delegado de Protección de Datos (DPO), ¿qué figura aplicas y qué exiges a cada parte para que el titular tenga explicación real de la decisión automatizada y derecho efectivo a la supresión?",
        synthesisHint:
          "La respuesta de frontera es B: corresponsabilidad. Se exige contrato de corresponsabilidad, aviso conjunto al titular, canal único de atención de peticiones, y explicación humana de la decisión automatizada (Circular SIC 002/2024). La supresión se ejecuta en cadena: LegalTech borra el perfil, seguros borra la inferencia, ambos dejan log auditable.",
        deliverable:
          "Modelo de contrato de corresponsabilidad de tres páginas + aviso conjunto al titular + protocolo de ejecución de derechos ARCO en menos de 15 días hábiles.",
      },
      humanFocus:
        "Detrás del 'titular' de la Ley 1581 hay personas concretas: la mamá que no pudo acceder al crédito porque una inferencia algorítmica la marcó como riesgosa; el estudiante al que le llegan SMS de cobranza a las 10 de la noche mientras intenta estudiar; el paciente cuyos datos médicos terminan en un scoring de seguros sin que lo sepa. El habeas data es la herramienta jurídica que le permite a cada una de esas personas mirar de frente al sistema y decir: 'mi historia es mía'. Un LegalTech que entiende esto no cumple la ley: la encarna.",
    },
  },
  {
    id: 10,
    slug: "integracion-practica",
    title: "Integración Práctica",
    subtitle: "Entregables y Herramientas LegalTech",
    description:
      "Consolida todo lo aprendido desarrollando entregables concretos: matrices de riesgos, flujos KYC, dictámenes periciales y validaciones públicas que demuestran competencia LegalTech real.",
    icon: "rocket",
    color: "#1E3A8A",
    bgGradient: "from-slate-800 to-blue-900",
    objectives: [
      "Desarrollar matrices de riesgos y flujos KYC utilizando herramientas digitales y marcos legales",
      "Elaborar dictámenes periciales y analizar casos prácticos con soporte tecnológico",
      "Validar la eficiencia y cumplimiento de soluciones LegalTech",
      "Aplicar mejores prácticas de regulación y documentación en proyectos",
    ],
    concepts: [
      { term: "Matriz de riesgos", definition: "Herramienta que identifica, clasifica y visualiza riesgos legales y tecnológicos en un proyecto LegalTech." },
      { term: "Flujo KYC", definition: "Proceso digital para verificar la identidad de clientes y cumplir con normativas como SARLAFT." },
      { term: "Dictamen pericial", definition: "Informe técnico que analiza evidencia digital y presenta conclusiones fundamentadas para procesos legales." },
      { term: "Validación pública", definition: "Demostración abierta de la utilidad y confiabilidad de una solución ante usuarios y reguladores." },
      { term: "Cumplimiento regulatorio", definition: "Conjunto de acciones y documentos que aseguran que la solución cumple con las leyes y estándares aplicables." },
    ],
    process: [
      { step: 1, title: "Identificar riesgos relevantes", description: "Analiza el contexto del proyecto para detectar riesgos legales (cumplimiento normativo, privacidad) y tecnológicos (seguridad, integridad de datos)." },
      { step: 2, title: "Seleccionar variables clave", description: "Define variables como jurisdicción, tipo de cliente, controles tecnológicos y frecuencia de actualización para evaluar y clasificar los riesgos." },
      { step: 3, title: "Diseñar la matriz de riesgos", description: "Establece una escala de riesgo (bajo, medio, alto) y utiliza colores (verde/ámbar/rojo) para facilitar la interpretación visual." },
      { step: 4, title: "Integrar el flujo KYC", description: "Diseña el proceso de recopilación de datos, verificación de identidad, chequeos SARLAFT y obtención de consentimiento informado." },
      { step: 5, title: "Automatizar reportes y alertas", description: "Utiliza herramientas digitales para generar reportes automáticos y alertas en tiempo real sobre riesgos o incidencias detectadas." },
      { step: 6, title: "Documentar y validar", description: "Registra cada paso y resultado para auditoría. Valida la solución con usuarios finales y ajusta según feedback y cambios regulatorios." },
    ],
    challenges: [
      { title: "Errores frecuentes en matrices de riesgos", description: "Definir mal las variables o no actualizarlas puede llevar a una falsa sensación de seguridad y dificultar la toma de decisiones.", type: "risk" },
      { title: "Desafíos en flujos KYC", description: "La suplantación de identidad y el incumplimiento de SARLAFT son riesgos críticos, junto con la fricción de usuario en procesos complejos.", type: "challenge" },
      { title: "Limitaciones en dictámenes periciales", description: "La falta de evidencia digital robusta o la mala interpretación de métricas estadísticas puede debilitar el dictamen.", type: "challenge" },
      { title: "Buenas prácticas de validación", description: "Realizar pruebas piloto, recoger feedback iterativo y documentar exhaustivamente fortalece la calidad de los entregables.", type: "practice" },
    ],
    metrics: [
      { label: "Riesgo Bajo", value: "Verde", description: "Indica bajo impacto y baja probabilidad. Requiere monitoreo rutinario y controles estándar.", color: "emerald" },
      { label: "Riesgo Medio", value: "Ámbar", description: "Indica impacto o probabilidad moderada. Requiere atención y planes de mitigación específicos.", color: "amber" },
      { label: "Riesgo Alto", value: "Rojo", description: "Indica alto impacto y/o alta probabilidad. Requiere acción inmediata y escalamiento a dirección.", color: "rose" },
      { label: "Completitud KYC", value: "> 95%", description: "Porcentaje de procesos KYC completados satisfactoriamente sin rechazos por documentación incompleta.", color: "sky" },
    ],
    mindMap: {
      id: "root",
      label: "Integración LegalTech",
      color: "#1E3A8A",
      children: [
        {
          id: "deliverables",
          label: "Entregables",
          color: "#2563EB",
          children: [
            { id: "matrix", label: "Matriz de Riesgos", color: "#60A5FA" },
            { id: "kyc-flow", label: "Flujo KYC", color: "#60A5FA" },
            { id: "pericial", label: "Dictamen Pericial", color: "#60A5FA" },
          ],
        },
        {
          id: "validation",
          label: "Validación",
          color: "#10B981",
          children: [
            { id: "public-val", label: "Validación Pública", color: "#34D399" },
            { id: "metrics-val", label: "Métricas", color: "#34D399" },
            { id: "compliance", label: "Cumplimiento", color: "#34D399" },
          ],
        },
        {
          id: "best-practices",
          label: "Mejores Prácticas",
          color: "#8B5CF6",
          children: [
            { id: "docs", label: "Documentación", color: "#A78BFA" },
            { id: "access", label: "Accesibilidad", color: "#A78BFA" },
            { id: "transpar", label: "Transparencia", color: "#A78BFA" },
          ],
        },
      ],
    },
    quote: "Una solución LegalTech eficiente es aquella que combina claridad legal, potencia tecnológica y validación constante por parte de usuarios y reguladores.",
    tags: ["Entregables", "Riesgos", "KYC", "Validación", "Cumplimiento"],
    riskTier: "tier-3",
    competencies: [
      {
        role: "star",
        title: "Entregar una solución LegalTech con expediente de cumplimiento completo",
        definition:
          "Presentar un proyecto LegalTech con: matriz de riesgos, flujo KYC documentado, política SARLAFT, política de datos Ley 1581, cláusula Circular SIC 002, y plan de auditoría anual.",
        evidence:
          "Carpeta de proyecto con los 6 documentos firmados y fechados.",
        metric: {
          before:
            "Presenta el producto técnico y responde preguntas legales cuando aparecen.",
          after:
            "Presenta producto + expediente de cumplimiento listo para auditoría.",
        },
      },
      {
        role: "support",
        title: "Defender el diseño frente a un escenario adverso ('juicio simulado')",
        definition:
          "Sostener en sesión de 20 minutos qué falló, qué controló, qué responsabilidad asume cada actor frente a un caso donde la herramienta LegalTech se equivoca.",
        evidence:
          "Acta de simulacro con asignación de responsabilidad y plan de remediación.",
        metric: {
          before:
            "Se defiende con 'pero el disclaimer decía…'.",
          after:
            "Aplica la Circular SIC 002/2024 y reparte responsabilidad con fundamento.",
        },
      },
      {
        role: "support",
        title: "Comunicar el proyecto al cliente final en lenguaje claro",
        definition:
          "Presentar el proyecto ante un cliente no técnico en 10 minutos: qué hace, qué no hace, qué riesgos asume, qué puede exigir él.",
        evidence:
          "Grabación de presentación con feedback del cliente simulado.",
        metric: {
          before:
            "Usa jerga técnica y legal sin traducir.",
          after:
            "Cliente reformula el proyecto con sus palabras y acepta/rechaza con información.",
        },
      },
    ],
    pedagogy: {
      changeLens:
        "El cambio final es aceptar que en LegalTech la cadena de responsabilidad es tan importante como la cadena de custodia. Cuando una herramienta de IA recomienda mal, la culpa no se disuelve en el código: se distribuye entre el desarrollador que la construyó, el abogado que la usó y la empresa que la comercializó. Este módulo es, ante todo, un ejercicio de responsabilidad colectiva.",
      acts: [
        {
          act: "I",
          title: "Fundamento",
          duration: "15–20 min",
          purpose:
            "Entender que el entregable no es un producto, sino una evidencia de responsabilidad compartida.",
          beats: [
            "Matriz de riesgos: el mapa vivo de lo que puede salir mal y quién lo vigila.",
            "Flujo KYC + SARLAFT: el onboarding como promesa de cumplimiento.",
            "Dictamen pericial: el testigo técnico que sostiene la prueba ante un juez.",
            "Validación pública: la prueba ante pares, usuarios y reguladores.",
          ],
          analogy: {
            title: "El simulacro de incendio",
            metaphor:
              "Un edificio se certifica 'seguro' no porque tenga extintores, sino porque hace simulacros de incendio cada semestre. El LegalTech funciona igual: no se confía en la herramienta, se confía en el equipo que la ensaya una y otra vez.",
            bridge:
              "Una matriz de riesgos sin simulacro es papel. El entregable real del módulo es que el equipo pueda defender su diseño ante un escenario adverso.",
          },
        },
        {
          act: "II",
          title: "Ejecución: el Juicio Simulado de la IA",
          duration: "25–30 min",
          purpose:
            "Distribuir responsabilidad civil, penal y profesional en un caso real donde la IA se equivoca.",
          demo: {
            tool: "Simulación en sala dividida en tres mesas · Circular SIC 002/2024 como norma juez",
            steps: [
              "Caso: una herramienta LegalTech recomendó una liquidación laboral incorrecta. El empleado demanda al desarrollador, al abogado que usó la herramienta y a la empresa de software.",
              "Grupo 1 (Jueces): decide quién responde y en qué proporción, aplicando la Circular SIC 002/2024.",
              "Grupo 2 (Desarrolladores): defiende el código con el argumento 'era un Beta, tenía disclaimer, el usuario debía verificar'.",
              "Grupo 3 (Abogados): defiende su actuación con 'confiamos en tecnología de vanguardia, validada por su proveedor'.",
              "Cierre: lectura colectiva del fallo simulado y matriz final de responsabilidades.",
            ],
            outcome:
              "El grupo descubre, casi sin mediación, que la responsabilidad no se diluye: se reparte. Y que el 'disclaimer' sin supervisión humana no es eximente ante la SIC ni ante el juez laboral.",
          },
        },
        {
          act: "III",
          title: "Dilema y diálogo: la cadena de responsabilidad",
          duration: "20 min",
          purpose:
            "Consolidar la idea-fuerza del curso: cadena de custodia (prueba) + cadena de responsabilidad (actores) = confianza digital.",
        },
      ],
      dialogue: [
        {
          audience: "todos",
          question:
            "Si la IA falla y el abogado confía, ¿puede la 'confianza en la tecnología' ser eximente, o es una negligencia profesional agravada por la Circular SIC 002?",
          insight:
            "La Circular SIC 002/2024 consagra el deber de competencia tecnológica. Confiar a ciegas no es eximente; es la forma moderna de la negligencia profesional.",
        },
        {
          audience: "abogado",
          question:
            "¿Deberías exigir una póliza de responsabilidad civil específica para herramientas LegalTech, tal como la exiges para un paralegal humano? ¿Quién paga el daño al cliente si la IA se equivoca?",
        },
        {
          audience: "developer",
          question:
            "¿Un disclaimer en letra pequeña diluye responsabilidad civil? ¿Qué ocurre si ofreces tu herramienta a abogados que no tienen capacidad técnica para auditarla? (Pista: asimetría informativa = responsabilidad reforzada del proveedor).",
        },
      ],
      dilemma: {
        scenario:
          "Una LegalTech calculó mal la liquidación laboral de un cajero de 38 años: arrojó $47 millones cuando lo correcto era $62 millones. El cajero aceptó, firmó finiquito. Tres meses después descubre el error con otro abogado y demanda al desarrollador de la herramienta, al abogado que la usó y al supermercado empleador.",
        constraint:
          "El finiquito está firmado ante notario. El error estaba en una actualización de tablas del salario mínimo que no se propagó al modelo. El abogado dice que confió en la herramienta. El desarrollador alega disclaimer y versión Beta.",
        options: [
          {
            label: "A",
            title:
              "Responsabilidad exclusiva del abogado: debió auditar el cálculo (deber de competencia tecnológica, Circular SIC 002/2024).",
            legalRisk:
              "Tesis sólida contra el abogado, pero no extingue daño al trabajador si el abogado no tiene patrimonio.",
            technicalRisk:
              "Deja libre al desarrollador y al empleador; incentivo perverso para LegalTech que externaliza riesgo al usuario profesional.",
          },
          {
            label: "B",
            title:
              "Responsabilidad solidaria de los tres: abogado (deber de competencia), desarrollador (deber de calidad), empleador (deber de pagar liquidación correcta).",
            legalRisk:
              "Compatible con art. 2344 CC, art. 10 Ley 1480/2011 y Circular SIC 002/2024. Cada uno responde ante el cajero y entre ellos ajustan cuentas.",
            technicalRisk:
              "Litigio más complejo y costoso, pero reparación al cajero es más probable y rápida.",
          },
          {
            label: "C",
            title:
              "Responsabilidad principal del desarrollador: puso en el mercado una herramienta defectuosa (Ley 1480/2011 art. 6).",
            legalRisk:
              "Argumentable si el cajero es 'consumidor' del producto LegalTech, pero en cadena B2B2C la figura se vuelve discutible.",
            technicalRisk:
              "Desincentiva uso de LegalTech si el proveedor asume todo el riesgo sin importar cómo se use.",
          },
        ],
        forcedQuestion:
          "Siendo el juez que redacta el fallo, ¿qué teoría de responsabilidad aplica y cómo reparte la condena entre los tres demandados?",
        synthesisHint:
          "La síntesis profesional casi siempre es B, con porcentajes: empleador responde por el 100 % al trabajador (principal obligado), y repite internamente contra abogado y desarrollador. La Circular SIC 002/2024 obliga a que el disclaimer no absuelva al profesional con deber de competencia tecnológica.",
        deliverable:
          "Proyecto de sentencia de 2 páginas: consideraciones, norma aplicable, condena, porcentajes de repetición entre demandados.",
      },
      humanFocus:
        "El trabajador que recibió mal la liquidación era un cajero con tres hijos. Para él, la cadena de responsabilidad no es un diagrama: es si alguien le paga los $15 millones que le quitaron. La arquitectura de confianza digital no es técnica: es humana. Y el egresado de este curso se lleva la responsabilidad de que, cada vez que construya o use una herramienta LegalTech, recuerde al cajero.",
    },
  },
];

export const courseInfo = {
  title: "Transformación Digital Legal en Colombia",
  subtitle: "LegalTech, IA y Nuevos Retos Jurídicos",
  description:
    "Durante siglos, el derecho encontró su hogar en el papel, en la palabra dicha a viva voz y en la firma manuscrita. Ese mundo nos dio certeza y acentó las bases. Sin embargo hoy, el derecho también vive en la nube, en un mensaje de datos, en una videollamada de Teams o en un hash criptográfico. Por lo cual, quienes quieren hacer parte de la evolución natural de la ley, deben actualizar sus recursos, sin perder el oficio. Este curso es una invitación a mirar el derecho con nuevos ojos: a entender que está cambiando, qué permanece y, sobre todo, cómo usar  nuevos medios con la misma sabiduría con la que un buen abogado elige sus palabras en un alegato. Porque la meta no es ser más tecnológicos. El proposito es ser mejores profesionales: más precisos, más accesibles, más justos. Bienvenidos a ese camino.",
  totalModules: 10,
  duration: "40 horas · 10 sesiones de 4h",
  level: "Nivel intermedio · abogados y developers",
  problemStatement:
    "El problema no es que falten herramientas tecnológicas. Es que sobran profesionales sin criterio para decidir cuándo usarlas, cuándo no, y cómo documentar esa decisión frente a la Ley 527/1999, la Ley 1266/2008, la Ley 1581/2012 y las circulares vigentes de la SIC. Este curso forma ese criterio: decidir con marco normativo a la vista.",
} as const;
