/** @type {import('next').NextConfig} */
const nextConfig = {
  // imagesプロパティを追加して、外部ドメインの画像を許可する設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // TMDbの画像ドメイン
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'http',
        hostname: 'openweathermap.org', // OpenWeatherMapの画像ドメイン
        port: '',
        pathname: '/img/wn/**',
      },
    ],
  },
};

export default nextConfig;
