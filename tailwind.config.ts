import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Linear-inspired token map ── */
        bg:       "#FAFAF9",
        surface:  { DEFAULT: "#FFFFFF", 2: "#F5F5F4", 3: "#EFEFED" },
        text:     { 1: "#111118", 2: "#3F3F46", 3: "#71717A", 4: "#A1A1AA" },
        accent:   { DEFAULT: "#1E3A8A", subtle: "rgba(30,58,138,0.07)" },
        stat:     { DEFAULT: "#7C3AED", bg: "rgba(124,58,237,0.07)" },
        success:  { DEFAULT: "#16A34A", bg: "rgba(22,163,74,0.07)" },
        warning:  { DEFAULT: "#CA8A04", bg: "rgba(202,138,4,0.07)" },
        danger:   { DEFAULT: "#DC2626",  bg: "rgba(220,38,38,0.07)" },
        /* Legacy compat (used in data/course.ts module colors) */
        ink: { DEFAULT: "#111118", soft: "#3F3F46", muted: "#71717A", ghost: "#A1A1AA" },
        navy: { 900: "#1E3A8A", 800: "#1E40AF", 700: "#1D4ED8" },
        border: { DEFAULT: "rgba(0,0,0,0.08)", medium: "rgba(0,0,0,0.12)", strong: "rgba(0,0,0,0.18)" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Fira Code", "Cascadia Code", "monospace"],
      },
      fontSize: {
        "2xs": ["10px",  { lineHeight: "1.4", letterSpacing: "0.04em" }],
        "xs":  ["11px",  { lineHeight: "1.5" }],
        "sm":  ["13px",  { lineHeight: "1.6" }],
        "base":["14px",  { lineHeight: "1.65" }],
        "md":  ["15px",  { lineHeight: "1.55" }],
        "lg":  ["17px",  { lineHeight: "1.5" }],
        "xl":  ["20px",  { lineHeight: "1.4" }],
        "2xl": ["24px",  { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        "3xl": ["30px",  { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "4xl": ["38px",  { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "5xl": ["50px",  { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      spacing: {
        sidebar: "256px",
        header: "52px",
      },
      borderRadius: {
        DEFAULT: "8px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        /* Linear barely uses shadows — ring-based only */
        ring:   "0 0 0 1px rgba(0,0,0,0.08)",
        "ring-md": "0 0 0 1px rgba(0,0,0,0.12)",
        focus:  "0 0 0 2px rgba(30,58,138,0.28)",
        /* Subtle context menu / popover elevation */
        popover: "0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        sm: "0 1px 3px rgba(0,0,0,0.06)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "reveal-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up":   "fade-up 200ms cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":   "fade-in 150ms ease both",
        "reveal-in": "reveal-in 180ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-down":"slide-down 160ms cubic-bezier(0.16,1,0.3,1) both",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        std: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        fast: "100ms",
        md: "200ms",
        slow: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
