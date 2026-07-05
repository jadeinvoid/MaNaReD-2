import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { CompoundCard } from "./compound-card";

const FIGMA_CARD = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9090";

const meta = {
  title: "MaNaReD/Domain/CompoundCard",
  component: CompoundCard,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CARD },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "CMNPD-00482",
    name: "Latrunculin A",
    formula: "C₃₃H₄₅NO₅",
    source: "Sponge Latrunculia sp.",
    tags: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Marine", entity: "region" },
    ],
  },
} satisfies Meta<typeof CompoundCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("Cytotoxic")).toBeVisible();
  },
};
