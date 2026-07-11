import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { MOCK_BIOACTIVITY_TAGS, MOCK_BIOACTIVITY_TAGS_EXTENDED } from "./filter-state";
import { FilterTagPanel } from "./filter-tag-panel";
import {
  expectedTokenColour,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

const FIGMA_TAG_DROPDOWN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=166-998";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  return (
    <div style={{ colorScheme: mode }} data-colour-mode={mode} className="bg-body p-4">
      {children}
    </div>
  );
}

const meta = {
  title: "MaNaReD/Composites/FilterTagPanel",
  component: FilterTagPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_TAG_DROPDOWN },
  },
  args: {
    tags: MOCK_BIOACTIVITY_TAGS,
    selected: [],
    onToggle: fn(),
  },
} satisfies Meta<typeof FilterTagPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
    await expect(args.onToggle).toHaveBeenCalledWith("Cytotoxic");
  },
};

export const Selected: Story = {
  args: {
    selected: ["Cytotoxic", "Antiviral"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const WithCounts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Antifungal (7)" })).toBeVisible();
  },
};

export const ZeroCountDisabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("button", { name: "Antibacterial (0)" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByText("Antibacterial (0)")).toBeVisible();
  },
};

export const PartialSelection: Story = {
  args: {
    selected: ["Cytotoxic", "Antiviral"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selected = canvas.getByRole("button", { name: "Cytotoxic (48)" }).querySelector("span");
    const unselected = canvas.getByRole("button", { name: "Antifungal (7)" }).querySelector("span");
    if (
      !selected ||
      !unselected ||
      !(selected instanceof HTMLElement) ||
      !(unselected instanceof HTMLElement)
    ) {
      throw new Error("Tag spans not found");
    }
    await expect(selected.className).toContain("filter-compound-tag-pill--selected");
    await expect(unselected.className).toContain("filter-compound-tag-pill--unselected");
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <FilterTagPanel {...args} selected={["Cytotoxic"]} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = canvasElement.querySelector("[data-filter-tag-panel]");
    if (!panel || !(panel instanceof HTMLElement)) {
      throw new Error("Filter tag panel not found");
    }
    await expect(panel.querySelector(".filter-tag-row")).toBeTruthy();
    const unselected = canvas.getByRole("button", { name: "Antiviral (12)" }).querySelector("span");
    if (!unselected || !(unselected instanceof HTMLElement)) {
      throw new Error("Unselected tag not found");
    }
    await withColourMode("dark", async () => {
      await expect(getComputedStyle(unselected).backgroundColor).toBe(
        expectedTokenColour("--color-background-sidebar-tertiary", "dark"),
      );
    });
  },
};

export const ManyTagsWithSearch: Story = {
  args: {
    tags: MOCK_BIOACTIVITY_TAGS_EXTENDED,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("textbox", { name: "Filter tags" })).toBeVisible();
    await userEvent.type(canvas.getByRole("textbox", { name: "Filter tags" }), "anti");
    await expect(canvas.getByRole("button", { name: /Antiviral/ })).toBeVisible();
    await expect(canvas.queryByRole("button", { name: /Cytotoxic/ })).not.toBeInTheDocument();
  },
};
