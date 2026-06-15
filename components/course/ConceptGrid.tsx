"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Concept } from "@/data/course";
import { Icon } from "@/components/icons/Icon";

interface ConceptGridProps {
  concepts: Concept[];
  color?: string;
}

/**
 * Linear-style concept list.
 * Clean rows with dividers, no card containers.
 * Click to expand definition inline.
 * Hover: background tint only, no shadow.
 */
export function ConceptGrid({ concepts, color = "#1E3A8A" }: ConceptGridProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      <p style={{ fontSize: "12px", color: "#A1A1AA", marginBottom: "12px" }}>
        {concepts.length} conceptos · Clic para expandir
      </p>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        {concepts.map((concept, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} style={{ borderBottom: i < concepts.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  transition: "background 150ms ease",
                  border: "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.02)";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
                aria-expanded={isOpen}
              >
                {/* Number */}
                <span
                  style={{
                    flexShrink: 0,
                    width: "22px",
                    textAlign: "right",
                    fontSize: "11px",
                    color: "#C4C4C4",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Term */}
                <span style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111118",
                  flex: 1,
                  lineHeight: 1.3,
                }}>
                  {concept.term}
                </span>

                {/* Chevron */}
                <Icon
                  name="arrow-down"
                  size={14}
                  color={isOpen ? color : "#C4C4C4"}
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease, color 150ms ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      padding: "4px 16px 16px 50px",
                      borderTop: `1px solid ${color}14`,
                      backgroundColor: `${color}04`,
                    }}>
                      <p style={{
                        fontSize: "13px",
                        color: "#71717A",
                        lineHeight: 1.7,
                        paddingTop: "10px",
                      }}>
                        {concept.definition}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
