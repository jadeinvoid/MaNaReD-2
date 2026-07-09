"use client";

import { useEffect, useRef, useState } from "react";

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

type ActiveEnd = "min" | "max" | null;

function formatMolecularWeight(amount: number) {
  return `${amount} Da`;
}

function RangeEndpoint({
  end,
  activeEnd,
  value,
  domainBound,
  peerValue,
  domainMin,
  domainMax,
  align,
  onDraft,
  onCommit,
}: {
  end: "min" | "max";
  activeEnd: ActiveEnd;
  value: number;
  domainBound: number;
  peerValue: number;
  domainMin: number;
  domainMax: number;
  align: "left" | "right";
  onDraft: (next: [number, number]) => void;
  onCommit: (next: [number, number]) => void;
}) {
  const isActive = activeEnd === end;
  const showDomainHint = value !== domainBound;
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
    <div
      className="flex min-w-0 flex-1 flex-col gap-0.5"
      data-active-end={isActive ? end : undefined}
      data-range-end={end}
    >
      <span className={`text-3xs text-tertiary ${align === "right" ? "self-end" : "self-start"}`}>
        {end === "min" ? "Min" : "Max"}
      </span>
      <NumberInput
        className="filter-mw-range-input w-full min-w-0"
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
      {showDomainHint ? (
        <span className="text-3xs text-tertiary">{formatMolecularWeight(domainBound)}</span>
      ) : null}
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeEnd, setActiveEnd] = useState<ActiveEnd>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const endpoint = target.closest<HTMLElement>("[data-range-end]");
      if (endpoint?.dataset.rangeEnd === "min" || endpoint?.dataset.rangeEnd === "max") {
        setActiveEnd(endpoint.dataset.rangeEnd);
        return;
      }

      if (target.getAttribute("role") !== "slider") {
        return;
      }

      const label = target.getAttribute("aria-label") ?? "";
      if (label.includes("minimum")) {
        setActiveEnd("min");
      } else if (label.includes("maximum")) {
        setActiveEnd("max");
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const related = event.relatedTarget;
      if (!(related instanceof Node) || !panel.contains(related)) {
        setActiveEnd(null);
      }
    };

    panel.addEventListener("focusin", handleFocusIn);
    panel.addEventListener("focusout", handleFocusOut);

    return () => {
      panel.removeEventListener("focusin", handleFocusIn);
      panel.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const commitRange = (next: [number, number]) => {
    onChangeEnd?.(next);
  };

  return (
    <div ref={panelRef} className="flex w-full flex-col gap-2 py-1" data-filter-range-panel>
      <div className="flex w-full items-start gap-1">
        <RangeEndpoint
          end="min"
          activeEnd={activeEnd}
          value={value[0]}
          domainBound={min}
          peerValue={value[1]}
          domainMin={min}
          domainMax={max}
          align="left"
          onDraft={onChange}
          onCommit={commitRange}
        />
        <RangeEndpoint
          end="max"
          activeEnd={activeEnd}
          value={value[1]}
          domainBound={max}
          peerValue={value[0]}
          domainMin={min}
          domainMax={max}
          align="right"
          onDraft={onChange}
          onCommit={commitRange}
        />
      </div>
      <div className="px-2.5">
        <Slider
          label="Molecular weight range"
          isLabelHidden
          value={value}
          min={min}
          max={max}
          step={MW_RANGE_STEP}
          valueDisplay="none"
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
    </div>
  );
}
