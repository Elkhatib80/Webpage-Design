import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // Generates a static `out/` folder — upload this to any web host
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export (no Next.js image server)
  },
};

export default nextConfig;
