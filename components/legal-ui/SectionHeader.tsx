import type { ReactNode, ComponentType } from "react";

interface SectionHeaderProps {
  title: string;
  label?: string;
  description?: string;
  icon?: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
  className?: string;
  kpi?: { value: string; unit: string };
}

/**
 * Linear-style section header.
 * Text-only hierarchy — eyebrow label + title + optional description.
 * 1px border-bottom separator, no icon badges or colored backgrounds.
 */
export function SectionHeader({
  title,
  label,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={className}
      style={{ paddingBottom: "16px", marginBottom: "20px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
    >
      {label && (
        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#A1A1AA",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          marginBottom: "5px",
        }}>
          {label}
        </p>
      )}
      <h2 style={{
        fontSize: "18px",
        fontWeight: 600,
        color: "#111118",
        letterSpacing: "-0.015em",
        lineHeight: 1.25,
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: "13px",
          color: "#71717A",
          lineHeight: 1.65,
          marginTop: "6px",
          maxWidth: "560px",
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
