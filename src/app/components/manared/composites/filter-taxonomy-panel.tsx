"use client";

import { useEffect, useMemo, useState } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
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
  const [openRank, setOpenRank] = useState<TaxonomyRankId | null>(() => defaultOpenRank(filters));
  const selected = useMemo(() => selectedTaxonomyRanks(filters), [filters]);

  useEffect(() => {
    if (Object.keys(selected).length === 0) {
      setOpenRank(defaultOpenRank(filters));
      return;
    }

    setOpenRank((current) => current ?? defaultOpenRank(filters));
  }, [filters]);

  return (
    <div className="flex min-h-0 w-full flex-col gap-2 px-1 py-1">
      {TAXONOMY_RANKS.map((rank) => {
        const isExpanded = openRank === rank.id;
        const currentValue = selected[rank.id];
        const parentRank = TAXONOMY_RANKS[TAXONOMY_RANKS.findIndex((entry) => entry.id === rank.id) - 1];
        const isDisabled = Boolean(parentRank) && !selected[parentRank.id];

        return (
          <div key={rank.id} className="flex w-full flex-col gap-1 items-start">
            <button
              type="button"
              aria-label={isExpanded ? `Collapse ${rank.label}` : `Expand ${rank.label}`}
              aria-expanded={isExpanded}
              onClick={() => setOpenRank(isExpanded ? null : rank.id)}
              className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-3xs uppercase text-primary hover:bg-body-secondary focus-visible:outline-none"
            >
              <span>{rank.label}</span>
              <MaNaReDIcon
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={24}
                className="text-primary"
              />
            </button>

            {isExpanded ? (
              <div className="flex w-full flex-col gap-0.5 pl-2">
                {isDisabled ? (
                  <p className="px-2 py-1 text-left text-3xs italic text-tertiary">
                    Select {parentRank?.label.toLowerCase()} first
                  </p>
                ) : null}
                {rank.leaves.map((leaf) => {
                  const isSelected = currentValue === leaf.label;
                  return (
                    <button
                      key={leaf.label}
                      type="button"
                      aria-label={leaf.label}
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                      onClick={() => {
                        const nextValue = isSelected ? null : leaf.label;
                        const nextFilters = setTaxonomyRankFilter(filters, rank.id, nextValue);
                        onFiltersChange(nextFilters);
                        setOpenRank(nextValue ? nextRankId(rank.id) ?? rank.id : rank.id);
                      }}
                      className={[
                        "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-3xs",
                        isDisabled ? "cursor-not-allowed opacity-60" : "",
                        isSelected
                          ? "border border-border-secondary bg-chip-active text-secondary"
                          : "border border-transparent bg-transparent text-tertiary hover:bg-body-secondary",
                      ].join(" ")}
                    >
                      <span>{leaf.label}</span>
                      <span className="text-3xs text-tertiary">({leaf.count})</span>
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
