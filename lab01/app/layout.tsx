import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advanced Data Analytics & EDA Intelligence System v3.0",
  description: "Hệ thống tích hợp Khoa học dữ liệu, Thống kê mô tả và Trực quan hóa EDA - UEH Lab Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  );
}