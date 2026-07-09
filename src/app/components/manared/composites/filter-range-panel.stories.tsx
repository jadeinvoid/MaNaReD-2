import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { MW_DEFAULT_RANGE, MW_FULL_RANGE } from "./filter-state";
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
    onChangeEnd: fn(),
  },
} satisfies Meta<typeof FilterRangePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Min")).toBeVisible();
    await expect(canvas.getByText("Max")).toBeVisible();
    await expect(canvas.getByRole("spinbutton", { name: /minimum molecular weight/i })).toHaveValue(
      200,
    );
    await expect(canvas.getByRole("spinbutton", { name: /maximum molecular weight/i })).toHaveValue(
      400,
    );
    await expect(canvas.queryByText("MW 200–400")).not.toBeInTheDocument();
  },
};

export const FullRangeDraft: Story = {
  args: {
    value: MW_FULL_RANGE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("spinbutton", { name: /minimum molecular weight/i })).toHaveValue(
      0,
    );
    await expect(canvas.getByRole("spinbutton", { name: /maximum molecular weight/i })).toHaveValue(
      2000,
    );
  },
};

export const PrecisionEntry: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const minInput = canvas.getByRole("spinbutton", { name: /minimum molecular weight/i });
    await userEvent.clear(minInput);
    await userEvent.type(minInput, "250");
    await userEvent.tab();
    await expect(args.onChange).toHaveBeenCalled();
    await expect(args.onChangeEnd).toHaveBeenCalled();
  },
};
