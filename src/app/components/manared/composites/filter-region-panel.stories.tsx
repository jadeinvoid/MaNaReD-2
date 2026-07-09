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
  decorators: [
    (Story) => (
      <div style={{ width: "224px" }}>
        <Story />
      </div>
    ),
  ],
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

    await expect(canvas.getByRole("checkbox", { name: "All regions" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Indo-Pacific" })).not.toBeChecked();

    await userEvent.click(canvas.getByRole("checkbox", { name: "Indo-Pacific" }));
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
    await expect(canvas.getByRole("checkbox", { name: "All regions" })).not.toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Indo-Pacific" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Mediterranean" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Red Sea" })).not.toBeChecked();
  },
};

export const ClearAllRegions: Story = {
  args: {
    filters: setGeographicRegions({ active: [] }, ["Caribbean"]),
    onFiltersChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("checkbox", { name: "All regions" }));

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

    await userEvent.click(canvas.getByRole("checkbox", { name: "Mediterranean" }));

    const lastCall = args.onFiltersChange.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active.map((filter: { label: string }) => filter.label)).toEqual([
      "Indo-Pacific",
      "Mediterranean",
    ]);
  },
};
