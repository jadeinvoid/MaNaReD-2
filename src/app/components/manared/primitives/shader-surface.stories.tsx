import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { moireContextBarParams, moireFill } from "./shaders/moire-fill";
import { SHADER_SURFACE_LAYER } from "./shader-styles";
import { ShaderSurface } from "./shader-surface";

const meta = {
  title: "MaNaReD/Primitives/ShaderSurface",
  component: ShaderSurface,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ShaderSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MoireFill: Story = {
  args: {
    shader: moireFill,
    params: moireContextBarParams,
    className: "relative h-[200px] w-full",
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector("canvas");
    if (!canvas) {
      // WebGPU may be unavailable in the test browser — gradient fallback is acceptable.
      return;
    }

    await expect(canvas.classList.contains(SHADER_SURFACE_LAYER)).toBe(true);
    const canvasStyle = getComputedStyle(canvas);
    await expect(canvasStyle.position).toBe("absolute");
  },
};

export const WithContent: Story = {
  render: (args) => (
    <section className="relative h-[200px] w-full overflow-clip bg-[#f2faff]">
      <ShaderSurface {...args} />
      <div className="relative z-10 flex h-full items-end px-4 py-2">
        <p className="font-mono text-sm text-[#1c1b18]">Halichondrin B</p>
      </div>
    </section>
  ),
  args: {
    shader: moireFill,
    params: moireContextBarParams,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
  },
};
