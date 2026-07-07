"use client";

import { Slider } from "@astryxdesign/core/Slider";

import { MW_MAX, MW_MIN } from "./filter-state";

export type FilterRangePanelProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
};

/** Molecular weight range filter — UX §5 continuous numeric control. */
export function FilterRangePanel({
  value,
  onChange,
  min = MW_MIN,
  max = MW_MAX,
}: FilterRangePanelProps) {
  return (
    <div className="px-1">
      <Slider
        label="Molecular weight range"
        isLabelHidden
        value={value}
        min={min}
        max={max}
        step={10}
        valueDisplay="text"
        formatValue={(amount) => `${amount} Da`}
        onChange={(next: number | [number, number]) => {
          if (Array.isArray(next)) {
            onChange(next as [number, number]);
          }
        }}
      />
      <p className="mt-1 text-right text-3xs text-secondary">
        MW {value[0]}–{value[1]}
      </p>
    </div>
  );
}
