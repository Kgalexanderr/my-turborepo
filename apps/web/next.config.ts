import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@repo/ui"], // ensures UI package is compiled
};

export default nextConfig;
