import type { BrowseEntity } from "./entity-nav";

export type SortDirectionIcon = "up" | "down";

export type SortOptionId =
  | "recentlyAdded"
  | "nameAsc"
  | "nameDesc"
  | "molecularWeightAsc"
  | "molecularWeightDesc"
  | "bioactivityStrength"
  | "compoundCountAsc"
  | "compoundCountDesc"
  | "phylum"
  | "organismCountAsc"
  | "organismCountDesc";

export type SortOption = {
  id: SortOptionId;
  label: string;
  directionIcon?: SortDirectionIcon;
};

export const SORT_OPTIONS_BY_ENTITY: Record<BrowseEntity, SortOption[]> = {
  compounds: [
    { id: "recentlyAdded", label: "Recently Added" },
    { id: "nameAsc", label: "Name (A-Z)" },
    { id: "nameDesc", label: "Name (Z-A)" },
    { id: "molecularWeightAsc", label: "Molecular Weight", directionIcon: "up" },
    { id: "molecularWeightDesc", label: "Molecular Weight", directionIcon: "down" },
    { id: "bioactivityStrength", label: "Bioactivity Strength" },
  ],
  organisms: [
    { id: "recentlyAdded", label: "Recently Added" },
    { id: "nameAsc", label: "Name (A-Z)" },
    { id: "nameDesc", label: "Name (Z-A)" },
    { id: "compoundCountAsc", label: "Compound Count", directionIcon: "up" },
    { id: "compoundCountDesc", label: "Compound Count", directionIcon: "down" },
    { id: "phylum", label: "Phylum" },
  ],
  regions: [
    { id: "recentlyAdded", label: "Recently Added" },
    { id: "nameAsc", label: "Name (A-Z)" },
    { id: "nameDesc", label: "Name (Z-A)" },
    { id: "compoundCountDesc", label: "Compound Count", directionIcon: "down" },
    { id: "compoundCountAsc", label: "Compound Count", directionIcon: "up" },
    { id: "organismCountDesc", label: "Organism Count", directionIcon: "down" },
    { id: "organismCountAsc", label: "Organism Count", directionIcon: "up" },
  ],
};

export const DEFAULT_SORT_BY_ENTITY: Record<BrowseEntity, SortOptionId> = {
  compounds: "recentlyAdded",
  organisms: "recentlyAdded",
  regions: "recentlyAdded",
};

export function getSortOptionLabel(entity: BrowseEntity, sortId: SortOptionId): string {
  const option = SORT_OPTIONS_BY_ENTITY[entity].find((entry) => entry.id === sortId);
  return option?.label ?? SORT_OPTIONS_BY_ENTITY[entity][0].label;
}

export function formatSortTriggerLabel(entity: BrowseEntity, sortId: SortOptionId): string {
  return `Sort by: ${getSortOptionLabel(entity, sortId)}`;
}

export type SortableBrowseResult = {
  name: string;
  recentRank?: number;
  molecularWeightNumber?: string;
  bioactivityStrength?: number;
};

export function sortBrowseResults<T extends SortableBrowseResult>(
  results: T[],
  sortId: SortOptionId,
  entity: BrowseEntity,
): T[] {
  if (entity !== "compounds") {
    return [...results];
  }

  const sorted = [...results];

  switch (sortId) {
    case "recentlyAdded":
      return sorted.sort((a, b) => (a.recentRank ?? 0) - (b.recentRank ?? 0));
    case "nameAsc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "nameDesc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "molecularWeightAsc":
      return sorted.sort(
        (a, b) =>
          Number.parseFloat(a.molecularWeightNumber ?? "0") -
          Number.parseFloat(b.molecularWeightNumber ?? "0"),
      );
    case "molecularWeightDesc":
      return sorted.sort(
        (a, b) =>
          Number.parseFloat(b.molecularWeightNumber ?? "0") -
          Number.parseFloat(a.molecularWeightNumber ?? "0"),
      );
    case "bioactivityStrength":
      return sorted.sort((a, b) => (b.bioactivityStrength ?? 0) - (a.bioactivityStrength ?? 0));
    default:
      return sorted;
  }
}
