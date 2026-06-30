import type { NextConfig } from "next";

const securityHeaders = [
  // ── SSL / HSTS ──
  // Forces browsers to use HTTPS for 2 years, including subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // ── Clickjacking Protection ──
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // ── MIME Sniffing Prevention ──
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // ── XSS Protection (legacy browsers) ──
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // ── DNS Prefetch ──
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // ── Referrer Policy ──
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ── Permissions Policy ──
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // ── Content Security Policy ──
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self'",
      "connect-src 'self' https://api.github.com https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Performance ──
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // ── Image Optimization ──
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Security & Caching Headers ──
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-term caching for static assets
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|otf|mp3|mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

