"use client";

import { useCallback, useState, type ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { FilterButton } from "../primitives/filter-button";
import {
  FILTER_BAR_SURFACE,
  FILTER_SIDEBAR_SHELL,
  GRADIENT_FILTER_PANEL,
} from "../primitives/gradient-styles";
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
import { FilterTaxonomyPanel } from "./filter-taxonomy-panel";

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

const PLACEHOLDER_CATEGORIES = new Set<FilterCategoryId>(["geographicRegion", "targetAssay"]);

function FilterSidebarReveal({ collapsed, children }: { collapsed: boolean; children: ReactNode }) {
  return (
    <div
      className="filter-sidebar-reveal"
      data-collapsed={collapsed ? "true" : "false"}
      aria-hidden={collapsed}
    >
      <div className="filter-sidebar-reveal-inner min-w-0">{children}</div>
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

/** Filter sidebar from Figma `filter-bar` (351:1736). */
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
  const [expandedCategories, setExpandedCategories] = useState<FilterCategoryId[]>([]);
  const [rangeDraft, setRangeDraft] = useState<[number, number]>(MW_DEFAULT_RANGE);

  const filters = controlledFilters ?? internalFilters;
  const collapsed = controlledCollapsed ?? internalCollapsed;

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

  void onApply;

  const allCategoriesCollapsed = expandedCategories.length === 0;

  const collapseAllCategories = () => {
    setExpandedCategories([]);
  };

  const renderPanel = (categoryId: FilterCategoryId) => {
    if (PLACEHOLDER_CATEGORIES.has(categoryId)) {
      return <p className="text-right text-3xs italic text-tertiary">Not available in prototype</p>;
    }

    if (categoryId === "taxonomy") {
      return <FilterTaxonomyPanel filters={filters} onFiltersChange={updateFilters} />;
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
      const value = expandedCategories.includes("molecularWeight") ? rangeDraft : currentRange;

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
    FILTER_BAR_SURFACE,
    FILTER_SIDEBAR_SHELL,
    "flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-tr-md rounded-br-md",
  ].join(" ");

  const containerClass = [
    GRADIENT_FILTER_PANEL,
    "flex min-h-0 flex-1 flex-col gap-1 overflow-hidden rounded-md px-1 py-4",
  ].join(" ");

  const showHeaderToggle = showCollapseControl || collapsed;

  return (
    <aside className={shellClass} data-collapsed={collapsed ? "true" : "false"}>
      <header
        className={`flex h-8 w-full shrink-0 items-center ${collapsed ? "justify-center px-0" : "gap-2 px-1"}`}
        data-name="filter/header"
        data-collapsed-header={collapsed ? "true" : "false"}
      >
        {collapsed ? (
          showHeaderToggle ? (
            <button
              type="button"
              className="flex size-6 shrink-0 items-center justify-center text-primary"
              aria-label="Expand filters"
              aria-expanded={false}
              onClick={() => setCollapsed(false)}
            >
              <MaNaReDIcon name="expand" size={24} className="text-current" />
            </button>
          ) : null
        ) : (
          <>
            <FilterSidebarReveal collapsed={false}>
              <FilterButton variant="refine-result" />
            </FilterSidebarReveal>
            {showCollapseControl ? (
              <button
                type="button"
                className="flex size-6 shrink-0 items-center justify-center text-primary"
                aria-label="Collapse filters"
                aria-expanded
                onClick={() => setCollapsed(true)}
              >
                <MaNaReDIcon name="expand-left" size={24} className="text-current" />
              </button>
            ) : null}
          </>
        )}
      </header>

      <div className={containerClass} data-name="filter/container">
        {collapsed ? (
          <div className="filter-sidebar-collapsed-rail" aria-hidden />
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
              {FILTER_CATEGORIES.map(({ id, label }) => (
                <FilterRow
                  key={id}
                  id={id}
                  label={label}
                  activeCount={activeCountForCategory(filters, id)}
                  expanded={expandedCategories.includes(id)}
                  forceCollapsed={allCategoriesCollapsed}
                  panelClassName={
                    id === "taxonomy"
                      ? "w-full pb-1"
                      : id === "molecularWeight"
                        ? "w-full pb-2"
                        : undefined
                  }
                  onToggle={() => {
                    setExpandedCategories((current) => {
                      const isExpanded = current.includes(id);
                      const next = isExpanded
                        ? current.filter((categoryId) => categoryId !== id)
                        : [...current, id];
                      if (!isExpanded && id === "molecularWeight") {
                        const draft = selectedRange(filters, "molecularWeight");
                        setRangeDraft(draft);
                        if (
                          !filters.active.some((filter) => filter.category === "molecularWeight")
                        ) {
                          updateFilters(
                            setRangeFilter(filters, "molecularWeight", draft[0], draft[1]),
                          );
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
          </>
        )}
      </div>

      <footer
        className={`flex w-full shrink-0 items-start gap-2 ${collapsed ? "h-[33px]" : ""}`}
        data-name="filter/footer"
      >
        <FilterSidebarReveal collapsed={collapsed}>
          <div className="flex w-full items-start gap-2">
            {showCollapseControl ? (
              <button
                type="button"
                className="flex size-8 shrink-0 items-center justify-center text-primary"
                aria-label="Collapse all filter categories"
                onClick={collapseAllCategories}
                data-name="icon/vertical-collapse"
              >
                <MaNaReDIcon name="vertical-collapse" size={32} className="text-current" />
              </button>
            ) : null}
            <div className="min-h-px min-w-px flex-1 self-stretch" aria-hidden />
            <FilterButton variant="clear-all" onClick={handleClear} />
          </div>
        </FilterSidebarReveal>
      </footer>
    </aside>
  );
}
