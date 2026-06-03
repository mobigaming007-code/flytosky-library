import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Thư viện số Fly To Sky",
    template: "%s | Thư viện số Fly To Sky",
  },
  description:
    "Không gian học liệu mở của Hệ thống từ thiện Fly To Sky: xem video, nghe audio và đọc PDF miễn phí.",
  keywords: [
    "Fly To Sky",
    "thư viện số",
    "học liệu mở",
    "thiện nguyện",
    "video",
    "audio",
    "pdf",
    "giáo dục cộng đồng",
  ],
  authors: [{ name: "Hệ thống từ thiện Fly To Sky" }],
  creator: "Hệ thống từ thiện Fly To Sky",
  publisher: "Hệ thống từ thiện Fly To Sky",
  openGraph: {
    title: "Thư viện số Fly To Sky",
    description:
      "Không gian học liệu mở: xem video, nghe audio và đọc PDF miễn phí.",
    url: "https://flytosky-library.vercel.app",
    siteName: "Thư viện số Fly To Sky",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thư viện số Fly To Sky",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
