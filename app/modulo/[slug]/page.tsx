import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, RISK_TIERS } from "@/data/course";
import { CourseShell } from "@/components/layout/CourseShell";
import { MindMap } from "@/components/course/MindMap";
import { Timeline } from "@/components/course/Timeline";
import { ConceptGrid } from "@/components/course/ConceptGrid";
import { ProcessSteps } from "@/components/course/ProcessSteps";
import { ChallengeAccordion } from "@/components/course/ChallengeAccordion";
import { NormCards } from "@/components/course/NormCards";
import { MetricsGrid } from "@/components/course/MetricsGrid";
import { ObjectivesList } from "@/components/course/ObjectivesList";
import { StatsBarChart, BayesianDistribution, GaugeGrid, RiskMatrix } from "@/components/course/StatsChart";
import { ChangeLens } from "@/components/course/ChangeLens";
import { PedagogicalActs } from "@/components/course/PedagogicalActs";
import { DisruptiveDialogue } from "@/components/course/DisruptiveDialogue";
import { HumanFocus } from "@/components/course/HumanFocus";
import { Competencies } from "@/components/course/Competencies";
import { Dilemma } from "@/components/course/Dilemma";
import { ModuleHero, AnimateIn } from "@/components/legal-ui";
import { Icon } from "@/components/icons/Icon";
import type { ReactNode } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return { title: "Módulo no encontrado" };
  return {
    title: `${mod.title} | LegalTech Colombia`,
    description: mod.description,
  };
}

function RiskTierBadge({ tier }: { tier: keyof typeof RISK_TIERS }) {
  const meta = RISK_TIERS[tier];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "8px",
        backgroundColor: `${meta.color}08`,
        border: `1px solid ${meta.color}22`,
        maxWidth: "100%",
      }}
    >
      <Icon
        name="shield"
        size={14}
        color={meta.color}
        style={{ flexShrink: 0, marginTop: "3px" }}
      />
      <div>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: meta.color,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            marginBottom: "3px",
          }}
        >
          Tier {tier === "tier-1" ? "1" : tier === "tier-2" ? "2" : "3"} · {meta.label}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#52525B",
            lineHeight: 1.55,
          }}
        >
          {meta.description}
        </p>
      </div>
    </div>
  );
}

function Section({ label, title, description, children }: {
  label: string; title: string; description?: string; children: ReactNode;
}) {
  return (
    <AnimateIn className="mb-12">
      <div style={{ paddingBottom: "14px", marginBottom: "18px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "4px" }}>
          {label}
        </p>
        <h2 style={{ fontSize: "17px", fontWeight: 600, color: "#111118", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: "13px", color: "#71717A", lineHeight: 1.65, marginTop: "5px", maxWidth: "560px" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </AnimateIn>
  );
}

export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const prevMod = modules.find((m) => m.id === mod.id - 1);
  const nextMod = modules.find((m) => m.id === mod.id + 1);

  return (
    <CourseShell>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>

        <ModuleHero
          moduleNumber={mod.id}
          totalModules={modules.length}
          icon={mod.icon}
          title={mod.title}
          subtitle={mod.subtitle}
          description={mod.description}
          tags={mod.tags}
          color={mod.color}
        />

        {mod.riskTier && (
          <div style={{ marginBottom: "16px" }}>
            <RiskTierBadge tier={mod.riskTier} />
          </div>
        )}

        {mod.pedagogy?.changeLens && (
          <div style={{ marginBottom: "32px" }}>
            <ChangeLens text={mod.pedagogy.changeLens} color={mod.color} />
          </div>
        )}

        <Section label="Aprendizaje" title="Objetivos del módulo">
          <ObjectivesList objectives={mod.objectives} color={mod.color} />
        </Section>

        {mod.competencies && mod.competencies.length > 0 && (
          <Section
            label="Competencias medibles"
            title="Qué sabrás hacer al terminar"
            description="Una competencia estrella y dos de soporte, con evidencia concreta y medición antes/después del curso."
          >
            <Competencies competencies={mod.competencies} color={mod.color} />
          </Section>
        )}

        <Section label="Mapa conceptual" title="Estructura del conocimiento">
          <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", backgroundColor: "#FFFFFF", padding: "16px", overflow: "hidden" }}>
            <MindMap root={mod.mindMap} />
          </div>
        </Section>

        <Section label="Terminología" title="Conceptos clave" description="Haz clic en cada término para expandir su definición.">
          <ConceptGrid concepts={mod.concepts} color={mod.color} />
        </Section>

        {mod.timeline && mod.timeline.length > 0 && (
          <Section label="Historia" title="Línea de tiempo">
            <Timeline items={mod.timeline} color={mod.color} />
          </Section>
        )}

        {mod.norms && mod.norms.length > 0 && (
          <Section label="Marco legal" title="Normativa clave">
            <NormCards norms={mod.norms} color={mod.color} />
          </Section>
        )}

        {mod.metrics && mod.metrics.length > 0 && (
          <Section label="Indicadores" title="KPIs del sector">
            <MetricsGrid metrics={mod.metrics} />
          </Section>
        )}

        {mod.slug === "jurimetria-auditoria" && (
          <Section label="Estadística aplicada" title="Visualizaciones cuantitativas" description="Análisis bayesiano y métricas predictivas. Intervalos de credibilidad al 95%.">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <StatsBarChart title="Precisión de modelos legales" subtitle="Rendimiento comparativo"
                  data={[
                    { label: "Clasificación", value: 87, color: mod.color },
                    { label: "Predicción", value: 74, color: mod.color },
                    { label: "NER", value: 91, color: mod.color },
                    { label: "Contratos", value: 83, color: mod.color },
                  ]}
                  color={mod.color} height={180}
                />
                <GaugeGrid title="Equidad algorítmica" color={mod.color}
                  gauges={[
                    { value: 87, label: "AUC", color: mod.color },
                    { value: 73, label: "Equidad", color: "#16A34A" },
                    { value: 91, label: "Precisión", color: "#1E3A8A" },
                  ]}
                />
              </div>
              <BayesianDistribution mean={0.72} label="Probabilidad posterior de éxito en litigio" color="#7C3AED" width={600} height={140} priorMean={0.55} />
            </div>
          </Section>
        )}

        {mod.slug === "ia-aplicada-derecho" && (
          <Section label="Validación de modelos" title="Métricas de calidad IA">
            <GaugeGrid color={mod.color}
              gauges={[
                { value: 82, label: "Precisión", color: mod.color, subtitle: "del modelo" },
                { value: 88, label: "AUC-ROC", color: mod.color, subtitle: "curva ROC" },
                { value: 64, label: "Explicabilidad", color: "#CA8A04", subtitle: "XAI score" },
                { value: 91, label: "Transparencia", color: "#16A34A", subtitle: "auditoría" },
              ]}
            />
          </Section>
        )}

        {mod.slug === "integracion-practica" && (
          <Section label="Gestión de riesgos" title="Matriz de riesgos">
            <RiskMatrix items={[
              { label: "Cumplimiento SARLAFT", risk: "alto", val: 78 },
              { label: "Suplantación de identidad", risk: "alto", val: 85 },
              { label: "Brecha de datos personales", risk: "medio", val: 52 },
              { label: "Documentación incompleta", risk: "medio", val: 45 },
              { label: "Error de integración API", risk: "bajo", val: 22 },
              { label: "Desactualización normativa", risk: "bajo", val: 18 },
            ]} />
          </Section>
        )}

        {mod.process && mod.process.length > 0 && (
          <Section label="Implementación" title="Proceso paso a paso">
            <ProcessSteps steps={mod.process} color={mod.color} />
          </Section>
        )}

        {mod.challenges && mod.challenges.length > 0 && (
          <Section label="Panorama de riesgos" title="Desafíos y oportunidades">
            <ChallengeAccordion challenges={mod.challenges} />
          </Section>
        )}

        {mod.pedagogy?.acts && mod.pedagogy.acts.length > 0 && (
          <Section
            label="Método Desmontando la Caja Negra"
            title="Los tres actos pedagógicos"
            description="Cada sesión se vive en tres tiempos: fundamento con analogía física, ejecución con demo en vivo y dilema forzado con decisión escrita."
          >
            <PedagogicalActs acts={mod.pedagogy.acts} color={mod.color} />
          </Section>
        )}

        {mod.pedagogy?.dilemma && (
          <Section
            label="Acto III · Dilema forzado"
            title="Decisión bajo presión"
            description="Un caso real con restricción clara y tres opciones que cuestan algo. La tarea no es debatir: es escribir un entregable que asuma la decisión."
          >
            <Dilemma dilemma={mod.pedagogy.dilemma} color={mod.color} />
          </Section>
        )}

        {mod.pedagogy?.dialogue && mod.pedagogy.dialogue.length > 0 && (
          <Section
            label="Diálogo entre trincheras"
            title="Preguntas que abren conversación"
            description="Preguntas diseñadas para forzar el encuentro entre abogado y developer. Haz clic para ver por dónde suele aterrizar la respuesta."
          >
            <DisruptiveDialogue questions={mod.pedagogy.dialogue} color={mod.color} />
          </Section>
        )}

        {mod.pedagogy?.humanFocus && (
          <Section
            label="Cierre humano"
            title="Justicia centrada en la persona"
          >
            <HumanFocus text={mod.pedagogy.humanFocus} color={mod.color} />
          </Section>
        )}

        <AnimateIn className="mb-12">
          <div style={{ borderLeft: `2px solid ${mod.color}70`, paddingLeft: "20px" }}>
            <p style={{ fontSize: "15px", color: "#3F3F46", lineHeight: 1.7, fontStyle: "italic", marginBottom: "10px" }}>
              &ldquo;{mod.quote}&rdquo;
            </p>
            {mod.quoteAuthor && (
              <p style={{ fontSize: "12px", color: "#A1A1AA" }}>— {mod.quoteAuthor}</p>
            )}
          </div>
        </AnimateIn>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 14px", borderRadius: "6px", backgroundColor: "rgba(202,138,4,0.04)", border: "1px solid rgba(202,138,4,0.14)", marginBottom: "40px" }}>
          <Icon name="exclamation" size={13} color="#CA8A04" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "12px", color: "#92400E", lineHeight: 1.65 }}>
            <strong style={{ fontWeight: 600 }}>Nota legal:</strong>{" "}
            Material educativo. No constituye asesoría legal. Normativa colombiana vigente al 1 de marzo de 2025.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {prevMod ? (
            <Link href={`/modulo/${prevMod.slug}`} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", textDecoration: "none", flex: 1, minWidth: "180px" }}>
              <Icon name="arrow-left" size={13} color="#A1A1AA" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "10px", color: "#A1A1AA", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>Anterior</p>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#111118" }}>{prevMod.title}</p>
              </div>
            </Link>
          ) : (
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", textDecoration: "none", flex: 1, minWidth: "180px" }}>
              <Icon name="arrow-left" size={13} color="#A1A1AA" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "10px", color: "#A1A1AA", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>Volver al</p>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#111118" }}>Inicio del curso</p>
              </div>
            </Link>
          )}

          {nextMod && (
            <Link href={`/modulo/${nextMod.slug}`} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", padding: "14px 16px", backgroundColor: nextMod.color, borderRadius: "8px", textDecoration: "none", flex: 1, minWidth: "180px" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>Siguiente</p>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>{nextMod.title}</p>
              </div>
              <Icon name="arrow-right" size={13} color="rgba(255,255,255,0.75)" style={{ flexShrink: 0 }} />
            </Link>
          )}
        </div>

      </div>
    </CourseShell>
  );
}
