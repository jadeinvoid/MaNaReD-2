import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, ListItem } from "@astryxdesign/core/List";
import { expect, within } from "storybook/test";

import { withColourMode } from "@/storybook/manared/shared/assert-token-colours";

const meta = {
  title: "MaNaReD/Components/ListItem tokens",
  tags: ["test"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function readFontSizePx(element: Element): number {
  return Number.parseFloat(getComputedStyle(element).fontSize);
}

/** Label must dominate description: primary colour, larger size, semibold weight. */
async function assertListItemHierarchy(canvasElement: HTMLElement) {
  await withColourMode("dark", async () => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Notifications");
    const description = canvas.getByText("Manage your alerts");

    const labelStyle = getComputedStyle(label);
    const descriptionStyle = getComputedStyle(description);

    await expect(readFontSizePx(label), "label font size").toBeGreaterThan(
      readFontSizePx(description),
    );
    await expect(Number.parseInt(labelStyle.fontWeight, 10), "label weight").toBeGreaterThanOrEqual(
      600,
    );
    await expect(labelStyle.color, "label colour").toBe("rgb(232, 239, 255)");
    await expect(descriptionStyle.color, "description colour").toBe("rgb(163, 224, 255)");
  });
}

export const DarkModeHierarchy: Story = {
  render: () => (
    <List>
      <ListItem label="Notifications" description="Manage your alerts" />
    </List>
  ),
  play: async ({ canvasElement }) => {
    await assertListItemHierarchy(canvasElement);
  },
};
