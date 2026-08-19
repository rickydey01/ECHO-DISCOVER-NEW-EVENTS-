const isProd = process.env.NODE_ENV === 'production';
const repoBasePath = '/ECHO-DISCOVER-NEW-EVENTS-';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? repoBasePath : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: isProd,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBasePath : '',
  },
};

export default nextConfig;
