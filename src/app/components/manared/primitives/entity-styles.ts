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
    bg: "bg-entity-organism-bg",
    border: "border-entity-organism-border",
    text: "text-entity-organism-text",
    combined: "bg-entity-organism-bg text-entity-organism-text border-entity-organism-border",
  },
  bioactivity: {
    bg: "bg-entity-bioactivity-bg",
    border: "border-entity-bioactivity-border",
    text: "text-entity-bioactivity-text",
    combined:
      "bg-entity-bioactivity-bg text-entity-bioactivity-text border-entity-bioactivity-border",
  },
  compound: {
    bg: "bg-entity-compound-bg",
    border: "border-entity-compound-border",
    text: "text-entity-compound-text",
    combined: "bg-entity-compound-bg text-entity-compound-text border-entity-compound-border",
  },
  region: {
    bg: "bg-entity-region-bg",
    border: "border-entity-region-border",
    text: "text-entity-region-text",
    combined: "bg-entity-region-bg text-entity-region-text border-entity-region-border",
  },
};
