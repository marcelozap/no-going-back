// src/app/page.tsx
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
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-white text-black rounded"
      >
        Skip to main content
      </a>

      {/* Hero */}
      <h1
        className="mb-4 text-[5rem] md:text-[6rem] font-[Cinzel] font-extrabold uppercase tracking-widest
                   text-white animate-glow-couture"
      >
        GATEKPT
      </h1>

      {/* Chat directly under hero, full width */}
      <div className="w-full mb-12">
        <Chat />
      </div>

      {/* Tagline */}
      <p className="mb-12 max-w-xl text-center text-gray-300 font-light animate-fade-in-up">
        Born from darkness, forged in sound — your AI mastering companion in couture-cosmic style.
      </p>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-8 w-full justify-center mb-16">
        <Link href="/downloads/mac">
          <button className="px-8 py-3 rounded-full bg-white text-black font-semibold uppercase
                             shadow-[0_0_15px_rgba(212,175,55,0.7)] hover:shadow-[0_0_30px_rgba(212,175,55,1)] transition">
            Download for Logic (Mac)
          </button>
        </Link>
        <Link href="/downloads/windows">
          <button className="px-8 py-3 rounded-full border border-white text-white font-semibold uppercase
                             hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,1)] transition">
            Windows Version (Soon)
          </button>
        </Link>
      </div>

      {/* Upload Form */}
      <form
        id="transcribe-form"
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-md mb-12"
      >
        <label htmlFor="audioFile" className="sr-only">
          Upload audio file
        </label>
        <input
          id="audioFile"
          type="file"
          name="audioFile"
          accept="audio/*"
          required
          className="w-full bg-black/30 text-white file:bg-white file:text-black file:px-4 file:py-2
                     file:rounded-lg file:cursor-pointer border border-white/20 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-white/50 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold uppercase transition disabled:opacity-50"
        >
          {loading ? 'Transcribing…' : 'Transcribe Audio'}
        </button>
        <pre className="w-full text-left text-gray-300 text-sm whitespace-pre-wrap mt-2 select-text">
          {result}
        </pre>
      </form>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </>
  );
}
