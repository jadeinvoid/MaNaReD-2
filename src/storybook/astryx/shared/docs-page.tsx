import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import type { ReactNode } from "react";

type DocsPageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/** Layout shell for Foundations stories — title, intro, and content. */
export function DocsPage({ title, description, children }: DocsPageProps) {
  return (
    <div className="p-8">
      <VStack gap={6}>
        <VStack gap={2}>
          <Heading level={1}>{title}</Heading>
          {description ? <Text color="secondary">{description}</Text> : null}
        </VStack>
        {children}
      </VStack>
    </div>
  );
}
