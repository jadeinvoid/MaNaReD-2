# Vibework

A starter project for going from **Figma design → real prototype** in a pure vibe-code way.

Drop in a design, describe what you want, and iterate with an AI coding agent. Vibework is intentionally opinionated so you spend time on the product, not on wiring up tooling.

**Fork or clone this repo** and use it as the base template for every new vibe prototype. Start fresh from here instead of rebuilding the stack each time.

```bash
# Fork on GitHub, then:
git clone <your-fork-url>
cd vibework
vp install
vp dev
```

Or clone directly and create your own remote:

```bash
git clone <this-repo-url> my-prototype
cd my-prototype
vp install
vp dev
```

---

## What it's for

- Turning Figma (or any design) into a clickable, deployable prototype quickly
- Experimenting with UI and flows without fighting config
- Pairing with an AI agent that already knows the stack (see [`AGENTS.md`](./AGENTS.md))

It is **not** a production app framework with every feature pre-built. It is a clean runway: React, design system, edge deploy, one CLI.

---

## Stack

Everything is documented for agents in [`AGENTS.md`](./AGENTS.md). In short:

### Vite+ (`vp`)

[Vite+](https://viteplus.dev/guide/) is the unified toolchain. One global CLI (`vp`) covers install, dev, build, format, lint, typecheck, and tests — built on Vite, Rolldown, Vitest, Oxlint, Oxfmt, and friends.

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `vp install`    | Install dependencies                              |
| `vp dev`        | Start the dev server                              |
| `vp build`      | Production build                                  |
| `vp check`      | Format, lint, and typecheck                       |
| `vp test`       | Run tests                                         |
| `vp env doctor` | Diagnose setup / runtime / package-manager issues |

### RedwoodSDK

[RedwoodSDK](https://docs.rwsdk.com/) — React Server Components on [Cloudflare Workers](https://developers.cloudflare.com/workers).

| Path             | Role               |
| ---------------- | ------------------ |
| `src/worker.tsx` | Worker entry       |
| `src/client.tsx` | Client hydration   |
| `src/app/`       | Pages and document |

Deploy with:

```bash
vp run release
```

That builds with Vite+ and deploys via Wrangler.

### Astryx + Tailwind

UI comes from [Astryx](https://github.com/facebook/astryx) (design-system components) with Tailwind for layout and overrides — adapted for RedwoodSDK RSC.

- Global styles: `src/app/styles.css`
- Theme provider: `src/app/providers.tsx`
- Pages stay Server Components; interactive bits live in small `"use client"` islands

**Styling habit:** Astryx components for UI; Tailwind utilities for layout and `className` overrides. Prefer token-backed classes (`bg-surface`, `text-primary`, `rounded-lg`, …) over raw hex/px.

Discover components instead of guessing (agents should do this before inventing UI):

```bash
vp run astryx -- build "<idea>"      # kit: page + blocks + components
vp run astryx -- component <Name>    # props + examples
vp run astryx -- search "<query>"    # find anything in the system
```

---

## Quick start

1. **Fork or clone** this repo as your new prototype base.
2. Install and run:

   ```bash
   vp install
   vp dev
   ```

3. Open the app, point your agent (or yourself) at a Figma design, and start vibing in `src/app/`.
4. When you want it live:

   ```bash
   vp run release
   ```

If something feels off with setup or packages, run `vp env doctor` and share the output.

---

## Project layout

```
src/
  worker.tsx      # Cloudflare Worker entry
  client.tsx      # Client hydration
  app/
    pages/        # Routes / screens — start here
    document.tsx  # HTML document shell
    providers.tsx # Theme (Astryx)
    styles.css    # Astryx + Tailwind + tokens
```

Agents should read [`AGENTS.md`](./AGENTS.md) for conventions, review checklist, and Astryx workflow details.

---

## Cursor agent setup

This repo is tuned for [Cursor](https://cursor.com) Agent mode (Figma → code).

| Piece           | Path                                                                         | Role                                                           |
| --------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Always-on rules | [`.cursor/rules/`](./.cursor/rules/)                                         | Mission, Vite+, and (when editing UI) RSC + Astryx conventions |
| Project skill   | [`.cursor/skills/figma-to-prototype/`](./.cursor/skills/figma-to-prototype/) | Step-by-step Figma MCP → Astryx → pages                        |
| Figma MCP       | [`.cursor/mcp.json`](./.cursor/mcp.json)                                     | Design context tools in this workspace                         |
| Agent notes     | [`AGENTS.md`](./AGENTS.md)                                                   | Full stack reference for agents                                |

**One-time on each machine:** install the Figma Cursor plugin so skills and auth work smoothly:

```
/add-plugin figma
```

Then open Agent chat, paste a Figma URL, and ask to implement the screen. The agent should pull design context via MCP, map to Astryx, and write pages under `src/app/`.

We intentionally skip project hooks and custom subagents — they add friction for vibe prototyping. Prefer rules + the Figma skill + MCP.

---

## Use it as a template

Every new vibe prototype should start from this repo:

1. **Fork** (keeps a link back to the template) or **clone** into a new folder.
2. Rename the project in `package.json` if you like.
3. `vp install` → `vp dev` → build from Figma.
4. Deploy with `vp run release` when you're ready to share.

Happy vibing.
