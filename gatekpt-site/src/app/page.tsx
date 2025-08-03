'use client';

import { useState, useMemo } from 'react';
import Chat from './components/chat';
import Link from 'next/link';

export default function Home() {
  const [result, setResult] = useState('Upload a file to transcribe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.audioFile as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setResult('Transcribing...');

    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data.transcription || data.error || 'Something went wrong');
    } catch {
      setResult('Failed to transcribe.');
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 🌍 Earth Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/spinning-earth.mp4"
      />

      {/* 🌌 Content Over Video */}
      <div className="z-10 relative flex flex-col items-center mb-12">
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-widest text-center font-[Cinzel] animate-pulse drop-shadow-2xl">
          GATEKPT
        </h1>
        <p className="text-md text-gray-400 text-center max-w-2xl mt-4">
          Born from darkness, forged in sound — your AI mastering assistant in the void.
        </p>
      </div>

      {/* 🤖 Chat Assistant */}
      <div className="my-10 w-full flex justify-center z-10 px-4">
        <Chat />
      </div>

      {/* ⬇️ Downloads */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
        <Link href="/downloads/mac">
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
            Download for Logic (Mac)
          </button>
        </Link>
        <Link href="/downloads/windows">
          <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition">
            Windows Version (Coming Soon)
          </button>
        </Link>
      </div>

      {/* 🔊 Audio Upload Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md z-10">
        <input
          type="file"
          name="audioFile"
          accept="audio/*"
          required
          className="text-white file:bg-white file:text-black file:px-4 file:py-2 file:rounded file:cursor-pointer"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          {loading ? 'Transcribing...' : 'Transcribe Audio'}
        </button>
        <pre className="text-gray-400 text-sm text-left w-full whitespace-pre-wrap">{result}</pre>
      </form>

      {/* 🧾 Footer */}
      <footer className="mt-20 text-gray-500 text-sm text-center z-10">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
