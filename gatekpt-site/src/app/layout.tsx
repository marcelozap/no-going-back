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
      <body className={`${cinzel.variable} antialiased overflow-x-hidden relative min-h-screen`}>
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-3 py-2 bg-white text-black rounded"
        >
          Skip to main content
        </a>

        {/* Couture “dust” layer */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
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

        {/* Main content area */}
        <main
          id="main-content"
          role="main"
          className="relative z-10 min-h-screen"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
