import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { MW_DEFAULT_RANGE } from "./filter-state";
import { FilterRangePanel } from "./filter-range-panel";

const meta = {
  title: "MaNaReD/Composites/FilterRangePanel",
  component: FilterRangePanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
  },
  args: {
    value: MW_DEFAULT_RANGE,
    onChange: fn(),
  },
} satisfies Meta<typeof FilterRangePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("MW 200–400")).toBeVisible();
  },
};
