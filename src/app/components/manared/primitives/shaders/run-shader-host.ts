import type { ShaderFrame, ShaderModule } from "./types";

type ShaderHost = {
  render: (params: Record<string, unknown>) => void;
  resize: () => void;
  destroy: () => void;
};

function readSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  return { width, height, dpr };
}

export async function createShaderHost(
  canvas: HTMLCanvasElement,
  shader: ShaderModule,
  initialParams: Record<string, unknown>,
): Promise<ShaderHost | null> {
  if (!("gpu" in navigator)) {
    return null;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    return null;
  }

  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu");
  if (!context) {
    return null;
  }

  const format = navigator.gpu.getPreferredCanvasFormat();
  const frame: ShaderFrame = {
    state: {},
    params: initialParams,
    output: {
      width: 1,
      height: 1,
      format,
      createView: () => context.getCurrentTexture().createView(),
    },
  };

  shader.setup(device, frame);

  const configure = (width: number, height: number) => {
    canvas.width = width;
    canvas.height = height;
    frame.output.width = width;
    frame.output.height = height;

    context.configure({
      device,
      format,
      alphaMode: "premultiplied",
    });
  };

  const { width, height } = readSize(canvas);
  configure(width, height);

  return {
    render(params) {
      frame.params = params;
      shader.render(device, frame);
    },
    resize() {
      const next = readSize(canvas);
      if (next.width !== frame.output.width || next.height !== frame.output.height) {
        configure(next.width, next.height);
      }
    },
    destroy() {
      device.destroy();
    },
  };
}
