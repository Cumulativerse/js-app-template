const esbuild = require('esbuild');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const desktopDistDir = './dist-electron';
const coreDistDir = path.join(__dirname, 'dist');
const coreDir = path.join(__dirname, '../core');
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

async function runDev() {
  const nextjs = spawn('npm', ['run', 'dev'], {
    cwd: coreDir,
    stdio: 'pipe',
    shell: true,
  });

  let ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching electron files...');

  nextjs.stdout.on('data', (data) => {
    process.stdout.write(data);
    if (data.includes('Ready in')) {
      spawn('npm', ['run preview'], {
        stdio: 'inherit',
        shell: true,
      });
    }
  });
}

// Self-invocation async function
(async () => {
  if (isDev) {
    await runDev();
  } else {
    await fs.copy(path.join(coreDir, 'out'), coreDistDir);
    await esbuild.build(options);
  }
})().catch((err) => {
  console.error(err);
  throw err;
});
