import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import { GRADIENT_CONTEXT_BAR } from "../primitives/gradient-styles";
import { SHADER_MOIRE_FALLBACK, SHADER_SURFACE_LAYER } from "../primitives/shader-styles";
import { TaxonomyBreadcrumb } from "./taxonomy-breadcrumb";
import { ContextualBar } from "./contextual-bar";

const FIGMA_CONTEXT_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=360-2601";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  const frameStyle: CSSProperties = {
    colorScheme: mode,
    padding: "1.5rem",
    borderRadius: "var(--radius-container)",
    border: "1px solid var(--color-border-emphasized)",
    backgroundColor: "var(--color-background-body)",
  };

  return (
    <div style={frameStyle} data-colour-mode={mode}>
      {children}
    </div>
  );
}

const meta = {
  title: "MaNaReD/Composites/ContextualBar",
  component: ContextualBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CONTEXT_BAR },
  },
} satisfies Meta<typeof ContextualBar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertContextualBarLayout(canvasElement: HTMLElement) {
  const bar = canvasElement.querySelector(`.${GRADIENT_CONTEXT_BAR}`);
  if (!bar) {
    throw new Error("ContextualBar gradient surface not found");
  }

  const barStyle = getComputedStyle(bar);
  await expect(barStyle.height, "contextual bar should be 200px tall").toBe("200px");
  await expect(barStyle.display, "contextual bar should use flex layout").toBe("flex");
  await expect(barStyle.justifyContent, "contextual bar content should align to bottom").toBe(
    "flex-end",
  );
  await expect(barStyle.alignItems, "contextual bar content should align to left").toBe(
    "flex-start",
  );
}

async function assertContextualBarShader(canvasElement: HTMLElement) {
  const bar = canvasElement.querySelector(`.${GRADIENT_CONTEXT_BAR}`);
  if (!bar) {
    throw new Error("ContextualBar gradient surface not found");
  }

  const layer = bar.querySelector(
    `canvas.${SHADER_SURFACE_LAYER}, .${SHADER_SURFACE_LAYER}.${SHADER_MOIRE_FALLBACK}`,
  );
  if (layer) {
    const layerStyle = getComputedStyle(layer);
    await expect(layerStyle.position, "shader layer should be absolutely positioned").toBe(
      "absolute",
    );
    return;
  }

  // WebGPU unavailable — ::before base fill remains the fallback background.
  const baseStyle = getComputedStyle(bar, "::before");
  await expect(baseStyle.backgroundColor, "fallback base fill should remain visible").not.toBe(
    "rgba(0, 0, 0, 0)",
  );
}

async function assertContextualBarGradient(canvasElement: HTMLElement) {
  const bar = canvasElement.querySelector(`.${GRADIENT_CONTEXT_BAR}`);
  if (!bar) {
    throw new Error("ContextualBar gradient surface not found");
  }

  const overlayStyle = getComputedStyle(bar, "::after");
  await expect(
    overlayStyle.backgroundImage,
    "contextual bar should use a gradient overlay",
  ).toContain("gradient");
}

async function assertChevronMatchesLabelColour(canvasElement: HTMLElement) {
  const bar = canvasElement.querySelector(`.${GRADIENT_CONTEXT_BAR}`);
  if (!bar) {
    throw new Error("ContextualBar gradient surface not found");
  }

  const label = bar.querySelector(".astryx-text");
  const chevron = bar.querySelector("svg");
  if (!label || !chevron) {
    throw new Error("ContextualBar breadcrumb label or chevron not found");
  }

  const barColour = getComputedStyle(bar).color;
  const labelColour = getComputedStyle(label).color;
  const chevronColour = getComputedStyle(chevron).color;
  await expect(labelColour, "breadcrumb label should use bar text colour").toBe(barColour);
  await expect(chevronColour, "chevron should use bar text colour").toBe(barColour);
}

export const Default: Story = {
  args: {
    children: <TaxonomyBreadcrumb items={["Home", "Compound", "Halichondrin B"]} />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await assertContextualBarLayout(canvasElement);
    await assertContextualBarShader(canvasElement);
    await assertContextualBarGradient(canvasElement);
    await assertChevronMatchesLabelColour(canvasElement);
  },
};

/** Full-width preview — easiest place to spot the moiré shader canvas. */
export const ShaderPreview: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="min-h-[320px] w-full bg-body">
      <ContextualBar {...args} className="w-full" />
    </div>
  ),
  args: {
    children: <TaxonomyBreadcrumb items={["Home", "Compound", "Halichondrin B"]} />,
  },
};

export const LightMode: Story = {
  args: {
    children: <TaxonomyBreadcrumb items={["Home", "Compounds"]} />,
  },
  render: (args) => (
    <ColourModeFrame mode="light">
      <ContextualBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", async () => {
      await assertContextualBarLayout(canvasElement);
      await assertContextualBarShader(canvasElement);
      await assertContextualBarGradient(canvasElement);
      await assertChevronMatchesLabelColour(canvasElement);
    });
  },
};

export const DarkMode: Story = {
  args: {
    children: <TaxonomyBreadcrumb items={["Home", "Compounds"]} />,
  },
  render: (args) => (
    <ColourModeFrame mode="dark">
      <ContextualBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", async () => {
      await assertContextualBarLayout(canvasElement);
      await assertContextualBarShader(canvasElement);
      await assertContextualBarGradient(canvasElement);
      await assertChevronMatchesLabelColour(canvasElement);
    });
  },
};
