import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

export type FeatureBadge = {
  label: string;
  variant: "info" | "success" | "neutral" | "warning" | "error";
};

export type FeatureCardProps = {
  /** Badges shown in the card header. */
  badges: FeatureBadge[];
  /** Body copy describing the feature. */
  description: string;
  /** Primary action label. */
  ctaLabel: string;
  /** Optional click handler for the CTA button. */
  onCtaClick?: () => void;
};

/** Card that highlights a feature with badges, copy, and a CTA. */
export function FeatureCard({ badges, description, ctaLabel, onCtaClick }: FeatureCardProps) {
  return (
    <Card>
      <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          {badges.map((badge) => (
            <Badge key={badge.label} variant={badge.variant} label={badge.label} />
          ))}
        </HStack>
        <Text type="body">{description}</Text>
        <Button label={ctaLabel} variant="primary" onClick={onCtaClick} />
      </VStack>
    </Card>
  );
}
