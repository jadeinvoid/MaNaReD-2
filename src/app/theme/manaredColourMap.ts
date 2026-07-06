/**
 * MaNaReD colour inventory from Figma UI Library (file y12p7ety9bAbG9Z7m5Bd6L).
 * Light frame: 332:7131 — Dark frame: 332:6892 (node 49:867).
 * Read-only reference; consumed by manaredTheme.ts — do not edit Figma.
 */
export type ColourPair = readonly [light: string, dark: string];

/** Build Astryx defineTheme token tuples from light/dark pairs. */
export function colourTokens(entries: Record<string, ColourPair>): Record<string, ColourPair> {
  return entries;
}

/**
 * Figma MaNaReD.colour.* → CSS custom property → [light, dark].
 * Keys are `--color-*` variable names used in the theme build.
 */
export const MANARED_COLOUR_MAP = colourTokens({
  // Surfaces — MaNaReD.colour.BG.*
  "--color-background-body": ["#E9F1F9", "#203448"],
  "--color-background-body-secondary": ["#DFE9F0", "#1F3348"],
  "--color-background-body-tertiary": ["#DEE4EB", "#223649"],

  "--color-background-surface": ["#FFFFFF", "#181E2C"],
  "--color-background-surface-secondary": ["#E1F5FF", "#222133"],
  "--color-background-surface-tertiary": ["#FFFFD6", "#716E88"],
  "--color-background-card": ["#FFFFFF", "#181E2C"],
  "--color-background-card-tertiary": ["#FFFFD6", "#716E88"],

  "--color-background-sidebar": ["#F6FAFF", "#373F4F"],
  "--color-background-sidebar-secondary": ["#FFFFFF", "#181F35"],
  "--color-background-sidebar-tertiary": ["#F0F4F9", "#242E44"],

  "--color-background-muted": ["#F6FAFF", "#373F4F"],
  "--color-background-popover": ["#FFFFFF", "#181E2C"],

  // Text — MaNaReD.colour.text.*
  "--color-text-primary": ["#2A2A2A", "#E8EFFF"],
  "--color-text-secondary": ["#584F82", "#A3E0FF"],
  "--color-text-tertiary": ["#617990", "#CA9FF5"],
  "--color-text-disabled": ["#617990", "#94AD91"],
  "--color-text-accent": ["#222133", "#E8EFFF"],

  // Primary button fill — MaNaReD.colour.interactive.button (default CTA, not pressed state)
  "--color-accent": ["#222133", "#222133"],
  "--color-accent-muted": ["#DEE4EB", "#373F4F"],
  "--color-on-accent": ["#FFFFFF", "#E8EFFF"],

  // Astryx infrastructure — secondary buttons, hover/pressed overlays
  "--color-neutral": ["#E9F1F9", "#203448"],
  "--color-overlay-hover": ["#0000000D", "#FFFFFF0D"],
  "--color-overlay-pressed": ["#0000001A", "#FFFFFF1A"],

  // Borders — MaNaReD.colour.border
  "--color-border": ["#E5E7EB", "#2E4572"],
  "--color-border-emphasized": ["#D1D5DB", "#8B97AB"],
  "--color-border-tertiary": ["#6B8184", "#6F946A"],
  "--color-border-secondary": ["#D1D5DB", "#8B97AB"],

  // Status — BG / Border / Text roles
  "--color-background-blue": ["#D0E0F8", "#465A6E"],
  "--color-border-blue": ["#7494D0", "#7494D0"],
  "--color-text-blue": ["#0B0041", "#E8F6FF"],
  "--color-icon-blue": ["#7494D0", "#7494D0"],

  "--color-success-muted": ["#C9EA67", "#6C8656"],
  "--color-success": ["#7BA301", "#7BA301"],
  "--color-on-success": ["#002311", "#DFF3E9"],

  "--color-error-muted": ["#FF7C7C", "#8E5963"],
  "--color-error": ["#E80000", "#E80000"],
  "--color-on-error": ["#600000", "#FFEDED"],

  "--color-warning-muted": ["#FFCC85", "#AC8D5D"],
  "--color-warning": ["#AC6400", "#AC6400"],
  "--color-on-warning": ["#643B00", "#FFF6E9"],

  // Entity — MaNaReD.colour.entity.*
  "--color-background-green": ["#D3D78F", "#5F7613"],
  "--color-border-green": ["#82BC4A", "#6B9C35"],
  "--color-text-green": ["#1F5200", "#EBFFDF"],

  "--color-background-pink": ["#F4D7E5", "#804862"],
  "--color-border-pink": ["#8D4D6C", "#CE82A6"],
  "--color-text-pink": ["#640533", "#FFD6EA"],

  "--color-background-cyan": ["#E0E9F5", "#5E6F85"],
  "--color-border-cyan": ["#4278C0", "#4278C0"],
  "--color-text-cyan": ["#0F3C79", "#D8EDFF"],

  "--color-background-orange": ["#F6D4CC", "#AB6150"],
  "--color-border-orange": ["#FF774F", "#E28468"],
  "--color-text-orange": ["#C22C00", "#FFCCBD"],

  // Interactive — MaNaReD.colour.interactive.*
  "--color-interactive-button-active": ["#DEE4EB", "#222133"],
  "--color-interactive-button-hover": ["#ADFFD6", "#33306C"],
  "--color-interactive-button-focus": ["#E6FF9B", "#487A87"],

  "--color-interactive-chip-active": ["#D0E0F8", "#46536E"],
  "--color-interactive-chip-hover": ["#D7F7E6", "#476195"],
  "--color-interactive-chip-focus": ["#ACD0FF", "#1C3789"],

  "--color-interactive-nav-active": ["#FFFEF8", "transparent"],
  "--color-interactive-nav-hover": ["#E2EAF7", "#3C466A"],
  "--color-interactive-nav-focus": ["#D4E7FF", "#164066"],

  "--color-interactive-dropdown-active": ["#FFFEF8", "#FFFEF8"],
  "--color-interactive-dropdown-hover": ["#E2EAF7", "#E2EAF7"],
  "--color-interactive-dropdown-focus": ["#D4E7FF", "#D4E7FF"],
});
