"use client";

import { useEffect, useRef, useState } from "react";

import { Slider } from "@astryxdesign/core/Slider";

import { MW_MAX, MW_MIN } from "./filter-state";

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

function EndpointLabel({
  end,
  activeEnd,
  value,
  domainBound,
  align,
}: {
  end: "min" | "max";
  activeEnd: ActiveEnd;
  value: number;
  domainBound: number;
  align: "left" | "right";
}) {
  const isActive = activeEnd === end;
  const showDomainHint = value !== domainBound;

  return (
    <div
      className={`flex flex-col gap-0.5 ${align === "right" ? "items-end text-right" : "items-start"}`}
      data-active-end={isActive ? end : undefined}
    >
      <span className="text-3xs text-tertiary">{end === "min" ? "Min" : "Max"}</span>
      <span
        className={`text-3xs uppercase ${isActive ? "font-semibold text-primary" : "text-primary"}`}
      >
        {formatMolecularWeight(value)}
      </span>
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
      if (!(target instanceof HTMLElement) || target.getAttribute("role") !== "slider") {
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

  return (
    <div ref={panelRef} className="flex w-full flex-col gap-2 py-1" data-filter-range-panel>
      <div className="flex w-full items-start justify-between gap-2">
        <EndpointLabel
          end="min"
          activeEnd={activeEnd}
          value={value[0]}
          domainBound={min}
          align="left"
        />
        <EndpointLabel
          end="max"
          activeEnd={activeEnd}
          value={value[1]}
          domainBound={max}
          align="right"
        />
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
