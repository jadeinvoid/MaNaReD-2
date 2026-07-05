"use client";

import { Theme } from "@astryxdesign/core/theme";

import { manaredTheme } from "@/app/theme/manared";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Theme theme={manaredTheme}>{children}</Theme>;
}
