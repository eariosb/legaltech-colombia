"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/data/course";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

interface HeaderProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentModule = modules.find((m) => pathname === `/modulo/${m.slug}`);
  const nextModule = currentModule ? modules.find((m) => m.id === currentModule.id + 1) : null;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
    else setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const results = query.length > 1
    ? modules.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 z-20 h-[52px] flex items-center px-4 md:px-5 gap-3",
          "left-0 lg:left-[256px]",
          "transition-all duration-150"
        )}
        style={{
          backgroundColor: scrolled ? "rgba(250,250,249,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        }}
      >
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-150"
          style={{ color: "#71717A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <Icon name="close" size={14} /> : <Icon name="menu" size={14} />}
        </button>

        {/* Breadcrumb */}
        <nav className="flex-1 flex items-center gap-1 min-w-0" style={{ fontSize: "13px" }}>
          <Link
            href="/"
            className="transition-colors duration-150 shrink-0"
            style={{ color: "#A1A1AA", fontWeight: 400 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#71717A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#A1A1AA"; }}
          >
            Curso
          </Link>
          {currentModule && (
            <>
              <Icon name="arrow-right" size={12} color="#D4D4D4" className="shrink-0" />
              <span className="truncate font-medium" style={{ color: "#3F3F46" }}>
                {currentModule.title}
              </span>
            </>
          )}
          {pathname === "/" && (
            <Icon name="arrow-right" size={12} color="#D4D4D4" className="shrink-0 hidden" />
          )}
        </nav>

        {/* Next module — desktop */}
        {nextModule && (
          <Link
            href={`/modulo/${nextModule.slug}`}
            className="hidden md:flex items-center gap-1.5 transition-colors duration-150 shrink-0"
            style={{ color: "#A1A1AA", fontSize: "12px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#71717A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#A1A1AA"; }}
          >
            <span className="truncate max-w-[140px]">{nextModule.title}</span>
            <Icon name="arrow-right" size={12} className="shrink-0" />
          </Link>
        )}

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-1.5 px-2.5 h-7 rounded-md border transition-colors duration-150"
          style={{
            color: "#A1A1AA",
            borderColor: "rgba(0,0,0,0.1)",
            backgroundColor: "transparent",
            fontSize: "12px",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(0,0,0,0.15)";
            el.style.color = "#71717A";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(0,0,0,0.1)";
            el.style.color = "#A1A1AA";
          }}
        >
          <Icon name="magnifier" size={12} className="shrink-0" />
          <span className="hidden sm:block">Buscar</span>
          <kbd
            className="hidden sm:block font-mono"
            style={{ fontSize: "10px", color: "#C4C4C4", background: "none" }}
          >
            ⌘K
          </kbd>
        </button>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setSearchOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <div
            className="relative w-full max-w-md animate-reveal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-xl overflow-hidden border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "rgba(0,0,0,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <Icon name="magnifier" size={14} color="#A1A1AA" className="shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar módulos y conceptos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: "14px", color: "#111118" }}
                />
                {query && (
                  <button onClick={() => setQuery("")} style={{ color: "#A1A1AA" }}>
                    <Icon name="close" size={14} />
                  </button>
                )}
                <kbd style={{ fontSize: "10px", color: "#C4C4C4", fontFamily: "monospace" }}>ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-1">
                {query.length > 1 && results.length === 0 && (
                  <p className="px-4 py-6 text-sm text-center" style={{ color: "#A1A1AA" }}>
                    Sin resultados para «{query}»
                  </p>
                )}

                {(results.length > 0 ? results : modules).map((m) => (
                  <Link
                    key={m.id}
                    href={`/modulo/${m.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-100 group"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F5F5F4"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                  >
                    <span className="shrink-0 w-7 flex items-center justify-center" style={{ color: "#71717A" }}>
                      <Icon name={m.icon} size={14} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#3F3F46" }}>
                        <span style={{ color: "#A1A1AA", fontWeight: 400, marginRight: "6px", fontSize: "11px" }}>
                          M{m.id}
                        </span>
                        {m.title}
                      </p>
                      <p className="truncate mt-0.5" style={{ fontSize: "11px", color: "#A1A1AA" }}>
                        {m.subtitle}
                      </p>
                    </div>
                    <Icon
                      name="arrow-right"
                      size={12}
                      color="#A1A1AA"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ))}
              </div>

              {!query && (
                <div className="px-4 py-2.5 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <p style={{ fontSize: "11px", color: "#A1A1AA" }}>
                    9 módulos · 36 horas de contenido
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
