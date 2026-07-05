import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ListTextRow } from "./list-text";

const FIGMA_LIST = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9204";

const meta = {
  title: "MaNaReD/Primitives/ListText",
  component: ListTextRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_LIST },
  },
  args: {
    id: "CMNPD-00482",
    title: "Latrunculin A",
    label: "MW 421.5",
  },
} satisfies Meta<typeof ListTextRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("CMNPD-00482")).toBeVisible();
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("MW 421.5")).toBeVisible();
  },
};
