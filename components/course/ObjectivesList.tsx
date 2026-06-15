"use client";

interface ObjectivesListProps {
  objectives: string[];
  color?: string;
}

/**
 * Linear-style numbered objectives.
 * Clean rows, no card wrappers, monospace numbers.
 */
export function ObjectivesList({ objectives, color = "#1E3A8A" }: ObjectivesListProps) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {objectives.map((obj, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            padding: "10px 0",
            borderBottom: i < objectives.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
          }}
        >
          <span style={{
            flexShrink: 0,
            fontSize: "11px",
            fontWeight: 600,
            color: color,
            opacity: 0.7,
            width: "20px",
            textAlign: "right",
            paddingTop: "2px",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.02em",
          }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p style={{ fontSize: "14px", color: "#3F3F46", lineHeight: 1.65, flex: 1 }}>
            {obj}
          </p>
        </li>
      ))}
    </ol>
  );
}
