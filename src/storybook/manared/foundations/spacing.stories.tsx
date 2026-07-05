import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../../astryx/shared/docs-page";
import { TokenGrid } from "../../astryx/shared/token-grid";

const FIGMA_SPACE = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=81-470";

const spacingTokens = [
  { name: "MaNaReD.space.1", value: "4px", var: "--spacing-1" },
  { name: "MaNaReD.space.2", value: "8px", var: "--spacing-2" },
  { name: "MaNaReD.space.4", value: "16px", var: "--spacing-4" },
  { name: "MaNaReD.space.6", value: "24px", var: "--spacing-6" },
  { name: "MaNaReD.space.8", value: "32px", var: "--spacing-8" },
  { name: "MaNaReD.space.10", value: "40px", var: "--spacing-10" },
  { name: "MaNaReD.space.12", value: "48px", var: "--spacing-12" },
];

const meta = {
  title: "MaNaReD/Foundations/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_SPACE },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Spacing"
      description="8px-base grid mapped to Astryx gap props and Tailwind spacing utilities."
    >
      <TokenGrid
        variant="bar"
        columns={3}
        tokens={spacingTokens.map((token) => ({
          name: token.name,
          description: token.value,
          previewStyle: { width: `var(${token.var})` },
        }))}
      />
    </DocsPage>
  ),
};
