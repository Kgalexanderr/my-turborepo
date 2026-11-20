# @repo/shared

Reusable constants, plain TypeScript utilities, React hooks, and types for the apps.
The package exports source files, matching `@repo/ui`; Next.js apps transpile it.

```text
src/
  constants/    Fixed values shared across apps
  lib/          Plain functions that can run on the server or client
  hooks/        Reusable client-side React hooks
  types/        Shared TypeScript contracts
```

Import the area you need through a package subpath:

```ts
import { DEFAULT_PAGE_SIZE } from "@repo/shared/constants/pagination";
import { calculateTotal } from "@repo/shared/lib/calculate-total";
import type { Pagination } from "@repo/shared/types/pagination";
```

Client Components can import hooks:

```tsx
"use client";

import { useToggle } from "@repo/shared/hooks/use-toggle";

export function ToggleExample() {
  const [enabled, toggle] = useToggle();
  return <button onClick={toggle}>{enabled ? "On" : "Off"}</button>;
}
```

React is a peer dependency, so hooks use the consuming app's React installation.
It is also a dev dependency for local tests. Utilities and constants have separate
entry points and do not load the hook module. Import shared types using `import type`.

Keep app-specific code in that app's `src/lib` or `src/hooks`, UI components and
UI-specific hooks in `@repo/ui`, and database access in `@repo/db`.

The examples are intentionally small: the existing `calculateTotal` helper is
shared by all four apps' example tests, and `useToggle` demonstrates a reusable hook.

From the repository root:

```sh
pnpm test --filter=@repo/shared
pnpm test:watch --filter=@repo/shared
pnpm test:projects
pnpm report
```

The default shared-package test environment is Node. Hook tests opt into jsdom
with `@vitest-environment jsdom` and clean up after each test. The package also
participates in the root test watcher, linting, type checks, and merged coverage.
