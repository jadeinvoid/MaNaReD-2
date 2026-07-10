"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { VStack } from "@astryxdesign/core/Layout";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import type { ResultsViewMode } from "@/app/components/manared/composites/results-view";
import {
  filtersToChipItems,
  removeFilter,
  type FilterCategoryId,
  type FilterState,
} from "@/app/components/manared/composites/filter-state";

export type BrowseFiltersDemoProps = {
  defaultViewMode?: ResultsViewMode;
  children: ReactNode | ((filters: FilterState, viewMode: ResultsViewMode) => ReactNode);
};

function isTabletTier(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
}

/** Client wrapper wiring FilterSidebar selections to ChipBar in browse patterns. */
export function BrowseFiltersDemo({ defaultViewMode = "card", children }: BrowseFiltersDemoProps) {
  const [filters, setFilters] = useState<FilterState>({ active: [] });
  const [viewMode, setViewMode] = useState<ResultsViewMode>(defaultViewMode);
  const [collapsed, setCollapsed] = useState(isTabletTier);
  const [expandRequest, setExpandRequest] = useState<FilterCategoryId | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setCollapsed(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex w-full flex-1 items-stretch gap-4">
      <FilterSidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        filters={filters}
        onFiltersChange={setFilters}
        requestExpandCategory={expandRequest}
        onRequestExpandCategoryHandled={() => setExpandRequest(null)}
      />
      <VStack gap={4} className="flex-1 p-4">
        <ChipBar
          chips={filtersToChipItems(filters)}
          onMoreFilters={() => setCollapsed(false)}
          onRemoveChip={(id) => setFilters((current) => removeFilter(current, id))}
          onChipClick={(id) => {
            if (id.startsWith("molecularWeight")) {
              setCollapsed(false);
              setExpandRequest("molecularWeight");
              return;
            }
            if (id.startsWith("geographicRegion:")) {
              setCollapsed(false);
              setExpandRequest("geographicRegion");
              return;
            }
            if (id.startsWith("bioactivity:")) {
              setCollapsed(false);
              setExpandRequest("bioactivity");
              return;
            }
            if (id.startsWith("targetAssay:")) {
              setCollapsed(false);
              setExpandRequest("targetAssay");
            }
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        {typeof children === "function" ? children(filters, viewMode) : children}
      </VStack>
    </div>
  );
}
