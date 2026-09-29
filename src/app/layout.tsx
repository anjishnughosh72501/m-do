import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  variable: "--font-zen",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`dark bg-[#080808] ${shipporiMincho.variable} ${zenKaku.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </head>
      <body className="bg-[#080808] text-white min-h-[100dvh] font-sans antialiased selection:bg-rose-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
