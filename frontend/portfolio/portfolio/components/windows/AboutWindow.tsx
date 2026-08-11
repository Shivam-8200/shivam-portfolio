import { PROFILE, EDUCATION } from "@/lib/data";

export default function AboutWindow() {
  return (
    <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
      <div>
        <h2 className="mono text-base mb-1" style={{ color: "var(--accent)" }}>
          {PROFILE.name}
        </h2>
        <p style={{ color: "var(--text-muted)" }}>{PROFILE.fullTitle}</p>
      </div>

      {PROFILE.bio.map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      <div
        className="mono text-xs p-3 rounded"
        style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
      >
        <div>{EDUCATION.institution}</div>
        <div>
          {EDUCATION.degree} · {EDUCATION.period}
        </div>
        <div className="mt-1" style={{ color: "var(--accent-2)" }}>
          {PROFILE.location}
        </div>
      </div>
    </div>
  );
}
