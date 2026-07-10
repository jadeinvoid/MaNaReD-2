import { ENTITY_TAG_BASE } from "./entity-styles";

/** Outer hit target — horizontal space.1 inset; vertical spacing from panel gap. */
export const FILTER_COMPOUND_TAG_HIT = "px-1 py-0";

/** Shared pill shell — colours resolved in manaredElevation.css for light/dark parity. */
export const FILTER_COMPOUND_TAG_PILL = `${ENTITY_TAG_BASE} filter-compound-tag-pill rounded-lg border border-solid`;

/** Selected filter tag — Figma compound-tag `state=default`. */
export const FILTER_COMPOUND_TAG_SELECTED = `${FILTER_COMPOUND_TAG_PILL} filter-compound-tag-pill--selected`;

/** Unselected filter tag — Figma compound-tag `state=disabled`. */
export const FILTER_COMPOUND_TAG_UNSELECTED = `${FILTER_COMPOUND_TAG_PILL} filter-compound-tag-pill--unselected`;

/** Zero-count facet — non-interactive unselected styling with reduced emphasis. */
export const FILTER_COMPOUND_TAG_ZERO_COUNT = `${FILTER_COMPOUND_TAG_UNSELECTED} filter-compound-tag-pill--zero-count opacity-60`;

/** Interactive shell for selectable tags. */
export const FILTER_COMPOUND_TAG_BUTTON =
  "hover:opacity-90 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-entity-compound-border";
