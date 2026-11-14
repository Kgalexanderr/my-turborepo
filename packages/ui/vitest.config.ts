import { fileURLToPath } from "node:url";
import { createUiConfig } from "@repo/vitest-config/ui";

export default createUiConfig(
  "@repo/ui",
  fileURLToPath(new URL(".", import.meta.url)),
);
