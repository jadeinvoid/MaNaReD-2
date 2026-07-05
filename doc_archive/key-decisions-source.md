# Key design decisions (source archive)

Archived from [`README.md`](../README.md) — preserved as the original written content before expansion into [`docs/UX-DECISIONS.md`](../docs/UX-DECISIONS.md).

---

- **Entity-first dual-nav architecture** — Compounds, Organisms, and Regions as co-equal browse destinations, with a unified query state shared between global search and the filter sidebar
- **Deterministic controlled-vocabulary search** — not AI or natural language interpretation, preserving the verifiability that distinguishes a scientific database from a language model
- **Filter pattern assignment by data shape** — progressive filter for taxonomy trees, range sliders for continuous numeric properties, dropdowns for bounded categorical data, tag-based multi-select for additive bioactivity queries
- **Post-query refinement suggestions (PQRS)** — derived from the live result set, surfaced between the search bar and results rather than inside the filter panel
- **Contextual filter behavior in browse vs search mode** — including sidebar reordering, MW range auto-narrowing, and implicit relevance sorting on query entry
- **Filter state persistence across entity switches** — with explicit provenance signaling for carried filters
- **Empty state system** — distinguishing filter-caused, query-caused, and data-gap emptiness with distinct recovery paths and tone per trigger type
- **Guided entry via curated pre-filtered query cards** — on the home screen, designed as live database queries rather than onboarding steps
