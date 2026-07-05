import type { ReactNode } from "react";

type BlockStoryProps = {
  children: ReactNode;
  /** Use padded canvas for compact blocks; fullscreen for AppShell-style demos. */
  padded?: boolean;
};

/** Standard wrapper for Astryx CLI block template demos in Storybook. */
export function BlockStory({ children, padded = true }: BlockStoryProps) {
  if (!padded) {
    return <>{children}</>;
  }

  return <div className="min-h-[120px] p-6">{children}</div>;
}
