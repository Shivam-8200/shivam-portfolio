"use client";

import { useState, useRef, useEffect } from "react";
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, TERMINAL_HELP } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

function runCommand(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return TERMINAL_HELP;
    case "about":
      return `${PROFILE.name} — ${PROFILE.fullTitle}\n${PROFILE.bio[0]}`;
    case "skills":
      return Object.entries(SKILLS)
        .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
        .join("\n");
    case "projects":
      return PROJECTS.map((p) => `${p.name} — ${p.tagline}`).join("\n");
    case "experience":
      return EXPERIENCE.map((e) => `${e.role} @ ${e.company} (${e.period})`).join("\n");
    case "contact":
      return `GitHub: ${PROFILE.github}\nLinkedIn: ${PROFILE.linkedin}`;
    case "resume":
      window.open(PROFILE.resumeUrl, "_blank");
      return "Opening resume...";
    case "":
      return "";
    default:
      return `command not found: ${c}. type 'help' for a list of commands.`;
  }
}

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to ${PROFILE.name}'s terminal. Type 'help' to get started.` },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input;
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const output = runCommand(cmd);
    setLines((prev) => [
      ...prev,
      { type: "input", text: cmd },
      ...(output ? [{ type: "output" as const, text: output }] : []),
    ]);
    setInput("");
  }

  return (
    <div className="mono text-xs h-full flex flex-col" style={{ color: "var(--text)" }}>
      <div className="flex-1 space-y-1.5">
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <div>
                <span style={{ color: "var(--accent)" }}>shivam@portfolio</span>
                <span style={{ color: "var(--text-faint)" }}>:~$ </span>
                <span>{line.text}</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap" style={{ color: "var(--text-muted)" }}>
                {line.text}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <span style={{ color: "var(--accent)" }}>shivam@portfolio</span>
        <span style={{ color: "var(--text-faint)" }}>:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          style={{ color: "var(--text)" }}
          spellCheck={false}
        />
      </form>
    </div>
  );
}
