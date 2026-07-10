import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FilterCompoundTag } from "./filter-compound-tag";
import { expectUsesTokenClasses } from "@/storybook/manared/shared/assert-token-colours";

const FIGMA_COMPOUND_TAG =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=166-925";

const meta = {
  title: "MaNaReD/Primitives/FilterCompoundTag",
  component: FilterCompoundTag,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_COMPOUND_TAG },
  },
  args: {
    label: "Cytotoxic (48)",
    state: "unselected",
    onToggle: fn(),
  },
} satisfies Meta<typeof FilterCompoundTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    if (!pill) {
      throw new Error("Tag pill not found");
    }
    await expectUsesTokenClasses(pill.className, "bg-dropdown-active", "text-tertiary");
  },
};

export const Selected: Story = {
  args: { state: "selected" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const pill = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    if (!pill) {
      throw new Error("Tag pill not found");
    }
    await expectUsesTokenClasses(pill.className, "bg-entity-compound-bg");
  },
};

export const ZeroCount: Story = {
  args: { state: "zero-count", label: "Antibacterial (0)" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("button", { name: "Antibacterial (0)" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByText("Antibacterial (0)")).toBeVisible();
  },
};

export const Toggle: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
    await expect(args.onToggle).toHaveBeenCalledOnce();
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap justify-end gap-0">
      <FilterCompoundTag label="Antiviral (12)" state="unselected" />
      <FilterCompoundTag label="Cytotoxic (48)" state="selected" />
      <FilterCompoundTag label="Antibacterial (0)" state="zero-count" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Antiviral (12)" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
    await expect(canvas.getByText("Antibacterial (0)")).toBeVisible();
  },
};
