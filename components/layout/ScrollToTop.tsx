"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window to the top whenever the pathname changes.
 * Mount this inside any layout that wraps page content.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first render (page load) — the browser handles that.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
