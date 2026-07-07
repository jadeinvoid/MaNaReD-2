import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import { GRADIENT_FILTER } from "../primitives/gradient-styles";
import { FilterSidebar } from "./filter-sidebar";
import { FILTER_CATEGORIES, type ActiveFilter } from "./filter-state";

const FIGMA_FILTER_SB =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=349-4572";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  const frameStyle: CSSProperties = {
    colorScheme: mode,
    padding: "1.5rem",
    borderRadius: "var(--radius-container)",
    border: "1px solid var(--color-border-emphasized)",
    backgroundColor: "var(--color-background-body)",
  };

  return (
    <div style={frameStyle} data-colour-mode={mode}>
      {children}
    </div>
  );
}

const meta = {
  title: "MaNaReD/Composites/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_SB },
  },
  decorators: [
    (Story) => (
      <div className="h-[480px]">
        <Story />
      </div>
    ),
  ],
  args: {
    onClear: fn(),
    onFiltersChange: fn(),
  },
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertFilterGradient(canvasElement: HTMLElement) {
  const region = canvasElement.querySelector(`.${GRADIENT_FILTER}`);
  if (!region) {
    throw new Error("FilterSidebar gradient region not found");
  }

  await expect(getComputedStyle(region).backgroundImage).toContain("gradient");
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await expect(canvas.getByText("Target / assay")).toBeVisible();
    for (const { label } of FILTER_CATEGORIES) {
      await expect(canvas.getByLabelText(`Expand ${label} filter`)).toBeVisible();
    }
    await assertFilterGradient(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    await expect(args.onClear).toHaveBeenCalledOnce();
  },
};

export const ExpandBioactivity: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await expect(canvas.getByRole("button", { name: "Cytotoxic" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic" }));
    await expect(args.onFiltersChange).toHaveBeenCalled();
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(
      lastCall?.active.some((filter: ActiveFilter) => filter.label === "Cytotoxic"),
    ).toBe(true);
  },
};

export const RangeSelection: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Molecular Weight filter"));
    await expect(canvas.getByText(/MW \d+–\d+/)).toBeVisible();
    await expect(args.onFiltersChange).toHaveBeenCalled();
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(
      lastCall?.active.some((filter: ActiveFilter) => filter.label.startsWith("MW ")),
    ).toBe(true);
  },
};

export const ClearAll: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic" }));
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active).toEqual([]);
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <FilterSidebar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertFilterGradient(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <FilterSidebar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertFilterGradient(canvasElement));
  },
};
