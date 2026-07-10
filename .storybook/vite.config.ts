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
  server: {
    host: "0.0.0.0",
    port: 6006,
    strictPort: true,
    // Keep HMR websocket on the forwarded port when browsing via Cursor port proxy.
    hmr: {
      clientPort: 6006,
    },
  },
});
