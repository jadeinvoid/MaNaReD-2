const entityStyles = {
  organism: {
    wrap: "bg-entity-organism-bg border-entity-organism-border text-entity-organism-text",
    label: "Organism",
  },
  bioactivity: {
    wrap: "bg-entity-bioactivity-bg border-entity-bioactivity-border text-entity-bioactivity-text",
    label: "Bioactivity",
  },
  compound: {
    wrap: "bg-entity-compound-bg border-entity-compound-border text-entity-compound-text",
    label: "Compound",
  },
  region: {
    wrap: "bg-entity-region-bg border-entity-region-border text-entity-region-text",
    label: "Region",
  },
} as const;

export type EntityPillProps = {
  /** MaNaReD entity type from Figma colour.entity.* tokens. */
  entity: keyof typeof entityStyles;
};

/** Domain entity badge using MaNaReD entity colour triplets. */
export function EntityPill({ entity }: EntityPillProps) {
  const styles = entityStyles[entity];

  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-1 text-xs font-semibold ${styles.wrap}`}
    >
      {styles.label}
    </span>
  );
}
