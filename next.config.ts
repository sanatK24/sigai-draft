import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
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
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  experimental: {
    // appDir is now stable in Next.js 13+
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        use: [LOADER],
      });
    }
    return config;
  },
};

export default nextConfig;
