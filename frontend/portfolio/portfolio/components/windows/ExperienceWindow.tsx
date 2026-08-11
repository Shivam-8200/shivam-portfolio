import { EXPERIENCE } from "@/lib/data";

export default function ExperienceWindow() {
  return (
    <div className="space-y-4">
      {EXPERIENCE.map((e) => (
        <div key={e.company} className="relative pl-4" style={{ borderLeft: "2px solid var(--border-strong)" }}>
          <div
            className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <h3 className="text-sm font-medium" style={{ color: "var(--text)" }}>
            {e.role}
          </h3>
          <div className="mono text-xs" style={{ color: "var(--accent)" }}>
            {e.company}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {e.period} · {e.location}
          </div>
          <ul className="mt-2 space-y-1">
            {e.points.map((pt, i) => (
              <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--accent-2)" }}>›</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
