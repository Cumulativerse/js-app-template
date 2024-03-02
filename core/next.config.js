/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: ['shared-lib'], // Import packages from workspace
  productionBrowserSourceMaps: process.env.BUILD_MODE === 'development',
};

module.exports = nextConfig;
