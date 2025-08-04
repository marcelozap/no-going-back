// src/app/layout.tsx

import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GateKPT",
  description: "AI mastering and mix companion from the void.",
  metadataBase: new URL("https://gatekpt.ai"),
  openGraph: {
    title: "GateKPT",
    description: "AI mastering and mix companion from the void.",
    url: "https://gatekpt.ai",
    siteName: "GateKPT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GateKPT Logo on Cosmic Background",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GateKPT",
    description: "AI mastering and mix companion from the void.",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body
        className={`${cinzel.variable} antialiased overflow-x-hidden relative min-h-screen`}
      >
        {/* 1) Fixed background video, locked to viewport */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
        >
          <source src="/spinning-earth.mp4" type="video/mp4" />
        </video>

        {/* 2) Fixed dark overlay tint */}
        <div className="fixed inset-0 bg-black/60 -z-10 pointer-events-none" />

        {/* 3) Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-3 py-2 bg-white text-black rounded"
        >
          Skip to main content
        </a>

        {/* 4) Couture “dust” layer, also viewport-fixed */}
        <div className="fixed inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                gridColumnStart: ((i * 3) % 6) + 1,
                gridRowStart: ((i * 5) % 6) + 1,
                animationDelay: `${(i % 6) * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* 5) Main content wrapper sits above everything */}
        <main id="main-content" role="main" className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
