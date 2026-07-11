import type { ReactNode } from "react";

import { ContextualBarShaderBg } from "./contextual-bar-shader-bg";
import { GRADIENT_CONTEXT_BAR } from "../primitives/gradient-styles";

export type ContextualBarProps = {
  children: ReactNode;
  className?: string;
};

/** Contextual header band from Figma `contextual-bar` (`360:2601` / `360:2602`). */
export function ContextualBar({ children, className = "" }: ContextualBarProps) {
  return (
    <section className={`${GRADIENT_CONTEXT_BAR} px-4 py-2 ${className}`.trim()}>
      <ContextualBarShaderBg />
      {children}
    </section>
  );
}
