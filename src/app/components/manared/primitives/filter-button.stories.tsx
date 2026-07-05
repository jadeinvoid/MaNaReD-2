import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FilterButton } from "./filter-button";

const FIGMA_FILTER_BTN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9066";

const meta = {
  title: "MaNaReD/Primitives/FilterButton",
  component: FilterButton,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_FILTER_BTN },
  },
  args: {
    variant: "refine-result",
    onClick: fn(),
  },
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RefineResult: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Refine Results" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const ClearAll: Story = {
  args: { variant: "clear-all", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Clear all" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const ApplyFilter: Story = {
  args: { variant: "apply-filter", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Apply filters" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
