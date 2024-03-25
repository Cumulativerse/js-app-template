const esbuild = require('esbuild');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const desktopDistDir = './dist-electron';
const distDir = path.join(__dirname, 'dist');
const coreDir = path.join(__dirname, '../core');
const coreDistDir = path.join(coreDir, 'out');
const isDev = process.argv.length > 2 && process.argv[2] == '--development';
console.log('Electron isDev: ', isDev);

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ['./src/main.ts', './src/preload.ts'],
  format: 'cjs',
  minify: !isDev,
  sourcemap: isDev && 'inline',
  outdir: desktopDistDir,
};

// Self-invocation async function
(async () => {
  if (isDev) {
    let ctx = await esbuild.context(options);
    await ctx.watch();
    console.log('Watching electron files...');
    spawn('npm', ['run preview'], {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    await fs.remove(distDir);
    await fs.copy(coreDistDir, distDir);
    await esbuild.build(options);
  }
})().catch((err) => {
  console.error(err);
  throw err;
});
