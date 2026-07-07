"use client";

import type { ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";

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
    <div className="flex w-full flex-col items-end gap-1">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-end gap-1 overflow-hidden pl-2 pr-1 text-left"
      >
        <span className="px-2 py-1 text-3xs uppercase text-primary">{displayLabel}</span>
        <MaNaReDIcon
          name="arrow-down"
          size={24}
          className={`text-primary transition-transform duration-[var(--duration-fast,175ms)] ${expanded ? "rotate-180" : ""}`}
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
