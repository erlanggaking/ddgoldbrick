/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'www.lego.com' },
      { protocol: 'https', hostname: 'lego.com' },
      { protocol: 'https', hostname: 'images.lexinter.net' },
      { protocol: 'https', hostname: 'images.brickset.com' },
      { protocol: 'https', hostname: 'cdn.brickset.com' },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
