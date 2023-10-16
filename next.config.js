/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gw.alipayobjects.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
// https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png
