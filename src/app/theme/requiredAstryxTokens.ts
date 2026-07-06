/**
 * Astryx infrastructure tokens that MaNaReD must define explicitly.
 *
 * Custom themes do not inherit these from theme-neutral. Astryx components
 * (Button variant secondary, Badge neutral, Avatar, etc.) read these vars at
 * runtime — missing entries fall back to unrelated defaults and break Figma parity.
 */
export const REQUIRED_ASTRYX_INFRASTRUCTURE_TOKENS = [
  /** Button/Badge secondary surface — mapped to MaNaReD page primary in manaredColourMap */
  "--color-neutral",
  /** Hover overlay for interactive components */
  "--color-overlay-hover",
  /** Pressed overlay for interactive components */
  "--color-overlay-pressed",
] as const;

export type RequiredAstryxInfrastructureToken =
  (typeof REQUIRED_ASTRYX_INFRASTRUCTURE_TOKENS)[number];

/** Component overrides that must exist in manaredTheme.ts for Figma-aligned controls. */
export const REQUIRED_THEME_COMPONENT_OVERRIDES = {
  button: ["variant:secondary"],
} as const;
