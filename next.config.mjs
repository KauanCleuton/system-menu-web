/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: '192.168.0.114' },
            { protocol: 'http', hostname: 'localhost', port: '3333' },
            { protocol: 'https', hostname: 'vishidelivery-backend.onrender.com' },
            { protocol: 'https', hostname: 'api.vishidelivery.store' },
        ],
    },
};

export default nextConfig;
