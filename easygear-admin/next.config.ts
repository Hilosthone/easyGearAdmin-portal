import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 1. Add this to allow large image payloads (Base64)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ]
  },
}

export default nextConfig