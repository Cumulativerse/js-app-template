export const manifest = {
  name: 'Next.js Chrome Extension',
  description: 'Next.js Chrome Extension starter',
  version: process.env.npm_package_version,
  manifest_version: 3,
  icons: {
    16: 'assets/icon-16.png',
    48: 'assets/icon-48.png',
    128: 'assets/icon-128.png',
  },
  action: {
    default_popup: 'index.html',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['content.js'],
    },
  ],
  background: {
    service_worker: 'background.js',
  },
  permissions: ['storage'],
};
