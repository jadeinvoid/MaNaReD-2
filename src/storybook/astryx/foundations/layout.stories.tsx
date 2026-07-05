import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { DocsPage } from "../shared/docs-page";

const meta = {
  title: "Astryx/Foundations/Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Layout primitives — prefer VStack, HStack, Grid, and Stack over raw divs for structure.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
  render: () => (
    <DocsPage title="Layout" description="Stack and grid primitives with token-backed gap spacing.">
      <VStack gap={6}>
        <VStack gap={2}>
          <Text weight="medium">VStack — vertical flow</Text>
          <Card padding={4}>
            <VStack gap={2}>
              <Text>First item</Text>
              <Text color="secondary">Second item</Text>
              <Text color="secondary">Third item</Text>
            </VStack>
          </Card>
        </VStack>
        <VStack gap={2}>
          <Text weight="medium">HStack — horizontal flow</Text>
          <Card padding={4}>
            <HStack gap={3} vAlign="center">
              <Text>Start</Text>
              <Text color="secondary">Center</Text>
              <Text color="accent">End</Text>
            </HStack>
          </Card>
        </VStack>
        <VStack gap={2}>
          <Text weight="medium">Grid — responsive columns</Text>
          <Grid columns={3} gap={3}>
            {["A", "B", "C", "D", "E", "F"].map((label) => (
              <Card key={label} padding={4}>
                <Text>{label}</Text>
              </Card>
            ))}
          </Grid>
        </VStack>
      </VStack>
    </DocsPage>
  ),
};
