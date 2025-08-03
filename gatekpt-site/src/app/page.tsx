'use client';

import { useState } from 'react';
import Chat from './components/Chat';
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
    <main className="stars-container min-h-screen text-white px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full animate-twinkle bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:50px_50px] opacity-10"></div>
        <div className="absolute w-full h-full animate-pulse bg-[radial-gradient(circle,white_2px,transparent_2px)] [background-size:100px_100px] opacity-5"></div>
      </div>

      <div className="moon-logo text-5xl font-bold text-center z-10 animate-pulse drop-shadow-xl">
        GateKPT
      </div>

      <p className="text-lg text-gray-400 text-center max-w-xl mb-6 mt-32 z-10">
        Use an AI chat assistant to improve your mix, master faster, and maximize your music.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
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

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md z-10">
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
        <pre className="text-gray-400 text-sm text-left w-full whitespace-pre-wrap">{result}</pre>
      </form>

      {/* Option A: Animated Sound Bars */}
      <div className="flex gap-1 my-6 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-8 bg-white animate-pulse"
            style={{ animationDelay: `${i * 100}ms`, animationDuration: '1.5s' }}
          />
        ))}
      </div>

      {/* Option B: Floating Orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full opacity-10 blur-xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="my-10 w-full flex justify-center z-10">
        <Chat />
      </div>

      <footer className="mt-20 text-gray-500 text-sm text-center z-10">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
