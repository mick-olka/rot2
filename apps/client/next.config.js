const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/utils'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'rotang.ua',
      'rotang.biz',
      'rotang.com.ua',
      'localhost',
      '192.168.1.119',
      '213.217.8.92',
    ],
  },
  i18n: {
    locales: ['ua', 'de', 'en'],
    defaultLocale: 'ua',
    localeDetection: false,
  },
}

module.exports = nextConfig
