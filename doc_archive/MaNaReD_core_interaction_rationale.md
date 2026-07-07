# Core Interaction Rationale
## MaNaReD — Marine Natural Products Database

---

Researchers using scientific databases do not browse in the way a general user browses an e-commerce site or a content platform. They arrive with a hypothesis already formed. Their interaction with the tool is a sequence of constraints applied to a large dataset until a defensible, citable answer emerges. The entire search and filter system in MaNaReD is designed around this behavioral reality, not around the conventions of general-purpose search interfaces.

---

## The Unified Query State

Most search interfaces treat search and filtering as parallel but separate features — a search bar that returns results, and a filter panel that narrows them. In MaNaReD, search and filtering are two input modes into a single shared query state. A typed query and a selected taxonomy filter produce the same kind of output: a constrained result set. Both are represented the same way — as removable, inspectable chips in a persistent bar above the results.

A researcher who has typed "halichondrin" and also filtered by Pacific Ocean and Cytotoxic can see exactly what is shaping their results, remove any single constraint without losing the others, and understand at a glance whether their query is over- or under-constrained. The result count that updates in real time beneath the chip bar is not a decorative element. It is the primary spatial orientation cue researchers use to gauge whether their hypothesis is viable before they invest time reading individual records.

---

## Browse Mode vs Search Mode

The transition between browse mode and search mode is treated as a meaningful shift in user intent, not just a visual state change.

**In browse mode,** the user is narrowing from everything. Taxonomy leads the filter sidebar, the molecular weight slider spans the full dataset range, and the default sort is recency.

**In search mode,** the query itself already carries taxonomic and bioactivity intent, so the filter sidebar reorders to surface the refinement axes that are actually useful post-query. Bioactivity and molecular weight move up; taxonomy collapses. The MW slider auto-narrows to the range present in the current result set so users do not have to guess meaningful thresholds.

Post-query refinement suggestions — derived from the actual hit set, not from pre-written heuristics — appear above the results as lightweight, one-click shortcuts into the filter panel. Relevance becomes the implicit default sort the moment a query is active, without being named as such, because naming it would imply it was not already the default.

All of these behaviors are non-destructive. Clearing a search term falls back to browse mode with all filter state intact. Navigating between entity sections carries only the filters that are valid in the destination context.

---

## Filter Pattern Assignment

Filter patterns are assigned by data shape rather than by interface convention.

**Taxonomy — progressive tree filter**
The taxonomic hierarchy is a genuine tree. Researchers navigate it incrementally — they know they want Chordata before they know they want Elasmobranchii — and they need result counts at each node to decide whether the next level of specificity is worth exploring.

**Molecular weight — range slider**
Molecular weight is a continuous numeric property with well-established meaningful thresholds. The Lipinski rule of five places drug-like compounds at MW ≤ 500 Da. A slider communicates that both ends of the range are adjustable in ways a dropdown cannot.

**Compound class — dropdown**
Compound class is categorical and mutually exclusive. A compound belongs to one biosynthetic class, not a combination. Multi-select would misrepresent the data.

**Bioactivity — tag-based multi-select**
The AND logic between activities is the actual research question. A pharmaceutical screener looking for compounds that are both cytotoxic and antifungal needs to specify both conditions simultaneously and see them held together as a visible, removable pair.

Using the wrong pattern for any of these is not merely an aesthetic mismatch. It actively misrepresents the structure of the underlying data to the user.

---

## Cross-Entity Queries and the Search Layer

Search uses a deterministic controlled-vocabulary matcher rather than natural language interpretation or large language model inference. When a user types "sponge," the system resolves it against a known vocabulary and surfaces structured options before the user commits to a query direction:

| Match | Entity type | Result count |
|---|---|---|
| Sponge (Porifera) | Organism class | 1,240 compounds |
| Sponge-associated bacteria | Organism | 87 compounds |
| Sponge-derived polyketides | Compound class | 340 compounds |

This typeahead disambiguation solves the cross-entity query problem: a single colloquial term maps to multiple scientifically distinct entities across the database's three entity types (Compounds, Organisms, Regions), and the user needs to choose which interpretation matches their intent before the result set is constructed.

The deterministic approach fails gracefully and transparently. An unrecognised term returns an explicit "no match" with a vocabulary suggestion, rather than a plausible-sounding result that cannot be independently verified. For a tool whose entire value proposition rests on the trustworthiness and traceability of its records, this is not a technical preference between implementation options. It is a fundamental design value: the tool should never present a result it cannot account for.

---

## Guided Entry Without Sacrificing Database Identity

The guided entry layer — curated pre-filtered query cards on the home screen, contextual jargon tooltips throughout the interface, and meaningful empty states that offer specific recovery paths — exists to lower the barrier for non-specialist users without diluting the tool's identity as a serious research database.

Every element of this guided layer points back into the data.

- The curated cards are live database queries, not tutorial steps
- The tooltips explain data fields in context, not in a separate help section
- The empty states name the specific constraint causing zero results and offer a one-click removal with a preview count, rather than a generic "no results found" message

The tool teaches by doing. It never pauses to explain itself before letting users access the data, and it never asks a user to complete an onboarding step before reaching a result.

The guided layer and the expert layer coexist in the same interface because they operate at different levels of engagement. The global search bar is keyboard-autofocused on the home screen so a returning researcher can reach a result in under two seconds without the guided layer ever being in their way.

---

## Empty States as Trust Signals

Three meaningfully different trigger types require different messaging tone — because the same "no results" visual with generic copy would conflate three genuinely different situations, each requiring a different recovery path and a different attribution of responsibility.

**Filter-caused emptiness**
The user over-constrained their own query. The recovery action is specific and quantified: "Remove 'Antiviral' — show 47 results." The user is told exactly what to do and exactly what they will get.

**Query-caused emptiness**
The controlled vocabulary did not recognise the term. This is a system limitation, not a user error. The response offers a vocabulary suggestion and a "Browse all compounds" fallback — never framing the situation as something the user did wrong.

**Data-gap emptiness**
The database genuinely has no records for this combination. This is framed explicitly as a coverage limitation: "No compounds recorded from this region yet." It never implies the tool is broken. For curated-card-caused emptiness, where the user did not build the query themselves, the framing shifts further: "This collection is temporarily unavailable" — because the user cannot be asked to adjust a query they did not author.

Tone discipline across all empty states is non-negotiable. MaNaReD is built on real, incomplete scientific data. False confidence about completeness would undermine the trust of professional users who know the dataset has gaps — and that trust, once lost in a scientific tool, is not recovered.
