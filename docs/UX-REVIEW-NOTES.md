# UX Document Review Notes

Cross-reference review performed when integrating [`doc_archive/`](../doc_archive/) content into [`UX-DECISIONS.md`](./UX-DECISIONS.md). Use this as an audit trail for discrepancies found and improvements applied.

**Review date:** 2026-07-05  
**Sources compared:** `doc_archive/key-decisions-source.md`, [`README.md`](../README.md), [`DESIGN.md`](../DESIGN.md), [`.cursor/rules/figma-design-system.mdc`](../.cursor/rules/figma-design-system.mdc), Figma UI Library (`31:80`), [`src/app/`](../src/app/)

---

## Source material status

| Expected | Found |
|----------|-------|
| `doc_archive/` folder with written UX content | **Not present in repo** at review time |
| Fallback source | Eight decision bullets in `README.md` — archived to [`doc_archive/key-decisions-source.md`](../doc_archive/key-decisions-source.md) |

**Action:** If longer-form drafts exist locally, add them to `doc_archive/` and reconcile sections with `UX-DECISIONS.md`.

---

## Discrepancies found and resolution

### 1. Entity count: three nav entities vs four Figma entity colours

| Source | States |
|--------|--------|
| README / UX decisions | Three browse entities: **Compounds, Organisms, Regions** |
| DESIGN.md / Figma tokens | Four entity colour groups: `compound`, `organism`, `region`, **`bioactivity`** |

**Resolution:** Documented in [`UX-DECISIONS.md` §5](./UX-DECISIONS.md) — bioactivity is a **filter dimension** (tag multi-select), not a fourth top-level entity. The Figma `entity.bioactivity` token applies to bioactivity badges/tags.

### 2. UX decisions only in README bullets

| Source | States |
|--------|--------|
| README | Eight one-line bullets with no interaction detail |
| DESIGN.md | Visual/system only — no interaction rationale |

**Resolution:** Created canonical [`UX-DECISIONS.md`](./UX-DECISIONS.md). README trimmed to index bullets linking to full doc.

### 3. DESIGN.md claims "No Storybook"

| Source | States |
|--------|--------|
| DESIGN.md L127, figma-design-system.mdc L147 | "No Storybook — use Astryx CLI" |
| Repo reality | Storybook configured (`.storybook/`, `package.json` scripts, app + Astryx stories) |

**Resolution:** Updated DESIGN.md and figma-design-system.mdc to reflect Storybook usage.

### 4. DESIGN.md claims "No public/ folder yet"

| Source | States |
|--------|--------|
| DESIGN.md L177 | "No `public/` folder yet" |
| Repo reality | `public/favicon.svg` exists |

**Resolution:** Updated DESIGN.md and figma-design-system.mdc asset table.

### 5. Figma screen frames vs documented interactions

| Source | States |
|--------|--------|
| UX decisions | Entity nav, filter sidebar, PQRS, home cards, empty states |
| Figma (`31:80`) | UI Library: tokens + icons only — **no screen frames** |

**Resolution:** Marked "Figma status: TBD" on each screen-dependent section in `UX-DECISIONS.md`. No design claims presented as finalized visuals.

### 6. Prototype code vs documented UX

| UX area | Code state |
|---------|------------|
| Entity nav, search, filters, PQRS, home cards | **Not implemented** — single `/` Astryx demo page |
| Design tokens | Neutral Astryx theme; MaNaReD brand tokens documented but not fully applied |

**Resolution:** Added [`UX-DECISIONS.md` §11](./UX-DECISIONS.md) implementation mapping table and recommended build order. Expected for pre-prototype documentation phase.

### 7. figma-design-system.mdc favicon claim

| Source | States |
|--------|--------|
| figma-design-system.mdc L217 | "favicon referenced but missing" |
| Repo reality | `public/favicon.svg` present |

**Resolution:** Updated asset table in figma-design-system.mdc.

---

## Improvements applied to source content

The following gaps in the original bullets were filled in `UX-DECISIONS.md`:

| Gap | Addition |
|-----|----------|
| No state model | Unified query state diagram + field table (§2) |
| No mode definition | Browse vs search derived mode table (§4) |
| PQRS vs filters unclear | Explicit boundary table (§5) |
| No defaults | Default entity, sidebar, sort, URL behavior (§3) |
| No persistence rules | Cross-entity carry matrix + provenance signaling (§7) |
| No accessibility | Focus management, aria-live for reorder, empty-state focus (§4, §8) |
| No responsive spec | Sidebar collapse tied to Figma icon; mobile TBD (§10) |
| No loading/error | Skeleton, retry, partial-data handling (§10) |
| No implementation path | Build order + RSC/client-island note (§11) |
| No open questions | Six tracked TBD items (§12) |

---

## Terminology consistency check

| Term | Consistent across docs? |
|------|------------------------|
| Entity-first dual-nav | Yes |
| PQRS | Yes — expanded to "Post-query refinement suggestions" on first use |
| Controlled-vocabulary search | Yes |
| Browse vs search mode | Yes — now explicitly defined as derived, not toggled |
| Compounds / Organisms / Regions | Yes |
| Filter pattern by data shape | Yes — expanded with example fields table |

---

## Recommendations for next pass

1. **Add Figma screen frames** for shell, filter sidebar, PQRS band, home, and empty states — link node IDs in `UX-DECISIONS.md`.
2. **Commit full `doc_archive` drafts** if longer research/competitive-analysis documents exist locally.
3. **Resolve open questions** in `UX-DECISIONS.md` §12 before implementing results sort and mobile nav.
4. **Create MaNaReD Astryx theme** per DESIGN.md bridging strategy when moving from documentation to visual prototype.
