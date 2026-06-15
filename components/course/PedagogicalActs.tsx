"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PedagogicalAct } from "@/data/course";
import { Icon, type IconName } from "@/components/icons/Icon";

interface PedagogicalActsProps {
  acts: PedagogicalAct[];
  color?: string;
}

const ACT_META: Record<
  "I" | "II" | "III",
  { label: string; icon: IconName }
> = {
  I:   { label: "Fundamento", icon: "bulb"   },
  II:  { label: "Ejecución",  icon: "screen" },
  III: { label: "Diálogo",    icon: "speech" },
};

/**
 * PedagogicalActs — los tres actos del método "Desmontando la Caja Negra".
 * Acordeón con numerales romanos, duración, propósito, analogía y demo en vivo.
 * Mantiene la línea visual minimal del resto del curso.
 */
export function PedagogicalActs({
  acts,
  color = "#1E3A8A",
}: PedagogicalActsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {acts.map((act, i) => {
        const meta = ACT_META[act.act];
        const isOpen = openIdx === i;

        return (
          <div
            key={i}
            style={{
              borderBottom:
                i < acts.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "transparent",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                cursor: "pointer",
                transition: "background 150ms ease",
                border: "none",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (!isOpen)
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(0,0,0,0.015)";
              }}
              onMouseLeave={(e) => {
                if (!isOpen)
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
              }}
              aria-expanded={isOpen}
            >
              {/* Roman numeral */}
              <div
                style={{
                  flexShrink: 0,
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  backgroundColor: `${color}12`,
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono, ui-monospace, monospace)",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                }}
              >
                {act.act}
              </div>

              {/* Title + meta */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: "1px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "4px",
                  }}
                >
                  <Icon
                    name={meta.icon}
                    size={12}
                    color={color}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Acto {act.act} · {meta.label}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "10px",
                      color: "#A1A1AA",
                    }}
                  >
                    <Icon name="clock" size={10} />
                    {act.duration}
                  </span>
                </div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111118",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {act.title}
                </h4>
              </div>

              <Icon
                name="arrow-down"
                size={14}
                color={isOpen ? color : "#C4C4C4"}
                style={{
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease, color 150ms ease",
                  marginTop: "10px",
                }}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "4px 16px 18px 64px",
                      borderTop: `1px solid ${color}14`,
                      backgroundColor: `${color}03`,
                    }}
                  >
                    {/* Propósito */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#3F3F46",
                        lineHeight: 1.7,
                        paddingTop: "12px",
                      }}
                    >
                      {act.purpose}
                    </p>

                    {/* Beats */}
                    {act.beats && act.beats.length > 0 && (
                      <ul
                        style={{
                          marginTop: "12px",
                          paddingLeft: "0",
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        {act.beats.map((b, j) => (
                          <li
                            key={j}
                            style={{
                              position: "relative",
                              paddingLeft: "14px",
                              fontSize: "13px",
                              color: "#52525B",
                              lineHeight: 1.6,
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: "8px",
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                opacity: 0.55,
                              }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Analogy */}
                    {act.analogy && (
                      <div
                        style={{
                          marginTop: "14px",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#A1A1AA",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: "4px",
                          }}
                        >
                          Analogía
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#111118",
                            marginBottom: "6px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {act.analogy.title}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#52525B",
                            lineHeight: 1.7,
                            marginBottom: "8px",
                          }}
                        >
                          {act.analogy.metaphor}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#71717A",
                            lineHeight: 1.65,
                            fontStyle: "italic",
                            borderLeft: `2px solid ${color}60`,
                            paddingLeft: "10px",
                          }}
                        >
                          {act.analogy.bridge}
                        </p>
                      </div>
                    )}

                    {/* Demo */}
                    {act.demo && (
                      <div
                        style={{
                          marginTop: "14px",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          backgroundColor: "#0A0A0F",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "8px",
                          }}
                        >
                          <Icon name="screen" size={12} color="#93C5FD" />
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "#93C5FD",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Demo en vivo
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#E4E4E7",
                            fontFamily:
                              "var(--font-mono, ui-monospace, monospace)",
                            marginBottom: "10px",
                            lineHeight: 1.5,
                          }}
                        >
                          {act.demo.tool}
                        </p>
                        <ol
                          style={{
                            paddingLeft: "0",
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            marginBottom: "10px",
                          }}
                        >
                          {act.demo.steps.map((s, j) => (
                            <li
                              key={j}
                              style={{
                                display: "flex",
                                gap: "8px",
                                fontSize: "12px",
                                color: "#D4D4D8",
                                lineHeight: 1.6,
                              }}
                            >
                              <span
                                style={{
                                  color: "#93C5FD",
                                  fontFamily:
                                    "var(--font-mono, ui-monospace, monospace)",
                                  flexShrink: 0,
                                  fontWeight: 600,
                                }}
                              >
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#A7F3D0",
                            lineHeight: 1.65,
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            paddingTop: "8px",
                            marginTop: "2px",
                          }}
                        >
                          <span
                            style={{
                              color: "#34D399",
                              fontWeight: 600,
                              marginRight: "6px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Resultado
                          </span>
                          {act.demo.outcome}
                        </p>
                      </div>
                    )}
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
