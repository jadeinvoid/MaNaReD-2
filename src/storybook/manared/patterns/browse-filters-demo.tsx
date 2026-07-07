"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { VStack } from "@astryxdesign/core/Layout";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import {
  filtersToChipItems,
  type FilterState,
} from "@/app/components/manared/composites/filter-state";

export type BrowseFiltersDemoProps = {
  children: ReactNode;
};

/** Client wrapper wiring FilterSidebar selections to ChipBar in browse patterns. */
export function BrowseFiltersDemo({ children }: BrowseFiltersDemoProps) {
  const [filters, setFilters] = useState<FilterState>({ active: [] });

  return (
    <>
      <FilterSidebar onFiltersChange={setFilters} />
      <VStack gap={4} className="flex-1">
        <ChipBar chips={filtersToChipItems(filters)} />
        {children}
      </VStack>
    </>
  );
}
