import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite-plus";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../src/storybook/**/*.mdx",
    "../src/storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        // Avoid loading the app vite config (Cloudflare / RedwoodSDK plugins).
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  features: {
    /**
     * Required for rendering async Server Components in Storybook.
     * Wraps stories in a Suspense boundary:
     * https://docs.rwsdk.com/guides/frontend/storybook
     */
    experimentalRSC: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(dirname, "../src"),
          "@astryx/blocks": path.resolve(
            dirname,
            "../node_modules/@astryxdesign/cli/templates/blocks",
          ),
          "@astryx/pages": path.resolve(
            dirname,
            "../node_modules/@astryxdesign/cli/templates/pages",
          ),
        },
      },
    });
  },
};

export default config;
