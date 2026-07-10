"use client";

import { MaNaReDIcon } from "../icons/manared-icon";
import {
  INTERACTIVE_CHIP_BAR_VIEW_SEGMENT,
  INTERACTIVE_CHIP_BAR_VIEW_SEGMENT_ACTIVE,
  INTERACTIVE_CHIP_BAR_VIEW_TOGGLE,
} from "../primitives/interactive-styles";
import type { ResultsViewMode } from "./results-view";

export type ViewToggleProps = {
  value: ResultsViewMode;
  onChange: (mode: ResultsViewMode) => void;
};

const VIEW_OPTIONS: { value: ResultsViewMode; label: string; icon: "card-view" | "list-view" }[] = [
  { value: "card", label: "Card view", icon: "card-view" },
  { value: "list", label: "List view", icon: "list-view" },
];

/** Icon-only card/list toggle for chip bar — UX §4.1 (`chip-bar/view-toggle`, Figma TBD). */
export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div role="group" aria-label="Results view" className={INTERACTIVE_CHIP_BAR_VIEW_TOGGLE}>
      {VIEW_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={
              isSelected
                ? INTERACTIVE_CHIP_BAR_VIEW_SEGMENT_ACTIVE
                : INTERACTIVE_CHIP_BAR_VIEW_SEGMENT
            }
          >
            <MaNaReDIcon name={option.icon} size={16} />
          </button>
        );
      })}
    </div>
  );
}
