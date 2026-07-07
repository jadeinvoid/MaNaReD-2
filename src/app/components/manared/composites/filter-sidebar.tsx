"use client";

import { useCallback, useState } from "react";

import { FilterButton } from "../primitives/filter-button";
import { GRADIENT_FILTER } from "../primitives/gradient-styles";
import { FilterDropdownPanel } from "./filter-dropdown-panel";
import { FilterRangePanel } from "./filter-range-panel";
import { FilterRow } from "./filter-row";
import {
  activeCountForCategory,
  clearAllFilters,
  FILTER_CATEGORIES,
  MOCK_BIOACTIVITY_TAGS,
  MOCK_COMPOUND_CLASSES,
  MW_DEFAULT_RANGE,
  setDropdownFilter,
  setRangeFilter,
  toggleTagFilter,
  type FilterCategoryId,
  type FilterState,
} from "./filter-state";
import { FilterTagPanel } from "./filter-tag-panel";

export type FilterSidebarProps = {
  filters?: FilterState;
  defaultFilters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  onClear?: () => void;
};

const PLACEHOLDER_CATEGORIES = new Set<FilterCategoryId>([
  "taxonomy",
  "geographicRegion",
  "targetAssay",
]);

function selectedTags(state: FilterState, category: FilterCategoryId): string[] {
  return state.active
    .filter((filter) => filter.category === category)
    .map((filter) => filter.label);
}

function selectedDropdownValue(state: FilterState, category: FilterCategoryId): string | null {
  return state.active.find((filter) => filter.category === category)?.label ?? null;
}

function selectedRange(state: FilterState, category: FilterCategoryId): [number, number] {
  const rangeFilter = state.active.find((filter) => filter.category === category);
  if (!rangeFilter) {
    return MW_DEFAULT_RANGE;
  }

  const match = /^MW (\d+)–(\d+)$/.exec(rangeFilter.label);
  if (!match) {
    return MW_DEFAULT_RANGE;
  }

  return [Number(match[1]), Number(match[2])];
}

/** Filter sidebar from Figma `filter/container` (349:4572). */
export function FilterSidebar({
  filters: controlledFilters,
  defaultFilters = { active: [] },
  onFiltersChange,
  onClear,
}: FilterSidebarProps) {
  const [internalFilters, setInternalFilters] = useState<FilterState>(defaultFilters);
  const [expandedCategory, setExpandedCategory] = useState<FilterCategoryId | null>(null);
  const [rangeDraft, setRangeDraft] = useState<[number, number]>(MW_DEFAULT_RANGE);

  const filters = controlledFilters ?? internalFilters;

  const updateFilters = useCallback(
    (next: FilterState) => {
      if (controlledFilters === undefined) {
        setInternalFilters(next);
      }
      onFiltersChange?.(next);
    },
    [controlledFilters, onFiltersChange],
  );

  const handleClear = () => {
    updateFilters(clearAllFilters());
    setRangeDraft(MW_DEFAULT_RANGE);
    onClear?.();
  };

  const renderPanel = (categoryId: FilterCategoryId) => {
    if (PLACEHOLDER_CATEGORIES.has(categoryId)) {
      return <p className="text-right text-3xs italic text-tertiary">Not available in prototype</p>;
    }

    if (categoryId === "bioactivity") {
      return (
        <FilterTagPanel
          tags={MOCK_BIOACTIVITY_TAGS}
          selected={selectedTags(filters, categoryId)}
          onToggle={(tag) => updateFilters(toggleTagFilter(filters, categoryId, tag))}
        />
      );
    }

    if (categoryId === "molecularWeight") {
      const currentRange = selectedRange(filters, categoryId);
      const value = expandedCategory === "molecularWeight" ? rangeDraft : currentRange;

      return (
        <FilterRangePanel
          value={value}
          onChange={(next) => {
            setRangeDraft(next);
            updateFilters(setRangeFilter(filters, categoryId, next[0], next[1]));
          }}
        />
      );
    }

    if (categoryId === "compoundClass") {
      return (
        <FilterDropdownPanel
          options={MOCK_COMPOUND_CLASSES}
          value={selectedDropdownValue(filters, categoryId)}
          onChange={(value) => updateFilters(setDropdownFilter(filters, categoryId, value))}
        />
      );
    }

    return null;
  };

  return (
    <aside
      className={`${GRADIENT_FILTER} flex h-full min-h-0 shrink-0 flex-col gap-1 overflow-y-auto rounded-md px-1 py-4 backdrop-blur-[2px]`}
    >
      {FILTER_CATEGORIES.map(({ id, label }) => (
        <FilterRow
          key={id}
          id={id}
          label={label}
          activeCount={activeCountForCategory(filters, id)}
          expanded={expandedCategory === id}
          onToggle={() => {
            setExpandedCategory((current) => {
              const next = current === id ? null : id;
              if (next === "molecularWeight") {
                const draft = selectedRange(filters, "molecularWeight");
                setRangeDraft(draft);
                if (!filters.active.some((filter) => filter.category === "molecularWeight")) {
                  updateFilters(setRangeFilter(filters, "molecularWeight", draft[0], draft[1]));
                }
              }
              return next;
            });
          }}
        >
          {renderPanel(id)}
        </FilterRow>
      ))}

      <div className="min-h-0 flex-1" aria-hidden />

      <div className="flex w-full justify-end">
        <FilterButton variant="clear-all" onClick={handleClear} />
      </div>
    </aside>
  );
}
