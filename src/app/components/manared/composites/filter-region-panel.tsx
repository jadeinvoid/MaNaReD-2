"use client";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  clearGeographicRegions,
  MOCK_GEOGRAPHIC_REGIONS,
  selectedGeographicRegions,
  toggleTagFilter,
  type FilterState,
} from "./filter-state";

export type FilterRegionPanelProps = {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
};

const REGION_ITEM_BASE =
  "flex w-full items-center justify-start rounded-md border px-2 py-0.5 text-left text-3xs";

function regionItemClass(isSelected: boolean): string {
  return isSelected
    ? `${REGION_ITEM_BASE} border-border-secondary bg-chip-active text-secondary`
    : `${REGION_ITEM_BASE} border-transparent bg-transparent text-tertiary hover:bg-body-secondary`;
}

/** Flat multi-select geographic regions — matches taxonomy leaf / filter panel lower-rank styling. */
export function FilterRegionPanel({ filters, onFiltersChange }: FilterRegionPanelProps) {
  const selected = selectedGeographicRegions(filters);
  const allRegionsActive = selected.length === 0;

  return (
    <div className="flex min-h-0 w-full flex-col gap-0.5 px-0 py-0.5" data-filter-region-panel>
      <button
        type="button"
        aria-pressed={allRegionsActive}
        onClick={() => onFiltersChange(clearGeographicRegions(filters))}
        className={regionItemClass(allRegionsActive)}
      >
        <span className="min-w-0 flex-1 truncate">All regions</span>
        <MaNaReDIcon name="chevron-down" size={24} className="shrink-0 text-primary" aria-hidden />
      </button>

      <div className="flex w-full flex-col gap-px pl-4">
        {MOCK_GEOGRAPHIC_REGIONS.map((region) => {
          const isSelected = selected.includes(region);
          return (
            <button
              key={region}
              type="button"
              aria-label={region}
              aria-pressed={isSelected}
              onClick={() => onFiltersChange(toggleTagFilter(filters, "geographicRegion", region))}
              className={regionItemClass(isSelected)}
            >
              <span className="min-w-0 flex-1 truncate">{region}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
