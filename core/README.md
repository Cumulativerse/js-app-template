# Core App

Next.js is used with static site generation and Flux design will be followed with Redux.

## Usage

- `APP_TYPE=extension` environment variable can be used to detect build type. `npm run extension:...` commands are using this variable.
- `BUILD_MODE=development` environment variable can be used to generate source map for build. `npm run extension:dev` command is using this variable to set build mode.

## Structure

Created by `npx create-next-app@latest` command. Typescript, EsLint, Tailwind CSS, src/ directory, App Router added by this command. RTK Query will be used to interact with api.

### Folder Structure

- public: static files to be served directly.
- src: source files for both client and server side. More info: [`Next.js folder structure`][Next.js Folder].
  - app: app related files, layouts, pages etc.
  - assets: Images, fonts, etc.
  - components: components to use in client side. Module css files, React components, etc.
  - data: static data files to be used in general. ts, JSON, CSV etc.
  - lib: Non-component functions to use. Utility functions, models, redux store, etc.

## ToDos

- [ ] Add next-seo
- [ ] Add logging mechanism
- [ ] Add sentry: `./src/lib/redux/middleware/logger.ts` will logs redux actions to console. It can be used to log errors to sentry.

**Through Development:**

- [ ] Edit pages in `./src/app/sitemap.ts` to include all pages and maybe edit `./src/app/robots.ts`.

**Clean Up:**

- [ ] Remove unused examples.
  - [ ] Remove tmp folder from `./src/lib/redux/features/` and cleanup related redux store code.
  - [ ] Remove coinGeckoApi codegen scripts from `utility-scripts/src/api-codegen/apicodegen.ts` and related swaggers.

## Warnings

- DaisyUI theme is using "oklch" css function which is not supported by old browsers (e.g. chrome v111). It will fallback to light theme in these browsers. So check for light theme too.

<!-- Links Used through document -->

[Next.js Folder]: https://nextjs.org/docs/getting-started/project-structure
