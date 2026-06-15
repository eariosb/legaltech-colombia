import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, type RiskLevel } from "@/data/blog";
import { CourseShell } from "@/components/layout/CourseShell";
import { Icon } from "@/components/icons/Icon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Caso no encontrado" };
  return {
    title: `${post.title} | Casos de Interés LegalTech`,
    description: post.excerpt,
  };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const RISK_META: Record<RiskLevel, { label: string; color: string }> = {
  alto: { label: "Riesgo Alto", color: "#EF4444" },
  medio: { label: "Riesgo Medio", color: "#F59E0B" },
  bajo: { label: "Riesgo Bajo", color: "#10B981" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Sub-components ──────────────────────────────────────────────────────── */
function SectionBlock({
  number,
  label,
  title,
  content,
  bullets,
  color,
}: {
  number: string;
  label: string;
  title: string;
  content: string;
  bullets?: string[];
  color: string;
}) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div style={{ marginBottom: "40px" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          paddingBottom: "12px",
          marginBottom: "16px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {/* Number chip */}
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            backgroundColor: `${color}12`,
            border: `1px solid ${color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 700,
            color: color,
            fontVariantNumeric: "tabular-nums",
            marginTop: "2px",
          }}
        >
          {number}
        </span>

        <div>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#A1A1AA",
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              marginBottom: "3px",
            }}
          >
            {label}
          </p>
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "#111118",
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Paragraphs */}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: "15px",
            color: "#3F3F46",
            lineHeight: 1.75,
            marginBottom: "12px",
          }}
        >
          {p}
        </p>
      ))}

      {/* Bullets */}
      {bullets && bullets.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: "8px" }}>
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "#F9F9F8",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  marginTop: "7px",
                }}
              />
              <span style={{ fontSize: "14px", color: "#3F3F46", lineHeight: 1.65 }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TimelineBlock({
  items,
  color,
}: {
  items: { date: string; event: string }[];
  color: string;
}) {
  return (
    <div style={{ position: "relative", paddingLeft: "20px" }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: "6px",
          top: "8px",
          bottom: "8px",
          width: "1px",
          backgroundColor: `${color}30`,
        }}
      />

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            paddingBottom: i < items.length - 1 ? "20px" : "0",
          }}
        >
          {/* Dot */}
          <div
            style={{
              position: "absolute",
              left: "-17px",
              top: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: color,
              border: `2px solid #FAFAF9`,
            }}
          />

          {/* Content */}
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: color,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: "4px",
              }}
            >
              {item.date}
            </p>
            <p style={{ fontSize: "13px", color: "#3F3F46", lineHeight: 1.6 }}>
              {item.event}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = blogPosts[postIndex - 1] ?? null;
  const nextPost = blogPosts[postIndex + 1] ?? null;

  const risk = RISK_META[post.riskLevel];

  /* Split sections: extract the timeline section (06) to render Timeline component */
  const timelineSection = post.sections.find((s) => s.number === "06");
  const otherSections = post.sections.filter((s) => s.number !== "06");

  return (
    <CourseShell>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── Back link ─────────────────────────────────────────── */}
        <div style={{ paddingTop: "40px", marginBottom: "32px" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#A1A1AA",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            <Icon name="arrow-left" size={12} color="#A1A1AA" />
            Casos de Interés
          </Link>
        </div>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <header style={{ marginBottom: "40px" }}>
          {/* Category + Risk */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: post.color,
                backgroundColor: `${post.color}10`,
                border: `1px solid ${post.color}22`,
                padding: "3px 9px",
                borderRadius: "5px",
              }}
            >
              {post.category}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: risk.color,
                backgroundColor: `${risk.color}0D`,
                padding: "3px 9px",
                borderRadius: "5px",
              }}
            >
              {risk.label}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
              fontWeight: 800,
              color: "#111118",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              marginBottom: "12px",
            }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "16px",
              color: "#71717A",
              lineHeight: 1.6,
              marginBottom: "20px",
              fontStyle: "italic",
            }}
          >
            {post.subtitle}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              paddingBottom: "20px",
              borderBottom: `2px solid ${post.color}`,
            }}
          >
            <span style={{ fontSize: "12px", color: "#A1A1AA" }}>
              {formatDate(post.date)}
            </span>
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{ fontSize: "11px", color: "#A1A1AA" }}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── EXCERPT CARD ──────────────────────────────────────── */}
        <div
          style={{
            padding: "18px 20px",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
            borderLeft: `3px solid ${post.color}`,
            marginBottom: "40px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#A1A1AA",
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              marginBottom: "8px",
            }}
          >
            Resumen rápido
          </p>
          <p style={{ fontSize: "14px", color: "#3F3F46", lineHeight: 1.7 }}>
            {post.excerpt}
          </p>
        </div>

        {/* ── CONTENT SECTIONS ──────────────────────────────────── */}
        {otherSections.map((section) => (
          <SectionBlock
            key={section.number}
            number={section.number}
            label={section.label}
            title={section.title}
            content={section.content}
            bullets={section.bullets}
            color={post.color}
          />
        ))}

        {/* ── TIMELINE ──────────────────────────────────────────── */}
        {post.timeline && post.timeline.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            {/* Section header (reuse pattern from timelineSection if exists) */}
            <div
              style={{
                paddingBottom: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  backgroundColor: `${post.color}12`,
                  border: `1px solid ${post.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: post.color,
                  marginTop: "2px",
                }}
              >
                {timelineSection?.number ?? "06"}
              </span>
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#A1A1AA",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    marginBottom: "3px",
                  }}
                >
                  {timelineSection?.label ?? "Cronología"}
                </p>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#111118",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.25,
                  }}
                >
                  {timelineSection?.title ?? "Cronología del ataque"}
                </h2>
              </div>
            </div>
            <TimelineBlock items={post.timeline} color={post.color} />
          </div>
        )}

        {/* ── KEY TAKEAWAYS ─────────────────────────────────────── */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                paddingBottom: "12px",
                marginBottom: "16px",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#A1A1AA",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  marginBottom: "3px",
                }}
              >
                Conclusiones clave
              </p>
              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#111118",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.25,
                }}
              >
                Qué nos deja este caso
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {post.keyTakeaways.map((takeaway, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: `${post.color}12`,
                      border: `1px solid ${post.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: post.color,
                      marginTop: "1px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p style={{ fontSize: "14px", color: "#3F3F46", lineHeight: 1.65 }}>
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LEGAL FRAMEWORK ───────────────────────────────────── */}
        {post.legalFramework && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(30,58,138,0.04)",
              border: "1px solid rgba(30,58,138,0.12)",
              marginBottom: "32px",
            }}
          >
            <Icon name="shield" size={14} color="#1E3A8A" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#1E3A8A",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                Marco normativo
              </p>
              <p style={{ fontSize: "13px", color: "#1E3A8A", lineHeight: 1.65, opacity: 0.85 }}>
                {post.legalFramework}
              </p>
            </div>
          </div>
        )}

        {/* ── SOURCES ───────────────────────────────────────────── */}
        {post.sources && post.sources.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#A1A1AA",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                marginBottom: "10px",
              }}
            >
              Fuentes
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
              {post.sources.map((src, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: "#71717A",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#A1A1AA", marginTop: "1px" }}>—</span>
                  {src}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── DISCLAIMER ────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "6px",
            backgroundColor: "rgba(202,138,4,0.04)",
            border: "1px solid rgba(202,138,4,0.14)",
            marginBottom: "40px",
          }}
        >
          <Icon name="exclamation" size={13} color="#CA8A04" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "12px", color: "#92400E", lineHeight: 1.65 }}>
            <strong style={{ fontWeight: 600 }}>Nota legal:</strong>{" "}
            Material educativo. No constituye asesoría legal. Normativa colombiana vigente
            al 1 de marzo de 2025. Consulte con un profesional habilitado para decisiones jurídicas.
          </p>
        </div>

        {/* ── NAVIGATION ────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {/* Back to blog */}
          <Link
            href="/blog"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              textDecoration: "none",
              flex: 1,
              minWidth: "160px",
            }}
          >
            <Icon name="arrow-left" size={13} color="#A1A1AA" style={{ flexShrink: 0 }} />
            <div>
              <p
                style={{
                  fontSize: "10px",
                  color: "#A1A1AA",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: "2px",
                }}
              >
                Volver a
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#111118" }}>
                Casos de Interés
              </p>
            </div>
          </Link>

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                padding: "14px 16px",
                backgroundColor: nextPost.color,
                borderRadius: "8px",
                textDecoration: "none",
                flex: 1,
                minWidth: "160px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: "2px",
                  }}
                >
                  Siguiente caso
                </p>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>
                  {nextPost.title}
                </p>
              </div>
              <Icon name="arrow-right" size={13} color="rgba(255,255,255,0.75)" style={{ flexShrink: 0 }} />
            </Link>
          )}
        </div>
      </div>
    </CourseShell>
  );
}
