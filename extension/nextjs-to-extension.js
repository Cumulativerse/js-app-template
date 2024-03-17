import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

/**
 * @param {string} outDirectory - The nextjs out directory to rebuild.
 */
export async function BundleExtensionUi(outDirectory) {
  // --Rename _next directory to next--
  const directoryToRename = path.join(outDirectory, '/_next');
  const newDirectoryName = path.join(outDirectory, '/next');
  let waiting = true;
  while (waiting) {
    try {
      await fs.rename(directoryToRename, newDirectoryName);
      waiting = false;
    } catch (err) {
      console.log('Waiting directory to be available...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  console.log(
    `bundle-extension-ui: ${directoryToRename} renamed to ${newDirectoryName}`,
  );

  // --Update files--
  const files = await fs.readdir(outDirectory, {
    withFileTypes: true,
    recursive: true,
  });
  for (const file of files) {
    if (file.isFile()) {
      // Process all text files
      const filePath = path.join(file.path, file.name);
      const data = await fs.readFile(filePath, 'utf8');
      // Replace all occurrences of /_next with /next
      let updatedData = data.replaceAll('/_next', '/next');
      data !== updatedData &&
        console.log(`bundle-extension-ui: Updated _next: ${filePath}`);
      // Externalize inline scripts
      updatedData = externalizeInlineScripts(outDirectory, file, updatedData);
      // Update file if necessary
      if (data !== updatedData) {
        await fs.writeFile(filePath, updatedData, 'utf8');
      }
    }
  }
}

/**
 * @param {string} directory - The directory.
 * @param {fs.Dirent} file - The file.
 * @param {string} data - The data.
 */
function externalizeInlineScripts(directory, file, data) {
  // Process HTML files
  if (path.extname(file.name) !== '.html') {
    return data;
  }
  return data.replaceAll(
    /(<script>[\s\S]*?<\/script>\s*)+/g,
    function (_match) {
      const externalData = _match
        .replaceAll('<script>', '')
        .replaceAll('</script>', '\n');
      const nameHash = crypto
        .createHash('sha256')
        .update(externalData)
        .digest('hex')
        .substring(0, 10);
      const externalPath = path.join(
        file.path,
        `${path.parse(file.name).name}-${nameHash}.js`,
      );
      fs.writeFile(externalPath, externalData, 'utf8');
      console.log('bundle-extension-ui: Created script ', externalPath);
      return `<script src="/${path.relative(directory, externalPath)}" crossorigin="" async=""></script>`;
    },
  );
}
