/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com","lh3.googleusercontent.com"]
    },
    reactStrictMode: true, 
    eslint: { 
      ignoreDuringBuilds: true, 
    }, 
}


module.exports = nextConfig
