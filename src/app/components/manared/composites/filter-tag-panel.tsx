"use client";

import { ENTITY_TAG_BASE, entityClassNames } from "../primitives/entity-styles";

export type FilterTagPanelProps = {
  tags: readonly string[];
  selected: string[];
  onToggle: (tag: string) => void;
};

const COMPOUND = entityClassNames.compound;

/** Bioactivity tag multi-select — Figma `tag-dropdown` (166:998), compound entity styling. */
export function FilterTagPanel({ tags, selected, onToggle }: FilterTagPanelProps) {
  return (
    <div className="flex flex-wrap justify-end gap-0 rounded-md p-1">
      {tags.map((tag) => {
        const isSelected = selected.includes(tag);
        const className = isSelected
          ? `${ENTITY_TAG_BASE} rounded-lg ${COMPOUND.combined}`
          : `${ENTITY_TAG_BASE} rounded-lg border-border-secondary bg-body text-tertiary`;

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(tag)}
            className="p-1"
          >
            <span className={className}>{tag}</span>
          </button>
        );
      })}
    </div>
  );
}
