"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessStep } from "@/data/course";
import { Icon } from "@/components/icons/Icon";

interface ProcessStepsProps {
  steps: ProcessStep[];
  color?: string;
}

/**
 * Linear-style process stepper.
 * Numbered rows, minimal borders, clean expansion.
 * Progress bar at top.
 */
export function ProcessSteps({ steps, color = "#1E3A8A" }: ProcessStepsProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());

  const markDone = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDone((p) => {
      const n = new Set(p);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
    if (i < steps.length - 1 && !done.has(i)) setActiveStep(i + 1);
  };

  const progress = done.size / steps.length;

  return (
    <div>
      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{
          flex: 1,
          height: "2px",
          backgroundColor: "rgba(0,0,0,0.06)",
          borderRadius: "99px",
          overflow: "hidden",
        }}>
          <div
            style={{
              height: "100%",
              borderRadius: "99px",
              width: `${progress * 100}%`,
              backgroundColor: color,
              transition: "width 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
        <span style={{ fontSize: "11px", fontWeight: 600, color, flexShrink: 0 }}>
          {done.size}/{steps.length}
        </span>
      </div>

      {/* Steps */}
      <div style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}>
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const isDone = done.has(i);

          return (
            <div
              key={i}
              style={{ borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
            >
              <div
                onClick={() => setActiveStep(i)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 16px",
                  backgroundColor: isActive ? "rgba(0,0,0,0.02)" : "transparent",
                  cursor: "pointer",
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.015)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {/* Marker button */}
                <button
                  onClick={(e) => markDone(i, e)}
                  style={{
                    flexShrink: 0,
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    transition: "background 150ms ease",
                    backgroundColor: isDone ? "#16A34A" : isActive ? color : "rgba(0,0,0,0.06)",
                    color: isDone || isActive ? "#FFFFFF" : "#A1A1AA",
                  }}
                  aria-label={isDone ? "Marcar pendiente" : "Marcar completado"}
                >
                  {isDone ? <Icon name="check" size={11} /> : step.step}
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isDone ? "#A1A1AA" : "#111118",
                    lineHeight: 1.3,
                    textDecoration: isDone ? "line-through" : "none",
                    letterSpacing: "-0.01em",
                  }}>
                    {step.title}
                  </h4>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{
                          fontSize: "13px",
                          color: "#71717A",
                          lineHeight: 1.65,
                          marginTop: "6px",
                          paddingBottom: "2px",
                        }}>
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      <AnimatePresence>
        {done.size === steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid rgba(22,163,74,0.2)",
              backgroundColor: "rgba(22,163,74,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%",
              backgroundColor: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon name="check" size={11} color="white" />
            </div>
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#15803D" }}>
              Proceso completado.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
