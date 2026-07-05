import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "@astryxdesign/core/Icon";
import { Grid } from "@astryxdesign/core/Grid";
import { Text } from "@astryxdesign/core/Text";

import { DocsPage } from "../shared/docs-page";

const iconNames = [
  "close",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "check",
  "success",
  "error",
  "warning",
  "info",
  "calendar",
  "clock",
  "externalLink",
  "menu",
  "moreHorizontal",
  "search",
  "arrowUp",
  "arrowDown",
  "funnel",
  "copy",
  "microphone",
] as const;

const meta = {
  title: "Astryx/Foundations/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Semantic icon names resolved through the theme icon registry. Pass a name string or an SVG component to Icon.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticNames: Story = {
  render: () => (
    <DocsPage
      title="Icons"
      description="Use semantic names in components that accept icon props, or wrap custom SVGs with Icon."
    >
      <Grid columns={4} gap={4}>
        {iconNames.map((name) => (
          <div
            key={name}
            className="rounded-container border border-emphasized bg-surface flex flex-col items-center gap-2 p-4"
          >
            <Icon icon={name} size="lg" />
            <Text size="2xs" color="secondary">
              {name}
            </Text>
          </div>
        ))}
      </Grid>
    </DocsPage>
  ),
};
