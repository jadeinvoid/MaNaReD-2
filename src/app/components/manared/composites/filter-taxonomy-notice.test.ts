import { describe, expect, it } from "vite-plus/test";

import {
  getRemovedTaxonomyRanks,
  getTaxonomyBacktrackToastMessage,
} from "./filter-taxonomy-notice";
import { setTaxonomyRankFilter, type FilterState, type TaxonomyRankId } from "./filter-state";

const emptyState: FilterState = { active: [] };

function stateWithRanks(...ranks: Array<[TaxonomyRankId, string]>): FilterState {
  return ranks.reduce<FilterState>(
    (state, [rank, value]) => setTaxonomyRankFilter(state, rank, value),
    emptyState,
  );
}

describe("filter taxonomy backtrack notice", () => {
  it("returns no toast message for first forward selection", () => {
    const next = setTaxonomyRankFilter(emptyState, "phylum", "Porifera");
    const removed = getRemovedTaxonomyRanks(emptyState, next);
    const message = getTaxonomyBacktrackToastMessage("phylum", "Porifera", removed);

    expect(removed).toEqual([]);
    expect(message).toBeNull();
  });

  it("returns no toast message when clearing a rank without deeper selections", () => {
    const previous = stateWithRanks(["phylum", "Porifera"], ["class", "Demospongiae"]);
    const next = setTaxonomyRankFilter(previous, "class", null);
    const removed = getRemovedTaxonomyRanks(previous, next);
    const message = getTaxonomyBacktrackToastMessage("class", null, removed);

    expect(removed).toEqual(["class"]);
    expect(message).toBeNull();
  });

  it("returns clear message when deselecting a rank removes deeper selections", () => {
    const previous = stateWithRanks(
      ["phylum", "Porifera"],
      ["class", "Demospongiae"],
      ["order", "Suberitida"],
    );
    const next = setTaxonomyRankFilter(previous, "class", null);
    const removed = getRemovedTaxonomyRanks(previous, next);
    const message = getTaxonomyBacktrackToastMessage("class", null, removed);

    expect(removed).toEqual(["class", "order"]);
    expect(message).toBe("Cleared Class — removed Order.");
  });

  it("returns changed message when editing a higher rank clears deeper selections", () => {
    const previous = stateWithRanks(
      ["phylum", "Porifera"],
      ["class", "Demospongiae"],
      ["order", "Suberitida"],
    );
    const next = setTaxonomyRankFilter(previous, "phylum", "Porifera");
    const removed = getRemovedTaxonomyRanks(previous, next);
    const message = getTaxonomyBacktrackToastMessage("phylum", "Porifera", removed);

    expect(removed).toEqual(["class", "order"]);
    expect(message).toBe("Changed Phylum — cleared Class, Order.");
  });

  it("returns clear message when deselecting phylum removes all deeper ranks", () => {
    const previous = stateWithRanks(
      ["phylum", "Porifera"],
      ["class", "Demospongiae"],
      ["order", "Suberitida"],
    );
    const next = setTaxonomyRankFilter(previous, "phylum", null);
    const removed = getRemovedTaxonomyRanks(previous, next);
    const message = getTaxonomyBacktrackToastMessage("phylum", null, removed);

    expect(removed).toEqual(["phylum", "class", "order"]);
    expect(message).toBe("Cleared Phylum — removed Class, Order.");
  });
});
