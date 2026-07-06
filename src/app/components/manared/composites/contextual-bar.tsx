import type { ReactNode } from "react";

import { GRADIENT_CONTEXT_BAR } from "../primitives/gradient-styles";

export type ContextualBarProps = {
  children: ReactNode;
  className?: string;
};

/** Contextual header band from Figma `contextual-bar` (`360:2601` / `360:2602`). */
export function ContextualBar({ children, className = "" }: ContextualBarProps) {
  return (
    <section
      className={`${GRADIENT_CONTEXT_BAR} border-b border-emphasized px-6 py-4 ${className}`.trim()}
    >
      {children}
    </section>
  );
}
