import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/customAnimations',
  assetPrefix: '/customAnimations/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
