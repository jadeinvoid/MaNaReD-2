"use client";

import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon } from "../icons/manared-icon";
import { Chip } from "../primitives/chip";
import type { EntityType } from "../primitives/entity-styles";
import { GRADIENT_DROPDOWN_SELECT } from "../primitives/gradient-styles";
import {
  INTERACTIVE_ACTIVE_CHIP,
  INTERACTIVE_PROVENANCE_TEXT,
} from "../primitives/interactive-styles";
import { SURFACE_SEARCH_DROPDOWN } from "../primitives/surface-styles";

export type SearchSuggestion = {
  id: string;
  title: string;
  entity?: EntityType;
  entityLabel?: string;
  count?: string;
  isBestMatch?: boolean;
};

export const MOCK_SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    id: "best",
    title: "Sponge (Porifera)",
    isBestMatch: true,
    count: "1,240 compounds",
  },
  {
    id: "org-1",
    title: "Sponge-associated bacteria",
    entity: "organism",
    entityLabel: "Organism",
    count: "87",
  },
  {
    id: "cmp-1",
    title: "Sponge-associated bacteria",
    entity: "compound",
    entityLabel: "Compound Class",
    count: "340",
  },
];

export type SearchDropdownProps = {
  suggestions?: SearchSuggestion[];
  onSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
};

function Divider() {
  return <div className="h-2 w-full border-t border-border-secondary" role="separator" />;
}

function SuggestionRow({
  suggestion,
  onSelect,
}: {
  suggestion: SearchSuggestion;
  onSelect?: (suggestion: SearchSuggestion) => void;
}) {
  const iconName = suggestion.entity === "compound" ? "compound" : "organism";

  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-left hover:bg-dropdown-hover focus-visible:bg-dropdown-focus focus-visible:outline-none"
      onClick={() => onSelect?.(suggestion)}
    >
      <MaNaReDIcon name={iconName} size={16} className="shrink-0" />
      <Text size="3xs" color="primary" className="shrink-0">
        {suggestion.title}
      </Text>
      <span className="flex-1" />
      {suggestion.entityLabel && suggestion.entity ? (
        <Chip label={suggestion.entityLabel} entity={suggestion.entity} />
      ) : null}
      {suggestion.count ? (
        <span className={`w-6 shrink-0 text-center ${INTERACTIVE_PROVENANCE_TEXT}`}>
          {suggestion.count}
        </span>
      ) : null}
    </button>
  );
}

/** Search typeahead panel from Figma `drop-down` (`340:3669`). */
export function SearchDropdown({
  suggestions = MOCK_SEARCH_SUGGESTIONS,
  onSelect,
  className = "",
}: SearchDropdownProps) {
  const bestMatch = suggestions.find((item) => item.isBestMatch);
  const alsoMatches = suggestions.filter((item) => !item.isBestMatch);

  return (
    <div className={`${SURFACE_SEARCH_DROPDOWN} ${className}`.trim()} role="listbox">
      {bestMatch ? (
        <HStack
          gap={2}
          vAlign="center"
          className={`${GRADIENT_DROPDOWN_SELECT} overflow-hidden rounded-md px-2 py-1`}
        >
          <MaNaReDIcon name="organism" size={16} className="shrink-0" />
          <Text size="3xs" color="primary" className="shrink-0">
            {bestMatch.title}
          </Text>
          <span className="flex-1" />
          <span className={INTERACTIVE_ACTIVE_CHIP}>best match</span>
          {bestMatch.count ? (
            <span className={INTERACTIVE_PROVENANCE_TEXT}>{bestMatch.count}</span>
          ) : null}
        </HStack>
      ) : null}

      <Divider />

      <VStack gap={2} className="px-2 py-1">
        <Text size="3xs" weight="semibold" color="primary">
          Also Matches:
        </Text>
        <VStack gap={2} className="py-1">
          {alsoMatches.map((suggestion) => (
            <SuggestionRow key={suggestion.id} suggestion={suggestion} onSelect={onSelect} />
          ))}
        </VStack>
      </VStack>

      <Divider />

      <HStack gap={2} vAlign="center" className="px-1 py-1 text-3xs text-primary">
        <HStack gap={2} vAlign="center">
          <MaNaReDIcon name="chevron-up" size={16} className="shrink-0" />
          <span>navigate</span>
        </HStack>
        <span className="text-tertiary">·</span>
        <HStack gap={2} vAlign="center">
          <MaNaReDIcon name="chevron-right" size={12} className="shrink-0" />
          <span>select</span>
        </HStack>
        <span className="flex-1" />
        <HStack gap={2} vAlign="center">
          <MaNaReDIcon name="chevron-right" size={12} className="shrink-0" />
          <span>search all</span>
        </HStack>
      </HStack>
    </div>
  );
}
