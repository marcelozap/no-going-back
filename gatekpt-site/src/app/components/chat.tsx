'use client';

import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hey! I’m GateKPT. Upload a track or ask how to shape your mix.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white rounded-xl p-6 shadow-2xl border border-white/20 z-20 relative animate-fade-in-up">
      <div className="h-72 overflow-y-auto mb-4 space-y-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg w-fit max-w-[90%] ${
              msg.sender === 'user'
                ? 'bg-white text-black self-end ml-auto'
                : 'bg-black/60 text-white'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 italic animate-pulse">Thinking...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Ask GateKPT..."
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
