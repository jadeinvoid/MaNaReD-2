import {
  selectedTaxonomyRanks,
  TAXONOMY_RANKS,
  type FilterState,
  type TaxonomyRankId,
} from "./filter-state";

function rankIndex(rankId: TaxonomyRankId): number {
  return TAXONOMY_RANKS.findIndex((entry) => entry.id === rankId);
}

function rankLabel(rankId: TaxonomyRankId): string {
  return TAXONOMY_RANKS.find((entry) => entry.id === rankId)?.label ?? rankId;
}

/** Returns taxonomy rank ids removed when moving from one filter state to another. */
export function getRemovedTaxonomyRanks(
  previous: FilterState,
  next: FilterState,
): TaxonomyRankId[] {
  const previousRanks = selectedTaxonomyRanks(previous);
  const nextRanks = selectedTaxonomyRanks(next);
  const removed: TaxonomyRankId[] = [];

  for (const rank of TAXONOMY_RANKS) {
    if (previousRanks[rank.id] && !nextRanks[rank.id]) {
      removed.push(rank.id);
    }
  }

  return removed;
}

/** Builds toast copy when editing a rank clears deeper taxonomy selections. */
export function getTaxonomyBacktrackToastMessage(
  editedRank: TaxonomyRankId,
  nextValue: string | null,
  removedRanks: TaxonomyRankId[],
): string | null {
  const editedIndex = rankIndex(editedRank);
  const deeperRemoved = removedRanks.filter((rankId) => rankIndex(rankId) > editedIndex);

  if (deeperRemoved.length === 0) {
    return null;
  }

  const clearedLabels = deeperRemoved.map((rankId) => rankLabel(rankId)).join(", ");
  const editedLabel = rankLabel(editedRank);

  if (nextValue === null) {
    return `Cleared ${editedLabel} — removed ${clearedLabels}.`;
  }

  return `Changed ${editedLabel} — cleared ${clearedLabels}.`;
}
