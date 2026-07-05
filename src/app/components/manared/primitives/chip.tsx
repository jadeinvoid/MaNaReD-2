import { Badge } from "@astryxdesign/core/Badge";

import { entityClassNames, type EntityType } from "./entity-styles";

export type { EntityType };

export type ChipProps = {
  label: string;
  entity?: EntityType;
};

/** Entity-coloured tag chip from Figma `chip` symbol (332:9145) — Astryx Badge + MaNaReD entity tokens. */
export function Chip({ label, entity = "bioactivity" }: ChipProps) {
  const styles = entityClassNames[entity];

  return (
    <Badge
      label={label}
      variant="neutral"
      className={`inline-flex h-auto shrink-0 items-center justify-center rounded-full border border-solid px-2 py-1 text-3xs font-normal leading-normal whitespace-nowrap shadow-none ${styles.bg} ${styles.border} ${styles.text}`}
    />
  );
}
