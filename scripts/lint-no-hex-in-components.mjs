#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const scanRoots = ["src/app/components", "src/app/pages"];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path, files);
      continue;
    }

    if (/\.(tsx?|jsx?|css)$/.test(entry)) {
      files.push(path);
    }
  }

  return files;
}

function lineUsesHardcodedColour(line) {
  if (/className=\{?["'`][^"'`]*#[0-9a-fA-F]{3,8}/.test(line)) {
    return true;
  }

  if (/style=\{\{/.test(line) && (/#[0-9a-fA-F]{3,8}/.test(line) || /\brgb\s*\(/.test(line))) {
    return true;
  }

  if (/['"`][^'"`]*(?:bg|text|border)-\[#[0-9a-fA-F]/.test(line)) {
    return true;
  }

  if (
    /\.css$/.test(line) === false &&
    /(?:backgroundColor|color|borderColor)\s*:\s*['"]#/.test(line)
  ) {
    return true;
  }

  return false;
}

function fileUsesHardcodedColour(source, filePath) {
  if (filePath.endsWith(".css")) {
    return /#[0-9a-fA-F]{3,8}/.test(source) || /\brgb\s*\(/.test(source);
  }

  return source.split("\n").some((line) => lineUsesHardcodedColour(line));
}

const violations = [];

for (const root of scanRoots) {
  const absoluteRoot = join(repoRoot, root);

  for (const file of walk(absoluteRoot)) {
    const source = readFileSync(file, "utf8");
    const rel = relative(repoRoot, file);

    if (fileUsesHardcodedColour(source, file)) {
      violations.push(rel);
    }
  }
}

if (violations.length > 0) {
  console.error("Hard-coded colour literals are not allowed outside theme source:");
  for (const file of violations) {
    console.error(`  - ${file}`);
  }
  console.error("\nUse semantic Tailwind utilities or tokens from src/app/theme/ instead.");
  process.exit(1);
}

console.log("No hard-coded hex/rgb colours in components or pages.");
