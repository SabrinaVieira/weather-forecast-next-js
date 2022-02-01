/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig, 
    env: {
    customKey: process.env.API_KEY,
  },
}
