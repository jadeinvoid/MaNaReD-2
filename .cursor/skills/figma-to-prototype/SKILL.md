---
name: figma-to-prototype
description: >-
  Turns Figma designs into Vibework prototypes using Figma MCP, Astryx, and
  RedwoodSDK RSC. Use when the user pastes a Figma URL, asks to implement a
  frame/screen, build from design, match a mockup, or go from Figma to code.
---

# Figma → Vibework prototype

Ship a clickable screen in this repo’s stack. Prefer speed and Astryx components over pixel-perfect custom CSS.

## Prerequisites

- Figma MCP available (`get_design_context`, `get_screenshot`, `get_metadata`)
- If tools are missing: ask the user to run `/add-plugin figma` or enable project MCP (`.cursor/mcp.json`)

## Workflow

### 1. Pull design context

From the Figma URL or selection:

1. `get_screenshot` — visual target
2. `get_design_context` — structure, text, layout, components
3. `get_metadata` / `get_variable_defs` only if tokens or naming matter

Do not implement from memory when a URL or node is available.

### 2. Map to Astryx

```bash
vp run astryx -- build "<one-line description of the screen>"
vp run astryx -- search "<key control or pattern>"
vp run astryx -- component <Name>
```

Map Figma pieces to the closest Astryx components. Use Tailwind on wrappers and `className` for spacing/layout the design system does not cover.

### 3. Implement in the app

| Concern                                    | Where                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------- |
| Page / route shell                         | Server Component in `src/app/pages/`                                  |
| Controlled inputs, toggles, local UI state | `"use client"` island colocated with the page                         |
| Theme                                      | Already in `src/app/providers.tsx` — do not re-wrap unless needed     |
| Styles                                     | Token utilities in `className`; avoid new global CSS unless necessary |

Patterns to copy:

- Server page + client form: `src/app/pages/home.tsx` + `home-form.tsx`
- Layout: `VStack` / `HStack` / `Card` + Tailwind on `main` / max-width wrappers

### 4. Wire the route

If this is a new screen, register it the same way existing pages are registered in `src/worker.tsx` / the app router. Keep URLs simple for prototypes.

### 5. Verify

- `vp dev` if not already running
- `vp check` before calling the work done on non-trivial UI

## Rules of thumb

- One screen at a time unless the user asks for a full flow
- Approximate spacing and type with tokens (`text-primary`, `bg-surface`, gaps on `VStack`) rather than hard-coded px/hex
- Skip auth, data layers, and tests unless the user asks
- Assets: use Figma MCP asset guidance; prefer remote URLs the MCP provides over checking in binaries

## Anti-patterns

- Rebuilding buttons/inputs from scratch when Astryx has them
- Marking the whole page `"use client"` for one form field
- Ignoring Figma MCP and freehanding the layout
- Adding new dependencies for a one-off prototype effect
