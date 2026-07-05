import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { EntityPill } from "./entity-pill";

const meta = {
  title: "Vibework/Components/EntityPill",
  component: EntityPill,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
  },
  args: {
    entity: "organism",
  },
} satisfies Meta<typeof EntityPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Organism: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Organism")).toBeVisible();
  },
};

export const Compound: Story = {
  args: { entity: "compound" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compound")).toBeVisible();
  },
};
