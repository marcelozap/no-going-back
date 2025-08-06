'use client';
import { Music2 } from 'lucide-react';

export default function BackgroundOverlay() {
  return (
    <>
      {/* Softened pulsing background */}
      <div className="absolute inset-0 bg-black animate-pulse-slow opacity-50" />
      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <Music2 key={i} className="w-6 h-6 text-white animate-fade" />
        ))}
      </div>
    </>
  );
}