"use client";

import { SegmentedControl } from "@astryxdesign/core/SegmentedControl";
import { SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";

export type BrowseEntity = "compounds" | "organisms" | "regions";

const ENTITY_OPTIONS: { value: BrowseEntity; label: string }[] = [
  { value: "compounds", label: "Compounds" },
  { value: "organisms", label: "Organisms" },
  { value: "regions", label: "Regions" },
];

export type EntityNavProps = {
  value?: BrowseEntity;
  onChange?: (entity: BrowseEntity) => void;
  layout?: "hug" | "fill";
  className?: string;
};

/** Entity switcher — UX §11 segmented control (not in Figma top-bar frame). */
export function EntityNav({
  value = "compounds",
  onChange,
  layout = "hug",
  className = "",
}: EntityNavProps) {
  return (
    <SegmentedControl
      label="Browse entity"
      value={value}
      onChange={(next) => onChange?.(next as BrowseEntity)}
      layout={layout}
      className={className}
    >
      {ENTITY_OPTIONS.map((option) => (
        <SegmentedControlItem key={option.value} value={option.value} label={option.label} />
      ))}
    </SegmentedControl>
  );
}
