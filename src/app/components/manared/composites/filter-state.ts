export type FilterCategoryId =
  | "taxonomy"
  | "molecularWeight"
  | "compoundClass"
  | "geographicRegion"
  | "bioactivity"
  | "targetAssay";

export type ActiveFilter = {
  id: string;
  category: FilterCategoryId;
  categoryLabel: string;
  label: string;
  provenance?: string;
};

export type FilterState = {
  active: ActiveFilter[];
};

export type ChipBarItem = {
  id: string;
  label: string;
  title?: string;
};

export type FilterCategoryConfig = {
  id: FilterCategoryId;
  label: string;
};

export const FILTER_CATEGORIES: FilterCategoryConfig[] = [
  { id: "taxonomy", label: "Taxonomy" },
  { id: "molecularWeight", label: "Molecular Weight" },
  { id: "compoundClass", label: "Compound Class" },
  { id: "geographicRegion", label: "Geographic Region" },
  { id: "bioactivity", label: "Bioactivity" },
  { id: "targetAssay", label: "Target / assay" },
];

export const MOCK_BIOACTIVITY_TAGS = [
  "Antiviral",
  "Cytotoxic",
  "Antifungal",
  "Anti-Inflam.",
  "Antibacterial",
] as const;

export const MOCK_COMPOUND_CLASSES = [
  "Alkaloids",
  "Terpenoids",
  "Peptides",
  "Polyketides",
] as const;

export type TaxonomyLeaf = {
  /** Display label (also used as the leaf filter id suffix in this prototype). */
  label: string;
  /** Facet count shown in the taxonomy panel (not persisted into chips). */
  count: number;
};

export type TaxonomyRankId = "phylum" | "class" | "order" | "family" | "genus" | "species";

export type TaxonomyRank = {
  /** Stable rank key for expansion state in the taxonomy panel. */
  id: TaxonomyRankId;
  /** Rank label shown in the taxonomy panel. */
  label: string;
  leaves: readonly TaxonomyLeaf[];
};

/**
 * Mock cascading taxonomy ranks for the filter sidebar prototype.
 * Each rank narrows the next rank, and the UI auto-opens the next rank after
 * a selection while keeping only one rank panel open at a time.
 */
export const TAXONOMY_RANKS: readonly TaxonomyRank[] = [
  {
    id: "phylum",
    label: "Phylum",
    leaves: [{ label: "Porifera", count: 1 }],
  },
  {
    id: "class",
    label: "Class",
    leaves: [{ label: "Demospongiae", count: 1 }],
  },
  {
    id: "order",
    label: "Order",
    leaves: [{ label: "Suberitida", count: 1 }],
  },
  {
    id: "family",
    label: "Family",
    leaves: [{ label: "Halichondriidae", count: 1 }],
  },
  {
    id: "genus",
    label: "Genus",
    leaves: [{ label: "Halichondria", count: 1 }],
  },
  {
    id: "species",
    label: "Species",
    leaves: [{ label: "Halichondria okadai", count: 1 }],
  },
] as const;

export type RegionLeaf = {
  /** Display label (also used as the leaf filter id suffix in this prototype). */
  label: string;
  /** Facet count shown in the region panel (not persisted into chips). */
  count: number;
};

export type RegionRankId = "ocean" | "sea";

export type RegionRank = {
  /** Stable rank key for expansion state in the region panel. */
  id: RegionRankId;
  /** Rank label shown in the region panel. */
  label: string;
  leaves: readonly RegionLeaf[];
};

/**
 * Mock cascading geographic region ranks for the filter sidebar prototype.
 * Each rank narrows the next rank, and the UI auto-opens the next rank after
 * a selection while keeping only one rank panel open at a time.
 */
export const REGION_RANKS: readonly RegionRank[] = [
  {
    id: "ocean",
    label: "Ocean",
    leaves: [
      { label: "Pacific Ocean", count: 42 },
      { label: "Atlantic Ocean", count: 18 },
      { label: "Indian Ocean", count: 11 },
    ],
  },
  {
    id: "sea",
    label: "Sea / basin",
    leaves: [
      { label: "South China Sea", count: 12 },
      { label: "Coral Sea", count: 7 },
      { label: "Caribbean Sea", count: 5 },
    ],
  },
] as const;

export const MW_MIN = 0;
export const MW_MAX = 2000;
export const MW_DEFAULT_RANGE: [number, number] = [200, 400];
export const MW_FULL_RANGE: [number, number] = [MW_MIN, MW_MAX];

const MW_RANGE_LABEL = /^MW (\d+)–(\d+)$/;

export function parseMwRangeLabel(label: string): [number, number] | null {
  const match = MW_RANGE_LABEL.exec(label);
  if (!match) {
    return null;
  }
  return [Number(match[1]), Number(match[2])];
}

export function isMwFullRange(
  [min, max]: [number, number],
  fullRange: [number, number] = MW_FULL_RANGE,
): boolean {
  const [fullMin, fullMax] = fullRange;
  return min <= fullMin && max >= fullMax;
}

export function committedRangeForCategory(
  state: FilterState,
  category: FilterCategoryId,
): [number, number] | null {
  const rangeFilter = state.active.find((filter) => filter.category === category);
  if (!rangeFilter) {
    return null;
  }
  return parseMwRangeLabel(rangeFilter.label);
}

export function draftRangeForCategory(
  state: FilterState,
  category: FilterCategoryId,
): [number, number] {
  return committedRangeForCategory(state, category) ?? MW_FULL_RANGE;
}

export const MW_RANGE_STEP = 10;

/** Clamp a MW draft range to domain bounds and minimum thumb separation. */
export function clampMwRange(
  [minVal, maxVal]: [number, number],
  domain: [number, number] = MW_FULL_RANGE,
  minGap = MW_RANGE_STEP,
): [number, number] {
  const [domainMin, domainMax] = domain;
  let min = Math.max(domainMin, Math.min(minVal, domainMax));
  let max = Math.max(domainMin, Math.min(maxVal, domainMax));

  if (min > max - minGap) {
    max = Math.min(domainMax, min + minGap);
    min = Math.max(domainMin, max - minGap);
  }

  return [min, max];
}

function filterId(category: FilterCategoryId, suffix: string) {
  return `${category}:${suffix}`;
}

function withoutCategory(state: FilterState, category: FilterCategoryId): ActiveFilter[] {
  return state.active.filter((filter) => filter.category !== category);
}

function categoryLabel(category: FilterCategoryId): string {
  return FILTER_CATEGORIES.find((entry) => entry.id === category)?.label ?? category;
}

export function clearAllFilters(): FilterState {
  return { active: [] };
}

export function removeFilter(state: FilterState, id: string): FilterState {
  if (id === "taxonomy:path") {
    return { active: state.active.filter((filter) => filter.category !== "taxonomy") };
  }
  if (id === "geographicRegion:path") {
    return { active: state.active.filter((filter) => filter.category !== "geographicRegion") };
  }
  return { active: state.active.filter((filter) => filter.id !== id) };
}

export function toggleTagFilter(
  state: FilterState,
  category: FilterCategoryId,
  tagLabel: string,
): FilterState {
  const id = filterId(category, tagLabel);
  const exists = state.active.some((filter) => filter.id === id);

  if (exists) {
    return removeFilter(state, id);
  }

  return {
    active: [
      ...state.active,
      {
        id,
        category,
        categoryLabel: categoryLabel(category),
        label: tagLabel,
      },
    ],
  };
}

function taxonomyFilterId(rank: TaxonomyRankId) {
  return filterId("taxonomy", rank);
}

export function selectedTaxonomyRanks(state: FilterState): Partial<Record<TaxonomyRankId, string>> {
  const result: Partial<Record<TaxonomyRankId, string>> = {};

  for (const filter of state.active) {
    if (filter.category !== "taxonomy") {
      continue;
    }

    const rank = TAXONOMY_RANKS.find((entry) => filter.id === taxonomyFilterId(entry.id));
    if (rank) {
      result[rank.id] = filter.label.replace(`${rank.label} · `, "");
    }
  }

  return result;
}

export function setTaxonomyRankFilter(
  state: FilterState,
  rank: TaxonomyRankId,
  value: string | null,
): FilterState {
  const rankIndex = TAXONOMY_RANKS.findIndex((entry) => entry.id === rank);
  const remaining = state.active.filter((filter) => {
    if (filter.category !== "taxonomy") {
      return true;
    }

    const currentRankIndex = TAXONOMY_RANKS.findIndex(
      (entry) => filter.id === taxonomyFilterId(entry.id),
    );
    return currentRankIndex > -1 && currentRankIndex < rankIndex;
  });

  if (!value) {
    return { active: remaining };
  }

  const rankLabel = TAXONOMY_RANKS.find((entry) => entry.id === rank)?.label ?? rank;

  return {
    active: [
      ...remaining,
      {
        id: taxonomyFilterId(rank),
        category: "taxonomy",
        categoryLabel: categoryLabel("taxonomy"),
        label: `${rankLabel} · ${value}`,
        provenance: rankLabel,
      },
    ],
  };
}

function regionFilterId(rank: RegionRankId) {
  return filterId("geographicRegion", rank);
}

export function selectedRegionRanks(state: FilterState): Partial<Record<RegionRankId, string>> {
  const result: Partial<Record<RegionRankId, string>> = {};

  for (const filter of state.active) {
    if (filter.category !== "geographicRegion") {
      continue;
    }

    const rank = REGION_RANKS.find((entry) => filter.id === regionFilterId(entry.id));
    if (rank) {
      result[rank.id] = filter.label.replace(`${rank.label} · `, "");
    }
  }

  return result;
}

export function setRegionRankFilter(
  state: FilterState,
  rank: RegionRankId,
  value: string | null,
): FilterState {
  const rankIndex = REGION_RANKS.findIndex((entry) => entry.id === rank);
  const remaining = state.active.filter((filter) => {
    if (filter.category !== "geographicRegion") {
      return true;
    }

    const currentRankIndex = REGION_RANKS.findIndex(
      (entry) => filter.id === regionFilterId(entry.id),
    );
    return currentRankIndex > -1 && currentRankIndex < rankIndex;
  });

  if (!value) {
    return { active: remaining };
  }

  const rankLabel = REGION_RANKS.find((entry) => entry.id === rank)?.label ?? rank;

  return {
    active: [
      ...remaining,
      {
        id: regionFilterId(rank),
        category: "geographicRegion",
        categoryLabel: categoryLabel("geographicRegion"),
        label: `${rankLabel} · ${value}`,
        provenance: rankLabel,
      },
    ],
  };
}

export function regionChipItem(state: FilterState): ChipBarItem | null {
  const regionFilters = state.active.filter((filter) => filter.category === "geographicRegion");
  if (regionFilters.length === 0) {
    return null;
  }

  let deepestFilter = regionFilters[0];
  let deepestIndex = -1;

  for (const filter of regionFilters) {
    const currentIndex = REGION_RANKS.findIndex((entry) => filter.id === regionFilterId(entry.id));
    if (currentIndex >= deepestIndex) {
      deepestFilter = filter;
      deepestIndex = currentIndex;
    }
  }

  const overflowCount = Math.max(0, regionFilters.length - 1);
  const overflowSuffix = overflowCount > 0 ? ` (+${overflowCount})` : "";

  return {
    id: "geographicRegion:path",
    label: `${deepestFilter.label}${overflowSuffix}`,
    title: regionFilters.map((filter) => filter.label).join(" / "),
  };
}

/** Deepest committed region label for mock result matching in browse patterns. */
export function deepestRegionLabel(state: FilterState): string | null {
  const selected = selectedRegionRanks(state);
  for (let index = REGION_RANKS.length - 1; index >= 0; index -= 1) {
    const rank = REGION_RANKS[index];
    const value = selected[rank.id];
    if (value) {
      return value;
    }
  }
  return null;
}

/** Returns true when no region filter is active or the card region matches the deepest selection. */
export function matchesRegionFilter(region: string | undefined, state: FilterState): boolean {
  const deepest = deepestRegionLabel(state);
  if (!deepest) {
    return true;
  }
  return region === deepest;
}

export function taxonomyChipItem(state: FilterState): ChipBarItem | null {
  const taxonomyFilters = state.active.filter((filter) => filter.category === "taxonomy");
  if (taxonomyFilters.length === 0) {
    return null;
  }

  let deepestFilter = taxonomyFilters[0];
  let deepestIndex = -1;

  for (const filter of taxonomyFilters) {
    const currentIndex = TAXONOMY_RANKS.findIndex(
      (entry) => filter.id === taxonomyFilterId(entry.id),
    );
    if (currentIndex >= deepestIndex) {
      deepestFilter = filter;
      deepestIndex = currentIndex;
    }
  }

  const overflowCount = Math.max(0, taxonomyFilters.length - 1);
  const overflowSuffix = overflowCount > 0 ? ` (+${overflowCount})` : "";

  return {
    id: "taxonomy:path",
    label: `${deepestFilter.label}${overflowSuffix}`,
    title: taxonomyFilters.map((filter) => filter.label).join(" / "),
  };
}

export function setRangeFilter(
  state: FilterState,
  category: FilterCategoryId,
  min: number,
  max: number,
  fullRange: [number, number] = MW_FULL_RANGE,
): FilterState {
  const withoutRange = withoutCategory(state, category);
  const [fullMin, fullMax] = fullRange;

  if (min <= fullMin && max >= fullMax) {
    return { active: withoutRange };
  }

  const id = filterId(category, "range");
  return {
    active: [
      ...withoutRange,
      {
        id,
        category,
        categoryLabel: categoryLabel(category),
        label: `MW ${min}–${max}`,
      },
    ],
  };
}

export function setDropdownFilter(
  state: FilterState,
  category: FilterCategoryId,
  value: string | null,
): FilterState {
  const withoutValue = withoutCategory(state, category);

  if (!value) {
    return { active: withoutValue };
  }

  const id = filterId(category, value);
  return {
    active: [
      ...withoutValue,
      {
        id,
        category,
        categoryLabel: categoryLabel(category),
        label: value,
      },
    ],
  };
}

export function activeCountForCategory(state: FilterState, category: FilterCategoryId): number {
  return state.active.filter((filter) => filter.category === category).length;
}

export function filtersToChipItems(state: FilterState): ChipBarItem[] {
  const taxonomy = taxonomyChipItem(state);
  const region = regionChipItem(state);
  const collapsedCategories = new Set<FilterCategoryId>(["taxonomy", "geographicRegion"]);
  const otherFilters = state.active
    .filter((filter) => !collapsedCategories.has(filter.category))
    .map((filter) => {
      if (filter.category === "molecularWeight") {
        const range = parseMwRangeLabel(filter.label);
        if (range) {
          const [min, max] = range;
          return {
            id: filter.id,
            label: filter.label,
            title: `Molecular weight between ${min} and ${max} Daltons — click to edit`,
          };
        }
      }
      return {
        id: filter.id,
        label: filter.label,
      };
    });

  return [taxonomy, region, ...otherFilters].filter((item): item is ChipBarItem => item !== null);
}
