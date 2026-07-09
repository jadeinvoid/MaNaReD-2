"use client";

import { CheckboxList, CheckboxListItem } from "@astryxdesign/core/CheckboxList";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  clearGeographicRegions,
  MOCK_GEOGRAPHIC_REGIONS,
  selectedGeographicRegions,
  setGeographicRegions,
  type FilterState,
} from "./filter-state";

export type FilterRegionPanelProps = {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
};

/** Flat multi-select geographic regions — UX §5 additive categorical (checkbox list). */
export function FilterRegionPanel({ filters, onFiltersChange }: FilterRegionPanelProps) {
  const selected = selectedGeographicRegions(filters);
  const allRegionsActive = selected.length === 0;

  return (
    <div className="flex w-full min-w-0 flex-col gap-1 py-0.5" data-filter-region-panel>
      <button
        type="button"
        aria-pressed={allRegionsActive}
        onClick={() => onFiltersChange(clearGeographicRegions(filters))}
        className={[
          "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-3xs",
          allRegionsActive
            ? "bg-chip-active text-secondary"
            : "text-primary hover:bg-body-secondary",
        ].join(" ")}
      >
        <span>All regions</span>
        <MaNaReDIcon name="chevron-up" size={16} className="shrink-0 text-tertiary" aria-hidden />
      </button>

      <CheckboxList
        label="Geographic regions"
        isLabelHidden
        density="compact"
        value={selected}
        onChange={(values) => onFiltersChange(setGeographicRegions(filters, values))}
      >
        {MOCK_GEOGRAPHIC_REGIONS.map((region) => (
          <CheckboxListItem key={region} label={region} value={region} />
        ))}
      </CheckboxList>
    </div>
  );
}
