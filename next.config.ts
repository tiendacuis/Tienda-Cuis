import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Productos individuales de WordPress → nuevas URLs
      {
        source: "/index.php/product/chau-lata-matelase",
        destination: "/productos/chau-lata-matelase",
        permanent: true,
      },
      {
        source: "/index.php/product/chop-aluminio-forrado-algarrobo",
        destination: "/productos/chop-aluminio-forrado-algarrobo",
        permanent: true,
      },
      // Redireccion generica para cualquier otra URL de WordPress
      {
        source: "/index.php/product/:slug",
        destination: "/productos/:slug",
        permanent: true,
      },
      {
        source: "/product/:slug",
        destination: "/productos/:slug",
        permanent: true,
      },
      {
        source: "/index.php/shop",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/tienda",
        destination: "/catalogo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;