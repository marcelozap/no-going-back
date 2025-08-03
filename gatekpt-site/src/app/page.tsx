'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

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
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        GateKPT: Your AI Music Companion
      </h1>
      <p className="text-lg text-gray-400 text-center mb-10 max-w-xl">
        A smart AI assistant designed to integrate directly into your DAW. Built for Logic Pro and more.
      </p>

      <Image
        src="/figma.png"
        width={600}
        height={400}
        alt="Plugin Preview"
        className="rounded-xl shadow-xl mb-10"
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
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

      {/* 🔊 Upload & Transcribe Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
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

      <footer className="mt-20 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
