"use client";
import { Icon } from "@/components/icons/Icon";
import type { Competency } from "@/data/course";
import { AnimateIn } from "@/components/legal-ui";

interface CompetenciesProps {
  competencies: Competency[];
  color?: string;
}

/**
 * Competencies — qué sabe hacer el estudiante al terminar el módulo.
 * Una competencia estrella (principal) y dos de soporte. Cada una declara
 * evidencia concreta y la métrica pre/post del aprendizaje.
 */
export function Competencies({
  competencies,
  color = "#1E3A8A",
}: CompetenciesProps) {
  const star = competencies.find((c) => c.role === "star");
  const supports = competencies.filter((c) => c.role === "support");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {star && (
        <AnimateIn>
          <div
            style={{
              position: "relative",
              padding: "22px 24px",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${color}22`,
              overflow: "hidden",
            }}
          >
            {/* Accent corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${color}, ${color}66)`,
              }}
            />

            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div
                style={{
                  flexShrink: 0,
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  backgroundColor: `${color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="star" size={16} color={color} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}
                >
                  Competencia estrella
                </p>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#0F172A",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                    marginBottom: "10px",
                  }}
                >
                  {star.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                    lineHeight: 1.7,
                    marginBottom: "14px",
                  }}
                >
                  {star.definition}
                </p>

                <div
                  style={{
                    padding: "10px 12px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    fontSize: "13px",
                    color: "#475569",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginRight: "8px",
                    }}
                  >
                    Evidencia
                  </span>
                  {star.evidence}
                </div>

                <MetricRow metric={star.metric} color={color} />
              </div>
            </div>
          </div>
        </AnimateIn>
      )}

      {supports.length > 0 && (
        <AnimateIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px",
            }}
          >
            {supports.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      backgroundColor: `${color}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="target" size={12} color={color} />
                  </div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Competencia de soporte
                  </p>
                </div>

                <h5
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F172A",
                    lineHeight: 1.45,
                    letterSpacing: "-0.005em",
                    marginBottom: "8px",
                  }}
                >
                  {c.title}
                </h5>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    lineHeight: 1.65,
                    marginBottom: "10px",
                  }}
                >
                  {c.definition}
                </p>

                <div
                  style={{
                    padding: "8px 10px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    fontSize: "12px",
                    color: "#52525B",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginRight: "6px",
                    }}
                  >
                    Evidencia
                  </span>
                  {c.evidence}
                </div>

                <MetricRow metric={c.metric} color={color} compact />
              </div>
            ))}
          </div>
        </AnimateIn>
      )}
    </div>
  );
}

function MetricRow({
  metric,
  color,
  compact = false,
}: {
  metric: Competency["metric"];
  color: string;
  compact?: boolean;
}) {
  const font = compact ? "12px" : "13px";
  const pad = compact ? "8px 10px" : "10px 12px";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "stretch",
        gap: "8px",
      }}
    >
      <div
        style={{
          padding: pad,
          backgroundColor: "rgba(185, 28, 28, 0.05)",
          borderRadius: "7px",
          border: "1px solid rgba(185, 28, 28, 0.1)",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            fontWeight: 600,
            color: "#991B1B",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "3px",
          }}
        >
          Antes
        </p>
        <p
          style={{
            fontSize: font,
            color: "#7F1D1D",
            lineHeight: 1.5,
          }}
        >
          {metric.before}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          opacity: 0.5,
        }}
      >
        <Icon name="arrow-right" size={16} />
      </div>

      <div
        style={{
          padding: pad,
          backgroundColor: "rgba(15, 118, 110, 0.05)",
          borderRadius: "7px",
          border: "1px solid rgba(15, 118, 110, 0.12)",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            fontWeight: 600,
            color: "#115E59",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "3px",
          }}
        >
          Después
        </p>
        <p
          style={{
            fontSize: font,
            color: "#134E4A",
            lineHeight: 1.5,
          }}
        >
          {metric.after}
        </p>
      </div>
    </div>
  );
}
