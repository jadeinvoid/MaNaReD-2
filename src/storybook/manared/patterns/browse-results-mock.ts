import type { CompoundCardProps } from "@/app/components/manared/domain/compound-card";
import type { ListRowProps } from "@/app/components/manared/domain/list-row";
import type { EntityType } from "@/app/components/manared/primitives/chip";
import {
  matchesRegionFilter,
  type FilterState,
} from "@/app/components/manared/composites/filter-state";

export type BrowseResult = {
  id: string;
  name: string;
  formula?: string;
  molecularWeight?: string;
  molecularWeightNumber?: string;
  molecularWeightUnit?: string;
  tags: { label: string; entity: EntityType }[];
  region?: string;
  organism?: string;
  bioactivity?: string;
};

export const BROWSE_RESULTS_MOCK: BrowseResult[] = [
  {
    id: "# HAL-2024-001",
    name: "Halichondrin B",
    formula: "C₆₀H₈₆O₁₉",
    molecularWeight: "1111.29 g/mol",
    molecularWeightNumber: "1111.29",
    molecularWeightUnit: "g/mol",
    tags: [
      { label: "Antitumor", entity: "compound" },
      { label: "Marine Origin", entity: "organism" },
    ],
    region: "Indo-Pacific",
    organism: "Halichondria okadai",
    bioactivity: "Antineoplastic",
  },
  {
    id: "CMNPD-00103",
    name: "Manoalide",
    formula: "C₂₅H₄₀O₅",
    molecularWeight: "402.6 Da",
    molecularWeightNumber: "402.6",
    molecularWeightUnit: "Da",
    tags: [{ label: "Anti-inflammatory", entity: "bioactivity" }],
    region: "Mediterranean",
    organism: "Sponge",
    bioactivity: "Anti-inflammatory",
  },
  {
    id: "# HAL-2024-002",
    name: "Discodermolide",
    formula: "C₄₃H₆₆O₁₄",
    molecularWeightNumber: "773.0",
    molecularWeightUnit: "Da",
    tags: [
      { label: "Antitumor", entity: "compound" },
      { label: "Porifera", entity: "organism" },
    ],
    region: "Caribbean",
    organism: "Discodermia dissoluta",
    bioactivity: "Antitumor",
  },
  {
    id: "# HAL-2024-003",
    name: "Latrunculin A",
    molecularWeightNumber: "421.5",
    molecularWeightUnit: "Da",
    tags: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Sponge", entity: "region" },
    ],
    region: "Red Sea",
    organism: "Latrunculia sp.",
    bioactivity: "Cytotoxic",
  },
];

export function toCompoundCardProps(result: BrowseResult): CompoundCardProps {
  return {
    id: result.id,
    name: result.name,
    formula: result.formula,
    molecularWeight: result.molecularWeight,
    tags: result.tags,
    region: result.region,
    organism: result.organism,
    bioactivity: result.bioactivity,
  };
}

export function toListRowProps(result: BrowseResult): ListRowProps {
  return {
    id: result.id,
    title: result.name,
    chips: result.tags,
    labelNumber: result.molecularWeightNumber,
    labelUnit: result.molecularWeightUnit,
    label:
      result.molecularWeightNumber && result.molecularWeightUnit
        ? undefined
        : result.molecularWeight,
  };
}

export function filterBrowseResults(results: BrowseResult[], filters: FilterState): BrowseResult[] {
  return results.filter((result) => matchesRegionFilter(result.region, filters));
}
