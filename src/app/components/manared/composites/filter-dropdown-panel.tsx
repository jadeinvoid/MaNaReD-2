"use client";

import { Selector } from "@astryxdesign/core/Selector";

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
    <div className="w-full min-w-0" data-filter-dropdown-panel>
      <Selector
        className="filter-compound-class-selector"
        label="Compound class"
        isLabelHidden
        placeholder={placeholder}
        options={[...options]}
        value={value}
        hasClear={true}
        size="sm"
        width="100%"
        onChange={onChange}
      />
    </div>
  );
}
