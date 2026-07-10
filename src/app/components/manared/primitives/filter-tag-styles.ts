import { ENTITY_TAG_BASE, entityClassNames } from "./entity-styles";

const COMPOUND = entityClassNames.compound;

/** Outer hit target — Figma compound-tag wrapper padding space.1. */
export const FILTER_COMPOUND_TAG_HIT = "p-1";

/** Selected filter tag — Figma compound-tag `state=default`. */
export const FILTER_COMPOUND_TAG_SELECTED = `${ENTITY_TAG_BASE} rounded-lg ${COMPOUND.combined} text-primary`;

/**
 * Unselected filter tag — Figma compound-tag `state=disabled`.
 * Cream dropdown-active fill with light compound border and tertiary label.
 */
export const FILTER_COMPOUND_TAG_UNSELECTED = `${ENTITY_TAG_BASE} rounded-lg border-entity-compound-bg bg-dropdown-active text-tertiary`;

/** Zero-count facet — non-interactive unselected styling with reduced emphasis. */
export const FILTER_COMPOUND_TAG_ZERO_COUNT = `${FILTER_COMPOUND_TAG_UNSELECTED} opacity-60`;

/** Interactive shell for selectable tags. */
export const FILTER_COMPOUND_TAG_BUTTON =
  "hover:opacity-90 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-entity-compound-border";
