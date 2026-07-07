import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, within } from "storybook/test";

import { expectHoverElevates } from "@/storybook/manared/shared/assert-hover-elevation";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { CompoundCard } from "@/app/components/manared/domain/compound-card";
import { ListRow, type ListRowProps } from "@/app/components/manared/domain/list-row";
import { ContextualBar } from "@/app/components/manared/composites/contextual-bar";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import { NavSideBar } from "@/app/components/manared/composites/nav-side-bar";
import { TaxonomyBreadcrumb } from "@/app/components/manared/composites/taxonomy-breadcrumb";
import { TopBar } from "@/app/components/manared/composites/top-bar";
import { VStack } from "@astryxdesign/core/Layout";

const FIGMA_SCREEN = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9041";
const FIGMA_LIST_ITEMS =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-3815";

const LIST_SAMPLE_ROWS: ListRowProps[] = [
  {
    id: "# HAL-2024-001",
    title: "Discodermolide",
    chips: [
      { label: "Antitumor", entity: "compound" },
      { label: "Porifera", entity: "organism" },
    ],
    labelNumber: "773.0",
    labelUnit: "Da",
  },
  {
    id: "# HAL-2024-002",
    title: "Latrunculin A",
    chips: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Sponge", entity: "region" },
    ],
    labelNumber: "421.5",
    labelUnit: "Da",
  },
  {
    id: "# HAL-2024-003",
    title: "Manoalide",
    chips: [{ label: "Anti-inflammatory", entity: "bioactivity" }],
    labelNumber: "402.6",
    labelUnit: "Da",
  },
];

function BrowseShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-body">
      <NavSideBar activeItem="Compound" />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <ContextualBar>
          <TaxonomyBreadcrumb items={["Home", "Compounds"]} />
        </ContextualBar>
        <div className="flex flex-1 gap-4 p-4">
          <FilterSidebar />
          <VStack gap={4} className="flex-1">
            {children}
          </VStack>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "MaNaReD/Patterns/BrowseCompoundScreen",
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_SCREEN },
    docs: {
      description: {
        component:
          "Browse compounds screen. Cards and list rows use `--shadow-card` at rest; hover stacks `--shadow-elevated` on top.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardView: Story = {
  name: "Card view",
  render: () => (
    <BrowseShell>
      <ChipBar
        chips={["Alkaloids", "MW 200–400"]}
        provenanceText="Filter carried on from previous session."
      />
      <CompoundCard
        id="# HAL-2024-001"
        name="Halichondrin B"
        formula="C₆₀H₈₆O₁₉"
        molecularWeight="1111.29 g/mol"
        tags={[
          { label: "Antitumor", entity: "compound" },
          { label: "Marine Origin", entity: "organism" },
        ]}
        region="Pacific Ocean"
        organism="Halichondria okadai"
        bioactivity="Antineoplastic"
      />
      <CompoundCard
        id="CMNPD-00103"
        name="Manoalide"
        formula="C₂₅H₄₀O₅"
        molecularWeight="402.6 Da"
        tags={[{ label: "Anti-inflammatory", entity: "bioactivity" }]}
        organism="Sponge"
        bioactivity="Anti-inflammatory"
      />
    </BrowseShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await expect(canvas.getByText("Manoalide")).toBeVisible();
  },
};

export const ListView: Story = {
  name: "List view",
  parameters: {
    design: { type: "figma", url: FIGMA_LIST_ITEMS },
  },
  render: () => (
    <BrowseShell>
      <ChipBar
        chips={["Alkaloids", "MW 200–400"]}
        provenanceText="Filter carried on from previous session."
      />
      {LIST_SAMPLE_ROWS.map((row) => (
        <ListRow key={row.id} {...row} />
      ))}
    </BrowseShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Discodermolide")).toBeVisible();
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("Manoalide")).toBeVisible();
    await expect(canvas.getByText("773.0")).toBeVisible();
    await expect(canvas.getAllByLabelText("chevron-down")).toHaveLength(3);

    const firstRow = canvas.getByText("Discodermolide").closest('[class*="bg-surface"]');
    if (!firstRow || !(firstRow instanceof HTMLElement)) {
      throw new Error("ListRow shell not found");
    }
    await expectHoverElevates(firstRow);
  },
};

/** @deprecated Use CardView — kept for Storybook deep links. */
export const Default = CardView;
