'use client';

import { useState } from 'react';
import Chat from './components/chat';
import Link from 'next/link';

export default function Home() {
  const [result, setResult] = useState('Upload a file to transcribe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.audioFile as HTMLInputElement;
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
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Spinning Earth Video Background */}
      <video
        src="/spinning-earth.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* UI Container: Floating on top */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-10">
        {/* Glowing Title */}
        <h1 className="text-8xl font-[Cinzel] font-extrabold text-white animate-glow drop-shadow-lg text-center">
          GATEKPT
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-300 text-center max-w-2xl animate-fade-in">
          Born from darkness, forged in sound — your AI mastering assistant in the void.
        </p>

        {/* Buttons */}
        <div className="flex space-x-6">
          <Link href="/downloads/mac">
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-[0_0_15px_5px_rgba(255,255,255,0.9)] hover:shadow-[0_0_30px_15px_rgba(0,255,255,1)] transition duration-300">
              Download for Logic (Mac)
            </button>
          </Link>
          <Link href="/downloads/windows">
            <button className="border border-white px-6 py-3 rounded-full font-semibold text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_15px_rgba(0,255,255,1)] transition duration-300">
              Windows Version (Coming Soon)
            </button>
          </Link>
        </div>

        {/* Chat Component */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 max-w-3xl w-full">
          <Chat />
        </div>

        {/* Upload & Transcription Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl animate-fade-in"
        >
          <input
            type="file"
            name="audioFile"
            accept="audio/*"
            required
            className="w-full text-white file:bg-white file:text-black file:px-4 file:py-2 file:rounded-lg file:cursor-pointer bg-black/40 border border-white/20 rounded-lg"
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            {loading ? 'Transcribing...' : 'Transcribe Audio'}
          </button>
          <pre className="text-gray-300 text-sm text-left w-full whitespace-pre-wrap mt-2">
            {result}
          </pre>
        </form>

        {/* Footer */}
        <footer className="mt-20 text-gray-400 text-sm text-center animate-fade-in">
          © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
        </footer>
      </div>
    </main>
  );
}
