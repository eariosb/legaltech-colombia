"use client";
import { MetricCard } from "@/data/course";

interface MetricsGridProps {
  metrics: MetricCard[];
}

const dotColors: Record<string, string> = {
  emerald: "#16A34A",
  amber:   "#CA8A04",
  rose:    "#DC2626",
  violet:  "#7C3AED",
  sky:     "#1E3A8A",
};

/**
 * Linear-style KPI grid.
 * White cards, 1px border, no colored backgrounds.
 * Number in primary text, label in secondary, description in muted.
 */
export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "10px",
    }}>
      {metrics.map((m, i) => {
        const dot = dotColors[m.color] ?? dotColors.sky;
        return (
          <div
            key={i}
            style={{
              padding: "16px 18px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              transition: "border-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.08)"; }}
          >
            {/* Value */}
            <p style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111118",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "4px",
            }}>
              {m.value}
            </p>

            {/* Label */}
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#3F3F46", marginBottom: "8px" }}>
              {m.label}
            </p>

            {/* Description */}
            <p style={{ fontSize: "12px", color: "#A1A1AA", lineHeight: 1.6 }}>
              {m.description}
            </p>

            {/* Bottom accent dot */}
            <div style={{
              marginTop: "12px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: dot,
              opacity: 0.7,
            }} />
          </div>
        );
      })}
    </div>
  );
}
