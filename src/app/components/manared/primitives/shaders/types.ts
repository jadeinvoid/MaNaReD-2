/** Minimal WebGPU shader host contract (mirrors Figma shader export shape). */

export type ShaderOutput = {
  width: number;
  height: number;
  format: GPUTextureFormat;
  createView: () => GPUTextureView;
};

export type ShaderFrame = {
  state: Record<string, unknown>;
  params: Record<string, unknown>;
  output: ShaderOutput;
};

export type ShaderModule = {
  setup: (device: GPUDevice, frame: ShaderFrame) => void;
  render: (device: GPUDevice, frame: ShaderFrame) => void;
};
