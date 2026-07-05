/** MaNaReD icon stroke at 16px display size (UI Library node 93:1469). */
export const ICON_STROKE_BASE_PX = 1.6;

export const ICON_STROKE_REFERENCE_SIZE = 16;

export type IconDisplaySize = 12 | 16 | 24 | 32;

/** Linear stroke scale: 1.6px @ 16px → 1.2 @ 12, 2.4 @ 24, 3.2 @ 32. */
export function getIconStrokeWidth(size: IconDisplaySize): number {
  return ICON_STROKE_BASE_PX * (size / ICON_STROKE_REFERENCE_SIZE);
}
