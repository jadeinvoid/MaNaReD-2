import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";

/**
 * Isolated Vite config for Storybook.
 * The app vite.config.ts loads Cloudflare / RedwoodSDK plugins that are not
 * compatible with Storybook's browser builder.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
