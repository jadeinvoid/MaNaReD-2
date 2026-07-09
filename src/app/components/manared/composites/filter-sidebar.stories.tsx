import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import {
  FILTER_BAR_SURFACE,
  FILTER_SIDEBAR_SHELL,
  GRADIENT_FILTER_PANEL,
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
  const region = canvasElement.querySelector(`.${GRADIENT_FILTER_PANEL}`);
  if (!region) {
    throw new Error("FilterSidebar gradient region not found");
  }

  const afterLayer = getComputedStyle(region, "::after").backgroundImage;
  await expect(
    afterLayer === "none" ? getComputedStyle(region).backgroundImage : afterLayer,
  ).toContain("gradient");
}

function getCollapseButton(canvasElement: HTMLElement): HTMLElement {
  const header = canvasElement.querySelector('[data-name="filter/header"]');
  const button = header?.querySelector(
    '[aria-label="Collapse filters"], [aria-label="Expand filters"]',
  );
  if (!button || !(button instanceof HTMLElement)) {
    throw new Error("Filter collapse control not found");
  }
  return button;
}

function getCategoryChevron(canvasElement: HTMLElement, label: string): SVGElement {
  const control = canvasElement.querySelector(`[aria-label="Expand ${label} filter"]`);
  if (!control) {
    throw new Error(`Category chevron for ${label} not found`);
  }
  if (control instanceof SVGElement) {
    return control;
  }
  if (control instanceof HTMLElement) {
    const icon = control.querySelector("svg");
    if (icon) {
      return icon;
    }
  }
  throw new Error(`Chevron icon for ${label} not found`);
}

async function assertHeaderNoOverlap(canvasElement: HTMLElement) {
  const header = canvasElement.querySelector('[data-name="filter/header"]');
  const refineHost = header?.querySelector('.filter-sidebar-reveal[data-collapsed="false"]');
  const collapse = getCollapseButton(canvasElement);
  if (!refineHost || !(refineHost instanceof HTMLElement)) {
    throw new Error("Refine Results host not found");
  }

  const refineRect = refineHost.getBoundingClientRect();
  const collapseRect = collapse.getBoundingClientRect();
  if (collapseRect.left < refineRect.right - 1) {
    throw new Error(
      `Refine Results host overlaps collapse control: refine right ${refineRect.right}, collapse left ${collapseRect.left}`,
    );
  }
}

async function assertChevronColumnAligned(canvasElement: HTMLElement) {
  const collapse = getCollapseButton(canvasElement);
  const chevron = getCategoryChevron(canvasElement, "Taxonomy");
  const collapseRight = collapse.getBoundingClientRect().right;
  const chevronRight = chevron.getBoundingClientRect().right;
  if (Math.abs(collapseRight - chevronRight) > 1) {
    throw new Error(
      `Chevron column misaligned: collapse right ${collapseRight}, chevron right ${chevronRight}`,
    );
  }
}

async function assertCollapsedFitsRail(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const shell = getFilterShell(canvasElement);
  const collapse = getCollapseButton(canvasElement);

  await expect(canvas.getByRole("button", { name: "Expand filters" })).toBeVisible();
  await expect(shell.dataset.collapsed).toBe("true");

  const shellWidth = shell.getBoundingClientRect().width;
  if (shellWidth > 48) {
    throw new Error(`Expected collapsed shell width <= 48px, got ${shellWidth}`);
  }

  const icon = collapse.querySelector("svg");
  if (!icon) {
    throw new Error("Collapse control icon not found");
  }
  const iconRect = icon.getBoundingClientRect();
  const shellRect = shell.getBoundingClientRect();
  if (iconRect.width === 0 || iconRect.height === 0) {
    throw new Error("Collapse control icon has no layout box");
  }
  if (iconRect.left < shellRect.left || iconRect.right > shellRect.right) {
    throw new Error("Collapse control clips outside collapsed filter sidebar shell");
  }
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
    await expect(canvas.queryByRole("button", { name: "Apply Filter" })).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Collapse all filter categories" }),
    ).toBeVisible();
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await expect(canvas.getByText("Target / assay")).toBeVisible();
    for (const { label } of FILTER_CATEGORIES) {
      await expect(canvas.getByLabelText(`Expand ${label} filter`)).toBeVisible();
    }
    await assertFilterGradient(canvasElement);
    await assertHeaderNoOverlap(canvasElement);
    await assertChevronColumnAligned(canvasElement);
    await expect(canvas.getByText("Refine Results").className).toContain("text-xs");
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    await expect(args.onClear).toHaveBeenCalledOnce();
  },
};

export const WithChrome: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = canvasElement.querySelector(`.${FILTER_BAR_SURFACE.split(" ")[0]}`);
    await expect(shell).toBeTruthy();
    await expect(canvas.getByText("Refine Results")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Clear All" })).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Apply Filter" })).not.toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Collapse filters" })).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Collapse all filter categories" }),
    ).toBeVisible();
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
    await assertCollapsedFitsRail(canvasElement);
  },
};

export const CollapsedKeepsExpandControl: Story = {
  args: { defaultCollapsed: true, showCollapseControl: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = getFilterShell(canvasElement);

    await expect(shell.dataset.collapsed).toBe("true");
    await expect(canvas.getByRole("button", { name: "Expand filters" })).toBeVisible();
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

    await expect(canvas.getByRole("button", { name: "Expand filters" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Expand filters" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(false);
    await expect(shell.dataset.collapsed).toBe("false");
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await assertHeaderNoOverlap(canvasElement);
    await assertChevronColumnAligned(canvasElement);
  },
};

export const ToggleAllCategories: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await expect(canvas.getByRole("button", { name: "Cytotoxic" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Collapse all filter categories" }));
    await expect(canvas.queryByRole("button", { name: "Cytotoxic" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Collapse all filter categories" }));
    await expect(canvas.queryByRole("button", { name: "Cytotoxic" })).not.toBeInTheDocument();
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
    await expect(canvas.getByText("0 Da")).toBeVisible();
    await expect(canvas.getByText("2000 Da")).toBeVisible();
    await expect(args.onFiltersChange).not.toHaveBeenCalled();

    const maxThumb = canvas.getByRole("slider", { name: /maximum value/i });
    maxThumb.focus();
    await userEvent.keyboard("{ArrowDown}");

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
    await expect(canvas.getByRole("button", { name: "Cytotoxic" })).toBeVisible();
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
