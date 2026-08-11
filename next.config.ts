import type { NextConfig } from "next";

/**
 * Content Security Policy (CSP) & Remote Image Patterns untuk Frontend Publik (frontend-6)
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://cdn.jsdelivr.net
    https://*.tawk.to
    https://embed.tawk.to
    https://*.google.com
    https://google.com
    https://*.go.id
    https://go.id
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://aruna-ai.muaraenimkab.go.id
    https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline'
    https://cdn.jsdelivr.net
    https://*.tawk.to
    https://*.google.com
    https://google.com
    https://fonts.googleapis.com;
  img-src 'self' data: blob:
    https://cdn.jsdelivr.net
    https://*.tawk.to
    https://tawk.link
    https://images.unsplash.com
    https://raw.githubusercontent.com
    https://instagram.com
    https://*.instagram.com
    https://cdninstagram.com
    https://*.cdninstagram.com
    https://fbcdn.net
    https://*.fbcdn.net
    https://*.google.com
    https://google.com
    https://*.google.co.id
    https://*.go.id
    https://go.id
    https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com
    https://api-minio.muaraenimkab.go.id
    https://www.google-analytics.com
    https://*.google-analytics.com
    https://*.ytimg.com
    https://maps.gstatic.com
    https://maps.googleapis.com;
  connect-src 'self'
    https://cdn.jsdelivr.net
    https://*.tawk.to
    wss://*.tawk.to
    https://air-quality-api.open-meteo.com
    https://*.open-meteo.com
    https://graph.instagram.com
    https://api.instagram.com
    https://instagram.com
    https://*.instagram.com
    https://*.google.com
    https://google.com
    https://*.go.id
    https://go.id
    https://desa-api.muaraenimkab.go.id
    https://aruna-ai.muaraenimkab.go.id
    https://www.google-analytics.com
    https://*.google-analytics.com
    https://*.analytics.google.com
    https://maps.googleapis.com;
  font-src 'self' data:
    https://cdn.jsdelivr.net
    https://*.tawk.to
    https://*.google.com
    https://fonts.gstatic.com;
  frame-src 'self'
    https://*.tawk.to
    https://*.google.com
    https://google.com
    https://*.google.co.id
    https://google.co.id
    https://forms.gle
    https://*.go.id
    https://go.id
    https://*.youtube.com
    https://*.youtube-nocookie.com
    https://*.facebook.com
    https://*.vimeo.com
    https://aruna-ai.muaraenimkab.go.id
    https://www.google.com/maps;
  media-src 'self' blob:
    https://instagram.com
    https://*.instagram.com
    https://cdninstagram.com
    https://*.cdninstagram.com
    https://fbcdn.net
    https://*.fbcdn.net
    https://*.google.com
    https://*.go.id
    https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com
    https://api-minio.muaraenimkab.go.id;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://*.google.com https://google.com https://*.go.id;
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  turbopack: {},
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-minio.muaraenimkab.go.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.instagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
