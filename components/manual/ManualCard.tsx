import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import type { Manual } from "@/data/manuals";

/**
 * ManualCard — tarjeta de acceso a un manual, para la home y el índice /manuales.
 */
export function ManualCard({ manual }: { manual: Manual }) {
  return (
    <Link
      href={`/manuales/${manual.slug}`}
      style={{
        display: "block",
        position: "relative",
        padding: "22px 22px 20px",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        textDecoration: "none",
        transition: "border-color 150ms ease, transform 150ms ease",
        overflow: "hidden",
      }}
      className="manual-card-hover"
    >
      {/* Accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: manual.color,
          opacity: 0.75,
        }}
        aria-hidden
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: manual.color,
            backgroundColor: `${manual.color}0D`,
            border: `1px solid ${manual.color}1F`,
          }}
        >
          <Icon name={manual.icon} size={15} />
        </span>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#A1A1AA",
            textTransform: "uppercase",
            letterSpacing: "0.09em",
          }}
        >
          Manual de práctica
        </p>
      </div>

      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#111118",
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
          marginBottom: "6px",
        }}
      >
        {manual.title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          color: "#64748B",
          lineHeight: 1.55,
          marginBottom: "14px",
        }}
      >
        {manual.subtitle}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          fontSize: "11px",
          color: "#94A3B8",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Icon name="clock" size={11} />
          {manual.readingTime}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            fontWeight: 500,
            color: manual.color,
          }}
        >
          Leer
          <Icon name="arrow-right" size={12} />
        </span>
      </div>
    </Link>
  );
}
