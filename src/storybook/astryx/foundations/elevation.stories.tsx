import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../shared/docs-page";
import { TokenGrid } from "../shared/token-grid";

const elevationTokens = [
  { name: "--shadow-sm", description: "Subtle lift" },
  { name: "--shadow-md", description: "Cards, dropdowns" },
  { name: "--shadow-lg", description: "Modals, popovers" },
  { name: "--shadow-xl", description: "High elevation" },
];

const meta = {
  title: "Astryx/Foundations/Elevation",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Shadow tokens for visual elevation and depth hierarchy.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadows: Story = {
  render: () => (
    <DocsPage title="Elevation" description="Shadow scale for layered UI.">
      <TokenGrid
        variant="box"
        columns={2}
        tokens={elevationTokens.map((token) => ({
          ...token,
          previewStyle: { boxShadow: `var(${token.name})` },
        }))}
      />
    </DocsPage>
  ),
};
