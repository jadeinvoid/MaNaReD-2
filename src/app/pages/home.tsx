import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";

import { FeatureCard } from "@/app/components/feature-card";
import { HomeForm } from "@/app/components/home-form";
import { PageHeader } from "@/app/components/page-header";
import { StatusPill } from "@/app/components/status-pill";
import { TokenSwatch } from "@/app/components/token-swatch";

/**
 * Server Component page: Astryx for components, Tailwind for layout/wrappers.
 * Interactive bits live in small client islands (see home-form.tsx).
 */
export const Home = () => {
  return (
    <main className="min-h-screen bg-body p-8">
      <div className="mx-auto max-w-3xl">
        <VStack gap={8}>
          <PageHeader
            title="Astryx + Tailwind"
            description="RedwoodSDK RSC on Cloudflare Workers. Astryx ships pre-built component CSS; Tailwind handles layout and token-backed utilities via the design-system bridge."
          />

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Tailwind on Astryx components</Heading>
            <Card className="border-2 border-blue-500 shadow-lg">
              <Text type="body">
                Card with{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-sm text-primary">
                  border-2 border-blue-500 shadow-lg
                </code>
              </Text>
            </Card>
            <HStack gap={2}>
              <Button label="Primary" variant="primary" />
              <Button label="Rounded" variant="primary" className="rounded-full shadow-xl" />
              <Button label="Secondary" variant="secondary" />
            </HStack>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Token-backed utilities</Heading>
            <Text type="body" color="secondary">
              Classes like <code className="text-sm">bg-surface</code> and{" "}
              <code className="text-sm">text-primary</code> resolve to Astryx CSS variables.
            </Text>
            <div className="grid grid-cols-3 gap-3">
              <TokenSwatch token="bg-surface" description="Cards, panels" className="bg-surface" />
              <TokenSwatch token="bg-body" description="Page background" className="bg-body" />
              <TokenSwatch token="bg-muted" description="Subtle emphasis" className="bg-muted" />
            </div>
            <div className="flex gap-3">
              <StatusPill status="success" label="Success" />
              <StatusPill status="error" label="Error" />
              <StatusPill status="warning" label="Warning" />
            </div>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Compose with layout components</Heading>
            <FeatureCard
              badges={[
                { label: "RSC", variant: "info" },
                { label: "Tailwind", variant: "success" },
                { label: "Astryx", variant: "neutral" },
              ]}
              description="Prefer Astryx layout primitives (VStack, HStack, Card) for structure; use Tailwind on wrappers and className overrides."
              ctaLabel="Get started"
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
