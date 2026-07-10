"use client";

import { useMemo, useState } from "react";

import { TextInput } from "@astryxdesign/core/TextInput";

import { FilterCompoundTag } from "../primitives/filter-compound-tag";
import type { FilterCompoundTagState } from "../primitives/filter-compound-tag";

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

const SEARCH_THRESHOLD = 8;

function formatTagLabel(tag: FilterTagOption): string {
  if (tag.count == null) {
    return tag.label;
  }
  return `${tag.label} (${tag.count})`;
}

function tagState(tag: FilterTagOption, selected: string[]): FilterCompoundTagState {
  if (tag.count === 0) {
    return "zero-count";
  }
  return selected.includes(tag.label) ? "selected" : "unselected";
}

/** Bioactivity / target-assay tag multi-select — Figma `tag-dropdown` (166:998). */
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
        {visibleTags.map((tag) => (
          <FilterCompoundTag
            key={tag.label}
            label={formatTagLabel(tag)}
            state={tagState(tag, selected)}
            onToggle={() => onToggle(tag.label)}
          />
        ))}
      </div>
    </div>
  );
}
