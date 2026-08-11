"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";

type ProjectsWindowProps = {
  onOpenProject: (id: string) => void;
};

function ProjectIcon({ project }: { project: Project }) {
  if (project.id === "job-hunter") {
    return <Workflow size={20} />;
  }

  return <Sparkles size={20} />;
}

export default function ProjectsWindow({
  onOpenProject,
}: ProjectsWindowProps) {
  const [selectedId, setSelectedId] = useState(
    PROJECTS[0]?.id ?? ""
  );

  const selectedProject = PROJECTS.find(
    (project) => project.id === selectedId
  );

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div
              className="display text-lg font-semibold"
              style={{ color: "var(--text)" }}
            >
              Projects
            </div>

            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Selected systems, AI applications and engineering work.
            </p>
          </div>

          <div
            className="mono text-[10px] px-2.5 py-1.5 rounded-lg shrink-0"
            style={{
              color: "var(--accent)",
              background: "rgba(125,211,252,0.06)",
              border: "1px solid var(--border)",
            }}
          >
            {PROJECTS.length} featured
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[205px_1fr] gap-3">
        {/* Sidebar */}
        <div
          className="rounded-xl p-2 overflow-y-auto min-h-0"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="mono text-[9px] uppercase tracking-[0.18em] px-2 py-2"
            style={{ color: "var(--text-faint)" }}
          >
            Workspace
          </div>

          <div className="space-y-1">
            {PROJECTS.map((project) => {
              const active = project.id === selectedId;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left rounded-lg p-2.5 transition-colors"
                  style={{
                    background: active
                      ? "rgba(125,211,252,0.10)"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(125,211,252,0.16)"
                      : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: active
                          ? "linear-gradient(135deg, rgba(125,211,252,0.22), rgba(167,139,250,0.18))"
                          : "rgba(255,255,255,0.045)",
                        color: active
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      <ProjectIcon project={project} />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="text-xs font-medium truncate"
                        style={{
                          color: active
                            ? "var(--text)"
                            : "var(--text-muted)",
                        }}
                      >
                        {project.name}
                      </div>

                      <div
                        className="text-[9px] mt-0.5 truncate"
                        style={{
                          color: "var(--text-faint)",
                        }}
                      >
                        {project.stack.slice(0, 2).join(" · ")}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* GitHub */}
          <div
            className="mt-3 pt-3"
            style={{
              borderTop: "1px solid var(--border)",
            }}
          >
            <a
              href="https://github.com/Shivam-8200"
              target="_blank"
              rel="noreferrer"
              className="group w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 transition-all"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  "rgba(125,211,252,0.07)";
                event.currentTarget.style.borderColor =
                  "rgba(125,211,252,0.12)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background =
                  "rgba(255,255,255,0.025)";
                event.currentTarget.style.borderColor =
                  "transparent";
              }}
            >
              <div className="min-w-0">
                <div
                  className="text-[10px] font-medium"
                  style={{ color: "var(--text)" }}
                >
                  More projects
                </div>

                <div
                  className="text-[9px] mt-0.5"
                  style={{ color: "var(--text-faint)" }}
                >
                  View the rest of my work on GitHub
                </div>
              </div>

              <ArrowUpRight
                size={13}
                style={{ color: "var(--accent)" }}
              />
            </a>
          </div>
        </div>

        {/* Project details */}
        <div
          className="rounded-xl p-4 overflow-y-auto min-h-0"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)",
          }}
        >
          {selectedProject ? (
            <ProjectPreview
              project={selectedProject}
              onOpen={() =>
                onOpenProject(selectedProject.id)
              }
            />
          ) : (
            <div
              className="h-full flex items-center justify-center text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Select a project.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   PROJECT PREVIEW
   ========================================================= */

function ProjectPreview({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const architecture = project.architecture;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="space-y-5"
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className="display text-xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {project.name}
          </div>

          <div
            className="text-xs mt-1"
            style={{ color: "var(--accent)" }}
          >
            {project.tagline}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            color: "#07101a",
            background:
              "linear-gradient(135deg, var(--accent), #a78bfa)",
          }}
        >
          Explore
          <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {project.description}
      </p>

      {/* Problem / Solution */}
      <div className="grid grid-cols-1 gap-3">
        <InfoBlock
          label="Problem"
          text={project.problem}
        />

        <InfoBlock
          label="Solution"
          text={project.solution}
        />
      </div>

      {/* Highlight */}
      {project.highlight && (
        <div
          className="rounded-lg px-3 py-2.5"
          style={{
            background: "rgba(125,211,252,0.045)",
            border: "1px solid rgba(125,211,252,0.11)",
          }}
        >
          <div className="flex gap-2">
            <CheckCircle2
              size={14}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--accent)" }}
            />

            <span
              className="text-[11px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {project.highlight}
            </span>
          </div>
        </div>
      )}

      {/* Stack */}
      <section>
        <SectionTitle icon={<Layers3 size={12} />}>
          Stack
        </SectionTitle>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="mono text-[9px] px-2 py-1 rounded-md"
              style={{
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid var(--border)",
              }}
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      {/* Architecture */}
      {architecture && (
  <section>
    <SectionTitle icon={<Layers3 size={12} />}>
      Architecture
    </SectionTitle>

    <p
      className="text-[11px] leading-relaxed mb-3"
      style={{ color: "var(--text-muted)" }}
    >
      {architecture.summary}
    </p>

    <div
      className="rounded-xl p-3 overflow-x-auto"
      style={{
        background: "rgba(0,0,0,0.16)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 min-w-max">
        {architecture.flow.map((step, index) => (
          <div
            key={`${project.id}-${step}`}
            className="flex items-center gap-2"
          >
            <div
              className="mono text-[9px] px-2.5 py-2 rounded-lg whitespace-nowrap"
              style={{
                color:
                  index === 0
                    ? "var(--accent)"
                    : "var(--text-muted)",
                background:
                  index === 0
                    ? "rgba(125,211,252,0.08)"
                    : "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
              }}
            >
              {step}
            </div>

            {index < architecture.flow.length - 1 && (
              <span
                className="text-xs"
                style={{
                  color: "var(--text-faint)",
                }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}
      {/* Features */}
      {project.features.length > 0 && (
        <section>
          <SectionTitle icon={<CheckCircle2 size={12} />}>
            Key Features
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-2 rounded-lg px-2.5 py-2"
                style={{
                  background:
                    "rgba(255,255,255,0.03)",
                  border:
                    "1px solid var(--border)",
                }}
              >
                <span
                  className="mt-1 w-1 h-1 rounded-full shrink-0"
                  style={{
                    background:
                      "var(--accent)",
                  }}
                />

                <span
                  className="text-[10px] leading-relaxed"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engineering decisions */}
      {project.engineeringDecisions &&
        project.engineeringDecisions.length > 0 && (
          <section>
            <SectionTitle>
              Engineering Decisions
            </SectionTitle>

            <div className="space-y-2">
              {project.engineeringDecisions.map(
                (decision) => (
                  <div
                    key={decision}
                    className="text-[10px] leading-relaxed pl-3 relative"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      className="absolute left-0 top-[6px] w-1 h-1 rounded-full"
                      style={{
                        background:
                          "var(--accent-2)",
                      }}
                    />

                    {decision}
                  </div>
                )
              )}
            </div>
          </section>
        )}

      {/* Impact */}
      {project.impact &&
        project.impact.length > 0 && (
          <section>
            <SectionTitle>
              Impact
            </SectionTitle>

            <div className="space-y-2">
              {project.impact.map((item) => (
                <div
                  key={item}
                  className="text-[10px] leading-relaxed"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Links */}
      {(project.github || project.live) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] transition-transform hover:scale-[1.02]"
              style={{
                color: "var(--text-muted)",
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid var(--border)",
              }}
            >
              <Github size={13} />
              GitHub
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] transition-transform hover:scale-[1.02]"
              style={{
                color: "var(--text-muted)",
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid var(--border)",
              }}
            >
              <ExternalLink size={13} />
              Live
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}


/* =========================================================
   SMALL UI HELPERS
   ========================================================= */

function SectionTitle({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="mono text-[9px] uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5"
      style={{ color: "var(--text-faint)" }}
    >
      {icon}
      {children}
    </div>
  );
}


function InfoBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2.5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="mono text-[9px] uppercase tracking-[0.16em] mb-1"
        style={{ color: "var(--accent-2)" }}
      >
        {label}
      </div>

      <p
        className="text-[10px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {text}
      </p>
    </div>
  );
}