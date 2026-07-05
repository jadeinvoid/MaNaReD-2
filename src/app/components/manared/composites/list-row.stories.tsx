import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ListRow } from "./list-row";

const FIGMA_LIST_ROW =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9201";

const meta = {
  title: "MaNaReD/Domain/ListRow",
  component: ListRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_LIST_ROW },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "CMNPD-00482",
    title: "Latrunculin A",
    chips: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Alkaloid", entity: "compound" },
    ],
    label: "MW 421.5",
  },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("MW 421.5")).toBeVisible();
  },
};
