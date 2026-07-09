import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { setGeographicRegions } from "./filter-state";
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

    await expect(canvas.getByRole("button", { name: "All regions" })).toBeVisible();
    const indoPacific = canvas.getByRole("button", { name: "Indo-Pacific" });
    await expect(indoPacific.className).toContain("text-3xs");
    await expect(indoPacific.className).toContain("text-tertiary");

    await userEvent.click(canvas.getByRole("button", { name: "Indo-Pacific" }));
    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active[0]?.label).toBe("Indo-Pacific");
  },
};

export const Selected: Story = {
  args: {
    filters: setGeographicRegions({ active: [] }, ["Indo-Pacific", "Mediterranean"]),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Indo-Pacific" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "Mediterranean" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "Red Sea" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  },
};

export const ClearAllRegions: Story = {
  args: {
    filters: setGeographicRegions({ active: [] }, ["Caribbean"]),
    onFiltersChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "All regions" }));

    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active).toEqual([]);
  },
};

export const MultiSelect: Story = {
  args: {
    filters: setGeographicRegions({ active: [] }, ["Indo-Pacific"]),
    onFiltersChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Mediterranean" }));

    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active.map((filter: { label: string }) => filter.label)).toEqual([
      "Indo-Pacific",
      "Mediterranean",
    ]);
  },
};
