/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // لصور جوجل
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' }, // لصور جيتهاب
    ],
  },
};
export default nextConfig;