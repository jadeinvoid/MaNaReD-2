import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { expectHoverElevates } from "@/storybook/manared/shared/assert-hover-elevation";
import { GRADIENT_SIDEBAR } from "@/app/components/manared/primitives/gradient-styles";

import { CompoundCard } from "@/app/components/manared/domain/compound-card";
import { ListRow, type ListRowProps } from "@/app/components/manared/domain/list-row";
import { ContextualBar } from "@/app/components/manared/composites/contextual-bar";
import { NavSideBar } from "@/app/components/manared/composites/nav-side-bar";
import { TaxonomyBreadcrumb } from "@/app/components/manared/composites/taxonomy-breadcrumb";
import { TopBarRegion } from "@/app/components/manared/composites/top-bar-region";
import { BrowseFiltersDemo } from "@/storybook/manared/patterns/browse-filters-demo";
import { Text } from "@astryxdesign/core/Text";

const FIGMA_SCREEN = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9041";
const FIGMA_LIST_ITEMS =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-3815";

const NAV_ANIMATION_MS = 175;

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
        <TopBarRegion />
        <ContextualBar>
          <TaxonomyBreadcrumb items={["Home", "Compounds"]} />
          <Text size="lg" weight="medium" className="mt-4">
            Compounds
          </Text>
        </ContextualBar>
        <div className="flex min-h-0 flex-1 gap-0 pl-0 pr-4 py-4 lg:pr-4 lg:py-4">
          <BrowseFiltersDemo>{children}</BrowseFiltersDemo>
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

    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic" }));
    const chipBar = canvasElement.querySelector(".surface-gradient-chip-bar");
    if (!chipBar || !(chipBar instanceof HTMLElement)) {
      throw new Error("ChipBar not found");
    }
    await expect(within(chipBar).getByText("Cytotoxic")).toBeVisible();

    const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
    if (!sidebar || !(sidebar instanceof HTMLElement)) {
      throw new Error("NavSideBar shell not found");
    }
    const filterSidebar = canvas.getByText("Clear All").closest("aside");
    if (!filterSidebar || !(filterSidebar instanceof HTMLElement)) {
      throw new Error("FilterSidebar shell not found");
    }

    await userEvent.click(canvas.getByRole("button", { name: "Collapse sidebar" }));
    await waitFor(
      () => {
        const navWidth = sidebar.getBoundingClientRect().width;
        if (navWidth !== 56) {
          throw new Error(`Expected collapsed nav width 56, got ${navWidth}`);
        }
        const navRight = sidebar.getBoundingClientRect().right;
        const filterLeft = filterSidebar.getBoundingClientRect().left;
        if (filterLeft < navRight) {
          throw new Error("Filter sidebar overlaps collapsed nav rail");
        }
      },
      { timeout: NAV_ANIMATION_MS + 100 },
    );

    await userEvent.click(canvas.getByRole("button", { name: "Expand sidebar" }));
    await waitFor(
      () => {
        if (sidebar.getBoundingClientRect().width !== 192) {
          throw new Error("Expected expanded nav width 192");
        }
      },
      { timeout: NAV_ANIMATION_MS + 100 },
    );
  },
};

export const ListView: Story = {
  name: "List view",
  parameters: {
    design: { type: "figma", url: FIGMA_LIST_ITEMS },
  },
  render: () => (
    <BrowseShell>
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
