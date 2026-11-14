import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

export const uiConfig = mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [fileURLToPath(new URL("../setup.js", import.meta.url))],
    },
  }),
);

// Create a separate React plugin and resolve aliases from each package's root.
export function createUiConfig(name: string, root: string) {
  return mergeConfig(
    uiConfig,
    defineConfig({
      root,
      plugins: [react()],
      resolve: { tsconfigPaths: true },
      test: { name },
    }),
  );
}
