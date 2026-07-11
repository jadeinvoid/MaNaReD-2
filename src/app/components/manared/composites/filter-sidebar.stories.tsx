import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  withColourMode,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";

import { FILTER_BAR_SURFACE, FILTER_SIDEBAR_SHELL } from "../primitives/gradient-styles";
import {
  BUTTON_UNDERLINE_HOVER,
  INTERACTIVE_FILTER_CLEAR_ALL,
  INTERACTIVE_FILTER_SIDEBAR_ICON,
} from "../primitives/interactive-styles";
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

async function assertFilterContainer(canvasElement: HTMLElement) {
  const region = canvasElement.querySelector('[data-name="filter/container"]');
  if (!region) {
    throw new Error("FilterSidebar container not found");
  }

  await expect(region.className).not.toContain("surface-gradient-filter-panel");
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
  const collapseIcon = collapse.querySelector("svg");
  const collapseRight =
    collapseIcon?.getBoundingClientRect().right ?? collapse.getBoundingClientRect().right;
  const chevronRight = chevron.getBoundingClientRect().right;
  if (Math.abs(collapseRight - chevronRight) > 1) {
    throw new Error(
      `Chevron column misaligned: collapse icon right ${collapseRight}, chevron right ${chevronRight}`,
    );
  }
}

async function assertCollapsedFitsRail(canvasElement: HTMLElement) {
  const shell = getFilterShell(canvasElement);
  const collapse = getCollapseButton(canvasElement);

  await expect(collapse).toBeVisible();
  await expect(shell.dataset.collapsed).toBe("true");

  const shellWidth = shell.getBoundingClientRect().width;
  if (shellWidth > 48) {
    throw new Error(`Expected collapsed shell width <= 48px, got ${shellWidth}`);
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
    await assertFilterContainer(canvasElement);
    await assertHeaderNoOverlap(canvasElement);
    await assertChevronColumnAligned(canvasElement);
    await expect(canvas.getByText("Refine Results").className).toContain("text-2xs");

    const collapseFilters = canvas.getByRole("button", { name: "Collapse filters" });
    const collapseAll = canvas.getByRole("button", { name: "Collapse all filter categories" });
    await expectUsesTokenClasses(collapseFilters.className, BUTTON_UNDERLINE_HOVER);
    await expectUsesTokenClasses(collapseAll.className, BUTTON_UNDERLINE_HOVER);
    await expectUsesTokenClasses(INTERACTIVE_FILTER_SIDEBAR_ICON, BUTTON_UNDERLINE_HOVER);

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
    await expectUsesTokenClasses(
      canvas.getByRole("button", { name: "Expand filters" }).className,
      BUTTON_UNDERLINE_HOVER,
    );
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
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Collapse all filter categories" }));
    await expect(canvas.queryByRole("button", { name: "Cytotoxic (48)" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Collapse all filter categories" }));
    await expect(canvas.queryByRole("button", { name: "Cytotoxic (48)" })).not.toBeInTheDocument();
  },
};

export const ClearAllFromContainer: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
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
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
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
    await expect(canvas.getByRole("spinbutton", { name: /minimum molecular weight/i })).toHaveValue(
      0,
    );
    await expect(canvas.getByRole("spinbutton", { name: /maximum molecular weight/i })).toHaveValue(
      2000,
    );
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

export const ExpandGeographicRegion: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Geographic Region filter"));
    await expect(canvas.getByText("All regions")).toBeVisible();
    await userEvent.click(canvas.getByRole("checkbox", { name: "Indo-Pacific" }));
    await expect(args.onFiltersChange).toHaveBeenCalled();
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(
      lastCall?.active.some((filter: ActiveFilter) => filter.label === "Indo-Pacific"),
    ).toBe(true);
  },
};

export const ExpandCompoundClass: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Compound Class filter"));
    await expect(canvas.getByRole("combobox", { name: "Compound class" })).toBeVisible();
    await expect(canvasElement.querySelector("[data-filter-dropdown-panel]")).toBeTruthy();
    const trigger = canvasElement.querySelector<HTMLElement>(".filter-compound-class-selector");
    if (!trigger) {
      throw new Error("Compound class selector trigger not found");
    }
    const probe = document.createElement("div");
    probe.style.fontSize = "var(--font-size-3xs)";
    document.body.appendChild(probe);
    const expectedFontSize = getComputedStyle(probe).fontSize;
    probe.remove();
    await expect(getComputedStyle(trigger).fontSize).toBe(expectedFontSize);
    await expect(getComputedStyle(trigger).justifyContent).toBe("flex-start");
  },
};

export const ClearAll: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(lastCall?.active).toEqual([]);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
  },
};

export const ExpandTargetAssay: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Target / assay filter"));
    await expect(canvas.getByRole("button", { name: "MTT assay (31)" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "MTT assay (31)" }));
    await expect(args.onFiltersChange).toHaveBeenCalled();
    const lastCall = args.onFiltersChange?.mock.calls.at(-1)?.[0];
    await expect(
      lastCall?.active.some((filter: ActiveFilter) => filter.label === "MTT assay"),
    ).toBe(true);
  },
};

export const BioactivityWithCounts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Antibacterial (0)" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByText("Antibacterial (0)")).toBeVisible();
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <FilterSidebar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertFilterContainer(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <FilterSidebar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertFilterContainer(canvasElement));
  },
};
