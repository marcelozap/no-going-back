// src/app/layout.tsx
import './globals.css';
import Head from 'next/head';
import { Music2 } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>GateKPT</title>
        <meta name="description" content="Your AI mastering companion" />
      </Head>
      <body>
        {/* Example icon placement – remove or move as you like */}
        <header style={{ padding: '1rem', textAlign: 'center' }}>
          <Music2 size={32} />
        </header>
        {children}
      </body>
    </html>
  );
}
