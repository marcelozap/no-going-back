// src/app/layout.tsx
import './globals.css';
import BackgroundOverlay from './components/BackgroundOverlay';

export const metadata = {
  title: 'GateKPT',
  description: 'Your AI mastering companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-black overflow-hidden flex items-center justify-center relative">
        {/* Background overlay is purely client-rendered */}
        <BackgroundOverlay />

        {/* Content area */}
        <main className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
