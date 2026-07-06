import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vite-plus/test";

import { MANARED_COLOUR_MAP } from "./manaredColourMap";
import {
  REQUIRED_ASTRYX_INFRASTRUCTURE_TOKENS,
  REQUIRED_THEME_COMPONENT_OVERRIDES,
} from "./requiredAstryxTokens";

const themeDir = dirname(fileURLToPath(import.meta.url));

function readThemeFile(name: string): string {
  return readFileSync(join(themeDir, name), "utf8");
}

function parseExtensionAliases(css: string): Array<{ alias: string; target: string }> {
  const themeBlock = css.match(/@theme inline\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const aliases: Array<{ alias: string; target: string }> = [];

  for (const match of themeBlock.matchAll(/(--color-[\w-]+):\s*var\((--color-[\w-]+)\)/g)) {
    aliases.push({ alias: match[1], target: match[2] });
  }

  return aliases;
}

describe("MaNaReD theme contract", () => {
  const manaredCss = readThemeFile("manared.css");
  const extensionsCss = readThemeFile("manared-extensions.css");
  const manaredThemeSource = readThemeFile("manaredTheme.ts");

  it("includes every MANARED_COLOUR_MAP token in generated manared.css", () => {
    for (const token of Object.keys(MANARED_COLOUR_MAP)) {
      expect(manaredCss, `missing ${token} in manared.css`).toContain(`${token}:`);
    }
  });

  it("defines required Astryx infrastructure tokens in MANARED_COLOUR_MAP", () => {
    for (const token of REQUIRED_ASTRYX_INFRASTRUCTURE_TOKENS) {
      expect(MANARED_COLOUR_MAP, `missing ${token} in manaredColourMap.ts`).toHaveProperty(token);
      expect(manaredCss, `missing ${token} in manared.css`).toContain(`${token}:`);
    }
  });

  it("maps manared-extensions.css aliases to tokens present in manared.css", () => {
    const aliases = parseExtensionAliases(extensionsCss);

    expect(aliases.length).toBeGreaterThan(0);

    for (const { alias, target } of aliases) {
      expect(
        manaredCss,
        `alias ${alias} → ${target} but target is missing from manared.css`,
      ).toContain(`${target}:`);
    }
  });

  it("includes border-emphasized Tailwind bridge alias", () => {
    expect(extensionsCss).toContain("--color-emphasized: var(--color-border-emphasized)");
  });

  it("defines button secondary override in manaredTheme.ts", () => {
    for (const override of REQUIRED_THEME_COMPONENT_OVERRIDES.button) {
      expect(manaredThemeSource).toContain(`"${override}"`);
    }

    expect(manaredCss).toContain(".astryx-button.secondary");
    expect(manaredCss).toContain("var(--color-background-body)");
    expect(manaredCss).toContain("var(--color-text-secondary)");
    expect(manaredCss).toContain("var(--color-border-secondary)");
  });
});
