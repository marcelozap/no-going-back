'use client';

import { useState, useMemo } from 'react';
import Chat from './components/Chat';
import Link from 'next/link';

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
    <main className="relative min-h-screen text-white px-6 py-12 flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        src="/background-stars.mp4"
      />

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {orbStyles.map((style, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full opacity-10 blur-xl animate-float"
            style={style}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
        {/* Left: Intro + Chat */}
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-pulse drop-shadow-xl">
            GateKPT
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-md">
            Use an AI chat assistant to improve your mix, master faster, and maximize your music.
          </p>
          <Chat />
        </div>

        {/* Right: Audio Upload */}
        <div className="flex flex-col items-center md:items-start">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white bg-opacity-5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <input
              type="file"
              name="audioFile"
              accept="audio/*"
              required
              className="text-white"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              {loading ? 'Transcribing...' : 'Transcribe Audio'}
            </button>
            <pre className="text-gray-400 text-sm whitespace-pre-wrap">{result}</pre>
          </form>

          <div className="flex gap-4 mt-8">
            <Link href="/downloads/mac">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300">
                Download for Logic (Mac)
              </button>
            </Link>
            <Link href="/downloads/windows">
              <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black">
                Windows Version (Coming Soon)
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
