'use client';

import { useState, FormEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    // TODO: call API and append assistant response
  };

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, idx) => (
        <div key={idx} className="text-white text-sm">
          <span className="font-semibold">
            {msg.role === 'user' ? 'You:' : 'GateKPT:'}{' '}
          </span>
          <span>{msg.content}</span>
        </div>
      ))}
      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 border border-white/40 rounded-lg px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-full uppercase font-semibold disabled:opacity-50"
          disabled={!input}
        >
          Send
        </button>
      </form>
    </div>
  );
}
