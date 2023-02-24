/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.valist.io',
        port: '',
        pathname: '/ipfs/*'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/*/0.jpg'
      }
    ]
  },
  sassOptions: {}
}

module.exports = nextConfig
