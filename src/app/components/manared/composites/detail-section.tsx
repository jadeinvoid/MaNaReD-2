import { HStack, VStack } from "@astryxdesign/core/Layout";

import { Chip } from "../primitives/chip";
import {
  DetailCategoryDivider,
  DetailCount,
  DetailIdentityId,
  DetailIdentityName,
  DetailPicture,
  DetailSubcategoryTitle,
} from "../primitives/detail-atoms";
import type { EntityType } from "../primitives/chip";

export type DetailSectionProps = {
  id: string;
  name: string;
  bioactivities: { label: string; entity: EntityType }[];
  compoundClasses: { label: string; entity: EntityType }[];
  bioactivityCount: number;
};

/** Composed detail page section from Figma detail frames. */
export function DetailSection({
  id,
  name,
  bioactivities,
  compoundClasses,
  bioactivityCount,
}: DetailSectionProps) {
  return (
    <VStack gap={6} className="w-full max-w-4xl">
      <HStack gap={6} vAlign="start">
        <DetailPicture alt={`${name} structure`} />
        <VStack gap={2}>
          <DetailIdentityId>{id}</DetailIdentityId>
          <DetailIdentityName>{name}</DetailIdentityName>
        </VStack>
      </HStack>

      <DetailCategoryDivider title="Classification" />

      <HStack gap={8} vAlign="start">
        <VStack gap={2}>
          <DetailSubcategoryTitle>Bioactivities</DetailSubcategoryTitle>
          <HStack gap={2} className="flex-wrap">
            {bioactivities.map((item) => (
              <Chip key={item.label} label={item.label} entity={item.entity} />
            ))}
          </HStack>
        </VStack>
        <VStack gap={2}>
          <DetailSubcategoryTitle>Compound Class</DetailSubcategoryTitle>
          <HStack gap={2} className="flex-wrap">
            {compoundClasses.map((item) => (
              <Chip key={item.label} label={item.label} entity={item.entity} />
            ))}
          </HStack>
        </VStack>
      </HStack>

      <DetailCategoryDivider title="Related Records" />
      <HStack gap={4} vAlign="center">
        <DetailSubcategoryTitle>Associated Bioactivities</DetailSubcategoryTitle>
        <DetailCount count={bioactivityCount} />
      </HStack>
    </VStack>
  );
}
