"use client";

import { GraduationCap } from "lucide-react";

export default function EducationWindow() {
  return (
    <div className="h-full">
      <div className="mb-5">
        <div
          className="display text-xl font-semibold"
          style={{ color: "var(--text)" }}
        >
          Education
        </div>

        <p
          className="text-xs mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Academic background and degree information.
        </p>
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(125,211,252,0.18), rgba(167,139,250,0.16))",
              color: "var(--accent)",
            }}
          >
            <GraduationCap size={22} />
          </div>

          <div>
            <h2
              className="display text-lg font-semibold"
              style={{ color: "var(--text)" }}
            >
              B.Tech Computer Science & Engineering
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              KIIT University
            </p>

            <p
              className="mono text-[11px] mt-3"
              style={{ color: "var(--text-faint)" }}
            >
              2022 — 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}