import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";

interface NormQuoteProps {
  children: ReactNode;
  source?: string;
  /** Law / article reference */
  citation?: string;
  color?: string;
}

/**
 * Legal blockquote component for quoting law text or authoritative statements.
 * Left border accent in navy, subtle gray background, monospace citation.
 */
export function NormQuote({ children, source, citation, color = "#1E3A8A" }: NormQuoteProps) {
  return (
    <div
      className="rounded-r-lg py-4 px-5 my-5 bg-[#F8FAFC] border-l-[3px] border-[#E5E7EB]"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start gap-3">
        <Icon
          name="briefcase"
          size={14}
          color={color}
          className="flex-shrink-0 mt-1"
        />
        <div>
          <p className="text-[15px] text-[#1E293B] leading-relaxed italic">
            {children}
          </p>
          {(source || citation) && (
            <p className="mt-2 text-xs font-mono text-[#6B7280]">
              {citation && <span className="font-semibold not-italic mr-2">{citation}</span>}
              {source && <span className="not-italic">{source}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
