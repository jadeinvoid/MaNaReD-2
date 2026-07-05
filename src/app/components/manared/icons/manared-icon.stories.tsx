import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { MANARED_ICON_NAMES, MaNaReDIcon } from "./manared-icon";

const FIGMA_ICONS = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=93-1469";

const meta = {
  title: "MaNaReD/Icons/MaNaReDIcon",
  component: MaNaReDIcon,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_ICONS },
  },
  args: {
    name: "search",
    size: 24,
  },
} satisfies Meta<typeof MaNaReDIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "search", size: 24, label: "search" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("search")).toBeVisible();
  },
};

export const Gallery16: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      {MANARED_ICON_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-lg bg-surface p-3">
          <MaNaReDIcon name={name} size={16} label={name} />
          <span className="text-2xs text-secondary">{name}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("search")).toBeVisible();
    await expect(canvas.getByLabelText("compound")).toBeVisible();
  },
};

export const Gallery24: Story = {
  args: { name: "compound", size: 24, label: "compound" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("compound")).toBeVisible();
  },
};

export const Gallery32: Story = {
  args: { name: "profile", size: 32, label: "profile" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("profile")).toBeVisible();
  },
};
