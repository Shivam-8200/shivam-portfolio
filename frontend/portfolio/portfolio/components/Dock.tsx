"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export type DockApp = {
  id: string;
  label: string;
  icon: React.ReactNode;
  bg?: string; // gradient background for a colorful, macOS-app-icon look
  running?: boolean;
  special?: boolean; // renders as a highlighted pill, e.g. "Ask Me"
};

type DockProps = {
  apps: DockApp[];
  onLaunch: (id: string) => void;
};

const BASE = 40;
const MAX_SCALE = 1.55;
const SPREAD = 1;

export default function Dock({ apps, onLaunch }: DockProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  function scaleFor(i: number) {
    if (hovered === null) return 1;
    const distance = Math.abs(i - hovered);
    if (distance > SPREAD) return 1;
    const falloff = 1 - distance / (SPREAD + 1);
    return 1 + (MAX_SCALE - 1) * falloff;
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[200]">
      <div
        className="glass-dock flex items-end gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-[20px] sm:rounded-[22px]"
        style={{ border: "1px solid var(--border)" }}
        onMouseLeave={() => setHovered(null)}
      >
        {apps.map((app, i) => {
          const scale = scaleFor(i);

          if (app.special) {
            return (
              <motion.button
                key={app.id}
                onMouseEnter={() => setHovered(i)}
                onClick={() => onLaunch(app.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex items-center gap-1.5 h-12 px-4 rounded-[16px] shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  color: "#05100e",
                  boxShadow: "0 4px 16px -4px rgba(94, 234, 212, 0.4)",
                }}
              >
                <Sparkles size={16} strokeWidth={2.5} />
                <span className="mono text-xs font-semibold whitespace-nowrap">{app.label}</span>
              </motion.button>
            );
          }

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <motion.button
                onMouseEnter={() => setHovered(i)}
                onClick={() => onLaunch(app.id)}
                animate={{ scale, y: scale > 1 ? -(scale - 1) * 20 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ originY: 1 }}
className="w-10 h-10 sm:w-12 sm:h-12 rounded-[11px] sm:rounded-[13px] flex items-center justify-center relative"
              >
                <div
                  className="w-full h-full rounded-[11px] sm:rounded-[13px] flex items-center justify-center"
                  style={{
                    background: app.bg || "var(--surface-raised)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 3px 10px -3px rgba(0,0,0,0.5)",
                  }}
                >
                  {app.icon}
                </div>
              </motion.button>
              {app.running && (
                <span
                  className="absolute -bottom-1.5 w-1 h-1 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
              {hovered === i && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mono absolute -top-8 px-2 py-1 rounded text-[10px] whitespace-nowrap glass"
                  style={{ border: "1px solid var(--border)", color: "var(--text)" }}
                >
                  {app.label}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
