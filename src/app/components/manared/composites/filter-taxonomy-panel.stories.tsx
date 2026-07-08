import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { setTaxonomyRankFilter } from "./filter-state";
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
    filters: { active: [] },
    onFiltersChange: fn(),
  },
} satisfies Meta<typeof FilterTaxonomyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Phylum")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Porifera" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Porifera" }));
    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active[0]?.label).toBe("Phylum · Porifera");
  },
};

export const Selected: Story = {
  args: {
    filters: setTaxonomyRankFilter({ active: [] }, "phylum", "Porifera"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Class")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Demospongiae" })).toBeVisible();
  },
};

export const CollapseGroup: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const collapseBtn = canvas.getByRole("button", { name: "Collapse Phylum" });
    await userEvent.click(collapseBtn);

    await expect(canvas.queryByRole("button", { name: "Porifera" })).not.toBeInTheDocument();
  },
};

export const BacktrackPrunesDeeperRanks: Story = {
  args: {
    filters: setTaxonomyRankFilter(
      setTaxonomyRankFilter(
        setTaxonomyRankFilter({ active: [] }, "phylum", "Porifera"),
        "class",
        "Demospongiae",
      ),
      "order",
      "Suberitida",
    ),
    onFiltersChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Demospongiae" }));

    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active.map((filter: { id: string }) => filter.id)).toEqual([
      "taxonomy:phylum",
    ]);
  },
};
