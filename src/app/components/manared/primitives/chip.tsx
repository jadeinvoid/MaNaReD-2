import { Badge } from "@astryxdesign/core/Badge";

import { entityClassNames, type EntityType } from "./entity-styles";

export type { EntityType };

export type ChipProps = {
  label: string;
  entity?: EntityType;
};

/** Entity-coloured tag chip from Figma `chip` symbol — Astryx Badge + MaNaReD entity tokens. */
export function Chip({ label, entity = "bioactivity" }: ChipProps) {
  const styles = entityClassNames[entity];

  return (
    <Badge
      label={label}
      variant="neutral"
      className={`h-auto rounded-full border px-2 py-1 text-2xs font-normal ${styles.bg} ${styles.border} ${styles.text}`}
    />
  );
}
