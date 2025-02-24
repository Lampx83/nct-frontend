// next.config.mjs
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "http://101.96.66.218:8020/:path*", // Backend strapi
      },
      {
        source: "/oj/:path*",
        destination: "http://203.113.132.48:8016/:path*", // OJ
      },
      {
        source: "/codelab/:path*",
        destination: "http://101.96.66.217:8015/:path*", // Codelab backend (Java SpingBoot)
      },
      {
        source: "/search_api/:path*",
        destination: "http://101.96.66.219:8003/:path*", // MeiliSearch
      },
      {
        source: "/scoreup/:path*",
        destination: "https://scoreup-frontend.vercel.app/:path*", // ScoreUp
      },
      {
        source: "/neu-oj/:path*",
        destination: "https://neu-oj-frontend.vercel.app/neu-oj/:path*", // Neu-OJ
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
