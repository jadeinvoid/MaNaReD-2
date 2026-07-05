import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocsPage } from "../shared/docs-page";
import { TokenGrid } from "../shared/token-grid";

const radiusTokens = [
  { name: "--radius-none", description: "0px — sharp corners" },
  { name: "--radius-inner", description: "4px — inner elements" },
  { name: "--radius-element", description: "8px — buttons, inputs" },
  { name: "--radius-container", description: "12px — cards, panels" },
  { name: "--radius-page", description: "28px — page-level rounding" },
  { name: "--radius-full", description: "9999px — pills, avatars" },
];

const meta = {
  title: "Astryx/Foundations/Shape",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Border radius tokens from inner → element → container → page. Themes can scale via radius multiplier.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radius: Story = {
  render: () => (
    <DocsPage title="Shape" description="Consistent rounding across components.">
      <TokenGrid
        variant="box"
        columns={3}
        tokens={radiusTokens.map((token) => ({
          ...token,
          previewStyle: { borderRadius: `var(${token.name})` },
        }))}
      />
    </DocsPage>
  ),
};
