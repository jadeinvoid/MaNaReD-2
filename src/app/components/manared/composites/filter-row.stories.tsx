import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { FILTER_CATEGORIES } from "./filter-state";
import { FILTER_ROW_BUTTON, FilterRow } from "./filter-row";

const FIGMA_FILTER_ROW =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9070";

const meta = {
  title: "MaNaReD/Composites/FilterRow",
  component: FilterRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_FILTER_ROW },
  },
  args: {
    id: "taxonomy",
    label: "Taxonomy",
    expanded: false,
    onToggle: fn(),
  },
} satisfies Meta<typeof FilterRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Taxonomy")).toBeVisible();
    await expect(canvas.getByLabelText("Expand Taxonomy filter")).toBeVisible();
  },
};

export const Expanded: Story = {
  args: {
    expanded: true,
    children: <p className="text-3xs text-secondary">Filter panel content</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Filter panel content")).toBeVisible();
    await expect(canvas.getByLabelText("Collapse Taxonomy filter")).toBeVisible();
  },
};

export const AllRows: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-1">
      {FILTER_CATEGORIES.map(({ id, label }) => (
        <FilterRow key={id} id={id} label={label} expanded={false} onToggle={() => {}} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Bioactivity")).toBeVisible();
    await expect(canvas.getByLabelText("Expand Bioactivity filter")).toBeVisible();
    await expect(canvas.getByLabelText("Expand Target / assay filter")).toBeVisible();

    const taxonomyRow = canvas.getByLabelText("Expand Taxonomy filter").closest("button");
    if (!taxonomyRow) {
      throw new Error("Taxonomy filter row button not found");
    }
    await expect(taxonomyRow.className).toContain("justify-between");
    await expect(FILTER_ROW_BUTTON).toContain("justify-between");
    const label = canvas.getByText("Taxonomy");
    await expect(label.className).toContain("text-left");
  },
};
