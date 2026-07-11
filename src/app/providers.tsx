"use client";

import { Theme } from "@astryxdesign/core/theme";
import type { ThemeMode } from "@astryxdesign/core/theme";

import { manaredTheme } from "@/app/theme/manared";

export function Providers({
  children,
  mode = "system",
}: {
  children: React.ReactNode;
  mode?: ThemeMode;
}) {
  return (
    <Theme theme={manaredTheme} mode={mode}>
      {children}
    </Theme>
  );
}
