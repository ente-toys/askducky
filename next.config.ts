import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/askducky",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
