# MaNaReD Design System

Design reference for implementing MaNaReD UI in this repo. For Figma MCP workflow and code mapping rules, see [`.cursor/rules/figma-design-system.mdc`](.cursor/rules/figma-design-system.mdc) and the [`figma-to-prototype`](.cursor/skills/figma-to-prototype/SKILL.md) skill.

**Figma source of truth:** [MaNaReD UI Library](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80) (file key `y12p7ety9bAbG9Z7m5Bd6L`, page node `31:80`)

---

## Overview

MaNaReD is a domain-specific design system documented in Figma. This codebase implements it using:

- **Astryx** (`@astryxdesign/core`) for UI components
- **Tailwind CSS v4** for layout and token-backed utilities
- **RedwoodSDK RSC** on Cloudflare Workers for pages

The app currently ships with Astryx's **neutral** theme as a starting point. MaNaReD brand tokens from Figma should be mapped to Astryx utilities during prototyping, then baked into a custom theme for production fidelity.

---

## 1. Token definitions

### Where tokens live in code

| Layer                | Location                                | Role                                                               |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Theme CSS            | `@astryxdesign/theme-neutral/theme.css` | CSS custom properties (`--color-*`, `--spacing-*`, `--radius-*`)   |
| Tailwind bridge      | `@astryxdesign/core/tailwind-theme.css` | Maps vars → utilities (`bg-surface`, `text-primary`, `rounded-lg`) |
| Import orchestration | `src/app/styles.css`                    | Layer order so Tailwind utilities beat Astryx component styles     |
| Runtime theme        | `src/app/providers.tsx`                 | `<Theme theme={neutralTheme}>` for SSR                             |
| HTML marker          | `src/app/document.tsx`                  | `data-astryx-theme="neutral"` on `<html>`                          |

```css
/* src/app/styles.css */
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
```

There is **no `tailwind.config.*`**. Tailwind v4 is configured entirely via CSS imports and the `@tailwindcss/vite` plugin in `vite.config.ts`.

Discover Astryx token values:

```bash
vp run astryx -- docs tokens
vp run astryx -- docs theme
```

### MaNaReD Figma tokens

Figma token names follow `MaNaReD.{category}.{name}`. Key sections on the UI Library page:

| Category | Figma node      | Examples                                                     |
| -------- | --------------- | ------------------------------------------------------------ |
| Font     | `32:5`          | Inter (display/content), Geist Mono (code), sizes 3xs–3xl    |
| Colour   | `49:867`        | BG, text, border, status, entity, interactive (light + dark) |
| Space    | `81:470`        | 1=4px through 12=48px                                        |
| Shape    | in font section | none/sm/md/lg → 0/4/8/12px radius                            |
| Icons    | `93:1469`       | Custom symbols at 16/24/32px                                 |

### Figma → code colour mapping (light mode)

| MaNaReD token                       | Value     | Use in code                  |
| ----------------------------------- | --------- | ---------------------------- |
| `MaNaReD.colour.BG.page`            | `#E9F1F9` | `bg-body`                    |
| `MaNaReD.colour.BG.card`            | `#FFFFFF` | `bg-surface`                 |
| `MaNaReD.colour.BG.sideBar`         | `#F6FAFF` | custom CSS var               |
| `MaNaReD.colour.text.primary`       | `#2A2A2A` | `text-primary`               |
| `MaNaReD.colour.text.secondary`     | `#584F82` | `text-secondary`             |
| `MaNaReD.colour.text.tertiary`      | `#617990` | custom CSS var               |
| `MaNaReD.colour.status.success`     | `#6C8656` | `bg-success`                 |
| `MaNaReD.colour.status.danger`      | `#8E5963` | `bg-error`                   |
| `MaNaReD.colour.interactive.button` | `#222133` | `<Button variant="primary">` |

### MaNaReD-only tokens

These have no Astryx neutral equivalent — define custom CSS variables when needed:

- **Entity colours:** `MaNaReD.colour.entity.{organism,bioactivity,compound,region}` (BG / border / text triplets for domain badges)
- **Interactive states:** button, chip, navItem, dropDown (active / hover / focus)

### Spacing scale

| MaNaReD token      | px  | Code             |
| ------------------ | --- | ---------------- |
| `MaNaReD.space.1`  | 4   | `gap={1}`, `p-1` |
| `MaNaReD.space.2`  | 8   | `gap={2}`, `p-2` |
| `MaNaReD.space.4`  | 16  | `gap={4}`, `p-4` |
| `MaNaReD.space.6`  | 24  | `gap={6}`, `p-6` |
| `MaNaReD.space.8`  | 32  | `gap={8}`, `p-8` |
| `MaNaReD.space.10` | 40  | `gap={10}`       |
| `MaNaReD.space.12` | 48  | `gap={12}`       |

Prefer `VStack gap={n}` / `HStack gap={n}` over arbitrary pixel values.

### Typography

| MaNaReD font token              | Value       |
| ------------------------------- | ----------- |
| `MaNaReD.font.family.display`   | Inter       |
| `MaNaReD.font.family.content`   | Inter       |
| `MaNaReD.font.family.code`      | Geist Mono  |
| `MaNaReD.font.size.3xs` … `3xl` | 12px … 72px |

Map to Astryx semantic components — do not hard-code px:

```tsx
<Heading level={1}>Page title</Heading>
<Text type="body" color="secondary">Supporting copy</Text>
```

### Bridging strategy

1. **Prototype:** Map Figma tokens to closest Astryx utility; escape hatch with `bg-[var(--color-*)]`.
2. **Brand fidelity:** Build a MaNaReD Astryx theme (`vp run astryx -- theme`), swap `neutralTheme` in `providers.tsx`, load Inter + Geist Mono in `document.tsx`.

---

## 2. Component library

### Architecture

- **External library:** `@astryxdesign/core` (148 components) — not copied into the repo
- **Pages:** `src/app/pages/` — Server Components by default
- **Client islands:** colocated `"use client"` files for forms and local state
- **No Storybook** — use Astryx CLI for props and examples

```tsx
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
```

Discover components before building custom UI:

```bash
vp run astryx -- build "<screen description>"
vp run astryx -- component Button
vp run astryx -- search "filter panel"
```

### Figma → Astryx component map

| Design element  | Astryx component                                |
| --------------- | ----------------------------------------------- |
| Button          | `Button` (`variant="primary"` \| `"secondary"`) |
| Card / panel    | `Card`                                          |
| Text input      | `TextInput` (client island)                     |
| Badge / tag     | `Badge`                                         |
| Section layout  | `VStack` / `HStack`                             |
| Separator       | `Divider`                                       |
| Headings / body | `Heading` / `Text`                              |

Reference implementation: `src/app/pages/home.tsx` + `home-form.tsx`.

---

## 3. Frameworks and libraries

| Layer     | Choice                             | Entry point                        |
| --------- | ---------------------------------- | ---------------------------------- |
| Framework | React 19 + RedwoodSDK RSC          | `src/worker.tsx`, `src/client.tsx` |
| UI        | Astryx `@astryxdesign/core` ^0.1.2 | `src/app/providers.tsx`            |
| Styling   | Tailwind CSS v4                    | `src/app/styles.css`               |
| Build     | Vite+ (`vp`)                       | `vite.config.ts`                   |
| Deploy    | Cloudflare Workers                 | `wrangler.jsonc`, `vp run release` |
| Paths     | `@/*` → `./src/*`                  | `tsconfig.json`                    |

---

## 4. Asset management

| Aspect       | Current state                                           | Guidance                                              |
| ------------ | ------------------------------------------------------- | ----------------------------------------------------- |
| Static files | No `public/` folder yet                                 | Add when committing production assets                 |
| Stylesheets  | `import styles from "@/app/styles.css?url"` in Document | RSC-friendly CSS delivery                             |
| Cloudflare   | `ASSETS` binding configured                             | Set assets directory in wrangler when needed          |
| CSP          | `default-src 'self'` in `src/app/headers.ts`            | Update `img-src` if loading external Figma asset URLs |

For prototypes, prefer Figma MCP remote asset URLs over checking in binaries. Use `download_assets` when assets must be committed.

---

## 5. Icon system

### Figma (MaNaReD custom)

Icons live in the UI Library (`93:1469`) as symbols:

- **32px:** profile, vertical-collapse
- **24px:** compound, no-filter, expand, arrows, move
- **16px:** smaller variants

Naming: `icon/{name}` with props like `state=default|hover|active`, `direction=up|down|left|right`.

### Code

MaNaReD icons are not in Astryx. Options:

1. Export via Figma MCP `download_assets` → `src/app/assets/icons/`
2. Inline SVG in page components
3. Fallback to Astryx icons: `vp run astryx -- docs icons`

Size classes: 16px → `w-4 h-4`, 24px → `w-6 h-6`, 32px → `w-8 h-8`.

---

## 6. Styling approach

### Methodology

Three tiers (in priority order):

1. **Astryx props** — `variant`, `color`, `gap`
2. **Token utilities** — `bg-surface`, `text-primary`, `rounded-lg`
3. **Escape hatch** — `bg-[var(--color-background-surface)]`

Never use raw hex/px when a token exists. Never override `--color-*` in `:root` — use `astryx theme` for brand changes.

### Global styles

Single file: `src/app/styles.css`. Avoid page-specific global CSS.

### Responsive design

- Page chrome: Tailwind on wrappers (`min-h-screen`, `max-w-3xl`, `grid`, `md:` prefixes)
- Component spacing: Astryx `gap` props aligned to `MaNaReD.space.*` scale
- Figma dev-mode values → nearest space token → `gap={n}` or `p-{n}`

Example:

```tsx
<main className="min-h-screen bg-body p-8">
  <div className="mx-auto max-w-3xl">
    <VStack gap={8}>
      <Card className="shadow-lg">
        <Text type="body">Content</Text>
      </Card>
    </VStack>
  </div>
</main>
```

---

## 7. Project structure

```
src/
  worker.tsx              # Route registration
  client.tsx              # Client hydration
  app/
    document.tsx          # HTML shell + stylesheet link
    providers.tsx         # Astryx Theme
    styles.css            # Layered CSS
    headers.ts            # Security headers / CSP
    pages/                # Screens (Server Components)
      home.tsx
      home-form.tsx       # Client island
    shared/
      links.ts            # Typed router links
```

**Pattern:** one screen = Server Component page + optional colocated client island. Register routes in `src/worker.tsx`.

---

## Figma MCP workflow

1. Extract `fileKey` and `nodeId` from the Figma URL (`31-80` → `31:80`)
2. `get_screenshot` — visual reference
3. `get_design_context` — structure and reference code (adapt, don't paste)
4. `get_metadata` / `get_variable_defs` — token values when needed
5. `vp run astryx -- build/search/component` — map to Astryx
6. Implement in `src/app/pages/`, wire route in `worker.tsx`
7. Verify with `vp dev` and `vp check`

### Anti-patterns

- Whole-page `"use client"` for one input
- Rebuilding Astryx primitives from scratch
- Hard-coded px/hex from Figma
- Ignoring MCP and guessing layout

---

## Related docs

| Doc                                                                                        | Purpose                                               |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| [`AGENTS.md`](AGENTS.md)                                                                   | Full agent reference (toolchain, RSC, Astryx CLI)     |
| [`.cursor/rules/figma-design-system.mdc`](.cursor/rules/figma-design-system.mdc)           | Cursor rule: Figma → code mapping when editing `src/` |
| [`.cursor/rules/ui-stack.mdc`](.cursor/rules/ui-stack.mdc)                                 | RSC + Astryx + Tailwind conventions                   |
| [`.cursor/skills/figma-to-prototype/SKILL.md`](.cursor/skills/figma-to-prototype/SKILL.md) | Step-by-step Figma implementation workflow            |
