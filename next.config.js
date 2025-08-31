const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/icons-svg', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-table', 'rc-input', 'rc-tree'],
};

module.exports = nextConfig;
