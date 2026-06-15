"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/data/course";
import { Icon } from "@/components/icons/Icon";

interface ChallengeAccordionProps {
  challenges: Challenge[];
}

const typeConfig = {
  risk:        { dot: "#DC2626", label: "Riesgo"         },
  challenge:   { dot: "#CA8A04", label: "Desafío"        },
  opportunity: { dot: "#16A34A", label: "Oportunidad"    },
  practice:    { dot: "#1E3A8A", label: "Buena práctica" },
};

export function ChallengeAccordion({ challenges }: ChallengeAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
    }}>
      {challenges.map((ch, i) => {
        const cfg = typeConfig[ch.type as keyof typeof typeConfig] ?? typeConfig.challenge;
        const isOpen = openIdx === i;

        return (
          <div
            key={i}
            style={{ borderBottom: i < challenges.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
          >
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
                border: "none",
                outline: "none",
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.02)";
              }}
              onMouseLeave={(e) => {
                if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              aria-expanded={isOpen}
            >
              {/* Type dot */}
              <span style={{
                flexShrink: 0,
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: cfg.dot,
                marginTop: "1px",
              }} />

              {/* Label chip */}
              <span style={{
                fontSize: "10px",
                fontWeight: 600,
                color: cfg.dot,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                flexShrink: 0,
                minWidth: "72px",
              }}>
                {cfg.label}
              </span>

              {/* Title */}
              <p style={{
                flex: 1,
                fontSize: "13px",
                fontWeight: 500,
                color: "#111118",
                lineHeight: 1.35,
                textAlign: "left",
                minWidth: 0,
              }}>
                {ch.title}
              </p>

              <Icon
                name="arrow-down"
                size={14}
                color={isOpen ? "#71717A" : "#C4C4C4"}
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
                    padding: "8px 16px 16px 106px",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    backgroundColor: "rgba(0,0,0,0.01)",
                  }}>
                    <p style={{ fontSize: "13px", color: "#71717A", lineHeight: 1.7, paddingTop: "8px" }}>
                      {ch.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
