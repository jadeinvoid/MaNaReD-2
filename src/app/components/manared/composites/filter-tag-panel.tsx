"use client";

import { useMemo, useState } from "react";

import { TextInput } from "@astryxdesign/core/TextInput";

import { ENTITY_TAG_BASE, entityClassNames } from "../primitives/entity-styles";

export type FilterTagOption = {
  label: string;
  count?: number;
};

export type FilterTagPanelProps = {
  tags: readonly FilterTagOption[];
  selected: string[];
  onToggle: (tag: string) => void;
  searchPlaceholder?: string;
};

const COMPOUND = entityClassNames.compound;
const SEARCH_THRESHOLD = 8;

const UNSELECTED_TAG = `${ENTITY_TAG_BASE} rounded-lg border-entity-compound-bg bg-body text-tertiary`;
const ZERO_COUNT_TAG = `${ENTITY_TAG_BASE} rounded-lg border-entity-compound-bg bg-body text-tertiary opacity-60`;

function formatTagLabel(tag: FilterTagOption): string {
  if (tag.count == null) {
    return tag.label;
  }
  return `${tag.label} (${tag.count})`;
}

/** Bioactivity / target-assay tag multi-select — Figma `tag-dropdown` (166:998), compound entity styling. */
export function FilterTagPanel({
  tags,
  selected,
  onToggle,
  searchPlaceholder = "Search tags…",
}: FilterTagPanelProps) {
  const [query, setQuery] = useState("");
  const showSearch = tags.length > SEARCH_THRESHOLD;

  const visibleTags = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return tags;
    }
    return tags.filter((tag) => tag.label.toLowerCase().includes(trimmed));
  }, [query, tags]);

  return (
    <div className="flex w-full flex-col items-end gap-1 rounded-md p-1">
      {showSearch ? (
        <div className="w-full px-1">
          <TextInput
            label="Filter tags"
            isLabelHidden
            placeholder={searchPlaceholder}
            value={query}
            onChange={setQuery}
            size="sm"
            width="100%"
          />
        </div>
      ) : null}
      <div className="flex w-full flex-wrap justify-end gap-0 px-2 py-1">
        {visibleTags.map((tag) => {
          const isSelected = selected.includes(tag.label);
          const isZeroCount = tag.count === 0;
          const className = isZeroCount
            ? ZERO_COUNT_TAG
            : isSelected
              ? `${ENTITY_TAG_BASE} rounded-lg ${COMPOUND.combined}`
              : UNSELECTED_TAG;
          const displayLabel = formatTagLabel(tag);

          if (isZeroCount) {
            return (
              <span key={tag.label} className="p-1" aria-disabled="true">
                <span className={className}>{displayLabel}</span>
              </span>
            );
          }

          return (
            <button
              key={tag.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(tag.label)}
              className="p-1 hover:opacity-90 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-entity-compound-border"
            >
              <span className={className}>{displayLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
