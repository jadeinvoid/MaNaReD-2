import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../shared/docs-page";
import { TokenGrid } from "../shared/token-grid";

const spacingTokens = [
  { name: "--spacing-0", value: "0px" },
  { name: "--spacing-0-5", value: "2px" },
  { name: "--spacing-1", value: "4px" },
  { name: "--spacing-1-5", value: "6px" },
  { name: "--spacing-2", value: "8px" },
  { name: "--spacing-3", value: "12px" },
  { name: "--spacing-4", value: "16px" },
  { name: "--spacing-5", value: "20px" },
  { name: "--spacing-6", value: "24px" },
  { name: "--spacing-8", value: "32px" },
  { name: "--spacing-10", value: "40px" },
  { name: "--spacing-12", value: "48px" },
];

const meta = {
  title: "Astryx/Foundations/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "4px-based spacing scale for padding, gap, and margin. Component gap props map to these tokens.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <DocsPage
      title="Spacing"
      description="Rhythmic spacing scale — use gap props on VStack, HStack, Grid, and Stack."
    >
      <TokenGrid
        variant="bar"
        columns={3}
        tokens={spacingTokens.map((token) => ({
          name: token.name,
          description: token.value,
          previewStyle: { width: `var(${token.name})` },
        }))}
      />
    </DocsPage>
  ),
};
