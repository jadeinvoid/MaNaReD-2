import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { expectHoverElevates } from "@/storybook/manared/shared/assert-hover-elevation";
import { GRADIENT_SIDEBAR } from "@/app/components/manared/primitives/gradient-styles";

import { CompoundCard } from "@/app/components/manared/domain/compound-card";
import { ListRow } from "@/app/components/manared/domain/list-row";
import { ContextualBar } from "@/app/components/manared/composites/contextual-bar";
import { NavSideBar } from "@/app/components/manared/composites/nav-side-bar";
import { TaxonomyBreadcrumb } from "@/app/components/manared/composites/taxonomy-breadcrumb";
import { TopBarRegion } from "@/app/components/manared/composites/top-bar-region";
import type { ResultsViewMode } from "@/app/components/manared/composites/results-view";
import type { SortOptionId } from "@/app/components/manared/composites/sort-state";
import { sortBrowseResults } from "@/app/components/manared/composites/sort-state";
import { BrowseFiltersDemo } from "@/storybook/manared/patterns/browse-filters-demo";
import {
  BROWSE_RESULTS_MOCK,
  filterBrowseResults,
  toCompoundCardProps,
  toListRowProps,
} from "@/storybook/manared/patterns/browse-results-mock";
import type { FilterState } from "@/app/components/manared/composites/filter-state";

const FIGMA_SCREEN = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=349-3993";
const FIGMA_LIST_ITEMS =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-3815";

const NAV_ANIMATION_MS = 175;

function BrowseResults({
  filters,
  viewMode,
  sortBy,
}: {
  filters: FilterState;
  viewMode: ResultsViewMode;
  sortBy: SortOptionId;
}) {
  const results = sortBrowseResults(
    filterBrowseResults(BROWSE_RESULTS_MOCK, filters),
    sortBy,
    "compounds",
  );

  if (viewMode === "list") {
    return (
      <>
        {results.map((result) => (
          <ListRow key={result.id} {...toListRowProps(result)} />
        ))}
      </>
    );
  }

  return (
    <>
      {results.map((result) => (
        <CompoundCard key={result.id} {...toCompoundCardProps(result)} />
      ))}
    </>
  );
}

function BrowseShell({
  children,
}: {
  children:
    | ReactNode
    | ((filters: FilterState, viewMode: ResultsViewMode, sortBy: SortOptionId) => ReactNode);
}) {
  return (
    <div className="flex min-h-screen bg-body">
      <NavSideBar activeItem="Compound" />
      <div className="flex flex-1 flex-col">
        <TopBarRegion />
        <ContextualBar>
          <TaxonomyBreadcrumb items={["Home", "Compounds"]} />
        </ContextualBar>
        <div className="flex min-h-0 flex-1 gap-4">
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
          "Browse compounds screen with card/list view toggle (UX §4.1). Cards and list rows use `--shadow-card` at rest; hover stacks `--shadow-elevated` on top.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrowseWithViewToggle: Story = {
  name: "Browse with view toggle",
  render: () => (
    <BrowseShell>
      {(filters, viewMode, sortBy) => (
        <BrowseResults filters={filters} viewMode={viewMode} sortBy={sortBy} />
      )}
    </BrowseShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await expect(canvas.getByText("Manoalide")).toBeVisible();

    const chipBar = canvasElement.querySelector(".surface-gradient-chip-bar");
    if (!chipBar || !(chipBar instanceof HTMLElement)) {
      throw new Error("ChipBar not found");
    }

    const sortButton = within(chipBar).getByRole("button", { name: /Sort by/ });
    const viewToggle = within(chipBar).getByRole("group", { name: "Results view" });
    const sortRect = sortButton.getBoundingClientRect();
    const toggleRect = viewToggle.getBoundingClientRect();
    await expect(toggleRect.left).toBeGreaterThanOrEqual(sortRect.right - 1);

    await userEvent.click(within(chipBar).getByRole("button", { name: "List view" }));
    await expect(canvas.queryByText("Halichondrin B")).not.toBeInTheDocument();
    await expect(canvas.getByText("Discodermolide")).toBeVisible();
    await expect(canvas.getAllByLabelText("chevron-down").length).toBeGreaterThan(0);

    await userEvent.click(within(chipBar).getByRole("button", { name: "Card view" }));
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();

    await userEvent.click(canvas.getByLabelText("Expand Geographic Region filter"));
    await userEvent.click(canvas.getByRole("checkbox", { name: "Indo-Pacific" }));
    await expect(within(chipBar).getByText("Indo-Pacific")).toBeVisible();
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await expect(canvas.queryByText("Manoalide")).not.toBeInTheDocument();

    await userEvent.click(within(chipBar).getByRole("button", { name: "List view" }));
    await expect(canvas.getByText("Halichondrin B")).toBeVisible();
    await expect(canvas.queryByText("Manoalide")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("checkbox", { name: "Mediterranean" }));
    await expect(within(chipBar).getByText("Mediterranean")).toBeVisible();
    await expect(canvas.getByText("Manoalide")).toBeVisible();

    await userEvent.click(canvas.getByLabelText("Expand Bioactivity filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Cytotoxic (48)" }));
    await expect(within(chipBar).getByText("Cytotoxic")).toBeVisible();

    await userEvent.click(within(chipBar).getByText("Cytotoxic"));
    await expect(canvas.getByRole("button", { name: "Cytotoxic (48)" })).toBeVisible();

    await userEvent.click(canvas.getByLabelText("Expand Taxonomy filter"));
    await userEvent.click(canvas.getByRole("button", { name: "Porifera" }));
    await expect(within(chipBar).getByText("Phylum · Porifera")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Demospongiae" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Demospongiae" }));
    await expect(within(chipBar).getByText("Class · Demospongiae (+1)")).toBeVisible();

    const sidebar = canvasElement.querySelector(`.${GRADIENT_SIDEBAR}`);
    if (!sidebar || !(sidebar instanceof HTMLElement)) {
      throw new Error("NavSideBar shell not found");
    }
    const filterSidebar = canvas.getByText("Clear All").closest("aside");
    if (!filterSidebar || !(filterSidebar instanceof HTMLElement)) {
      throw new Error("FilterSidebar shell not found");
    }

    const navRight = sidebar.getBoundingClientRect().right;
    const filterLeft = filterSidebar.getBoundingClientRect().left;
    await expect(Math.abs(filterLeft - navRight)).toBeLessThanOrEqual(1);

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

    await userEvent.click(canvas.getByRole("button", { name: "Collapse filters" }));
    await expect(canvas.getByRole("button", { name: /More Filters/i })).toBeVisible();
    await userEvent.click(within(chipBar).getByRole("button", { name: /More Filters/i }));
    await expect(canvas.getByRole("button", { name: "Collapse filters" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Expand sidebar" }));
    await waitFor(
      () => {
        if (sidebar.getBoundingClientRect().width !== 192) {
          throw new Error("Expected expanded nav width 192");
        }
      },
      { timeout: NAV_ANIMATION_MS + 100 },
    );

    await userEvent.click(within(chipBar).getByRole("button", { name: /Sort by/ }));
    await userEvent.click(canvas.getByRole("option", { name: "Name (A-Z)" }));
    await expect(
      within(chipBar).getByRole("button", { name: /Sort by: Name \(A-Z\)/ }),
    ).toBeVisible();
    await expect(canvas.getByText("Discodermolide")).toBeVisible();
    const firstCard = canvas.getByText("Discodermolide").closest('[class*="bg-surface"]');
    if (!firstCard) {
      throw new Error("Expected Discodermolide to be first result after name sort");
    }
  },
};

/** Layout reference — card domain component QA. */
export const CardView: Story = {
  name: "Card view",
  render: () => (
    <BrowseShell>
      {(filters, viewMode, sortBy) => (
        <BrowseResults filters={filters} viewMode={viewMode} sortBy={sortBy} />
      )}
    </BrowseShell>
  ),
};

/** Layout reference — list domain component QA. */
export const ListView: Story = {
  name: "List view",
  parameters: {
    design: { type: "figma", url: FIGMA_LIST_ITEMS },
  },
  render: () => (
    <div className="flex min-h-screen bg-body">
      <NavSideBar activeItem="Compound" />
      <div className="flex flex-1 flex-col">
        <TopBarRegion />
        <ContextualBar>
          <TaxonomyBreadcrumb items={["Home", "Compounds"]} />
        </ContextualBar>
        <div className="flex min-h-0 flex-1 gap-4">
          <BrowseFiltersDemo defaultViewMode="list">
            {(filters, viewMode, sortBy) => (
              <BrowseResults filters={filters} viewMode={viewMode} sortBy={sortBy} />
            )}
          </BrowseFiltersDemo>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Discodermolide")).toBeVisible();
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("Manoalide")).toBeVisible();
    await expect(canvas.getByText("773.0")).toBeVisible();
    await expect(canvas.getAllByLabelText("chevron-down").length).toBeGreaterThan(0);

    const firstRow = canvas.getByText("Discodermolide").closest('[class*="bg-surface"]');
    if (!firstRow || !(firstRow instanceof HTMLElement)) {
      throw new Error("ListRow shell not found");
    }
    await expectHoverElevates(firstRow);
  },
};

/** @deprecated Use BrowseWithViewToggle — kept for Storybook deep links. */
export const Default = BrowseWithViewToggle;
