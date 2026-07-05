import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { StatusPill } from "./status-pill";

const meta = {
  title: "Vibework/Components/StatusPill",
  component: StatusPill,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["success", "error", "warning"],
    },
  },
  args: {
    status: "success",
    label: "Success",
  },
} satisfies Meta<typeof StatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Success")).toBeVisible();
  },
};

export const Error: Story = {
  args: {
    status: "error",
    label: "Error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Error")).toBeVisible();
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
    label: "Warning",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Warning")).toBeVisible();
  },
};
