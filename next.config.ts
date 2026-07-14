import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'api-minio.muaraenimkab.go.id', pathname: '/**' },
      { protocol: 'https', hostname: '*.cdninstagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.fbcdn.net', pathname: '/**' },
    ],
  },
};
export default nextConfig;
