import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname), // или path.join(__dirname, '..') если конфиг в подпапке
  },
};

export default nextConfig;
