# Blank app template

This local template uses `src/app`, the shared Tailwind/shadcn stylesheet, and the
monorepo's Vitest setup. It lives outside the pnpm workspace and is ignored by Git.

To create an app, copy this folder to `apps/<app-name>`, change the package name
in `package.json`, choose an unused development port, and update the project name
in `vitest.config.ts`. Then run `pnpm install` from the repository root.

Keep `public`, configuration files, tests, and `.env.*` at the app root. Application
code goes into `src`; `@/*` resolves from there. `src/app/globals.css` registers `src`
with Tailwind v4. Both `@repo/ui` and `@repo/shared` are workspace dependencies that
Next.js transpiles from source.
