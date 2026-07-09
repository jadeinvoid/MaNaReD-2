import {
  REGION_RANKS,
  selectedRegionRanks,
  type FilterState,
  type RegionRankId,
} from "./filter-state";

function rankIndex(rankId: RegionRankId): number {
  return REGION_RANKS.findIndex((entry) => entry.id === rankId);
}

function rankLabel(rankId: RegionRankId): string {
  return REGION_RANKS.find((entry) => entry.id === rankId)?.label ?? rankId;
}

/** Returns region rank ids removed when moving from one filter state to another. */
export function getRemovedRegionRanks(previous: FilterState, next: FilterState): RegionRankId[] {
  const previousRanks = selectedRegionRanks(previous);
  const nextRanks = selectedRegionRanks(next);
  const removed: RegionRankId[] = [];

  for (const rank of REGION_RANKS) {
    if (previousRanks[rank.id] && !nextRanks[rank.id]) {
      removed.push(rank.id);
    }
  }

  return removed;
}

/** Builds toast copy when editing a rank clears deeper region selections. */
export function getRegionBacktrackToastMessage(
  editedRank: RegionRankId,
  nextValue: string | null,
  removedRanks: RegionRankId[],
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
