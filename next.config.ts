import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const buildWithDocker = process.env.DOCKER === 'true';

const isStandaloneMode = buildWithDocker

const standaloneConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: { '*': ['public/**/*', '.next/static/**/*'] },
};

const nextConfig: NextConfig = {
  /* config options here */
  ...(isStandaloneMode ? standaloneConfig : {}),
  compiler: {
    emotion: true,
  },
  compress: isProd,
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true, // Ensure URLs end with trailing slash
  images: {
    unoptimized: true, // Since we're using output: 'export'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.yanqueai.com',
      },
    ],
  }
};

export default nextConfig;