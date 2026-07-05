import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { SortWrapper } from "./sort-wrapper";

const FIGMA_SORT = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9089";

const meta = {
  title: "MaNaReD/Composites/SortWrapper",
  component: SortWrapper,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_SORT },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof SortWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
