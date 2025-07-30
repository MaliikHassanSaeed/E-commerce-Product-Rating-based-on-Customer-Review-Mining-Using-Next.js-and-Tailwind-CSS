/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { PROJECT_ID: "j67mtnyv", DATASET: "production" },
  images: {
    domains: ["cdn.sanity.io", "www.pexels.com", "img.clerk.com"],
  },
};

module.exports = nextConfig;