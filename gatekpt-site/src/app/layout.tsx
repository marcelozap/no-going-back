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
        url: "/og-image.png", // Update with real OG image
        width: 1200,
        height: 630,
        alt: "GateKPT Logo and Space Background",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GateKPT",
    description: "AI mastering and mix companion from the void.",
    images: ["/og-image.png"],
    creator: "@yourhandle", // Optional: update with your X handle
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white scroll-smooth">
      <body className={`${cinzel.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
