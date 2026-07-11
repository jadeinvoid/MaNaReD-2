"use client";

import type { ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { INTERACTIVE_FILTER_CATEGORY_ROW } from "../primitives/interactive-styles";

/** Category row layout — label left, chevron pinned to header collapse column. */
export const FILTER_ROW_BUTTON = "flex w-full items-center justify-between pl-2 pr-1";

export type FilterRowProps = {
  id: string;
  label: string;
  expanded: boolean;
  forceCollapsed?: boolean;
  onToggle: () => void;
  activeCount?: number;
  panelClassName?: string;
  children?: ReactNode;
};

/** Single filter category row in the sidebar — Figma `filter/category` (349:4572). */
export function FilterRow({
  id,
  label,
  expanded,
  forceCollapsed = false,
  onToggle,
  activeCount = 0,
  panelClassName,
  children,
}: FilterRowProps) {
  const panelId = `filter-panel-${id}`;
  const isExpanded = forceCollapsed ? false : expanded;
  const displayLabel = activeCount > 0 ? `${label} (${activeCount})` : label;

  return (
    <div className="flex w-full flex-col items-stretch gap-0.5">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={INTERACTIVE_FILTER_CATEGORY_ROW}
      >
        <span className="min-w-0 flex-1 truncate px-2 py-0.5 text-left text-3xs uppercase text-primary">
          {displayLabel}
        </span>
        <MaNaReDIcon
          name="chevron-down"
          size={24}
          className={`shrink-0 text-primary transition-transform duration-[var(--duration-fast,175ms)] ${isExpanded ? "rotate-180" : ""}`}
          label={isExpanded ? `Collapse ${label} filter` : `Expand ${label} filter`}
        />
      </button>
      {isExpanded ? (
        <div id={panelId} className={panelClassName ?? "w-full px-2 pb-1"}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
