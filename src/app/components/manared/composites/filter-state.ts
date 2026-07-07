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
