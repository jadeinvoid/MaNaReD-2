import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TokenSwatch } from "./token-swatch";

const meta = {
  title: "Vibework/Components/TokenSwatch",
  component: TokenSwatch,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
  args: {
    token: "bg-surface",
    description: "Cards, panels",
    className: "bg-surface",
  },
} satisfies Meta<typeof TokenSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("bg-surface")).toBeVisible();
    await expect(canvas.getByText("Cards, panels")).toBeVisible();
  },
};

export const Body: Story = {
  args: {
    token: "bg-body",
    description: "Page background",
    className: "bg-body",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("bg-body")).toBeVisible();
    await expect(canvas.getByText("Page background")).toBeVisible();
  },
};

export const Muted: Story = {
  args: {
    token: "bg-muted",
    description: "Subtle emphasis",
    className: "bg-muted",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("bg-muted")).toBeVisible();
    await expect(canvas.getByText("Subtle emphasis")).toBeVisible();
  },
};
