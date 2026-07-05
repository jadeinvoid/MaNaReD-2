import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { DetailSection } from "./detail-section";

const FIGMA_DETAIL = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9114";

const meta = {
  title: "MaNaReD/Domain/DetailSection",
  component: DetailSection,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_DETAIL },
  },
  args: {
    id: "CMNPD-00482",
    name: "Latrunculin A",
    bioactivities: [{ label: "Cytotoxic", entity: "bioactivity" }],
    compoundClasses: [{ label: "Macrolide", entity: "compound" }],
    bioactivityCount: 12,
  },
} satisfies Meta<typeof DetailSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("12 records")).toBeVisible();
  },
};
