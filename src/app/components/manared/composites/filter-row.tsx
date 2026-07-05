import { HStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon } from "../icons/manared-icon";

export type FilterRowProps = {
  label: string;
  icon?: "filter" | "no-filter";
};

/** Single filter category row in the sidebar (taxonomy, MW, etc.). */
export function FilterRow({ label, icon = "filter" }: FilterRowProps) {
  return (
    <HStack gap={2} vAlign="center" className="w-full justify-end py-1">
      <Text size="2xs" color="secondary">
        {label}
      </Text>
      <MaNaReDIcon name={icon} size={16} />
    </HStack>
  );
}

export const DEFAULT_FILTER_ROWS = [
  "Taxonomy",
  "Molecular Weight",
  "Compound Class",
  "Geographic Region",
  "Bioactivity",
  "Target Assay",
] as const;
