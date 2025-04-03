/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "indian-oil-admin.pages.dev",
            },
            {
                protocol: "https",
                hostname: "generated.vusercontent.net",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "www.rba.go.ke",
            },
            {
                protocol: "https",
                hostname: "muffingroup.com",
            },
        ],
    },
};

export default nextConfig;
