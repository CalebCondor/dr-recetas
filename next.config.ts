import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "placehold.co", "i.pravatar.cc"],
  },
  allowedDevOrigins: ["http://192.168.100.221:3000"],
};

export default nextConfig;
