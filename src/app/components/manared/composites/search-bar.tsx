"use client";

import { useState } from "react";

import { MaNaReDIcon } from "../icons/manared-icon";
import { SURFACE_SEARCH_BAR, SURFACE_SEARCH_FIELD_INNER } from "../primitives/surface-styles";

const SEARCH_FIELD_INPUT =
  "border-0 bg-transparent px-2 text-2xs leading-4 tracking-[-0.12px] text-primary outline-none placeholder:text-secondary";

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  className?: string;
};

/** Global search bar from Figma `search-bar` (`340:3569`). */
export function SearchBar({
  placeholder = "Search compounds, organisms, regions…",
  value: controlledValue,
  onChange,
  onFocus,
  className = "",
}: SearchBarProps) {
  const [internal, setInternal] = useState("");
  const value = controlledValue ?? internal;

  const handleChange = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={`${SURFACE_SEARCH_BAR} ${className}`.trim()}>
      <div className={SURFACE_SEARCH_FIELD_INNER}>
        <input
          type="text"
          role="searchbox"
          aria-label="Search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={onFocus}
          className={SEARCH_FIELD_INPUT}
        />
      </div>
      <div className="flex shrink-0 items-center pl-1">
        <MaNaReDIcon name="search" size={16} />
      </div>
    </div>
  );
}
