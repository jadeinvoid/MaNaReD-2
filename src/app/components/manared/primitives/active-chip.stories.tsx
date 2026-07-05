import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

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

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloids")).toBeVisible();
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
