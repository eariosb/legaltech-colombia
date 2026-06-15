"use client";
import { useState } from "react";
import { LegalNorm } from "@/data/course";

interface NormCardsProps {
  norms: LegalNorm[];
  color?: string;
}

/**
 * Linear-style norm browser.
 * Left tab list + detail panel, no gradients or heavy fills.
 */
export function NormCards({ norms, color = "#1E3A8A" }: NormCardsProps) {
  const [active, setActive] = useState(0);
  const norm = norms[active];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px" }}>
      {/* Tab list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {norms.map((n, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "#111118" : "#71717A",
                backgroundColor: isActive ? "rgba(0,0,0,0.05)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 150ms ease, color 150ms ease",
                lineHeight: 1.35,
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {n.name}
            </button>
          );
        })}
      </div>

      {/* Detail */}
      {norm && (
        <div style={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}>
          <div style={{
            padding: "16px 18px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: "4px" }}>
              Normativa colombiana
            </p>
            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#111118", letterSpacing: "-0.01em" }}>
              {norm.name}
            </h4>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: "13px", color: "#71717A", lineHeight: 1.7, marginBottom: "16px" }}>
              {norm.description}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {/* Scope */}
              <div style={{
                padding: "12px 14px",
                borderRadius: "6px",
                backgroundColor: "rgba(0,0,0,0.025)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                  Ámbito
                </p>
                <p style={{ fontSize: "12px", color: "#3F3F46", lineHeight: 1.6 }}>{norm.scope}</p>
              </div>
              {/* Impact */}
              <div style={{
                padding: "12px 14px",
                borderRadius: "6px",
                backgroundColor: `${color}06`,
                border: `1px solid ${color}14`,
              }}>
                <p style={{ fontSize: "10px", fontWeight: 600, color: color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", opacity: 0.7 }}>
                  Impacto LegalTech
                </p>
                <p style={{ fontSize: "12px", color: "#3F3F46", lineHeight: 1.6 }}>{norm.impact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
