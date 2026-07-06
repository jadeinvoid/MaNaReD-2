import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon } from "../icons/manared-icon";
import { ActiveChip } from "../primitives/active-chip";
import { SortWrapper } from "./sort-wrapper";

export type ChipBarProps = {
  chips: string[];
  provenanceText?: string;
  onRemoveChip?: (label: string) => void;
  onMoreFilters?: () => void;
  onSort?: () => void;
  sortLabel?: string;
};

/** Active filter chip bar from Figma `chip-bar/container/with-chips-texts`. */
export function ChipBar({
  chips,
  provenanceText,
  onRemoveChip,
  onMoreFilters,
  onSort,
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
        <Text size="2xs" color="secondary" className="ml-2 text-tertiary">
          {provenanceText}
        </Text>
      ) : null}
      <span className="flex-1" />
      <Button
        label="More filters"
        variant="secondary"
        size="sm"
        onClick={onMoreFilters}
        icon={<MaNaReDIcon name="filter" size={16} />}
        className="text-2xs"
      />
      <SortWrapper label={sortLabel} onClick={onSort} />
    </HStack>
  );
}
