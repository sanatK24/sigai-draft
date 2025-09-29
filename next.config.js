// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    // appDir is now stable in Next.js 13+
  },
};

module.exports = nextConfig;
