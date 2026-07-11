import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import {
  withColourMode,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";
import { expectButtonHoverElevates } from "@/storybook/manared/shared/assert-hover-elevation";

import { BUTTON_ELEVATION_HOVER, INTERACTIVE_NAV_ITEM } from "../primitives/interactive-styles";

import { GRADIENT_SIDEBAR } from "../primitives/gradient-styles";
import { NavSideBar } from "./nav-side-bar";

const FIGMA_NAV = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=339-3237";
const FIGMA_NAV_COLLAPSED =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=339-3238";

const ANIMATION_MS = 175;

function isElementVisible(element: Element): boolean {
  let current: Element | null = element;
  while (current) {
    if (current.getAttribute("aria-hidden") === "true") {
      return false;
    }

    if (current instanceof HTMLElement || current instanceof SVGElement) {
      const style = getComputedStyle(current);
      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        Number(style.opacity) === 0
      ) {
        return false;
      }
    }

    current = current.parentElement;
  }

  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

async function waitForTextVisibility(
  canvas: ReturnType<typeof within>,
  text: string,
  visible: boolean,
) {
  await waitFor(
    () => {
      const element = canvas.getByText(text);
      if (!(element instanceof Element)) {
        throw new Error(`Expected "${text}" to be an Element`);
      }

      const shown = isElementVisible(element);
      if (shown !== visible) {
        throw new Error(`Expected "${text}" visibility=${visible}, got ${shown}`);
      }
    },
    { timeout: ANIMATION_MS + 100 },
  );
}

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

async function waitForNavSideBarWidth(canvasElement: HTMLElement, width: number) {
  const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
  if (!sidebar || !(sidebar instanceof HTMLElement)) {
    throw new Error("NavSideBar shell not found");
  }

  await waitFor(
    () => {
      const actual = sidebar.getBoundingClientRect().width;
      if (actual !== width) {
        throw new Error(`Expected nav sidebar width ${width}, got ${actual}`);
      }
    },
    { timeout: ANIMATION_MS + 100 },
  );
}

async function assertNavSideBarLayout(canvasElement: HTMLElement) {
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
    await assertNavSideBarWidth(canvasElement, 192);
    await assertNavSideBarLayout(canvasElement);
    await assertNavSideBarGradient(canvasElement);

    const region = canvas.getByRole("button", { name: "Region" });
    await expectUsesTokenClasses(region.className, INTERACTIVE_NAV_ITEM, BUTTON_ELEVATION_HOVER);
    await expectButtonHoverElevates(region);
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
    await expect(canvas.getByText("Compound")).toSatisfy(
      (element) => element instanceof Element && !isElementVisible(element),
    );
    await expect(canvas.getByLabelText("MaNaReD logo")).toSatisfy(
      (element) => element instanceof Element && !isElementVisible(element),
    );
    await expect(canvasElement.querySelector('[data-name="logo"]')).toBeTruthy();
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
    await waitForTextVisibility(canvas, "Compound", false);
    await waitForNavSideBarWidth(canvasElement, 56);

    await userEvent.click(canvas.getByRole("button", { name: "Expand sidebar" }));
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(false);
    await waitForTextVisibility(canvas, "Compound", true);
    await waitForNavSideBarWidth(canvasElement, 192);
  },
};

export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen bg-body motion-reduce">
        <style>{`
          .motion-reduce .nav-sidebar-shell,
          .motion-reduce .nav-sidebar-reveal {
            transition: none !important;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await assertNavSideBarWidth(canvasElement, 192);

    await userEvent.click(canvas.getByRole("button", { name: "Collapse sidebar" }));
    await assertNavSideBarWidth(canvasElement, 56);

    await userEvent.click(canvas.getByRole("button", { name: "Expand sidebar" }));
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
