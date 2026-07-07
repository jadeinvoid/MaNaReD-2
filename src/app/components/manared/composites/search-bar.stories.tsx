import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { SURFACE_SEARCH_BAR } from "../primitives/surface-styles";
import { SearchBar } from "./search-bar";

const FIGMA_SEARCH = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9047";

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
  title: "MaNaReD/Composites/SearchBar",
  component: SearchBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_SEARCH },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertSearchBarSurface(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
  const shell = input.closest('[class*="bg-surface"]');
  if (!shell) {
    throw new Error("SearchBar shell not found");
  }

  await expectUsesTokenClasses(shell.className, "bg-surface", "rounded-lg", "border-emphasized");
  await expect(SURFACE_SEARCH_BAR).toContain("bg-surface");
  await expect(SURFACE_SEARCH_BAR).toContain("border-emphasized");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-emphasized", "borderColor");
  }
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
    await expect(input).toBeVisible();
    await assertSearchBarSurface(canvasElement);
    await userEvent.type(input, "alkaloid");
    await expect(input).toHaveValue("alkaloid");
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <SearchBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertSearchBarSurface(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <SearchBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertSearchBarSurface(canvasElement));
  },
};
