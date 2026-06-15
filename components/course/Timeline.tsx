"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TimelineItem } from "@/data/course";

interface TimelineProps {
  items: TimelineItem[];
  color?: string;
}

/**
 * Linear-style timeline.
 * Thin left rule, minimal nodes, no card containers.
 * Hover: background tint only, zero shadow.
 */
export function Timeline({ items, color = "#1E3A8A" }: TimelineProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div style={{ position: "relative", paddingLeft: "28px" }}>
      {/* Left rule */}
      <div
        style={{
          position: "absolute",
          left: "6px",
          top: "8px",
          bottom: "8px",
          width: "1px",
          backgroundColor: "rgba(0,0,0,0.08)",
        }}
      />

      <motion.ol
        style={{ listStyle: "none", margin: 0, padding: 0 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
        }}
      >
        {items.map((item, i) => {
          const isActive = activeIdx === i;
          return (
            <motion.li
              key={i}
              variants={{
                hidden:  { opacity: 0, x: -6 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3,1] } },
              }}
              style={{ position: "relative", paddingBottom: "2px", marginBottom: "2px" }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Node */}
              <div
                style={{
                  position: "absolute",
                  left: "-23px",
                  top: "14px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: `1.5px solid ${isActive ? color : "rgba(0,0,0,0.15)"}`,
                  backgroundColor: isActive ? color : "#FFFFFF",
                  transition: "all 150ms ease",
                  zIndex: 1,
                }}
              />

              {/* Row */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "6px",
                  backgroundColor: isActive ? "rgba(0,0,0,0.025)" : "transparent",
                  transition: "background 150ms ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                      color: isActive ? color : "#A1A1AA",
                      letterSpacing: "0.02em",
                      transition: "color 150ms ease",
                      flexShrink: 0,
                    }}
                  >
                    {item.year}
                  </span>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111118",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{
                  fontSize: "13px",
                  color: "#71717A",
                  lineHeight: 1.65,
                  paddingLeft: "47px",
                }}>
                  {item.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
