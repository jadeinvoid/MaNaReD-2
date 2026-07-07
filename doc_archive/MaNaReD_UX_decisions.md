# MaNaReD — UX Decision Rationale
## Search & Filter Interaction Patterns

---

## Overview

MaNaReD is a marine natural products database designed primarily for researchers — marine biologists, pharmacologists, ecologists, and cheminformaticians — with secondary accessibility for students and general public users. The search and filter system is the tool's core interaction surface. Every structural decision was made to serve a single guiding principle:

> **The lens determines the fields, not the other way around.**

Researchers arrive with a hypothesis, not a browsing intent. The tool must support incremental narrowing from a large dataset toward a specific, defensible answer — and make that narrowing visible, reversible, and auditable at every step.

---

## 1. The Unified Query State

The most important structural decision in MaNaReD is that **global search and the filter sidebar are not two separate systems.** They are two input modes feeding into one shared query state, represented visually by the active filter chip bar.

```
Global search ──────┐
                    ├──→ Active chip bar (single source of truth) ──→ Result set
Filter sidebar ─────┘
```

This means:
- A search term appears as a chip in the same bar as filter chips, visually distinct (teal chip vs blue filter chip) but coexisting in the same query logic
- Removing the search term chip falls back to browse mode without clearing active filters
- PQRS pills (post-query refinement suggestions) derived from the result set provide a third, lighter-weight entry into the same state
- All three paths — search, filter, PQRS — converge at an identical result set and result count

The result count is not decorative. It is the primary spatial orientation cue for researchers, who instinctively read "243 compounds" as confirmation that their hypothesis is neither over- nor under-constrained.

---

## 2. Browse Mode vs Search Mode

The filter sidebar and chip bar behave differently depending on whether a search query is active. This was a deliberate decision, not a technical shortcut.

**Browse mode (no query):**
- Taxonomy progressive filter leads the sidebar — users start broad and narrow
- MW slider spans the full dataset range (0–2000 Da)
- Default sort: Recently Added
- No PQRS pills appear — there is no result set to derive suggestions from

**Search mode (query entered):**
- The search term pre-implies taxonomic and bioactivity intent — taxonomy filter collapses by default (still accessible, but not foregrounded)
- Bioactivity and MW filters move to the top of the sidebar, since these are the refinement axes users actually reach for post-query
- MW slider auto-narrows to the range present in the current result set — users don't have to guess meaningful values
- PQRS pills appear above the result list, derived from the actual hit set: "Cytotoxic only," "MW 400–900," "Porifera" — real filter shortcuts, not generic suggestions
- Default sort silently becomes Relevance — this is never shown as an explicit menu option. It is the implicit default the moment a query exists, overridable by the property-based sort options (MW, Name, Bioactivity Strength, Recently Added)

The transition between modes is non-destructive. Clearing a search term falls back to browse mode with all filter state intact.

---

## 3. Filter Pattern Assignment

Each filter type uses a specific pattern chosen to match its data shape and the user's epistemic state when they reach it.

**Progressive filter → Taxonomy**
Taxonomy is a deep tree (Phylum → Class → Order → Family → Genus → Species). Users arrive knowing where in the tree they want to be, but often need to explore one level at a time. Progressive reveal matches their incremental narrowing, and result counts at each node tell them whether the next level is worth expanding — without clicking into it. A flat dropdown at this level would be unusable.

**Range slider → Molecular weight, Compound count, Collection depth**
Continuous numeric data has no meaningful discrete categories. Drug-likeness rules (Lipinski: MW ≤ 500 Da) make round numbers meaningful anchors, so showing the current value as a live readout helps users apply known thresholds without mental arithmetic. The MW slider spans 0–2000 Da in browse mode; in search mode it pre-narrows to the range present in results.

Collection depth gets a permanently-visible annotation below the slider: "shallow (<200m) · mesopelagic (200–1000m) · deep (>1000m)." Ecologists and biogeographers think in these depth zones, not raw meter values.

**Dropdown → Compound class, Geographic region, Organism class**
These are categorical and bounded — there are roughly 10 compound classes and 15 defined ocean regions. Users typically want exactly one at a time. A dropdown communicates "pick one from a known list," which matches the mental model. Tag-based multi-select here would imply AND logic between classes, which is scientifically invalid — a compound belongs to one class, not a combination.

**Tag-based multi-select → Bioactivity, Target/assay type**
These are explicitly additive and multi-select. A compound can be both cytotoxic AND antifungal — that AND logic is the point. Tags make the cumulative hypothesis visible. A researcher literally sees "I am looking for compounds with these two activities" as selected tags. They also let users build their query incrementally, watching the result count drop with each addition.

The tag system distinguishes between activity tags (what a compound does: Cytotoxic, Antibacterial, Antifungal, Antiviral, Antioxidant, Antibiofilm, Antifouling) and method tags (how it was tested: In vitro, In vivo, IC₅₀, MIC, MTT assay, Brine shrimp). These two groups are surfaced in separate filter sections despite both using the tag pattern, because combining them into one tag pool would conflate activity with evidence — a meaningful scientific distinction.

---

## 4. Cross-Entity Queries

MaNaReD has three primary entity types — Compounds, Organisms, Regions — each as a first-class sidebar destination. This creates a structural problem: a researcher's actual question rarely respects entity boundaries.

"Cytotoxic compounds from Indo-Pacific sponges with MW under 500" spans:
- **Compounds** — the target entity (cytotoxic, MW ≤ 500)
- **Organisms** — the source constraint (sponges = Porifera)
- **Regions** — the geographic constraint (Indo-Pacific)

The chosen solution is to treat **global search as the escape hatch** for cross-entity intent, backed by a deterministic controlled-vocabulary matcher — not an LLM or natural language parser. When a user types "sponge," the matcher resolves it to known vocabulary entries and presents them as structured suggestions:

```
Organism class      Sponge (Porifera)        1,240 compounds  ▸
Organism            Sponge-associated bacteria  87 compounds   ▸
Compound class      Sponge-derived polyketides  340 compounds  ▸
```

This is the typeahead dropdown — structured by entity type, showing result counts, keyboard-navigable. It solves the disambiguation problem before the user commits to a query, and it reveals to non-specialist users that "sponge" has multiple valid scientific interpretations they may not have known existed.

No AI interpretation is involved. The controlled vocabulary approach is deterministic, auditable, and fails gracefully — an unrecognised term shows "No results for [term]" with a vocabulary suggestion ("Did you mean Halichondria?"), rather than a plausible-sounding hallucination. For a scientific tool where record provenance and verifiability are the core value proposition, this distinction is not cosmetic.

---

## 5. Filter State Persistence Across Entity Switches

When a user navigates from Compounds to Organisms while filters are active, only cross-entity-valid filters carry over. Compound-specific filters (MW, compound class) are not valid in an organism context and never transfer.

Cross-entity filters that do carry over: geographic region, bioactivity class, collection date.

The carried state is surfaced via a **contextual banner** (the recommended v1 approach) in the destination section:

> *Filters carried from Compounds: Indo-Pacific, Cytotoxic*
> [Keep filters] [Clear all]

Carried filter chips are visually distinct from filters set within the current section — amber-tinted chips rather than the standard blue — with italic, low-opacity gray provenance text beside them reading "from Compounds." This text is transient: it disappears automatically once the user touches any filter, since at that point the user has consciously engaged with the filter state and the provenance label is no longer needed.

This approach is transparent, recoverable, and educational — it teaches users that filters can span entities, which is a power feature once discovered, without imposing it on users who don't want cross-section filtering.

---

## 6. Post-Query Refinement Suggestions (PQRS)

PQRS pills appear between the search bar and the result list — in the results area, not the filter sidebar. This spatial distinction is deliberate: the filter sidebar is a persistent control surface; PQRS is a contextual shortcut derived from the specific result set and available only in search mode.

Each PQRS pill is a one-click application of a filter that the result set itself suggests. For a "halichondrin" query, the result set might suggest "Cytotoxic only" (because most halichondrin hits are cytotoxic), "MW 400–900" (because halichondrin compounds cluster in that range), and "Porifera" (because halichondrin is almost exclusively sponge-derived). Clicking a pill applies it to the filter sidebar and updates results — it is a shortcut into the filter panel, not a replacement for it.

PQRS primarily serves novice and intermediate users who may not know which filters are most meaningful for a given query. Expert users will typically ignore PQRS and go directly to the sidebar — which is fine. Both paths converge at the same chip bar and the same result set.

---

## 7. The Sort System

Sort options are contextual — the available axes differ per entity type, because different entities have different meaningful sort properties.

Sort is never shown in the filter sidebar. It lives in the active filter chip bar, right-aligned, visually separated from the filter chips which are left-aligned. This communicates a clear functional distinction: "these chips are what's filtering, this control is how results are ordered."

"Relevance" is never an explicit sort option. It is the implicit default the moment a search term is active. Showing it as a named option would imply it isn't the default, which would be a worse interaction than simply applying it silently and letting users override with property-based sorts.

"Recently Added" is a database-level sort (when records entered the system), distinct from property-level sorts (MW, Name, Bioactivity Strength). It sits first in every sort menu as the default in browse mode, where there is no query-derived relevance to sort by.

---

## 8. Empty States as Recovery Moments

Every empty state in MaNaReD is designed as a recovery moment, not a dead end. The filter sidebar, chip bar, and sort control remain fully interactive above any empty state — it replaces only the result list, never the whole screen.

Three meaningfully different trigger types require different messaging tone:

**Filter-caused emptiness (U1):** the user over-constrained their own query.
> "No compounds match all your filters."
> Primary action: "Remove 'Antiviral' — show 47 results" (computed, specific, one-click)
> Secondary: "or clear all filters"

**Query-caused emptiness (U2):** the controlled vocabulary didn't recognise the term.
> "No results for '[term]'."
> Offers a vocabulary suggestion and a "Browse all compounds" fallback.
> Distinct from U1 visually — different icon, different tone — because this is a system limitation, not a user error.

**Data-gap emptiness (U5, U10):** the database genuinely has no records for this combination.
> "No compounds recorded from this region yet."
> Framed as a coverage limitation, not a failure. Never implies the tool is broken.
> For curated-card-caused emptiness: "This collection is temporarily unavailable" — because the user didn't build this query themselves, the failure framing must not imply it was their mistake.

Tone discipline across all empty states is deliberate and non-negotiable. MaNaReD is built on real, incomplete scientific data. False confidence about completeness would undermine the trust of professional users who know the dataset has gaps.

---

## 9. Guided Entry Without Sacrificing Database Identity

The home screen offers curated entry cards — four pre-filtered query cards labelled in plain language:

- "Cytotoxic compounds from Pacific sponges — 47 results"
- "Conotoxin peptides — pain & neurology — 112 results"
- "Indo-Pacific biodiversity hotspot — 512 results"
- "Marine anti-inflammatory leads — 89 results"

These are live database queries, not tutorials. Clicking one lands the user in the relevant browse screen with those filters pre-applied and fully editable. The tool teaches by doing — it never pauses to explain itself before letting users access the data.

A three-step orientation strip (dismissable after first session) sits above the curated cards for first-time visitors: "1. Search or explore → 2. Filter results → 3. Open a compound." It is never a gate; it is always skippable; it disappears permanently after the first session.

Expert users bypass all of this. The global search bar is keyboard-autofocused on the home screen, so a returning researcher can type a compound name and reach a result in under two seconds without engaging the guided layer at all.

This dual-path design — guided cards for non-specialists, direct search for experts — is the mechanism by which MaNaReD serves two audiences from one interface without compromising either.
