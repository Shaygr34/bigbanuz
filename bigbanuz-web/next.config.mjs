import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      { source: '/:locale/events', destination: '/:locale/work?tag=events', permanent: true },
      { source: '/:locale/surf', destination: '/:locale/work?tag=ocean', permanent: true },
      { source: '/:locale/stories', destination: '/:locale/', permanent: true },
      { source: '/:locale/stories/:slug', destination: '/:locale/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
