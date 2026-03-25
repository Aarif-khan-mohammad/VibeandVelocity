/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/VibeandVelocity" : "",
  assetPrefix: isProd ? "/VibeandVelocity/" : "",
  images: { unoptimized: true },
};

module.exports = nextConfig;
