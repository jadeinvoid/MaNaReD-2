import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import { GRADIENT_SIDEBAR } from "../primitives/gradient-styles";
import { NavSideBar } from "./nav-side-bar";

const FIGMA_NAV = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=339-3237";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  const frameStyle: CSSProperties = {
    colorScheme: mode,
    height: "100vh",
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
  title: "MaNaReD/Composites/NavSideBar",
  component: NavSideBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_NAV },
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-body">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertNavSideBarGradient(canvasElement: HTMLElement) {
  const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
  if (!sidebar) {
    throw new Error("NavSideBar gradient surface not found");
  }

  const beforeStyle = getComputedStyle(sidebar, "::before");
  await expect(beforeStyle.backgroundColor, "sidebar base fill should resolve").not.toBe("");
  await expect(getComputedStyle(sidebar, "::after").backgroundImage).toContain("gradient");
}

async function assertNavSideBarLayout(canvasElement: HTMLElement) {
  const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
  if (!sidebar || !(sidebar instanceof HTMLElement)) {
    throw new Error("NavSideBar shell not found");
  }

  const style = getComputedStyle(sidebar);
  await expect(style.width).toBe("192px");
  await expect(sidebar.getBoundingClientRect().width).toBe(192);
  await expect(canvasElement.querySelector('[data-name="nav-side-bar/header"]')).toBeTruthy();
  await expect(canvasElement.querySelector('[data-name="logo"]')).toBeTruthy();
  await expect(canvasElement.querySelector('[data-name="nav-side-bar/content"]')).toBeTruthy();
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("MaNaReD logo")).toBeVisible();
    await expect(canvas.getByText("Overview")).toBeVisible();
    await expect(canvas.getByText("Explore")).toBeVisible();
    await expect(canvas.getByText("Compound")).toBeVisible();
    await expect(canvas.getByText("Region")).toBeVisible();
    await expect(canvas.getByText("Workspace")).toBeVisible();
    await expect(canvas.getByText("My Library")).toBeVisible();
    await expect(canvas.queryByText("Geographic Region")).not.toBeInTheDocument();
    await assertNavSideBarLayout(canvasElement);
    await assertNavSideBarGradient(canvasElement);
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <NavSideBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertNavSideBarGradient(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <NavSideBar {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertNavSideBarGradient(canvasElement));
  },
};
