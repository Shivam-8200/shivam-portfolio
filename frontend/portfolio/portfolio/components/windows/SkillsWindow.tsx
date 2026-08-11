"use client";

import {
  Code2,
  Database,
  Globe2,
  Layers3,
  Wrench,
} from "lucide-react";
import { SKILLS } from "@/lib/data";

function getCategoryIcon(category: string) {
  const name = category.toLowerCase();

  if (
    name.includes("language") ||
    name.includes("programming")
  ) {
    return <Code2 size={13} />;
  }

  if (
    name.includes("database") ||
    name.includes("sql")
  ) {
    return <Database size={13} />;
  }

  if (
    name.includes("frontend") ||
    name.includes("front-end") ||
    name.includes("web")
  ) {
    return <Globe2 size={13} />;
  }

  if (
    name.includes("backend") ||
    name.includes("back-end") ||
    name.includes("server")
  ) {
    return <Layers3 size={13} />;
  }

  return <Wrench size={13} />;
}

export default function SkillsWindow() {
  const categories = Object.entries(SKILLS);

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
              border: "1px solid var(--border)",
              color: "var(--accent)",
            }}
          >
            <Code2 size={18} />
          </div>

          <div>
            <h2
              className="display text-lg font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Technical Skills
            </h2>

            <p
              className="text-[10px] mt-1 leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Technologies and tools I use to build
              full-stack applications and AI-driven
              systems.
            </p>
          </div>
        </div>
      </section>

      {/* Skill categories */}
      <div className="space-y-3">
        {categories.map(
          ([category, items], categoryIndex) => (
            <section
              key={category}
              className="rounded-xl p-3.5"
              style={{
                background:
                  "rgba(255,255,255,0.025)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Category heading */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      categoryIndex === 0
                        ? "rgba(125,211,252,0.08)"
                        : "rgba(255,255,255,0.04)",
                    color:
                      categoryIndex === 0
                        ? "var(--accent)"
                        : "var(--accent-2)",
                  }}
                >
                  {getCategoryIcon(category)}
                </div>

                <div>
                  <div
                    className="mono text-[9px] uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--text-faint)",
                    }}
                  >
                    {category}
                  </div>

                  <div
  className="text-[9px] mt-0.5"
  style={{
    color: "var(--text-muted)",
  }}
>
  {items.length} skills
</div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="mono text-[9px] px-2.5 py-1.5 rounded-lg transition-all"
                    style={{
                      background:
                        "rgba(255,255,255,0.035)",
                      border:
                        "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )
        )}
      </div>

      {/* Footer */}
      <div
        className="mono text-[9px] pt-1"
        style={{
          color: "var(--text-faint)",
        }}
      >
        Full-Stack Development · AI · Automation
      </div>
    </div>
  );
}