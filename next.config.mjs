/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
