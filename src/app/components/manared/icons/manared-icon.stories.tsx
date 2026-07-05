import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import {
  MANARED_ICONS_12,
  MANARED_ICONS_16,
  MANARED_ICONS_24,
  MANARED_ICONS_32,
  MaNaReDIcon,
  type MaNaReDIconName,
} from "./manared-icon";

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
    size: 16,
    label: "search",
  },
} satisfies Meta<typeof MaNaReDIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

function IconGallery({
  icons,
  size,
}: {
  icons: readonly MaNaReDIconName[];
  size: 12 | 16 | 24 | 32;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {icons.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-lg bg-surface p-3">
          <MaNaReDIcon name={name} size={size} label={name} />
          <span className="text-2xs text-secondary">{name}</span>
        </div>
      ))}
    </div>
  );
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("search")).toBeVisible();
  },
};

export const Gallery12: Story = {
  render: () => <IconGallery icons={MANARED_ICONS_12} size={12} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of MANARED_ICONS_12) {
      await expect(canvas.getByLabelText(name)).toBeVisible();
    }
  },
};

export const Gallery16: Story = {
  render: () => <IconGallery icons={MANARED_ICONS_16} size={16} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of MANARED_ICONS_16) {
      await expect(canvas.getByLabelText(name)).toBeVisible();
    }
  },
};

export const Gallery24: Story = {
  render: () => <IconGallery icons={MANARED_ICONS_24} size={24} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of MANARED_ICONS_24) {
      await expect(canvas.getByLabelText(name)).toBeVisible();
    }
  },
};

export const Gallery32: Story = {
  render: () => <IconGallery icons={MANARED_ICONS_32} size={32} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of MANARED_ICONS_32) {
      await expect(canvas.getByLabelText(name)).toBeVisible();
    }
  },
};

export const FigmaComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <IconGallery icons={MANARED_ICONS_12} size={12} />
      <IconGallery icons={MANARED_ICONS_16} size={16} />
      <IconGallery icons={MANARED_ICONS_24} size={24} />
      <IconGallery icons={MANARED_ICONS_32} size={32} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("move-left")).toBeVisible();
    await expect(canvas.getByLabelText("search")).toBeVisible();
    await expect(canvas.getByLabelText("chevron-down")).toBeVisible();
    await expect(canvas.getByLabelText("compound")).toBeVisible();
    await expect(canvas.getByLabelText("profile")).toBeVisible();
  },
};
