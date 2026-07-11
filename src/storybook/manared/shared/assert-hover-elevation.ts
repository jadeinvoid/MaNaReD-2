import { expect } from "storybook/test";
import { userEvent } from "vite-plus/test/browser";

/** Assert rest shadow is applied and pointer hover stacks the elevated layer. */
export async function expectHoverElevates(shell: HTMLElement) {
  const restShadow = getComputedStyle(shell).boxShadow;
  await expect(restShadow, "rest box-shadow").not.toBe("none");

  await userEvent.hover(shell);
  const hoverShadow = getComputedStyle(shell).boxShadow;
  await expect(hoverShadow, "hover box-shadow differs from rest").not.toBe(restShadow);
}

/** Assert pointer hover shows a 4px `--color-background-blue` inset underline. */
export async function expectButtonHoverUnderline(button: HTMLElement) {
  const restShadow = getComputedStyle(button).boxShadow;

  await userEvent.hover(button);
  const hoverShadow = getComputedStyle(button).boxShadow;
  await expect(hoverShadow, "hover box-shadow").not.toBe("none");
  await expect(hoverShadow, "hover underline differs from rest").not.toBe(restShadow);
  await expect(hoverShadow, "hover underline is inset").toMatch(/inset/i);
  await expect(hoverShadow, "hover underline has thickness").toMatch(/-?\d+(\.\d+)?px/);
}
