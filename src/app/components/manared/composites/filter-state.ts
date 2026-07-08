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

export const MW_MIN = 0;
export const MW_MAX = 2000;
export const MW_DEFAULT_RANGE: [number, number] = [200, 400];
export const MW_FULL_RANGE: [number, number] = [MW_MIN, MW_MAX];

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
  const nonTaxonomy = state.active
    .filter((filter) => filter.category !== "taxonomy")
    .map((filter) => ({
      id: filter.id,
      label: filter.label,
    }));

  return taxonomy ? [taxonomy, ...nonTaxonomy] : nonTaxonomy;
}
