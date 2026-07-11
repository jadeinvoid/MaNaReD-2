import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { FilterCompoundTag } from "./filter-compound-tag";
import {
  expectedTokenColour,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

const FIGMA_COMPOUND_TAG =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=166-925";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  return (
    <div style={{ colorScheme: mode }} data-colour-mode={mode} className="bg-body p-4">
      {children}
    </div>
  );
}

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
  render: (args) => (
    <ColourModeFrame mode="light">
      <FilterCompoundTag {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    if (!pill || !(pill instanceof HTMLElement)) {
      throw new Error("Tag pill not found");
    }
    await expect(pill.className).toContain("filter-compound-tag-pill--unselected");
    await withColourMode("light", async () => {
      await expect(getComputedStyle(pill).backgroundColor).toBe(
        expectedTokenColour("--color-interactive-dropdown-active", "light"),
      );
    });
  },
};

export const Selected: Story = {
  args: { state: "selected" },
  render: (args) => (
    <ColourModeFrame mode="dark">
      <FilterCompoundTag {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const pill = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    if (!pill || !(pill instanceof HTMLElement)) {
      throw new Error("Tag pill not found");
    }
    await expect(pill.className).toContain("filter-compound-tag-pill--selected");
    await withColourMode("dark", async () => {
      await expect(getComputedStyle(pill).backgroundColor).toBe(
        expectedTokenColour("--color-background-cyan", "dark"),
      );
    });
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

export const DarkModeUnselected: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <FilterCompoundTag {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    if (!pill || !(pill instanceof HTMLElement)) {
      throw new Error("Tag pill not found");
    }
    await withColourMode("dark", async () => {
      await expect(getComputedStyle(pill).backgroundColor).toBe(
        expectedTokenColour("--color-background-sidebar-tertiary", "dark"),
      );
      await expect(getComputedStyle(pill).color).toBe(
        expectedTokenColour("--color-text-primary", "dark"),
      );
    });
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap justify-start gap-0">
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
