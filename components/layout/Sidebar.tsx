"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/data/course";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const currentModIdx = modules.findIndex((m) => pathname === `/modulo/${m.slug}`);

  return (
    <>
      {/* Mobile overlay */}
      {onClose && (
        <div
          className={cn(
            "fixed inset-0 z-30 lg:hidden transition-opacity duration-200",
            "bg-black/30",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 flex flex-col select-none",
          "w-[256px]",
          "transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: "#111118" }}
      >
        {/* Brand */}
        <div className="px-4 h-[52px] flex items-center border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Link href="/" className="flex items-center gap-2.5 group" onClick={onClose}>
            {/* Icon — no gradient, just a clean monogram */}
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>LT</span>
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                LegalTech
              </p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Colombia
              </p>
            </div>
          </Link>
        </div>

        {/* Home link */}
        <div className="px-2 pt-3 pb-1">
          <Link
            href="/"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-2.5 h-8 rounded-md text-sm transition-colors duration-150",
              pathname === "/"
                ? "font-medium"
                : "font-normal"
            )}
            style={{
              color: pathname === "/" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
              backgroundColor: pathname === "/" ? "rgba(255,255,255,0.08)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (pathname !== "/") (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/") (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
              <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span>Inicio</span>
          </Link>

          <Link
            href="/manuales"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-2.5 h-8 rounded-md text-sm transition-colors duration-150 mt-px",
              pathname.startsWith("/manuales")
                ? "font-medium"
                : "font-normal"
            )}
            style={{
              color: pathname.startsWith("/manuales") ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
              backgroundColor: pathname.startsWith("/manuales") ? "rgba(255,255,255,0.08)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!pathname.startsWith("/manuales")) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              if (!pathname.startsWith("/manuales")) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
              <path d="M2 2.5C2 2.22 2.22 2 2.5 2H6C6.55 2 7 2.45 7 3V12C7 12 6.5 11 5 11H2.5C2.22 11 2 10.78 2 10.5V2.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              <path d="M12 2.5C12 2.22 11.78 2 11.5 2H8C7.45 2 7 2.45 7 3V12C7 12 7.5 11 9 11H11.5C11.78 11 12 10.78 12 10.5V2.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
            <span>Manuales</span>
          </Link>

          {/* Blog — Casos de Interés */}
          <Link
            href="/blog"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-2.5 h-8 rounded-md text-sm transition-colors duration-150 mt-px",
              pathname.startsWith("/blog")
                ? "font-medium"
                : "font-normal"
            )}
            style={{
              color: pathname.startsWith("/blog") ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
              backgroundColor: pathname.startsWith("/blog") ? "rgba(255,255,255,0.08)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!pathname.startsWith("/blog")) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              if (!pathname.startsWith("/blog")) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            {/* News / blog icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
              <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
              <line x1="3.5" y1="4.5" x2="10.5" y2="4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              <line x1="3.5" y1="7" x2="10.5" y2="7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              <line x1="3.5" y1="9.5" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            <span>Casos de Interés</span>
          </Link>
        </div>

        {/* Section label */}
        <div className="px-4 pb-1.5 pt-3">
          <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Módulos
          </p>
        </div>

        {/* Module list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          <ul className="space-y-px">
            {modules.map((mod, idx) => {
              const isActive = pathname === `/modulo/${mod.slug}`;

              return (
                <li key={mod.id}>
                  <Link
                    href={`/modulo/${mod.slug}`}
                    onClick={onClose}
                    className="relative flex items-center gap-2.5 px-2.5 h-8 rounded-md transition-colors duration-150 group"
                    style={{
                      color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.42)",
                      backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                      fontWeight: isActive ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = "rgba(255,255,255,0.04)";
                        el.style.color = "rgba(255,255,255,0.65)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = "transparent";
                        el.style.color = "rgba(255,255,255,0.42)";
                      }
                    }}
                  >
                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                      />
                    )}

                    {/* Number chip */}
                    <span
                      style={{
                        flexShrink: 0,
                        width: "18px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {mod.id}
                    </span>

                    <span style={{ fontSize: "13px", lineHeight: 1.3, flex: 1 }} className="truncate">{mod.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer progress */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>Progreso</span>
            <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)" }}>
              {currentModIdx > -1 ? currentModIdx + 1 : 0} / {modules.length}
            </span>
          </div>
          <div className="h-px rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: currentModIdx > -1 ? `${((currentModIdx + 1) / modules.length) * 100}%` : "0%",
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
