import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { expectedTokenColour } from "@/storybook/manared/shared/assert-token-colours";

import { MOCK_COMPOUND_CLASSES } from "./filter-state";
import { FilterDropdownPanel } from "./filter-dropdown-panel";

function readTokenFontSize(token: string): string {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.fontSize = `var(${token})`;
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).fontSize;
  probe.remove();
  return computed;
}

async function assertCompactPrimaryTrigger(canvasElement: HTMLElement) {
  const trigger = canvasElement.querySelector<HTMLElement>(".filter-compound-class-selector");
  if (!trigger) {
    throw new Error("Compound class selector trigger not found");
  }

  const style = getComputedStyle(trigger);
  await expect(style.fontSize).toBe(readTokenFontSize("--font-size-3xs"));
  await expect(style.color).toBe(expectedTokenColour("--color-text-primary", "light"));
  await expect(style.justifyContent).toBe("center");

  const combobox = trigger.querySelector<HTMLElement>('[role="combobox"]');
  if (!combobox) {
    throw new Error("Compound class combobox not found");
  }
  const label = combobox.querySelector("span");
  if (!label) {
    throw new Error("Compound class combobox label not found");
  }
  await expect(getComputedStyle(label).textAlign).toBe("center");
}

const meta = {
  title: "MaNaReD/Composites/FilterDropdownPanel",
  component: FilterDropdownPanel,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "224px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: MOCK_COMPOUND_CLASSES,
    value: null,
    onChange: fn(),
  },
} satisfies Meta<typeof FilterDropdownPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Select class…")).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Clear compound class" }),
    ).not.toBeInTheDocument();
    await assertCompactPrimaryTrigger(canvasElement);
  },
};

export const WithSelection: Story = {
  args: {
    value: "Alkaloids",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvasElement.querySelector<HTMLElement>(".filter-compound-class-selector");
    if (!trigger) {
      throw new Error("Compound class selector trigger not found");
    }

    await expect(canvas.getByRole("combobox", { name: "Compound class" })).toHaveTextContent(
      "Alkaloids",
    );
    await expect(trigger.querySelector('button[aria-label="Clear Compound class"]')).toBeNull();
    const clearButton = canvas.getByRole("button", { name: "Clear compound class" });
    await expect(clearButton.className).toContain("filter-compound-class-clear");
    await assertCompactPrimaryTrigger(canvasElement);
    await userEvent.click(clearButton);
    await expect(args.onChange).toHaveBeenCalledWith(null);
  },
};
