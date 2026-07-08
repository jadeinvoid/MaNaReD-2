"use client";

import { useEffect, useMemo, useState } from "react";

import { useToast } from "@astryxdesign/core/Toast";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  getRemovedTaxonomyRanks,
  getTaxonomyBacktrackToastMessage,
} from "./filter-taxonomy-notice";
import {
  selectedTaxonomyRanks,
  setTaxonomyRankFilter,
  TAXONOMY_RANKS,
  type FilterState,
  type TaxonomyRankId,
} from "./filter-state";

export type FilterTaxonomyPanelProps = {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
};

function nextRankId(rank: TaxonomyRankId): TaxonomyRankId | null {
  const currentIndex = TAXONOMY_RANKS.findIndex((entry) => entry.id === rank);
  const next = TAXONOMY_RANKS[currentIndex + 1];
  return next?.id ?? null;
}

function defaultOpenRank(filters: FilterState) {
  const selected = selectedTaxonomyRanks(filters);
  for (let index = TAXONOMY_RANKS.length - 1; index >= 0; index -= 1) {
    const rank = TAXONOMY_RANKS[index];
    if (selected[rank.id]) {
      return nextRankId(rank.id) ?? rank.id;
    }
  }
  return TAXONOMY_RANKS[0]?.id ?? null;
}

export function FilterTaxonomyPanel({ filters, onFiltersChange }: FilterTaxonomyPanelProps) {
  const toast = useToast();
  const [openRank, setOpenRank] = useState<TaxonomyRankId | null>(() => defaultOpenRank(filters));
  const selected = useMemo(() => selectedTaxonomyRanks(filters), [filters]);
  const visibleRanks = useMemo(
    () =>
      TAXONOMY_RANKS.filter((_, index) => {
        if (index === 0) {
          return true;
        }
        const parentRank = TAXONOMY_RANKS[index - 1];
        return Boolean(parentRank && selected[parentRank.id]);
      }),
    [selected],
  );

  useEffect(() => {
    if (Object.keys(selected).length === 0) {
      setOpenRank(defaultOpenRank(filters));
      return;
    }

    setOpenRank((current) => {
      if (!current) {
        return defaultOpenRank(filters);
      }

      const isVisible = visibleRanks.some((rank) => rank.id === current);
      return isVisible ? current : defaultOpenRank(filters);
    });
  }, [filters, selected, visibleRanks]);

  return (
    <div className="flex min-h-0 w-full flex-col gap-0.5 px-0 pt-0.5 pb-1">
      {visibleRanks.map((rank) => {
        const isExpanded = openRank === rank.id;
        const currentValue = selected[rank.id];

        return (
          <div key={rank.id} className="flex w-full flex-col gap-0.5 items-stretch">
            <button
              type="button"
              aria-label={isExpanded ? `Collapse ${rank.label}` : `Expand ${rank.label}`}
              aria-expanded={isExpanded}
              onClick={() => setOpenRank(isExpanded ? null : rank.id)}
              className="flex w-full items-center justify-between overflow-hidden rounded-md pl-2 pr-0 hover:bg-body-secondary focus-visible:outline-none"
            >
              <span className="min-w-0 flex-1 truncate py-0.5 pl-4 pr-2 text-left text-3xs uppercase text-primary">
                {rank.label}
              </span>
              <MaNaReDIcon
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={24}
                className="shrink-0 text-primary"
              />
            </button>

            {isExpanded ? (
              <div className="flex w-full flex-col gap-1 pl-4 pb-1">
                {rank.leaves.map((leaf) => {
                  const isSelected = currentValue === leaf.label;
                  return (
                    <button
                      key={leaf.label}
                      type="button"
                      aria-label={leaf.label}
                      aria-pressed={isSelected}
                      onClick={() => {
                        const nextValue = isSelected ? null : leaf.label;
                        const nextFilters = setTaxonomyRankFilter(filters, rank.id, nextValue);
                        const removedRanks = getRemovedTaxonomyRanks(filters, nextFilters);
                        const message = getTaxonomyBacktrackToastMessage(
                          rank.id,
                          nextValue,
                          removedRanks,
                        );

                        onFiltersChange(nextFilters);

                        if (message) {
                          toast({
                            body: message,
                            type: "info",
                            isAutoHide: true,
                            autoHideDuration: 4000,
                            uniqueID: "taxonomy-backtrack",
                          });
                        }

                        setOpenRank(nextValue ? (nextRankId(rank.id) ?? rank.id) : rank.id);
                      }}
                      className={[
                        "box-border grid w-full grid-cols-[1fr_auto] items-center gap-2 rounded-md pl-2 pr-0 py-1 text-3xs",
                        isSelected
                          ? "border border-border-secondary bg-chip-active text-secondary"
                          : "border border-transparent bg-transparent text-tertiary hover:bg-body-secondary",
                      ].join(" ")}
                    >
                      <span className="ml-auto text-right">{leaf.label}</span>
                      <span className="min-w-8 text-right text-3xs text-tertiary">
                        ({leaf.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
