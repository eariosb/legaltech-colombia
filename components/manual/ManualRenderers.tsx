"use client";

import { Icon, type IconName } from "@/components/icons/Icon";
import type {
  ManualCallout,
  ManualCalloutType,
  ManualCodeBlock,
  ManualSection,
  ManualSubsection,
  ManualTable,
} from "@/data/manuals";
import { AnimateIn } from "@/components/legal-ui";

/* ────────────────────────────────────────────────────────────
 *  Callout — principle · warning · tip · norm · practice · pitfall
 * ──────────────────────────────────────────────────────────── */

const CALLOUT_META: Record<
  ManualCalloutType,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: IconName;
  }
> = {
  principle: {
    label: "Principio",
    color: "#115E59",
    bg: "rgba(15,118,110,0.05)",
    border: "rgba(15,118,110,0.18)",
    icon: "book",
  },
  warning: {
    label: "Atención",
    color: "#B91C1C",
    bg: "rgba(185,28,28,0.05)",
    border: "rgba(185,28,28,0.18)",
    icon: "flag",
  },
  tip: {
    label: "Tip",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.18)",
    icon: "bulb",
  },
  norm: {
    label: "Norma aplicable",
    color: "#1E3A8A",
    bg: "rgba(30,58,138,0.05)",
    border: "rgba(30,58,138,0.18)",
    icon: "badge",
  },
  practice: {
    label: "Buena práctica",
    color: "#0F766E",
    bg: "rgba(15,118,110,0.05)",
    border: "rgba(15,118,110,0.18)",
    icon: "shield",
  },
  pitfall: {
    label: "Error frecuente",
    color: "#B45309",
    bg: "rgba(180,83,9,0.05)",
    border: "rgba(180,83,9,0.18)",
    icon: "info",
  },
};

export function CalloutBlock({ callout }: { callout: ManualCallout }) {
  const meta = CALLOUT_META[callout.type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "14px 16px",
        borderRadius: "10px",
        backgroundColor: meta.bg,
        border: `1px solid ${meta.border}`,
        marginTop: "14px",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          color: meta.color,
          flexShrink: 0,
          marginTop: "3px",
        }}
      >
        <Icon name={meta.icon} size={15} />
      </span>
      <div>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: meta.color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: callout.title ? "2px" : "4px",
          }}
        >
          {meta.label}
        </p>
        {callout.title && (
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#0F172A",
              marginBottom: "4px",
              letterSpacing: "-0.005em",
            }}
          >
            {callout.title}
          </p>
        )}
        <p
          style={{
            fontSize: "13px",
            color: "#334155",
            lineHeight: 1.65,
          }}
        >
          {callout.body}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 *  CodeBlock — con header opcional (lenguaje + caption)
 * ──────────────────────────────────────────────────────────── */

const LANG_LABEL: Record<string, string> = {
  r: "R",
  python: "Python",
  bash: "Bash",
  text: "Texto",
  yaml: "YAML",
  json: "JSON",
  sql: "SQL",
};

export function CodeBlock({ block }: { block: ManualCodeBlock }) {
  return (
    <div
      style={{
        marginTop: "14px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#0F172A",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          backgroundColor: "#111827",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {LANG_LABEL[block.language] ?? block.language}
        </span>
        {block.caption && (
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              fontStyle: "italic",
            }}
          >
            {block.caption}
          </span>
        )}
      </div>
      <pre
        style={{
          margin: 0,
          padding: "14px 16px",
          fontSize: "12.5px",
          color: "#E2E8F0",
          lineHeight: 1.65,
          overflowX: "auto",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", Consolas, monospace',
        }}
      >
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 *  TableBlock
 * ──────────────────────────────────────────────────────────── */

export function TableBlock({ table }: { table: ManualTable }) {
  return (
    <div
      style={{
        marginTop: "14px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  borderBottom:
                    ri < table.rows.length - 1
                      ? "1px solid rgba(0,0,0,0.05)"
                      : "none",
                }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "10px 14px",
                      color: ci === 0 ? "#0F172A" : "#334155",
                      fontWeight: ci === 0 ? 500 : 400,
                      lineHeight: 1.6,
                      verticalAlign: "top",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 *  Subsection
 * ──────────────────────────────────────────────────────────── */

function Subsection({ sub }: { sub: ManualSubsection }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h3
        id={sub.id}
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#111118",
          letterSpacing: "-0.01em",
          marginBottom: sub.lead ? "8px" : "10px",
          scrollMarginTop: "80px",
        }}
      >
        {sub.title}
      </h3>

      {sub.lead && (
        <p
          style={{
            fontSize: "14px",
            color: "#52525B",
            lineHeight: 1.7,
            marginBottom: "10px",
            fontStyle: "italic",
          }}
        >
          {sub.lead}
        </p>
      )}

      {sub.body?.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: "14px",
            color: "#334155",
            lineHeight: 1.75,
            marginBottom: "10px",
          }}
        >
          {p}
        </p>
      ))}

      {sub.bullets && sub.bullets.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "10px 0 0 0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {sub.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "14px",
                color: "#334155",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: "9px",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#94A3B8",
                }}
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {sub.table && <TableBlock table={sub.table} />}

      {sub.code?.map((c, i) => (
        <CodeBlock key={i} block={c} />
      ))}

      {sub.callouts?.map((c, i) => (
        <CalloutBlock key={i} callout={c} />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 *  Section — bloque narrativo con número
 * ──────────────────────────────────────────────────────────── */

export function SectionBlock({
  section,
  accentColor,
}: {
  section: ManualSection;
  accentColor: string;
}) {
  return (
    <AnimateIn>
      <section
        id={section.id}
        style={{
          scrollMarginTop: "72px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "14px",
            marginBottom: "14px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: accentColor,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.02em",
            }}
          >
            {section.number}
          </span>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111118",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {section.title}
          </h2>
        </div>

        {section.intro && (
          <p
            style={{
              fontSize: "14.5px",
              color: "#475569",
              lineHeight: 1.75,
              marginBottom: "22px",
              maxWidth: "680px",
            }}
          >
            {section.intro}
          </p>
        )}

        {section.subsections.map((sub) => (
          <Subsection key={sub.id} sub={sub} />
        ))}
      </section>
    </AnimateIn>
  );
}

/* ────────────────────────────────────────────────────────────
 *  TableOfContents — lista plana de secciones + subsecciones
 * ──────────────────────────────────────────────────────────── */

export function ManualToc({
  sections,
  accentColor,
}: {
  sections: ManualSection[];
  accentColor: string;
}) {
  return (
    <nav aria-label="Tabla de contenido">
      <p
        style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#A1A1AA",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "12px",
        }}
      >
        Tabla de contenido
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {sections.map((s) => (
          <li key={s.id} style={{ marginBottom: "10px" }}>
            <a
              href={`#${s.id}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111118",
                textDecoration: "none",
                padding: "4px 0",
                letterSpacing: "-0.005em",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: accentColor,
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "18px",
                }}
              >
                {s.number}
              </span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
