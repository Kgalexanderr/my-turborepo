# ongrapes

Turborepo with two Next.js apps, Tailwind CSS v4, and a shared shadcn/ui package.
Use Node.js 26.13.0 or newer and pnpm 12.16.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open docs at http://localhost:3000 and web at http://localhost:3001.
Run `pnpm build`, `pnpm lint`, and `pnpm check-types` from the repository root.

## Shared UI and styles

`@repo/ui` exports TypeScript components and CSS directly from `packages/ui/src`.
Both Next.js apps transpile this package. There is no UI build or CSS watcher to
start, and no `dist` directory to rebuild after editing a component.

Each app imports only `./globals.css` in its root layout. That stylesheet imports
`@repo/ui/styles.css` and registers its app directory using `@source "../"`.
The shared stylesheet registers the UI source directory and defines the shadcn
light/dark theme. `@repo/tailwind-config` supplies Tailwind and the shared PostCSS
configuration. Each app compiles one stylesheet containing the utilities used by
both the app and the UI package.

Keep the global stylesheet import: Tailwind `className` utilities need generated
CSS loaded into the page. React's `style={{ ... }}` prop is different and does not
require Tailwind. Use complete literal class names so Tailwind can discover them.

## Adding shadcn components

Run the CLI from the web app so its monorepo aliases route shared UI components
to `packages/ui/src/components` and app-specific components to `apps/web/components`:

```sh
cd apps/web
pnpm dlx shadcn@latest add button
```

Import shared components through package exports:

```tsx
import { Button } from "@repo/ui/components/button";
```

Shared components use `cn` from `@repo/ui/lib/utils` to merge Tailwind class overrides.
New shared hooks belong in `packages/ui/src/hooks` and are exported as
`@repo/ui/hooks/*`. App-local imports use `@/*`, relative to `apps/web`.

## Checking style changes

With `pnpm dev` running, edit the shared Button and confirm web updates without a
separate UI build. Hover Publish to check the pointer cursor. The page wrapper
should remain centered with padding from its Tailwind utilities. Add utilities in
either the app or shared UI source and confirm they appear after hot reload.
