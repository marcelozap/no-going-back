'use client';

import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! I’m GateKPT. Upload a track or ask how to shape your mix." },
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

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong. Try again later." }]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white rounded-xl p-6 shadow-lg border border-white/20">
      <div className="h-72 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg w-fit max-w-[90%] ${
              msg.sender === "user"
                ? "bg-white text-black self-end ml-auto"
                : "bg-black/50 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-white font-mono animate-pulse">
            GateKPT is vibing with your track...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none"
          placeholder="Ask me how to boost your bass..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}
