# MaNaReD Component Registry

Figma file: `y12p7ety9bAbG9Z7m5Bd6L` — [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

| Component              | Tier        | Path                                 | Figma node | Status  | Notes                                            |
| ---------------------- | ----------- | ------------------------------------ | ---------- | ------- | ------------------------------------------------ |
| Colour foundations     | Foundations | `src/storybook/manared/foundations/` | `49:867`   | done    |                                                  |
| Spacing foundations    | Foundations | `src/storybook/manared/foundations/` | `81:470`   | done    |                                                  |
| Typography foundations | Foundations | `src/storybook/manared/foundations/` | `32:5`     | done    |                                                  |
| MaNaReDIcon            | Icons       | `icons/manared-icon.tsx`             | `93:1469`  | done    | Figma MCP SVG exports in `src/app/assets/icons/` |
| Chip                   | Primitives  | `primitives/chip.tsx`                | `332:9145` | done    | Wraps Astryx `Badge` + entity tokens             |
| ActiveChip             | Primitives  | `primitives/active-chip.tsx`         | `332:9082` | done    | `Badge` + remove control                         |
| FilterButton           | Primitives  | `primitives/filter-button.tsx`       | `332:9066` | done    | Wraps Astryx `Button`                            |
| EntityBadge            | Primitives  | `primitives/entity-badge.tsx`        | `332:9145` | done    | Same entity tokens as `Chip`                     |
| ListText               | Primitives  | `primitives/list-text.tsx`           | `332:9204` | done    | Bundled ID/title/label primitives                |
| DetailAtoms            | Primitives  | `primitives/detail-atoms.tsx`        | `332:9114` | done    | Bundled detail page atoms                        |
| SearchBar              | Composites  | `composites/search-bar.tsx`          | `332:9047` | done    | `TextInput` client island                        |
| NavSideBar             | Composites  | `composites/nav-side-bar.tsx`        | `236:1241` | partial | Custom nav items (SideNav not in npm exports)    |
| TopBar                 | Composites  | `composites/top-bar.tsx`             | `332:9045` | done    | Composes `SearchBar`                             |
| FilterRow              | Composites  | `composites/filter-row.tsx`          | `332:9070` | done    |                                                  |
| FilterSidebar          | Composites  | `composites/filter-sidebar.tsx`      | `332:9061` | done    | 280px width matches Figma                        |
| ChipBar                | Composites  | `composites/chip-bar.tsx`            | `332:9081` | done    | Composes `ActiveChip` + `SortWrapper`            |
| TaxonomyBreadcrumb     | Composites  | `composites/taxonomy-breadcrumb.tsx` | `332:9054` | done    |                                                  |
| SortWrapper            | Composites  | `composites/sort-wrapper.tsx`        | `332:9089` | done    | Wraps Astryx `Button`                            |
| CompoundCard           | Domain      | `domain/compound-card.tsx`           | `332:9090` | done    |                                                  |
| ListRow                | Domain      | `domain/list-row.tsx`                | `332:9201` | done    |                                                  |
| DetailSection          | Domain      | `domain/detail-section.tsx`          | `332:9114` | done    |                                                  |
| BrowseCompoundScreen   | Patterns    | `src/storybook/manared/patterns/`    | `332:9041` | done    | Docs-only                                        |
