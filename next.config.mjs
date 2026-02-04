/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出，用于 GitHub Pages 部署
  output: 'export',
  
  // 严格模式
  reactStrictMode: true,
  
  // 图片优化
  images: {
    unoptimized: true,
  },
  
  // 安全头部
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // CSP: 允许自建 Umami 统计
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://stats.nkkk.de",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://stats.nkkk.de",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // 重定向配置（当前无需重定向）
  async redirects() {
    return [];
  },
};

export default nextConfig;
