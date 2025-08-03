import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please provide a valid message." }, { status: 400 });
    }

    const prompt = `
You are GateKPT, an AI mastering and mixing assistant for music producers. Your voice is helpful, vibey, and slightly artistic.

Respond clearly and musically to the following user input. If they mention a song, plugin, or instrument, suggest actionable tips — such as EQ moves, stereo width ideas, compression ratios, or general creative suggestions.

Speak in short, helpful paragraphs. Incorporate energy, frequency, or vibe-based language when relevant. Example tone:

“Let’s open up that top end with a subtle 12kHz shelf.”
“Try gluing the drums with a 4:1 compressor and a slow attack.”
“Give your mix more space with a stereo widener on the pads.”

User: ${message}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4"
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Hmm, I'm not sure how to respond to that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Assistant error:", error);
    return NextResponse.json({ reply: "Sorry, something went wrong." }, { status: 500 });
  }
}
