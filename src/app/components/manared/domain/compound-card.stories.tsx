import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { expectHoverElevates } from "@/storybook/manared/shared/assert-hover-elevation";

import { CompoundCard } from "./compound-card";

const FIGMA_CARD = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=332-9090";

function getCardShell(canvasElement: HTMLElement): HTMLElement {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Latrunculin A");
  const shell =
    title.closest(".shadow-card-rest") ??
    title.closest('[class*="elevation-hover"]') ??
    title.closest("div");
  if (!shell || !(shell instanceof HTMLElement)) {
    throw new Error("CompoundCard shell not found");
  }
  return shell;
}

const meta = {
  title: "MaNaReD/Domain/CompoundCard",
  component: CompoundCard,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CARD },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "CMNPD-00482",
    name: "Latrunculin A",
    formula: "C₃₃H₄₅NO₅",
    source: "Sponge Latrunculia sp.",
    tags: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Marine", entity: "region" },
    ],
  },
} satisfies Meta<typeof CompoundCard>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertCardHoverElevation(canvasElement: HTMLElement) {
  const shell = getCardShell(canvasElement);
  await expect(shell.className).toContain("shadow-card-rest");
  await expect(shell.className).toContain("elevation-hover");
  await expectHoverElevates(shell);
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Latrunculin A")).toBeVisible();
    await expect(canvas.getByText("C₃₃H₄₅NO₅")).toBeVisible();
    await expect(canvas.getByText("Source: Sponge Latrunculia sp.")).toBeVisible();
    await expect(canvas.getByText("Compound")).toBeVisible();
    await expect(canvas.getByText("Cytotoxic")).toBeVisible();
    await expect(canvas.getByText("Marine")).toBeVisible();
    await assertCardHoverElevation(canvasElement);
  },
};

export const HoverElevation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Hover a card to see `--shadow-elevated` stack on top of the rest `--shadow-card` layer.",
      },
    },
  },
  render: () => (
    <div className="rounded-lg bg-body p-6">
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const shell = getCardShell(canvasElement);
    await expect(shell.className).toContain("elevation-hover");
    await assertCardHoverElevation(canvasElement);
  },
};
