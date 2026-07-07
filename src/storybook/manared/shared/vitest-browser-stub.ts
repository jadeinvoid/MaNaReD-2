/**
 * Storybook dev shim for `vite-plus/test/browser`.
 * Vitest browser tests resolve the real module (no alias in `.storybook-vitest`).
 */

export const userEvent = {
  async hover(element: HTMLElement) {
    element.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
    element.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  },
};
