'use client';

import { useState } from 'react';
import Chat from './components/chat';
import Link from 'next/link';

export default function Home() {
  const [result, setResult] = useState('Upload a file to transcribe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = (e.currentTarget.audioFile as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setResult('Transcribing…');

    try {
      const res = await fetch('/api/transcribe', { method: 'POST', body: formData });
      const data = await res.json();
      setResult(data.transcription || data.error || 'Something went wrong.');
    } catch {
      setResult('Failed to transcribe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only px-4 py-2 bg-white text-black fixed top-4 left-4 z-50"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black overflow-hidden px-8 py-16"
      >
        {/* Couture dust particles */}
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

        {/* Hero */}
        <h1 className="relative z-10 mb-4 text-[5rem] md:text-[6rem] font-[Cinzel] font-extrabold uppercase tracking-widest text-center text-white
                       after:absolute after:inset-0 after:bg-gradient-to-r after:from-white after:via-[#D4AF37] after:to-white
                       after:bg-clip-text after:text-transparent animate-glow-couture">
          GATEKPT
        </h1>
        <p className="relative z-10 mb-12 max-w-xl text-center text-gray-300 font-light animate-fade-in-up">
          Born from darkness, forged in sound — your AI mastering companion in couture-cosmic style.
        </p>

        {/* Download CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-8 mb-16 animate-fade-in-up">
          <Link href="/downloads/mac">
            <button
              className="relative px-8 py-3 rounded-full bg-white text-black font-semibold uppercase tracking-wide
                         shadow-[0_0_15px_rgba(212,175,55,0.7)] hover:shadow-[0_0_30px_rgba(212,175,55,1)] transition duration-300"
            >
              Download for Logic (Mac)
            </button>
          </Link>
          <Link href="/downloads/windows">
            <button
              className="relative px-8 py-3 rounded-full border border-white text-white font-semibold uppercase tracking-wide
                         hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,1)] transition duration-300"
            >
              Windows Version (Soon)
            </button>
          </Link>
        </div>

        {/* Chat Panel */}
        <section
          aria-label="Chat with GateKPT"
          className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/20
                     rounded-2xl p-6 shadow-2xl mb-12 animate-fade-in-up"
        >
          <Chat />
        </section>

        {/* Upload Form */}
        <form
          id="transcribe-form"
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col items-center gap-4 w-full max-w-md
                     bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl animate-fade-in-up"
        >
          <label
            htmlFor="audioFile"
            className="sr-only"
          >
            Upload audio file
          </label>
          <input
            id="audioFile"
            type="file"
            name="audioFile"
            accept="audio/*"
            required
            className="w-full bg-black/30 text-white file:bg-white file:text-black file:px-4 file:py-2
                       file:rounded-lg file:cursor-pointer border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold uppercase tracking-wide
                       hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            {loading ? 'Transcribing…' : 'Transcribe Audio'}
          </button>
          <pre className="w-full text-left text-gray-300 text-sm whitespace-pre-wrap mt-2 select-text">
            {result}
          </pre>
        </form>

        {/* Footer */}
        <footer className="relative z-10 mt-20 text-center text-gray-500 text-sm animate-fade-in-up">
          © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
        </footer>
      </main>
    </>
  );
}
