/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Dòng này cực quan trọng để biến Next.js thành static site
  images: {
    unoptimized: true, // Cần thiết khi export static
  },
};

export default nextConfig;