"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { MindMapNode } from "@/data/course";

interface MindMapProps {
  root: MindMapNode;
  className?: string;
}

interface Pos {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  level: number;
  parentId?: string;
}

const R = { 0: 54, 1: 38, 2: 26 };
const FS = { 0: 13, 1: 11, 2: 10 };

function build(node: MindMapNode, cx: number, cy: number): Pos[] {
  const all: Pos[] = [];

  all.push({ id: node.id, x: cx, y: cy, label: node.label, color: node.color || "#1E3A8A", level: 0 });

  if (!node.children) return all;
  const n1 = node.children.length;

  node.children.forEach((child, i) => {
    const a1 = (2 * Math.PI / n1) * i - Math.PI / 2;
    const r1 = Math.min(cx, cy) * 0.68;
    const x1 = cx + r1 * Math.cos(a1);
    const y1 = cy + r1 * Math.sin(a1);

    all.push({ id: child.id, x: x1, y: y1, label: child.label, color: child.color || "#3B82F6", level: 1, parentId: node.id });

    if (child.children) {
      const n2 = child.children.length;
      child.children.forEach((gc, j) => {
        const spread = (n2 <= 1) ? 0 : (Math.PI * 0.65) / (n2 - 1);
        const base = n2 <= 1 ? a1 : a1 - (Math.PI * 0.65) / 2;
        const a2 = base + spread * j;
        const r2 = r1 * 0.55;
        all.push({
          id: gc.id,
          x: x1 + r2 * Math.cos(a2),
          y: y1 + r2 * Math.sin(a2),
          label: gc.label,
          color: gc.color || "#60A5FA",
          level: 2,
          parentId: child.id,
        });
      });
    }
  });

  return all;
}

function wrap(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = (cur + " " + w).trim();
    if (test.length > max) { if (cur) lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function MindMap({ root, className }: MindMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 580, h: 460 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const update = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.clientWidth || 580;
    setSize({ w, h: Math.max(380, Math.round(w * 1)) });
  }, []);

  useEffect(() => {
    update();
    setMounted(true);
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [update]);

  const cx = size.w / 2;
  const cy = size.h / 2;
  const nodes = build(root, cx, cy);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const edges = nodes
    .filter((n) => n.parentId)
    .map((n) => ({ from: byId[n.parentId!], to: n }))
    .filter((e) => e.from && e.to);

  // Diferimos el render del SVG hasta que el componente esté montado
  // en cliente. Evita mismatches de hidratación por diferencias
  // imperceptibles de precisión flotante entre Node y el navegador
  // (Math.sin/Math.cos) y por serialización distinta de estilos inline.
  return (
    <div
      ref={ref}
      className={`w-full select-none ${className || ""}`}
      style={!mounted ? { minHeight: size.h } : undefined}
    >
      {!mounted ? null : (
      <svg
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="drop-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <filter id="drop-shadow-hov">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="rgba(0,0,0,0.12)" />
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(({ from, to }) => {
          const isRelated = hovered && (hovered === from.id || hovered === to.id || hovered === to.parentId);
          const isActive = hovered && (hovered === from.id || hovered === to.id);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={`${from.id}-${to.id}`}>
              {/* Glow line (active) */}
              {isActive && (
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={to.color}
                  strokeWidth={6}
                  opacity={0.15}
                  strokeLinecap="round"
                />
              )}
              {/* Main edge */}
              <path
                d={`M ${from.x} ${from.y} Q ${midX} ${from.y} ${to.x} ${to.y}`}
                fill="none"
                stroke={isActive ? to.color : to.level === 2 ? to.color + "40" : to.color + "55"}
                strokeWidth={isActive ? 2 : to.level === 2 ? 1 : 1.5}
                strokeDasharray={to.level === 2 ? "4 3" : undefined}
                opacity={hovered && !isRelated ? 0.2 : 1}
                style={{ transition: "all 0.25s ease" }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const r = R[node.level as keyof typeof R] ?? 22;
          const fs = FS[node.level as keyof typeof FS] ?? 10;
          const isHov = hovered === node.id;
          const isRelated = hovered && (
            node.id === hovered ||
            node.parentId === hovered ||
            nodes.find((n) => n.id === hovered)?.parentId === node.id
          );
          const dim = hovered && !isRelated;
          const maxChars = node.level === 0 ? 11 : node.level === 1 ? 9 : 8;
          const lines = wrap(node.label, maxChars);
          const lh = fs + 2.5;
          const scale = isHov ? 1.12 : 1;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y}) scale(${scale})`}
              style={{ transformOrigin: `${node.x}px ${node.y}px`, transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)", cursor: "default", opacity: dim ? 0.4 : 1 }}
              onMouseEnter={() => mounted && setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover ring */}
              {isHov && (
                <circle r={r + 5} fill={node.color} opacity={0.07} />
              )}

              {/* Main circle — flat fill, minimal shadow */}
              <circle
                r={r}
                fill={node.level === 0 ? node.color : node.color}
                fillOpacity={node.level === 0 ? 1 : node.level === 1 ? 0.88 : 0.75}
                filter={isHov ? "url(#drop-shadow-hov)" : "url(#drop-shadow)"}
              />

              {/* White border ring for non-root */}
              {node.level > 0 && (
                <circle r={r} fill="none" stroke="white" strokeWidth={1.5} strokeOpacity={0.2} />
              )}

              {/* Label */}
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={0}
                  y={(li - (lines.length - 1) / 2) * lh}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={fs}
                  fontWeight={node.level === 0 ? "800" : "600"}
                  fontFamily="Inter, system-ui, sans-serif"
                  style={{ letterSpacing: node.level === 0 ? "-0.3px" : "0px" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      )}

      {/* Legend */}
      {mounted && (
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginTop: "8px", padding: "0 8px" }}>
        {[0, 1, 2].map((level) => {
          const labels = ["Concepto central", "Categorías", "Elementos"];
          const sz = [12, 10, 8][level];
          return (
            <div key={level} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: sz, height: sz, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.2)" }} />
              <span style={{ fontSize: "11px", color: "#A1A1AA" }}>{labels[level]}</span>
            </div>
          );
        })}
        <span style={{ fontSize: "11px", color: "#C4C4C4", marginLeft: "auto" }}>Pasa el cursor para explorar</span>
      </div>
      )}
    </div>
  );
}

function lighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, Math.round(r + (255 - r) * amount));
  const lg = Math.min(255, Math.round(g + (255 - g) * amount));
  const lb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `rgb(${lr},${lg},${lb})`;
}
