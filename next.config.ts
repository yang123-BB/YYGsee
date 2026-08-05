import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isNetlify = !!process.env.NETLIFY;
const isVercel  = !!process.env.VERCEL;

// basePath: empty for root-path deployment (yang123-bb.github.io)
// Set to '/RebarViz' only if deploying under a sub-path
const basePath = '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
