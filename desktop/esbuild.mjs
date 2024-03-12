import * as esbuild from 'esbuild';
import { spawn } from 'child_process';

const isDev = process.argv.length > 2 && process.argv[2] == '--development';
console.log('isDev: ', isDev);
const outDir = './dist-electron';

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ['./src/main.ts', './src/preload.ts'],
  format: 'cjs',
  minify: !isDev,
  sourcemap: isDev && 'inline',
  outdir: outDir,
};

if (isDev) {
  let ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('watching...');
  spawn('electron', ['./dist-electron/main.js'], {
    stdio: 'inherit',
    shell: true,
  });
} else {
  await esbuild.build(options);
}
