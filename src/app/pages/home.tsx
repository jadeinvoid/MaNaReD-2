import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";

import { EntityPill } from "@/app/components/entity-pill";
import { FeatureCard } from "@/app/components/feature-card";
import { HomeForm } from "@/app/components/home-form";
import { PageHeader } from "@/app/components/page-header";
import { StatusPill } from "@/app/components/status-pill";
import { TokenSwatch } from "@/app/components/token-swatch";

/**
 * Server Component page: Astryx for components, Tailwind for layout/wrappers.
 * MaNaReD Figma tokens are applied via the manared Astryx theme.
 */
export const Home = () => {
  return (
    <main className="min-h-screen bg-body p-8">
      <div className="mx-auto max-w-3xl">
        <VStack gap={8}>
          <PageHeader
            title="MaNaReD"
            description="Marine Natural Products Database — Figma design tokens mapped to Astryx utilities and the MaNaReD theme."
          />

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Surface tokens</Heading>
            <Text type="body" color="secondary">
              Core backgrounds from <code className="text-sm">MaNaReD.colour.BG.*</code> resolve to{" "}
              <code className="text-sm">bg-body</code>, <code className="text-sm">bg-surface</code>,
              and <code className="text-sm">bg-sidebar</code>.
            </Text>
            <div className="grid grid-cols-3 gap-3">
              <TokenSwatch
                token="bg-surface"
                description="MaNaReD.colour.BG.card"
                className="bg-surface"
              />
              <TokenSwatch
                token="bg-body"
                description="MaNaReD.colour.BG.page"
                className="bg-body"
              />
              <TokenSwatch
                token="bg-sidebar"
                description="MaNaReD.colour.BG.sideBar"
                className="bg-sidebar"
              />
            </div>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Text & status</Heading>
            <Text type="body" color="secondary">
              Typography uses Inter; code blocks use Geist Mono. Status colours map to{" "}
              <code className="text-sm">MaNaReD.colour.status.*</code>.
            </Text>
            <p className="text-sm text-tertiary">
              Tertiary text — MaNaReD.colour.text.tertiary (#617990 light)
            </p>
            <div className="flex flex-wrap gap-3">
              <StatusPill status="success" label="Success" />
              <StatusPill status="warning" label="Warning" />
              <StatusPill status="error" label="Danger" />
            </div>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Entity types</Heading>
            <Text type="body" color="secondary">
              Domain badges use MaNaReD entity colour triplets (BG / border / text).
            </Text>
            <HStack gap={2} wrap="wrap">
              <EntityPill entity="organism" />
              <EntityPill entity="bioactivity" />
              <EntityPill entity="compound" />
              <EntityPill entity="region" />
            </HStack>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Components</Heading>
            <Card className="border border-border-strong shadow-lg">
              <Text type="body">
                Primary button uses{" "}
                <code className="text-sm">MaNaReD.colour.interactive.button</code> ( #222133).
              </Text>
            </Card>
            <HStack gap={2}>
              <Button label="Primary" variant="primary" />
              <Button label="Secondary" variant="secondary" />
            </HStack>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Compose with layout</Heading>
            <FeatureCard
              badges={[
                { label: "RSC", variant: "info" },
                { label: "MaNaReD", variant: "success" },
                { label: "Astryx", variant: "neutral" },
              ]}
              description="Prefer Astryx layout primitives (VStack, HStack, Card) for structure; use token-backed Tailwind on wrappers."
              ctaLabel="Explore"
            />
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Client island (forms)</Heading>
            <Text type="body" color="secondary">
              Controlled inputs stay in a small client component so the page shell remains a Server
              Component.
            </Text>
            <Card className="max-w-md">
              <HomeForm />
            </Card>
          </VStack>
        </VStack>
      </div>
    </main>
  );
};
