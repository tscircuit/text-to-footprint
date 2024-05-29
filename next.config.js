const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

export default nextConfig
