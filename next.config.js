
/** @type {import('next').NextConfig} */
const nextConfig = {
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
    domains: [
      'framerusercontent.com',
      'img.youtube.com',
      'slelguoygbfzlpylpxfs.supabase.co',
      'slelguoygbfzlpylpxfs.supabase.in',
      'slelguoygbfzlpylpxfs.supabase.co.in',
      'images.unsplash.com'
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
