import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { Chip } from "../primitives/chip";
import { ListId, ListLabel, ListTitle } from "../primitives/list-text";
import { SURFACE_LIST_ROW } from "../primitives/surface-styles";
import type { EntityType } from "../primitives/chip";

export type ListRowProps = {
  id: string;
  title: string;
  chips: { label: string; entity: EntityType }[];
  /** Combined metadata (e.g. `MW 421.5`) when number/unit split is unavailable. */
  label?: string;
  /** Numeric value — Figma `list-label` number slot. */
  labelNumber?: string;
  /** Unit suffix — Figma `list-label` unit slot. */
  labelUnit?: string;
};

/** Horizontal list row from Figma search-mode list pattern (`367:3752`). */
export function ListRow({ id, title, chips, label, labelNumber, labelUnit }: ListRowProps) {
  return (
    <HStack gap={4} vAlign="center" className={SURFACE_LIST_ROW}>
      <MaNaReDIcon name="compound" size={24} />
      <div className="flex shrink-0 flex-col gap-1 p-1">
        <ListId>{id}</ListId>
        <ListTitle>{title}</ListTitle>
      </div>
      <div className="min-w-px flex-1" aria-hidden="true" />
      <HStack gap={2} className="shrink-0 flex-wrap">
        {chips.map((chip) => (
          <Chip key={chip.label} label={chip.label} entity={chip.entity} />
        ))}
      </HStack>
      {labelNumber != null && labelUnit != null ? (
        <ListLabel number={labelNumber} unit={labelUnit} />
      ) : (
        <ListLabel>{label ?? ""}</ListLabel>
      )}
      <MaNaReDIcon name="chevron-down" size={24} label="chevron-down" className="text-tertiary" />
    </HStack>
  );
}
