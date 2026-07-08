"use client";

import { Slider } from "@astryxdesign/core/Slider";

import { MW_MAX, MW_MIN } from "./filter-state";

export type FilterRangePanelProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
};

function formatMolecularWeight(amount: number) {
  return `${amount} Da`;
}

/** Molecular weight range filter — UX §5 continuous numeric control. */
export function FilterRangePanel({
  value,
  onChange,
  min = MW_MIN,
  max = MW_MAX,
}: FilterRangePanelProps) {
  return (
    <div className="flex w-full flex-col gap-2 py-1">
      <div className="flex w-full items-start">
        <span className="text-3xs uppercase text-primary">{formatMolecularWeight(value[0])}</span>
        <span className="min-w-0 flex-1" aria-hidden />
        <span className="text-3xs uppercase text-primary">{formatMolecularWeight(value[1])}</span>
      </div>
      <div className="px-2.5">
        <Slider
          label="Molecular weight range"
          isLabelHidden
          value={value}
          min={min}
          max={max}
          step={10}
          valueDisplay="none"
          width="100%"
          minStepsBetweenThumbs={1}
          formatValue={formatMolecularWeight}
          onChange={(next: number | [number, number]) => {
            if (Array.isArray(next)) {
              onChange(next as [number, number]);
            }
          }}
        />
      </div>
    </div>
  );
}
