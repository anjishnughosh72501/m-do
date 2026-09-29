import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mūdo (ムード) — Your music says more than you think.",
  description:
    "An interactive Spotify music-analysis experience. Discover your original musical archetype, genre diversity, and exploration habits with mūdo.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark bg-[#080808]">
      <head>
        <meta name="robots" content="noindex,nofollow,noarchive" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Shippori+Mincho:wght@400;500;600;700;800&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-white min-h-[100dvh] font-sans antialiased selection:bg-rose-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
