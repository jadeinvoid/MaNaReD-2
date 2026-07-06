# MaNaReD Component Registry

Figma file: `y12p7ety9bAbG9Z7m5Bd6L` — [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

| Component              | Tier        | Path                                 | Figma node | Status | Token deps                                                 | Notes                                                             |
| ---------------------- | ----------- | ------------------------------------ | ---------- | ------ | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Colour foundations     | Foundations | `src/storybook/manared/foundations/` | `49:867`   | done   | `manaredColourMap.ts`                                      |                                                                   |
| Spacing foundations    | Foundations | `src/storybook/manared/foundations/` | `81:470`   | done   | Astryx spacing vars                                        |                                                                   |
| Typography foundations | Foundations | `src/storybook/manared/foundations/` | `32:5`     | done   | `manaredTheme.ts` font sizes                               |                                                                   |
| MaNaReDIcon            | Icons       | `icons/manared-icon.tsx`             | `93:1469`  | done   | —                                                          | 21 symbols; stroke 1.6px @ 16px scales with size                  |
| Chip                   | Primitives  | `primitives/chip.tsx`                | `332:9145` | done   | `entity-styles.ts`                                         | Pill span; 12px label; space.1/2 padding                          |
| ActiveChip             | Primitives  | `primitives/active-chip.tsx`         | `332:9082` | done   | `interactive-styles.ts`                                    | Flat span; shape.lg; 8px remove; chip interactive tokens          |
| FilterButton           | Primitives  | `primitives/filter-button.tsx`       | `332:9066` | done   | `interactive-styles` filter tokens                         | light/dark play tests                                             |
| EntityBadge            | Primitives  | `primitives/entity-badge.tsx`        | `332:9145` | done   | `entity-styles.ts`                                         | rounded-md entity badge; shared tag tokens                        |
| ListText               | Primitives  | `primitives/list-text.tsx`           | `352:4035` | done   | `list-text-styles`                                         | Flat token spans; light/dark play tests                           |
| DetailAtoms            | Primitives  | `primitives/detail-atoms.tsx`        | `332:9114` | done   | semantic text tokens                                       | Bundled detail page atoms                                         |
| SearchBar              | Composites  | `composites/search-bar.tsx`          | `332:9047` | done   | `surface-styles.ts` (partial)                              | `TextInput` client island                                         |
| NavSideBar             | Composites  | `composites/nav-side-bar.tsx`        | `339:3237` | done   | `gradient-styles`                                          | Layered sidebar gradient; light/dark play tests                   |
| TopBar                 | Composites  | `composites/top-bar.tsx`             | `332:9045` | done   | `surface-styles.ts` (partial)                              | Composes `SearchBar`                                              |
| FilterRow              | Composites  | `composites/filter-row.tsx`          | `332:9070` | done   | semantic text tokens                                       |                                                                   |
| FilterSidebar          | Composites  | `composites/filter-sidebar.tsx`      | `349:4572` | done   | `gradient-styles`                                          | Filter list region gradient; light/dark play tests                |
| ChipBar                | Composites  | `composites/chip-bar.tsx`            | `349:3993` | done   | `gradient-styles`, `interactive-styles`                    | Gradient band + token controls; light/dark play tests             |
| ContextualBar          | Composites  | `composites/contextual-bar.tsx`      | `360:2601` | done   | `gradient-styles`                                          | Taxonomy header band gradient; light/dark play tests              |
| TaxonomyBreadcrumb     | Composites  | `composites/taxonomy-breadcrumb.tsx` | `332:9054` | done   | semantic text tokens                                       |                                                                   |
| SortWrapper            | Composites  | `composites/sort-wrapper.tsx`        | `332:9089` | done   | `interactive-styles`                                       | Token-backed control; light/dark play tests                       |
| CompoundCard           | Domain      | `domain/compound-card.tsx`           | `367:3752` | done   | `surface-styles`, `card-text-styles`, `interactive-styles` | Full card + metadata grid + footer actions; light/dark play tests |
| ListRow                | Domain      | `domain/list-row.tsx`                | `367:3752` | done   | `surface-styles`, `list-text-styles`                       | Figma list frame; light/dark play tests                           |
| DetailSection          | Domain      | `domain/detail-section.tsx`          | `332:9114` | done   | semantic text tokens                                       |                                                                   |
| BrowseCompoundScreen   | Patterns    | `src/storybook/manared/patterns/`    | `332:9041` | done   | composes above                                             | Docs-only                                                         |

## New component checklist

1. Add or reuse constants in `surface-styles.ts`, `interactive-styles.ts`, `gradient-styles.ts`, `list-text-styles.ts`, or `entity-styles.ts`.
2. Register the component here with **Token deps** filled in.
3. Add Storybook colour assertions via `src/storybook/manared/shared/assert-token-colours.ts` when Figma specifies semantic colours.
4. Run `vp run validate:theme` and `vp test`.
