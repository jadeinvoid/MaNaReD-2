/**
 * MaNaReD design tokens from Figma UI Library (file y12p7ety9bAbG9Z7m5Bd6L).
 * Values sourced via Figma MCP — light/dark colour frames at node 49:867.
 */
import { defineTheme } from "@astryxdesign/core/theme";
import { neutralIconRegistry } from "@astryxdesign/theme-neutral";

export const manaredTheme = defineTheme({
  name: "manared",

  typography: {
    scale: { base: 14, ratio: 1.2 },
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
    // Surfaces — MaNaReD.colour.BG.*
    "--color-background-body": ["#E9F1F9", "#203448"],
    "--color-background-surface": ["#FFFFFF", "#181E2C"],
    "--color-background-card": ["#FFFFFF", "#181E2C"],
    "--color-background-popover": ["#FFFFFF", "#181E2C"],
    "--color-background-muted": ["#F6FAFF", "#373F4F"],

    // Text — MaNaReD.colour.text.*
    "--color-text-primary": ["#2A2A2A", "#E8EFFF"],
    "--color-text-secondary": ["#584F82", "#A3E0FF"],
    "--color-text-disabled": ["#617990", "#CA9FF5"],
    "--color-text-accent": ["#222133", "#E8EFFF"],

    // Accent / interactive — MaNaReD.colour.interactive.button
    "--color-accent": ["#222133", "#222133"],
    "--color-accent-muted": ["#DEE4EB", "#373F4F"],
    "--color-on-accent": ["#FFFFFF", "#E8EFFF"],

    // Borders — MaNaReD.colour.border
    "--color-border": ["#E5E7EB", "#2E4572"],
    "--color-border-emphasized": ["#D1D5DB", "#8B97AB"],

    // Status — MaNaReD.colour.status.*
    "--color-success": ["#7BA301", "#DFF3E9"],
    "--color-success-muted": ["#C9EA67", "#6C8656"],
    "--color-on-success": ["#002311", "#002311"],

    "--color-error": ["#E80000", "#FFEDED"],
    "--color-error-muted": ["#FF7C7C", "#8E5963"],
    "--color-on-error": ["#600000", "#600000"],

    "--color-warning": ["#AC6400", "#FFF6E9"],
    "--color-warning-muted": ["#FFCC85", "#AC8D5D"],
    "--color-on-warning": ["#643B00", "#643B00"],

    // Info maps to blue categorical tokens
    "--color-background-blue": ["#D0E0F8", "#465A6E"],
    "--color-border-blue": ["#7494D0", "#7494D0"],
    "--color-text-blue": ["#0B0041", "#E8F6FF"],
    "--color-icon-blue": ["#7494D0", "#7494D0"],

    // Entity types — MaNaReD.colour.entity.*
    "--color-background-green": ["#D3D78F", "#D3D78F"],
    "--color-border-green": ["#82BC4A", "#82BC4A"],
    "--color-text-green": ["#1F5200", "#1F5200"],

    "--color-background-pink": ["#F4D7E5", "#F4D7E5"],
    "--color-border-pink": ["#8D4D6C", "#8D4D6C"],
    "--color-text-pink": ["#640533", "#640533"],

    "--color-background-cyan": ["#E0E9F5", "#E0E9F5"],
    "--color-border-cyan": ["#4278C0", "#4278C0"],
    "--color-text-cyan": ["#0F3C79", "#0F3C79"],

    "--color-background-orange": ["#F6D4CC", "#F6D4CC"],
    "--color-border-orange": ["#FF774F", "#FF774F"],
    "--color-text-orange": ["#C22C00", "#C22C00"],

    // Shape — MaNaReD.shape.*
    "--radius-inner": "4px",
    "--radius-element": "8px",
    "--radius-container": "12px",
    "--radius-none": "0px",
  },

  components: {
    button: {
      "variant:primary": {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-on-accent)",
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
