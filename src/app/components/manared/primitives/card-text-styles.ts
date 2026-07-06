/** MaNaReD browse card typography — composes existing theme vars (no new CSS variables). */

/** Card ID — Geist Mono, `font/size/2xs`, `colour/text/secondary`. */
export const CARD_ID =
  "font-mono text-2xs font-normal leading-[var(--text-supporting-leading)] tracking-[-0.12px] text-secondary";

/** Card title — Inter semibold, `font/size/sm`, `--text-heading-5-leading`. */
export const CARD_TITLE =
  "text-sm font-semibold leading-[var(--text-heading-5-leading)] text-primary";

/** Card formula line — Geist Mono, `font/size/2xs`, secondary. */
export const CARD_FORMULA =
  "font-mono text-2xs font-normal leading-[var(--text-supporting-leading)] text-secondary";

/** Structure placeholder label — `font/size/3xs`, tertiary. */
export const CARD_MEDIA_LABEL =
  "text-center text-3xs font-normal leading-[var(--text-supporting-leading)] text-tertiary";

/** Metadata field label — `font/size/3xs`, tertiary. */
export const CARD_META_LABEL =
  "text-3xs font-normal leading-[var(--text-supporting-leading)] text-tertiary";

/** Metadata field value — `font/size/2xs`, primary. */
export const CARD_META_VALUE =
  "text-2xs font-medium leading-[var(--text-body-leading)] text-primary";

/** id + title + formula stack — Figma `space/1` between header lines. */
export const CARD_HEADER_STACK = "flex flex-col items-start gap-[length:var(--spacing-1)]";

/** Main text column beside structure media. */
export const CARD_BODY_COLUMN = "flex min-w-0 flex-1 flex-col";

/** Tag row below formula — Figma `space/4` top padding. */
export const CARD_TAGS_ROW =
  "flex flex-wrap gap-[length:var(--spacing-2)] pt-[length:var(--spacing-4)]";

/** Three-column metadata band below header row. */
export const CARD_META_GRID =
  "grid w-full grid-cols-1 gap-[length:var(--spacing-4)] sm:grid-cols-3";

/** Single metadata label/value pair. */
export const CARD_META_CELL = "flex flex-col gap-[length:var(--spacing-1)]";

/** Footer divider + actions — Figma card footer band. */
export const CARD_FOOTER =
  "mt-[length:var(--spacing-4)] flex w-full flex-wrap items-center justify-between gap-[length:var(--spacing-4)] border-t border-solid border-emphasized pt-[length:var(--spacing-4)]";

/** Left-side secondary actions (Save, Export). */
export const CARD_FOOTER_ACTIONS = "flex flex-wrap items-center gap-[length:var(--spacing-2)]";
