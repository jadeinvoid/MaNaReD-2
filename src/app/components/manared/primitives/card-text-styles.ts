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

/** Metadata field label — Figma `card-information-label` (11px tertiary). */
export const CARD_META_LABEL = "text-[11px] font-normal leading-normal text-tertiary";

/** Metadata field value — Figma `card-information-label` content (13px primary). */
export const CARD_META_VALUE = "text-[13px] font-normal leading-normal text-primary";

/** id + title + formula stack — Figma `space/1` between header lines. */
export const CARD_HEADER_STACK = "flex flex-col items-start gap-[length:var(--spacing-1)]";

/** Main text column beside structure media — stacks header, tags, metadata. */
export const CARD_BODY_COLUMN = "flex min-w-0 flex-1 flex-col gap-[length:var(--spacing-2)]";

/** Top band — picture column + body column (`351:3721`). */
export const CARD_INFO_ROW = "flex w-full items-stretch gap-[length:var(--spacing-2)]";

/** Tag row below formula — Figma `space/2` chip gap. */
export const CARD_TAGS_ROW = "flex flex-wrap gap-[length:var(--spacing-2)]";

/** Divider above metadata inside the body column (`351:3732`). */
export const CARD_META_DIVIDER = "w-full border-0 border-t border-solid border-emphasized";

/** Metadata band — Figma `space/8` horizontal gap, right of picture (`351:3733`). */
export const CARD_META_ROW = "flex flex-wrap items-center gap-[length:var(--spacing-8)]";

/** Divider between info band and footer (`351:3737`). */
export const CARD_SECTION_DIVIDER = "w-full border-0 border-t border-solid border-emphasized";

/** Single metadata label/value pair — Figma 2px gap. */
export const CARD_META_CELL = "flex flex-col gap-0.5";

/** Footer actions row — Figma `space/2` gap with trailing spacer (`351:3738`). */
export const CARD_FOOTER = "flex w-full items-center gap-[length:var(--spacing-2)]";
