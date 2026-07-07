import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

import { GRADIENT_SIDEBAR } from "../primitives/gradient-styles";
import { NavSideBar } from "./nav-side-bar";

const FIGMA_NAV = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=339-3237";
const FIGMA_NAV_COLLAPSED =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=339-3238";

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
  args: {
    onCollapsedChange: fn(),
  },
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

async function assertNavSideBarWidth(canvasElement: HTMLElement, width: number) {
  const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
  if (!sidebar || !(sidebar instanceof HTMLElement)) {
    throw new Error("NavSideBar shell not found");
  }

  await expect(sidebar.getBoundingClientRect().width).toBe(width);
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
    await assertNavSideBarWidth(canvasElement, 192);
    await assertNavSideBarGradient(canvasElement);
  },
};

export const Collapsed: Story = {
  args: { defaultCollapsed: true },
  parameters: {
    design: { type: "figma", url: FIGMA_NAV_COLLAPSED },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Expand sidebar" })).toBeVisible();
    await expect(canvas.getByLabelText("Overview")).toBeVisible();
    await expect(canvas.getByLabelText("Explore")).toBeVisible();
    await expect(canvas.getByLabelText("Workspace")).toBeVisible();
    await expect(canvas.queryByText("Compound")).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText("MaNaReD logo")).not.toBeInTheDocument();
    await assertNavSideBarWidth(canvasElement, 56);
    await assertNavSideBarGradient(canvasElement);
  },
};

export const ToggleCollapse: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compound")).toBeVisible();
    await assertNavSideBarWidth(canvasElement, 192);

    await userEvent.click(canvas.getByRole("button", { name: "Collapse sidebar" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(true);
    await expect(canvas.queryByText("Compound")).not.toBeInTheDocument();
    await assertNavSideBarWidth(canvasElement, 56);

    await userEvent.click(canvas.getByRole("button", { name: "Expand sidebar" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(false);
    await expect(canvas.getByText("Compound")).toBeVisible();
    await assertNavSideBarWidth(canvasElement, 192);
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
