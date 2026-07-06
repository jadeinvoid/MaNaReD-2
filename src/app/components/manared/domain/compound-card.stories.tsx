import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import {
  BORDER_PRIMARY,
  COMPOUND_CARD_MEDIA,
  SHADOW_CARD,
  SURFACE_COMPOUND_CARD,
} from "../primitives/surface-styles";
import { LIST_CARD_TEXT_STACK } from "../primitives/list-text-styles";
import { CompoundCard } from "./compound-card";

/** Card shell shares surface tokens with Figma list row frame (`367:3752`). */
const FIGMA_CARD = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-3752";

function ColourModeFrame({ mode, children }: { mode: "light" | "dark"; children: ReactNode }) {
  const frameStyle: CSSProperties = {
    colorScheme: mode,
    padding: "1.5rem",
    borderRadius: "var(--radius-container)",
    border: "1px solid var(--color-border-emphasized)",
    backgroundColor: "var(--color-background-body)",
  };

  return (
    <div style={frameStyle} data-colour-mode={mode}>
      {children}
    </div>
  );
}

const meta = {
  title: "MaNaReD/Domain/CompoundCard",
  component: CompoundCard,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_CARD },
    docs: {
      description: {
        component: `Compound result card using ListText primitives and the [Figma card shell](${FIGMA_CARD}) (\`367:3752\`).`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "CMNPD-00482",
    name: "Latrunculin A",
    formula: "C₃₃H₄₅NO₅",
    source: "Sponge Latrunculia sp.",
    tags: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Marine", entity: "region" },
    ],
  },
} satisfies Meta<typeof CompoundCard>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertCompoundCardContent(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await expect(canvas.getByText("CMNPD-00482")).toBeVisible();
  await expect(canvas.getByText("Latrunculin A")).toBeVisible();
  await expect(canvas.getByText("C₃₃H₄₅NO₅")).toBeVisible();
  await expect(canvas.getByText("Source: Sponge Latrunculia sp.")).toBeVisible();
  await expect(canvas.getByText("Compound")).toBeVisible();
  await expect(canvas.getByText("Cytotoxic")).toBeVisible();
  await expect(canvas.getByText("Marine")).toBeVisible();
}

async function assertCompoundCardSurface(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const shell = canvas.getByText("Latrunculin A").closest('[class*="bg-surface"]');
  if (!shell) {
    throw new Error("CompoundCard shell not found");
  }

  await expectUsesTokenClasses(shell.className, "bg-surface", "rounded-lg", "p-4");
  await expect(SURFACE_COMPOUND_CARD).toContain(BORDER_PRIMARY);
  await expect(SURFACE_COMPOUND_CARD).toContain(SHADOW_CARD);

  const media = canvas.getByText("Structure").parentElement;
  await expectUsesTokenClasses(media?.className ?? "", "bg-body-secondary", "rounded-lg");
  await expect(COMPOUND_CARD_MEDIA).toContain("bg-body-secondary");
}

async function assertCompoundCardTypography(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const id = canvas.getByText("CMNPD-00482");
  const title = canvas.getByText("Latrunculin A");
  const formula = canvas.getByText("C₃₃H₄₅NO₅");

  await expectUsesTokenClasses(id.className, "font-mono", "text-3xs", "text-secondary");
  await expectUsesTokenClasses(title.className, "text-xs", "font-semibold", "text-primary");
  await expectUsesTokenClasses(formula.className, "text-3xs", "text-secondary");
  await expectUsesTokenClasses(
    canvas.getByText("Source: Sponge Latrunculia sp.").className,
    "text-3xs",
    "text-secondary",
  );

  const textStack = id.parentElement;
  await expectUsesTokenClasses(textStack?.className ?? "", "flex-col", "gap-1", "p-1");
  await expect(LIST_CARD_TEXT_STACK).toContain("gap-1");
}

async function assertCompoundCardTokenColours(_canvasElement: HTMLElement) {
  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
    await expectResolvedToken(mode, "--color-border", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
    await expectResolvedToken(mode, "--color-text-primary", "color");
    await expectResolvedToken(mode, "--color-background-body-secondary", "backgroundColor");
  }
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await assertCompoundCardContent(canvasElement);
    await assertCompoundCardSurface(canvasElement);
    await assertCompoundCardTypography(canvasElement);
    await assertCompoundCardTokenColours(canvasElement);
  },
};

export const LightMode: Story = {
  decorators: [
    (Story) => (
      <ColourModeFrame mode="light">
        <Story />
      </ColourModeFrame>
    ),
  ],
  play: async ({ canvasElement }) => {
    await withColourMode("light", async () => {
      await assertCompoundCardContent(canvasElement);
      await assertCompoundCardTokenColours(canvasElement);
    });
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ColourModeFrame mode="dark">
        <Story />
      </ColourModeFrame>
    ),
  ],
  play: async ({ canvasElement }) => {
    await withColourMode("dark", async () => {
      await assertCompoundCardContent(canvasElement);
      await assertCompoundCardTokenColours(canvasElement);
    });
  },
};

export const Minimal: Story = {
  args: {
    id: "CMNPD-00103",
    name: "Manoalide",
    formula: undefined,
    source: undefined,
    tags: [{ label: "Anti-inflammatory", entity: "bioactivity" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Manoalide")).toBeVisible();
    await expect(canvas.queryByText(/^Source:/)).not.toBeInTheDocument();
  },
};
