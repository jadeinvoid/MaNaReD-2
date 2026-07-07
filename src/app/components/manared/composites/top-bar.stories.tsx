import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";

import { INTERACTIVE_TOPBAR_UTILITY_LINK } from "../primitives/interactive-styles";
import { SURFACE_TOP_BAR } from "../primitives/surface-styles";
import { TopBar } from "./top-bar";

const FIGMA_TOPBAR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=340-3751";

const meta = {
  title: "MaNaReD/Composites/TopBar",
  component: TopBar,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_TOPBAR },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    state: "collapsed",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByLabelText("MaNaReD logo")).not.toBeInTheDocument();
    await expect(canvas.getByText("Tools")).toBeVisible();
    await expect(canvas.getByText("Resources")).toBeVisible();
    await expect(canvas.getByText("Help")).toBeVisible();
    await expect(canvas.getByLabelText("Profile")).toBeVisible();

    const header = canvasElement.querySelector("header");
    if (!header) {
      throw new Error("TopBar header not found");
    }
    await expectUsesTokenClasses(header.className, SURFACE_TOP_BAR);
    await expectResolvedToken("light", "--color-background-page-tertiary", "backgroundColor");

    const tools = canvas.getByText("Tools");
    await expectUsesTokenClasses(tools.className, INTERACTIVE_TOPBAR_UTILITY_LINK);

    const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
    await userEvent.type(input, "sponge");
    await expect(input).toHaveValue("sponge");
    await expect(canvas.queryByText("Also Matches:")).not.toBeInTheDocument();
  },
};

export const Extended: Story = {
  args: {
    state: "extended",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Sponge (Porifera)")).toBeVisible();
    await expect(canvas.getByText("best match")).toBeVisible();
    await expect(canvas.getByText("Also Matches:")).toBeVisible();
    await expect(canvas.getByText("navigate")).toBeVisible();
    await expect(canvas.getByText("search all")).toBeVisible();
  },
};

export const OpensOnFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
    await userEvent.click(input);
    await expect(canvas.getByText("Also Matches:")).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search compounds, organisms, regions…");
    await userEvent.click(input);
    await expect(canvas.getByText("Also Matches:")).toBeVisible();
    await userEvent.click(canvas.getByText("Tools"));
    await expect(canvas.queryByText("Also Matches:")).not.toBeInTheDocument();
  },
};
