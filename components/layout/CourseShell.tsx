"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

export function CourseShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <main
        className="lg:ml-[272px] pt-16 min-h-screen"
        onClick={() => menuOpen && setMenuOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}
