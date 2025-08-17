/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cvjznfxoprylhspemurl.supabase.co',
        pathname: '/**',   // <--- less strict, works for all storage URLs
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;

