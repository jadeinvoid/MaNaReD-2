"use client";

import { useEffect, useMemo, useState } from "react";

import { useToast } from "@astryxdesign/core/Toast";

import { MaNaReDIcon } from "../icons/manared-icon";
import { getRegionBacktrackToastMessage, getRemovedRegionRanks } from "./filter-region-notice";
import {
  REGION_RANKS,
  selectedRegionRanks,
  setRegionRankFilter,
  type FilterState,
  type RegionRankId,
} from "./filter-state";

export type FilterRegionPanelProps = {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
};

function nextRankId(rank: RegionRankId): RegionRankId | null {
  const currentIndex = REGION_RANKS.findIndex((entry) => entry.id === rank);
  const next = REGION_RANKS[currentIndex + 1];
  return next?.id ?? null;
}

function defaultOpenRank(filters: FilterState) {
  const selected = selectedRegionRanks(filters);
  for (let index = REGION_RANKS.length - 1; index >= 0; index -= 1) {
    const rank = REGION_RANKS[index];
    if (selected[rank.id]) {
      return nextRankId(rank.id) ?? rank.id;
    }
  }
  return REGION_RANKS[0]?.id ?? null;
}

export function FilterRegionPanel({ filters, onFiltersChange }: FilterRegionPanelProps) {
  const toast = useToast();
  const [openRank, setOpenRank] = useState<RegionRankId | null>(() => defaultOpenRank(filters));
  const selected = useMemo(() => selectedRegionRanks(filters), [filters]);
  const visibleRanks = useMemo(
    () =>
      REGION_RANKS.filter((_, index) => {
        if (index === 0) {
          return true;
        }
        const parentRank = REGION_RANKS[index - 1];
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
    <div className="flex min-h-0 w-full flex-col gap-0.5 px-0 py-0.5">
      {visibleRanks.map((rank) => {
        const isExpanded = openRank === rank.id;
        const currentValue = selected[rank.id];

        return (
          <div key={rank.id} className="flex w-full flex-col gap-px items-stretch">
            <button
              type="button"
              aria-label={isExpanded ? `Collapse ${rank.label}` : `Expand ${rank.label}`}
              aria-expanded={isExpanded}
              onClick={() => setOpenRank(isExpanded ? null : rank.id)}
              className="flex w-full items-center justify-between overflow-hidden rounded-md pl-2 pr-0 hover:bg-body-secondary focus-visible:outline-none"
            >
              <span className="min-w-0 flex-1 truncate py-0.5 pl-4 pr-2 text-center text-3xs uppercase text-primary">
                {rank.label}
              </span>
              <MaNaReDIcon
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={24}
                className="shrink-0 text-primary"
              />
            </button>

            {isExpanded ? (
              <div className="flex w-full flex-col gap-px pl-4">
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
                        const nextFilters = setRegionRankFilter(filters, rank.id, nextValue);
                        const removedRanks = getRemovedRegionRanks(filters, nextFilters);
                        const message = getRegionBacktrackToastMessage(
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
                            uniqueID: "region-backtrack",
                          });
                        }

                        setOpenRank(nextValue ? (nextRankId(rank.id) ?? rank.id) : rank.id);
                      }}
                      className={[
                        "flex w-full items-center justify-center gap-2 rounded-md pl-2 pr-0 py-0.5 text-center text-3xs",
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
