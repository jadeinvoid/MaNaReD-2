import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { Chip } from "../primitives/chip";
import { ListId, ListLabel, ListTitle } from "../primitives/list-text";
import { LIST_ROW_TEXT_STACK } from "../primitives/list-text-styles";
import { LIST_ROW_ICON_SLOT, SURFACE_LIST_ROW } from "../primitives/surface-styles";
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

/** Figma compound icon artwork extends ~4.17% beyond the 24px slot (`367:3752`). */
const LIST_ROW_COMPOUND_ICON = "absolute -inset-[4.17%] !size-[108.34%] !max-h-none !max-w-none";

/** Horizontal list row from Figma search-mode list pattern (`367:3752`). */
export function ListRow({ id, title, chips, label, labelNumber, labelUnit }: ListRowProps) {
  return (
    <HStack gap={4} vAlign="center" className={SURFACE_LIST_ROW}>
      <div className={LIST_ROW_ICON_SLOT}>
        <MaNaReDIcon name="compound" size={24} className={LIST_ROW_COMPOUND_ICON} />
      </div>
      <div className={LIST_ROW_TEXT_STACK} style={{ gap: "var(--spacing-1)" }}>
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
      <div className={LIST_ROW_ICON_SLOT}>
        <MaNaReDIcon name="chevron-down" size={24} label="chevron-down" className="text-tertiary" />
      </div>
    </HStack>
  );
}
