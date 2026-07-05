import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

import { DocsPage } from "../../astryx/shared/docs-page";
import { TokenGrid, type TokenEntry } from "../../astryx/shared/token-grid";

const FIGMA_COLOUR = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=49-867";

const surfaceTokens: TokenEntry[] = [
  {
    name: "MaNaReD.colour.BG.page",
    description: "Page background → bg-body",
    className: "bg-body",
  },
  {
    name: "MaNaReD.colour.BG.card",
    description: "Cards → bg-surface",
    className: "bg-surface",
  },
  {
    name: "MaNaReD.colour.BG.sideBar",
    description: "Sidebar → bg-sidebar",
    className: "bg-sidebar",
  },
];

const textTokens: TokenEntry[] = [
  {
    name: "MaNaReD.colour.text.primary",
    description: "Primary text → text-primary",
    previewStyle: { backgroundColor: "var(--color-text-primary)" },
  },
  {
    name: "MaNaReD.colour.text.secondary",
    description: "Secondary text → text-secondary",
    previewStyle: { backgroundColor: "var(--color-text-secondary)" },
  },
  {
    name: "MaNaReD.colour.text.tertiary",
    description: "Tertiary → text-tertiary",
    previewStyle: { backgroundColor: "var(--color-text-tertiary)" },
  },
];

const statusTokens: TokenEntry[] = [
  {
    name: "MaNaReD.colour.status.success",
    description: "Success BG → bg-success-muted",
    className: "bg-success-muted",
  },
  {
    name: "MaNaReD.colour.status.warning",
    description: "Warning BG → bg-warning-muted",
    className: "bg-warning-muted",
  },
  {
    name: "MaNaReD.colour.status.danger",
    description: "Danger BG → bg-error-muted",
    className: "bg-error-muted",
  },
  {
    name: "MaNaReD.colour.status.info",
    description: "Info BG → bg-blue-subtle",
    className: "bg-blue-subtle",
  },
];

const entityTokens: TokenEntry[] = [
  {
    name: "entity.organism",
    description: "Organism badge triplet",
    className: "bg-entity-organism-bg",
  },
  {
    name: "entity.bioactivity",
    description: "Bioactivity badge triplet",
    className: "bg-entity-bioactivity-bg",
  },
  {
    name: "entity.compound",
    description: "Compound badge triplet",
    className: "bg-entity-compound-bg",
  },
  {
    name: "entity.region",
    description: "Region badge triplet",
    className: "bg-entity-region-bg",
  },
];

const interactiveTokens: TokenEntry[] = [
  {
    name: "interactive.chip.active",
    description: "Active chip → bg-chip-active",
    className: "bg-chip-active",
  },
  {
    name: "interactive.chip.hover",
    description: "Chip hover → bg-chip-hover",
    className: "bg-chip-hover",
  },
  {
    name: "interactive.button.active",
    description: "Button active → bg-button-active",
    className: "bg-button-active",
  },
  {
    name: "interactive.nav.hover",
    description: "Nav hover → bg-nav-hover",
    className: "bg-nav-hover",
  },
];

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  const frameStyle: CSSProperties = {
    colorScheme: mode,
    padding: "1.5rem",
    borderRadius: "var(--radius-container)",
    border: "1px solid var(--color-border-emphasized)",
    backgroundColor: "var(--color-background-body)",
  };

  return (
    <div style={frameStyle} data-colour-mode={mode}>
      {children}
    </div>
  );
}

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
    <DocsPage
      title="MaNaReD Colour — Surfaces"
      description="Background roles from the UI Library. Swatches follow the active colour scheme."
    >
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

export const Status: Story = {
  render: () => (
    <DocsPage title="MaNaReD Colour — Status" description="Semantic status backgrounds.">
      <TokenGrid title="Status" tokens={statusTokens} columns={2} />
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

export const Interactive: Story = {
  render: () => (
    <DocsPage title="MaNaReD Colour — Interactive" description="Interactive state backgrounds.">
      <TokenGrid title="Interactive" tokens={interactiveTokens} columns={2} />
    </DocsPage>
  ),
};

export const LightMode: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Colour — Light mode preview"
      description="Forced light colour-scheme; values from Figma frame MaNaReD/colour/light."
    >
      <ColourModeFrame mode="light">
        <div className="flex flex-col gap-8">
          <TokenGrid title="Surfaces" tokens={surfaceTokens} columns={3} />
          <TokenGrid title="Entity" tokens={entityTokens} columns={2} />
        </div>
      </ColourModeFrame>
    </DocsPage>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Colour — Dark mode preview"
      description="Forced dark colour-scheme; values from Figma frame MaNaReD/colour/dark."
    >
      <ColourModeFrame mode="dark">
        <div className="flex flex-col gap-8">
          <TokenGrid title="Surfaces" tokens={surfaceTokens} columns={3} />
          <TokenGrid title="Entity" tokens={entityTokens} columns={2} />
        </div>
      </ColourModeFrame>
    </DocsPage>
  ),
};
