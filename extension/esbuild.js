import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import * as fs from 'fs';
import { manifest } from './manifest.js';

const isDev = process.argv.length > 2 && process.argv[2] == '--development';
console.log('isDev: ', isDev);
const outDir = '../core/out';

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
