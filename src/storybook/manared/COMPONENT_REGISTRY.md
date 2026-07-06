# MaNaReD Component Registry

Figma file: `y12p7ety9bAbG9Z7m5Bd6L` — [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

| Component              | Tier        | Path                                 | Figma node | Status  | Token deps                             | Notes                                                    |
| ---------------------- | ----------- | ------------------------------------ | ---------- | ------- | -------------------------------------- | -------------------------------------------------------- |
| Colour foundations     | Foundations | `src/storybook/manared/foundations/` | `49:867`   | done    | `manaredColourMap.ts`                  |                                                          |
| Spacing foundations    | Foundations | `src/storybook/manared/foundations/` | `81:470`   | done    | Astryx spacing vars                    |                                                          |
| Typography foundations | Foundations | `src/storybook/manared/foundations/` | `32:5`     | done    | `manaredTheme.ts` font sizes           |                                                          |
| MaNaReDIcon            | Icons       | `icons/manared-icon.tsx`             | `93:1469`  | done    | —                                      | 21 symbols; stroke 1.6px @ 16px scales with size         |
| Chip                   | Primitives  | `primitives/chip.tsx`                | `332:9145` | done    | `entity-styles.ts`                     | Pill span; 12px label; space.1/2 padding                 |
| ActiveChip             | Primitives  | `primitives/active-chip.tsx`         | `332:9082` | done    | `interactive-styles.ts`                | Flat span; shape.lg; 8px remove; chip interactive tokens |
| FilterButton           | Primitives  | `primitives/filter-button.tsx`       | `332:9066` | done    | Astryx `Button` + theme override       | Wraps Astryx `Button`                                    |
| EntityBadge            | Primitives  | `primitives/entity-badge.tsx`        | `332:9145` | done    | `entity-styles.ts`                     | rounded-md entity badge; shared tag tokens               |
| ListText               | Primitives  | `primitives/list-text.tsx`           | `332:9204` | done    | `text-primary`, `text-secondary`       | Bundled ID/title/label primitives                        |
| DetailAtoms            | Primitives  | `primitives/detail-atoms.tsx`        | `332:9114` | done    | semantic text tokens                   | Bundled detail page atoms                                |
| SearchBar              | Composites  | `composites/search-bar.tsx`          | `332:9047` | done    | `surface-styles.ts` (partial)          | `TextInput` client island                                |
| NavSideBar             | Composites  | `composites/nav-side-bar.tsx`        | `236:1241` | partial | `bg-sidebar`, nav interactive          | Custom nav items (SideNav not in npm exports)            |
| TopBar                 | Composites  | `composites/top-bar.tsx`             | `332:9045` | done    | `surface-styles.ts` (partial)          | Composes `SearchBar`                                     |
| FilterRow              | Composites  | `composites/filter-row.tsx`          | `332:9070` | done    | semantic text tokens                   |                                                          |
| FilterSidebar          | Composites  | `composites/filter-sidebar.tsx`      | `332:9061` | done    | `surface-styles.ts` (partial)          | 280px width matches Figma                                |
| ChipBar                | Composites  | `composites/chip-bar.tsx`            | `332:9081` | done    | `surface-styles`, `interactive-styles` | Composes `ActiveChip` + `SortWrapper`; colour play tests |
| TaxonomyBreadcrumb     | Composites  | `composites/taxonomy-breadcrumb.tsx` | `332:9054` | done    | semantic text tokens                   |                                                          |
| SortWrapper            | Composites  | `composites/sort-wrapper.tsx`        | `332:9089` | done    | `interactive-styles` + theme btn       | Wraps Astryx `Button`; colour play tests                 |
| CompoundCard           | Domain      | `domain/compound-card.tsx`           | `332:9090` | done    | `surface-styles`, entity tokens        |                                                          |
| ListRow                | Domain      | `domain/list-row.tsx`                | `332:9201` | done    | `surface-styles.ts` (partial)          |                                                          |
| DetailSection          | Domain      | `domain/detail-section.tsx`          | `332:9114` | done    | semantic text tokens                   |                                                          |
| BrowseCompoundScreen   | Patterns    | `src/storybook/manared/patterns/`    | `332:9041` | done    | composes above                         | Docs-only                                                |

## New component checklist

1. Add or reuse constants in `surface-styles.ts`, `interactive-styles.ts`, or `entity-styles.ts`.
2. Register the component here with **Token deps** filled in.
3. Add Storybook colour assertions via `src/storybook/manared/shared/assert-token-colours.ts` when Figma specifies semantic colours.
4. Run `vp run validate:theme` and `vp test`.
