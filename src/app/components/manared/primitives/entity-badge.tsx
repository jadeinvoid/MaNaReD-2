import type { EntityType } from "./chip";

const entityStyles: Record<EntityType, string> = {
  organism:
    "bg-[var(--color-entity-organism-bg)] text-[var(--color-entity-organism-text)] border-[var(--color-entity-organism-border)]",
  bioactivity:
    "bg-[var(--color-entity-bioactivity-bg)] text-[var(--color-entity-bioactivity-text)] border-[var(--color-entity-bioactivity-border)]",
  compound:
    "bg-[var(--color-entity-compound-bg)] text-[var(--color-entity-compound-text)] border-[var(--color-entity-compound-border)]",
  region:
    "bg-[var(--color-entity-region-bg)] text-[var(--color-entity-region-text)] border-[var(--color-entity-region-border)]",
};

export type EntityBadgeProps = {
  entity: EntityType;
  label: string;
};

/** Domain entity badge using MaNaReD entity colour triplets. */
export function EntityBadge({ entity, label }: EntityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${entityStyles[entity]}`}
    >
      {label}
    </span>
  );
}
