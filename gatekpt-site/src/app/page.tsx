'use client';

import { useState, useMemo } from 'react';
import Chat from './components/chat';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [result, setResult] = useState('Upload a file to transcribe');
  const [loading, setLoading] = useState(false);

  const orbStyles = useMemo(() => (
    [...Array(8)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${4 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
    }))
  ), []);

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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Earth video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/spinning-earth.mp4"
      />

      {/* Bright stars floating */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Title and tagline */}
      <div className="z-10 relative flex flex-col items-center mb-12">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-widest text-center font-[Cinzel] animate-glow text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]">
          GATEKPT
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mt-4 animate-fade-in">
          Born from darkness, forged in sound — your AI mastering assistant in the void.
        </p>
      </div>

      {/* Chat Assistant */}
      <div className="my-10 w-full flex justify-center z-10 px-4">
        <Chat />
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10 animate-fade-in">
        <Link href="/downloads/mac">
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 shadow-lg">
            Download for Logic (Mac)
          </button>
        </Link>
        <Link href="/downloads/windows">
          <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black shadow-lg">
            Windows Version (Coming Soon)
          </button>
        </Link>
      </div>

      {/* Upload & Transcription */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md z-10 animate-fade-in">
        <input
          type="file"
          name="audioFile"
          accept="audio/*"
          required
          className="text-white file:bg-white file:text-black file:px-4 file:py-2 file:rounded file:cursor-pointer"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          {loading ? 'Transcribing...' : 'Transcribe Audio'}
        </button>
        <pre className="text-gray-400 text-sm text-left w-full whitespace-pre-wrap">{result}</pre>
      </form>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm text-center z-10 animate-fade-in">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
