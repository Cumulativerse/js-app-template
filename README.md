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
- `npm run lint` - Run lint for all files.
- `npm run prettier` - Run prettier for all files.

### Desktop Development

- Run `npm run dev:desktop` in root.
  - If electron script updated, close the app and run "npm run preview" in desktop folder.
- Run `npm run build:desktop` to build the desktop app

### Extension Development

- `npm run dev:extension` - Development mode for extension. Load `./extension/out` directory as unpacked extension in chrome (enable developer mode in extensions).
  - For UI changes, no need to refresh extension, just build ui again and reopen popup
  - For extension changes, it will automatically build again, just reload extension. For content script changes, you need to reload test page too.
  - This will also start extension-test server. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. 3000 is reserved for core development.
- `npm run build:extension` - Build extension for production. It will minify code and disable source map.

### Mobile Development

For the first time:

- `npm run build` - Build core app.
- `npm run mobile:sync` - Sync core app with mobile.
- `npm run mobile:open:android` and after gradle build, click "Sync project with gradle files" button.

Then, you can use dev or build commands:

- `npm run dev:mobile`

You may need to update webview version of emulator (e.g. updating chrome)

## Structure

Git lfs can be used for storing binary files by initializing it and uncommenting `.gitattributes`. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

### Folder Structure

- core: Next.js app for UI and static website.
- desktop: Electron app for desktop.
- extension: browser extension specific files e.g. worker scripts and manifest.json.
- extension-test: Next.js app to test extension related features.
- mobile: Capacitor app for IOS and Android.
- utility-scripts: Utility scripts to be used manually.
- packages: Include all seperate packages.
  - shared-lib: Shared library for all packages.

### Naming Convention

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Tag Convention

Todos and Warnings will be specified respectively inside code with `<ToDo>`, `<Warning>` tags and inside README.md files of each package with `ToDos`, `Warnings` sections.

## ToDos

- [ ] Add Web workers to PWA: [Capacitor Web Workers](https://capacitorjs.com/docs/web/progressive-web-apps).
- [ ] Change extension from chrome extension to general extension.
- [ ] Add ios for mobile app.
- [ ] Update Desktop icons and builder configs.

We have used Next.js for core part because of its performance, but more customizable tools like Vite can make easier and better for some situations to integrate with other platforms like desktop, mobile, extension. Known problems for Next.js:

- [x] Next.js is using absolute urls, which is not good for desktop. It should be relative or configurable. For desktop, we are setting up a local server to serve assets.
- [x] Next.js is using some inline scripts, which is not good for CSP and forbidden in extension. Using a postscript to remove them.
- [x] Next.js is using "\_next" folder but underscore is forbidden in extension. Using a postscript to rename it.
