"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { createShaderHost } from "./shaders/run-shader-host";
import type { ShaderModule } from "./shaders/types";
import { SHADER_SURFACE_LAYER } from "./shader-styles";

export type ShaderSurfaceProps = {
  shader: ShaderModule;
  params?: Record<string, unknown>;
  className?: string;
  fallback?: ReactNode;
};

export function ShaderSurface({
  shader,
  params = {},
  className = "",
  fallback = null,
}: ShaderSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef(params);
  const [supported, setSupported] = useState<boolean | null>(null);

  paramsRef.current = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let host: Awaited<ReturnType<typeof createShaderHost>> | null = null;
    let cancelled = false;
    let frameId = 0;

    void createShaderHost(canvas, shader, paramsRef.current).then((nextHost) => {
      if (cancelled) {
        nextHost?.destroy();
        return;
      }

      if (!nextHost) {
        setSupported(false);
        return;
      }

      host = nextHost;
      setSupported(true);

      const tick = () => {
        host?.render(paramsRef.current);
        frameId = requestAnimationFrame(tick);
      };
      tick();
    });

    const resizeObserver = new ResizeObserver(() => {
      host?.resize();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      host?.destroy();
    };
  }, [shader]);

  if (supported === false) {
    return fallback;
  }

  return (
    <canvas ref={canvasRef} className={`${SHADER_SURFACE_LAYER} ${className}`.trim()} aria-hidden />
  );
}
