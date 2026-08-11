"use client";

import {
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PROFILE, EDUCATION } from "@/lib/data";

export default function AboutWindow() {
  return (
    <div
      className="space-y-5"
      style={{ color: "var(--text)" }}
    >
      {/* Profile header */}
      <section>
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(94,234,212,0.14), rgba(167,139,250,0.16))",
              border: "1px solid var(--border)",
              color: "var(--accent)",
            }}
          >
            <Sparkles size={19} />
          </div>

          <div className="min-w-0">
            <h2
              className="display text-lg font-semibold"
              style={{ color: "var(--text)" }}
            >
              {PROFILE.name}
            </h2>

            <p
              className="text-xs mt-1 leading-relaxed"
              style={{ color: "var(--accent)" }}
            >
              {PROFILE.fullTitle}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <SectionTitle>About</SectionTitle>

        <div className="space-y-3">
          {PROFILE.bio.map((para, index) => (
            <p
              key={index}
              className="text-[11px] leading-[1.7]"
              style={{ color: "var(--text-muted)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle>Education</SectionTitle>

        <div
          className="rounded-xl p-3.5"
          style={{
            background:
              "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background:
                  "rgba(125,211,252,0.07)",
                color: "var(--accent)",
              }}
            >
              <GraduationCap size={15} />
            </div>

            <div className="min-w-0">
              <div
                className="text-xs font-medium"
                style={{
                  color: "var(--text)",
                }}
              >
                {EDUCATION.degree}
              </div>

              <div
                className="text-[10px] mt-1"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {EDUCATION.institution}
              </div>

              <div
                className="mono text-[9px] mt-1"
                style={{
                  color: "var(--text-faint)",
                }}
              >
                {EDUCATION.period}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section>
        <SectionTitle>Location</SectionTitle>

        <div
          className="rounded-xl px-3 py-2.5 flex items-center gap-2.5"
          style={{
            background:
              "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)",
          }}
        >
          <MapPin
            size={14}
            className="shrink-0"
            style={{
              color: "var(--accent-2)",
            }}
          />

          <span
            className="text-[10px] leading-relaxed"
            style={{
              color: "var(--text-muted)",
            }}
          >
             Open to relocation across India
          </span>
        </div>
      </section>

      {/* Small profile footer */}
      <div
        className="mono text-[9px] pt-1"
        style={{
          color: "var(--text-faint)",
        }}
      >
        2026 · Full-Stack Development · AI Applications
      </div>
    </div>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mono text-[9px] uppercase tracking-[0.18em] mb-2"
      style={{
        color: "var(--text-faint)",
      }}
    >
      {children}
    </div>
  );
}