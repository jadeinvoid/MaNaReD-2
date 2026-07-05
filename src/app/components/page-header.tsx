import { VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";

export type PageHeaderProps = {
  /** Primary page title. */
  title: string;
  /** Supporting copy shown under the title. */
  description: string;
};

/** Page intro: title plus secondary description. */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <VStack gap={2}>
      <Heading level={1}>{title}</Heading>
      <Text type="body" color="secondary">
        {description}
      </Text>
    </VStack>
  );
}
