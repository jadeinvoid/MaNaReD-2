export type EntityType = "organism" | "bioactivity" | "compound" | "region";

const entityStyles: Record<EntityType, { bg: string; border: string; text: string }> = {
  organism: {
    bg: "bg-[var(--color-entity-organism-bg)]",
    border: "border-[var(--color-entity-organism-border)]",
    text: "text-[var(--color-entity-organism-text)]",
  },
  bioactivity: {
    bg: "bg-[var(--color-entity-bioactivity-bg)]",
    border: "border-[var(--color-entity-bioactivity-border)]",
    text: "text-[var(--color-entity-bioactivity-text)]",
  },
  compound: {
    bg: "bg-[var(--color-entity-compound-bg)]",
    border: "border-[var(--color-entity-compound-border)]",
    text: "text-[var(--color-entity-compound-text)]",
  },
  region: {
    bg: "bg-[var(--color-entity-region-bg)]",
    border: "border-[var(--color-entity-region-border)]",
    text: "text-[var(--color-entity-region-text)]",
  },
};

export type ChipProps = {
  label: string;
  entity?: EntityType;
};

/** Entity-coloured tag chip from Figma `chip` symbol. */
export function Chip({ label, entity = "bioactivity" }: ChipProps) {
  const styles = entityStyles[entity];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2 py-1 text-[11px] font-normal leading-normal ${styles.bg} ${styles.border} ${styles.text}`}
    >
      {label}
    </span>
  );
}
