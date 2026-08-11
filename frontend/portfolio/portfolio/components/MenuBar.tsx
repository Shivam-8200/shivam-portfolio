"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";

export default function MenuBar({
  activeTitle,
  onLogoClick,
}: {
  activeTitle?: string;
  onLogoClick: () => void;
}) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="glass-dock fixed top-0 left-0 right-0 z-[210] h-9 flex items-center justify-between px-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onLogoClick}
          className="display text-xs font-bold tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {PROFILE.name.toLowerCase()}
          <span style={{ color: "var(--text)" }}>.dev</span>
        </button>
        {activeTitle && (
          <span className="text-xs hidden sm:inline" style={{ color: "var(--text-muted)" }}>
            {activeTitle}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 mono text-[11px]" style={{ color: "var(--text-muted)" }}>
        <span className="hidden sm:inline">{date}</span>
        <span style={{ color: "var(--text)" }}>{time}</span>
      </div>
    </div>
  );
}
