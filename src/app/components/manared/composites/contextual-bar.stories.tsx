import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import { GRADIENT_CONTEXT_BAR } from "../primitives/gradient-styles";
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

  const labelColour = getComputedStyle(label).color;
  const chevronColour = getComputedStyle(chevron).color;
  await expect(chevronColour, "chevron should match breadcrumb label colour").toBe(labelColour);
}

export const Default: Story = {
  args: {
    children: <TaxonomyBreadcrumb items={["Home", "Compound", "Halichondrin B"]} />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await assertContextualBarGradient(canvasElement);
    await assertChevronMatchesLabelColour(canvasElement);
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
      await assertContextualBarGradient(canvasElement);
      await assertChevronMatchesLabelColour(canvasElement);
    });
  },
};
