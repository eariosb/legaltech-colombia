import { blogPosts } from "@/data/blog";
import { CourseShell } from "@/components/layout/CourseShell";
import { BlogCard } from "@/components/blog/BlogCard";
import type { Category, RiskLevel } from "@/data/blog";

export const metadata = {
  title: "Casos de Interés | LegalTech Colombia",
  description:
    "Análisis de casos reales que ilustran los desafíos y oportunidades del movimiento LegalTech en Colombia y el mundo.",
};

const CATEGORIES = Array.from(new Set(blogPosts.map((p) => p.category))) as Category[];
const RISK_LABELS: Record<RiskLevel, string> = {
  alto: "Riesgo Alto",
  medio: "Riesgo Medio",
  bajo: "Riesgo Bajo",
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <CourseShell>
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh" }}>

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section style={{ padding: "72px 40px 48px", maxWidth: "860px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#A1A1AA",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Blog · LegalTech Colombia
          </p>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#111118",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: "14px",
              maxWidth: "600px",
            }}
          >
            Casos de Interés
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#71717A",
              lineHeight: 1.65,
              maxWidth: "620px",
              marginBottom: "0",
            }}
          >
            Análisis de casos reales que muestran cómo el cambio tecnológico redefine
            el ejercicio del derecho, desde brechas de seguridad hasta nuevas formas de
            contratar, juzgar y regular en Colombia, y el mundo.
          </p>
        </section>

        {/* ── DIVIDER ────────────────────────────────────────────── */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(0,0,0,0.07)",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        />

        {/* ── STATS BAR ──────────────────────────────────────────── 
        <section style={{ padding: "20px 40px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
            {[
              { label: "Casos publicados", value: blogPosts.length.toString() },
              { label: "Categorías", value: CATEGORIES.length.toString() },
              {
                label: "Riesgo alto",
                value: blogPosts.filter((p) => p.riskLevel === "alto").length.toString(),
              },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111118",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "11px", color: "#A1A1AA" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>*/}

        {/* ── DIVIDER ────────────────────────────────────────────── */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(0,0,0,0.07)",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        />

        {/* ── FEATURED CASE ──────────────────────────────────────── */}
        {featured && (
          <section style={{ padding: "40px 40px 0", maxWidth: "860px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#A1A1AA",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                marginBottom: "14px",
              }}
            >
              Caso destacado
            </p>
            <BlogCard post={featured} variant="featured" />
          </section>
        )}

        {/* ── ALL CASES GRID ─────────────────────────────────────── */}
        {rest.length > 0 && (
          <section style={{ padding: "40px 40px 80px", maxWidth: "860px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#A1A1AA",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                marginBottom: "16px",
              }}
            >
              Más casos
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "12px",
              }}
            >
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── EMPTY STATE if only 1 case ─────────────────────────── */}
        {rest.length === 0 && (
          <section
            style={{ padding: "40px 40px 80px", maxWidth: "860px", margin: "0 auto" }}
          >
            <div
              style={{
                padding: "32px",
                borderRadius: "10px",
                border: "1px dashed rgba(0,0,0,0.12)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#A1A1AA",
                  lineHeight: 1.6,
                  maxWidth: "380px",
                  margin: "0 auto",
                }}
              >
                Más casos en camino. Los redactores pueden seguir el{" "}
                <strong style={{ color: "#71717A" }}>FORMATO_CASO_BLOG.txt</strong> para
                agregar nuevos análisis a esta sección.
              </p>
            </div>
          </section>
        )}

        {/* ── FOOTER NOTE ────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            padding: "20px 40px",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", color: "#A1A1AA", lineHeight: 1.6 }}>
              Los análisis de este blog son material educativo. No constituyen asesoría legal.
              Normativa colombiana vigente al 1 de marzo de 2025.
            </p>
          </div>
        </footer>
      </div>
    </CourseShell>
  );
}
