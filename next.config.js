/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.adotravel.nl',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'admin.staging.adotravel.nl',
        pathname: '/**'
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Suppress specific warnings
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig 