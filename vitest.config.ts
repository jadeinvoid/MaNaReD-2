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
        test: {
          name: "theme-contract",
          include: ["src/app/theme/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook-vitest"),
            storybookScript: "vp run storybook",
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
