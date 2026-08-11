"use client";

import { useState, useRef, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: `Hey! I'm an AI trained on ${PROFILE.name}'s background. Ask me about his projects, skills, or experience.` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply || "Something went wrong." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Couldn't reach the AI right now — try again in a bit." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-col text-xs">
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-3 py-2 rounded-lg leading-relaxed"
              style={
                m.role === "user"
                  ? { background: "var(--accent)", color: "#05100e" }
                  : { background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }
              }
            >
              {m.role === "assistant" && (
                <Sparkles size={11} className="inline mr-1 mb-0.5" style={{ color: "var(--accent)" }} />
              )}
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="px-3 py-2 rounded-lg mono"
              style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text-faint)" }}
            >
              thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my projects, skills..."
          className="flex-1 px-3 py-2 rounded outline-none"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-8 h-8 shrink-0 rounded flex items-center justify-center disabled:opacity-50"
          style={{ background: "var(--accent)" }}
        >
          <Send size={14} style={{ color: "#05100e" }} />
        </button>
      </form>
    </div>
  );
}
