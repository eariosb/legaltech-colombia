"use client";
import { Icon } from "@/components/icons/Icon";
import { AnimateIn } from "@/components/legal-ui";

interface ChangeLensProps {
  text: string;
  color?: string;
}

/**
 * ChangeLens — frase-ancla que encuadra el módulo desde la óptica del "cambio".
 * Inspirada en el marco pedagógico "Desmontando la Caja Negra".
 * Minimal: tarjeta tenue con ícono de brújula y tipografía tranquila.
 */
export function ChangeLens({ text, color = "#1E3A8A" }: ChangeLensProps) {
  return (
    <AnimateIn>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          padding: "18px 20px",
          borderRadius: "10px",
          backgroundColor: `${color}06`,
          border: `1px solid ${color}18`,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            backgroundColor: `${color}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="compass" size={14} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              marginBottom: "6px",
            }}
          >
            La lente del cambio
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#1E293B",
              lineHeight: 1.7,
              letterSpacing: "-0.005em",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </AnimateIn>
  );
}
