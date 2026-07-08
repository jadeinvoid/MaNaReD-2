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
  decorators: [
    (Story) => (
      <div style={{ width: "224px" }}>
        <Story />
      </div>
    ),
  ],
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
    await expect(canvas.getByText("200 Da")).toBeVisible();
    await expect(canvas.getByText("400 Da")).toBeVisible();
    await expect(canvas.queryByText("MW 200–400")).not.toBeInTheDocument();
  },
};
