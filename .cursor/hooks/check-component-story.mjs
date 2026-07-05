#!/usr/bin/env node
/**
 * postToolUse hook: after Write/StrReplace under src/app/components/, remind the
 * agent to colocate a Storybook story with Vitest play tests (see .cursor/rules/component-stories.mdc).
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const COMPONENTS_DIR = `${path.sep}src${path.sep}app${path.sep}components${path.sep}`;

function readStdin() {
  return readFileSync(0, "utf8");
}

function getEditedPath(input) {
  const filePath = input.tool_input?.path;
  return typeof filePath === "string" ? filePath : null;
}

function isComponentSource(filePath) {
  if (!filePath.includes(COMPONENTS_DIR)) return false;
  if (filePath.endsWith(".stories.tsx") || filePath.endsWith(".stories.ts")) return false;
  return filePath.endsWith(".tsx") || filePath.endsWith(".ts");
}

function isComponentStory(filePath) {
  return filePath.includes(COMPONENTS_DIR) && /\.stories\.tsx?$/.test(filePath);
}

function storyPathForComponent(componentPath) {
  return componentPath.replace(/\.tsx?$/, ".stories.tsx");
}

function analyzeStory(source) {
  const hasTestTag = /tags:\s*\[[^\]]*["']test["']/.test(source);
  const storyExports = [...source.matchAll(/export const (\w+):\s*Story/g)].map((m) => m[1]);
  const storiesWithPlay = [...source.matchAll(/export const (\w+):\s*Story[\s\S]*?play:/g)].map(
    (m) => m[1],
  );
  const missingPlay = storyExports.filter((name) => !storiesWithPlay.includes(name));

  return { hasTestTag, storyExports, missingPlay };
}

function emit(additional_context) {
  process.stdout.write(JSON.stringify({ additional_context }));
}

function main() {
  let input;
  try {
    input = JSON.parse(readStdin());
  } catch {
    process.exit(0);
  }

  const filePath = getEditedPath(input);
  if (!filePath) process.exit(0);

  if (isComponentSource(filePath)) {
    const storyPath = storyPathForComponent(filePath);
    const baseName = path.basename(filePath);

    if (!existsSync(storyPath)) {
      emit(
        `Component file ${baseName} was edited. Create colocated ${path.basename(storyPath)} with Storybook + Vitest play tests. Requirements (see .cursor/rules/component-stories.mdc): title \`Vibework/Components/<Name>\`, tags \`["autodocs", "test"]\`, a \`play\` function on every exported story, imports from \`storybook/test\`. Run \`vp test\` when done.`,
      );
      process.exit(0);
    }

    const storySource = readFileSync(storyPath, "utf8");
    const { hasTestTag, missingPlay } = analyzeStory(storySource);
    const issues = [];

    if (!hasTestTag) issues.push('add `tags: ["autodocs", "test"]` to meta');
    if (missingPlay.length > 0) {
      issues.push(`add \`play\` to story exports: ${missingPlay.join(", ")}`);
    }

    if (issues.length > 0) {
      emit(
        `Component ${baseName} has ${path.basename(storyPath)} but it is incomplete for Vitest: ${issues.join("; ")}. See .cursor/rules/component-stories.mdc. Run \`vp test\` after fixing.`,
      );
    }

    process.exit(0);
  }

  if (isComponentStory(filePath)) {
    const storySource = readFileSync(filePath, "utf8");
    const { hasTestTag, missingPlay } = analyzeStory(storySource);
    const issues = [];

    if (!hasTestTag) issues.push('add `tags: ["autodocs", "test"]` to meta');
    if (missingPlay.length > 0) {
      issues.push(`add \`play\` to story exports: ${missingPlay.join(", ")}`);
    }

    if (issues.length > 0) {
      emit(
        `Story file ${path.basename(filePath)} is missing Vitest coverage: ${issues.join("; ")}. Every Vibework component story needs the \`test\` tag and a \`play\` function per export. See .cursor/rules/component-stories.mdc. Run \`vp test\`.`,
      );
    }
  }

  process.exit(0);
}

main();
