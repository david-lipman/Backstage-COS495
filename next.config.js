/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ["src"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ["d17iuxf4c4gu6d.cloudfront.net", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
