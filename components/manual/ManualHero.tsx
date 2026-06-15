"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import type { Manual } from "@/data/manuals";

/**
 * ManualHero — encabezado de portada de un manual.
 * Banda de color superior, título, subtítulo, para quién, tiempo
 * de lectura, cita inicial y tags.
 */
export function ManualHero({ manual }: { manual: Manual }) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "32px",
      }}
    >
      {/* Accent bar */}
      <div style={{ height: "3px", backgroundColor: manual.color, opacity: 0.8 }} />

      <div style={{ padding: "30px 30px 26px" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
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
            Manual de práctica · LegalTech Colombia
          </p>

          {/* Icon + Title */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: manual.color,
                backgroundColor: `${manual.color}0D`,
                border: `1px solid ${manual.color}1F`,
              }}
            >
              <Icon name={manual.icon} size={20} />
            </span>
            <div>
              <h1
                style={{
                  fontSize: "clamp(1.45rem, 3vw, 1.9rem)",
                  fontWeight: 700,
                  color: "#111118",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  marginBottom: "4px",
                  maxWidth: "640px",
                }}
              >
                {manual.title}
              </h1>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "#64748B",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  maxWidth: "640px",
                }}
              >
                {manual.subtitle}
              </p>
            </div>
          </div>

          {/* Summary */}
          <p
            style={{
              fontSize: "14.5px",
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: "680px",
              marginBottom: "18px",
            }}
          >
            {manual.summary}
          </p>

          {/* Meta line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#64748B",
              }}
            >
              <Icon name="people" size={12} />
              {manual.forWho}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#64748B",
              }}
            >
              <Icon name="clock" size={12} />
              Lectura: {manual.readingTime}
            </span>
          </div>

          {/* Quote */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "10px",
              backgroundColor: `${manual.color}06`,
              border: `1px solid ${manual.color}18`,
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                color: manual.color,
                flexShrink: 0,
                marginTop: "3px",
              }}
            >
              <Icon name="speech" size={14} />
            </span>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "#334155",
                lineHeight: 1.65,
                letterSpacing: "-0.005em",
              }}
            >
              “{manual.principleQuote}”
              {manual.principleAuthor && (
                <span
                  style={{
                    color: "#94A3B8",
                    fontStyle: "normal",
                    marginLeft: "6px",
                  }}
                >
                  — {manual.principleAuthor}
                </span>
              )}
            </p>
          </div>

          {/* Guiding principles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {manual.guidingPrinciples.map((p) => (
              <div
                key={p.label}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0,0,0,0.02)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ display: "inline-flex", color: manual.color }}>
                    <Icon name={p.icon} size={14} />
                  </span>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0F172A",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {p.label}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#475569",
                    lineHeight: 1.55,
                  }}
                >
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {manual.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "20px",
              }}
            >
              {manual.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    padding: "3px 9px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(0,0,0,0.04)",
                    color: "#71717A",
                    border: "1px solid rgba(0,0,0,0.07)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
