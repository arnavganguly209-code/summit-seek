import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Next 16: allow /media/** including ?t= cache-buster query strings
    localPatterns: [
      {
        pathname: "/media/**",
      },
      {
        pathname: "/logo-summit-seek*.png",
      },
      {
        pathname: "/about-*.jpg",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
    proxyClientMaxBodySize: "200mb",
  },
};

export default nextConfig;
