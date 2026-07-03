import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";

import { HomeForm } from "./home-form";

/**
 * Server Component page: Astryx for components, Tailwind for layout/wrappers.
 * Interactive bits live in small client islands (see home-form.tsx).
 */
export const Home = () => {
  return (
    <main className="min-h-screen bg-body p-8">
      <div className="mx-auto max-w-3xl">
        <VStack gap={8}>
          <VStack gap={2}>
            <Heading level={1}>Astryx + Tailwind</Heading>
            <Text type="body" color="secondary">
              RedwoodSDK RSC on Cloudflare Workers. Astryx ships pre-built component CSS; Tailwind
              handles layout and token-backed utilities via the design-system bridge.
            </Text>
          </VStack>

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
              <div className="rounded-lg bg-surface p-4 shadow-sm">
                <p className="text-sm font-medium text-primary">bg-surface</p>
                <p className="text-xs text-secondary">Cards, panels</p>
              </div>
              <div className="rounded-lg bg-body p-4 shadow-sm">
                <p className="text-sm font-medium text-primary">bg-body</p>
                <p className="text-xs text-secondary">Page background</p>
              </div>
              <div className="rounded-lg bg-muted p-4 shadow-sm">
                <p className="text-sm font-medium text-primary">bg-muted</p>
                <p className="text-xs text-secondary">Subtle emphasis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm font-medium text-success">Success</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-error/10 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-error" />
                <span className="text-sm font-medium text-error">Error</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-warning/10 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-warning" />
                <span className="text-sm font-medium text-warning">Warning</span>
              </div>
            </div>
          </VStack>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Compose with layout components</Heading>
            <Card>
              <VStack gap={3}>
                <HStack gap={2} vAlign="center">
                  <Badge variant="info" label="RSC" />
                  <Badge variant="success" label="Tailwind" />
                  <Badge variant="neutral" label="Astryx" />
                </HStack>
                <Text type="body">
                  Prefer Astryx layout primitives (<code className="text-sm">VStack</code>,{" "}
                  <code className="text-sm">HStack</code>, <code className="text-sm">Card</code>)
                  for structure; use Tailwind on wrappers and{" "}
                  <code className="text-sm">className</code> overrides.
                </Text>
                <Button label="Get started" variant="primary" />
              </VStack>
            </Card>
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
