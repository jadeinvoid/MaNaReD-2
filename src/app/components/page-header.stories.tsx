import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { PageHeader } from "./page-header";

const meta = {
  title: "Vibework/Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "Astryx + Tailwind",
    description:
      "RedwoodSDK RSC on Cloudflare Workers. Astryx ships pre-built component CSS; Tailwind handles layout and token-backed utilities via the design-system bridge.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: args.title, level: 1 })).toBeVisible();
    await expect(canvas.getByText(args.description)).toBeVisible();
  },
};

export const ShortCopy: Story = {
  args: {
    title: "Quick start",
    description: "Build UI in isolation with Storybook.",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: args.title, level: 1 })).toBeVisible();
    await expect(canvas.getByText(args.description)).toBeVisible();
  },
};
