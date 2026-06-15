import type { ReactNode } from "react";

interface LegalCardProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  accentColor?: string;
  noPad?: boolean;
  flat?: boolean;
}

/**
 * Linear-style content card.
 * White background, 1px rgba border, no shadows.
 * Optional left accent band via accentColor.
 */
export function LegalCard({
  children,
  className = "",
  accent = false,
  accentColor = "#1E3A8A",
  noPad = false,
  flat = false,
}: LegalCardProps) {
  const padding = noPad ? "" : "padding: 20px;";

  return (
    <div
      className={className}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderLeft: accent ? `3px solid ${accentColor}` : "1px solid rgba(0,0,0,0.08)",
        borderRadius: "8px",
        overflow: "hidden",
        ...(noPad ? {} : { padding: "20px" }),
      }}
    >
      {children}
    </div>
  );
}
