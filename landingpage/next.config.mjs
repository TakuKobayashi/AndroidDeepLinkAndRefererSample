/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['play.google.com'],
    unoptimized: true,
  },
};

export default nextConfig;
