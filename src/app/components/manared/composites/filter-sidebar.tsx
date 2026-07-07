"use client";

import { useCallback, useState, type ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { FilterButton } from "../primitives/filter-button";
import { FILTER_SIDEBAR_SHELL, GRADIENT_FILTER } from "../primitives/gradient-styles";
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
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onApply?: () => void;
  showCollapseControl?: boolean;
};

const PLACEHOLDER_CATEGORIES = new Set<FilterCategoryId>([
  "taxonomy",
  "geographicRegion",
  "targetAssay",
]);

function FilterSidebarReveal({ collapsed, children }: { collapsed: boolean; children: ReactNode }) {
  return (
    <div
      className="filter-sidebar-reveal"
      data-collapsed={collapsed ? "true" : "false"}
      aria-hidden={collapsed}
    >
      <div className="filter-sidebar-reveal-inner">{children}</div>
    </div>
  );
}

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

/** Filter sidebar from Figma `filter/container` (349:4572) with chrome from `332:9061`. */
export function FilterSidebar({
  filters: controlledFilters,
  defaultFilters = { active: [] },
  onFiltersChange,
  onClear,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  onApply,
  showCollapseControl = true,
}: FilterSidebarProps) {
  const [internalFilters, setInternalFilters] = useState<FilterState>(defaultFilters);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [expandedCategory, setExpandedCategory] = useState<FilterCategoryId | null>(null);
  const [rangeDraft, setRangeDraft] = useState<[number, number]>(MW_DEFAULT_RANGE);

  const filters = controlledFilters ?? internalFilters;
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const activeFilterCount = filters.active.length;

  const setCollapsed = (next: boolean) => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(next);
    }
    onCollapsedChange?.(next);
  };

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

  const handleApply = () => {
    onApply?.();
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

  const shellClass = [
    GRADIENT_FILTER,
    FILTER_SIDEBAR_SHELL,
    "flex h-full min-h-0 flex-col gap-1 overflow-hidden rounded-md px-1 py-4 backdrop-blur-[2px]",
  ].join(" ");

  return (
    <aside className={shellClass} data-collapsed={collapsed ? "true" : "false"}>
      {showCollapseControl ? (
        <header
          className={`flex w-full shrink-0 flex-col items-center gap-1 ${collapsed ? "pb-1" : "items-end pb-2"}`}
          data-name="filter-sidebar/collapse"
        >
          <button
            type="button"
            className="flex size-8 items-center justify-center"
            aria-label={collapsed ? "Expand filters" : "Collapse filters"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <MaNaReDIcon
              name={collapsed ? "vertical-collapse" : "expand-left"}
              size={32}
              className="text-current"
            />
          </button>
          {collapsed && activeFilterCount > 0 ? (
            <span
              className="flex size-6 items-center justify-center rounded-full bg-button-active text-3xs font-semibold text-primary"
              aria-label={`${activeFilterCount} active filters`}
            >
              {activeFilterCount}
            </span>
          ) : null}
        </header>
      ) : null}

      <FilterSidebarReveal collapsed={collapsed}>
        <header
          className="flex w-full shrink-0 items-center justify-between gap-2 px-1"
          data-name="filter-sidebar/header"
        >
          <FilterButton variant="refine-result" />
          <FilterButton variant="clear-all" onClick={handleClear} />
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
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
        </div>

        <footer
          className="flex w-full shrink-0 justify-end px-1 pt-1"
          data-name="filter-sidebar/footer"
        >
          <FilterButton variant="apply-filter" onClick={handleApply} />
        </footer>
      </FilterSidebarReveal>
    </aside>
  );
}
