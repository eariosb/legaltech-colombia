"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DisruptiveQuestion } from "@/data/course";
import { Icon, type IconName } from "@/components/icons/Icon";

interface DisruptiveDialogueProps {
  questions: DisruptiveQuestion[];
  color?: string;
}

const AUDIENCE_META: Record<
  DisruptiveQuestion["audience"],
  { label: string; icon: IconName; dot: string }
> = {
  abogado:   { label: "Para el abogado",   icon: "briefcase", dot: "#1E3A8A" },
  developer: { label: "Para el developer", icon: "screen",    dot: "#7C3AED" },
  todos:     { label: "Para todos",        icon: "people",    dot: "#0F766E" },
};

/**
 * DisruptiveDialogue — preguntas poderosas del Acto III.
 * Cada pregunta se lanza a una audiencia específica (abogado / developer / todos)
 * y, al expandirla, muestra la pista de por dónde suele aterrizar la respuesta.
 */
export function DisruptiveDialogue({
  questions,
  color = "#1E3A8A",
}: DisruptiveDialogueProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {questions.map((q, i) => {
        const meta = AUDIENCE_META[q.audience];
        const isOpen = openIdx === i;
        const canExpand = Boolean(q.insight);

        return (
          <div
            key={i}
            style={{
              borderBottom:
                i < questions.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <button
              onClick={() => canExpand && setOpenIdx(isOpen ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "transparent",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: canExpand ? "pointer" : "default",
                transition: "background 150ms ease",
                border: "none",
                outline: "none",
              }}
              aria-expanded={isOpen}
              disabled={!canExpand}
            >
              {/* Audience icon */}
              <div
                style={{
                  flexShrink: 0,
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  backgroundColor: `${meta.dot}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1px",
                }}
              >
                <Icon name={meta.icon} size={12} color={meta.dot} />
              </div>

              {/* Question */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: meta.dot,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                  }}
                >
                  {meta.label}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111118",
                    lineHeight: 1.55,
                    letterSpacing: "-0.005em",
                  }}
                >
                  “{q.question}”
                </p>
              </div>

              {canExpand && (
                <Icon
                  name="arrow-down"
                  size={14}
                  color={isOpen ? color : "#C4C4C4"}
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease, color 150ms ease",
                    marginTop: "8px",
                  }}
                />
              )}
            </button>

            <AnimatePresence>
              {isOpen && q.insight && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "6px 16px 16px 54px",
                      backgroundColor: "rgba(0,0,0,0.015)",
                      borderTop: "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#A1A1AA",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginTop: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      Pista para el moderador
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#52525B",
                        lineHeight: 1.7,
                      }}
                    >
                      {q.insight}
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
