import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../shared/docs-page";
import { TokenGrid } from "../shared/token-grid";

const semanticColors = [
  { name: "--color-accent", description: "Primary brand accent" },
  { name: "--color-background-body", description: "Page background" },
  { name: "--color-background-surface", description: "Cards, panels" },
  { name: "--color-background-muted", description: "Subtle emphasis" },
  { name: "--color-background-card", description: "Card surfaces" },
  { name: "--color-background-popover", description: "Popover, dropdown" },
  { name: "--color-text-primary", description: "Primary text" },
  { name: "--color-text-secondary", description: "Secondary text" },
  { name: "--color-text-disabled", description: "Disabled text" },
  { name: "--color-text-accent", description: "Accent text links" },
  { name: "--color-border", description: "Default borders" },
  { name: "--color-border-emphasized", description: "Strong borders" },
];

const statusColors = [
  { name: "--color-success", description: "Success" },
  { name: "--color-error", description: "Error" },
  { name: "--color-warning", description: "Warning" },
  { name: "--color-success-muted", description: "Success muted bg" },
  { name: "--color-error-muted", description: "Error muted bg" },
  { name: "--color-warning-muted", description: "Warning muted bg" },
];

const paletteColors = [
  "blue",
  "cyan",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
];

function colorTokens(entries: { name: string; description?: string }[]) {
  return entries.map((entry) => ({
    ...entry,
    previewStyle: { backgroundColor: `var(${entry.name})` },
  }));
}

const meta = {
  title: "Astryx/Foundations/Color",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Semantic color tokens for surfaces, text, icons, borders, and status indicators. All colors use light-dark() for automatic mode switching.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Semantic: Story = {
  render: () => (
    <DocsPage
      title="Color"
      description="Semantic tokens from the neutral theme. Override via defineTheme — never raw hex in components."
    >
      <TokenGrid title="Semantic" tokens={colorTokens(semanticColors)} columns={3} />
      <TokenGrid title="Status" tokens={colorTokens(statusColors)} columns={3} />
      <TokenGrid
        title="Palette backgrounds"
        tokens={paletteColors.map((hue) => ({
          name: `--color-background-${hue}`,
          description: `${hue} tinted surface`,
          previewStyle: { backgroundColor: `var(--color-background-${hue})` },
        }))}
        columns={4}
      />
    </DocsPage>
  ),
};
