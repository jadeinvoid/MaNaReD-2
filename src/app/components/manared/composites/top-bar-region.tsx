"use client";

import { useState } from "react";
import { HStack, VStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { ActiveChip } from "../primitives/active-chip";
import { INTERACTIVE_CHIP_BAR_CONTROL } from "../primitives/interactive-styles";
import { SURFACE_TOP_BAR } from "../primitives/surface-styles";
import { EntityNav, type BrowseEntity } from "./entity-nav";
import { SearchBar } from "./search-bar";
import { SearchDropdown } from "./search-dropdown";
import { UtilityLinks } from "./top-bar";
import type { TopBarProps, TopBarState } from "./top-bar";

export type QueryChip = {
  label: string;
  provenance?: string;
};

export type TopBarRegionProps = Omit<TopBarProps, "leadingContent" | "searchAccessory"> & {
  activeEntity?: BrowseEntity;
  onEntityChange?: (entity: BrowseEntity) => void;
  chips?: QueryChip[];
  onRemoveChip?: (label: string) => void;
  onOpenFilters?: () => void;
  showFilterTrigger?: boolean;
};

function QueryChipRow({
  chips,
  onRemoveChip,
}: {
  chips: QueryChip[];
  onRemoveChip?: (label: string) => void;
}) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <HStack
      gap={2}
      vAlign="center"
      className="flex-wrap border-t border-border bg-page-tertiary px-6 py-2"
    >
      {chips.map((chip) => (
        <ActiveChip
          key={chip.label}
          label={chip.provenance ? `${chip.provenance} · ${chip.label}` : chip.label}
          onRemove={onRemoveChip ? () => onRemoveChip(chip.label) : undefined}
        />
      ))}
    </HStack>
  );
}

/** Header region — Figma top-bar plus UX §11 entity nav, filter trigger, and query chips. */
export function TopBarRegion({
  activeEntity = "compounds",
  onEntityChange,
  chips = [],
  onRemoveChip,
  onOpenFilters,
  showFilterTrigger = false,
  state: controlledState,
  onStateChange,
  searchValue,
  onSearchChange,
}: TopBarRegionProps) {
  const [internalState, setInternalState] = useState<TopBarState>("collapsed");
  const state = controlledState ?? internalState;

  const handleStateChange = (next: TopBarState) => {
    setInternalState(next);
    onStateChange?.(next);
  };

  const filterTrigger =
    showFilterTrigger && onOpenFilters ? (
      <button
        type="button"
        aria-label="Open filters"
        onClick={onOpenFilters}
        className={`${INTERACTIVE_CHIP_BAR_CONTROL} lg:hidden`}
      >
        <MaNaReDIcon name="filter" size={16} />
      </button>
    ) : null;

  return (
    <VStack gap={0}>
      <header className={`relative ${SURFACE_TOP_BAR}`}>
        <div className="flex flex-col gap-2 px-6 py-2 lg:flex-row lg:items-center lg:gap-4">
          <EntityNav
            value={activeEntity}
            onChange={onEntityChange}
            layout="hug"
            className="hidden shrink-0 lg:inline-flex"
          />
          <div className="flex min-h-14 flex-1 items-center gap-4">
            <div className="relative flex min-w-0 flex-1 items-center gap-2">
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onFocus={() => handleStateChange("extended")}
                className="min-w-0 flex-1"
              />
              {filterTrigger}
              {state === "extended" ? (
                <SearchDropdown className="absolute top-full right-0 left-0 z-10 mt-1" />
              ) : null}
            </div>
            <UtilityLinks />
            <MaNaReDIcon name="profile" size={32} label="Profile" />
          </div>
        </div>
        <EntityNav
          value={activeEntity}
          onChange={onEntityChange}
          layout="fill"
          className="w-full px-6 pb-2 lg:hidden"
        />
      </header>

      <QueryChipRow chips={chips} onRemoveChip={onRemoveChip} />
    </VStack>
  );
}
