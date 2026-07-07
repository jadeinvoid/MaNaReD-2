"use client";

import { useState } from "react";
import { HStack } from "@astryxdesign/core/Layout";
import { TextInput } from "@astryxdesign/core/TextInput";

import { MaNaReDIcon } from "../icons/manared-icon";
import { SURFACE_SEARCH_BAR, SURFACE_SEARCH_FIELD_INNER } from "../primitives/surface-styles";

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
    <HStack gap={2} vAlign="center" className={`${SURFACE_SEARCH_BAR} ${className}`.trim()}>
      <div className={`${SURFACE_SEARCH_FIELD_INNER} flex items-center`}>
        <TextInput
          label="Search"
          isLabelHidden
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          className="h-full w-full border-0 bg-transparent px-2 shadow-none"
        />
      </div>
      <div className="flex shrink-0 items-center pl-1">
        <MaNaReDIcon name="search" size={16} />
      </div>
    </HStack>
  );
}
