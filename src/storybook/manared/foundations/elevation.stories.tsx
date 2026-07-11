import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import {
  ELEVATION_HOVER,
  SHADOW_CARD,
  SURFACE_CARD_PANEL,
  SURFACE_LIST_ROW,
} from "@/app/components/manared/primitives/surface-styles";
import {
  INTERACTIVE_CARD_SAVE,
  INTERACTIVE_FILTER_CLEAR_ALL,
} from "@/app/components/manared/primitives/interactive-styles";
import { DocsPage } from "../../astryx/shared/docs-page";
import { TokenGrid, type TokenEntry } from "../../astryx/shared/token-grid";

const elevationTokens: TokenEntry[] = [
  {
    name: "--color-shadow",
    description: "Shadow hue (opacity in shadow tokens)",
    previewStyle: { backgroundColor: "var(--color-shadow)" },
  },
  {
    name: "--shadow-card",
    description: "Rest layer — always on cards and list rows",
    previewStyle: { boxShadow: "var(--shadow-card)" },
  },
  {
    name: "--shadow-elevated",
    description: "Hover add-on — stacked on top of --shadow-card",
    previewStyle: { boxShadow: "var(--shadow-elevated)" },
  },
  {
    name: "--shadow-filter-action",
    description: "Rest shadow for filter Clear All / Apply",
    previewStyle: { boxShadow: "var(--shadow-filter-action)" },
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

function StackedPreviewPanels() {
  const panelClass = `${SURFACE_CARD_PANEL} p-6`;

  return (
    <HStack gap={6} className="flex-wrap">
      <VStack gap={2}>
        <Text size="2xs" color="secondary" weight="medium">
          Rest
        </Text>
        <div className={panelClass} style={{ boxShadow: "var(--shadow-card)" }}>
          <Text type="body">--shadow-card</Text>
        </div>
      </VStack>
      <VStack gap={2}>
        <Text size="2xs" color="secondary" weight="medium">
          Hover (stacked)
        </Text>
        <div
          className={panelClass}
          style={{ boxShadow: "var(--shadow-card), var(--shadow-elevated)" }}
        >
          <Text type="body">--shadow-card + --shadow-elevated</Text>
        </div>
      </VStack>
    </HStack>
  );
}

function HoverDemoPanels() {
  return (
    <VStack gap={4} className="max-w-2xl">
      <Text size="2xs" className="text-tertiary">
        Hover a panel — rest shadow stays; an extra layer stacks on top.
      </Text>
      <div className={`${SURFACE_CARD_PANEL} ${SHADOW_CARD} ${ELEVATION_HOVER} p-6`}>
        <Text type="body" weight="medium">
          Card panel
        </Text>
        <Text size="2xs" color="secondary">
          Hover me
        </Text>
      </div>
      <div className={SURFACE_LIST_ROW}>
        <Text type="body" weight="medium">
          List row shell
        </Text>
        <Text size="2xs" color="secondary">
          Hover me
        </Text>
      </div>
      <Text size="2xs" className="text-tertiary">
        Interactive buttons use a blurred `--color-background-blue` underline that spreads downward,
        plus a slight lift on pointer hover.
      </Text>
      <button type="button" className={INTERACTIVE_FILTER_CLEAR_ALL}>
        Clear All
      </button>
      <button type="button" className={INTERACTIVE_CARD_SAVE}>
        Save
      </button>
    </VStack>
  );
}

const meta = {
  title: "MaNaReD/Foundations/Elevation",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Card and list-row elevation uses `--shadow-card` at rest. On hover, `--shadow-elevated` stacks on top. Interactive buttons use a blurred `--color-background-blue` underline that spreads downward, plus a 2px lift on pointer hover without fill or border change.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Elevation — Tokens"
      description="Shadow tokens for card and list-row depth."
    >
      <TokenGrid title="Shadow tokens" tokens={elevationTokens} columns={3} variant="box" />
    </DocsPage>
  ),
};

export const StackedPreview: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Elevation — Stacked preview"
      description="Side-by-side rest vs hover (both layers applied)."
    >
      <StackedPreviewPanels />
    </DocsPage>
  ),
};

export const HoverDemo: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Elevation — Hover demo"
      description="Interactive panels using SHADOW_CARD + ELEVATION_HOVER."
    >
      <div className="bg-body rounded-lg p-6">
        <HoverDemoPanels />
      </div>
    </DocsPage>
  ),
};

export const LightMode: Story = {
  render: () => (
    <DocsPage title="MaNaReD Elevation — Light mode" description="Forced light colour-scheme.">
      <ColourModeFrame mode="light">
        <VStack gap={8}>
          <StackedPreviewPanels />
          <HoverDemoPanels />
        </VStack>
      </ColourModeFrame>
    </DocsPage>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <DocsPage title="MaNaReD Elevation — Dark mode" description="Forced dark colour-scheme.">
      <ColourModeFrame mode="dark">
        <VStack gap={8}>
          <StackedPreviewPanels />
          <HoverDemoPanels />
        </VStack>
      </ColourModeFrame>
    </DocsPage>
  ),
};
