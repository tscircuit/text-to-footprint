import bundleAnalyzer from "@next/bundle-analyzer"
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
