/** Minimal WebGPU DOM typings for shader surfaces (not yet in default lib.dom). */

interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
  getPreferredCanvasFormat(): GPUTextureFormat;
}

interface Navigator {
  readonly gpu: GPU;
}

interface HTMLCanvasElement {
  getContext(contextId: "webgpu"): GPUCanvasContext | null;
}

interface GPUCanvasContext {
  configure(configuration: GPUCanvasConfiguration): void;
  getCurrentTexture(): GPUTexture;
}

interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  alphaMode?: GPUCanvasAlphaMode;
}

type GPUCanvasAlphaMode = "opaque" | "premultiplied";

declare const GPUBufferUsage: {
  readonly VERTEX: number;
  readonly UNIFORM: number;
  readonly COPY_DST: number;
};
