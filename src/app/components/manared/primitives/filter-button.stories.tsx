import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { SURFACE_CARD_PANEL } from "./surface-styles";
import {
  INTERACTIVE_FILTER_ACTION_BASE,
  INTERACTIVE_FILTER_APPLY,
  INTERACTIVE_FILTER_CLEAR_ALL,
  INTERACTIVE_FILTER_REFINE_LABEL,
} from "./interactive-styles";
import { FilterButton } from "./filter-button";

const FIGMA_FILTER_BTN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9066";

const SIDEBAR_SHELL = `w-[280px] p-4 ${SURFACE_CARD_PANEL}`;

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

function SidebarShell({ children }: { children: ReactNode }) {
  return <div className={SIDEBAR_SHELL}>{children}</div>;
}

const meta = {
  title: "MaNaReD/Primitives/FilterButton",
  component: FilterButton,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_FILTER_BTN },
  },
  decorators: [
    (Story) => (
      <SidebarShell>
        <Story />
      </SidebarShell>
    ),
  ],
  args: {
    variant: "refine-result",
    onClick: fn(),
  },
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertFilterButtonTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const refineLabel = canvas.getByText("Refine Results");
  const clearAll = canvas.getByRole("button", { name: "Clear All" });
  const applyFilter = canvas.getByRole("button", { name: "Apply Filter" });

  await expectUsesTokenClasses(refineLabel.className, "text-secondary", "text-sm");
  await expectUsesTokenClasses(INTERACTIVE_FILTER_REFINE_LABEL, "text-secondary", "text-sm");
  await expectUsesTokenClasses(
    clearAll.className,
    "bg-button-active",
    "text-primary",
    "border-tertiary",
    "text-3xs",
  );
  await expectUsesTokenClasses(
    applyFilter.className,
    "bg-button-active",
    "border-border-secondary",
    "text-2xs",
  );
  await expectUsesTokenClasses(INTERACTIVE_FILTER_ACTION_BASE, "bg-button-active", "text-primary");
  await expectUsesTokenClasses(INTERACTIVE_FILTER_CLEAR_ALL, "border-tertiary", "text-3xs");
  await expectUsesTokenClasses(INTERACTIVE_FILTER_APPLY, "border-border-secondary", "text-2xs");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-interactive-button-active", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-tertiary", "borderColor");
    await expectResolvedToken(mode, "--color-text-primary", "color");
  }
}

export const RefineResult: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Refine Results" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const RefineResultLabel: Story = {
  args: { onClick: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Refine Results")).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Refine Results" })).not.toBeInTheDocument();
  },
};

export const ClearAll: Story = {
  args: { variant: "clear-all", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Clear All" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const ApplyFilter: Story = {
  args: { variant: "apply-filter", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Apply Filter" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** Filter sidebar header + footer button row from Figma `332:9061`. */
export const FigmaVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <FilterButton variant="refine-result" />
        <FilterButton variant="clear-all" onClick={() => {}} />
      </div>
      <div className="flex justify-end">
        <FilterButton variant="apply-filter" onClick={() => {}} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await assertFilterButtonTokenColours(canvasElement);
  },
};

export const LightMode: Story = {
  render: () => (
    <ColourModeFrame mode="light">
      <SidebarShell>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <FilterButton variant="refine-result" />
            <FilterButton variant="clear-all" onClick={() => {}} />
          </div>
          <div className="flex justify-end">
            <FilterButton variant="apply-filter" onClick={() => {}} />
          </div>
        </div>
      </SidebarShell>
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertFilterButtonTokenColours(canvasElement));
  },
};

export const DarkMode: Story = {
  render: () => (
    <ColourModeFrame mode="dark">
      <SidebarShell>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <FilterButton variant="refine-result" />
            <FilterButton variant="clear-all" onClick={() => {}} />
          </div>
          <div className="flex justify-end">
            <FilterButton variant="apply-filter" onClick={() => {}} />
          </div>
        </div>
      </SidebarShell>
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertFilterButtonTokenColours(canvasElement));
  },
};
