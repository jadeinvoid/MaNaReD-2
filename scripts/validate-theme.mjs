#!/usr/bin/env node
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(command) {
  execSync(command, { cwd: repoRoot, stdio: "inherit" });
}

console.log("Rebuilding MaNaReD theme from source…");
run("pnpm run build:theme");

console.log("Formatting generated theme artifacts…");
run("vp check --fix");

console.log("Checking generated theme artifacts are committed…");
run("git diff --exit-code -I '^ \\* Generated:' -- src/app/theme/");

console.log("Checking for hard-coded colours in components/pages…");
run("node scripts/lint-no-hex-in-components.mjs");

console.log("Theme validation passed.");
