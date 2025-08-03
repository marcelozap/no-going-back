'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

      <div className="flex flex-col sm:flex-row gap-4">
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

      <footer className="mt-20 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} GateKPT.ai • Built by Marcelo
      </footer>
    </main>
  );
}
