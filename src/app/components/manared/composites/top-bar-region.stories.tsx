import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { TopBarRegion } from "./top-bar-region";

const FIGMA_TOPBAR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=340-3751";

const meta = {
  title: "MaNaReD/Composites/TopBarRegion",
  component: TopBarRegion,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_TOPBAR },
  },
  args: {
    onEntityChange: fn(),
    onRemoveChip: fn(),
    onOpenFilters: fn(),
    chips: [{ label: "MW 200–400", provenance: "Compounds" }],
  },
} satisfies Meta<typeof TopBarRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("radiogroup", { name: "Browse entity" })).toHaveLength(2);
    await expect(canvas.getByText(/MW 200–400/)).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    showFilterTrigger: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Open filters")).toBeVisible();
    await userEvent.click(canvas.getByLabelText("Open filters"));
    await expect(args.onOpenFilters).toHaveBeenCalled();
  },
};

export const EntitySwitch: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText("Regions")[0]!);
    await expect(args.onEntityChange).toHaveBeenCalledWith("regions");
  },
};

export const WithQueryChips: Story = {
  args: {
    chips: [{ label: "Alkaloids", provenance: "Compounds" }, { label: "MW 200–400" }],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Compounds · Alkaloids/)).toBeVisible();
    const removeButton = canvas.getByLabelText("Remove Compounds · Alkaloids");
    await userEvent.click(removeButton);
    await expect(args.onRemoveChip).toHaveBeenCalledWith("Alkaloids");
  },
};
