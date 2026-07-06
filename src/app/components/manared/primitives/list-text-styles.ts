/** MaNaReD list row typography — Figma `list-id`, `list-title`, `list-label` (203:1355–203:1278). */

/** Compact ID — Geist Mono, `colour/text/secondary`, `font/size/3xs`. */
export const LIST_TEXT_ID =
  "font-mono text-3xs font-normal leading-normal tracking-[-0.12px] text-secondary";

/** Primary title — Inter semibold, `colour/text/primary`, `font/size/xs`. */
export const LIST_TEXT_TITLE = "text-xs font-semibold leading-normal text-primary";

/** Trailing metadata — Inter regular, `colour/text/tertiary`, `space/2` padding, 80% opacity. */
export const LIST_TEXT_LABEL =
  "inline-flex items-center gap-1 p-[length:var(--spacing-2)] text-3xs font-normal leading-normal text-tertiary opacity-80";

/** list-id + list-title stack — Figma `352:4034` padding `space/1`; gap applied via `--spacing-1` inline. */
export const LIST_ROW_TEXT_STACK = "flex shrink-0 flex-col items-start p-1";
