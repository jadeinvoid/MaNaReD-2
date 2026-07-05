import { HStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { ActiveChip } from "../primitives/active-chip";
import { MaNaReDIcon } from "../icons/manared-icon";

export type ChipBarProps = {
  chips: string[];
  provenanceText?: string;
  onRemoveChip?: (label: string) => void;
  onMoreFilters?: () => void;
  sortLabel?: string;
};

/** Active filter chip bar from Figma `chip-bar/container/with-chips-texts`. */
export function ChipBar({
  chips,
  provenanceText,
  onRemoveChip,
  onMoreFilters,
  sortLabel = "Sort by: Relevance",
}: ChipBarProps) {
  return (
    <HStack gap={2} vAlign="center" className="min-h-11 flex-wrap rounded-lg bg-surface px-3 py-2">
      {chips.map((chip) => (
        <ActiveChip
          key={chip}
          label={chip}
          onRemove={onRemoveChip ? () => onRemoveChip(chip) : undefined}
        />
      ))}
      {provenanceText ? (
        <Text size="2xs" color="secondary" className="ml-2">
          {provenanceText}
        </Text>
      ) : null}
      <span className="flex-1" />
      <button
        type="button"
        onClick={onMoreFilters}
        className="flex items-center gap-1 rounded-lg border border-emphasized px-3 py-1 text-xs text-secondary hover:bg-muted"
      >
        <MaNaReDIcon name="filter" size={16} />
        More filters
      </button>
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg border border-emphasized px-3 py-1 text-xs text-secondary"
      >
        {sortLabel}
        <MaNaReDIcon name="arrow-down" size={16} />
      </button>
    </HStack>
  );
}
