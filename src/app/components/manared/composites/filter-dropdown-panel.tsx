"use client";

import { Selector } from "@astryxdesign/core/Selector";

import { MaNaReDIcon } from "../icons/manared-icon";

export type FilterDropdownPanelProps = {
  options: readonly string[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
};

/** Bounded categorical filter — UX §5 dropdown control. */
export function FilterDropdownPanel({
  options,
  value,
  onChange,
  placeholder = "Select class…",
}: FilterDropdownPanelProps) {
  return (
    <div className="filter-compound-class-row w-full min-w-0" data-filter-dropdown-panel>
      <Selector
        className="filter-compound-class-selector"
        label="Compound class"
        isLabelHidden
        placeholder={placeholder}
        options={[...options]}
        value={value ?? undefined}
        size="sm"
        width="100%"
        onChange={onChange}
      />
      {value != null ? (
        <button
          type="button"
          className="filter-compound-class-clear"
          aria-label="Clear compound class"
          onClick={() => onChange(null)}
        >
          <MaNaReDIcon name="remove" size={12} className="text-current" />
        </button>
      ) : null}
    </div>
  );
}
