import { Project } from "@/lib/data";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectDetailWindow({ project }: { project: Project }) {
  return (
    <div className="space-y-5 text-sm">
      <div>
        <h2 className="display text-lg font-bold" style={{ color: "var(--text)" }}>
          {project.name}
        </h2>
        <p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
          {project.tagline}
        </p>
        <div className="flex items-center gap-3 mt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <Github size={12} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
        </div>
      </div>

      {[
        { label: "Why", body: project.why },
        { label: "What", body: project.what },
        { label: "How", body: project.how },
      ].map((section) => (
        <div key={section.label}>
          <div className="mono text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--accent-2)" }}>
            {section.label}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {section.body}
          </p>
        </div>
      ))}

      {project.highlight && (
        <div
          className="mono text-[11px] px-3 py-2 rounded"
          style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--accent)" }}
        >
          {project.highlight}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="mono text-[10px] px-2 py-0.5 rounded"
            style={{ background: "var(--surface-raised)", color: "var(--text-muted)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
