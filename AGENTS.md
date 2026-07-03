<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# RedwoodSDK

This app uses [RedwoodSDK](https://docs.rwsdk.com/) (React Server Components on Cloudflare Workers).

- Worker entry: `src/worker.tsx`
- Client hydration: `src/client.tsx`
- Pages and document: `src/app/`
- Deploy: `vp run release` (builds with Vite+, then `wrangler deploy`)

RedwoodSDK docs: https://docs.rwsdk.com/
Cloudflare Workers docs: https://developers.cloudflare.com/workers

# Astryx + Tailwind (RSC)

This app follows the [Astryx Next.js + Tailwind example](https://github.com/facebook/astryx/tree/main/apps/example-nextjs-tailwind), adapted for RedwoodSDK:

- Global styles: `src/app/styles.css` (layered Astryx + Tailwind + token bridge)
- Theme provider: `src/app/providers.tsx` (built `neutralTheme` for SSR)
- Stylesheet is linked from `Document` via `?url` so CSS ships with RSC HTML ([rwsdk Tailwind guide](https://docs.rwsdk.com/guides/frontend/tailwind))
- Pages stay Server Components; interactive Astryx forms live in small `"use client"` islands

**Styling rules (overrides the generic Astryx agent note about no Tailwind):**

- Astryx components for UI; Tailwind utilities for layout, wrappers, and `className` overrides
- Prefer token-backed utilities from the bridge (`bg-surface`, `text-primary`, `rounded-lg`, …) over raw hex/px
- Escape hatch: `bg-[var(--color-background-surface)]` when a token isn't bridged

<!-- ASTRYX:START -->

Astryx v0.1.2 · 148 components
CLI: run every command as `vp run astryx -- <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:

1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:

- Prefer Astryx layout components (`VStack`, `HStack`, `Card`, `AppShell`) for structure; page chrome may use `main`/`div` with Tailwind.
- Custom styling: component props first; else `className` with token-backed Tailwind (`bg-surface`, `text-primary`, …) or CSS vars (`var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`). No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-\* in :root.

MORE CLI:
search "<query>" find any component / hook / doc / template / block
component --list 148 components by category
template --list page + block recipes
docs <topic> color, elevation, icons, illustrations, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
swizzle <Name> eject component source (--gap reports why)
upgrade --apply run after any @astryxdesign/core bump

<!-- ASTRYX:END -->

# Cursor

Project Cursor config lives under `.cursor/`:

- Rules: mission (`vibework`), toolchain (`viteplus`), UI stack (`ui-stack` when editing `src/`)
- Skill: `figma-to-prototype` for Figma MCP → Astryx → pages
- MCP: Figma at `.cursor/mcp.json` (also install `/add-plugin figma` per machine)
