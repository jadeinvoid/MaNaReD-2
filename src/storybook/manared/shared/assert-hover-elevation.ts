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

/** Assert pointer hover adds or stacks `--shadow-button-hover` without fill change. */
export async function expectButtonHoverElevates(
  button: HTMLElement,
  options?: { restShadowRequired?: boolean },
) {
  const restShadow = getComputedStyle(button).boxShadow;

  if (options?.restShadowRequired) {
    await expect(restShadow, "rest box-shadow").not.toBe("none");
  }

  await userEvent.hover(button);
  const hoverShadow = getComputedStyle(button).boxShadow;
  await expect(hoverShadow, "hover box-shadow").not.toBe("none");
  await expect(hoverShadow, "hover box-shadow differs from rest").not.toBe(restShadow);
}
