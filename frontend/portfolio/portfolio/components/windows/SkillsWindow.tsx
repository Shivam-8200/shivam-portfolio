import { SKILLS } from "@/lib/data";

export default function SkillsWindow() {
  return (
    <div className="space-y-4">
      {Object.entries(SKILLS).map(([category, items]) => (
        <div key={category}>
          <div className="mono text-xs uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>
            {category}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <span
                key={item}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
