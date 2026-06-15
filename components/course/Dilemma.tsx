"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import type { Dilemma as DilemmaType } from "@/data/course";
import { AnimateIn } from "@/components/legal-ui";

interface DilemmaProps {
  dilemma: DilemmaType;
  color?: string;
}

/**
 * Dilemma — decisión forzada del Acto III.
 * Caso real + restricción + tres opciones con costo + pregunta obligada +
 * entregable. No es debate: es un memorial de una página que el estudiante
 * debe producir.
 */
export function Dilemma({ dilemma, color = "#B91C1C" }: DilemmaProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  return (
    <AnimateIn>
      <div
        style={{
          padding: "24px",
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: `1px solid ${color}22`,
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              backgroundColor: `${color}14`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="exclamation" size={15} color={color} />
          </div>
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "2px",
              }}
            >
              Dilema forzado
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#64748B",
                lineHeight: 1.5,
              }}
            >
              Decisión bajo presión. Todas las opciones cuestan algo.
            </p>
          </div>
        </div>

        {/* Scenario */}
        <div style={{ marginBottom: "14px" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
            }}
          >
            El caso
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#0F172A",
              lineHeight: 1.65,
              letterSpacing: "-0.005em",
            }}
          >
            {dilemma.scenario}
          </p>
        </div>

        {/* Constraint */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "8px",
            backgroundColor: "rgba(180, 83, 9, 0.05)",
            border: "1px solid rgba(180, 83, 9, 0.15)",
            marginBottom: "18px",
          }}
        >
          <Icon
            name="clock"
            size={14}
            color="#B45309"
            style={{ flexShrink: 0, marginTop: "3px" }}
          />
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#92400E",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "3px",
              }}
            >
              Restricción
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#78350F",
                lineHeight: 1.6,
              }}
            >
              {dilemma.constraint}
            </p>
          </div>
        </div>

        {/* Options */}
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "10px",
            }}
          >
            Opciones · ninguna sin costo
          </p>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {dilemma.options.map((opt, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={opt.label}
                  style={{
                    borderBottom:
                      i < dilemma.options.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textAlign: "left",
                      backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 150ms ease",
                    }}
                    aria-expanded={isOpen}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {opt.label}
                    </div>
                    <p
                      style={{
                        flex: 1,
                        fontSize: "14px",
                        color: "#0F172A",
                        fontWeight: 500,
                        lineHeight: 1.55,
                      }}
                    >
                      {opt.title}
                    </p>
                    <Icon
                      name="arrow-down"
                      size={14}
                      color={isOpen ? color : "#C4C4C4"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease, color 150ms ease",
                        flexShrink: 0,
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
                        <div
                          style={{
                            padding: "0 16px 16px 58px",
                            backgroundColor: "rgba(0,0,0,0.015)",
                          }}
                        >
                          <RiskLine
                            label="Riesgo jurídico"
                            value={opt.legalRisk}
                            accent="#1E3A8A"
                          />
                          <RiskLine
                            label="Riesgo técnico / de negocio"
                            value={opt.technicalRisk}
                            accent="#7C3AED"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Forced question */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "14px 16px",
            borderRadius: "8px",
            backgroundColor: `${color}06`,
            border: `1px solid ${color}22`,
            marginBottom: "14px",
          }}
        >
          <Icon
            name="question"
            size={15}
            color={color}
            style={{ flexShrink: 0, marginTop: "3px" }}
          />
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "4px",
              }}
            >
              Pregunta obligada
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#0F172A",
                lineHeight: 1.65,
                letterSpacing: "-0.005em",
                fontWeight: 500,
              }}
            >
              {dilemma.forcedQuestion}
            </p>
          </div>
        </div>

        {/* Synthesis hint (toggle) */}
        <div style={{ marginBottom: "14px" }}>
          <button
            onClick={() => setShowHint((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "7px",
              backgroundColor: "transparent",
              border: "1px dashed rgba(100,116,139,0.3)",
              color: "#64748B",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            <Icon name="bulb" size={13} />
            {showHint ? "Ocultar pista" : "Ver pista de síntesis profesional"}
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "rgba(100,116,139,0.05)",
                    borderRadius: "7px",
                    fontSize: "13px",
                    color: "#475569",
                    lineHeight: 1.65,
                  }}
                >
                  {dilemma.synthesisHint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Deliverable */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "14px 16px",
            borderRadius: "8px",
            backgroundColor: "rgba(15, 118, 110, 0.05)",
            border: "1px solid rgba(15, 118, 110, 0.15)",
          }}
        >
          <Icon
            name="check"
            size={15}
            color="#0F766E"
            style={{ flexShrink: 0, marginTop: "3px" }}
          />
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#115E59",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "4px",
              }}
            >
              Entregable
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#134E4A",
                lineHeight: 1.65,
              }}
            >
              {dilemma.deliverable}
            </p>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

function RiskLine({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div style={{ paddingTop: "10px" }}>
      <p
        style={{
          fontSize: "10px",
          fontWeight: 600,
          color: accent,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#334155",
          lineHeight: 1.65,
        }}
      >
        {value}
      </p>
    </div>
  );
}
