"use client";

import type { ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";

/** Category row layout — label left, chevron pinned to header collapse column. */
export const FILTER_ROW_BUTTON = "flex w-full items-center justify-between pl-2 pr-0";

export type FilterRowProps = {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  activeCount?: number;
  children?: ReactNode;
};

/** Single filter category row in the sidebar — Figma `filter/category` (349:4572). */
export function FilterRow({
  id,
  label,
  expanded,
  onToggle,
  activeCount = 0,
  children,
}: FilterRowProps) {
  const panelId = `filter-panel-${id}`;
  const displayLabel = activeCount > 0 ? `${label} (${activeCount})` : label;

  return (
    <div className="flex w-full flex-col items-stretch gap-1">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between overflow-hidden pl-2 pr-0"
      >
        <span className="min-w-0 flex-1 truncate px-2 py-1 text-left text-3xs uppercase text-primary">
          {displayLabel}
        </span>
        <MaNaReDIcon
          name="chevron-down"
          size={24}
          className={`shrink-0 text-primary transition-transform duration-[var(--duration-fast,175ms)] ${expanded ? "rotate-180" : ""}`}
          label={expanded ? `Collapse ${label} filter` : `Expand ${label} filter`}
        />
      </button>
      {expanded ? (
        <div id={panelId} className="w-full px-2 pb-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}
