import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";

import { DocsPage } from "../../astryx/shared/docs-page";

const FIGMA_FONT = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=32-5";

const typeSamples = [
  { token: "MaNaReD.font.size.3xs", size: "12px", sample: "Caption / metadata" },
  { token: "MaNaReD.font.size.2xs", size: "14px", sample: "List ID, small labels" },
  { token: "MaNaReD.font.size.xs", size: "16px", sample: "Body, nav items" },
  { token: "MaNaReD.font.size.sm", size: "20px", sample: "Subheadings" },
  { token: "MaNaReD.font.size.md", size: "24px", sample: "Section titles" },
  { token: "MaNaReD.font.size.lg", size: "32px", sample: "Page titles" },
];

const meta = {
  title: "MaNaReD/Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_FONT },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Typography"
      description="Inter for display/content, Geist Mono for code. Map to Astryx Heading and Text — avoid hard-coded px."
    >
      <VStack gap={4}>
        <Text color="secondary">
          Families: display/content = Inter, code = Geist Mono. Weights: 400 default, 600 semiBold,
          700 bold, 900 black.
        </Text>
        {typeSamples.map((row) => (
          <div key={row.token} className="rounded-lg border border-emphasized bg-surface p-4">
            <VStack gap={1}>
              <Text size="2xs" color="secondary">
                {row.token} — {row.size}
              </Text>
              <p className="text-primary" style={{ fontSize: row.size }}>
                {row.sample}
              </p>
            </VStack>
          </div>
        ))}
        <Heading level={1}>Heading level 1</Heading>
        <Heading level={2}>Heading level 2</Heading>
        <Text type="body">Body text via Astryx Text</Text>
        <Text type="body" color="secondary">
          Secondary body text
        </Text>
      </VStack>
    </DocsPage>
  ),
};
