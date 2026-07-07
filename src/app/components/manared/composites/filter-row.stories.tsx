import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { DEFAULT_FILTER_ROWS, FilterRow } from "./filter-row";

const FIGMA_FILTER_ROW =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9070";

const meta = {
  title: "MaNaReD/Composites/FilterRow",
  component: FilterRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_ROW },
  },
  args: { label: "Taxonomy" },
} satisfies Meta<typeof FilterRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await expect(canvas.getByLabelText("Expand filter")).toBeVisible();
  },
};

export const AllRows: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-1">
      {DEFAULT_FILTER_ROWS.map((label) => (
        <FilterRow key={label} label={label} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Bioactivity")).toBeVisible();
    await expect(canvas.getAllByLabelText("Expand filter")).toHaveLength(6);
  },
};
