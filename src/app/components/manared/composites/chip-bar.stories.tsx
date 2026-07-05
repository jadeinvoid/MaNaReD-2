import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { ChipBar } from "./chip-bar";

const FIGMA_CHIP_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9081";

const meta = {
  title: "MaNaReD/Composites/ChipBar",
  component: ChipBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CHIP_BAR },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  args: {
    chips: ["Alkaloids", "MW 200–400", "Marine"],
    provenanceText: "Filter carried on from previous session.",
    onRemoveChip: fn(),
    onMoreFilters: fn(),
    onSort: fn(),
  },
} satisfies Meta<typeof ChipBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloids")).toBeVisible();
    await expect(canvas.getByText("Filter carried on from previous session.")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Remove Alkaloids" }));
    await expect(args.onRemoveChip).toHaveBeenCalledWith("Alkaloids");
    await userEvent.click(canvas.getByRole("button", { name: "More filters" }));
    await expect(args.onMoreFilters).toHaveBeenCalledOnce();
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(args.onSort).toHaveBeenCalledOnce();
  },
};
