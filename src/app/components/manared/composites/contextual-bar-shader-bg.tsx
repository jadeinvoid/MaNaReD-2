"use client";

import { moireContextBarParams, moireFill } from "../primitives/shaders/moire-fill";
import { ShaderSurface } from "../primitives/shader-surface";

/** Moire shader fill for contextual-bar (`360:2601`) — sits under the CSS gradient overlay. */
export function ContextualBarShaderBg() {
  return <ShaderSurface shader={moireFill} params={moireContextBarParams} />;
}
