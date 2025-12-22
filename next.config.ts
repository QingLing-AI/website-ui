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
    unoptimized: !isProd,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.qingling-ai.*',
      },
    ],
  }
};

export default nextConfig;
