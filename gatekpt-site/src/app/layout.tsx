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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GateKPT Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GateKPT",
    description: "AI mastering and mix companion from the void.",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // generate 80 stars with random positions & delays
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    key: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${(Math.random() * 3).toFixed(2)}s`,
  }));

  return (
    <html lang="en" className="h-screen bg-black text-white">
      <body className={`${cinzel.variable} antialiased h-full w-full overflow-hidden relative`}>
        {/* Pulsing star field */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map(({ key, top, left, delay }) => (
            <div
              key={key}
              className="star"
              style={{ top, left, animationDelay: delay }}
            />
          ))}
        </div>

        {/* Couture dust (optional) */}
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

        {/* Main content */}
        <main className="relative z-10 flex flex-col items-center min-h-screen w-full px-8 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
