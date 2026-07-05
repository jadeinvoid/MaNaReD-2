import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "vite-plus/test/browser-playwright";
import { defineConfig } from "vite-plus";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Storybook interaction tests for hand-authored Vibework components. */
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook-vitest"),
            storybookScript: "pnpm run storybook -- --no-open",
            tags: {
              include: ["test"],
            },
          }),
        ],
        test: {
          name: "vibework-components",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
