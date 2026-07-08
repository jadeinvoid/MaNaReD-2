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

export type TaxonomyGroup = {
  /** Stable group key for expansion state in the taxonomy panel. */
  key: string;
  /** Group label shown in the taxonomy panel. */
  label: string;
  leaves: readonly TaxonomyLeaf[];
};

/**
 * Mock progressive taxonomy tree for the filter sidebar prototype.
 * UX requires a hierarchical (tree) control for taxonomy; this slice keeps it
 * deliberately shallow (two levels) to land the interaction plumbing first.
 */
export const MOCK_TAXONOMY_TREE: readonly TaxonomyGroup[] = [
  {
    key: "organism-taxonomy",
    label: "Organism taxonomy",
    leaves: [
      { label: "Porifera", count: 1 },
      { label: "Sponge", count: 1 },
      { label: "Halichondria okadai", count: 1 },
    ],
  },
  {
    key: "region-hierarchy",
    label: "Region hierarchy",
    leaves: [
      { label: "Pacific Ocean", count: 1 },
      { label: "Indian Ocean", count: 1 },
      { label: "Atlantic Ocean", count: 1 },
    ],
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

/**
 * Taxonomy leaf toggle (progressive tree).
 *
 * This is a thin wrapper over `toggleTagFilter` for the prototype: taxonomy
 * leaves are stored as flat filter chips, while the UI presents a hierarchy.
 */
export function toggleTaxonomyLeafFilter(state: FilterState, leafLabel: string) {
  return toggleTagFilter(state, "taxonomy", leafLabel);
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
  return state.active.map((filter) => ({
    id: filter.id,
    label: filter.label,
  }));
}
