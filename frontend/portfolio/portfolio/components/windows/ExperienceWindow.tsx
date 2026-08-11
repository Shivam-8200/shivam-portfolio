"use client";

import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export default function ExperienceWindow() {
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
            <BriefcaseBusiness size={18} />
          </div>

          <div>
            <h2
              className="display text-lg font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Experience
            </h2>

            <p
              className="text-[10px] mt-1 leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Professional experience and hands-on
              software development work.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <div className="space-y-4">
        {EXPERIENCE.map((experience, index) => (
          <section
            key={experience.company}
            className="relative pl-5"
          >
            {/* Timeline line */}
            {index !== EXPERIENCE.length - 1 && (
              <div
                className="absolute left-[5px] top-3 bottom-[-18px] w-px"
                style={{
                  background:
                    "var(--border-strong)",
                }}
              />
            )}

            {/* Timeline dot */}
            <div
              className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full"
              style={{
                background:
                  index === 0
                    ? "var(--accent)"
                    : "var(--surface-raised)",
                border:
                  "2px solid var(--accent)",
                boxShadow:
                  index === 0
                    ? "0 0 12px rgba(125,211,252,0.25)"
                    : "none",
              }}
            />

            {/* Experience card */}
            <div
              className="rounded-xl p-3.5"
              style={{
                background:
                  "rgba(255,255,255,0.025)",
                border:
                  "1px solid var(--border)",
              }}
            >
              {/* Role + company */}
              <div>
                <h3
                  className="text-sm font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {experience.role}
                </h3>

                <div
                  className="mono text-[10px] mt-1"
                  style={{
                    color: "var(--accent)",
                  }}
                >
                  {experience.company}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                <div
                  className="flex items-center gap-1.5 text-[9px]"
                  style={{
                    color: "var(--text-faint)",
                  }}
                >
                  <CalendarDays size={11} />
                  <span>
                    {experience.period}
                  </span>
                </div>

                <div
                  className="flex items-center gap-1.5 text-[9px]"
                  style={{
                    color: "var(--text-faint)",
                  }}
                >
                  <MapPin size={11} />
                  <span>
                    {experience.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mt-3 space-y-2">
                {experience.points.map(
                  (point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                        style={{
                          background:
                            "var(--accent-2)",
                        }}
                      />

                      <p
                        className="text-[10px] leading-[1.65]"
                        style={{
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        {point}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mono text-[9px] pt-1"
        style={{
          color: "var(--text-faint)",
        }}
      >
        Hands-on development · Production-oriented
        work · Continuous learning
      </div>
    </div>
  );
}