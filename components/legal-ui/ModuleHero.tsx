"use client";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/icons/Icon";

interface ModuleHeroProps {
  moduleNumber: number;
  totalModules: number;
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  kpi?: { value: string; label: string };
}

/**
 * Linear-style module hero.
 * White card, 2px top accent line, no gradients, clean typography.
 */
export function ModuleHero({
  moduleNumber,
  icon,
  title,
  subtitle,
  description,
  tags,
  color,
}: ModuleHeroProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "40px",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: "2px", backgroundColor: color, opacity: 0.7 }} />

      <div style={{ padding: "28px 28px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <p style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#A1A1AA",
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            marginBottom: "16px",
          }}>
            Módulo {String(moduleNumber).padStart(2, "0")}
          </p>

          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
            <span style={{
              lineHeight: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: color + "10",
              border: `1px solid ${color}20`,
              color: color,
            }}>
              <Icon name={icon} size={20} />
            </span>
            <div>
              <h1 style={{
                fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
                fontWeight: 700,
                color: "#111118",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: "3px",
              }}>
                {title}
              </h1>
              <p style={{ fontSize: "14px", color: "#71717A", fontWeight: 400 }}>{subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "14px",
            color: "#71717A",
            lineHeight: 1.7,
            maxWidth: "600px",
            marginBottom: "16px",
          }}>
            {description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  padding: "3px 9px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  color: "#71717A",
                  border: "1px solid rgba(0,0,0,0.07)",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
