# JavaScript Application Template

Example project for developing different types of applications by mainly using JavaScript. It can be used to develop website, desktop app, mobile app, browser extension. It also includes best practises, frameworks and tools for development.

## Usage

Run `npm install` from root directory. This will install all dependencies for all workspaces.
Run all these commands from root directory.

### Core Development

Core application is a static website.

- `npm run dev` - Start website in development mode.
- `npm run build` - Build for production.
- `npm run utility:api-codegen` - Update api types from swagger.
- `npm run utility:icon-generator` - Update all icons and logos.
- `npm run prettier` - Run prettier for all files.

### Desktop Development

- Run `npm run desktop:dev` in root.
  - If electron script updated, close the app and run "npm run preview" in desktop folder.
- Run `npm run desktop:build` to build the desktop app

### Extension Development

- `npm run extension:dev` - Development mode for extension. Load output directory as unpacked extension in chrome (enable developer mode in extensions).
  - For UI changes, no need to refresh extension, just build ui again and reopen popup
  - For extension changes, it will automatically build again, just reload extension. For content script changes, you need to reload test page too.
- `npm run extension:build` - Build extension for production. It will minify code and disable source map.
- `npm run extension:test` - Test extension against a website. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. 3000 is reserved for core development.

## Structure

Git lfs can be used for storing binary files by initializing it and uncommenting `.gitattributes`. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

### Folder Structure

- core: Next.js app for UI and static website.
- extenion: browser extension specific files e.g. worker scripts and manifest.json.
- extension-test: Next.js app to test extension related features.
- utility-scripts: Utility scripts to be used manually.
- packages: Include all seperate packages.
  - shared-lib: Shared library for all packages.

### Naming Convention

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Tag Convention

Todos and Warnings will be specified respectively inside code with `<ToDo>`, `<Warning>` tags and inside README.md files of each package with `ToDos`, `Warnings` sections.
