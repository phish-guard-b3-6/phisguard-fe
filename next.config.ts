import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/new-report",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
