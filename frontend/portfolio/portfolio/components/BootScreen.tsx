"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";

const BOOT_LOG = [
  "$ git clone shivam-os.git",
  "Cloning into 'shivam-os'...",
  "$ npm install react next.js express mongodb",
  "resolved 4 core dependencies",
  "$ npm install n8n gemini-api langchain",
  "resolved 3 automation dependencies",
  "$ npm run build:career",
  "compiling projects... done",
  "compiling experience... done",
  "$ systemctl start devos",
  `devos ready — welcome, it's ${PROFILE.name}'s machine.`,
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (visibleLines >= BOOT_LOG.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [visibleLines, onDone]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter") {
        setSkipped(true);
        onDone();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onDone]);

  if (skipped) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-center px-6 md:px-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="mono text-xs md:text-sm space-y-1 max-w-2xl">
        {BOOT_LOG.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: line.startsWith("$") ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            {line}
          </div>
        ))}
        <span className="inline-block w-2 h-3.5 align-middle animate-pulse" style={{ background: "var(--accent)" }} />
      </div>
      <button
        onClick={() => {
          setSkipped(true);
          onDone();
        }}
        className="mono text-[11px] mt-8 self-start px-3 py-1.5 rounded"
        style={{ border: "1px solid var(--border-strong)", color: "var(--text-faint)" }}
      >
        press enter to skip
      </button>
    </div>
  );
}
