import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { manuals } from "@/data/manuals";
import { CourseShell } from "@/components/layout/CourseShell";
import { ManualCard } from "@/components/manual/ManualCard";

export const metadata = {
  title: "Manuales de práctica | LegalTech Colombia",
  description:
    "Manuales complementarios al curso: desarrollo de software LegalTech y ejercicio legal en LegalTech.",
};

export default function ManualesIndexPage() {
  return (
    <CourseShell>
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh" }}>
        <section
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "56px 40px 80px",
          }}
        >
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#64748B",
              textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            <Icon name="arrow-left" size={13} />
            Volver a la portada
          </Link>

          {/* Eyebrow */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#A1A1AA",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Material complementario
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#111118",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: "14px",
              maxWidth: "640px",
            }}
          >
            Manuales de práctica
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: "620px",
              marginBottom: "36px",
            }}
          >
            Dos manuales paralelos que caminan con el curso. El técnico describe
            cómo se construye un producto LegalTech sin perder precisión
            jurídica. El legal describe cómo se ejerce la profesión cuando la
            tecnología vive dentro del despacho. La competencia LegalTech
            aparece cuando los dos se leen juntos.
          </p>

          {/* Manual cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            {manuals.map((m) => (
              <ManualCard key={m.slug} manual={m} />
            ))}
          </div>

          {/* Reading note */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#A1A1AA",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "6px",
              }}
            >
              Cómo leerlos
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                lineHeight: 1.7,
              }}
            >
              Esto es una referencia activa. Cada sección puede aclarar una decisión:
              cambiar un patrón en el código, añadir una cláusula al retainer,
              activar un control, recordar un procedimiento. Use el manual como plantilla inicial y
              adáptelo a la realidad de su caso o proyecto.
            </p>
          </div>
        </section>
      </div>
    </CourseShell>
  );
}
