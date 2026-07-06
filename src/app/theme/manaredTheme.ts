/**
 * MaNaReD design tokens from Figma UI Library (file y12p7ety9bAbG9Z7m5Bd6L).
 * Colour values sourced from manaredColourMap.ts (Figma frames 332:7131 / 332:6892).
 */
import { defineTheme } from "@astryxdesign/core/theme";
import { neutralIconRegistry } from "@astryxdesign/theme-neutral";

import { MANARED_COLOUR_MAP } from "./manaredColourMap";

export const manaredTheme = defineTheme({
  name: "manared",

  typography: {
    // Scale kept for heading/body semantic token generation; MaNaReD px overrides below win.
    scale: { base: 16, ratio: 1.25 },
    body: {
      family: "Inter",
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    heading: {
      family: "Inter",
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      weights: { 3: "bold", 4: "bold" },
    },
    code: {
      family: '"Geist Mono"',
      fallbacks: 'ui-monospace, "SF Mono", Monaco, Consolas, "Courier New", monospace',
    },
  },

  tokens: {
    ...MANARED_COLOUR_MAP,

    // Shape — MaNaReD.shape.*
    "--radius-inner": "4px",
    "--radius-element": "8px",
    "--radius-container": "12px",
    "--radius-none": "0px",

    // Typography — MaNaReD.font.size.* (UI Library node 32:5)
    "--font-size-4xs": "0.625rem", // 10px — sub-3xs (no MaNaReD token)
    "--font-size-3xs": "0.75rem", // 12px — MaNaReD.font.size.3xs
    "--font-size-2xs": "0.875rem", // 14px — MaNaReD.font.size.2xs
    "--font-size-xs": "1rem", // 16px — MaNaReD.font.size.xs
    "--font-size-sm": "1.25rem", // 20px — MaNaReD.font.size.sm
    "--font-size-base": "1rem", // 16px — body default (MaNaReD xs)
    "--font-size-lg": "1.5rem", // 24px — MaNaReD.font.size.md
    "--font-size-xl": "1.75rem", // 28px — MaNaReD.font.size.ml
    "--font-size-2xl": "2rem", // 32px — MaNaReD.font.size.lg
    "--font-size-3xl": "2.5rem", // 40px — MaNaReD.font.size.xl
    "--font-size-4xl": "3rem", // 48px — MaNaReD.font.size.2xl
    "--font-size-5xl": "4.5rem", // 72px — MaNaReD.font.size.3xl

    // Astryx semantic scale — MaNaReD `font.size.sm` (20px) is a heading step, not supporting text.
    // Item/ListItem description uses `--text-supporting-size`; keep it at MaNaReD 3xs (12px).
    "--text-supporting-size": "var(--font-size-3xs)",
    "--text-supporting-leading": "1.3333", // 12px → 16px
  },

  components: {
    button: {
      "variant:primary": {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-on-accent)",
      },
      "variant:secondary": {
        backgroundColor: "var(--color-background-body)",
        color: "var(--color-text-secondary)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--color-border-secondary)",
        ":hover": {
          backgroundColor: "var(--color-interactive-button-hover)",
        },
      },
    },
    badge: {
      "variant:info": {
        backgroundColor: "var(--color-background-blue)",
        color: "var(--color-text-blue)",
      },
      "variant:success": {
        backgroundColor: "var(--color-success-muted)",
        color: "var(--color-on-success)",
      },
      "variant:warning": {
        backgroundColor: "var(--color-warning-muted)",
        color: "var(--color-on-warning)",
      },
      "variant:error": {
        backgroundColor: "var(--color-error-muted)",
        color: "var(--color-on-error)",
      },
    },
  },

  icons: neutralIconRegistry,
});
