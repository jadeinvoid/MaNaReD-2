import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { FilterTaxonomyPanel } from "./filter-taxonomy-panel";

const FIGMA_FILTER_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=351-1736";

const meta = {
  title: "MaNaReD/Composites/FilterTaxonomyPanel",
  component: FilterTaxonomyPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_BAR },
  },
  args: {
    selected: [],
    onToggleLeaf: fn(),
  },
} satisfies Meta<typeof FilterTaxonomyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Organism taxonomy")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Porifera" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Porifera" }));
    await expect(args.onToggleLeaf).toHaveBeenCalledWith("Porifera");
  },
};

export const Selected: Story = {
  args: {
    selected: ["Porifera"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const leaf = canvas.getByRole("button", { name: "Porifera" });
    await expect(leaf).toHaveAttribute("aria-pressed", "true");
  },
};

export const CollapseGroup: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const collapseBtn = canvas.getByRole("button", { name: "Collapse Organism taxonomy" });
    await userEvent.click(collapseBtn);

    await expect(canvas.queryByRole("button", { name: "Porifera" })).not.toBeInTheDocument();
  },
};

