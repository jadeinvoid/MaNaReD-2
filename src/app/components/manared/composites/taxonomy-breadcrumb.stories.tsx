import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TaxonomyBreadcrumb } from "./taxonomy-breadcrumb";

const FIGMA_BREADCRUMB =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9054";

const meta = {
  title: "MaNaReD/Composites/TaxonomyBreadcrumb",
  component: TaxonomyBreadcrumb,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_BREADCRUMB },
  },
  args: {
    items: ["Home", "Compounds", "Latrunculin A"],
  },
} satisfies Meta<typeof TaxonomyBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Home")).toBeVisible();
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
  },
};
