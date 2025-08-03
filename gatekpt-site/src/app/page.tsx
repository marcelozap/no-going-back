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
    <main className="min-h-screen text-white px-6 py-12 flex flex-col items-center justify-center relative overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10"
        src="/background-stars.mp4"
      />

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

      <div className="z-10 relative flex flex-col items-center">
        <Image
          src="/spinning-moon.gif"
          alt="Spinning Moon"
          width={300}
          height={300}
          className="rounded-full shadow-2xl mb-6 animate-spin-slow"
        />
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-widest text-center font-[Cinzel] animate-pulse drop-shadow-2xl">
          GATEKPT
        </h1>
        <p className="text-md text-gray-400 text-center max-w-2xl mt-4">
          Born from darkness, forged in sound — your AI mastering assistant in the void.
        </p>
      </div>

      <div className="my-10 w-full flex justify-center z-10">
        <Chat />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
        <Link href="/download