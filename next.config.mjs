/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    experimental: {
        optimizeCss: false, // 👈 disables lightningcss, fixes Vercel build

    },

};
export default nextConfig;
