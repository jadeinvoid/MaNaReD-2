"use client";

import { useState } from "react";
import { HStack } from "@astryxdesign/core/Layout";
import { TextInput } from "@astryxdesign/core/TextInput";

import { MaNaReDIcon } from "../icons/manared-icon";

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

/** Global search bar from Figma `search-bar` symbol. */
export function SearchBar({
  placeholder = "Search compounds, organisms, regions…",
  value: controlledValue,
  onChange,
}: SearchBarProps) {
  const [internal, setInternal] = useState("");
  const value = controlledValue ?? internal;

  const handleChange = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <HStack
      gap={2}
      vAlign="center"
      className="h-10 flex-1 rounded-lg border border-emphasized bg-surface px-3"
    >
      <MaNaReDIcon name="search" size={16} />
      <TextInput
        label="Search"
        isLabelHidden
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="flex-1 border-0 bg-transparent shadow-none"
      />
    </HStack>
  );
}
