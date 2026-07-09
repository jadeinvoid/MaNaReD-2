import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { setRegionRankFilter } from "./filter-state";
import { FilterRegionPanel } from "./filter-region-panel";

const FIGMA_FILTER_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=351-1736";

const meta = {
  title: "MaNaReD/Composites/FilterRegionPanel",
  component: FilterRegionPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_BAR },
  },
  args: {
    filters: { active: [] },
    onFiltersChange: fn(),
  },
} satisfies Meta<typeof FilterRegionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Ocean")).toBeVisible();
    const oceanLabel = canvas.getByText("Ocean");
    await expect(oceanLabel.className).toContain("text-center");
    const pacific = canvas.getByRole("button", { name: "Pacific Ocean" });
    await expect(pacific.className).toContain("justify-center");
    await expect(pacific.className).toContain("text-center");
    await expect(canvas.getByRole("button", { name: "Pacific Ocean" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Pacific Ocean" }));
    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active[0]?.label).toBe("Ocean · Pacific Ocean");
  },
};

export const Selected: Story = {
  args: {
    filters: setRegionRankFilter({ active: [] }, "ocean", "Pacific Ocean"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Sea / basin")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "South China Sea" })).toBeVisible();
  },
};

export const CollapseGroup: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const collapseBtn = canvas.getByRole("button", { name: "Collapse Ocean" });
    await userEvent.click(collapseBtn);

    await expect(canvas.queryByRole("button", { name: "Pacific Ocean" })).not.toBeInTheDocument();
  },
};

export const BacktrackPrunesDeeperRanks: Story = {
  args: {
    filters: setRegionRankFilter(
      setRegionRankFilter({ active: [] }, "ocean", "Pacific Ocean"),
      "sea",
      "South China Sea",
    ),
    onFiltersChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "South China Sea" }));

    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active.map((filter: { id: string }) => filter.id)).toEqual([
      "geographicRegion:ocean",
    ]);
  },
};
