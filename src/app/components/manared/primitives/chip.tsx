import { ENTITY_TAG_BASE, entityClassNames, type EntityType } from "./entity-styles";

export type { EntityType };

export type ChipProps = {
  label: string;
  entity?: EntityType;
};

/** Entity-coloured pill chip from Figma `chip` symbol (332:9145). */
export function Chip({ label, entity = "bioactivity" }: ChipProps) {
  const styles = entityClassNames[entity];

  return <span className={`${ENTITY_TAG_BASE} rounded-full ${styles.combined}`}>{label}</span>;
}
