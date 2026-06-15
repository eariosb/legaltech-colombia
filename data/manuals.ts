/* ────────────────────────────────────────────────────────────
 *  Manuales de práctica LegalTech
 *  Dos manuales paralelos que acompañan al curso:
 *    · "desarrollo-software" — ingeniería y arquitectura (stack R + Python).
 *    · "ejercicio-legal"     — cómo ejercer la abogacía en entornos
 *                              LegalTech en Colombia.
 *  Comparten schema para que el render sea idéntico y la comparación
 *  entre ambas caras —técnica y jurídica— sea evidente.
 * ──────────────────────────────────────────────────────────── */

import type { IconName } from "@/components/icons/Icon";

export type ManualSlug = "desarrollo-software" | "ejercicio-legal";

export type ManualLang =
  | "r"
  | "python"
  | "bash"
  | "text"
  | "yaml"
  | "json"
  | "sql";

export interface ManualCodeBlock {
  language: ManualLang;
  caption?: string;
  code: string;
}

export interface ManualTable {
  headers: string[];
  rows: string[][];
}

export type ManualCalloutType =
  | "principle"
  | "warning"
  | "tip"
  | "norm"
  | "practice"
  | "pitfall";

export interface ManualCallout {
  type: ManualCalloutType;
  title?: string;
  body: string;
}

export interface ManualSubsection {
  id: string;
  title: string;
  lead?: string;
  body?: string[];
  bullets?: string[];
  table?: ManualTable;
  code?: ManualCodeBlock[];
  callouts?: ManualCallout[];
}

export interface ManualSection {
  id: string;
  number: string;
  title: string;
  intro?: string;
  subsections: ManualSubsection[];
}

export interface ManualHighlight {
  icon: IconName;
  label: string;
  description: string;
}

export interface Manual {
  slug: ManualSlug;
  title: string;
  subtitle: string;
  summary: string;
  /** A quién va dirigido, en una frase directa */
  forWho: string;
  /** Tiempo estimado de lectura profunda */
  readingTime: string;
  /** Color de acento principal */
  color: string;
  /** Ícono Simple Line de portada (clave del registry). */
  icon: IconName;
  /** Tarjeta corta: 3 principios rectores del manual */
  guidingPrinciples: ManualHighlight[];
  /** Cita que abre el manual */
  principleQuote: string;
  principleAuthor?: string;
  sections: ManualSection[];
  /** Frase de cierre que devuelve el manual al humano */
  closingNote: string;
  /** Tags rápidos */
  tags: string[];
}

/* ────────────────────────────────────────────────────────────
 *  Manual 1 — Desarrollo de software LegalTech
 *  Reescribe y estructura el material del "Manual de Buenas
 *  Prácticas LegalTech" que sirve de base al curso.
 * ──────────────────────────────────────────────────────────── */

const softwareManual: Manual = {
  slug: "desarrollo-software",
  title: "Manual de buenas prácticas de ingeniería LegalTech",
  subtitle: "Principios de diseño, arquitectura y seguridad para productos jurídicos digitales",
  summary:
    "Guía de ingeniería de software para productos LegalTech escrita en el nivel de principios: cómo se diseña, se conecta, se escala, se protege y se hace auditable un sistema jurídico digital, sin anclarse a lenguajes, frameworks o proveedores concretos. Toda recomendación es traducible al stack que elija cada equipo.",
  forWho:
    "Para arquitectos, ingenieros, tech leads y abogados con perfil técnico que diseñan, revisan o auditan productos LegalTech en Colombia.",
  readingTime: "50–70 min",
  color: "#0F766E",
  icon: "wrench",
  guidingPrinciples: [
    {
      icon: "frame",
      label: "Principios sobre herramientas",
      description:
        "Las herramientas cambian cada 18 meses; los principios sobreviven tres décadas. Este manual fija los principios y deja que cada equipo elija el stack que honre esos principios.",
    },
    {
      icon: "shield",
      label: "Seguridad y privacidad por diseño",
      description:
        "La protección de datos personales y la defensa del sistema no son capas que se agregan al final: son decisiones del primer diagrama, del primer contrato, del primer sprint.",
    },
    {
      icon: "compass",
      label: "Auditabilidad como norte",
      description:
        "Un sistema LegalTech debe poder ser explicado y defendido ante un juez, un auditor y un cliente no técnico. Si no se puede auditar, no se puede confiar.",
    },
  ],
  principleQuote:
    "La mejor arquitectura es la que se deja entender en una servilleta y se deja defender ante un juez.",
  tags: [
    "Principios",
    "Arquitectura",
    "Conectividad",
    "Escalabilidad",
    "Seguridad",
    "Privacidad",
    "Integridad",
    "Auditabilidad",
  ],
  sections: [
    {
      id: "principios-diseno",
      number: "1",
      title: "Principios de diseño",
      intro:
        "Diseñar software LegalTech es traducir un deber jurídico (proteger un derecho, dejar rastro, ser auditable) en una estructura técnica que resista el paso del tiempo y el cambio de personas. Los principios que siguen son independientes del lenguaje, del framework y del proveedor: funcionan en cualquier stack y son el primer filtro antes de escoger uno.",
      subsections: [
        {
          id: "separacion-preocupaciones",
          title: "Separación de preocupaciones",
          lead:
            "Cada módulo debe hacer una sola cosa y hacerla bien. Si la descripción de lo que hace un módulo exige conjunciones, probablemente debe partirse en dos.",
          body: [
            "La separación de preocupaciones (Separation of Concerns) es el principio madre: aísla la interfaz del dominio, el dominio de la persistencia, la persistencia de la integración externa. Cada frontera que se traza hoy reduce el costo del cambio mañana.",
            "En un producto LegalTech traducimos este principio a tres capas mínimas: la capa de interacción con el usuario (humano o sistema), la capa de reglas del negocio (donde vive el derecho codificado), y la capa de acceso a datos y servicios externos. Cada capa depende solo de la abstracción de la siguiente, nunca de su implementación concreta.",
          ],
          callouts: [
            {
              type: "principle",
              title: "Prueba de la servilleta",
              body: "Un arquitecto debe poder dibujar su sistema en una servilleta y explicarlo en dos minutos. Si necesita más, el sistema tiene demasiadas preocupaciones mezcladas.",
            },
          ],
        },
        {
          id: "solid-agnostico",
          title: "SOLID como contrato de evolución",
          lead:
            "SOLID no es una moda; es un contrato con quien mantendrá el sistema cuando ya no estemos nosotros. En LegalTech, esa persona también es auditora.",
          table: {
            headers: ["Principio", "Traducción a LegalTech"],
            rows: [
              [
                "Responsabilidad única",
                "Cada módulo responde a una sola pregunta jurídica o técnica. 'Calcular liquidación laboral' y 'enviar notificación' son dos módulos, no uno.",
              ],
              [
                "Abierto / cerrado",
                "El sistema debe abrirse a nuevas normas y tipos de documentos sin tocar el núcleo. Agregar una nueva causal de nulidad no debería requerir reescribir el motor.",
              ],
              [
                "Sustitución",
                "Un componente puede cambiarse por otro que respete el mismo contrato sin romper el flujo. Cualquier motor de inferencia debería poder intercambiarse por otro equivalente.",
              ],
              [
                "Segregación de interfaces",
                "Los módulos solo exponen los métodos que sus consumidores necesitan. Un super-objeto con 40 métodos es una deuda técnica disfrazada de facilidad.",
              ],
              [
                "Inversión de dependencias",
                "El código jurídico depende de abstracciones, no de proveedores. 'Enviar SMS' es la abstracción; 'enviar SMS vía proveedor X' es un adaptador intercambiable.",
              ],
            ],
          },
        },
        {
          id: "dry-kiss-yagni",
          title: "DRY, KISS y YAGNI en clave pragmática",
          lead:
            "Tres reglas cortas que evitan el 80 % de los sobrecostos en LegalTech.",
          bullets: [
            "DRY: si la regla de cálculo de un término procesal aparece en dos sitios, pronto aparecerán dos verdades contradictorias en el sistema. Centraliza la regla, cita la norma en el código y prueba una sola vez.",
            "KISS: la simplicidad es una decisión, no un accidente. Entre dos soluciones que cumplen, escoge la que un ingeniero nuevo entienda en media hora.",
            "YAGNI: no construyas mañana lo que el producto no necesita hoy. Cada capacidad especulativa es una superficie de ataque adicional, un costo de mantenimiento adicional y un riesgo de compliance adicional.",
          ],
          callouts: [
            {
              type: "pitfall",
              title: "Anti-patrón frecuente",
              body: "Equipos que escriben un motor genérico para soportar 'cualquier norma futura' terminan con un DSL que nadie domina y que bloquea todo cambio real.",
            },
          ],
        },
        {
          id: "domain-driven",
          title: "Diseño dirigido por el dominio jurídico",
          lead:
            "El lenguaje del código debe ser el lenguaje del abogado, no el lenguaje del framework.",
          body: [
            "En LegalTech, el dominio es el derecho. Usar nombres como 'Demanda', 'Prueba', 'Plazo de caducidad', 'Responsable de tratamiento' acerca al equipo jurídico al sistema y reduce la distancia entre el requerimiento y la implementación. Cuando el código habla en terminología jurídica, los abogados pueden revisarlo y los desarrolladores leen la norma con criterio.",
            "Los límites (bounded contexts) del sistema deben corresponder a las fronteras reales del ejercicio jurídico: contratación, litigio, compliance, notificación. Mezclar contextos en un mismo módulo produce el mismo acoplamiento que mezclar áreas de práctica en un mismo memorial.",
          ],
        },
      ],
    },
    {
      id: "arquitectura",
      number: "2",
      title: "Arquitectura: capas, hexágonos y fronteras",
      intro:
        "Una arquitectura honesta separa lo que cambia a menudo de lo que casi nunca cambia, y protege el núcleo jurídico de los vaivenes tecnológicos. Dos estilos sirven especialmente bien al LegalTech: la arquitectura por capas y la hexagonal. No son religiones; son mapas de fronteras.",
      subsections: [
        {
          id: "capas",
          title: "Arquitectura por capas",
          lead:
            "Tres fronteras básicas, cada una con una sola dirección de dependencia.",
          code: [
            {
              language: "text",
              caption: "Diagrama conceptual de capas",
              code: `[ Presentación / API pública ]
              ↓  depende de
[ Aplicación / Casos de uso ]
              ↓  depende de
[ Dominio / Reglas jurídicas ]
              ↑  implementa
[ Infraestructura / Persistencia e integraciones ]`,
            },
          ],
          body: [
            "La regla inviolable: las capas superiores dependen de las inferiores, nunca al revés. El dominio (donde vive el derecho) no debe saber cómo se persiste ni cómo se envía un correo; expone contratos y la infraestructura los implementa.",
            "Esta disciplina permite cambiar el motor de almacenamiento, el proveedor de notificaciones o la interfaz de usuario sin tocar la lógica jurídica. La norma permanece estable; la tecnología alrededor respira.",
          ],
        },
        {
          id: "hexagonal",
          title: "Hexagonal (puertos y adaptadores)",
          lead:
            "Cada interacción con el mundo exterior pasa por un puerto y un adaptador. Lo externo queda intercambiable; lo interno queda defendido.",
          body: [
            "La arquitectura hexagonal generaliza la idea anterior: el núcleo expone puertos (contratos) y delega en adaptadores (implementaciones). Así, un caso de uso 'validar identidad' declara el puerto VerificadorIdentidad y el sistema puede enchufar hoy un proveedor biométrico y mañana otro, sin reescribir el caso de uso.",
            "El beneficio real se siente cuando cambia la regulación: si la SIC exige que la verificación deje trazabilidad adicional, se modifica el adaptador, no el núcleo. El derecho codificado permanece idéntico, solo cambia quién cumple el contrato.",
          ],
          callouts: [
            {
              type: "principle",
              title: "Regla del contrato",
              body: "Todo servicio externo entra y sale por un puerto nombrado en lenguaje jurídico. Si el nombre del puerto se parece al nombre del proveedor, el núcleo ya perdió independencia.",
            },
          ],
        },
        {
          id: "monolito-servicios",
          title: "Monolito, modular o servicios: una decisión informada",
          lead:
            "No hay una respuesta universal. Hay un marco para escogerla con argumentos.",
          table: {
            headers: ["Forma", "Cuándo conviene", "Cuándo daña"],
            rows: [
              [
                "Monolito modular",
                "Equipo pequeño, un solo dominio jurídico, tráfico moderado, ritmo de cambio homogéneo.",
                "Cuando distintas áreas tienen ritmos de despliegue incompatibles o requieren aislamiento regulatorio fuerte.",
              ],
              [
                "Servicios distribuidos",
                "Dominios con autonomía real (onboarding, cobranza, firma), equipos separados, necesidad de escalar cada pieza por su cuenta.",
                "Equipos pequeños que asumen la complejidad operativa de una red sin tener la madurez de observabilidad y despliegue para sostenerla.",
              ],
              [
                "Arquitectura dirigida por eventos",
                "Procesos asincrónicos, auditoría estricta, reprocesamiento, sistemas que deben ser idempotentes por diseño.",
                "Flujos conversacionales cortos donde la latencia extra de una cola no aporta más que complejidad.",
              ],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Cuidado con la moda",
              body: "Empezar con microservicios 'porque escalan' antes de tener usuarios es una de las trampas más frecuentes. Es preferible un monolito bien modulado que una red de servicios mal gobernada.",
            },
          ],
        },
      ],
    },
    {
      id: "conectividad",
      number: "3",
      title: "Conectividad e integración",
      intro:
        "Un sistema LegalTech rara vez vive solo: habla con entidades públicas, proveedores de identidad, centrales de información, firma digital, canales de notificación y motores analíticos. La disciplina de cómo se conectan esas piezas define si el sistema es frágil o resiliente.",
      subsections: [
        {
          id: "contratos-api",
          title: "Contratos primero, implementación después",
          lead:
            "Antes de escribir código, se escribe el contrato. El contrato es la promesa jurídica del sistema hacia quien lo consume.",
          body: [
            "Toda integración —interna o externa— debe empezar por un contrato explícito: entradas, salidas, errores, códigos de estado, políticas de reintento, límites de uso. Este contrato se versiona, se documenta y se firma entre equipos antes de que la primera línea de código se escriba.",
            "En LegalTech, el contrato técnico refleja obligaciones reales. Un endpoint que expone información personal cita la base legal del tratamiento en su documentación; un endpoint que valida una firma cita la Ley 527 y Decretos 2364/2012 y 333/2014. La documentación técnica es, a la vez, evidencia de cumplimiento.",
          ],
        },
        {
          id: "idempotencia",
          title: "Idempotencia y reintentos",
          lead:
            "En un entorno jurídico, repetir un mensaje nunca debe duplicar un efecto legal.",
          bullets: [
            "Cada operación que modifica estado declara un identificador único de petición. Procesar dos veces la misma petición produce el mismo resultado, nunca dos.",
            "Los errores transitorios (red, picos de carga) se reintentan con política de retroceso exponencial y límite máximo; los errores lógicos (autorización insuficiente, dato inválido) no se reintentan.",
            "Las respuestas de servicios externos se registran con su identificador correlacionable para poder reconstruir la línea de tiempo de una transacción ante una auditoría.",
          ],
          callouts: [
            {
              type: "practice",
              title: "Regla práctica",
              body: "Si la operación es 'notificar la audiencia', reintentarla dos veces no debe producir dos notificaciones. La idempotencia es la diferencia entre un sistema serio y uno peligroso.",
            },
          ],
        },
        {
          id: "mensajeria",
          title: "Sincronía vs. asincronía",
          lead:
            "No toda integración necesita respuesta inmediata. Saber cuándo elegir cola y cuándo elegir llamada directa define la estabilidad del sistema.",
          body: [
            "La comunicación sincrónica (petición-respuesta) encaja cuando el usuario espera al otro lado de la pantalla y la latencia debe ser baja. Es frágil porque acopla la disponibilidad del llamador a la del llamado.",
            "La comunicación asincrónica (colas, eventos, pub/sub conceptual) encaja cuando el proceso tolera espera y se beneficia de desacoplamiento: notificaciones, reprocesos, auditoría, generación de reportes. Añade complejidad operativa pero aísla fallas.",
            "Un sistema LegalTech maduro combina ambas: lo que el usuario ve en tiempo real va por canal sincrónico; lo que el sistema procesa en segundo plano va por canal asincrónico con garantías de entrega y orden explícitas.",
          ],
        },
      ],
    },
    {
      id: "escalabilidad",
      number: "4",
      title: "Volumen, concurrencia y capacidad",
      intro:
        "Diseñar para cien usuarios no es lo mismo que diseñar para cien mil. La escala no se improvisa; se anticipa con cifras honestas y se entrega con pruebas.",
      subsections: [
        {
          id: "modelo-capacidad",
          title: "Modelo de capacidad",
          lead:
            "Antes del primer despliegue, el equipo responde por escrito: ¿cuántos usuarios activos?, ¿qué pico?, ¿qué tiempo de respuesta toleramos?",
          body: [
            "El modelo de capacidad se construye con tres cifras mínimas: usuarios concurrentes estimados, peticiones por segundo esperadas y percentiles de latencia aceptables. Sin estos tres números, cualquier decisión de infraestructura es adivinanza.",
            "Estas cifras se validan con pruebas de carga sintéticas antes de producción y se vigilan con métricas reales en producción. La diferencia entre lo estimado y lo observado es información para la siguiente iteración del diseño.",
          ],
        },
        {
          id: "vertical-horizontal",
          title: "Escalado vertical vs. horizontal",
          lead:
            "Dos estrategias complementarias, no rivales.",
          table: {
            headers: ["Estrategia", "Qué significa", "Cuándo se prefiere"],
            rows: [
              [
                "Vertical",
                "Aumentar los recursos (cómputo, memoria) de la misma instancia.",
                "Cargas medias, procesos con estado, simplicidad operativa. Tope natural: el hardware más grande disponible.",
              ],
              [
                "Horizontal",
                "Replicar instancias idénticas detrás de un balanceador.",
                "Cargas altas, componentes sin estado, necesidad de tolerancia a fallos. Requiere que cada instancia sea intercambiable.",
              ],
              [
                "Mixta por capa",
                "Distintas capas escalan distinto: presentación horizontal, dominio horizontal, persistencia vertical con réplicas de lectura.",
                "Es la forma realista. Cada capa tiene su ritmo y su costo. Escalar por capa evita pagar por lo que no se usa.",
              ],
            ],
          },
        },
        {
          id: "sin-estado",
          title: "Componentes sin estado",
          lead:
            "Un componente sin estado puede apagarse y nacer en otra parte sin pérdida. Es la condición para escalar en horizontal con tranquilidad.",
          body: [
            "El estado se concentra en capas dedicadas: base de datos, caché explícito, almacenamiento de sesiones. Las capas de aplicación son sin estado por diseño.",
            "Eso impone una regla fuerte: nada se guarda 'en memoria del proceso' con la ilusión de persistirlo. Si la información debe sobrevivir al reinicio, vive en una capa persistente con contrato explícito de durabilidad.",
          ],
        },
        {
          id: "cache",
          title: "Caché disciplinado",
          lead:
            "El caché es una optimización poderosa y peligrosa. Sin disciplina, se convierte en la principal fuente de inconsistencias jurídicas.",
          bullets: [
            "Se cachea lo que es costoso y estable. Reglas, tablas normativas y metadatos se prestan al caché; decisiones en curso y datos financieros del cliente, rara vez.",
            "Todo valor en caché lleva política de invalidación escrita. Si no se sabe cuándo expirar un dato, no debe estar en caché.",
            "En materia de datos personales, el caché es una copia: está sujeto al mismo régimen de protección (Ley 1581) que el dato original. Olvidarlo es fuente habitual de incumplimiento.",
          ],
        },
      ],
    },
    {
      id: "transito",
      number: "5",
      title: "Tránsito de información",
      intro:
        "Cada dato que viaja por el sistema cruza fronteras —entre capas, entre procesos, entre organizaciones—. Cómo viaja, con qué garantías y con qué huella, define la seguridad y la auditabilidad del producto.",
      subsections: [
        {
          id: "cifrado",
          title: "Cifrado en tránsito y en reposo",
          lead:
            "Dos cifrados distintos para dos momentos distintos del dato.",
          body: [
            "El cifrado en tránsito protege la información mientras se mueve entre componentes y entre organizaciones. Se implementa con protocolos modernos (capa de transporte segura estándar), configuraciones conservadoras de cifrado y rotación regular de certificados.",
            "El cifrado en reposo protege la información almacenada. Aplica a bases de datos, copias de seguridad, colas de mensajes persistentes, volúmenes de archivo y caché duradero. Las claves se gestionan fuera del sistema protegido y su acceso queda registrado.",
            "Para datos sensibles (Ley 1581 art. 5) y datos financieros (Ley 1266), ambos cifrados son el mínimo, no la aspiración. Operar sin ellos es operar en infracción.",
          ],
        },
        {
          id: "serializacion",
          title: "Serialización segura",
          lead:
            "El formato en que viaja un dato importa tanto como el dato mismo.",
          bullets: [
            "Usar formatos de serialización autodescriptivos y estrictos. Se valida cada campo que entra y se escapa cada campo que sale.",
            "Nunca deserializar datos no confiables con formatos que ejecutan código implícito. Es una de las vías más antiguas y vigentes de comprometer un sistema.",
            "La información mínima necesaria viaja en el mensaje; el resto se referencia por identificador para minimizar exposición.",
          ],
        },
        {
          id: "minimizacion-viaje",
          title: "Minimización en el viaje",
          lead:
            "El dato que no viaja no se pierde, no se filtra, no se expone.",
          body: [
            "Antes de enviar, se pregunta: ¿necesita el destinatario este dato? ¿Puede reemplazarse por un identificador? ¿Puede agregarse? ¿Puede anonimizarse? Aplicar esta disciplina reduce la superficie de ataque y honra el principio de minimización de la Ley 1581.",
            "Un ejemplo cotidiano: enviar 'el usuario con cédula X tiene edad Y' es más invasivo que enviar 'el usuario con identificador interno 123 es mayor de edad'. Cuando el destinatario solo necesita el booleano, la cédula no tiene por qué salir.",
          ],
          callouts: [
            {
              type: "practice",
              title: "Regla del dato mínimo",
              body: "Si la función puede cumplirse con menos datos, usar menos datos. La norma no lo exige con esa literalidad; la auditoría sí lo espera con esa severidad.",
            },
          ],
        },
        {
          id: "trazabilidad-transito",
          title: "Trazabilidad del tránsito",
          lead:
            "Cada movimiento importante del dato deja un registro inmutable y correlacionable.",
          body: [
            "Un sistema LegalTech serio mantiene una bitácora inmutable de los eventos significativos: alta de datos, cambio de finalidad, acceso por terceros, entrega a un encargado, supresión. La bitácora es la cadena de custodia interna del producto.",
            "Esa bitácora no guarda el dato sensible, solo el hecho y su contexto (quién, cuándo, qué operación, bajo qué autorización). Es la pieza que permite responder en 10 días hábiles una petición de habeas data sin improvisar.",
          ],
        },
      ],
    },
    {
      id: "vulnerabilidades",
      number: "6",
      title: "Prevención de vulnerabilidades por planificación",
      intro:
        "La seguridad no se añade al final; se planea al inicio. Un producto LegalTech que llega a auditoría con su modelo de amenazas documentado y sus controles probados se defiende solo. Uno que llega con 'pero lo desplegamos seguro' no se defiende en lo absoluto.",
      subsections: [
        {
          id: "modelo-amenazas",
          title: "Modelado de amenazas",
          lead:
            "Antes de escribir un módulo sensible, se responde por escrito: ¿qué se defiende?, ¿de quién?, ¿cómo?",
          body: [
            "El modelado de amenazas es un ritual sencillo: se dibuja el diagrama de flujo del dato, se identifican las fronteras de confianza, se anotan las amenazas en cada frontera (suplantación, alteración, repudio, divulgación, denegación, elevación de privilegio), y se decide qué control las mitiga.",
            "El resultado cabe en dos páginas por dominio. Se actualiza cuando cambia el diseño. Es la primera pregunta que una auditoría bien llevada hace al equipo técnico.",
          ],
          callouts: [
            {
              type: "principle",
              title: "Regla del adversario nombrado",
              body: "Un modelo de amenazas sin adversario es una meditación. El adversario debe ser concreto: un usuario interno curioso, un atacante oportunista, un actor organizado, un sujeto con acceso físico.",
            },
          ],
        },
        {
          id: "superficie-ataque",
          title: "Reducción de la superficie de ataque",
          lead:
            "Todo lo que se expone puede ser atacado. Lo que no existe no se puede comprometer.",
          bullets: [
            "Exponer solo las operaciones que el producto realmente necesita. Cada endpoint adicional es una puerta más que mantener cerrada.",
            "Cerrar por defecto y abrir por excepción: ni puertos, ni servicios, ni permisos, ni rutas deben estar activas 'por si acaso'.",
            "Eliminar módulos y dependencias que ya no se usan. El código muerto es, a menudo, el vector de ataque vivo.",
          ],
        },
        {
          id: "owasp-conceptual",
          title: "Las diez fallas clásicas (conceptualmente)",
          lead:
            "La lista canónica de fallas en aplicaciones web se lee como una checklist de prevención.",
          table: {
            headers: ["Familia de falla", "Cómo se previene por diseño"],
            rows: [
              [
                "Control de acceso roto",
                "Autorización por recurso y por acción, comprobada en cada capa. Nunca confiar en que la UI ocultó una opción.",
              ],
              [
                "Fallas criptográficas",
                "Cifrado en tránsito y reposo con algoritmos modernos. Nada de criptografía casera ni algoritmos deprecados.",
              ],
              [
                "Inyección",
                "Consultas parametrizadas, validación estricta de entrada, escape de salida. Nunca concatenar entrada de usuario en una consulta.",
              ],
              [
                "Diseño inseguro",
                "Modelo de amenazas documentado y revisado. Requerimientos de seguridad escritos como requerimientos funcionales.",
              ],
              [
                "Mala configuración",
                "Configuración versionada, endurecida por defecto, sin credenciales por defecto, con revisiones periódicas.",
              ],
              [
                "Componentes vulnerables",
                "Inventario de dependencias, monitoreo de vulnerabilidades conocidas, política de actualización ante crítico.",
              ],
              [
                "Autenticación insuficiente",
                "Factores múltiples, políticas de contraseña razonables, bloqueo tras intentos fallidos, expiración de sesión.",
              ],
              [
                "Integridad de datos y código",
                "Firmas en artefactos, verificación de origen, inmutabilidad de bitácora, validación de actualizaciones.",
              ],
              [
                "Bitácora insuficiente",
                "Registro de eventos significativos con correlación entre capas. Alertas automáticas sobre eventos anómalos.",
              ],
              [
                "Falsificación de solicitud del lado del servidor",
                "Listas blancas estrictas de destinos internos a los que la aplicación puede llamar. Rechazo por defecto.",
              ],
            ],
          },
        },
        {
          id: "plan-respuesta",
          title: "Plan de respuesta a incidentes",
          lead:
            "El mejor sistema preparado para no fallar tiene, de todas formas, un plan escrito para cuando falle.",
          body: [
            "El plan define: quién detecta, quién decide, quién contiene, quién comunica, quién remedia y quién aprende. Se escribe antes del incidente, se ensaya en simulacro y se actualiza cuando cambia el sistema.",
            "Para productos LegalTech bajo la Ley 1581, el plan incluye la obligación de reportar a la SIC los incidentes que afectan datos personales y, cuando haya riesgo alto para el titular, la notificación directa al titular. El plazo y la evidencia de esta notificación son parte del expediente de cumplimiento.",
          ],
        },
      ],
    },
    {
      id: "integridad",
      number: "7",
      title: "Integridad y auditabilidad",
      intro:
        "La integridad es la garantía de que un dato no ha sido alterado silenciosamente. En un producto LegalTech, la integridad no es confort: es la diferencia entre una prueba válida y un proceso caído por falta de cadena de custodia.",
      subsections: [
        {
          id: "hash-firma",
          title: "Huellas digitales y firmas",
          lead:
            "Hashes y firmas son dos herramientas conceptuales para dos preguntas distintas: ¿este dato cambió?, ¿este dato lo firmó quien dice?",
          body: [
            "Una huella digital (hash) de un documento detecta cualquier cambio posterior: un byte modificado produce una huella completamente distinta. La huella se calcula al momento de recibir o producir el documento, se registra junto al documento y se vuelve a verificar cada vez que el documento se presenta.",
            "Una firma digital añade identidad: vincula el documento a un firmante con un certificado emitido por una autoridad reconocida. En Colombia, los Decretos 2364/2012 y 333/2014 definen los requisitos. Para un producto LegalTech, distinguir firma electrónica de firma digital es una decisión de diseño, no de marketing.",
          ],
          callouts: [
            {
              type: "norm",
              title: "Ley 527/1999 y reglamentación",
              body: "La equivalencia funcional exige que el soporte técnico de la firma sea consistente con el propósito probatorio pretendido. El sistema debe poder explicar ante un juez qué mecanismo usó y por qué es suficiente para el acto jurídico en cuestión.",
            },
          ],
        },
        {
          id: "bitacora-inmutable",
          title: "Bitácora inmutable",
          lead:
            "Un registro que puede editarse no es un registro; es un borrador con pretensiones.",
          body: [
            "Los eventos críticos (autorizaciones, accesos, decisiones automatizadas, entregas, supresiones) se registran en una bitácora append-only: los eventos se agregan pero no se modifican. Cuando se descubre un error, se añade un evento correctivo; no se reescribe el pasado.",
            "La bitácora usa identificadores correlacionables entre capas. Ante una investigación, el equipo debe poder reconstruir la línea de tiempo de un caso en minutos, no en días.",
          ],
        },
        {
          id: "reproducibilidad",
          title: "Reproducibilidad de decisiones",
          lead:
            "Una decisión que no se puede reproducir no se puede defender.",
          body: [
            "Toda decisión automatizada que afecta a una persona debe poder reproducirse: los mismos datos, la misma versión del modelo o reglas, el mismo resultado. Esto exige versionar las reglas, versionar los modelos, registrar qué versión se usó en cada decisión y conservar el contexto por el tiempo que imponga la norma aplicable.",
            "Bajo la Circular SIC 002/2024, un titular puede pedir explicación de la decisión que lo afectó. La reproducibilidad es la base técnica de esa explicación.",
          ],
        },
      ],
    },
    {
      id: "privacidad",
      number: "8",
      title: "Privacidad por diseño",
      intro:
        "La privacidad por diseño (privacy by design) no es un eslogan: es un conjunto de decisiones concretas que se toman en la hoja en blanco, no en la hoja firmada. Un producto LegalTech que incorpora estas decisiones puede escalar sin multiplicar su deuda de cumplimiento.",
      subsections: [
        {
          id: "minimizacion",
          title: "Minimización de datos",
          lead:
            "Recolectar solo lo necesario. Conservar solo lo indispensable. Compartir solo lo proporcional.",
          body: [
            "El principio de minimización del art. 4 de la Ley 1581 se traduce a tres decisiones concretas: el formulario pide lo mínimo, la base guarda lo mínimo, el integrador comparte lo mínimo. Cada campo adicional debe justificar su existencia con una finalidad escrita.",
            "En la práctica, el equipo revisa cada campo al menos una vez al año y pregunta: ¿sigue siendo necesario? ¿hay una finalidad vigente? ¿podríamos cumplir sin él? Los campos que no superan este examen se retiran.",
          ],
        },
        {
          id: "finalidad-consentimiento",
          title: "Finalidad y consentimiento granulares",
          lead:
            "Un consentimiento genérico no es consentimiento; es un trámite disfrazado.",
          bullets: [
            "Cada finalidad del tratamiento se describe por separado, en lenguaje claro, y se solicita autorización específica para cada una.",
            "El consentimiento es revocable por el mismo canal por el que se otorgó y con la misma facilidad. La asimetría entre 'aceptar' y 'revocar' es un patrón oscuro y una infracción probable.",
            "La prueba del consentimiento se conserva con contexto: versión del aviso vigente al momento, marca de tiempo, canal, finalidades aceptadas y rechazadas.",
          ],
        },
        {
          id: "seudonimizacion",
          title: "Seudonimización y anonimización",
          lead:
            "Dos técnicas distintas, con efectos legales distintos.",
          table: {
            headers: ["Técnica", "Qué hace", "Efecto jurídico"],
            rows: [
              [
                "Seudonimización",
                "Sustituye identificadores directos por referencias, manteniendo posible la re-identificación controlada.",
                "El dato sigue siendo personal. Reduce riesgo, no libera al responsable de obligaciones.",
              ],
              [
                "Anonimización",
                "Elimina cualquier posibilidad razonable de re-identificación, incluso con información adicional.",
                "El dato anónimo queda fuera del régimen de protección de datos; se puede usar sin restricciones.",
              ],
              [
                "Agregación",
                "Reporta cifras o estadísticas sin individualizar.",
                "Si la agregación impide re-identificar, el resultado es anónimo. Agregados pequeños con muestras pequeñas pueden seguir siendo re-identificables.",
              ],
            ],
          },
          callouts: [
            {
              type: "pitfall",
              title: "Trampa común",
              body: "Llamar 'anónimo' a lo que es solo seudonimizado es una de las fuentes más comunes de sanción. La diferencia no es técnica: es jurídica. Con duda, se asume seudonimización y se mantiene el régimen.",
            },
          ],
        },
        {
          id: "retencion",
          title: "Retención y supresión",
          lead:
            "Conservar para siempre no es seguridad: es riesgo acumulado.",
          body: [
            "Cada categoría de dato tiene un plazo de retención escrito, justificado en la finalidad o en una obligación legal. Cumplido el plazo, el dato se suprime o se anonimiza. La decisión se ejecuta de forma automática y se registra en la bitácora.",
            "Bajo la Ley 1266, el dato negativo financiero tiene plazos de caducidad específicos contados desde el pago. Un LegalTech que conserva indefinidamente 'por si acaso' infringe la ley y alimenta demandas.",
          ],
        },
        {
          id: "transferencias",
          title: "Transferencias y transmisiones",
          lead:
            "Dos figuras jurídicas con contratos distintos.",
          body: [
            "La transferencia envía datos a un tercero que los tratará por cuenta propia; exige autorización del titular y, si es internacional, cumplir requisitos adicionales (nivel adecuado de protección o cláusulas específicas).",
            "La transmisión delega el tratamiento a un encargado que actúa por cuenta del responsable; exige contrato de transmisión con obligaciones equivalentes (Decreto 1377 art. 25). Toda integración con un proveedor que procese datos pasa por este contrato firmado antes de intercambiar el primer dato.",
          ],
        },
      ],
    },
    {
      id: "seguridad",
      number: "9",
      title: "Seguridad operativa",
      intro:
        "La seguridad operativa es la parte aburrida y definitoria: lo que se hace todos los días para que el sistema amanezca igual de seguro que se acostó.",
      subsections: [
        {
          id: "menor-privilegio",
          title: "Principio de menor privilegio",
          lead:
            "Cada identidad (humana o de máquina) recibe solo los permisos que necesita para cumplir su rol. Ni uno más.",
          body: [
            "El menor privilegio se aplica a usuarios del sistema, a procesos, a servicios y a integraciones. Los permisos se otorgan por rol, se revisan periódicamente y se revocan cuando cambia la función. El ex-empleado que mantiene acceso 'por si vuelve' es un incidente en espera.",
            "Se evita el uso de identidades compartidas. Si una cuenta la usan cinco personas, la trazabilidad se convierte en ficción. Cada persona con acceso es una identidad con nombre, y cada acceso queda asociado a esa identidad.",
          ],
        },
        {
          id: "defensa-profundidad",
          title: "Defensa en profundidad",
          lead:
            "Ningún control es infalible. Se construyen varias capas para que, cuando una falle, otra sostenga.",
          body: [
            "La defensa en profundidad combina controles preventivos (autenticación, autorización, cifrado), controles de detección (monitoreo, alertas, bitácoras) y controles de respuesta (contención, remediación, comunicación). La pérdida de uno no compromete al conjunto.",
            "Esta filosofía se opone a la 'seguridad perimetral' que confía todo a un único punto fuerte. Los puntos fuertes caen. Las capas se apoyan entre sí.",
          ],
        },
        {
          id: "secretos",
          title: "Gestión de secretos",
          lead:
            "Contraseñas, llaves y certificados nunca viven en el código. Viven en un almacén dedicado con trazabilidad de acceso.",
          bullets: [
            "Los secretos se leen en tiempo de ejecución desde un almacén seguro y con acceso auditable. Si aparecen en un repositorio de código, se consideran comprometidos y se rotan.",
            "Los secretos tienen fecha de rotación. Cada 90 días, como mínimo; con política más estricta para secretos con mayor alcance.",
            "El acceso a secretos queda registrado. Si nadie puede decir quién leyó qué clave y cuándo, se perdió el control.",
          ],
        },
        {
          id: "observabilidad",
          title: "Observabilidad y alertas",
          lead:
            "Un sistema que no se ve, no se defiende.",
          body: [
            "Tres dimensiones conforman la observabilidad: métricas (cuánto y qué tan rápido), registros (qué ocurrió) y trazas (cómo fluyó la petición entre capas). Las tres se combinan para diagnosticar en minutos lo que, sin ellas, tomaría días.",
            "Las alertas se configuran sobre síntomas de usuario (latencia, errores visibles), no solo sobre síntomas de sistema (CPU, memoria). Despertar a alguien a las 3 a.m. por una CPU alta que no afecta a nadie es erosionar la confianza del equipo.",
          ],
        },
        {
          id: "respaldos",
          title: "Respaldos y continuidad",
          lead:
            "Un respaldo no probado no existe. Se prueba restaurándolo.",
          body: [
            "Los respaldos son regulares, cifrados, separados del sistema primario y probados con un ejercicio periódico de restauración completa. El tiempo de recuperación objetivo y el punto de recuperación objetivo se declaran por sistema y se miden contra la realidad.",
            "El plan de continuidad contempla escenarios concretos: pérdida de una región de infraestructura, pérdida de un proveedor externo crítico, compromiso interno. Para cada escenario hay un procedimiento ensayado.",
          ],
        },
      ],
    },
    {
      id: "planificacion",
      number: "10",
      title: "Planificación y ciclo de vida",
      intro:
        "Las decisiones que cuestan más caro en LegalTech rara vez se toman por accidente técnico: se toman por descuido de planificación. Planear no ralentiza; protege.",
      subsections: [
        {
          id: "requerimientos",
          title: "Requerimientos funcionales y no funcionales",
          lead:
            "Los requerimientos no funcionales (seguridad, privacidad, desempeño, auditabilidad) tienen la misma dignidad que los funcionales.",
          body: [
            "Cada historia de usuario viene acompañada de sus requerimientos no funcionales: tiempo de respuesta aceptable, datos que se recolectan, base legal del tratamiento, obligaciones de registro, perfil que puede acceder. Sin eso, el requerimiento funcional queda incompleto.",
            "Los criterios de aceptación incluyen, para operaciones sensibles, evidencia de cumplimiento: la cita a la norma, el tipo de autorización requerida, el evento de bitácora que se dispara. La auditoría futura se alimenta de lo que se escribió en estas tarjetas.",
          ],
        },
        {
          id: "pruebas",
          title: "Pruebas automáticas",
          lead:
            "La prueba automática es la única promesa creíble de que el comportamiento de ayer sigue vigente hoy.",
          bullets: [
            "Pruebas unitarias sobre reglas jurídicas críticas (cálculos, plazos, prescripciones). Un cambio que rompe una prueba bloquea el despliegue.",
            "Pruebas de integración sobre los contratos con servicios externos. Cuando un proveedor cambia su contrato, se detecta en pruebas, no en producción.",
            "Pruebas de seguridad automatizadas sobre las dependencias y la configuración. Las amenazas conocidas se cazan por hábito, no por heroísmo.",
          ],
        },
        {
          id: "revision-codigo",
          title: "Revisión de código y pares",
          lead:
            "Dos ojos ven lo que uno no quiere ver.",
          body: [
            "Todo cambio relevante pasa por revisión de al menos una persona distinta al autor. La revisión no busca elegancia, busca entendibilidad, corrección y riesgo. En módulos con impacto jurídico, la revisión incluye una mirada del área legal o de cumplimiento.",
            "La cultura de revisión sana premia las preguntas sobre las correcciones. La pregunta 'por qué así y no de otra forma' vale más que la corrección cosmética.",
          ],
        },
        {
          id: "despliegue",
          title: "Despliegue y reversibilidad",
          lead:
            "Un despliegue que no se puede revertir es un salto al vacío.",
          body: [
            "Se prefiere desplegar en pequeños incrementos, con la posibilidad de activar y desactivar capacidades con banderas. La reversibilidad no es un lujo: es la condición para moverse rápido con seguridad.",
            "Los cambios en el esquema de datos se hacen en pasos compatibles hacia atrás. Un cambio de esquema incompatible con la versión anterior exige una ventana de convivencia y un plan de migración verificado antes del despliegue final.",
          ],
          callouts: [
            {
              type: "tip",
              title: "Regla del botón rojo",
              body: "Antes de desplegar, el equipo responde: si algo sale mal, ¿en cuánto tiempo podemos volver al estado anterior y quién aprieta el botón? Si no hay respuesta clara, el despliegue se aplaza.",
            },
          ],
        },
        {
          id: "mantenimiento",
          title: "Mantenimiento y deuda técnica",
          lead:
            "La deuda técnica es como la procesal: si no se atiende en tiempo, prescribe contra el equipo.",
          body: [
            "Se reserva una porción honesta del tiempo de cada ciclo al mantenimiento: actualización de dependencias, limpieza de código muerto, mejora de pruebas, refactorización guiada. El equipo que corre solo detrás de requerimientos nuevos termina atrapado por su propio sistema.",
            "La deuda técnica se hace visible: se registra, se prioriza y se paga. Un backlog de deuda sin dueño es un boleto a la crisis.",
          ],
        },
      ],
    },
    {
      id: "cumplimiento",
      number: "11",
      title: "Cumplimiento y auditoría",
      intro:
        "El cumplimiento no es un anexo al manual: es el criterio último de calidad en LegalTech. Todo lo anterior se ordena para que el sistema pueda ser explicado y defendido cuando la SIC, un juez o un cliente lo pidan.",
      subsections: [
        {
          id: "expediente",
          title: "Expediente de cumplimiento",
          lead:
            "Seis documentos que siempre deben estar vivos, fechados y firmados.",
          bullets: [
            "Aviso de privacidad y política de tratamiento vigentes y publicados.",
            "Registro de bases de datos ante la SIC cuando corresponda.",
            "Contratos de transmisión o transferencia con cada encargado.",
            "Modelo de amenazas por dominio, actualizado al último cambio de diseño.",
            "Plan de respuesta a incidentes con responsables y canales definidos.",
            "Bitácora de auditoría con trazabilidad de accesos, decisiones y eventos significativos.",
          ],
        },
        {
          id: "revision-periodica",
          title: "Revisión periódica",
          lead:
            "El cumplimiento no es un estado: es una disciplina.",
          body: [
            "Al menos una vez al año el equipo somete el producto a una revisión integral: brecha frente a la Ley 1581, el Decreto 1377 y la Circular SIC 002/2024; verificación de los plazos de respuesta; pruebas de restauración de respaldos; ejercicio de incidente; revisión de dependencias y secretos.",
            "La revisión produce un plan de remediación con responsables y plazos. Sin plan de remediación, la revisión es teatro.",
          ],
        },
        {
          id: "defensa",
          title: "Defensa argumentada del diseño",
          lead:
            "El equipo debe poder defender cada decisión técnica con una razón jurídica o de riesgo, no con 'lo hicimos así porque sí'.",
          body: [
            "En una auditoría seria, la pregunta habitual no es '¿está cifrado?' sino '¿por qué eligieron este esquema y no otro?'. La respuesta del equipo revela si hay pensamiento o improvisación detrás del sistema.",
            "El manual, el modelo de amenazas, el expediente y la bitácora se convierten, juntos, en la narrativa del sistema. Esa narrativa es la que gana o pierde la auditoría.",
          ],
          callouts: [
            {
              type: "principle",
              title: "Criterio último",
              body: "Un sistema LegalTech bien construido se puede explicar en voz alta, se puede auditar en silencio, y se puede defender ante un juez con los papeles en la mano.",
            },
          ],
        },
      ],
    },
  ],
  closingNote:
    "La ingeniería de software LegalTech no se define por el stack elegido: se define por la disciplina con la que se honran los principios. Un equipo que entiende separación de preocupaciones, privacidad por diseño, integridad verificable y defensa en profundidad puede construir en cualquier tecnología. Uno que ignora estos principios fallará con cualquiera.",
};

/* ────────────────────────────────────────────────────────────
 *  Manual 2 — Ejercicio legal en entornos LegalTech
 * ──────────────────────────────────────────────────────────── */

const legalManual: Manual = {
  slug: "ejercicio-legal",
  title: "Manual de ejercicio legal en LegalTech",
  subtitle: "Cómo ejercer la abogacía cuando la tecnología es el medio",
  summary:
    "Guía práctica para el abogado colombiano que integra IA, analítica y automatización a su ejercicio profesional: deber de competencia tecnológica, política interna de uso de IA, habeas data, SARLAFT, cadena de custodia digital, retainer, honorarios y comunicación con el cliente no técnico.",
  forWho:
    "Para abogados, litigantes, funcionarios judiciales y jefes de área jurídica que quieren integrar LegalTech sin comprometer su responsabilidad profesional.",
  readingTime: "40–55 min",
  color: "#1E3A8A",
  icon: "docs",
  guidingPrinciples: [
    {
      icon: "compass",
      label: "Responsabilidad sigue siendo tuya",
      description:
        "La IA no firma memoriales. Cada decisión salida del despacho está cubierta por tu tarjeta profesional y por el Estatuto del Abogado (Ley 1123/2007).",
    },
    {
      icon: "magnifier",
      label: "Trazabilidad antes que velocidad",
      description:
        "Un flujo automatizado que no registra qué se hizo, cuándo y con qué insumo es invisible para el juez y para tu propia defensa disciplinaria.",
    },
    {
      icon: "people",
      label: "Cliente informado, no cliente asombrado",
      description:
        "El cliente debe entender qué hace la herramienta, qué no hace y qué decisiones humanas hay detrás. La IA es medio, no argumento.",
    },
  ],
  principleQuote:
    "Un abogado LegalTech no delega su criterio: delega su tiempo.",
  tags: [
    "Ética profesional",
    "Ley 1123/2007",
    "Circular SIC 002/2024",
    "Habeas data",
    "SARLAFT",
    "Evidencia digital",
    "Retainer",
    "Cliente",
  ],
  sections: [
    {
      id: "deber-competencia",
      number: "1",
      title: "Deber de competencia tecnológica",
      intro:
        "El Estatuto del Abogado exige diligencia profesional. Hoy, ser diligente incluye entender (al menos conceptualmente) las herramientas con las que se produce el trabajo jurídico. No dominar la tecnología ya no es neutro: puede ser negligencia.",
      subsections: [
        {
          id: "alcance",
          title: "1.1 Qué cubre el deber de competencia tecnológica",
          lead:
            "Conocer algunas herramientas, diseños, gestión informática, modelos, asi como; en dónde falla y qué riesgos introduce.",
          bullets: [
            "Saber qué datos salen del despacho cada vez que se usa un servicio en la nube (IA incluida).",
            "Conocer los límites de la herramienta: alucinaciones en LLMs, falsos positivos en analítica, sesgo en modelos predictivos.",
            "Poder reconstruir, ante un tercero, cómo se llegó a una conclusión automatizada.",
            "Actualizarse cuando la norma cambia: Circular SIC 002/2024, Ley 2213/2022, pronunciamientos de la Corte sobre IA.",
          ],
          callouts: [
            {
              type: "norm",
              title: "Ley 1123 de 2007 · Estatuto del Abogado",
              body: "Los deberes de actualización y diligencia (art. 28) se interpretan hoy incluyendo tecnología. Un memorial firmado con datos fabricados por un LLM puede configurar falta disciplinaria por falta a la honradez (art. 34).",
            },
          ],
        },
        {
          id: "matriz-conocimiento",
          title: "1.2 Matriz mínima de conocimiento",
          table: {
            headers: ["Herramienta en el despacho", "Lo que el abogado debe poder explicar"],
            rows: [
              [
                "Asistente con LLM (ChatGPT, Claude, Gemini)",
                "Qué datos se envían; si hay retención; por qué puede inventar citas; cuándo no se debe usar (p. ej. cálculos legales determinísticos).",
              ],
              [
                "RAG jurídico interno",
                "Corpus indexado, fecha de última actualización, fuente de cada cita, criterio de relevancia.",
              ],
              [
                "Modelo predictivo (bayesiano o ML)",
                "Variables de entrada, muestra de entrenamiento, intervalo de credibilidad o confianza, límites de aplicación.",
              ],
              [
                "Firma electrónica / digital",
                "Diferencia entre firma simple, electrónica y digital certificada (Decreto 2364/2012, Decretos 333/2014).",
              ],
              [
                "Plataforma de gestión documental",
                "Dónde se almacena físicamente la información, quién la administra, cómo se responde a un derecho ARCO.",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "politica-ia",
      number: "2",
      title: "Política interna de uso de IA en el despacho",
      intro:
        "Una política de IA por escrito no es burocracia: es la prueba de que, si algo falla, hubo diligencia. La Circular SIC 002/2024 exige transparencia y responsabilidad, y una política clara es su primer aterrizaje práctico.",
      subsections: [
        {
          id: "componentes",
          title: "2.1 Componentes mínimos de la política",
          bullets: [
            "Inventario de herramientas autorizadas (nombre, proveedor, país de datos, tipo de servicio).",
            "Casos permitidos y prohibidos por herramienta (p. ej. prohibido usar ChatGPT con información financiera de clientes sin acuerdo de tratamiento de datos).",
            "Obligación de revisión humana antes de que cualquier salida entre al expediente o se remita al cliente.",
            "Protocolo de incidentes: qué hacer si la herramienta entregó información errónea que alcanzó a salir.",
            "Capacitación anual obligatoria para todo el equipo, con registro de asistencia.",
          ],
          callouts: [
            {
              type: "norm",
              title: "Circular SIC 002/2024",
              body: "Exige a los responsables de tratamiento implementar medidas técnicas, humanas y administrativas para el uso responsable de IA, con principios de transparencia, explicabilidad y supervisión humana significativa.",
            },
          ],
        },
        {
          id: "clausulas-retainer",
          title: "2.2 Cláusulas recomendadas en el contrato de prestación de servicios",
          lead:
            "Si la IA va a procesar datos del cliente, eso debe estar escrito. Sin cláusula explícita, el uso compromete al abogado por violación del secreto profesional.",
          bullets: [
            "Autorización específica para el uso de herramientas de IA sobre información del cliente, con finalidad acotada.",
            "Lista de herramientas autorizadas y proveedores, con posibilidad de actualizarse previo aviso al cliente.",
            "Garantía de que, para decisiones jurídicas relevantes (memoriales, conceptos, dictámenes), siempre habrá revisión humana profesional.",
            "Compromiso de no incluir en entrenamientos (si la herramienta lo permite desactivar) la información del cliente.",
            "Cláusula de notificación en caso de incidente de seguridad o respuesta errónea que haya salido del despacho.",
          ],
          code: [
            {
              language: "text",
              caption: "Cláusula tipo · uso de IA y herramientas LegalTech",
              code: `DÉCIMA — USO DE HERRAMIENTAS DE INTELIGENCIA ARTIFICIAL
Y TECNOLOGÍA LEGALTECH. EL CLIENTE autoriza al ABOGADO el
uso de herramientas de inteligencia artificial, analítica y
automatización jurídica enumeradas en el Anexo A, únicamente
para los fines del encargo profesional y sujeto a:
(i) revisión humana significativa del ABOGADO sobre toda
salida que se remita al CLIENTE o se aporte a autoridad;
(ii) cumplimiento de la Ley 1581 de 2012, el régimen de
habeas data y la Circular SIC 002/2024;
(iii) prohibición expresa de incluir la información del
CLIENTE en datasets de entrenamiento de terceros;
(iv) obligación del ABOGADO de notificar dentro de los
tres (3) días hábiles cualquier incidente de seguridad o
error material que haya trascendido fuera del despacho.`,
            },
          ],
        },
      ],
    },
    {
      id: "habeas-data",
      number: "3",
      title: "Habeas data en la práctica diaria",
      intro:
        "Ley 1581/2012 y Ley 1266/2008 (habeas data financiero) no son asuntos lejanos: cada consulta que el abogado hace en la nube, cada contacto guardado, cada correo con adjunto, cae dentro del régimen.",
      subsections: [
        {
          id: "tres-preguntas",
          title: "3.1 Tres preguntas que el abogado debe poder contestar hoy",
          bullets: [
            "¿Dónde viven los datos personales que administro (países, proveedores, versiones)?",
            "¿Qué base legal sustenta el tratamiento (consentimiento, contrato, mandato judicial)?",
            "¿Cómo respondo en menos de 15 días hábiles a una solicitud de acceso, rectificación o supresión?",
          ],
          callouts: [
            {
              type: "pitfall",
              title: "Error frecuente",
              body: "Guardar cédulas y números de radicado en hojas de cálculo compartidas por WhatsApp. Sin cifrado ni control de acceso, configura tratamiento irregular y compromete habeas data.",
            },
          ],
        },
        {
          id: "buenas-practicas",
          title: "3.2 Buenas prácticas mínimas",
          bullets: [
            "Aviso de privacidad actualizado, accesible, enviado al cliente al inicio del encargo.",
            "Registro interno de tratamientos con finalidad específica, tiempo de retención y medidas de seguridad.",
            "Lista de proveedores con acceso a datos (cloud, IA, gestión documental) y su respectivo acuerdo de tratamiento.",
            "Procedimiento escrito para derechos ARCO con responsable, formato y tiempo de respuesta.",
            "Registro de incidentes con reporte a la SIC cuando la gravedad lo exige.",
          ],
        },
      ],
    },
    {
      id: "sarlaft",
      number: "4",
      title: "SARLAFT y prevención del lavado en el despacho",
      intro:
        "Para áreas como ecommerce, cripto, arrendamientos y sociedades, un despacho puede quedar involucrado en operaciones sospechosas sin saberlo. La Circular Básica Jurídica de la Superfinanciera (050/2017) y la regulación UIAF fijan obligaciones concretas también para asesores.",
      subsections: [
        {
          id: "senales-rojas",
          title: "4.1 Señales rojas típicas en un despacho LegalTech",
          bullets: [
            "Cliente nuevo que insiste en pagar en efectivo o en criptoactivos sin explicación razonable.",
            "Estructura societaria que no tiene propósito comercial evidente (cascada de SAS vacías).",
            "Solicitud de redactar contratos cuyo único efecto es mover fondos entre jurisdicciones con poca sustancia económica.",
            "Clientes vinculados con PEP (Personas Expuestas Políticamente) sin debida diligencia reforzada.",
            "Reticencia del cliente a entregar documentación de identidad o de origen de fondos.",
          ],
          callouts: [
            {
              type: "warning",
              title: "Responsabilidad personal del abogado",
              body: "Asesorar en operaciones con señales de alerta no tratadas puede configurar coparticipación en delitos de lavado (art. 323 C.P.) u omisión de control. El escudo del secreto profesional no cubre la colaboración activa con el ilícito.",
            },
          ],
        },
        {
          id: "checklist-onboarding",
          title: "4.2 Checklist de vinculación (onboarding) del cliente",
          bullets: [
            "Identificación plena: documento, fecha de nacimiento, dirección, contacto verificado.",
            "Para personas jurídicas: certificado de cámara de comercio, composición accionaria real, beneficiarios finales.",
            "Origen de los fondos y propósito de la relación.",
            "Listas restrictivas (ONU, OFAC, listas vinculantes): consulta registrada con fecha.",
            "Reevaluación periódica según riesgo (alto, medio, bajo).",
          ],
        },
      ],
    },
    {
      id: "evidencia-digital",
      number: "5",
      title: "Evidencia digital y cadena de custodia",
      intro:
        "Un pantallazo de WhatsApp no vale lo mismo que una conversación preservada con hash SHA-256, metadatos y acta notarial. Quien ejerza litigio digital necesita un protocolo reproducible; sin él, la prueba se cae en cualquier audiencia seria.",
      subsections: [
        {
          id: "principios",
          title: "5.1 Principios rectores",
          bullets: [
            "Integridad: el documento digital debe probar que no ha sido alterado desde su obtención (hash + firma).",
            "Autenticidad: quién lo produjo, quién lo tuvo en su poder, cadena documentada.",
            "Reproducibilidad: cualquier perito debe poder llegar al mismo resultado siguiendo los pasos registrados.",
            "Proporcionalidad: no todo requiere peritaje forense; el costo del aseguramiento debe ser coherente con el valor probatorio esperado.",
          ],
          callouts: [
            {
              type: "norm",
              title: "Ley 527/1999 · art. 10 y 11",
              body: "El valor probatorio de los mensajes de datos depende de su confiabilidad, de la forma en que se originaron, conservaron y comunicaron, y de la identificación de su remitente.",
            },
          ],
        },
        {
          id: "protocolo-minimo",
          title: "5.2 Protocolo mínimo para asegurar prueba digital",
          bullets: [
            "Registrar fecha, hora (con zona horaria), dispositivo y usuario que realiza la obtención.",
            "Calcular hash SHA-256 del archivo inmediatamente después de obtenerlo y registrarlo en un documento firmado.",
            "Cuando sea posible, acudir a notaría para acta de presencia o a perito informático certificado para levantamiento.",
            "Preservar metadatos (EXIF en imágenes, cabeceras en correos, logs de plataforma) junto al contenido.",
            "Guardar una copia en soporte separado, bajo control de acceso, antes de cualquier análisis.",
          ],
        },
        {
          id: "comunicacion-cliente",
          title: "5.3 Qué decirle al cliente cuando pregunta por el pantallazo",
          body: [
            "El cliente suele llegar con pantallazos: útiles para entender el caso, insuficientes para litigar. La función del abogado es explicar por qué y, si el caso lo amerita, activar el protocolo completo.",
            "La comunicación al cliente debe incluir: qué se asegura, qué no se asegura, cuánto cuesta, cuánto demora, y qué decisión queda en manos de quién.",
          ],
        },
      ],
    },
    {
      id: "honorarios",
      number: "6",
      title: "Honorarios y modelo de negocio con IA dentro",
      intro:
        "La IA cambia la estructura de costos del despacho. Cobrar por hora una tarea que la máquina hace en minutos es insostenible. Cobrar por valor, sin trazabilidad, es arriesgado. El modelo híbrido requiere método.",
      subsections: [
        {
          id: "modelos",
          title: "6.1 Cuatro modelos posibles",
          table: {
            headers: ["Modelo", "Cuándo funciona", "Riesgo a vigilar"],
            rows: [
              [
                "Tarifa fija por producto (contrato tipo, concepto, demanda estándar)",
                "Cuando el flujo con IA es estable y la revisión humana está acotada.",
                "Subestimar el tiempo de revisión crítica.",
              ],
              [
                "Tarifa por hora reducida + suscripción mensual",
                "Relación continua con cliente corporativo que usa la plataforma.",
                "Que la suscripción se perciba como servicio automático sin criterio.",
              ],
              [
                "Éxito con piso mínimo",
                "Litigios con expectativa cuantificable (laboral, tutela con indemnización).",
                "Dependencia de pronóstico predictivo no calibrado.",
              ],
              [
                "Freemium con upsell humano",
                "Productos de consumo (Lex-Consultor tipo).",
                "Cruce entre expectativa del usuario y disclaimers legales.",
              ],
            ],
          },
        },
        {
          id: "disclosure",
          title: "6.2 Transparencia en el uso de IA para honorarios",
          bullets: [
            "Informar al cliente si parte del trabajo se apoya en IA y cómo eso impacta el precio.",
            "Evitar cobrar tiempo humano por tareas ejecutadas por la herramienta: además de ético, es insostenible comercialmente.",
            "Cuando el éxito dependa de predicciones estadísticas, no vender 'probabilidad de ganar' sin contexto del intervalo de credibilidad.",
          ],
        },
      ],
    },
    {
      id: "comunicacion-cliente",
      number: "7",
      title: "Comunicación con el cliente no técnico",
      intro:
        "La mayoría de los clientes no necesita entender qué es un embedding o un intervalo de credibilidad. Necesita saber tres cosas: qué decidió, por qué y qué sigue. El abogado que traduce bien, gana confianza. El que deslumbra con jerga, la pierde.",
      subsections: [
        {
          id: "formula",
          title: "7.1 Fórmula de comunicación en tres movimientos",
          bullets: [
            "Qué se hizo — en lenguaje común (por ejemplo: 'revisamos 140 sentencias con ayuda de un sistema de búsqueda asistida y seleccionamos 7 relevantes').",
            "Qué significa — en términos del problema del cliente ('de esas 7, hay 3 a favor directo de tu postura y 4 que presentan riesgos').",
            "Qué sigue — una decisión concreta ('propongo radicar tutela el viernes; necesito que firmes el poder hoy').",
          ],
        },
        {
          id: "frases",
          title: "7.2 Frases que conviene tener a la mano",
          callouts: [
            {
              type: "practice",
              title: "Para explicar la incertidumbre",
              body: "«Según los casos similares de los últimos cinco años, este tipo de pretensión se concede entre el 55% y el 70% de las veces. No es garantía: es base para decidir con los ojos abiertos.»",
            },
            {
              type: "practice",
              title: "Para explicar el uso de IA",
              body: "«Usé una herramienta que me ayuda a buscar más rápido en una base de 10 mil sentencias. La decisión jurídica la tomo yo; la herramienta no firma nada.»",
            },
            {
              type: "practice",
              title: "Para evitar falsas expectativas",
              body: "«No existe un algoritmo que prediga con certeza un fallo. Lo que sí puedo darte es una lectura honesta del riesgo y el camino con mayor probabilidad de éxito.»",
            },
          ],
        },
      ],
    },
    {
      id: "auditoria",
      number: "8",
      title: "Auditoría legal anual del despacho",
      intro:
        "Así como un producto de software se audita, un despacho LegalTech se audita. Una vez al año, con criterios claros, dejando trazas. Es el ejercicio que anticipa la inspección externa o la reclamación disciplinaria.",
      subsections: [
        {
          id: "checklist-anual",
          title: "8.1 Checklist anual mínimo",
          bullets: [
            "Política interna de uso de IA revisada y firmada por el equipo.",
            "Inventario de tratamientos de datos personales y proveedores.",
            "Registro de incidentes del año y acciones correctivas.",
            "Revisión de cláusulas tipo en contratos de retainer (última actualización menor a 12 meses).",
            "Muestra aleatoria de 10 expedientes: ¿hay trazabilidad del uso de IA en cada uno?",
            "Indicadores de calidad del RAG interno si aplica (precisión >95% en preguntas doradas).",
            "Capacitación registrada del equipo en ética profesional y LegalTech.",
          ],
        },
        {
          id: "responsable",
          title: "8.2 Responsable designado",
          body: [
            "Un despacho con más de tres profesionales puede necesitar un 'responsable de cumplimiento LegalTech'. No tiene por qué ser un cargo nuevo: puede ser un abogado senior con el tiempo y la autoridad para decir 'esto no sale así'.",
            "Lo importante es que exista un nombre en el organigrama: sin responsable, la política no se ejecuta.",
          ],
        },
      ],
    },
    {
      id: "decalogo",
      number: "9",
      title: "Decálogo del abogado LegalTech",
      intro:
        "Diez reglas cortas para recordar en la puerta del despacho.",
      subsections: [
        {
          id: "reglas",
          title: "9.1 Las diez reglas",
          bullets: [
            "Firmas tú, no la herramienta. La responsabilidad viaja con tu tarjeta profesional.",
            "Si la herramienta calcula plata, que sea determinística. Nunca un LLM para liquidaciones, prescripciones, intereses.",
            "Si no puedes explicárselo al cliente, no lo uses en su caso.",
            "Si el proveedor entrena con datos de clientes y no puedes desactivarlo, no le subas información confidencial.",
            "Cada uso relevante de IA queda registrado: qué, cuándo, con qué entrada, con qué salida.",
            "La precisión jurídica antes que la velocidad: un memorial firmado con una cita inventada es una mancha que no se borra.",
            "Reconoces la incertidumbre y la comunicas con honestidad, en intervalos, no en certezas.",
            "Ante señales SARLAFT: paras, preguntas, documentas. Si la respuesta no satisface, declinas.",
            "Cumples con habeas data aun cuando el cliente no lo reclama. La SIC sí lo va a reclamar.",
            "Capacitas a tu equipo y a ti mismo. En LegalTech, estar desactualizado dos años equivale a ejercer sin saber.",
          ],
        },
      ],
    },
  ],
  closingNote:
    "LegalTech no sustituye al abogado: reordena el tiempo que dedica. Bien aplicado, libera horas para pensar mejor los casos difíciles, atender más humanamente al cliente y fortalecer la calidad jurídica. Ese es el cambio al que apunta este manual.",
};

export const manuals: Manual[] = [softwareManual, legalManual];

export function getManualBySlug(slug: string): Manual | undefined {
  return manuals.find((m) => m.slug === slug);
}
