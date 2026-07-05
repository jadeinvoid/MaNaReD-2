import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Chip } from "./chip";

const FIGMA_CHIP = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9145";

const meta = {
  title: "MaNaReD/Primitives/Chip",
  component: Chip,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_CHIP },
  },
  args: {
    label: "Cytotoxic",
    entity: "bioactivity",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bioactivity: Story = {
  args: { label: "Cytotoxic", entity: "bioactivity" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(args.label)).toBeVisible();
  },
};

export const AllEntities: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Cytotoxic" entity="bioactivity" />
      <Chip label="Alkaloid" entity="compound" />
      <Chip label="Sponge" entity="organism" />
      <Chip label="South China Sea" entity="region" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Cytotoxic")).toBeVisible();
    await expect(canvas.getByText("Sponge")).toBeVisible();
  },
};

export const Compound: Story = {
  args: { label: "Alkaloid", entity: "compound" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Alkaloid")).toBeVisible();
  },
};

export const Organism: Story = {
  args: { label: "Sponge", entity: "organism" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Sponge")).toBeVisible();
  },
};

export const Region: Story = {
  args: { label: "South China Sea", entity: "region" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("South China Sea")).toBeVisible();
  },
};
