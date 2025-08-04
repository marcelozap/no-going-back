// src/app/page.tsx
'use client';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <h1
        className="text-[5rem] md:text-[6rem] font-[Cinzel] font-extrabold uppercase tracking-widest text-white animate-glow-couture"
      >
        GATEKPT
      </h1>
      <p className="max-w-xl text-gray-300 text-lg md:text-xl font-light animate-fade-in-up">
        Born from darkness, forged in sound — your AI mastering companion in couture-cosmic style.
      </p>
    </div>
  );
}
