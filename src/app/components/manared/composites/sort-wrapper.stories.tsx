import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";

import { INTERACTIVE_CHIP_BAR_CONTROL } from "../primitives/interactive-styles";
import { SortWrapper } from "./sort-wrapper";

const FIGMA_SORT = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9089";

const meta = {
  title: "MaNaReD/Composites/SortWrapper",
  component: SortWrapper,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_SORT },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof SortWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertSortWrapperTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const sortButton = canvas.getByRole("button", { name: /Sort by/ });

  await expectUsesTokenClasses(
    sortButton.className,
    "bg-body",
    "border-border-secondary",
    "text-secondary",
    "text-3xs",
  );
  await expectUsesTokenClasses(INTERACTIVE_CHIP_BAR_CONTROL, "bg-body", "border-border-secondary");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-body", "backgroundColor");
    await expectResolvedToken(mode, "--color-border-secondary", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
  }
}

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await assertSortWrapperTokenColours(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
