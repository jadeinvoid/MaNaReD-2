import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { DocsPage } from "../shared/docs-page";
import { TokenGrid } from "../shared/token-grid";

const meta = {
  title: "Astryx/Foundations/Theme",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Vibework uses neutralTheme from @astryxdesign/theme-neutral via Providers in src/app/providers.tsx.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const NeutralTheme: Story = {
  render: () => (
    <DocsPage
      title="Theme"
      description="Wrap the app in Theme with a built theme object. Customize via defineTheme — never override --color-* in :root."
    >
      <VStack gap={6}>
        <Card padding={5}>
          <VStack gap={3}>
            <Text weight="medium">Active theme</Text>
            <Text color="secondary">
              This Storybook uses the same setup as the app:{" "}
              <code className="text-accent">neutralTheme</code> from{" "}
              <code className="text-accent">@astryxdesign/theme-neutral/built</code>, plus{" "}
              <code className="text-accent">theme-neutral/theme.css</code> in styles.css.
            </Text>
            <Text size="sm" color="secondary">
              Theme: neutralTheme from @astryxdesign/theme-neutral/built
            </Text>
          </VStack>
        </Card>
        <TokenGrid
          title="Sample semantic tokens"
          columns={3}
          tokens={[
            {
              name: "accent",
              description: "Brand accent",
              previewStyle: { backgroundColor: "var(--color-accent)" },
            },
            {
              name: "surface",
              description: "Card background",
              previewStyle: { backgroundColor: "var(--color-background-surface)" },
            },
            {
              name: "body",
              description: "Page background",
              previewStyle: { backgroundColor: "var(--color-background-body)" },
            },
          ]}
        />
        <Card padding={5}>
          <VStack gap={3}>
            <Text weight="medium">Customization path</Text>
            <Text color="secondary" size="sm">
              Run <code className="text-accent">vp run astryx -- theme</code> to scaffold a custom
              theme package, or use defineTheme to override component styles (e.g. astryx-button
              base/variants).
            </Text>
            <HStack gap={2}>
              <Button label="Primary" variant="primary" />
              <Button label="Secondary" variant="secondary" />
              <Button label="Ghost" variant="ghost" />
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </DocsPage>
  ),
};
