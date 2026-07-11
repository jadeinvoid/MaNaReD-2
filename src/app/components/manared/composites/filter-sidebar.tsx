"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { FilterButton } from "../primitives/filter-button";
import { FILTER_BAR_SURFACE, FILTER_SIDEBAR_SHELL } from "../primitives/gradient-styles";
import { FilterDropdownPanel } from "./filter-dropdown-panel";
import { FilterRangePanel } from "./filter-range-panel";
import { FilterRegionPanel } from "./filter-region-panel";
import { FilterRow } from "./filter-row";
import {
  activeCountForCategory,
  clearAllFilters,
  draftRangeForCategory,
  FILTER_CATEGORIES,
  MOCK_BIOACTIVITY_TAGS,
  MOCK_COMPOUND_CLASSES,
  MOCK_TARGET_ASSAY_TAGS,
  MW_FULL_RANGE,
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
  requestExpandCategory?: FilterCategoryId | null;
  onRequestExpandCategoryHandled?: () => void;
};

const PLACEHOLDER_CATEGORIES = new Set<FilterCategoryId>();

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
  requestExpandCategory,
  onRequestExpandCategoryHandled,
}: FilterSidebarProps) {
  const [internalFilters, setInternalFilters] = useState<FilterState>(defaultFilters);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [expandedCategories, setExpandedCategories] = useState<FilterCategoryId[]>([]);
  const [rangeDraft, setRangeDraft] = useState<[number, number]>(MW_FULL_RANGE);

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
    setRangeDraft(MW_FULL_RANGE);
    onClear?.();
  };

  const commitRangeDraft = useCallback(
    (next: [number, number]) => {
      setRangeDraft(next);
      updateFilters(setRangeFilter(filters, "molecularWeight", next[0], next[1]));
    },
    [filters, updateFilters],
  );

  void onApply;

  useEffect(() => {
    if (!requestExpandCategory) {
      return;
    }

    setExpandedCategories((current) =>
      current.includes(requestExpandCategory) ? current : [...current, requestExpandCategory],
    );

    if (requestExpandCategory === "molecularWeight") {
      setRangeDraft(draftRangeForCategory(filters, "molecularWeight"));
    }

    const frameId = window.requestAnimationFrame(() => {
      const panel = document.getElementById(`filter-panel-${requestExpandCategory}`);
      const thumb = panel?.querySelector<HTMLElement>('[aria-label*="minimum value"]');
      thumb?.focus();
    });

    onRequestExpandCategoryHandled?.();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [requestExpandCategory, filters, onRequestExpandCategoryHandled]);

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

    if (categoryId === "geographicRegion") {
      return <FilterRegionPanel filters={filters} onFiltersChange={updateFilters} />;
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

    if (categoryId === "targetAssay") {
      return (
        <FilterTagPanel
          tags={MOCK_TARGET_ASSAY_TAGS}
          selected={selectedTags(filters, categoryId)}
          onToggle={(tag) => updateFilters(toggleTagFilter(filters, categoryId, tag))}
          searchPlaceholder="Search assays…"
        />
      );
    }

    if (categoryId === "molecularWeight") {
      const value = expandedCategories.includes("molecularWeight")
        ? rangeDraft
        : draftRangeForCategory(filters, categoryId);

      return (
        <FilterRangePanel value={value} onChange={setRangeDraft} onChangeEnd={commitRangeDraft} />
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
    "flex min-h-0 flex-col gap-4 self-stretch overflow-hidden rounded-tr-md rounded-br-md",
  ].join(" ");

  const containerClass = "flex min-h-0 flex-1 flex-col gap-1 overflow-hidden rounded-md px-1 py-4";

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
            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-2">
              {FILTER_CATEGORIES.map(({ id, label }) => (
                <FilterRow
                  key={id}
                  id={id}
                  label={label}
                  activeCount={activeCountForCategory(filters, id)}
                  expanded={expandedCategories.includes(id)}
                  forceCollapsed={allCategoriesCollapsed}
                  panelClassName={
                    id === "taxonomy" ||
                    id === "geographicRegion" ||
                    id === "compoundClass" ||
                    id === "bioactivity" ||
                    id === "targetAssay"
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
                        setRangeDraft(draftRangeForCategory(filters, "molecularWeight"));
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
