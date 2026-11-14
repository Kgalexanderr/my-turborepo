import { baseConfig } from "./configs/base-config.js";

// Only runner-wide test settings belong here; package configs never import
// the root Projects config, which would recursively inherit `projects`.
export const sharedConfig = { test: baseConfig.test };

export { baseConfig } from "./configs/base-config.js";
export { uiConfig, createUiConfig } from "./configs/ui-config.js";
