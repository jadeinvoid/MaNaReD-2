import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FilterSidebar } from "./filter-sidebar";

const FIGMA_FILTER_SB =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9061";

const meta = {
  title: "MaNaReD/Composites/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_SB },
  },
  args: {
    onApply: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Apply Filter" }));
    await expect(args.onApply).toHaveBeenCalledOnce();
  },
};

export const Collapsed: Story = {
  args: { collapsed: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText("Taxonomy")).not.toBeInTheDocument();
  },
};
