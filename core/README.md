# Core App

Next.js is used with static site generation and Flux design will be followed with Redux.

## Usage

- Api types can be automatically generated from swagger with `npm run utility:api-codegen` command.
- Favicon can be generated with `npm run utility:icon-generator` command.
- `APP_TYPE=extension` environment variable can be used to detect build type. `npm run extension:...` commands are using this variable.
- `BUILD_MODE=development` environment variable can be used to generate source map for build. `npm run extension:dev` command is using this variable to set build mode.

## Structure

Created by `npx create-next-app@latest` command. Typescript, EsLint, Tailwind CSS, src/ directory, App Router added by this command.

RTK Query will be used to interact with api, and its codegen package will be used to write api calls automatically from swagger.

### Folder Structure

- public: static files to be served directly.
- src: source files for both client and server side. More info: [`Next.js folder structure`][Next.js Folder].
  - app: app related files, layouts, pages etc.
  - assets: Images, fonts, etc.
  - components: components to use in client side. Module css files, React components, etc.
  - data: static data files to be used in general. ts, JSON, CSV etc.
  - lib: Non-component functions to use. Utility functions, models, redux store, etc.

## ToDos

**Clean Up:**

- [ ] Remove unused examples.
  - [ ] Remove tmp folder from `./src/lib/redux/features/` and cleanup related redux store code.
  - [ ] Remove coinGeckoApi codegen scripts from `utility-scripts/src/api-codegen/apicodegen.ts` and related swaggers.

<!-- Links Used through document -->

[Next.js Folder]: https://nextjs.org/docs/getting-started/project-structure
