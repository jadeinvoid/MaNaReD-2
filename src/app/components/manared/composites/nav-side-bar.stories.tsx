import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { NavSideBar } from "./nav-side-bar";

const FIGMA_NAV = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=236-1241";

const meta = {
  title: "MaNaReD/Composites/NavSideBar",
  component: NavSideBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_NAV },
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-body p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("MaNaReD")).toBeVisible();
    await expect(canvas.getByText("Compound")).toBeVisible();
    await expect(canvas.getByText("My Library")).toBeVisible();
  },
};
