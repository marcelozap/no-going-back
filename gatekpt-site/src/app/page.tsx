'use client';

import { useState, useMemo } from 'react';
import Chat from './components/chat';
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
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
        src="/background-stars.mp4"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-center min-h-screen px-6 py-20 gap-12">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4 animate-pulse">GateKPT</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-md">
            Use an AI chat assistant to improve your mix, master faster, and maximize your music.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
            <input
              type="file"
              name="audioFile"
              accept="audio/*"
              required
              className="file-input text-white border border-gray-500 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              {loading ? 'Transcribing...' : 'Transcribe Audio'}
            </button>
            <pre className="text-gray-400 text-sm whitespace-pre-wrap mt-2">{result}</pre>
          </form>

          <div className="flex gap-4 mt-6">
            <Link href="/downloads/mac">
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300">
                Download for Logic (Mac)
              </button>
            </Link>
            <Link href="/downloads/windows">
              <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black">
                Windows Version (Coming Soon)
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <Chat />
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {orbStyles.map((style, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full opacity-10 blur-xl animate-float"
            style={style}
          />
        ))}
      </div>

      <footer className="absolute bottom-6 w-full text-center text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
