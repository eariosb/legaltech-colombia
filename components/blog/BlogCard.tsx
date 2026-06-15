import Link from "next/link";
import type { BlogPost, RiskLevel } from "@/data/blog";

/* ── Risk badge colours ─────────────────────────────────────────────────── */
const RISK_META: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  alto: { label: "Riesgo Alto", color: "#EF4444", bg: "rgba(239,68,68,0.07)" },
  medio: { label: "Riesgo Medio", color: "#F59E0B", bg: "rgba(245,158,11,0.07)" },
  bajo: { label: "Riesgo Bajo", color: "#10B981", bg: "rgba(16,185,129,0.07)" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const risk = RISK_META[post.riskLevel];
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "block" }}
      className="blog-card-link"
    >
      <article
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "10px",
          padding: isFeatured ? "24px" : "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: isFeatured ? "14px" : "10px",
          transition: "box-shadow 150ms ease, border-color 150ms ease, transform 150ms ease",
          cursor: "pointer",
          height: "100%",
          borderLeft: `3px solid ${post.color}`,
        }}
        className="blog-card-article"
      >
        {/* ── Top row: category + risk ───────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Category chip */}
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: post.color,
              backgroundColor: `${post.color}10`,
              border: `1px solid ${post.color}22`,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {post.category}
          </span>

          {/* Risk badge */}
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: risk.color,
              backgroundColor: risk.bg,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {risk.label}
          </span>
        </div>

        {/* ── Title ─────────────────────────────────────────────── */}
        <div>
          <h3
            style={{
              fontSize: isFeatured ? "17px" : "14px",
              fontWeight: 600,
              color: "#111118",
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
              marginBottom: "6px",
            }}
          >
            {post.title}
          </h3>
          {isFeatured && (
            <p
              style={{
                fontSize: "13px",
                color: "#71717A",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* ── Tags ──────────────────────────────────────────────── */}
        {post.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {post.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  color: "#A1A1AA",
                  backgroundColor: "#F3F4F6",
                  padding: "2px 7px",
                  borderRadius: "4px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer: date ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "6px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "11px", color: "#A1A1AA" }}>
            {formatDate(post.date)}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: post.color,
            }}
          >
            Leer caso →
          </span>
        </div>
      </article>

      <style>{`
        .blog-card-article:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          border-color: rgba(0,0,0,0.12);
          transform: translateY(-1px);
        }
      `}</style>
    </Link>
  );
}
