import { notFound } from "next/navigation";
import Link from "next/link";
import { manuals, getManualBySlug } from "@/data/manuals";
import { CourseShell } from "@/components/layout/CourseShell";
import { ManualHero } from "@/components/manual/ManualHero";
import {
  SectionBlock,
  ManualToc,
} from "@/components/manual/ManualRenderers";
import { Icon } from "@/components/icons/Icon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return manuals.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const manual = getManualBySlug(slug);
  if (!manual) return { title: "Manual no encontrado" };
  return {
    title: `${manual.title} | LegalTech Colombia`,
    description: manual.summary,
  };
}

export default async function ManualPage({ params }: PageProps) {
  const { slug } = await params;
  const manual = getManualBySlug(slug);
  if (!manual) notFound();

  const other = manuals.find((m) => m.slug !== manual.slug);

  return (
    <CourseShell>
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "36px 32px 80px",
          }}
        >
          {/* Back link */}
          <Link
            href="/manuales"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#64748B",
              textDecoration: "none",
              marginBottom: "18px",
            }}
          >
            <Icon name="arrow-left" size={13} />
            Volver a manuales
          </Link>

          {/* Layout: TOC aside + content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: "40px",
            }}
            className="manual-layout"
          >
            {/* Main column */}
            <div style={{ minWidth: 0 }}>
              <ManualHero manual={manual} />

              {/* Mobile TOC (visible on small screens) */}
              <div
                className="manual-toc-mobile"
                style={{
                  padding: "18px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.07)",
                  marginBottom: "32px",
                }}
              >
                <ManualToc sections={manual.sections} accentColor={manual.color} />
              </div>

              {/* Sections */}
              {manual.sections.map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  accentColor={manual.color}
                />
              ))}

              {/* Closing note */}
              <div
                style={{
                  marginTop: "32px",
                  padding: "22px 24px",
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderLeft: `3px solid ${manual.color}`,
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: manual.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "10px",
                  }}
                >
                  Cierre
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#1F2937",
                    lineHeight: 1.75,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {manual.closingNote}
                </p>
              </div>

              {/* Jump to other manual */}
              {other && (
                <Link
                  href={`/manuales/${other.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    marginTop: "24px",
                    padding: "18px 20px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    transition: "border-color 150ms ease",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#A1A1AA",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "4px",
                      }}
                    >
                      Continúa con el otro manual
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#111118",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {other.title}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#64748B",
                        marginTop: "2px",
                      }}
                    >
                      {other.subtitle}
                    </p>
                  </div>
                  <Icon
                    name="arrow-right"
                    size={16}
                    color={other.color}
                    style={{ flexShrink: 0 }}
                  />
                </Link>
              )}

              {/* Nota legal */}
              <p
                style={{
                  fontSize: "11px",
                  color: "#A1A1AA",
                  lineHeight: 1.6,
                  marginTop: "28px",
                  maxWidth: "620px",
                }}
              >
                Material de apoyo educativo. No constituye asesoría legal.
                Consulte con un profesional habilitado para decisiones
                jurídicas. Normativa vigente al 01/03/2026.
              </p>
            </div>

            {/* Sticky TOC (desktop) */}
            <aside
              className="manual-toc-aside"
              style={{
                position: "sticky",
                top: "80px",
                alignSelf: "start",
                padding: "20px 22px",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                display: "none",
              }}
            >
              <ManualToc sections={manual.sections} accentColor={manual.color} />
            </aside>
          </div>
        </div>
      </div>
    </CourseShell>
  );
}
