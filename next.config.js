
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support API routes
  webpack: (config, { isServer }) => {
    // This fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        canvas: false,
      };
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.in',
      },
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.co.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ['@radix-ui', '@headlessui/react'],
};

export default nextConfig;
