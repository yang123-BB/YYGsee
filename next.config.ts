import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isNetlify = !!process.env.NETLIFY;
const isVercel  = !!process.env.VERCEL;

// basePath: '/YYGsee' for GitHub Pages sub-path deployment
const basePath = '/YYGsee';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
