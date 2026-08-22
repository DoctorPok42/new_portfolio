/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crabs3.doctorpok.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'weather.doctorpok.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
