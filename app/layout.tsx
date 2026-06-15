import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transformación Digital Legal en Colombia | LegalTech",
  description: "Curso interactivo de LegalTech, IA aplicada al derecho, blockchain, jurimetría y marcos normativos colombianos.",
  keywords: ["LegalTech", "Colombia", "IA", "Blockchain", "Jurimetría", "Derecho Digital"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
