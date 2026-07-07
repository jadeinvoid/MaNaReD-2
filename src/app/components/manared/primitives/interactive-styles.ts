/** MaNaReD interactive roles — Figma `MaNaReD.colour.interactive.*` and provenance text. */

/** Top bar utility link — Figma `top-bar/utilities` (`340:3575`). */
export const INTERACTIVE_TOPBAR_UTILITY_LINK = "cursor-pointer hover:opacity-80";

/** Search dropdown suggestion row — gradient on hover/focus; Figma `colour/gradient/light/dropdownSelect`. */
export const INTERACTIVE_SEARCH_DROPDOWN_ROW = "interactive-search-dropdown-row";

/** Active filter chip shell — Figma `active-chip` / `interactive/chip/active`. */
export const INTERACTIVE_ACTIVE_CHIP =
  "inline-flex h-6 shrink-0 items-center gap-2 overflow-hidden rounded-lg border border-solid border-border-secondary bg-chip-active px-[length:var(--spacing-2)] py-[length:var(--spacing-1)] text-3xs font-normal leading-none tracking-[-0.12px] text-secondary hover:bg-chip-hover";

/** Chip remove control — inherits chip text colour. */
export const INTERACTIVE_CHIP_REMOVE =
  "flex size-2 shrink-0 items-center justify-center text-secondary hover:text-primary";

/** Provenance helper copy — Figma `chip-bar/provenance-text` / `colour/text/tertiary`. */
export const INTERACTIVE_PROVENANCE_TEXT =
  "ml-2 text-3xs font-normal italic leading-4 tracking-[-0.12px] text-tertiary";

/** Chip-bar pill control — Figma `chip-bar/more-filters` & sort trigger: page primary fill. */
export const INTERACTIVE_CHIP_BAR_CONTROL =
  "inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-lg border border-solid border-border-secondary bg-body px-[length:var(--spacing-2)] py-[length:var(--spacing-1)] text-3xs font-normal text-secondary hover:bg-button-hover focus-visible:bg-button-focus focus-visible:outline-none";

/** Shared filter sidebar action shell — Figma `interactive.button` active/hover/focus. */
export const INTERACTIVE_FILTER_ACTION_BASE =
  "inline-flex shrink-0 items-center justify-center rounded-md border border-solid bg-button-active font-normal text-primary hover:bg-button-hover focus-visible:bg-button-focus focus-visible:outline-none";

/** Sidebar section title — Figma `button/refine-result` (332:9066). */
export const INTERACTIVE_FILTER_REFINE_LABEL =
  "inline-flex shrink-0 items-center justify-center py-[length:var(--spacing-2)] text-sm font-semibold text-secondary";

export const INTERACTIVE_FILTER_CLEAR_ALL = `${INTERACTIVE_FILTER_ACTION_BASE} border-tertiary p-[length:var(--spacing-2)] text-3xs`;

export const INTERACTIVE_FILTER_APPLY = `${INTERACTIVE_FILTER_ACTION_BASE} border-border-secondary px-[length:var(--spacing-6)] py-[length:var(--spacing-2)] text-2xs`;

/** Shared card footer button shell — Figma `button/*` (`191:1310`). */
const CARD_FOOTER_BUTTON_BASE =
  "inline-flex shrink-0 items-center justify-center rounded-[6px] border border-solid px-3 py-1.5 text-3xs font-normal leading-normal text-primary hover:bg-button-hover focus-visible:bg-button-focus focus-visible:outline-none";

/** Card footer Save — Figma Ghost: `interactive/button/active` fill. */
export const INTERACTIVE_CARD_SAVE = `${CARD_FOOTER_BUTTON_BASE} border-[rgba(96,96,96,0.6)] bg-button-active`;

/** Card footer Export — Figma Tonal: `interactive/button/focus` fill. */
export const INTERACTIVE_CARD_EXPORT = `${CARD_FOOTER_BUTTON_BASE} border-[rgba(107,129,132,0.6)] bg-button-focus`;

/** Card footer Detail — Figma Variant4: `bg/card/tertiary` + semibold label + arrow. */
export const INTERACTIVE_CARD_DETAIL =
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-[6px] border border-solid border-[rgba(107,129,132,0.6)] bg-card-tertiary px-3 py-1.5 text-3xs font-semibold leading-normal text-primary hover:bg-button-hover focus-visible:bg-button-focus focus-visible:outline-none";
