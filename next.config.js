/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    const basePath = process.env.NEXT_PUBLIC_CONSOLE_BASE_PATH || '';
    return [
      {
        source: `${basePath}/:path*`,
        destination: '/console/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_CONSOLE_BASE_PATH: process.env.NEXT_PUBLIC_CONSOLE_BASE_PATH,
  }
}

module.exports = nextConfig
