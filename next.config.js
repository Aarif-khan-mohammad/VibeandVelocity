/** @type {import('next').NextConfig} */
// VERCEL_URL is set automatically by Vercel; GITHUB_ACTIONS is set by GitHub Actions
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  ...(isGitHubPages && { output: "export" }),
  trailingSlash: true,
  basePath: isGitHubPages ? "/VibeandVelocity" : "",
  assetPrefix: isGitHubPages ? "/VibeandVelocity/" : "",
  images: { unoptimized: true },
};

module.exports = nextConfig;
