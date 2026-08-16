/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['motion'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
