import { entityClassNames, type EntityType } from "./entity-styles";

export type { EntityType };

export type ChipProps = {
  label: string;
  entity?: EntityType;
};

/** Figma chip layout — MaNaReD.space.1 vertical, space.2 horizontal (node 253:2062). */
const CHIP_LAYOUT =
  "inline-flex shrink-0 items-center justify-center rounded-full border border-solid px-[length:var(--spacing-2)] py-[length:var(--spacing-1)] text-3xs font-normal leading-none whitespace-nowrap";

/** Entity-coloured tag chip from Figma `chip` symbol (332:9145). */
export function Chip({ label, entity = "bioactivity" }: ChipProps) {
  const styles = entityClassNames[entity];

  return <span className={`${CHIP_LAYOUT} ${styles.combined}`}>{label}</span>;
}
