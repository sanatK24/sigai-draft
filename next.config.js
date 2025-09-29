// @ts-check
const nextConfig = require('./next.config.ts');

// Export the config as a plain object
module.exports = {
  ...nextConfig.default,
  output: 'standalone',
  // Add any Vercel-specific overrides here if needed
};
