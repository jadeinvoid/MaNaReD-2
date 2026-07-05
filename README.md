# MaNaReD — Marine Natural Products Database

A portfolio UX project exploring the design of a specialized scientific data tool for marine natural products research, inspired by [CMNPD](https://www.cmnpd.org/) (the Chinese Marine Natural Products Database).

The project covers the full UX process from domain research and competitive analysis through information architecture, interaction design, component design, and design system development. The primary focus is the **search and filter interaction system**, which serves both professional researchers (marine biologists, pharmacologists, ecologists, cheminformaticians) and general public users from a single interface without compromising either audience.

This repository contains an interactive prototype built on RedwoodSDK, Astryx, and Tailwind. Design tokens and component specs live in Figma; implementation notes are in [`DESIGN.md`](./DESIGN.md).

---

## Key design decisions

- **Entity-first dual-nav architecture** — Compounds, Organisms, and Regions as co-equal browse destinations, with a unified query state shared between global search and the filter sidebar
- **Deterministic controlled-vocabulary search** — not AI or natural language interpretation, preserving the verifiability that distinguishes a scientific database from a language model
- **Filter pattern assignment by data shape** — progressive filter for taxonomy trees, range sliders for continuous numeric properties, dropdowns for bounded categorical data, tag-based multi-select for additive bioactivity queries
- **Post-query refinement suggestions (PQRS)** — derived from the live result set, surfaced between the search bar and results rather than inside the filter panel
- **Contextual filter behavior in browse vs search mode** — including sidebar reordering, MW range auto-narrowing, and implicit relevance sorting on query entry
- **Filter state persistence across entity switches** — with explicit provenance signaling for carried filters
- **Empty state system** — distinguishing filter-caused, query-caused, and data-gap emptiness with distinct recovery paths and tone per trigger type
- **Guided entry via curated pre-filtered query cards** — on the home screen, designed as live database queries rather than onboarding steps

---

## Design system

- **Typefaces:** Inter and Geist Mono
- **Color tokens:** role-based structure (Surface, Text, Border, Semantic/Status, Entity Type, Interactive)
- **Layout:** 8px base grid
- **Components:** variant and property-driven library in Figma

**Figma source of truth:** [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

See [`DESIGN.md`](./DESIGN.md) for token mapping, component inventory, and Figma → code conventions.

---

## Tools

| Tool              | Role                                                            |
| ----------------- | --------------------------------------------------------------- |
| Figma             | Component library, wireframes, design tokens as Figma variables |
| RedwoodSDK        | React Server Components on Cloudflare Workers                   |
| Astryx + Tailwind | UI components and layout                                        |
| Vite+ (`vp`)      | Install, dev, build, lint, typecheck, test                      |

---

## Development

```bash
git clone <this-repo-url>
cd MaNaReD-2
vp install
vp dev
```

Deploy the prototype:

```bash
vp run release
```

| Command          | What it does                  |
| ---------------- | ----------------------------- |
| `vp install`     | Install dependencies          |
| `vp dev`         | Start the dev server          |
| `vp build`       | Production build              |
| `vp check`       | Format, lint, and typecheck   |
| `vp test`        | Run tests                     |
| `vp run release` | Build and deploy via Wrangler |

### Project layout

```
src/
  worker.tsx      # Cloudflare Worker entry
  client.tsx      # Client hydration
  app/
    pages/        # Routes / screens
    document.tsx  # HTML document shell
    providers.tsx # Theme (Astryx)
    styles.css    # Astryx + Tailwind + tokens
```

Agents and contributors should read [`AGENTS.md`](./AGENTS.md) for stack conventions and the Astryx workflow.
