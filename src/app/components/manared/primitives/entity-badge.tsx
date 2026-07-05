import { ENTITY_TAG_BASE, entityClassNames, type EntityType } from "./entity-styles";

export type EntityBadgeProps = {
  entity: EntityType;
  label: string;
};

/** Entity type badge — rounded-md variant per MaNaReD.shape.md (design system entity example). */
export function EntityBadge({ entity, label }: EntityBadgeProps) {
  const styles = entityClassNames[entity];

  return <span className={`${ENTITY_TAG_BASE} rounded-md ${styles.combined}`}>{label}</span>;
}
