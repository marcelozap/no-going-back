'use client';

import './globals.css';
import { Music2 } from 'lucide-react';

export const metadata = {
  title: 'GateKPT',
  description: 'Your AI mastering companion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Softened pulsing background */}
        <div className="absolute inset-0 bg-black animate-pulse-slow opacity-50"></div>

        {/* Music notes overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <Music2 key={i} className="w-6 h-6 text-white animate-fade" />
          ))}
        </div>

        {/* Main content container */}
        <main className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}