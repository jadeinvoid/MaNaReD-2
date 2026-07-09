"use client";

import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";

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

/** Flat multi-select geographic regions — checkbox list nested under category header. */
export function FilterRegionPanel({ filters, onFiltersChange }: FilterRegionPanelProps) {
  const selected = selectedGeographicRegions(filters);
  const allRegionsActive = selected.length === 0;

  return (
    <div className="filter-region-panel w-full min-w-0" data-filter-region-panel>
      <CheckboxInput
        className="filter-region-option"
        size="sm"
        label="All regions"
        value={allRegionsActive}
        onChange={(checked) => {
          if (checked) {
            onFiltersChange(clearGeographicRegions(filters));
          }
        }}
      />

      {MOCK_GEOGRAPHIC_REGIONS.map((region) => {
        const isSelected = selected.includes(region);
        return (
          <CheckboxInput
            key={region}
            className="filter-region-option"
            size="sm"
            label={region}
            value={isSelected}
            onChange={() => onFiltersChange(toggleTagFilter(filters, "geographicRegion", region))}
          />
        );
      })}
    </div>
  );
}
