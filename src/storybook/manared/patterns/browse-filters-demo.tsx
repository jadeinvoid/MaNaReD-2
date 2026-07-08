"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { VStack } from "@astryxdesign/core/Layout";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import {
  filtersToChipItems,
  removeFilter,
  type FilterState,
} from "@/app/components/manared/composites/filter-state";

export type BrowseFiltersDemoProps = {
  children: ReactNode;
};

function isTabletTier(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
}

/** Client wrapper wiring FilterSidebar selections to ChipBar in browse patterns. */
export function BrowseFiltersDemo({ children }: BrowseFiltersDemoProps) {
  const [filters, setFilters] = useState<FilterState>({ active: [] });
  const [collapsed, setCollapsed] = useState(isTabletTier);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setCollapsed(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      <FilterSidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        filters={filters}
        onFiltersChange={setFilters}
      />
      <VStack gap={4} className="flex-1 p-4">
        <ChipBar
          chips={filtersToChipItems(filters)}
          onMoreFilters={() => setCollapsed(false)}
          onRemoveChip={(id) => setFilters((current) => removeFilter(current, id))}
        />
        {children}
      </VStack>
    </>
  );
}
