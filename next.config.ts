import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Gambar dari Google
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Gambar dari GitHub
      },
      {
        protocol: "https",
        hostname: "drive.google.com", // Gambar dari Drive
      },
      {
        protocol: "https",
        hostname: "revyid.github.io",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {},
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
