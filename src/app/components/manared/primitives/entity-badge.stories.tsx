import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { EntityBadge } from "./entity-badge";

const FIGMA_ENTITY = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=49-867";

const meta = {
  title: "MaNaReD/Primitives/EntityBadge",
  component: EntityBadge,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_ENTITY },
  },
  args: {
    entity: "compound",
    label: "Compound",
  },
} satisfies Meta<typeof EntityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compound: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compound")).toBeVisible();
  },
};

export const Organism: Story = {
  args: { entity: "organism", label: "Organism" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Organism")).toBeVisible();
  },
};

export const Bioactivity: Story = {
  args: { entity: "bioactivity", label: "Bioactivity" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Bioactivity")).toBeVisible();
  },
};

export const Region: Story = {
  args: { entity: "region", label: "Region" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Region")).toBeVisible();
  },
};
