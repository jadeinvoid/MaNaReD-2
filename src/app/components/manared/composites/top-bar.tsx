"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { INTERACTIVE_TOPBAR_UTILITY_LINK } from "../primitives/interactive-styles";
import { SURFACE_TOP_BAR } from "../primitives/surface-styles";
import { SearchBar } from "./search-bar";
import { SearchDropdown } from "./search-dropdown";

const utilityLinks = ["Tools", "Resources", "Help"] as const;

export type TopBarState = "collapsed" | "extended";

export type TopBarProps = {
  state?: TopBarState;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onStateChange?: (state: TopBarState) => void;
  leadingContent?: ReactNode;
  searchAccessory?: ReactNode;
};

function UtilityLinks() {
  return (
    <HStack vAlign="center" className="shrink-0 gap-12 px-6">
      {utilityLinks.map((link) => (
        <button
          key={link}
          type="button"
          className={`text-[length:var(--font-size-xs)] font-semibold text-primary ${INTERACTIVE_TOPBAR_UTILITY_LINK}`}
        >
          {link}
        </button>
      ))}
    </HStack>
  );
}

/** Top application bar from Figma `top-bar` (`340:3751`). */
export function TopBar({
  state: controlledState,
  searchValue,
  onSearchChange,
  onStateChange,
  leadingContent,
  searchAccessory,
}: TopBarProps) {
  const [internalState, setInternalState] = useState<TopBarState>("collapsed");
  const state = controlledState ?? internalState;
  const searchRegionRef = useRef<HTMLDivElement>(null);

  const setState = (next: TopBarState) => {
    setInternalState(next);
    onStateChange?.(next);
  };

  useEffect(() => {
    if (state !== "extended") {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (searchRegionRef.current?.contains(event.target as Node)) {
        return;
      }
      setInternalState("collapsed");
      onStateChange?.("collapsed");
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [state, onStateChange]);

  return (
    <header className={`relative ${SURFACE_TOP_BAR}`}>
      <div className="flex h-14 items-center gap-4 px-6 py-2">
        {leadingContent}
        <div ref={searchRegionRef} className="relative flex min-w-0 flex-1 items-center gap-2">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onFocus={() => setState("extended")}
            className="min-w-0 flex-1"
          />
          {searchAccessory}
          {state === "extended" ? (
            <SearchDropdown className="absolute top-full right-0 left-0 z-10 mt-1" />
          ) : null}
        </div>
        <UtilityLinks />
        <MaNaReDIcon name="profile" size={32} label="Profile" />
      </div>
    </header>
  );
}

export { UtilityLinks };
