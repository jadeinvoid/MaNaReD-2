"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { VStack } from "@astryxdesign/core/Layout";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import {
  filtersToChipItems,
  removeFilter,
  type FilterCategoryId,
  type FilterState,
} from "@/app/components/manared/composites/filter-state";

export type BrowseFiltersDemoProps = {
  children: ReactNode | ((filters: FilterState) => ReactNode);
};

/** Client wrapper wiring FilterSidebar selections to ChipBar in browse patterns. */
export function BrowseFiltersDemo({ children }: BrowseFiltersDemoProps) {
  const [filters, setFilters] = useState<FilterState>({ active: [] });
  const [collapsed, setCollapsed] = useState(false);
  const [expandRequest, setExpandRequest] = useState<FilterCategoryId | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setCollapsed(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="grid h-full min-h-0 flex-1 grid-cols-[auto_minmax(0,1fr)] gap-4 overflow-hidden">
      <div className="filter-sidebar-host h-full min-h-0">
        <FilterSidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          filters={filters}
          onFiltersChange={setFilters}
          requestExpandCategory={expandRequest}
          onRequestExpandCategoryHandled={() => setExpandRequest(null)}
        />
      </div>
      <VStack gap={4} className="min-h-0 overflow-y-auto p-4">
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
        />
        {typeof children === "function" ? children(filters) : children}
      </VStack>
    </div>
  );
}
