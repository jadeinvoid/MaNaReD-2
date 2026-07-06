import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { INTERACTIVE_CHIP_BAR_CONTROL } from "../primitives/interactive-styles";
import { SURFACE_CHIP_BAR } from "../primitives/surface-styles";
import { ChipBar } from "./chip-bar";

const FIGMA_CHIP_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9081";

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
  title: "MaNaReD/Composites/ChipBar",
  component: ChipBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CHIP_BAR },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  args: {
    chips: ["Alkaloids", "MW 200–400", "Marine"],
    provenanceText: "Filter carried on from previous session.",
    onRemoveChip: fn(),
    onMoreFilters: fn(),
    onSort: fn(),
  },
} satisfies Meta<typeof ChipBar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertChipBarTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const chipLabel = canvas.getByText("Alkaloids");
  const chip = chipLabel.parentElement;
  const bar = canvasElement.querySelector(".bg-body-secondary");
  const provenance = canvas.getByText("Filter carried on from previous session.");
  const moreFilters = canvas.getByRole("button", { name: "More Filters" });

  if (!chip || !bar) {
    throw new Error("ChipBar token test elements not found");
  }

  await expectUsesTokenClasses(bar.className, "bg-body-secondary");
  await expectUsesTokenClasses(SURFACE_CHIP_BAR, "bg-body-secondary");
  await expectUsesTokenClasses(
    chip.className,
    "bg-chip-active",
    "text-secondary",
    "border-border-secondary",
  );
  await expectUsesTokenClasses(provenance.className, "text-tertiary", "italic", "text-3xs");
  await expectUsesTokenClasses(
    moreFilters.className,
    "bg-body",
    "border-border-secondary",
    "text-secondary",
    "text-3xs",
  );
  await expectUsesTokenClasses(
    INTERACTIVE_CHIP_BAR_CONTROL,
    "bg-body",
    "border-border-secondary",
    "text-secondary",
  );

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-body-secondary", "backgroundColor");
    await expectResolvedToken(mode, "--color-interactive-chip-active", "backgroundColor");
    await expectResolvedToken(mode, "--color-background-body", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-secondary", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
    await expectResolvedToken(mode, "--color-text-tertiary", "color");
  }
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloids")).toBeVisible();
    await expect(canvas.getByText("Filter carried on from previous session.")).toBeVisible();
    await assertChipBarTokenColours(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Remove Alkaloids" }));
    await expect(args.onRemoveChip).toHaveBeenCalledWith("Alkaloids");
    await userEvent.click(canvas.getByRole("button", { name: "More Filters" }));
    await expect(args.onMoreFilters).toHaveBeenCalledOnce();
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(args.onSort).toHaveBeenCalledOnce();
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <ChipBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertChipBarTokenColours(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <ChipBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertChipBarTokenColours(canvasElement));
  },
};
