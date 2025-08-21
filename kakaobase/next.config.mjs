import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false,
});

export default withBundleAnalyzer(nextConfig);
