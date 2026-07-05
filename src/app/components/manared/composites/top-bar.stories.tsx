import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TopBar } from "./top-bar";

const FIGMA_TOPBAR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9045";

const meta = {
  title: "MaNaReD/Composites/TopBar",
  component: TopBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_TOPBAR },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("MaNaReD logo")).toBeVisible();
    await expect(canvas.getByText("Tools")).toBeVisible();
    await expect(
      canvas.getByPlaceholderText("Search compounds, organisms, regions…"),
    ).toBeVisible();
  },
};
