import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import {
  FILTER_BAR_SURFACE,
  FILTER_SIDEBAR_SHELL,
  GRADIENT_FILTER,
} from "../primitives/gradient-styles";
import { INTERACTIVE_FILTER_CLEAR_ALL } from "../primitives/interactive-styles";
import { FilterSidebar } from "./filter-sidebar";
import { FILTER_CATEGORIES, type ActiveFilter } from "./filter-state";

const FIGMA_FILTER_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=351-1736";

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
    design: { type: "figma", url: FIGMA_FILTER_BAR },
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
    onApply: fn(),
    onCollapsedChange: fn(),
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

function getFilterShell(canvasElement: HTMLElement): HTMLElement {
  const shell = canvasElement.querySelector(`.${FILTER_SIDEBAR_SHELL}`);
  if (!shell || !(shell instanceof HTMLElement)) {
    throw new Error("FilterSidebar shell not found");
  }
  return shell;
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Refine Results")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Clear All" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Apply Filter" })).toBeVisible();
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

export const NoWrapLongLabels: Story = {
  args: {
    defaultFilters: {
      active: [
        {
          id: "bio-1",
          category: "bioactivity",
          categoryLabel: "Bioactivity",
          label: "Cytotoxic",
        },
        {
          id: "bio-2",
          category: "bioactivity",
          categoryLabel: "Bioactivity",
          label: "Antiviral",
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Geographic Region filter"));

    const geoLabel = canvas.getByText("Geographic Region");
    await expect(geoLabel).toBeVisible();
    await expect(geoLabel.className).toContain("whitespace-nowrap");
    await expect(geoLabel.getClientRects().length).toBe(1);

    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    const bioLabel = canvas.getByText("Bioactivity (2)");
    await expect(bioLabel).toBeVisible();
    await expect(bioLabel.className).toContain("whitespace-nowrap");
    await expect(bioLabel.getClientRects().length).toBe(1);
  },
};

export const WithChrome: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = canvasElement.querySelector(`.${FILTER_BAR_SURFACE.split(" ")[0]}`);
    await expect(shell).toBeTruthy();
    await expect(canvas.getByText("Refine Results")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Clear All" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Apply Filter" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Collapse filters" })).toBeVisible();
    await expect(canvasElement.querySelector('[data-name="icon/vertical-collapse"]')).toBeTruthy();
  },
};

export const Collapsed: Story = {
  args: { defaultCollapsed: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = getFilterShell(canvasElement);

    await expect(canvas.getByRole("button", { name: "Expand filters" })).toBeVisible();
    await expect(shell.dataset.collapsed).toBe("true");
    await expect(canvasElement.querySelector(".filter-sidebar-collapsed-rail")).toBeTruthy();
    await expect(canvas.queryByText("Taxonomy")).not.toBeInTheDocument();
  },
};

export const ToggleCollapse: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = getFilterShell(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Collapse filters" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(true);
    await expect(shell.dataset.collapsed).toBe("true");
    await expect(canvas.queryByText("Taxonomy")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Expand filters" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(false);
    await expect(shell.dataset.collapsed).toBe("false");
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
  },
};

export const ClearAllFromContainer: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic" }));
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active).toEqual([]);
    await expect(args.onClear).toHaveBeenCalled();
  },
};

export const TabletDefault: Story = {
  args: { defaultCollapsed: true },
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  play: async ({ canvasElement }) => {
    const shell = getFilterShell(canvasElement);
    await expect(shell.dataset.collapsed).toBe("true");
  },
};

export const ClearAllShadowToken: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearAll = canvas.getByRole("button", { name: "Clear All" });
    await expect(clearAll.className).toContain("shadow-filter-action");
    await expect(INTERACTIVE_FILTER_CLEAR_ALL).toContain("shadow-filter-action");
    await expect(getComputedStyle(clearAll).boxShadow).not.toBe("none");
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
