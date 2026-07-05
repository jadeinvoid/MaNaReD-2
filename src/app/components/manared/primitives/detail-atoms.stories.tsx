import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import {
  DetailCategoryDivider,
  DetailCount,
  DetailIdentityId,
  DetailIdentityName,
  DetailPicture,
  DetailSubcategoryTitle,
  DetailTaxonomyItem,
} from "./detail-atoms";

const FIGMA_DETAIL = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9114";

const meta = {
  title: "MaNaReD/Primitives/DetailAtoms",
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_DETAIL },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaxonomyItem: Story = {
  render: () => <DetailTaxonomyItem label="Compound" active />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compound")).toBeVisible();
  },
};

export const Identity: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <DetailIdentityId>CMNPD-00482</DetailIdentityId>
      <DetailIdentityName>Latrunculin A</DetailIdentityName>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
  },
};

export const Subcategory: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <DetailSubcategoryTitle>Bioactivities</DetailSubcategoryTitle>
      <DetailCount count={12} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("12 records")).toBeVisible();
  },
};

export const CategoryDivider: Story = {
  render: () => <DetailCategoryDivider title="Classification" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Classification")).toBeVisible();
  },
};

export const Picture: Story = {
  render: () => <DetailPicture alt="Compound structure placeholder" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Compound structure placeholder")).toBeVisible();
  },
};
