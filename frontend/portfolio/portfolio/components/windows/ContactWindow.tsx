"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8787";

export default function ContactWindow() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("sent");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  return (
    <div
      className="space-y-5"
      style={{
        color: "var(--text)",
      }}
    >
      {/* Header */}
      <section>
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(94,234,212,0.14), rgba(167,139,250,0.16))",
              border:
                "1px solid var(--border)",
              color: "var(--accent)",
            }}
          >
            <Mail size={18} />
          </div>

          <div>
            <h2
              className="display text-lg font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Let's connect
            </h2>

            <p
              className="text-[10px] mt-1 leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Have an opportunity, project, or
              just want to say hello? Send me a
              message.
            </p>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section>
        <div
          className="mono text-[9px] uppercase tracking-[0.18em] mb-2"
          style={{
            color: "var(--text-faint)",
          }}
        >
          Connect
        </div>

        <div className="grid grid-cols-3 gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "rgba(255,255,255,0.025)",
              border:
                "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Github size={15} />
            <span className="mono text-[9px]">
              GitHub
            </span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "rgba(255,255,255,0.025)",
              border:
                "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Linkedin size={15} />
            <span className="mono text-[9px]">
              LinkedIn
            </span>
          </a>

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "rgba(125,211,252,0.05)",
              border:
                "1px solid var(--border)",
              color: "var(--accent)",
            }}
          >
            <Download size={15} />
            <span className="mono text-[9px]">
              Resume
            </span>
          </a>
        </div>
      </section>

      {/* Contact form */}
      <section>
        <div
          className="mono text-[9px] uppercase tracking-[0.18em] mb-2"
          style={{
            color: "var(--text-faint)",
          }}
        >
          Send a message
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-2.5"
        >
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full text-[10px] px-3 py-2.5 rounded-xl outline-none transition-colors"
            style={inputStyle}
          />

          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full text-[10px] px-3 py-2.5 rounded-xl outline-none transition-colors"
            style={inputStyle}
          />

          <textarea
            required
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="w-full text-[10px] px-3 py-2.5 rounded-xl outline-none resize-none transition-colors"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 mono text-[10px] px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                "var(--accent)",
              color: "#05100e",
            }}
          >
            <Send size={12} />

            {status === "sending"
              ? "Sending..."
              : "Send message"}
          </button>

          {/* Success */}
          {status === "sent" && (
            <div
              className="flex items-start gap-2 rounded-xl px-3 py-2.5"
              style={{
                background:
                  "rgba(94,234,212,0.06)",
                border:
                  "1px solid rgba(94,234,212,0.14)",
              }}
            >
              <CheckCircle2
                size={13}
                className="shrink-0 mt-0.5"
                style={{
                  color: "var(--accent)",
                }}
              />

              <p
                className="text-[10px] leading-relaxed"
                style={{
                  color: "var(--accent)",
                }}
              >
                Message sent — I'll get back
                to you soon.
              </p>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div
              className="flex items-start gap-2 rounded-xl px-3 py-2.5"
              style={{
                background:
                  "rgba(248,113,113,0.05)",
                border:
                  "1px solid rgba(248,113,113,0.12)",
              }}
            >
              <AlertCircle
                size={13}
                className="shrink-0 mt-0.5"
                style={{
                  color: "var(--danger)",
                }}
              />

              <p
                className="text-[10px] leading-relaxed"
                style={{
                  color: "var(--danger)",
                }}
              >
                Couldn't send — try emailing{" "}
                {PROFILE.email} directly.
              </p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}