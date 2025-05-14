const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['absheerchecktasreeh.com'], // Rasm uchun domenni qo'shish
  },
};
 
module.exports = withNextIntl(nextConfig);