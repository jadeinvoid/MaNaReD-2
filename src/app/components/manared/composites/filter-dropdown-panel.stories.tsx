import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { MOCK_COMPOUND_CLASSES } from "./filter-state";
import { FilterDropdownPanel } from "./filter-dropdown-panel";

const meta = {
  title: "MaNaReD/Composites/FilterDropdownPanel",
  component: FilterDropdownPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
  },
  args: {
    options: MOCK_COMPOUND_CLASSES,
    value: null,
    onChange: fn(),
  },
} satisfies Meta<typeof FilterDropdownPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Select class…")).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    value: "Alkaloids",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("combobox", { name: "Compound class" })).toHaveTextContent(
      "Alkaloids",
    );
  },
};
