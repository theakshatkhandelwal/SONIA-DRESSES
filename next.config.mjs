/** @type {import('next').NextConfig} */
const nextConfig = {
  // Browsers request /favicon.ico by default; serve logo from public/ (must be committed).
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/sd.jpeg" }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
};

export default nextConfig;
