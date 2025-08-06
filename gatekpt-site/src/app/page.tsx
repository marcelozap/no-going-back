import { useState } from 'react';
import Chat from './components/chat';
import Link from 'next/link';
import BackgroundOverlay from './components/BackgroundOverlay';

export default function Home() {
  const [result, setResult] = useState('No file chosen');
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
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Overlay from client component */}
      <BackgroundOverlay />
      <main id="main-content" className="relative z-10 flex flex-col items-center space-y-8 w-full max-w-2xl">
        <Chat />
        <p className="text-center text-gray-300 font-light animate-fade-in-up">
          Born from darkness, forged in sounds — your AI mastering companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
          <Link href="/downloads/mac">
            <button className="px-6 py-2 bg-white text-black rounded-full uppercase font-semibold w-full sm:w-auto">
              Download for Logic
            </button>
          </Link>
          <Link href="/downloads/windows">
            <button className="px-6 py-2 bg-white text-black rounded-full uppercase font-semibold w-full sm:w-auto">
              Windows Version
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
          <input
            id="audioFile"
            type="file"
            name="audioFile"
            accept="audio/*"
            onChange={(e) => setResult(e.target.files?.[0]?.name || 'No file chosen')}
            className="file:bg-white file:text-black file:px-4 file:py-2 file:rounded-lg file:cursor-pointer bg-transparent text-white border border-white/40 rounded-lg w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-white text-black rounded-full uppercase font-semibold disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? 'Transcribing…' : 'Upload & Transcribe'}
          </button>
          <p className="text-white text-sm mt-2">{result}</p>
        </form>
      </main>
    </div>
  );
}
