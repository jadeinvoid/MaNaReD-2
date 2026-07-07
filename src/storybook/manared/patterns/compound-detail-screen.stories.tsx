import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, within } from "storybook/test";

import {
  expectResolvedToken,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { ContextualBar } from "@/app/components/manared/composites/contextual-bar";
import { NavSideBar } from "@/app/components/manared/composites/nav-side-bar";
import { TaxonomyBreadcrumb } from "@/app/components/manared/composites/taxonomy-breadcrumb";
import { TopBar } from "@/app/components/manared/composites/top-bar";
import { DetailSection } from "@/app/components/manared/domain/detail-section";
import { Text } from "@astryxdesign/core/Text";

const FIGMA_DETAIL_SCREEN =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9114";

const DETAIL_SAMPLE = {
  id: "CMNPD-00482",
  name: "Latrunculin A",
  bioactivities: [
    { label: "Cytotoxic", entity: "bioactivity" as const },
    { label: "Actin inhibitor", entity: "bioactivity" as const },
  ],
  compoundClasses: [
    { label: "Macrolide", entity: "compound" as const },
    { label: "Marine natural product", entity: "compound" as const },
  ],
  bioactivityCount: 12,
};

function DetailShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-body">
      <NavSideBar activeItem="Compound" />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <ContextualBar>
          <TaxonomyBreadcrumb items={["Home", "Compounds", "Latrunculin A"]} />
          <Text size="lg" weight="medium" className="mt-4">
            Compound Detail
          </Text>
        </ContextualBar>
        <main className="flex flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

const meta = {
  title: "MaNaReD/Patterns/CompoundDetailScreen",
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_DETAIL_SCREEN },
    docs: {
      description: {
        component:
          "Compound detail screen pattern composing NavSideBar, TopBar, and DetailSection from Figma `332:9114`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertDetailScreenContent(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await expect(canvas.getByText("Latrunculin A")).toBeVisible();
  await expect(canvas.getByText("CMNPD-00482")).toBeVisible();
  await expect(canvas.getByText("Cytotoxic")).toBeVisible();
  await expect(canvas.getByText("Macrolide")).toBeVisible();
  await expect(canvas.getByText("12 records")).toBeVisible();
  await expect(canvas.getByText("Classification")).toBeVisible();
  await expect(canvas.getByText("Related Records")).toBeVisible();
}

async function assertDetailScreenTokenColours() {
  for (const mode of ["light", "dark"] as const) {
    await withColourMode(mode, async () => {
      await expectResolvedToken(mode, "--color-background-body", "backgroundColor");
      await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
      await expectResolvedToken(mode, "--color-text-primary", "color");
      await expectResolvedToken(mode, "--color-text-secondary", "color");
      await expectResolvedToken(mode, "--color-text-tertiary", "color");
    });
  }
}

export const Default: Story = {
  render: () => (
    <DetailShell>
      <DetailSection {...DETAIL_SAMPLE} />
    </DetailShell>
  ),
  play: async ({ canvasElement }) => {
    await assertDetailScreenContent(canvasElement);
    await assertDetailScreenTokenColours();
  },
};
