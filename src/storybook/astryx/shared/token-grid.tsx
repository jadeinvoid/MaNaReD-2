import { Grid } from "@astryxdesign/core/Grid";
import { VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import type { CSSProperties } from "react";

export type TokenEntry = {
  name: string;
  description?: string;
  /** CSS value or var reference applied to the preview. */
  previewStyle?: CSSProperties;
  /** Optional utility class on the preview element. */
  className?: string;
};

type TokenGridProps = {
  title?: string;
  tokens: TokenEntry[];
  columns?: 2 | 3 | 4;
  /** Render a color swatch using backgroundColor from previewStyle. */
  variant?: "swatch" | "bar" | "box";
};

function TokenPreview({
  token,
  variant,
}: {
  token: TokenEntry;
  variant: TokenGridProps["variant"];
}) {
  if (variant === "bar") {
    return (
      <div
        className="rounded-inner bg-accent h-4"
        style={{
          width: token.previewStyle?.width ?? "var(--spacing-8)",
          ...token.previewStyle,
        }}
      />
    );
  }

  if (variant === "box") {
    return (
      <div
        className={token.className ?? "border border-emphasized bg-surface"}
        style={{
          width: 80,
          height: 80,
          borderRadius: token.previewStyle?.borderRadius,
          boxShadow: token.previewStyle?.boxShadow,
          ...token.previewStyle,
        }}
      />
    );
  }

  return (
    <div
      className={`rounded-element border border-emphasized h-16 ${token.className ?? ""}`}
      style={{
        backgroundColor: token.previewStyle?.backgroundColor ?? "var(--color-background-surface)",
        ...token.previewStyle,
      }}
    />
  );
}

/** Grid of design-token previews for Foundations stories. */
export function TokenGrid({ title, tokens, columns = 3, variant = "swatch" }: TokenGridProps) {
  return (
    <VStack gap={4}>
      {title ? <Heading level={3}>{title}</Heading> : null}
      <Grid columns={columns} gap={4}>
        {tokens.map((token) => (
          <div
            key={token.name}
            className="rounded-container border border-emphasized bg-surface p-4"
          >
            <VStack gap={2}>
              <TokenPreview token={token} variant={variant} />
              <Text size="sm" weight="medium">
                {token.name}
              </Text>
              {token.description ? (
                <Text size="2xs" color="secondary">
                  {token.description}
                </Text>
              ) : null}
            </VStack>
          </div>
        ))}
      </Grid>
    </VStack>
  );
}
