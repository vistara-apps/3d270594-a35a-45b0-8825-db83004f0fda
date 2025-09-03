/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.openai.com', 'oaidalleapiprodscus.blob.core.windows.net'],
  },
};

export default nextConfig;
