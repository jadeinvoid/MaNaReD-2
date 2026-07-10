import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import {
  INTERACTIVE_CHIP_BAR_VIEW_SEGMENT,
  INTERACTIVE_CHIP_BAR_VIEW_SEGMENT_ACTIVE,
  INTERACTIVE_CHIP_BAR_VIEW_TOGGLE,
} from "../primitives/interactive-styles";
import { ViewToggle } from "./view-toggle";

const FIGMA_CHIP_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=349-3993";

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
  title: "MaNaReD/Composites/ViewToggle",
  component: ViewToggle,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: FIGMA_CHIP_BAR,
    },
    docs: {
      description: {
        component:
          "Card/list results view toggle for chip bar (UX §4.1). Visual tokens derived from `chip-bar/more-filters`; Figma `chip-bar/view-toggle` TBD.",
      },
    },
  },
  args: {
    value: "card" as const,
    onChange: fn(),
  },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertViewToggleTokens(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const group = canvas.getByRole("group", { name: "Results view" });
  const cardButton = canvas.getByRole("button", { name: "Card view" });
  const listButton = canvas.getByRole("button", { name: "List view" });

  await expectUsesTokenClasses(group.className, "bg-body", "border-border-secondary");
  await expectUsesTokenClasses(
    INTERACTIVE_CHIP_BAR_VIEW_TOGGLE,
    "bg-body",
    "border-border-secondary",
  );
  await expectUsesTokenClasses(cardButton.className, "bg-button-active", "text-primary");
  await expectUsesTokenClasses(INTERACTIVE_CHIP_BAR_VIEW_SEGMENT, "text-secondary");
  await expectUsesTokenClasses(
    INTERACTIVE_CHIP_BAR_VIEW_SEGMENT_ACTIVE,
    "bg-button-active",
    "text-primary",
  );
  await expect(listButton).toHaveAttribute("aria-pressed", "false");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-body", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-secondary", "borderColor");
    await expectResolvedToken(mode, "--color-interactive-button-active", "backgroundColor");
  }
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Card view" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await assertViewToggleTokens(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "List view" }));
    await expect(args.onChange).toHaveBeenCalledWith("list");
  },
};

export const ListSelected: Story = {
  args: { value: "list" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "List view" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "Card view" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <ViewToggle {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertViewToggleTokens(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <ViewToggle {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertViewToggleTokens(canvasElement));
  },
};
