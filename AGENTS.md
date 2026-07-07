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

# MaNaReD design source (Figma)

This project implements the **MaNaReD** (Marine Natural Products Database) design system. Figma is the source of truth for tokens, components, wireframes, and screens.

| Field           | Value                                                                                |
| --------------- | ------------------------------------------------------------------------------------ |
| File            | [MaNaReD](https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=31-80) |
| File key        | `y12p7ety9bAbG9Z7m5Bd6L`                                                             |
| UI Library page | node `31:80`                                                                         |

Key Figma sections for MCP: Font `32:5`, Colour `49:867`, Space `81:470`, Icons `93:1469`.

## Figma MCP (required for design work)

When implementing, reviewing, or referring to any design resource (tokens, components, screens, icons, spacing, colours):

1. **Use the Figma MCP** — `get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`. Do not guess layout or values from memory.
2. **Load the `figma-to-prototype` skill** when building screens from Figma.
3. **Read** [`DESIGN.md`](./DESIGN.md) and [`.cursor/rules/figma-design-system.mdc`](./.cursor/rules/figma-design-system.mdc) for token → Astryx mappings.

MCP is configured in [`.cursor/mcp.json`](./.cursor/mcp.json) (`https://mcp.figma.com/mcp`). If tools are unavailable, ask the user to enable the Figma Cursor plugin (`/add-plugin figma`).

URL node-id format: `31-80` in Figma URLs → `31:80` for MCP tool calls.

# UX decisions (`UX-INTERACTION.md`)

[`UX-INTERACTION.md`](./UX-INTERACTION.md) records MaNaReD UX decisions and interaction rationale. It is **documentation only** — not an implementation backlog.

## Before implementing

**Ask the user for confirmation** before making code or design changes that implement, extend, or depend on content in `UX-INTERACTION.md` (routes, components, filters, PQRS, interaction flows, etc.).

Do not treat doc status values (`not built`, `TBD`, `Figma TBD`) as tasks to execute automatically.

## Allowed without asking

- **Read** `UX-INTERACTION.md` for context when discussing, reviewing, or documenting UX
- **Edit** `UX-INTERACTION.md` when the user asks to update UX rationale or documentation

## When the user confirms implementation

Proceed only after explicit approval (e.g. "build the filter sidebar", "implement from UX-INTERACTION"). Then follow [`.cursor/rules/vibework.mdc`](./.cursor/rules/vibework.mdc), [`.cursor/rules/ui-stack.mdc`](./.cursor/rules/ui-stack.mdc), and [`.cursor/rules/figma-design-system.mdc`](./.cursor/rules/figma-design-system.mdc).
