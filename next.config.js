// @ts-check
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  outputFileTracingRoot: resolve(__dirname, '../../'),
  experimental: {
    // appDir is now stable in Next.js 13+
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        use: [resolve(__dirname, 'src/visual-edits/component-tagger-loader.js')],
      });
    }
    return config;
  },
};

export default nextConfig;
