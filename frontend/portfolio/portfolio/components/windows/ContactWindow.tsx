"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export default function ContactWindow() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        >
          <Github size={13} /> GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        >
          <Linkedin size={13} /> LinkedIn
        </a>
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--accent)" }}
        >
          <Download size={13} /> Resume
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full text-xs px-3 py-2 rounded outline-none"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full text-xs px-3 py-2 rounded outline-none"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <textarea
          required
          placeholder="Message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full text-xs px-3 py-2 rounded outline-none resize-none"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="mono text-xs px-4 py-2 rounded transition-opacity disabled:opacity-50"
          style={{ background: "var(--accent)", color: "#05100e" }}
        >
          {status === "sending" ? "sending..." : "send message"}
        </button>

        {status === "sent" && (
          <p className="text-xs" style={{ color: "var(--accent)" }}>
            <Mail size={12} className="inline mr-1" />
            Message sent — I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs" style={{ color: "var(--danger)" }}>
            Couldn&apos;t send — try emailing {PROFILE.email} directly.
          </p>
        )}
      </form>
    </div>
  );
}
