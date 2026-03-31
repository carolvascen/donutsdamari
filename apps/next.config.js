/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    turbo: {
      enabled: false
    }
  }
}
module.exports = nextConfig
