import { HStack, VStack } from "@astryxdesign/core/Layout";

import { Chip } from "../primitives/chip";
import {
  CARD_BODY_COLUMN,
  CARD_FOOTER,
  CARD_FOOTER_ACTIONS,
  CARD_FORMULA,
  CARD_HEADER_STACK,
  CARD_ID,
  CARD_MEDIA_LABEL,
  CARD_META_CELL,
  CARD_META_GRID,
  CARD_META_LABEL,
  CARD_META_VALUE,
  CARD_TAGS_ROW,
  CARD_TITLE,
} from "../primitives/card-text-styles";
import { INTERACTIVE_CARD_ACTION, INTERACTIVE_CARD_DETAIL } from "../primitives/interactive-styles";
import { COMPOUND_CARD_MEDIA, SURFACE_COMPOUND_CARD } from "../primitives/surface-styles";
import type { EntityType } from "../primitives/chip";

export type CompoundCardProps = {
  id: string;
  name: string;
  formula?: string;
  /** Molecular weight suffix, e.g. `1111.29 g/mol`. Shown after formula with ` · MW:`. */
  molecularWeight?: string;
  tags: { label: string; entity: EntityType }[];
  region?: string;
  organism?: string;
  bioactivity?: string;
  onSave?: () => void;
  onExport?: () => void;
  onDetail?: () => void;
};

function CardMetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className={CARD_META_CELL}>
      <span className={CARD_META_LABEL}>{label}</span>
      <span className={CARD_META_VALUE}>{value}</span>
    </div>
  );
}

function formatFormulaLine(formula?: string, molecularWeight?: string) {
  if (formula && molecularWeight) {
    return `${formula} · MW: ${molecularWeight}`;
  }
  return formula ?? (molecularWeight ? `MW: ${molecularWeight}` : null);
}

/** Full-width compound result card for browse search mode. */
export function CompoundCard({
  id,
  name,
  formula,
  molecularWeight,
  tags,
  region,
  organism,
  bioactivity,
  onSave,
  onExport,
  onDetail,
}: CompoundCardProps) {
  const formulaLine = formatFormulaLine(formula, molecularWeight);
  const showMetadata = region != null || organism != null || bioactivity != null;

  return (
    <div className={SURFACE_COMPOUND_CARD}>
      <VStack gap={4} className="w-full">
        <HStack gap={4} vAlign="start" className="w-full">
          <div className={COMPOUND_CARD_MEDIA}>
            <span className={CARD_MEDIA_LABEL}>[Molecular Structure]</span>
          </div>
          <div className={CARD_BODY_COLUMN}>
            <div className={CARD_HEADER_STACK}>
              <span className={CARD_ID}>{id}</span>
              <span className={CARD_TITLE}>{name}</span>
              {formulaLine ? <span className={CARD_FORMULA}>{formulaLine}</span> : null}
            </div>
            <div className={CARD_TAGS_ROW}>
              {tags.map((tag) => (
                <Chip key={tag.label} label={tag.label} entity={tag.entity} />
              ))}
            </div>
          </div>
        </HStack>

        {showMetadata ? (
          <div className={CARD_META_GRID}>
            {region != null ? <CardMetaField label="Geographic Region" value={region} /> : null}
            {organism != null ? <CardMetaField label="Source Organism" value={organism} /> : null}
            {bioactivity != null ? (
              <CardMetaField label="Biological Activity" value={bioactivity} />
            ) : null}
          </div>
        ) : null}

        <div className={CARD_FOOTER}>
          <div className={CARD_FOOTER_ACTIONS}>
            <button type="button" onClick={onSave} className={INTERACTIVE_CARD_ACTION}>
              Save
            </button>
            <button type="button" onClick={onExport} className={INTERACTIVE_CARD_ACTION}>
              Export
            </button>
          </div>
          <button type="button" onClick={onDetail} className={INTERACTIVE_CARD_DETAIL}>
            Detail →
          </button>
        </div>
      </VStack>
    </div>
  );
}
