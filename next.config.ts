import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  trailingSlash: true, // Ensure URLs end with trailing slash
  images: {
    unoptimized: true // Since we're using output: 'export'
  }
};

export default nextConfig;