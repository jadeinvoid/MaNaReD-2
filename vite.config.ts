import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  // Tailwind's Vite plugin uses createResolver() which expects an `ssr`
  // environment. RedwoodSDK only has `worker`, so stub `ssr` to unblock builds.
  // https://docs.rwsdk.com/guides/frontend/tailwind
  environments: {
    ssr: {},
  },
  plugins: lazyPlugins(async () => {
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    const { redwood } = await import("rwsdk/vite");
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    return [
      cloudflare({
        viteEnvironment: { name: "worker" },
      }),
      redwood(),
      tailwindcss(),
    ];
  }),
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    plugins: ["typescript", "react"],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
