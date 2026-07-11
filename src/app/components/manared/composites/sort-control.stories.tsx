import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
} from "@/storybook/manared/shared/assert-token-colours";
import { expectButtonHoverUnderline } from "@/storybook/manared/shared/assert-hover-elevation";

import {
  BUTTON_UNDERLINE_HOVER,
  INTERACTIVE_CHIP_BAR_CONTROL,
  INTERACTIVE_SORT_DROPDOWN_ROW,
} from "../primitives/interactive-styles";
import { SortControl } from "./sort-control";

const FIGMA_CHIP_BAR =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=349-3993";

const meta = {
  title: "MaNaReD/Composites/SortControl",
  component: SortControl,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_CHIP_BAR },
  },
  args: {
    entity: "compounds",
    value: "recentlyAdded",
    onChange: fn(),
  },
} satisfies Meta<typeof SortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertSortControlTokenColours(canvasElement: HTMLElement) {
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
    await assertSortControlTokenColours(canvasElement);
    await expect(canvas.getByRole("button", { name: /Sort by: Recently Added/ })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(canvas.getByRole("listbox", { name: "Sort options" })).toBeVisible();
    const nameAsc = canvas.getByRole("option", { name: "Name (A-Z)" });
    await expectUsesTokenClasses(nameAsc.className, BUTTON_UNDERLINE_HOVER);
    await expectUsesTokenClasses(INTERACTIVE_SORT_DROPDOWN_ROW, BUTTON_UNDERLINE_HOVER);
    await expectButtonHoverUnderline(nameAsc);
    await userEvent.click(nameAsc);
    await expect(args.onChange).toHaveBeenCalledWith("nameAsc");
  },
};

export const OrganismOptions: Story = {
  args: {
    entity: "organisms",
    value: "recentlyAdded",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    await expect(canvas.getByRole("option", { name: "Phylum" })).toBeVisible();
    await expect(canvas.getAllByRole("option", { name: /Compound Count/ }).length).toBe(2);
  },
};

export const RegionOptions: Story = {
  args: {
    entity: "regions",
    value: "recentlyAdded",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Sort by/ }));
    const options = canvas.getAllByRole("option");
    await expect(options[3]).toHaveAccessibleName(/Compound Count/);
    await expect(options[4]).toHaveAccessibleName(/Compound Count/);
    await expect(options[5]).toHaveAccessibleName(/Organism Count/);
    await expect(options[6]).toHaveAccessibleName(/Organism Count/);
  },
};
