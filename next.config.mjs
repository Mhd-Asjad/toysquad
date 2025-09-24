/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: false, // 👈 disables lightningcss, fixes Vercel build
    },

};
export default nextConfig;
