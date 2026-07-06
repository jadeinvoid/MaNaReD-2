import { Card } from "@astryxdesign/core/Card";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { Chip } from "../primitives/chip";
import { EntityBadge } from "../primitives/entity-badge";
import { ELEVATION_HOVER, SHADOW_CARD } from "../primitives/surface-styles";
import type { EntityType } from "../primitives/chip";

export type CompoundCardProps = {
  id: string;
  name: string;
  formula?: string;
  source?: string;
  tags: { label: string; entity: EntityType }[];
};

/** Compound result card from Figma `card` symbol (search mode). */
export function CompoundCard({ id, name, formula, source, tags }: CompoundCardProps) {
  return (
    <Card className={`w-full ${SHADOW_CARD} ${ELEVATION_HOVER}`}>
      <HStack gap={4} vAlign="start">
        <div className="flex h-36 w-44 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Text size="2xs" color="secondary">
            Structure
          </Text>
        </div>
        <VStack gap={2} className="flex-1">
          <Text size="2xs" color="secondary" className="font-mono">
            {id}
          </Text>
          <Text size="sm" weight="medium">
            {name}
          </Text>
          {formula ? (
            <Text size="2xs" color="secondary">
              {formula}
            </Text>
          ) : null}
          {source ? (
            <Text size="2xs" color="secondary">
              Source: {source}
            </Text>
          ) : null}
          <HStack gap={2} className="flex-wrap pt-2">
            <EntityBadge entity="compound" label="Compound" />
            {tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} entity={tag.entity} />
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
}
