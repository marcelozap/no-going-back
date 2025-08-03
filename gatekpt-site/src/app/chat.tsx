// src/app/components/Chat.tsx
"use client";

import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! I’m GateKPT. Upload a track or ask how to shape your mix." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white text-black rounded-xl p-6 shadow-lg">
      <div className="h-72 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg w-fit max-w-[90%] ${
              msg.sender === "user" ? "bg-black text-white self-end ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-black font-mono animate-pulse">GateKPT is vibing with your track...</div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-gray-100 border border-gray-300 text-black"
          placeholder="Ask me how to boost your bass..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}
