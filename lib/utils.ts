import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-700",
    border: "border-emerald-200",
    light: "bg-emerald-50",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-700",
    border: "border-amber-200",
    light: "bg-amber-50",
  },
  rose: {
    bg: "bg-red-500",
    text: "text-red-700",
    border: "border-red-200",
    light: "bg-red-50",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-700",
    border: "border-violet-200",
    light: "bg-violet-50",
  },
  sky: {
    bg: "bg-blue-500",
    text: "text-blue-700",
    border: "border-blue-200",
    light: "bg-blue-50",
  },
};

export const challengeTypeMap: Record<string, { color: string; label: string; bg: string }> = {
  risk: { color: "#EF4444", label: "Riesgo", bg: "#FEE2E2" },
  challenge: { color: "#F59E0B", label: "Desafío", bg: "#FEF3C7" },
  opportunity: { color: "#10B981", label: "Oportunidad", bg: "#D1FAE5" },
  practice: { color: "#3B82F6", label: "Buena práctica", bg: "#DBEAFE" },
};

export function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0,0,0,${alpha})`;
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}
