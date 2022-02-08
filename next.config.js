/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  // somentee para o cliente
    env: {
      API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['openweathermap.org'],
  }
}
