import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../../astryx/shared/docs-page";
import { TokenGrid } from "../../astryx/shared/token-grid";

const FIGMA_COLOUR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=49-867";

const surfaceTokens = [
  {
    name: "MaNaReD.colour.BG.page",
    description: "Page background → bg-body",
    previewStyle: { backgroundColor: "#e9f1f9" },
  },
  {
    name: "MaNaReD.colour.BG.card",
    description: "Cards → bg-surface",
    previewStyle: { backgroundColor: "#ffffff" },
  },
  {
    name: "MaNaReD.colour.BG.sideBar",
    description: "Sidebar → --color-background-sidebar",
    previewStyle: { backgroundColor: "var(--color-background-sidebar)" },
  },
];

const textTokens = [
  {
    name: "MaNaReD.colour.text.primary",
    description: "Primary text → text-primary",
    previewStyle: { backgroundColor: "#2a2a2a" },
  },
  {
    name: "MaNaReD.colour.text.secondary",
    description: "Secondary text → text-secondary",
    previewStyle: { backgroundColor: "#584f82" },
  },
  {
    name: "MaNaReD.colour.text.tertiary",
    description: "Tertiary → --color-text-tertiary",
    previewStyle: { backgroundColor: "var(--color-text-tertiary)" },
  },
];

const entityTokens = [
  {
    name: "entity.organism",
    description: "Organism badge triplet",
    previewStyle: { backgroundColor: "var(--color-entity-organism-bg)" },
  },
  {
    name: "entity.bioactivity",
    description: "Bioactivity badge triplet",
    previewStyle: { backgroundColor: "var(--color-entity-bioactivity-bg)" },
  },
  {
    name: "entity.compound",
    description: "Compound badge triplet",
    previewStyle: { backgroundColor: "var(--color-entity-compound-bg)" },
  },
  {
    name: "entity.region",
    description: "Region badge triplet",
    previewStyle: { backgroundColor: "var(--color-entity-region-bg)" },
  },
];

const meta = {
  title: "MaNaReD/Foundations/Colour",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_COLOUR },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surfaces: Story = {
  render: () => (
    <DocsPage title="MaNaReD Colour — Surfaces" description="Background roles from the UI Library.">
      <TokenGrid title="Background" tokens={surfaceTokens} columns={3} />
    </DocsPage>
  ),
};

export const Text: Story = {
  render: () => (
    <DocsPage title="MaNaReD Colour — Text" description="Text hierarchy tokens.">
      <TokenGrid title="Text" tokens={textTokens} columns={3} />
    </DocsPage>
  ),
};

export const Entity: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Colour — Entity"
      description="Domain entity colours for chips and badges."
    >
      <TokenGrid title="Entity types" tokens={entityTokens} columns={2} />
    </DocsPage>
  ),
};
