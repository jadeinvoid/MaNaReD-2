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

  it("defines gradient surface utilities in manaredGradients.css", () => {
    const gradientsCss = readThemeFile("manaredGradients.css");

    expect(gradientsCss).toContain(".surface-gradient-chip-bar");
    expect(gradientsCss).toContain(".surface-gradient-sidebar");
    expect(gradientsCss).toContain(".surface-gradient-filter");
    expect(gradientsCss).toContain(".surface-gradient-filter-panel");
    expect(gradientsCss).toContain(".surface-gradient-context-bar");
  });

  it("defines elevation hover utility in manaredElevation.css", () => {
    const elevationCss = readThemeFile("manaredElevation.css");

    expect(elevationCss).toContain(".shadow-card-rest");
    expect(elevationCss).toContain(".elevation-hover");
    expect(elevationCss).toContain("var(--shadow-card), var(--shadow-elevated)");
    expect(elevationCss).toContain(".shadow-nav-sidebar");
    expect(elevationCss).toContain(".nav-sidebar-shell");
    expect(elevationCss).toContain('data-collapsed="true"');
    expect(elevationCss).toContain("transition: width");
    expect(elevationCss).toContain(".nav-sidebar-reveal");
    expect(elevationCss).toContain("prefers-reduced-motion: reduce");
  });

  it("maps supporting text to MaNaReD 3xs, not heading sm", () => {
    expect(manaredThemeSource).toContain('"--text-supporting-size": "var(--font-size-3xs)"');
    expect(manaredCss).toContain("--text-supporting-size: var(--font-size-3xs)");
  });

  it("defines elevation shadow tokens in theme source and generated CSS", () => {
    expect(MANARED_COLOUR_MAP).toHaveProperty("--color-shadow");
    expect(manaredCss).toContain("--color-shadow:");
    expect(manaredThemeSource).toContain('"--shadow-card"');
    expect(manaredThemeSource).toContain('"--shadow-elevated"');
    expect(manaredThemeSource).toContain('"--layout-sidebar-width"');
    expect(manaredThemeSource).toContain('"--layout-sidebar-width-collapsed"');
    expect(manaredThemeSource).toContain('"--layout-filter-sidebar-width"');
    expect(manaredThemeSource).toContain('"--layout-filter-sidebar-width-collapsed"');
    expect(manaredThemeSource).toContain('"--shadow-nav-sidebar"');
    expect(manaredThemeSource).toContain('"--shadow-filter-action"');
    expect(manaredThemeSource).toContain('"--shadow-filter-bar"');
    expect(manaredCss).toContain("--shadow-card:");
    expect(manaredCss).toContain("--shadow-elevated:");
    expect(manaredCss).toContain("--layout-filter-sidebar-width:");
    expect(manaredCss).toContain("--shadow-filter-action:");
    expect(manaredCss).toContain("--shadow-filter-bar:");
  });

  it("defines filter sidebar shell utilities in manaredElevation.css", () => {
    const elevationCss = readThemeFile("manaredElevation.css");

    expect(elevationCss).toContain(".shadow-filter-action");
    expect(elevationCss).toContain(".shadow-filter-bar");
    expect(elevationCss).toContain(".filter-sidebar-shell");
    expect(elevationCss).toContain(".filter-sidebar-reveal");
    expect(elevationCss).toContain(".filter-sidebar-collapsed-rail");
    expect(elevationCss).toContain("--layout-filter-sidebar-width");
  });

  it("registers Geist Mono as the code/mono font family", () => {
    expect(manaredThemeSource).toContain('family: "Geist Mono"');
    expect(manaredCss).toContain("--font-family-code:");
    expect(manaredCss).toContain('"Geist Mono"');
  });
});
