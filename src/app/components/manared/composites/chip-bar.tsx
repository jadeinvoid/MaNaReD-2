import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  INTERACTIVE_CHIP_BAR_CONTROL,
  INTERACTIVE_PROVENANCE_TEXT,
} from "../primitives/interactive-styles";
import { SURFACE_CHIP_BAR } from "../primitives/surface-styles";
import { ActiveChip } from "../primitives/active-chip";
import { SortWrapper } from "./sort-wrapper";
import type { ResultsViewMode } from "./results-view";
import { ViewToggle } from "./view-toggle";

export type ChipBarItem = {
  id: string;
  label: string;
  title?: string;
};

export type ChipBarProps = {
  chips: ChipBarItem[];
  provenanceText?: string;
  onRemoveChip?: (id: string) => void;
  onChipClick?: (id: string) => void;
  onMoreFilters?: () => void;
  onSort?: () => void;
  sortLabel?: string;
  viewMode?: ResultsViewMode;
  onViewModeChange?: (mode: ResultsViewMode) => void;
};

/** Active filter chip bar from Figma `chip-bar` (`349:3993`, gradient paint styles). */
export function ChipBar({
  chips,
  provenanceText,
  onRemoveChip,
  onChipClick,
  onMoreFilters,
  onSort,
  sortLabel = "Sort by: Relevance",
  viewMode = "card",
  onViewModeChange,
}: ChipBarProps) {
  return (
    <HStack gap={2} vAlign="center" className={SURFACE_CHIP_BAR}>
      {chips.map((chip) => (
        <ActiveChip
          key={chip.id}
          label={chip.label}
          title={chip.title}
          onClick={onChipClick ? () => onChipClick(chip.id) : undefined}
          onRemove={onRemoveChip ? () => onRemoveChip(chip.id) : undefined}
        />
      ))}
      {provenanceText ? (
        <span className={INTERACTIVE_PROVENANCE_TEXT}>{provenanceText}</span>
      ) : null}
      <span className="flex-1" />
      <button type="button" onClick={onMoreFilters} className={INTERACTIVE_CHIP_BAR_CONTROL}>
        <MaNaReDIcon name="filter" size={16} />
        More Filters
      </button>
      <SortWrapper label={sortLabel} onClick={onSort} />
      {onViewModeChange ? <ViewToggle value={viewMode} onChange={onViewModeChange} /> : null}
    </HStack>
  );
}
