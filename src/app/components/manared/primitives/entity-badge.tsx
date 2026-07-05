import { Badge } from "@astryxdesign/core/Badge";

import { entityClassNames, type EntityType } from "./entity-styles";

export type EntityBadgeProps = {
  entity: EntityType;
  label: string;
};

/** Domain entity badge using MaNaReD entity colour triplets on Astryx Badge. */
export function EntityBadge({ entity, label }: EntityBadgeProps) {
  return (
    <Badge
      label={label}
      variant="neutral"
      className={`h-auto rounded-md border px-2 py-1 text-2xs font-medium ${entityClassNames[entity].combined}`}
    />
  );
}
