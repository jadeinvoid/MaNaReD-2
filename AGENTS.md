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

## Cursor Cloud specific instructions

Single product: a RedwoodSDK (React Server Components on Cloudflare Workers) prototype ("MaNaReD"). No database, backend, secrets, or external services — the Worker just serves the UI. Standard commands live in `README.md` / `package.json` (`vp dev`, `vp check`, `vp test`, `vp build`, `vp run storybook`).

- **Dev server**: `vp dev` serves the app at `http://localhost:5173/`. This is the whole product; no other service is required to test it.
- **Fresh-checkout gotcha (non-obvious)**: on a checkout with no `.wrangler/` directory, RedwoodSDK auto-runs `npm run dev:init` during `vp dev`, which fails with `EBADDEVENGINES` because npm rejects the pnpm-only `devEngines.packageManager`. `.wrangler/` is gitignored and normally created by the dev server, so this only bites the very first run. Work around it by creating the dir first: `mkdir -p .wrangler` (optionally `pnpm run generate` to refresh `worker-configuration.d.ts`), then `vp dev`.
- **Never use `npm`/`npx` directly** in this repo — they fail the `devEngines` pnpm check. Use `vp`, `pnpm`, or `pnpm exec` (e.g. `pnpm exec playwright install chromium`, `pnpm run generate`).
- **Tests need a browser**: `vp test` runs Storybook play functions in a Playwright Chromium browser. The update script installs it (`pnpm exec playwright install chromium`); if `vp test` reports a missing executable, rerun that command.
