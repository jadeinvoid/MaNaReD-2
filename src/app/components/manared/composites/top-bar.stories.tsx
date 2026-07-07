import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { SURFACE_TOP_BAR } from "../primitives/surface-styles";
import { TopBar } from "./top-bar";

const FIGMA_TOPBAR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9045";

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
  title: "MaNaReD/Composites/TopBar",
  component: TopBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_TOPBAR },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertTopBarSurface(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const header = canvas.getByLabelText("MaNaReD logo").closest("header");
  if (!header) {
    throw new Error("TopBar shell not found");
  }

  await expectUsesTokenClasses(header.className, "bg-surface", "border-emphasized", "h-14");
  await expect(SURFACE_TOP_BAR).toContain("bg-surface");
  await expect(SURFACE_TOP_BAR).toContain("border-emphasized");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-emphasized", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
  }
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("MaNaReD logo")).toBeVisible();
    await expect(canvas.getByText("Tools")).toBeVisible();
    await assertTopBarSurface(canvasElement);
    const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
    await expect(input).toBeVisible();
    await userEvent.type(input, "alkaloid");
    await expect(input).toHaveValue("alkaloid");
  },
};

export const LightMode: Story = {
  render: () => (
    <ColourModeFrame mode="light">
      <TopBar />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertTopBarSurface(canvasElement));
  },
};

export const DarkMode: Story = {
  render: () => (
    <ColourModeFrame mode="dark">
      <TopBar />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertTopBarSurface(canvasElement));
  },
};
