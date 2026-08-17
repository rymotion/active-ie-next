import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      // Instagram media CDNs (hostnames vary by region/shard).
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  // The ADDC page was rebranded to Ritual — keep old links working.
  async redirects() {
    return [
      { source: "/addc", destination: "/ritual", permanent: true },
      { source: "/:locale(es|tl|zh)/addc", destination: "/:locale/ritual", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
