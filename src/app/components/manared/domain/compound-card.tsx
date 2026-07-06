import { HStack, VStack } from "@astryxdesign/core/Layout";

import { Chip } from "../primitives/chip";
import { EntityBadge } from "../primitives/entity-badge";
import { ListId, ListTitle } from "../primitives/list-text";
import { LIST_CARD_META, LIST_CARD_TEXT_STACK } from "../primitives/list-text-styles";
import { COMPOUND_CARD_MEDIA, SURFACE_COMPOUND_CARD } from "../primitives/surface-styles";
import type { EntityType } from "../primitives/chip";

export type CompoundCardProps = {
  id: string;
  name: string;
  formula?: string;
  source?: string;
  tags: { label: string; entity: EntityType }[];
};

/** Compound result card — token-backed shell aligned with list row card surface (`367:3752`). */
export function CompoundCard({ id, name, formula, source, tags }: CompoundCardProps) {
  return (
    <div className={SURFACE_COMPOUND_CARD}>
      <HStack gap={4} vAlign="start">
        <div className={COMPOUND_CARD_MEDIA}>
          <span className={LIST_CARD_META}>Structure</span>
        </div>
        <VStack gap={2} className={LIST_CARD_TEXT_STACK}>
          <ListId>{id}</ListId>
          <ListTitle>{name}</ListTitle>
          {formula ? <span className={LIST_CARD_META}>{formula}</span> : null}
          {source ? <span className={LIST_CARD_META}>Source: {source}</span> : null}
          <HStack gap={2} className="flex-wrap pt-2">
            <EntityBadge entity="compound" label="Compound" />
            {tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} entity={tag.entity} />
            ))}
          </HStack>
        </VStack>
      </HStack>
    </div>
  );
}
