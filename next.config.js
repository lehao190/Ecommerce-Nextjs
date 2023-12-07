/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/adrianhajdin/ecommerce/main/public/admin%20ui/products/**',
      },
    ]
  }
}

module.exports = nextConfig
