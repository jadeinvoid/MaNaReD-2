import { describe, expect, it } from "vite-plus/test";

import { getRegionBacktrackToastMessage, getRemovedRegionRanks } from "./filter-region-notice";
import { setRegionRankFilter, type FilterState, type RegionRankId } from "./filter-state";

const emptyState: FilterState = { active: [] };

function stateWithRanks(...ranks: Array<[RegionRankId, string]>): FilterState {
  return ranks.reduce<FilterState>(
    (state, [rank, value]) => setRegionRankFilter(state, rank, value),
    emptyState,
  );
}

describe("filter region backtrack notice", () => {
  it("returns no toast message for first forward selection", () => {
    const next = setRegionRankFilter(emptyState, "ocean", "Pacific Ocean");
    const removed = getRemovedRegionRanks(emptyState, next);
    const message = getRegionBacktrackToastMessage("ocean", "Pacific Ocean", removed);

    expect(removed).toEqual([]);
    expect(message).toBeNull();
  });

  it("returns no toast message when clearing a rank without deeper selections", () => {
    const previous = stateWithRanks(["ocean", "Pacific Ocean"], ["sea", "South China Sea"]);
    const next = setRegionRankFilter(previous, "sea", null);
    const removed = getRemovedRegionRanks(previous, next);
    const message = getRegionBacktrackToastMessage("sea", null, removed);

    expect(removed).toEqual(["sea"]);
    expect(message).toBeNull();
  });

  it("returns clear message when deselecting a rank removes deeper selections", () => {
    const previous = stateWithRanks(["ocean", "Pacific Ocean"], ["sea", "South China Sea"]);
    const next = setRegionRankFilter(previous, "ocean", null);
    const removed = getRemovedRegionRanks(previous, next);
    const message = getRegionBacktrackToastMessage("ocean", null, removed);

    expect(removed).toEqual(["ocean", "sea"]);
    expect(message).toBe("Cleared Ocean — removed Sea / basin.");
  });

  it("returns changed message when editing a higher rank clears deeper selections", () => {
    const previous = stateWithRanks(["ocean", "Pacific Ocean"], ["sea", "South China Sea"]);
    const next = setRegionRankFilter(previous, "ocean", "Atlantic Ocean");
    const removed = getRemovedRegionRanks(previous, next);
    const message = getRegionBacktrackToastMessage("ocean", "Atlantic Ocean", removed);

    expect(removed).toEqual(["sea"]);
    expect(message).toBe("Changed Ocean — cleared Sea / basin.");
  });
});
