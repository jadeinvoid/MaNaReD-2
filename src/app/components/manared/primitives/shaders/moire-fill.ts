import type { ShaderFrame, ShaderModule } from "./types";

/** Figma Moire fill — fine intersecting gratings on a pale base (context-bar `360:2601`). */

const WGSL = `
struct Uniforms {
  frameData: vec4f,
  moireData: vec4f,
  baseColor: vec4f,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

struct VsIn {
  @location(0) pos: vec2f,
  @location(1) uv: vec2f,
};
struct VsOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex fn vs_main(in: VsIn) -> VsOut {
  var out: VsOut;
  out.position = vec4f(in.pos, 0.0, 1.0);
  out.uv = in.uv;
  return out;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let dims = max(u.frameData.yz, vec2f(1.0));
  let p = uv * dims;
  let frequency = u.moireData.x;
  let angle = radians(u.moireData.y);
  let contrast = u.moireData.z;
  let lineSoftness = u.moireData.w;

  let dir1 = vec2f(cos(angle), sin(angle));
  let dir2 = vec2f(cos(angle + 1.5708), sin(angle + 1.5708));
  let wave1 = sin(dot(p, dir1) * frequency);
  let wave2 = sin(dot(p, dir2) * frequency * 1.03);
  let moire = wave1 * wave2;

  let grain = sin(p.x * frequency * 2.4) * sin(p.y * frequency * 0.18);
  let pattern = mix(moire, grain, 0.35);
  let line = smoothstep(-lineSoftness, lineSoftness, pattern);

  let base = u.baseColor.rgb;
  let shaded = base + vec3f((line - 0.5) * contrast);
  return vec4f(clamp(shaded, vec3f(0.0), vec3f(1.0)), 1.0);
}
`;

function finiteNumber(value: unknown, fallback: number) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function colorParam(value: unknown, fallback: [number, number, number]) {
  const color = (value ?? {}) as { r?: number; g?: number; b?: number };
  return [
    finiteNumber(color.r, fallback[0]),
    finiteNumber(color.g, fallback[1]),
    finiteNumber(color.b, fallback[2]),
  ] as const;
}

function setupPipeline(device: GPUDevice, frame: ShaderFrame) {
  const module = device.createShaderModule({ code: WGSL });

  const quad = device.createBuffer({
    size: 6 * 4 * 4,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(quad.getMappedRange()).set([
    -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 1, 1, 1, 1, 1, 0,
  ]);
  quad.unmap();

  const uniformBuf = device.createBuffer({
    size: 48,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  frame.state.module = module;
  frame.state.quad = quad;
  frame.state.uniformBuf = uniformBuf;
  frame.state.pipeline = null;
  frame.state.pipelineFormat = null;
}

function ensurePipeline(device: GPUDevice, frame: ShaderFrame, format: GPUTextureFormat) {
  if (frame.state.pipeline != null && frame.state.pipelineFormat === format) {
    return frame.state.pipeline as GPURenderPipeline;
  }

  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: frame.state.module as GPUShaderModule,
      entryPoint: "vs_main",
      buffers: [
        {
          arrayStride: 16,
          attributes: [
            { shaderLocation: 0, format: "float32x2", offset: 0 },
            { shaderLocation: 1, format: "float32x2", offset: 8 },
          ],
        },
      ],
    },
    fragment: {
      module: frame.state.module as GPUShaderModule,
      entryPoint: "fs_main",
      targets: [{ format }],
    },
    primitive: { topology: "triangle-list" },
  });

  frame.state.pipeline = pipeline;
  frame.state.pipelineFormat = format;
  return pipeline;
}

export const moireFill: ShaderModule = {
  setup(device, frame) {
    setupPipeline(device, frame);
  },
  render(device, frame) {
    const params = frame.params;
    const width = Math.max(1, frame.output.width);
    const height = Math.max(1, frame.output.height);
    const [r, g, b] = colorParam(params.baseColor, [0.949, 0.98, 1.0]);

    device.queue.writeBuffer(
      frame.state.uniformBuf as GPUBuffer,
      0,
      new Float32Array([
        0,
        width,
        height,
        0,
        finiteNumber(params.frequency, 0.045),
        finiteNumber(params.angle, 8),
        finiteNumber(params.contrast, 0.14),
        finiteNumber(params.lineSoftness, 0.22),
        r,
        g,
        b,
        1,
      ]),
    );

    const pipeline = ensurePipeline(device, frame, frame.output.format);
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: frame.state.uniformBuf as GPUBuffer } }],
    });

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: frame.output.createView(),
          loadOp: "clear",
          clearValue: { r: r, g: g, b: b, a: 1 },
          storeOp: "store",
        },
      ],
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.setVertexBuffer(0, frame.state.quad as GPUBuffer);
    pass.draw(6);
    pass.end();
    device.queue.submit([encoder.finish()]);
  },
};

/** Default params tuned for contextual-bar light mode (`360:2601`). */
export const moireContextBarParams = {
  baseColor: { r: 0.949, g: 0.98, b: 1.0 },
  frequency: 0.045,
  angle: 8,
  contrast: 0.22,
  lineSoftness: 0.18,
} as const;
