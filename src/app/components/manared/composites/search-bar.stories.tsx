import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { SearchBar } from "./search-bar";

const FIGMA_SEARCH = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=340-3569";

const meta = {
  title: "MaNaReD/Composites/SearchBar",
  component: SearchBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_SEARCH },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "Search compounds, organisms, regions…");
    await userEvent.type(input, "alkaloid");
    await expect(input).toHaveValue("alkaloid");

    const shell = canvasElement.querySelector(".search-bar-shell");
    if (!shell) {
      throw new Error("Search bar shell not found");
    }
    const field = shell.querySelector(".search-bar-field");
    if (!field) {
      throw new Error("Search field shell not found");
    }
    const shellWidth = shell.getBoundingClientRect().width;
    const fieldWidth = field.getBoundingClientRect().width;
    const inputWidth = input.getBoundingClientRect().width;
    await expect(fieldWidth / shellWidth).toBeGreaterThan(0.85);
    await expect(inputWidth / fieldWidth).toBeGreaterThan(0.98);
  },
};
