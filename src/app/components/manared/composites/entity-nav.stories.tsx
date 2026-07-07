import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { EntityNav } from "./entity-nav";

const meta = {
  title: "MaNaReD/Composites/EntityNav",
  component: EntityNav,
  tags: ["autodocs", "test"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof EntityNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compounds")).toBeVisible();
    await expect(canvas.getByText("Organisms")).toBeVisible();
    await expect(canvas.getByText("Regions")).toBeVisible();
    await userEvent.click(canvas.getAllByText("Organisms")[0]!);
    await expect(args.onChange).toHaveBeenCalledWith("organisms");
  },
};

export const FillLayout: Story = {
  args: {
    layout: "fill",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};
