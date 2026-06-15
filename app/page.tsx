import Link from "next/link";
import { modules, courseInfo } from "@/data/course";
import { manuals } from "@/data/manuals";
import { CourseShell } from "@/components/layout/CourseShell";
import { ModuleCard } from "@/components/course/ModuleCard";
import { ManualCard } from "@/components/manual/ManualCard";
import { Icon } from "@/components/icons/Icon";

const features = [
  {
    label: "Inteligencia Artificial",
    desc: "LLMs, RAG y jurimetría. Modelos de lenguaje aplicados al análisis jurídico y recuperación aumentada de información legal.",
  },
  {
    label: "Marco normativo",
    desc: "Ley 527/1999, Decreto 806/2020, Circular SIC 002/2024 y toda la normativa que regula el LegalTech en Colombia.",
  },
  {
    label: "Análisis cuantitativo",
    desc: "Métricas de equidad, intervalos de credibilidad bayesianos, auditoría algorítmica y diferenciación estadística de marcas.",
  },
];

export default function Home() {
  return (
    <CourseShell>
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh" }}>

        {/* ── HERO ────────────────────────────────────────── */}
        <section style={{ padding: "72px 40px 64px", maxWidth: "860px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <p style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#A1A1AA",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            Curso · Colombia · 2026
          </p>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 900,
            color: "#111118",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            marginBottom: "20px",
            maxWidth: "680px",
          }}>
            LegalTech Co.
          </h1>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 700,
            color: "#111118",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            marginBottom: "20px",
            maxWidth: "680px",
          }}>
            Transformación Digital Legal
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: "17px",
            color: "#71717A",
            lineHeight: 1.6,
            maxWidth: "720px",
            marginBottom: "36px",
            fontWeight: 400,
          }}>
            {courseInfo.description}
          </p>

          {/* Meta */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
          }}>
            {[
              `${courseInfo.totalModules} módulos`,
              courseInfo.duration,
              courseInfo.level,
            ].map((item) => (
              <span key={item} style={{ fontSize: "13px", color: "#A1A1AA" }}>
                {item}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href="/modulo/panorama-legaltech"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                backgroundColor: "#111118",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "background 150ms ease",
              }}
              className="hover-btn-primary"
            >
              Comenzar el curso
              <Icon name="arrow-right" size={14} />
            </Link>
            <Link
              href="#modulos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 15px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                backgroundColor: "transparent",
                color: "#71717A",
                textDecoration: "none",
                border: "1px solid rgba(0,0,0,0.1)",
                transition: "border-color 150ms ease, color 150ms ease",
              }}
            >
              Ver módulos
            </Link>
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────── */}
        <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.07)", maxWidth: "860px", margin: "0 auto 0" }} />

        {/* ── PROBLEM STATEMENT ───────────────────────────── */}
        {courseInfo.problemStatement && (
          <section style={{ padding: "56px 40px 20px", maxWidth: "860px", margin: "0 auto" }}>
            <div
              style={{
                padding: "24px 26px",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                borderLeft: "3px solid #B91C1C",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#B91C1C",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "10px",
                }}
              >
                El problema que atendemos
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#1F2937",
                  lineHeight: 1.7,
                  letterSpacing: "-0.005em",
                }}
              >
                {courseInfo.problemStatement}
              </p>
            </div>
          </section>
        )}

        {/* ── FEATURES ────────────────────────────────────── */}
        <section style={{ padding: "36px 40px 56px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
          }}>
            {features.map((f) => (
              <div key={f.label}>
                <p style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111118",
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}>
                  {f.label}
                </p>
                <p style={{ fontSize: "13px", color: "#71717A", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────── */}
        <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.07)", maxWidth: "860px", margin: "0 auto 0" }} />

        {/* ── MODULES ─────────────────────────────────────── */}
        <section id="modulos" style={{ padding: "56px 40px 80px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
            <div>
              <p style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#A1A1AA",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                Contenido del curso
              </p>
              <h2 style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#111118",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}>
                {courseInfo.totalModules} módulos
              </h2>
            </div>
            <span style={{ fontSize: "12px", color: "#A1A1AA" }}>{courseInfo.duration}</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "12px",
          }}>
            {modules.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} />
            ))}
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────── */}
        <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.07)", maxWidth: "860px", margin: "0 auto 0" }} />

        {/* ── MANUALES DE PRÁCTICA ────────────────────────── */}
        <section id="manuales" style={{ padding: "56px 40px 80px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#A1A1AA",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                Material complementario
              </p>
              <h2 style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#111118",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}>
                Manuales de práctica
              </h2>
            </div>
            <Link
              href="/manuales"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#111118",
                textDecoration: "none",
              }}
            >
              Ver los dos manuales
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>

          <p style={{
            fontSize: "14px",
            color: "#71717A",
            lineHeight: 1.7,
            maxWidth: "620px",
            marginBottom: "24px",
          }}>
            Dos caras de la misma competencia: cómo se construye un producto LegalTech sin perder precisión jurídica, y cómo se ejerce la abogacía cuando la tecnología es el medio para la acción.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
          }}>
            {manuals.map((m) => (
              <ManualCard key={m.slug} manual={m} />
            ))}
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          backgroundColor: "#FFFFFF",
          padding: "24px 40px",
        }}>
          <div style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <p style={{ fontSize: "11px", color: "#A1A1AA", maxWidth: "480px", lineHeight: 1.6 }}>
              Material de apoyo educativo. No constituye asesoría legal.
              Si requiere una consulta con un profesional habilitado para decisiones jurídicas, puedde contáctar nuestros abogados.
              <span style={{ color: "#C4C4C4" }}> · Normativa vigente al 01/03/2026</span>
            </p>
            <p style={{ fontSize: "11px", color: "#A1A1AA", fontWeight: 500 }}>
              LegalTech Colombia · 2026
            </p>
          </div>
        </footer>
      </div>
    </CourseShell>
  );
}
