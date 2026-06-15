"use client";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import type { Module } from "@/data/course";

interface ModuleCardProps {
  mod: Module;
}

export function ModuleCard({ mod }: ModuleCardProps) {
  return (
    <Link
      href={`/modulo/${mod.slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      className="group"
    >
      <article
        className="transition-colors duration-150 h-full flex flex-col"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(0,0,0,0.14)";
          el.style.backgroundColor = "#FAFAFA";
          const ico = el.querySelector<HTMLElement>(".module-card-icon");
          if (ico) {
            ico.style.color = mod.color;
            ico.style.backgroundColor = mod.color + "14";
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(0,0,0,0.08)";
          el.style.backgroundColor = "#FFFFFF";
          const ico = el.querySelector<HTMLElement>(".module-card-icon");
          if (ico) {
            ico.style.color = "#52525B";
            ico.style.backgroundColor = "rgba(0,0,0,0.03)";
          }
        }}
      >
        {/* Top accent — single pixel color bar */}
        <div style={{ height: "2px", backgroundColor: mod.color, opacity: 0.6, flexShrink: 0 }} />

        {/* Body */}
        <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="module-card-icon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                flexShrink: 0,
                color: "#52525B",
                backgroundColor: "rgba(0,0,0,0.03)",
                transition: "color 150ms ease, background-color 150ms ease",
              }}
            >
              <Icon name={mod.icon} size={14} />
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: mod.color,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Módulo {String(mod.id).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#111118",
              lineHeight: 1.3,
              marginBottom: "4px",
              letterSpacing: "-0.01em",
            }}
          >
            {mod.title}
          </h3>
          <p style={{ fontSize: "12px", color: "#A1A1AA", marginBottom: "12px" }}>
            {mod.subtitle}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "12px",
              color: "#71717A",
              lineHeight: 1.6,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {mod.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "12px" }}>
            {mod.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "999px",
                  border: `1px solid ${mod.color}22`,
                  backgroundColor: mod.color + "08",
                  color: mod.color,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "14px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#A1A1AA" }}>
              {mod.concepts.length} conceptos
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                fontWeight: 500,
                color: mod.color,
                opacity: 0.8,
              }}
              className="group-hover:opacity-100 transition-opacity duration-150"
            >
              Explorar
              <Icon name="arrow-right" size={11} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
