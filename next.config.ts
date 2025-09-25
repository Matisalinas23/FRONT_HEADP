const nextConfig = {
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    }]
  }
};

module.exports = nextConfig;
