# ongrapes

Next.js apps with shared Tailwind CSS v4 and shadcn/ui components.
Use Node.js 26.13.0 or newer and pnpm 12.16.1.

```sh
pnpm install --frozen-lockfile
```

## Testing

This setup follows [Turborepo's with-vitest example](https://github.com/vercel/turborepo/tree/main/examples/with-vitest): package-level cached tests, optional root Vitest Projects, and merged coverage reports.

| Command                             | Purpose                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `pnpm test`                         | Run each package's tests through Turbo, with caching |
| `pnpm test:watch`                   | Start separate package watchers through Turbo        |
| `pnpm test:projects`                | Run all projects in one Vitest process               |
| `pnpm test:projects:watch`          | Watch all projects together during development       |
| `pnpm test:watch --filter=@repo/ui` | Watch only shared UI tests                           |
| `pnpm report`                       | Run cached package tests and create merged coverage  |
| `pnpm view-report`                  | Create the merged report and open it in your browser |

Watch commands use the default reporter and disable coverage: Vitest does not support blob reporters in watch mode, and watchers should not overwrite the coverage blobs from cached runs.

The root commands build `@repo/vitest-config` automatically. Coverage uses Istanbul, matching the example. Each package test run writes its coverage blob to `coverage/blob/report.json`; Turbo restores these blobs on a cache hit. `pnpm report` collects the blobs and produces HTML and text coverage in `packages/vitest-config/coverage/report`. The Projects commands write their own runner output at the repository root and do not replace package-level test caching.

## Configuration

- `packages/vitest-config` is a compiled shared configuration package, as in the example.
- Its `baseConfig` uses the Node environment for non-DOM packages.
- Its `uiConfig` adds jsdom, jest-dom matchers, and explicit React Testing Library cleanup.
- `createUiConfig` creates a fresh React plugin and Vite's native TypeScript alias resolution for each package, with an explicit root and unique project name.
- `apps/{web,dashboard,blank}/vitest.config.ts` and `packages/ui/vitest.config.ts` use that UI configuration.
- The root `vitest.config.ts` discovers package configurations through Vitest Projects. Package configurations import the shared package, never the root Projects configuration.
- Turbo's `transit` task propagates shared-source changes into dependent test hashes while allowing the test suites to run in parallel.

Tests import `describe`, `it`, `expect`, and mocks explicitly from `vitest`; globals are disabled. Place tests next to their source (`*.test.ts` / `*.test.tsx`) or in a package's `tests` directory. The initial tests cover Button interaction, disabled behavior, `asChild`, Tailwind class merging, and page rendering in each app. The utility tests demonstrate the `@vitest-environment node` override.

Changes to shared configuration source must be compiled before they affect an already-running watcher. Restart the root watcher command, or run `pnpm --filter @repo/vitest-config dev` alongside it while editing the config itself.

## Adding another tested package

1. Add `@repo/vitest-config`, `vitest`, and `@vitest/coverage-istanbul` as dev dependencies, using the existing pinned versions. React packages also need the existing Testing Library and jsdom dependencies.
2. Add `test: vitest run` and `test:watch: vitest --watch --reporter=default --coverage.enabled=false` scripts.
3. Add a package-local Vitest config using `baseConfig` for Node or `createUiConfig` for React. For React matchers, include a `vitest.d.ts` importing `@testing-library/jest-dom/vitest` in the package's TypeScript project.
4. Add at least one meaningful test; missing tests fail by default.
5. Add the package's `#test` task to `packages/vitest-config/turbo.json` under `merge-blob-reports.dependsOn` so merged reports wait for and track its blobs.

## Test boundaries

Vitest tests component behavior and logic. Use a real browser test for computed Tailwind styles, layout, routing, and async Server Components. Vitest/jsdom does not verify that `cursor-pointer` becomes an actual browser cursor. Keep `pnpm check-types`, `pnpm lint`, and `pnpm build` alongside tests; Vitest does not replace TypeScript checking or a Next.js build.
