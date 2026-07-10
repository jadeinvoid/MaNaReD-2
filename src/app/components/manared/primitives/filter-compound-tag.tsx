"use client";

import {
  FILTER_COMPOUND_TAG_BUTTON,
  FILTER_COMPOUND_TAG_HIT,
  FILTER_COMPOUND_TAG_SELECTED,
  FILTER_COMPOUND_TAG_UNSELECTED,
  FILTER_COMPOUND_TAG_ZERO_COUNT,
} from "./filter-tag-styles";

export type FilterCompoundTagState = "selected" | "unselected" | "zero-count";

export type FilterCompoundTagProps = {
  label: string;
  state?: FilterCompoundTagState;
  onToggle?: () => void;
};

function tagClassName(state: FilterCompoundTagState): string {
  if (state === "selected") {
    return FILTER_COMPOUND_TAG_SELECTED;
  }
  if (state === "zero-count") {
    return FILTER_COMPOUND_TAG_ZERO_COUNT;
  }
  return FILTER_COMPOUND_TAG_UNSELECTED;
}

/** Single compound-styled filter tag — Figma `compound-tag` (`166:925`). */
export function FilterCompoundTag({
  label,
  state = "unselected",
  onToggle,
}: FilterCompoundTagProps) {
  const className = tagClassName(state);

  if (state === "zero-count") {
    return (
      <span className={FILTER_COMPOUND_TAG_HIT} aria-disabled="true">
        <span className={className}>{label}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={state === "selected"}
      onClick={onToggle}
      className={`${FILTER_COMPOUND_TAG_HIT} ${FILTER_COMPOUND_TAG_BUTTON}`}
    >
      <span className={className}>{label}</span>
    </button>
  );
}
