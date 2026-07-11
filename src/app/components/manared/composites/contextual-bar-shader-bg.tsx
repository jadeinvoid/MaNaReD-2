"use client";

import { moireContextBarParams, moireFill } from "../primitives/shaders/moire-fill";
import { SHADER_MOIRE_FALLBACK, SHADER_SURFACE_LAYER } from "../primitives/shader-styles";
import { ShaderSurface } from "../primitives/shader-surface";

/** Moire shader fill for contextual-bar (`360:2601`) — sits under the CSS gradient overlay. */
export function ContextualBarShaderBg() {
  return (
    <ShaderSurface
      shader={moireFill}
      params={moireContextBarParams}
      fallback={<div className={`${SHADER_SURFACE_LAYER} ${SHADER_MOIRE_FALLBACK}`} aria-hidden />}
    />
  );
}
