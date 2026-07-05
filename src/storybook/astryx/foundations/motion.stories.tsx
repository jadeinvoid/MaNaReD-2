"use client";

import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@astryxdesign/core/Button";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { DocsPage } from "../shared/docs-page";

const meta = {
  title: "Astryx/Foundations/Motion",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Duration and easing tokens for animations and transitions (--duration-*, --ease-*).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function MotionDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <DocsPage
      title="Motion"
      description="Use motion tokens for consistent timing. Click the box to toggle size."
    >
      <VStack gap={6}>
        <HStack gap={4} vAlign="center">
          <Button
            label={expanded ? "Collapse" : "Expand"}
            variant="secondary"
            onClick={() => setExpanded((v) => !v)}
          />
          <Text color="secondary" size="sm">
            transition: width var(--duration-normal) var(--ease-standard)
          </Text>
        </HStack>
        <div
          className="rounded-container bg-accent flex items-center justify-center"
          style={{
            width: expanded ? 320 : 120,
            height: 80,
            transition: "width var(--duration-normal) var(--ease-standard)",
          }}
        >
          <Text color="inherit" className="text-on-accent">
            Motion demo
          </Text>
        </div>
        <VStack gap={2}>
          <Text size="sm" weight="medium">
            Duration tokens
          </Text>
          <Text size="sm" color="secondary">
            --duration-instant, --duration-fast, --duration-normal, --duration-slow
          </Text>
          <Text size="sm" weight="medium">
            Easing tokens
          </Text>
          <Text size="sm" color="secondary">
            --ease-standard, --ease-enter, --ease-exit, --ease-bounce
          </Text>
        </VStack>
      </VStack>
    </DocsPage>
  );
}

export const Durations: Story = {
  render: () => <MotionDemo />,
};
