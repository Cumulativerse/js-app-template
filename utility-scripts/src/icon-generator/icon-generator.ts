import { writeFile, readFile, copyFile } from 'fs/promises';
import toIco from 'to-ico';
import { createCanvas, loadImage } from 'canvas';

const sourceIconDir = './src/icon-generator';
const uiPubDir = '../core/public';
const uiAppDir = '../core/src/app';
const extensionIconDir = '../extension/public/assets';
const testPubDir = '../extension-test/public';
const testAppDir = '../extension-test/src/app';

const faviconSize = 32;
const iconSizes = [16, 48, 128];
const iconType = 'image/png' as const;

async function IconGenerator() {
  const sourceData = await readFile(sourceIconDir + '/icon.png');
  let generatedJobs: Promise<void>[] = [];
  // Generate icons
  for (const size of iconSizes) {
    generatedJobs.push(
      resizeImageToFile(
        sourceData,
        `${extensionIconDir}/icon-${size}.png`,
        size,
        size,
      ),
    );
  }
  // Generate Favicons
  generatedJobs.push(
    generateIcoToFile(sourceData, `${uiAppDir}/favicon.ico`, faviconSize),
    generateIcoToFile(sourceData, `${testAppDir}/favicon.ico`, faviconSize),
  );
  // Move logo SVG to public directories
  generatedJobs.push(
    copyFile(sourceIconDir + '/logo.svg', `${uiPubDir}/logo.svg`),
    copyFile(sourceIconDir + '/logo.svg', `${testPubDir}/logo.svg`),
  );
  await Promise.all(generatedJobs);
  console.log(`icon-generator: Icons generated.`);
}

async function resizeImageToFile(
  sourceData: Buffer,
  destination: string,
  targetWidth: number,
  targetHeight: number,
) {
  const canvas = createCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d');

  const sourceImage = await loadImage(sourceData);
  // params: image, position.x, position.y, size.width, size.height
  ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
  const resizedData = canvas.toBuffer(iconType);

  // Save resized image to a file
  await writeFile(destination, resizedData);
}

async function generateIcoToFile(
  sourceData: Buffer,
  destination: string,
  faviconSize: number,
) {
  const icoData = await toIco(sourceData, {
    resize: true,
    sizes: [faviconSize],
  });

  // Save favicon to a file
  await writeFile(destination, icoData);
}

// Self-invocation async function
(async () => {
  await IconGenerator();
})().catch((err) => {
  console.error(err);
  throw err;
});
