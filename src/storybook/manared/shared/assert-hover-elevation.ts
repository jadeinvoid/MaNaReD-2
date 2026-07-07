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
