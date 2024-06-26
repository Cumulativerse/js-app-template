import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs-extra';
import { BundleExtensionUi } from './nextjs-to-extension.js';
import { manifest } from './manifest.js';

const isDev = process.argv.length > 2 && process.argv[2] == '--development';
console.log('Extenion isDev: ', isDev);
const outDir = './out';
const coreOutDir = '../core/out';

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ['./src/content.ts', './src/background.ts'],
  format: 'esm',
  bundle: true,
  minify: !isDev,
  sourcemap: isDev && 'inline',
  outdir: outDir,
  plugins: [
    copy({
      assets: {
        from: ['./public/**/*'],
        to: ['./'],
      },
    }),
  ],
};

await fs.remove(outDir);
await fs.copy(coreOutDir, outDir);
await BundleExtensionUi(outDir);
if (isDev) {
  let ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('watching...');
} else {
  await esbuild.build(options);
}

/** Manifest.json */
fs.mkdirSync(outDir, { recursive: true });
fs.writeFile(
  outDir + '/manifest.json',
  JSON.stringify(manifest, null, 2),
  (err) => {
    if (err) {
      console.error('Error writing manifest.json', err);
    } else {
      console.log('manifest.json written successfully');
    }
  },
);
