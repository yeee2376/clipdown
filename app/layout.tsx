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

export const metadata: Metadata = {
  title: "TikTok Downloader - Download TikTok Videos Without Watermark Free",
  description: "Download TikTok videos without watermark for free. Fast, easy, and free TikTok video downloader. Save TikTok videos in HD MP4 or MP3 format instantly. No signup required.",
  keywords: "tiktok downloader, download tiktok videos, tiktok no watermark, tiktok to mp4, save tiktok video, tiktok video downloader free, tiktok mp3 downloader",
  openGraph: {
    title: "TikTok Downloader - Download TikTok Videos Without Watermark Free",
    description: "Download TikTok videos without watermark for free. Fast, easy, no signup required.",
    url: "https://tiktokdownloaderfree.vercel.app",
    siteName: "TikTok Downloader Free",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Downloader - Download TikTok Videos Without Watermark",
    description: "Download TikTok videos without watermark for free. Fast and easy.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tiktokdownloaderfree.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}