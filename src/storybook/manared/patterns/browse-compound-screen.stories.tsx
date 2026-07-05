import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChipBar } from "@/app/components/manared/composites/chip-bar";
import { CompoundCard } from "@/app/components/manared/composites/compound-card";
import { FilterSidebar } from "@/app/components/manared/composites/filter-sidebar";
import { NavSideBar } from "@/app/components/manared/composites/nav-side-bar";
import { TaxonomyBreadcrumb } from "@/app/components/manared/composites/taxonomy-breadcrumb";
import { TopBar } from "@/app/components/manared/composites/top-bar";
import { VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

const FIGMA_SCREEN = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9041";

const meta = {
  title: "MaNaReD/Patterns/BrowseCompoundScreen",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_SCREEN },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen bg-body">
      <NavSideBar activeItem="Compound" />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <div className="border-b border-emphasized bg-surface px-6 py-4">
          <TaxonomyBreadcrumb items={["Home", "Compounds"]} />
          <Text size="lg" weight="medium" className="mt-4">
            Compounds
          </Text>
        </div>
        <div className="flex flex-1 gap-4 p-4">
          <FilterSidebar />
          <VStack gap={4} className="flex-1">
            <ChipBar
              chips={["Alkaloids", "MW 200–400"]}
              provenanceText="Filter carried on from previous session."
            />
            <CompoundCard
              id="CMNPD-00482"
              name="Latrunculin A"
              formula="C₃₃H₄₅NO₅"
              source="Sponge Latrunculia sp."
              tags={[
                { label: "Cytotoxic", entity: "bioactivity" },
                { label: "Marine", entity: "region" },
              ]}
            />
            <CompoundCard
              id="CMNPD-00103"
              name="Manoalide"
              formula="C₂₅H₄₀O₅"
              tags={[{ label: "Anti-inflammatory", entity: "bioactivity" }]}
            />
          </VStack>
        </div>
      </div>
    </div>
  ),
};
