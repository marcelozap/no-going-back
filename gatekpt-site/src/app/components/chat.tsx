'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! I’m GateKPT. Upload a track or ask how to shape your mix.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle submit (with skeleton)
  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);
    setError(false);

    // Add skeleton bubble
    const skeletonIndex = messages.length + 1;
    setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const { reply } = await res.json();
      setMessages((prev) => {
        const updated = [...prev];
        updated[skeletonIndex] = { sender: 'bot', text: reply };
        return updated;
      });
    } catch {
      setError(true);
      setMessages((prev) => {
        const updated = [...prev];
        updated[skeletonIndex] = { sender: 'bot', text: 'Something went wrong.' };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit on Enter
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section
      aria-label="Chat with GateKPT"
      aria-busy={loading}
      className="relative w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/20
                 rounded-2xl p-6 shadow-2xl animate-fade-in-up font-chat sm:py-8 sm:px-8"
    >
      {/* Message log */}
      <div
        className="h-64 overflow-y-auto mb-4 pr-2 space-y-3 custom-scrollbar sm:h-80"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start space-x-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <img
              src={msg.sender === 'user' ? '/icons/user.svg' : '/icons/bot.svg'}
              alt=""
              className="w-6 h-6 rounded-full mt-1 flex-shrink-0"
            />
            <div
              className={`relative px-4 py-2 rounded-2xl max-w-[80%] break-words ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-white to-gray-200 text-black shadow-sm'
                  : `bg-black/70 text-white border border-white/30 shadow-inner ${
                      error && i === messages.length - 1 ? 'animate-pulse-error' : ''
                    }`
              } ${msg.text === '' ? 'h-6 w-24 bg-white/20 rounded' : ''}`}
            >
              {msg.text || /* skeleton shimmering */ (
                <div className="h-4 w-full bg-white/20 animate-pulse rounded" />
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="peer w-full px-4 py-2 rounded-full bg-black/50 border border-white/20
                       text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            placeholder="Ask GateKPT…"
            aria-label="Type your message"
          />
          <label
            htmlFor="chat-input"
            className="absolute left-4 top-2 text-gray-400 transition-all
                       peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white select-none"
          >
            Ask GateKPT…
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          aria-label="Send message"
          className="p-2 rounded-full bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.8)]
                     hover:shadow-[0_0_20px_rgba(212,175,55,1)] focus:outline-none focus:ring-2 focus:ring-white/50
                     transition disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </form>
    </section>
  );
}
