import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { DetailTaxonomyItem } from "../primitives/detail-atoms";

export type TaxonomyBreadcrumbProps = {
  items: string[];
};

/** Detail page taxonomy breadcrumb from Figma `detail-taxonomy-breadcrumb`. */
export function TaxonomyBreadcrumb({ items }: TaxonomyBreadcrumbProps) {
  return (
    <HStack gap={2} vAlign="center" className="flex-wrap">
      {items.map((item, index) => (
        <HStack key={item} gap={2} vAlign="center">
          <DetailTaxonomyItem label={item} active={index === items.length - 1} />
          {index < items.length - 1 ? (
            <MaNaReDIcon name="chevron-right" size={24} className="text-inherit" />
          ) : null}
        </HStack>
      ))}
    </HStack>
  );
}
