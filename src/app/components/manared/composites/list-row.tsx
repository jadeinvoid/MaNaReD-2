import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { Chip } from "../primitives/chip";
import { ListId, ListLabel, ListTitle } from "../primitives/list-text";
import type { EntityType } from "../primitives/chip";

export type ListRowProps = {
  id: string;
  title: string;
  chips: { label: string; entity: EntityType }[];
  label: string;
};

/** Horizontal list row from Figma search-mode list pattern. */
export function ListRow({ id, title, chips, label }: ListRowProps) {
  return (
    <HStack
      gap={4}
      vAlign="center"
      className="w-full rounded-lg border border-emphasized bg-surface p-4"
    >
      <MaNaReDIcon name="compound" size={24} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ListId>{id}</ListId>
        <ListTitle>{title}</ListTitle>
      </div>
      <HStack gap={2} className="flex-wrap">
        {chips.map((chip) => (
          <Chip key={chip.label} label={chip.label} entity={chip.entity} />
        ))}
      </HStack>
      <ListLabel>{label}</ListLabel>
      <MaNaReDIcon name="expand" size={24} />
    </HStack>
  );
}
