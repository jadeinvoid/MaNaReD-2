"use client";

import { useMemo, useState } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { MOCK_TAXONOMY_TREE, type TaxonomyGroup } from "./filter-state";

export type FilterTaxonomyPanelProps = {
  /** Selected leaf labels (leaf labels are stored as the filter label in this prototype). */
  selected: readonly string[];
  onToggleLeaf: (leafLabel: string) => void;
};

function groupDefaultExpanded(groups: readonly TaxonomyGroup[], selected: readonly string[]) {
  // Expand any group that has a selected leaf; otherwise expand the first group for discoverability.
  const selectedSet = new Set(selected);
  for (const group of groups) {
    if (group.leaves.some((leaf) => selectedSet.has(leaf.label))) {
      return new Set([group.key]);
    }
  }
  const first = groups[0];
  return new Set(first ? [first.key] : []);
}

export function FilterTaxonomyPanel({ selected, onToggleLeaf }: FilterTaxonomyPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => groupDefaultExpanded(MOCK_TAXONOMY_TREE, selected),
  );

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  return (
    <div className="flex min-h-0 w-full flex-col gap-2 px-1 py-1">
      {MOCK_TAXONOMY_TREE.map((group) => {
        const isExpanded = expandedGroups.has(group.key);

        const toggleGroup = () => {
          setExpandedGroups((current) => {
            const next = new Set(current);
            if (next.has(group.key)) {
              next.delete(group.key);
            } else {
              next.add(group.key);
            }
            return next;
          });
        };

        return (
          <div key={group.key} className="flex w-full flex-col gap-1 items-end">
            <button
              type="button"
              aria-label={isExpanded ? `Collapse ${group.label}` : `Expand ${group.label}`}
              aria-expanded={isExpanded}
              onClick={toggleGroup}
              className="flex w-full items-center justify-end gap-2 rounded-md px-2 py-1 text-right text-3xs uppercase text-primary hover:bg-body-secondary focus-visible:outline-none"
            >
              <span>{group.label}</span>
              <MaNaReDIcon
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={24}
                className="text-primary"
              />
            </button>

            {isExpanded ? (
              <div className="flex w-full flex-col gap-0.5 items-end pr-2">
                {group.leaves.map((leaf) => {
                  const isSelected = selectedSet.has(leaf.label);
                  return (
                    <button
                      key={leaf.label}
                      type="button"
                      aria-label={leaf.label}
                      aria-pressed={isSelected}
                      onClick={() => onToggleLeaf(leaf.label)}
                      className={[
                        "flex w-full items-center justify-end gap-2 rounded-md px-2 py-1 text-right text-3xs",
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

