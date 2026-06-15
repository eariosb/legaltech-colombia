"use client";
import { Icon } from "@/components/icons/Icon";
import { AnimateIn } from "@/components/legal-ui";

interface HumanFocusProps {
  text: string;
  color?: string;
}

/**
 * HumanFocus — cierre humano del módulo.
 * Responde a la pregunta: "¿cómo afecta esto a quien no sabe de leyes ni de tecnología?"
 * Ese es el verdadero enfoque holístico: Justicia Centrada en el Humano.
 */
export function HumanFocus({ text, color = "#9D174D" }: HumanFocusProps) {
  return (
    <AnimateIn>
      <div
        style={{
          position: "relative",
          padding: "20px 22px 20px 24px",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            backgroundColor: color,
            opacity: 0.55,
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div
            style={{
              flexShrink: 0,
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              backgroundColor: `${color}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="heart" size={14} color={color} />
          </div>

          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                marginBottom: "4px",
              }}
            >
              Enfoque humano
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#A1A1AA",
                lineHeight: 1.55,
                marginBottom: "8px",
                fontStyle: "italic",
              }}
            >
              ¿Cómo afecta esto a quien no sabe de leyes ni de tecnología?
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1E293B",
                lineHeight: 1.75,
                letterSpacing: "-0.005em",
              }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
