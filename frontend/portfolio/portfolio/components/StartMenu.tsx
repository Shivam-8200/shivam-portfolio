"use client";

import { motion } from "framer-motion";
import { User, Code2, Briefcase, TerminalSquare, MessageSquareText, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export type AppId = "about" | "skills" | "experience" | "terminal" | "chat" | "contact";

const APPS: { id: AppId; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About Me", icon: <User size={16} /> },
  { id: "skills", label: "Skills", icon: <Code2 size={16} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare size={16} /> },
  { id: "chat", label: "Ask AI about me", icon: <MessageSquareText size={16} /> },
  { id: "contact", label: "Contact", icon: <Mail size={16} /> },
];

export default function StartMenu({ onLaunch }: { onLaunch: (id: AppId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="glass fixed top-11 left-3 z-[250] w-72 rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-window)" }}
    >
      <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="display text-xs font-semibold" style={{ color: "var(--accent)" }}>
          {PROFILE.name}
        </div>
        <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>
          {PROFILE.fullTitle}
        </div>
      </div>
      <div className="py-1.5">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => onLaunch(app.id)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
          >
            <span style={{ color: "var(--accent)" }}>{app.icon}</span>
            <span className="text-sm" style={{ color: "var(--text)" }}>
              {app.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
