import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, fn, within } from "storybook/test";

import {
  expectCardElevation,
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import {
  CARD_FORMULA,
  CARD_HEADER_STACK,
  CARD_ID,
  CARD_INFO_ROW,
  CARD_META_LABEL,
  CARD_META_ROW,
  CARD_META_VALUE,
  CARD_TAGS_ROW,
  CARD_TITLE,
} from "../primitives/card-text-styles";
import {
  INTERACTIVE_CARD_DETAIL,
  INTERACTIVE_CARD_EXPORT,
  INTERACTIVE_CARD_SAVE,
} from "../primitives/interactive-styles";
import {
  BORDER_PRIMARY,
  COMPOUND_CARD_MEDIA,
  SHADOW_CARD,
  SURFACE_COMPOUND_CARD,
} from "../primitives/surface-styles";
import { CompoundCard } from "./compound-card";

/** Figma compound card frame (`367:4387`). */
const FIGMA_CARD = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-4387";

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
        component: `Full browse compound card with [Figma card shell](${FIGMA_CARD}) typography and metadata footer.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "# HAL-2024-001",
    name: "Halichondrin B",
    formula: "C₆₀H₈₆O₁₉",
    molecularWeight: "1111.29 g/mol",
    tags: [
      { label: "Antitumor", entity: "compound" },
      { label: "Marine Origin", entity: "organism" },
      { label: "Polyether Macrolide", entity: "compound" },
    ],
    region: "Pacific Ocean",
    organism: "Halichondria okadai",
    bioactivity: "Antineoplastic",
    onSave: fn(),
    onExport: fn(),
    onDetail: fn(),
  },
} satisfies Meta<typeof CompoundCard>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertCompoundCardContent(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await expect(canvas.getByText("# HAL-2024-001")).toBeVisible();
  await expect(canvas.getByText("Halichondrin B")).toBeVisible();
  await expect(canvas.getByText("C₆₀H₈₆O₁₉ · MW: 1111.29 g/mol")).toBeVisible();
  await expect(canvas.getByText("Antitumor")).toBeVisible();
  await expect(canvas.getByText("Marine Origin")).toBeVisible();
  await expect(canvas.getByText("Pacific Ocean")).toBeVisible();
  await expect(canvas.getByText("Halichondria okadai")).toBeVisible();
  await expect(canvas.getByText("Antineoplastic")).toBeVisible();
  await expect(canvas.getByRole("button", { name: "Save" })).toBeVisible();
  await expect(canvas.getByRole("button", { name: "Export" })).toBeVisible();
  await expect(canvas.getByRole("button", { name: "Detail" })).toBeVisible();
}

async function assertCompoundCardSurface(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const shell = canvas.getByText("Halichondrin B").closest('[class*="bg-surface"]');
  if (!shell) {
    throw new Error("CompoundCard shell not found");
  }

  await expectUsesTokenClasses(shell.className, "bg-surface", "rounded-lg", "p-4");
  await expect(SURFACE_COMPOUND_CARD).toContain(BORDER_PRIMARY);
  await expect(SURFACE_COMPOUND_CARD).toContain(SHADOW_CARD);

  const media = canvas.getByText("[Molecular Structure]").parentElement;
  await expectUsesTokenClasses(
    media?.className ?? "",
    "border-dashed",
    "border-emphasized",
    "bg-body-secondary",
    "w-[300px]",
    "min-h-[164px]",
    "self-stretch",
  );
  await expect(COMPOUND_CARD_MEDIA).toContain("border-dashed");
  await expect(COMPOUND_CARD_MEDIA).toContain("w-[300px]");
}

async function assertCompoundCardLayout(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const regionLabel = canvas.getByText("Geographic Region");
  const bodyColumn = regionLabel.closest('[class*="flex-1"]');
  const infoRow = bodyColumn?.parentElement;

  if (!bodyColumn || !infoRow) {
    throw new Error("CompoundCard body column not found");
  }

  await expectUsesTokenClasses(infoRow.className, "items-stretch");
  await expect(CARD_INFO_ROW).toContain("items-stretch");
  await expect(bodyColumn.className).toContain("flex-1");

  const picture = canvas.getByText("[Molecular Structure]").parentElement;
  await expect(picture?.parentElement).toBe(infoRow);
  await expect(bodyColumn.contains(regionLabel)).toBe(true);
}

async function assertCompoundCardTypography(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const id = canvas.getByText("# HAL-2024-001");
  const title = canvas.getByText("Halichondrin B");
  const formula = canvas.getByText("C₆₀H₈₆O₁₉ · MW: 1111.29 g/mol");

  await expectUsesTokenClasses(id.className, "font-mono", "text-2xs", "text-secondary");
  await expectUsesTokenClasses(title.className, "text-sm", "font-semibold", "text-primary");
  await expectUsesTokenClasses(formula.className, "font-mono", "text-2xs", "text-secondary");
  await expect(CARD_ID).toContain("leading-[var(--text-supporting-leading)]");
  await expect(CARD_TITLE).toContain("leading-[var(--text-heading-5-leading)]");
  await expect(CARD_FORMULA).toContain("leading-[var(--text-supporting-leading)]");

  const header = id.parentElement;
  await expectUsesTokenClasses(header?.className ?? "", "flex-col");
  await expect(CARD_HEADER_STACK).toContain("gap-[length:var(--spacing-1)]");
  await expect(CARD_TAGS_ROW).toContain("gap-[length:var(--spacing-2)]");
  await expect(CARD_TAGS_ROW).not.toContain("pt-[length:var(--spacing-4)]");

  const regionLabel = canvas.getByText("Geographic Region");
  await expectUsesTokenClasses(regionLabel.className, "text-tertiary");
  await expectUsesTokenClasses(
    canvas.getByText("Pacific Ocean").className,
    "text-[13px]",
    "text-primary",
  );
  await expect(CARD_META_LABEL).toContain("text-[11px]");
  await expect(CARD_META_VALUE).toContain("text-[13px]");
  await expect(CARD_META_ROW).toContain("gap-[length:var(--spacing-8)]");
}

async function assertCompoundCardTokenColours(_canvasElement: HTMLElement) {
  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
    await expectResolvedToken(mode, "--color-border", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
    await expectResolvedToken(mode, "--color-text-primary", "color");
    await expectResolvedToken(mode, "--color-text-tertiary", "color");
    await expectResolvedToken(mode, "--color-background-body-secondary", "backgroundColor");
    await expectResolvedToken(mode, "--color-background-card-tertiary", "backgroundColor");
  }
}

async function assertCompoundCardActions(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const save = canvas.getByRole("button", { name: "Save" });
  const exportBtn = canvas.getByRole("button", { name: "Export" });
  const detail = canvas.getByRole("button", { name: "Detail" });

  await expectUsesTokenClasses(save.className, "bg-button-active", "text-3xs", "text-primary");
  await expectUsesTokenClasses(exportBtn.className, "bg-button-focus", "text-3xs", "text-primary");
  await expectUsesTokenClasses(
    detail.className,
    "bg-card-tertiary",
    "font-semibold",
    "text-primary",
  );
  await expect(INTERACTIVE_CARD_SAVE).toContain("rounded-[6px]");
  await expect(INTERACTIVE_CARD_EXPORT).toContain("bg-button-focus");
  await expect(INTERACTIVE_CARD_DETAIL).toContain("font-semibold");
  await expect(detail.querySelector("svg")).toBeTruthy();
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await assertCompoundCardContent(canvasElement);
    await assertCompoundCardSurface(canvasElement);
    await assertCompoundCardLayout(canvasElement);
    await assertCompoundCardTypography(canvasElement);
    await assertCompoundCardTokenColours(canvasElement);
    await assertCompoundCardActions(canvasElement);
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
      const canvas = within(canvasElement);
      const shell = canvas.getByText("Halichondrin B").closest('[class*="bg-surface"]');
      if (!shell || !(shell instanceof HTMLElement)) {
        throw new Error("CompoundCard shell not found");
      }
      await expectCardElevation(shell, "light");
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
      const canvas = within(canvasElement);
      const shell = canvas.getByText("Halichondrin B").closest('[class*="bg-surface"]');
      if (!shell || !(shell instanceof HTMLElement)) {
        throw new Error("CompoundCard shell not found");
      }
      await expectCardElevation(shell, "dark");
    });
  },
};

export const Minimal: Story = {
  args: {
    id: "CMNPD-00103",
    name: "Manoalide",
    formula: undefined,
    molecularWeight: undefined,
    tags: [{ label: "Anti-inflammatory", entity: "bioactivity" }],
    region: undefined,
    organism: undefined,
    bioactivity: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Manoalide")).toBeVisible();
    await expect(canvas.queryByText("Geographic Region")).not.toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Detail" })).toBeVisible();
  },
};
