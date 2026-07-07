import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { SearchDropdown } from "./search-dropdown";

const FIGMA_DROPDOWN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=340-3669";

const meta = {
  title: "MaNaReD/Composites/SearchDropdown",
  component: SearchDropdown,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_DROPDOWN },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Sponge (Porifera)")).toBeVisible();
    await expect(canvas.getByText("Organism")).toBeVisible();
    await expect(canvas.getByText("Compound Class")).toBeVisible();
    await expect(canvas.getByText("navigate")).toBeVisible();
  },
};

export const SelectsSuggestion: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole("button");
    await userEvent.click(rows[0]!);
  },
};
