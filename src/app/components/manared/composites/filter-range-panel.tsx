"use client";

import { NumberInput } from "@astryxdesign/core/NumberInput";
import { Slider } from "@astryxdesign/core/Slider";

import { clampMwRange, MW_MAX, MW_MIN, MW_RANGE_STEP } from "./filter-state";

export type FilterRangePanelProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onChangeEnd?: (value: [number, number]) => void;
  min?: number;
  max?: number;
};

function formatMolecularWeight(amount: number) {
  return `${amount} Da`;
}

function RangeEndpoint({
  end,
  value,
  peerValue,
  domainMin,
  domainMax,
  onDraft,
  onCommit,
}: {
  end: "min" | "max";
  value: number;
  peerValue: number;
  domainMin: number;
  domainMax: number;
  onDraft: (next: [number, number]) => void;
  onCommit: (next: [number, number]) => void;
}) {
  const label = end === "min" ? "Minimum molecular weight" : "Maximum molecular weight";
  const inputMin = end === "min" ? domainMin : peerValue + MW_RANGE_STEP;
  const inputMax = end === "max" ? domainMax : peerValue - MW_RANGE_STEP;

  const handleChange = (next: number) => {
    const draft =
      end === "min"
        ? clampMwRange([next, peerValue], [domainMin, domainMax])
        : clampMwRange([peerValue, next], [domainMin, domainMax]);
    onDraft(draft);
  };

  const handleBlur = () => {
    const committed =
      end === "min"
        ? clampMwRange([value, peerValue], [domainMin, domainMax])
        : clampMwRange([peerValue, value], [domainMin, domainMax]);
    onCommit(committed);
  };

  return (
    <div className="filter-mw-range-end min-w-0" data-range-end={end}>
      <NumberInput
        className="filter-mw-range-input"
        label={label}
        isLabelHidden
        size="sm"
        value={value}
        min={inputMin}
        max={inputMax}
        step={MW_RANGE_STEP}
        units="Da"
        isIntegerOnly
        width="100%"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

/** Molecular weight range filter — UX §5 continuous numeric control. */
export function FilterRangePanel({
  value,
  onChange,
  onChangeEnd,
  min = MW_MIN,
  max = MW_MAX,
}: FilterRangePanelProps) {
  const commitRange = (next: [number, number]) => {
    onChangeEnd?.(next);
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 py-1" data-filter-range-panel>
      <div className="filter-mw-slider">
        <Slider
          label="Molecular weight range"
          isLabelHidden
          value={value}
          min={min}
          max={max}
          step={MW_RANGE_STEP}
          valueDisplay="tooltip"
          width="100%"
          minStepsBetweenThumbs={1}
          formatValue={formatMolecularWeight}
          onChange={(next: number | [number, number]) => {
            if (Array.isArray(next)) {
              onChange(next as [number, number]);
            }
          }}
          onChangeEnd={(next: number | [number, number]) => {
            if (Array.isArray(next)) {
              onChangeEnd?.(next as [number, number]);
            }
          }}
        />
      </div>
      <div className="filter-mw-inputs flex w-full min-w-0 max-w-full items-center justify-center">
        <RangeEndpoint
          end="min"
          value={value[0]}
          peerValue={value[1]}
          domainMin={min}
          domainMax={max}
          onDraft={onChange}
          onCommit={commitRange}
        />
        <span aria-hidden="true" className="filter-mw-input-separator">
          –
        </span>
        <RangeEndpoint
          end="max"
          value={value[1]}
          peerValue={value[0]}
          domainMin={min}
          domainMax={max}
          onDraft={onChange}
          onCommit={commitRange}
        />
      </div>
    </div>
  );
}
