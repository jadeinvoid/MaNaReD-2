"use client";

import { HStack, VStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { ActiveChip } from "../primitives/active-chip";
import { INTERACTIVE_CHIP_BAR_CONTROL } from "../primitives/interactive-styles";
import { TopBar, type TopBarProps } from "./top-bar";

export type QueryChip = {
  label: string;
  provenance?: string;
};

export type TopBarRegionProps = TopBarProps & {
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

/** Header region — Figma top-bar plus optional mobile filter trigger and query chips. */
export function TopBarRegion({
  chips = [],
  onRemoveChip,
  onOpenFilters,
  showFilterTrigger = false,
  ...topBarProps
}: TopBarRegionProps) {
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
      <TopBar {...topBarProps} searchAccessory={filterTrigger} />
      <QueryChipRow chips={chips} onRemoveChip={onRemoveChip} />
    </VStack>
  );
}
