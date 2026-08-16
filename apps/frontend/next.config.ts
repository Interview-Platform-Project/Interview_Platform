import path from 'path';
import type { NextConfig } from 'next';

// Серверный origin Nest. Для браузера API = same-origin /api/* (см. rewrites).
const API_ORIGIN =
  process.env.API_ORIGIN ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..', '..'),
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
