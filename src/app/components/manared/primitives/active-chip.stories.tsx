import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";

import { INTERACTIVE_ACTIVE_CHIP } from "./interactive-styles";
import { ActiveChip } from "./active-chip";

const FIGMA_ACTIVE_CHIP =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9082";

const meta = {
  title: "MaNaReD/Primitives/ActiveChip",
  component: ActiveChip,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_ACTIVE_CHIP },
  },
  args: {
    label: "Alkaloids",
    onRemove: fn(),
  },
} satisfies Meta<typeof ActiveChip>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertActiveChipTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const chipLabel = canvas.getByText("Alkaloids");
  const chip = chipLabel.parentElement;

  if (!chip) {
    throw new Error("ActiveChip token test element not found");
  }

  await expectUsesTokenClasses(
    chip.className,
    "bg-chip-active",
    "text-secondary",
    "border-border-secondary",
  );
  await expectUsesTokenClasses(INTERACTIVE_ACTIVE_CHIP, "bg-chip-active", "text-secondary");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-interactive-chip-active", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-secondary", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
  }
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloids")).toBeVisible();
    await assertActiveChipTokenColours(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Remove Alkaloids" }));
    await expect(args.onRemove).toHaveBeenCalledOnce();
  },
};

export const ReadOnly: Story = {
  args: { label: "MW 200–400", onRemove: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("MW 200–400")).toBeVisible();
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
  },
};

/** Browse-screen filter labels from Figma chip bar `332:9081`. */
export const FigmaLabels: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ActiveChip label="Alkaloids" onRemove={() => {}} />
      <ActiveChip label="MW 200–400" onRemove={() => {}} />
      <ActiveChip label="Marine" onRemove={() => {}} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloids")).toBeVisible();
    await expect(canvas.getByText("Marine")).toBeVisible();
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ActiveChip label="Alkaloids" onRemove={() => {}} />
      <ActiveChip label="MW 200–400" onRemove={() => {}} />
      <ActiveChip label="Marine" onRemove={() => {}} />
      <ActiveChip label="Read only" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Read only")).toBeVisible();
  },
};
