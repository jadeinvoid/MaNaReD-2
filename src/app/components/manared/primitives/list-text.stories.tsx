import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { expect, within } from "storybook/test";

import {
  expectResolvedToken,
  expectUsesTokenClasses,
  withColourMode,
} from "@/storybook/manared/shared/assert-token-colours";

import { LIST_TEXT_ID, LIST_TEXT_LABEL, LIST_TEXT_TITLE } from "./list-text-styles";
import { ListId, ListLabel, ListTextRow, ListTitle } from "./list-text";

const FIGMA_LIST_ID =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=352-4035";
const FIGMA_LIST_TITLE =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=352-4036";
const FIGMA_LIST_LABEL =
  "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=352-4040";

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
  title: "MaNaReD/Primitives/ListText",
  component: ListTextRow,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_LIST_ID },
  },
  args: {
    id: "# HAL-2024-001",
    title: "Discodermolide",
    labelNumber: "773.0",
    labelUnit: "Da",
  },
} satisfies Meta<typeof ListTextRow>;

export default meta;
type Story = StoryObj<typeof meta>;

async function assertListTextTokenColours(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const id = canvas.getByText("# HAL-2024-001");
  const title = canvas.getByText("Discodermolide");
  await expect(canvas.getByText("773.0")).toBeVisible();
  await expect(canvas.getByText("Da")).toBeVisible();
  await expectUsesTokenClasses(LIST_TEXT_ID, "font-mono", "text-secondary");
  await expectUsesTokenClasses(title.className, "text-xs", "font-semibold", "text-primary");
  await expectUsesTokenClasses(LIST_TEXT_TITLE, "text-xs", "font-semibold", "text-primary");
  await expectUsesTokenClasses(id.className, "font-mono", "text-3xs", "text-secondary");
  await expectUsesTokenClasses(
    canvas.getByText("773.0").parentElement?.className ?? "",
    "text-3xs",
    "text-tertiary",
  );
  await expectUsesTokenClasses(LIST_TEXT_LABEL, "text-3xs", "text-tertiary", "opacity-80");

  for (const mode of ["light", "dark"] as const) {
    await expectResolvedToken(mode, "--color-text-secondary", "color");
    await expectResolvedToken(mode, "--color-text-primary", "color");
    await expectResolvedToken(mode, "--color-text-tertiary", "color");
  }
}

export const Row: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("# HAL-2024-001")).toBeVisible();
    await expect(canvas.getByText("Discodermolide")).toBeVisible();
    await expect(canvas.getByText("773.0")).toBeVisible();
    await expect(canvas.getByText("Da")).toBeVisible();
    await assertListTextTokenColours(canvasElement);
  },
};

export const CombinedLabel: Story = {
  args: {
    id: "CMNPD-00482",
    title: "Latrunculin A",
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

export const Atoms: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ListId># HAL-2024-001</ListId>
      <ListTitle>Discodermolide</ListTitle>
      <ListLabel number="773.0" unit="Da" />
    </div>
  ),
  parameters: {
    design: { type: "figma", url: FIGMA_LIST_TITLE },
  },
  play: async ({ canvasElement }) => {
    await assertListTextTokenColours(canvasElement);
  },
};

export const LightMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="light">
      <ListTextRow {...args} />
    </ColourModeFrame>
  ),
  play: async ({ canvasElement }) => {
    await withColourMode("light", () => assertListTextTokenColours(canvasElement));
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <ColourModeFrame mode="dark">
      <ListTextRow {...args} />
    </ColourModeFrame>
  ),
  parameters: {
    design: { type: "figma", url: FIGMA_LIST_LABEL },
  },
  play: async ({ canvasElement }) => {
    await withColourMode("dark", () => assertListTextTokenColours(canvasElement));
  },
};
