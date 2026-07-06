import { expect } from "storybook/test";

import { MANARED_COLOUR_MAP } from "@/app/theme/manaredColourMap";

export type ColourMode = "light" | "dark";
export type CssColourProperty = "backgroundColor" | "color" | "borderColor";

export type MaNaReDColourToken = keyof typeof MANARED_COLOUR_MAP;

function normalizeHex(hex: string): string {
  const value = hex.replace("#", "").toLowerCase();

  if (value.length === 3) {
    return value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (value.length === 4) {
    return value
      .slice(0, 3)
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (value.length === 8) {
    return value.slice(0, 6);
  }

  return value;
}

/** Convert `#RRGGBB` to `rgb(r, g, b)` for comparison with getComputedStyle. */
export function hexToRgb(hex: string): string {
  const normalized = normalizeHex(hex);
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function expectedTokenColour(token: MaNaReDColourToken, mode: ColourMode): string {
  const pair = MANARED_COLOUR_MAP[token];
  return hexToRgb(pair[mode === "light" ? 0 : 1]);
}

function themedRoot(): HTMLElement {
  return (
    document.querySelector<HTMLElement>('[data-astryx-theme="manared"]') ?? document.documentElement
  );
}

export async function withColourMode<T>(mode: ColourMode, run: () => T | Promise<T>): Promise<T> {
  const root = themedRoot();
  const previous = root.style.colorScheme;
  root.style.colorScheme = mode;
  try {
    return await run();
  } finally {
    root.style.colorScheme = previous;
  }
}

function readTokenAsColour(token: MaNaReDColourToken, property: CssColourProperty): string {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";

  if (property === "backgroundColor") {
    probe.style.backgroundColor = `var(${token})`;
  } else if (property === "color") {
    probe.style.color = `var(${token})`;
  } else {
    probe.style.border = "1px solid";
    probe.style.borderColor = `var(${token})`;
  }

  document.body.appendChild(probe);
  const computed = getComputedStyle(probe)[property];
  probe.remove();
  return computed;
}

/** Assert a MaNaReD CSS variable resolves to the expected light/dark value. */
export async function expectResolvedToken(
  mode: ColourMode,
  token: MaNaReDColourToken,
  property: CssColourProperty,
) {
  await withColourMode(mode, async () => {
    await expect(readTokenAsColour(token, property), `${token} ${property} in ${mode} mode`).toBe(
      expectedTokenColour(token, mode),
    );
  });
}

/** Assert a class string includes all required MaNaReD utility tokens. */
export async function expectUsesTokenClasses(className: string, ...tokens: string[]) {
  for (const token of tokens) {
    await expect(className, `expected class list to include ${token}`).toContain(token);
  }
}
