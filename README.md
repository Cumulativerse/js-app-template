# Next.js Chrome Extension

Example project for a chrome extension development with Next.js.

## Usage

Run `npm install` from root directory. This will install all dependencies for all workspaces.
Run all these commands from root directory.

### Development

- Run `npm run build-extension:dev` to build for chrome extension. Output will be in `./out` directory. Load output directory as unpacked extension in chrome (enable developer mode in extensions).
- To test extension, run `npm run test`.
  - Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. 3000 is reserved for app-ui development.
- For UI changes, run `npm run build-extension:ui:dev` no need to refresh extension, just reopen popup
- For extension-specific changes, it will automatically build again, just reload extension. For content script changes, you need to reload page.

### Production

- Run `npm run build-extension` to build for production. It will minify code and disable source map. Output will be in `./out` directory.

### Utility Commands

- `npm run dev` - Start app-ui in development mode.
- `npm run build-extension:ui` - Build again for app-ui changes without rebuilding others.
- `npm run build-extension:specific` - Build again for extension-specific changes without rebuilding others.
- `npm run utility:api-codegen` - Update app-ui api types from swagger.
- `npm run utility:icon-generator` - Update app-ui and extension-specific icons.

## Structure

Git lfs is used for storing binary files. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

### Folder Structure

- packages: Include all seperate packages.
  - app-ui: Next.js app for UI.
  - extenion-specific: chrome extension specific files e.g. worker scripts and manifest.json.
  - extension-test-app: Next.js app to test extension related features.
  - shared-lib: Shared library for all packages.
  - utility-scripts: Utility scripts to be used manually.

### Naming Convention

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Tag Convention

Todos and Warnings will be specified respectively inside code with `<ToDo>`, `<Warning>` tags and inside README.md files of each package with `ToDos`, `Warnings` sections.
