import type { ReactNode } from "react";

type RiskLevel = "alto" | "medio" | "bajo" | "info" | "cumplimiento";

interface RiskBadgeProps {
  level: RiskLevel;
  children?: ReactNode;
  size?: "xs" | "sm";
}

const config: Record<RiskLevel, { label: string; className: string }> = {
  alto: {
    label: "Riesgo alto",
    className: "risk-badge-high",
  },
  medio: {
    label: "Riesgo medio",
    className: "risk-badge-medium",
  },
  bajo: {
    label: "Riesgo bajo",
    className: "risk-badge-low",
  },
  info: {
    label: "Info",
    className: "risk-badge-info",
  },
  cumplimiento: {
    label: "Cumplimiento clave",
    className: "risk-badge-low",
  },
};

const sizes = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-2.5 py-1 text-xs",
};

/**
 * Subtle ring-style risk badge per the LegalTech spec.
 * Uses soft background + ring, no heavy fills.
 */
export function RiskBadge({ level, children, size = "sm" }: RiskBadgeProps) {
  const cfg = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium leading-none ${cfg.className} ${sizes[size]}`}
    >
      {children || cfg.label}
    </span>
  );
}
