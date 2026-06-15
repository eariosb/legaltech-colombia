"use client";
import { useEffect, useState, useRef, useCallback } from "react";

// ─── Bar Chart ─────────────────────────────────────────────────────────────────

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface StatsChartProps {
  data: BarData[];
  title?: string;
  subtitle?: string;
  maxValue?: number;
  height?: number;
  color?: string;
}

export function StatsBarChart({
  data,
  title,
  subtitle,
  maxValue,
  height = 180,
  color = "#1E3A8A",
}: StatsChartProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const barH = height - 52; // space for value + label

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {title && (
        <div style={{ marginBottom: "16px" }}>
          {subtitle && (
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>
              {subtitle}
            </p>
          )}
          <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#111118" }}>{title}</h4>
        </div>
      )}

      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 100 : 0;
          const barColor = d.color ?? color;
          const barHeight = animated ? Math.max(4, (pct / 100) * barH) : 4;

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1" style={{ justifyContent: "flex-end" }}>
              {/* Value label */}
              <span
                className="text-xs font-extrabold transition-all duration-500"
                style={{ color: barColor, opacity: animated ? 1 : 0, transitionDelay: `${i * 80 + 300}ms` }}
              >
                {d.value}%
              </span>

              {/* Bar wrapper */}
              <div
                className="w-full relative rounded-t-lg overflow-hidden"
                style={{ height: barH, display: "flex", alignItems: "flex-end" }}
              >
                {/* Track */}
                <div className="absolute inset-0 rounded-t-lg" style={{ backgroundColor: barColor + "10" }} />

                {/* Fill */}
                <div
                  className="w-full rounded-t-lg relative overflow-hidden"
                  style={{
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                    transition: `height 0.8s cubic-bezier(0.34,1.1,0.64,1)`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>

              {/* Label */}
              <span
                style={{ fontSize: "10px", color: "#A1A1AA", textAlign: "center", lineHeight: 1.4, maxWidth: "100%" }}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* X-axis line */}
      <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.07)", marginTop: "4px", marginBottom: "10px" }} />

      {/* Legend row */}
      <div className="flex items-center justify-end gap-1">
        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
        <span style={{ fontSize: "10px", color: "#A1A1AA" }}>% sobre máximo</span>
      </div>
    </div>
  );
}

// ─── Gauge ─────────────────────────────────────────────────────────────────────

interface GaugeProps {
  value: number;
  label: string;
  color?: string;
  size?: number;
  subtitle?: string;
}

export function Gauge({ value, label, color = "#1E3A8A", size = 120, subtitle }: GaugeProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(true), 120); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const r = (size / 2) * 0.78;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * 0.75; // 270°
  const offset = circumference * 0.125; // start at 225°
  const filled = animated ? (value / 100) * arc : 0;

  // Tick marks
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.82 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`gauge-grad-${value}-${color.slice(1)}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity="0.7" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
            <filter id={`gauge-glow-${value}`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer glow ring (subtle) */}
          <circle
            cx={cx} cy={cy} r={r + 6}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.07}
          />

          {/* Track arc */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeOpacity={0.1}
            strokeWidth={10}
            strokeDasharray={`${arc} ${circumference - arc}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />

          {/* Value arc (glow) */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeOpacity={0.18}
            strokeDasharray={`${filled} ${arc - filled + circumference * 0.25}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.4,0,0.2,1) 0.1s", filter: `blur(3px)` }}
          />

          {/* Value arc (main) */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={`url(#gauge-grad-${value}-${color.slice(1)})`}
            strokeWidth={9}
            strokeDasharray={`${filled} ${arc - filled + circumference * 0.25}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.4,0,0.2,1) 0.1s" }}
          />

          {/* Center value */}
          <text
            x={cx} y={cy - 3}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size * 0.2}
            fontWeight="800"
            fill="var(--ink)"
            fontFamily="Inter, sans-serif"
            style={{ letterSpacing: "-1px" }}
          >
            {value}
          </text>
          <text
            x={cx} y={cy + size * 0.13}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size * 0.1}
            fontWeight="700"
            fill={color}
            fontFamily="Inter, sans-serif"
          >
            %
          </text>
        </svg>
      </div>

      {/* Label */}
      <p style={{ fontSize: "12px", fontWeight: 600, color: "#111118", textAlign: "center", marginTop: "4px" }}>{label}</p>
      {subtitle && <p style={{ fontSize: "10px", color: "#A1A1AA", textAlign: "center", marginTop: "2px" }}>{subtitle}</p>}
    </div>
  );
}

// ─── Gauge Grid ────────────────────────────────────────────────────────────────

interface GaugeGridProps {
  gauges: { value: number; label: string; color?: string; subtitle?: string }[];
  title?: string;
  color?: string;
}

export function GaugeGrid({ gauges, title, color = "#1E3A8A" }: GaugeGridProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "16px" }}>
      {title && (
        <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>{title}</p>
      )}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(gauges.length, 4)}, 1fr)` }}
      >
        {gauges.map((g, i) => (
          <Gauge
            key={i}
            value={g.value}
            label={g.label}
            color={g.color ?? color}
            subtitle={g.subtitle}
            size={96}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Bayesian Distribution ─────────────────────────────────────────────────────

interface DistributionProps {
  mean: number;
  label?: string;
  color?: string;
  width?: number;
  height?: number;
  priorMean?: number;
}

export function BayesianDistribution({
  mean,
  label,
  color = "#8B5CF6",
  width = 360,
  height = 130,
  priorMean,
}: DistributionProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const svgRef = useRef<SVGRectElement>(null);
  const id = `bd-${Math.round(mean * 1000)}-${color.slice(1, 4)}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(true), 150); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const sigma = 0.11;
  const steps = 80;
  const pad = { t: 12, b: 28, l: 8, r: 8 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  function gaussianPoints(mu: number): Array<[number, number]> {
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      const z = (x - mu) / sigma;
      const y = Math.exp(-0.5 * z * z);
      pts.push([x * innerW + pad.l, y]);
    }
    const maxY = Math.max(...pts.map(([, y]) => y));
    return pts.map(([x, y]) => [x, pad.t + innerH - (y / maxY) * innerH] as [number, number]);
  }

  const posteriorPts = gaussianPoints(mean);
  const priorPts = priorMean !== undefined ? gaussianPoints(priorMean) : null;

  const toPath = (pts: Array<[number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  const posteriorPath = toPath(posteriorPts);
  const posteriorArea = `${posteriorPath} L ${pad.l + innerW} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`;

  const ci95Low = Math.max(0, mean - 1.96 * sigma);
  const ci95High = Math.min(1, mean + 1.96 * sigma);
  const ciX1 = ci95Low * innerW + pad.l;
  const ciX2 = ci95High * innerW + pad.l;
  const meanX = mean * innerW + pad.l;
  const axisY = pad.t + innerH;

  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "16px" }}>
      {label && (
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>
            Análisis Bayesiano
          </p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111118", lineHeight: 1.3 }}>{label}</p>
        </div>
      )}

      <svg
        ref={ref}
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <rect
              ref={svgRef}
              x={pad.l}
              y={0}
              width={animated ? innerW : 0}
              height={height}
              style={{ transition: "width 1.1s cubic-bezier(0.4,0,0.2,1) 0.1s" }}
            />
          </clipPath>
        </defs>

        {/* X-axis */}
        <line x1={pad.l} y1={axisY} x2={pad.l + innerW} y2={axisY} stroke="var(--border)" strokeWidth={1} />

        {/* CI shaded band */}
        <rect
          x={ciX1} y={pad.t}
          width={ciX2 - ciX1}
          height={innerH}
          fill={color}
          fillOpacity={0.07}
          rx={3}
          clipPath={`url(#${id}-clip)`}
        />

        {/* Prior distribution (if provided) */}
        {priorPts && (
          <path
            d={toPath(priorPts)}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeOpacity={0.25}
            strokeDasharray="5 4"
            clipPath={`url(#${id}-clip)`}
          />
        )}

        {/* Posterior area fill */}
        <path
          d={posteriorArea}
          fill={`url(#${id}-fill)`}
          clipPath={`url(#${id}-clip)`}
        />

        {/* Posterior curve */}
        <path
          d={posteriorPath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          clipPath={`url(#${id}-clip)`}
        />

        {/* Mean vertical line */}
        <line
          x1={meanX} y1={pad.t}
          x2={meanX} y2={axisY}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          opacity={animated ? 1 : 0}
          style={{ transition: "opacity 0.4s ease 0.9s" }}
        />

        {/* Mean label */}
        <text
          x={meanX} y={axisY + 14}
          textAnchor="middle"
          fontSize={9.5}
          fontWeight="700"
          fill={color}
          fontFamily="Inter, sans-serif"
        >
          μ = {Math.round(mean * 100)}%
        </text>

        {/* CI boundary labels */}
        <text x={ciX1} y={axisY + 14} textAnchor="middle" fontSize={8} fill="var(--ink-ghost)" fontFamily="Inter, sans-serif">
          {Math.round(ci95Low * 100)}%
        </text>
        <text x={ciX2} y={axisY + 14} textAnchor="middle" fontSize={8} fill="var(--ink-ghost)" fontFamily="Inter, sans-serif">
          {Math.round(ci95High * 100)}%
        </text>

        {/* CI bracket lines */}
        <line x1={ciX1} y1={axisY - 1} x2={ciX1} y2={axisY + 5} stroke="var(--ink-ghost)" strokeWidth={1} />
        <line x1={ciX2} y1={axisY - 1} x2={ciX2} y2={axisY + 5} stroke="var(--ink-ghost)" strokeWidth={1} />
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 rounded" style={{ backgroundColor: color }} />
          <span style={{ fontSize: "10px", color: "#A1A1AA", fontWeight: 500 }}>Distribución posterior</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm border" style={{ backgroundColor: color + "12", borderColor: color + "30" }} />
          <span style={{ fontSize: "10px", color: "#A1A1AA", fontWeight: 500 }}>IC 95%</span>
        </div>
        {priorMean !== undefined && (
          <div className="flex items-center gap-1.5">
            <svg width={20} height={6}>
              <line x1={0} y1={3} x2={20} y2={3} stroke={color} strokeWidth={1.5} strokeDasharray="4 3" strokeOpacity={0.4} />
            </svg>
            <span style={{ fontSize: "10px", color: "#A1A1AA", fontWeight: 500 }}>Prior</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Risk Matrix ───────────────────────────────────────────────────────────────

interface RiskItem {
  label: string;
  risk: "alto" | "medio" | "bajo";
  val: number;
}

interface RiskMatrixProps {
  items: RiskItem[];
  title?: string;
}

const riskConfig = {
  alto:  { color: "#E11D48", bg: "#FFF1F2", border: "#FFE4E6", label: "Alto" },
  medio: { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", label: "Medio" },
  bajo:  { color: "#059669", bg: "#F0FDF4", border: "#BBF7D0", label: "Bajo" },
};

export function RiskMatrix({ items, title }: RiskMatrixProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(true), 100); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Group by risk level
  const groups = ["alto", "medio", "bajo"] as const;
  const grouped = groups
    .map((r) => ({ risk: r, items: items.filter((x) => x.risk === r) }))
    .filter((g) => g.items.length > 0);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {title && (
        <p style={{ fontSize: "10px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</p>
      )}

      {grouped.map(({ risk, items: rItems }) => {
        const cfg = riskConfig[risk];
        return (
          <div key={risk}>
            {/* Group header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: cfg.color }}>
                Riesgo {cfg.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {rItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                >
                  <p className="text-xs font-semibold mb-3 leading-snug" style={{ color: cfg.color }}>
                    {item.label}
                  </p>

                  {/* Progress bar */}
                  <div
                    className="h-2 rounded-full overflow-hidden mb-2"
                    style={{ backgroundColor: cfg.color + "15" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animated ? `${item.val}%` : "0%",
                        backgroundColor: cfg.color,
                        transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 120}ms`,
                        boxShadow: `0 0 8px ${cfg.color}40`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold" style={{ color: cfg.color }}>
                      {item.val}% probabilidad
                    </span>
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: cfg.color + "15", color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
