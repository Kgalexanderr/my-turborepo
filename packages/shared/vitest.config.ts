import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "@repo/vitest-config/base";

export default mergeConfig(
  baseConfig,
  defineConfig({
    root: fileURLToPath(new URL(".", import.meta.url)),
    resolve: { tsconfigPaths: true },
    test: { name: "@repo/shared" },
  }),
);
