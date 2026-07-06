import { GRADIENT_CHIP_BAR } from "./gradient-styles";

/** MaNaReD surface roles — Figma `MaNaReD.colour.BG.*` and border tokens. */

/** Page secondary band — Figma `colour/bg/page/secondary` → `bg-body-secondary`. */
export const SURFACE_PAGE_SECONDARY = "bg-body-secondary";

/** Card / panel surface — Figma `colour/bg/card` → `bg-surface`. */
export const SURFACE_CARD = "bg-surface";

/** Default panel border — Figma `colour/border/emphasized` → `border-emphasized`. */
export const BORDER_EMPHASIZED = "border-emphasized";

/** Chip and control outline — Figma `colour/border/secondary` → `border-border-secondary`. */
export const BORDER_SECONDARY = "border-border-secondary";

/** Common bordered card/panel shell used across browse UI. */
export const SURFACE_CARD_PANEL = "rounded-lg border border-solid border-emphasized bg-surface";

/** Primary card outline — Figma `colour/border/primary` → `--color-border`. */
export const BORDER_PRIMARY = "border-[color:var(--color-border)]";

/** Card row drop shadow — Figma `card/shadow-dark` (367:3752). */
export const SHADOW_CARD = "shadow-[0_4px_3.1px_rgba(198,218,245,0.05)]";

/** Search-mode list row shell — Figma list frame (`367:3752`). */
export const SURFACE_LIST_ROW = `w-full rounded-lg border border-solid ${BORDER_PRIMARY} bg-surface py-4 pl-6 pr-4 ${SHADOW_CARD}`;

/** 24px icon frame — Figma `icon/compound` slot. */
export const LIST_ROW_ICON_SLOT =
  "flex size-6 shrink-0 items-center justify-center overflow-visible";

/** Chip bar container — Figma `colour/gradient/light|dark/chip-bar` (349:3993). */
export const SURFACE_CHIP_BAR = `min-h-11 flex-wrap rounded-lg ${GRADIENT_CHIP_BAR} px-3 py-[length:var(--spacing-2)]`;
