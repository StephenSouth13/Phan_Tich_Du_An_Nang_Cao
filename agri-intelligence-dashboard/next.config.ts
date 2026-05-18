import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 🔥 THÊM DÒNG NÀY VÀO
  images: {
    unoptimized: true, // Thêm dòng này để không bị lỗi tối ưu ảnh trên Cloudflare
  }
};

export default nextConfig;