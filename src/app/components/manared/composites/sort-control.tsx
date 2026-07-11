"use client";

import { usePopover } from "@astryxdesign/core/Popover";
import { VStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  INTERACTIVE_CHIP_BAR_CONTROL,
  INTERACTIVE_SORT_DROPDOWN_ROW,
} from "../primitives/interactive-styles";
import { SURFACE_SEARCH_DROPDOWN } from "../primitives/surface-styles";
import type { BrowseEntity } from "./entity-nav";
import {
  DEFAULT_SORT_BY_ENTITY,
  SORT_OPTIONS_BY_ENTITY,
  getSortOptionLabel,
  type SortOptionId,
} from "./sort-state";

export type SortControlProps = {
  entity?: BrowseEntity;
  value?: SortOptionId;
  onChange?: (value: SortOptionId) => void;
};

const SORT_ROW = `flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-3xs focus-visible:outline-none ${INTERACTIVE_SORT_DROPDOWN_ROW}`;

/** Chip-bar sort trigger + entity-aware option menu (UX browse mode). */
export function SortControl({ entity = "compounds", value, onChange }: SortControlProps) {
  const resolvedValue = value ?? DEFAULT_SORT_BY_ENTITY[entity];
  const options = SORT_OPTIONS_BY_ENTITY[entity];
  const selectedLabel = getSortOptionLabel(entity, resolvedValue);
  const popover = usePopover({
    dialogLabel: "Sort results",
    hasSurface: false,
    closeButtonLabel: "Close sort menu",
  });

  return (
    <>
      <button
        type="button"
        ref={popover.triggerRef}
        onClick={popover.toggle}
        className={INTERACTIVE_CHIP_BAR_CONTROL}
        aria-label={`Sort by: ${selectedLabel}`}
        {...popover.triggerProps}
      >
        <span className="text-secondary">Sort by:</span>
        <span className="text-primary">{selectedLabel}</span>
        <MaNaReDIcon name="arrow-down" size={16} />
      </button>
      {popover.render(
        <div
          className={`min-w-48 overflow-visible p-1 ${SURFACE_SEARCH_DROPDOWN}`}
          role="listbox"
          aria-label="Sort options"
        >
          <VStack gap={0} className="overflow-visible">
            {options.map((option) => {
              const isSelected = resolvedValue === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${SORT_ROW} ${isSelected ? "bg-button-active text-primary" : "text-secondary"}`}
                  onClick={() => {
                    onChange?.(option.id);
                    popover.hide();
                  }}
                >
                  <span>{option.label}</span>
                  {option.directionIcon ? (
                    <MaNaReDIcon
                      name={option.directionIcon === "up" ? "arrow-up" : "arrow-down"}
                      size={16}
                    />
                  ) : null}
                </button>
              );
            })}
          </VStack>
        </div>,
        { placement: "below", alignment: "start" },
      )}
    </>
  );
}
