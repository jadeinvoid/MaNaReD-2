/** Google Fonts stylesheet for MaNaReD — Inter (body/headings) + Geist Mono (code/mono UI). */
export const MANARED_FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;600&family=Inter:wght@400;600;700;900&display=swap";

/** Inject preconnect + font stylesheet into a document head (Storybook, tests). */
export function injectManaredFontLinks(doc: Document = document) {
  const { head } = doc;

  if (!head.querySelector('link[data-manared-fonts="stylesheet"]')) {
    for (const [rel, href, crossOrigin] of [
      ["preconnect", "https://fonts.googleapis.com", undefined],
      ["preconnect", "https://fonts.gstatic.com", "anonymous"],
    ] as const) {
      const link = doc.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      head.appendChild(link);
    }

    const fonts = doc.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = MANARED_FONT_STYLESHEET;
    fonts.dataset.manaredFonts = "stylesheet";
    head.appendChild(fonts);
  }
}
