/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  images: {
    domains: ["localhost"], // Agrega "localhost" o cualquier otro dominio que uses
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
