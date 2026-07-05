# MaNaReD — Marine Natural Products Database

A portfolio UX project exploring the design of a specialized scientific data tool for marine natural products research, inspired by [CMNPD](https://www.cmnpd.org/) (the Chinese Marine Natural Products Database).

The project covers the full UX process from domain research and competitive analysis through information architecture, interaction design, component design, and design system development. The primary focus is the **search and filter interaction system**, which serves both professional researchers (marine biologists, pharmacologists, ecologists, cheminformaticians) and general public users from a single interface without compromising either audience.

This repository contains an interactive prototype built on RedwoodSDK, Astryx, and Tailwind. Design tokens and component specs live in Figma; implementation notes are in [`DESIGN.md`](./DESIGN.md). Interaction rationale and UX decisions are in [`docs/UX-DECISIONS.md`](./docs/UX-DECISIONS.md).

---

## Key design decisions

Full rationale, interaction specs, and state diagrams: [`docs/UX-DECISIONS.md`](./docs/UX-DECISIONS.md)

- **Entity-first dual-nav architecture** — [§2](docs/UX-DECISIONS.md#2-information-architecture)
- **Deterministic controlled-vocabulary search** — [§3](docs/UX-DECISIONS.md#3-search-and-query-model)
- **Filter pattern assignment by data shape** — [§5](docs/UX-DECISIONS.md#5-filter-system)
- **Post-query refinement suggestions (PQRS)** — [§6](docs/UX-DECISIONS.md#6-post-query-refinement-suggestions-pqrs)
- **Contextual filter behavior in browse vs search mode** — [§4](docs/UX-DECISIONS.md#4-browse-vs-search-mode)
- **Filter state persistence across entity switches** — [§7](docs/UX-DECISIONS.md#7-state-and-persistence)
- **Empty state system** — [§8](docs/UX-DECISIONS.md#8-empty-states)
- **Guided entry via curated pre-filtered query cards** — [§9](docs/UX-DECISIONS.md#9-home-entry--curated-query-cards)

---

## Design system

- **Typefaces:** Inter and Geist Mono
- **Color tokens:** role-based structure (Surface, Text, Border, Semantic/Status, Entity Type, Interactive)
- **Layout:** 8px base grid
- **Components:** variant and property-driven library in Figma

**Figma source of truth:** [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80)

See [`DESIGN.md`](./DESIGN.md) for token mapping, component inventory, and Figma → code conventions. Source decision archive: [`doc_archive/`](./doc_archive/).

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
