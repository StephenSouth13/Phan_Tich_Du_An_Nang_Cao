import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 1. Chỉnh sửa Meta Data hiển thị trên Tab Trình duyệt & SEO
export const metadata: Metadata = {
  title: "Green Agri-Tech Intelligence System",
  description: "Hệ thống phân tích tài chính đầu tư vật tư nông nghiệp công nghệ cao v3.0 - UEH Research Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Thêm dark class và cấu hình chiều cao full màn hình
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      {/* 🔥 2. Ép background mặc định toàn trang sang màu slate-950 (Dark Mode) */}
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}