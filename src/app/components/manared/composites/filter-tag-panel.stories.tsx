import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { MOCK_BIOACTIVITY_TAGS } from "./filter-state";
import { FilterTagPanel } from "./filter-tag-panel";

const FIGMA_TAG_DROPDOWN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=166-998";

const meta = {
  title: "MaNaReD/Composites/FilterTagPanel",
  component: FilterTagPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_TAG_DROPDOWN },
  },
  args: {
    tags: MOCK_BIOACTIVITY_TAGS,
    selected: [],
    onToggle: fn(),
  },
} satisfies Meta<typeof FilterTagPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic" }));
    await expect(args.onToggle).toHaveBeenCalledWith("Cytotoxic");
  },
};

export const Selected: Story = {
  args: {
    selected: ["Cytotoxic", "Antiviral"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};
