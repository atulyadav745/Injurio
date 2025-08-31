/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // When using Ant Design with Next.js, we need to tell Next.js to
  // transpile these packages. This is because they ship modern ESM code
  // that needs to be compiled for the server-side environment.
  transpilePackages: [
    'antd',
    'rc-util',
    'rc-pagination',
    'rc-picker',
  ],
};

export default nextConfig;