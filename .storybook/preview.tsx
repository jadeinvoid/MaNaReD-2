import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";

import { Providers } from "../src/app/providers";
import stylesUrl from "../src/app/styles.css?url";
import docsStylesUrl from "./docs.css?url";

for (const href of [stylesUrl, docsStylesUrl]) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

// Match the app Document: theme on <html>, body uses the dark page token.
document.documentElement.setAttribute("data-astryx-theme", "neutral");
document.documentElement.classList.add("bg-body");
document.body.classList.add("min-h-screen", "bg-body", "text-primary");

const preview: Preview = {
  // Generate Docs pages for every story (override per-file with tags: []).
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      // Docs chrome defaults to light; use Storybook's dark theme for the page.
      theme: themes.dark,
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;
