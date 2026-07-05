import type { Meta, StoryObj } from "@storybook/react-vite";

import { VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";

import { DocsPage } from "../shared/docs-page";

const meta = {
  title: "Astryx/Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Geometric type scale with semantic heading and body styles. Themes adjust base size and ratio in defineTheme.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <DocsPage
      title="Typography"
      description="Heading levels and body text sizes from the Astryx type scale."
    >
      <VStack gap={4}>
        <Heading level={1}>Heading level 1</Heading>
        <Heading level={2}>Heading level 2</Heading>
        <Heading level={3}>Heading level 3</Heading>
        <Heading level={4}>Heading level 4</Heading>
        <Heading level={5}>Heading level 5</Heading>
        <Heading level={6}>Heading level 6</Heading>
      </VStack>
      <VStack gap={3}>
        <Text size="lg">Large body text — primary content at comfortable reading size.</Text>
        <Text>Default body text — most UI copy uses this size.</Text>
        <Text size="sm" color="secondary">
          Small secondary text — metadata, captions, helper text.
        </Text>
        <Text size="2xs" color="disabled">
          Extra small disabled text
        </Text>
      </VStack>
      <VStack gap={2}>
        <Heading level={3}>Display variants</Heading>
        <Heading level={2} type="display-1">
          Display 1
        </Heading>
        <Heading level={2} type="display-2">
          Display 2
        </Heading>
        <Heading level={2} type="display-3">
          Display 3
        </Heading>
      </VStack>
    </DocsPage>
  ),
};
