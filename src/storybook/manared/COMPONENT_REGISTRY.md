# MaNaReD Component Registry

Figma file: `y12p7ety9bAbG9Z7m5Bd6L` — [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

| Component              | Tier        | Figma node | Status | Astryx base            | Depends on              |
| ---------------------- | ----------- | ---------- | ------ | ---------------------- | ----------------------- |
| Colour foundations     | Foundations | `49:867`   | done   | TokenGrid              | —                       |
| Spacing foundations    | Foundations | `81:470`   | done   | TokenGrid              | —                       |
| Typography foundations | Foundations | `32:5`     | done   | Text / Heading         | —                       |
| MaNaReDIcon            | Icons       | `93:1469`  | done   | —                      | —                       |
| Chip                   | Primitives  | `332:9145` | done   | Badge (custom styles)  | Tokens                  |
| ActiveChip             | Primitives  | `332:9082` | done   | Badge + icon           | MaNaReDIcon             |
| FilterButton           | Primitives  | `332:9066` | done   | Button                 | —                       |
| EntityBadge            | Primitives  | `49:867`   | done   | Tailwind + entity vars | Tokens                  |
| ListId                 | Primitives  | `332:9204` | done   | Text                   | —                       |
| ListTitle              | Primitives  | `332:9205` | done   | Text                   | —                       |
| ListLabel              | Primitives  | `332:9209` | done   | Text                   | —                       |
| DetailTaxonomyItem     | Primitives  | `332:9055` | done   | Text                   | —                       |
| DetailIdentityId       | Primitives  | `332:9119` | done   | Text                   | —                       |
| DetailIdentityName     | Primitives  | `332:9120` | done   | Heading                | —                       |
| DetailSubcategoryTitle | Primitives  | `332:9125` | done   | Text                   | —                       |
| DetailCount            | Primitives  | `332:9129` | done   | Text                   | —                       |
| DetailCategoryDivider  | Primitives  | `332:9115` | done   | Divider                | —                       |
| DetailPicture          | Primitives  | `332:9117` | done   | Card / div             | —                       |
| SearchBar              | Composites  | `332:9047` | done   | TextInput              | MaNaReDIcon             |
| NavSideBar             | Composites  | `236:1241` | done   | SideNavItem            | MaNaReDIcon             |
| TopBar                 | Composites  | `332:9045` | done   | HStack                 | SearchBar, MaNaReDIcon  |
| FilterRow              | Composites  | `332:9070` | done   | HStack                 | MaNaReDIcon             |
| FilterSidebar          | Composites  | `332:9061` | done   | VStack                 | FilterButton, FilterRow |
| ChipBar                | Composites  | `332:9081` | done   | HStack                 | ActiveChip              |
| TaxonomyBreadcrumb     | Composites  | `332:9054` | done   | HStack                 | DetailTaxonomyItem      |
| SortWrapper            | Composites  | `332:9089` | done   | Button                 | MaNaReDIcon             |
| CompoundCard           | Domain      | `332:9090` | done   | Card                   | Chip, EntityBadge       |
| ListRow                | Domain      | `332:9201` | done   | HStack                 | ListId, ListTitle, Chip |
| DetailSection          | Domain      | `332:9114` | done   | VStack                 | Detail primitives       |
| BrowseCompoundScreen   | Patterns    | `332:9041` | done   | —                      | Composites + Domain     |
