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
  // generate 100 stars with random positions & animation delays
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    delay: (Math.random() * 3).toFixed(2) + 's',
  }));

  return (
    <html lang="en" className="h-full bg-black text-white">
      <body className={`${cinzel.variable} antialiased h-full overflow-hidden relative`}>
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map(({ id, top, left, delay }) => (
            <div
              key={id}
              className="star"
              style={{ top, left, animationDelay: delay }}
            />
          ))}
        </div>

        {/* Original dust-particles (optional—keep or remove) */}
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

        {/* Main content: centered over the star field */}
        <main
          id="main-content"
          role="main"
          className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
