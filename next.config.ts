import type { NextConfig } from "next";

const basePath = process.env.CUSTOM_DOMAIN ? "" : "/askducky";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
