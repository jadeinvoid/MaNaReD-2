import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { BORDER_PRIMARY, SHADOW_CARD, SURFACE_LIST_ROW } from "../primitives/surface-styles";
import { ListRow } from "./list-row";

const FIGMA_LIST_ROW =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=367-3752";

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
  title: "MaNaReD/Domain/ListRow",
  component: ListRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_LIST_ROW },
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
    title: "Discodermolide",
    chips: [
      { label: "Antitumor", entity: "compound" },
      { label: "Porifera", entity: "organism" },
    ],
    labelNumber: "773.0",
    labelUnit: "Da",
  },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertListRowContent(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await expect(canvas.getByText("# HAL-2024-001")).toBeVisible();
  await expect(canvas.getByText("Discodermolide")).toBeVisible();
  await expect(canvas.getByText("Antitumor")).toBeVisible();
  await expect(canvas.getByText("Porifera")).toBeVisible();
  await expect(canvas.getByText("773.0")).toBeVisible();
  await expect(canvas.getByText("Da")).toBeVisible();
  await expect(canvas.getByLabelText("chevron-down")).toBeVisible();
}

async function assertListRowSurface(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const shell = canvas.getByText("Discodermolide").closest('[class*="bg-surface"]');
  if (!shell) {
    throw new Error("ListRow shell not found");
  }

  await expectUsesTokenClasses(shell.className, "bg-surface", "rounded-lg", "pl-6", "pr-4", "py-4");
  await expect(SURFACE_LIST_ROW).toContain(BORDER_PRIMARY);
  await expect(SURFACE_LIST_ROW).toContain(SHADOW_CARD);
}

async function assertListRowTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const id = canvas.getByText("# HAL-2024-001");
  const title = canvas.getByText("Discodermolide");

  await expectUsesTokenClasses(id.className, "font-mono", "text-3xs", "text-secondary");
  await expectUsesTokenClasses(title.className, "text-xs", "font-semibold", "text-primary");
  await expectUsesTokenClasses(
    canvas.getByText("773.0").parentElement?.className ?? "",
    "text-3xs",
    "text-tertiary",
    "opacity-80",
  );

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-background-surface", "backgroundColor");
    await expectResolvedToken(mode, "--color-border", "borderColor");
    await expectResolvedToken(mode, "--color-text-secondary", "color");
    await expectResolvedToken(mode, "--color-text-primary", "color");
    await expectResolvedToken(mode, "--color-text-tertiary", "color");
  }
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await assertListRowContent(canvasElement);
    await assertListRowSurface(canvasElement);
    await assertListRowTokenColours(canvasElement);
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
      await assertListRowContent(canvasElement);
      await assertListRowTokenColours(canvasElement);
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
      await assertListRowContent(canvasElement);
      await assertListRowTokenColours(canvasElement);
    });
  },
};

export const CombinedLabel: Story = {
  args: {
    id: "CMNPD-00482",
    title: "Latrunculin A",
    chips: [
      { label: "Cytotoxic", entity: "bioactivity" },
      { label: "Alkaloid", entity: "compound" },
    ],
    label: "MW 421.5",
    labelNumber: undefined,
    labelUnit: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("MW 421.5")).toBeVisible();
    await expectUsesTokenClasses(
      canvas.getByText("MW 421.5").className,
      "text-3xs",
      "text-tertiary",
    );
  },
};
