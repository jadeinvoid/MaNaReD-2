export type EntityType = "organism" | "bioactivity" | "compound" | "region";

/** Shared entity tag typography and padding — MaNaReD.space.1 × space.2, font.size.3xs. */
export const ENTITY_TAG_BASE =
  "inline-flex shrink-0 items-center justify-center border border-solid px-[length:var(--spacing-2)] py-[length:var(--spacing-1)] text-3xs font-normal leading-none whitespace-nowrap";

/** MaNaReD entity colour triplets — shared by Chip and EntityBadge. */
export const entityClassNames: Record<
  EntityType,
  { bg: string; border: string; text: string; combined: string }
> = {
  organism: {
    bg: "bg-[var(--color-entity-organism-bg)]",
    border: "border-[var(--color-entity-organism-border)]",
    text: "text-[var(--color-entity-organism-text)]",
    combined:
      "bg-[var(--color-entity-organism-bg)] text-[var(--color-entity-organism-text)] border-[var(--color-entity-organism-border)]",
  },
  bioactivity: {
    bg: "bg-[var(--color-entity-bioactivity-bg)]",
    border: "border-[var(--color-entity-bioactivity-border)]",
    text: "text-[var(--color-entity-bioactivity-text)]",
    combined:
      "bg-[var(--color-entity-bioactivity-bg)] text-[var(--color-entity-bioactivity-text)] border-[var(--color-entity-bioactivity-border)]",
  },
  compound: {
    bg: "bg-[var(--color-entity-compound-bg)]",
    border: "border-[var(--color-entity-compound-border)]",
    text: "text-[var(--color-entity-compound-text)]",
    combined:
      "bg-[var(--color-entity-compound-bg)] text-[var(--color-entity-compound-text)] border-[var(--color-entity-compound-border)]",
  },
  region: {
    bg: "bg-[var(--color-entity-region-bg)]",
    border: "border-[var(--color-entity-region-border)]",
    text: "text-[var(--color-entity-region-text)]",
    combined:
      "bg-[var(--color-entity-region-bg)] text-[var(--color-entity-region-text)] border-[var(--color-entity-region-border)]",
  },
};
