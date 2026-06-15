import type { ReactNode } from "react";

interface LegalContainerProps {
  children: ReactNode;
  /** "content" = 768px (module content), "wide" = 1280px (index), "full" = no max */
  width?: "content" | "wide" | "full";
  className?: string;
}

const widths = {
  content: "max-w-3xl",
  wide:    "max-w-7xl",
  full:    "",
};

/**
 * Consistent layout wrapper.
 * Applies the 8px-grid-aligned padding (px-6 lg:px-8) and max-width.
 */
export function LegalContainer({ children, width = "content", className = "" }: LegalContainerProps) {
  return (
    <main className={`mx-auto w-full px-6 lg:px-8 py-8 ${widths[width]} ${className}`}>
      {children}
    </main>
  );
}
