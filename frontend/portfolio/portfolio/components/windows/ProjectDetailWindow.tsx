"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers3,
  Lightbulb,
  Wrench,
} from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectDetailWindow({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6 pb-2"
      >
        {/* HEADER */}
        <section>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div
                className="mono text-[9px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--text-faint)" }}
              >
                PROJECT / CASE STUDY
              </div>

              <h2
                className="display text-2xl font-semibold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                {project.name}
              </h2>

              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "var(--accent)" }}
              >
                {project.tagline}
              </p>
            </div>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,211,252,0.15), rgba(167,139,250,0.13))",
                border: "1px solid var(--border)",
                color: "var(--accent)",
              }}
            >
              <Layers3 size={19} />
            </div>
          </div>

          {/* LINKS */}
          {(project.github || project.live) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px]"
                  style={{
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Github size={13} />
                  GitHub
                  <ArrowUpRight size={11} />
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px]"
                  style={{
                    color: "#07101a",
                    background:
                      "linear-gradient(135deg, var(--accent), #a78bfa)",
                  }}
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </section>

        {/* HIGHLIGHT */}
        {project.highlight && (
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: "rgba(125,211,252,0.055)",
              border: "1px solid rgba(125,211,252,0.13)",
            }}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2
                size={15}
                className="shrink-0 mt-0.5"
                style={{ color: "var(--accent)" }}
              />

              <div>
                <div
                  className="mono text-[9px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--accent)" }}
                >
                  Project highlight
                </div>

                <p
                  className="text-[11px] mt-1 leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {project.highlight}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* OVERVIEW */}
        <section>
          <SectionTitle icon={<Layers3 size={12} />}>
            Overview
          </SectionTitle>

          <p
            className="text-xs leading-[1.8]"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>
        </section>

        {/* PROBLEM */}
        <section>
          <SectionTitle icon={<Lightbulb size={12} />}>
            Problem
          </SectionTitle>

          <p
            className="text-xs leading-[1.8]"
            style={{ color: "var(--text-muted)" }}
          >
            {project.problem}
          </p>
        </section>

        {/* SOLUTION */}
        <section>
          <SectionTitle icon={<CheckCircle2 size={12} />}>
            Solution
          </SectionTitle>

          <p
            className="text-xs leading-[1.8]"
            style={{ color: "var(--text-muted)" }}
          >
            {project.solution}
          </p>
        </section>

        {/* FEATURES */}
        {project.features.length > 0 && (
          <section>
            <SectionTitle icon={<CheckCircle2 size={12} />}>
              Key Features
            </SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />

                  <span
                    className="text-[10px] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ARCHITECTURE */}
        {project.architecture && (
  <ArchitectureSection
    architecture={project.architecture}
  />
)}

        {/* ENGINEERING DECISIONS */}
        {project.engineeringDecisions &&
          project.engineeringDecisions.length > 0 && (
            <section>
              <SectionTitle icon={<Wrench size={12} />}>
                Engineering Decisions
              </SectionTitle>

              <div className="space-y-2">
                {project.engineeringDecisions.map((decision) => (
                  <div
                    key={decision}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className="mono text-[9px] mt-0.5"
                      style={{ color: "var(--accent-2)" }}
                    >
                      →
                    </span>

                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* IMPACT */}
        {project.impact && project.impact.length > 0 && (
          <section>
            <SectionTitle icon={<CheckCircle2 size={12} />}>
              Impact
            </SectionTitle>

            <div className="space-y-2">
              {project.impact.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2
                    size={13}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--accent)" }}
                  />

                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TECHNOLOGY */}
        <section>
          <SectionTitle icon={<Layers3 size={12} />}>
            Technology
          </SectionTitle>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((technology) => (
              <span
                key={technology}
                className="mono text-[9px] px-2.5 py-1.5 rounded-md"
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

        {/* FOOTER */}
        <div
          className="pt-3"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            className="mono text-[9px]"
            style={{ color: "var(--text-faint)" }}
          >
            case-study://{project.id}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-2.5">
      <div
        className="flex items-center gap-1.5 mono text-[9px] uppercase tracking-[0.2em]"
        style={{ color: "var(--accent-2)" }}
      >
        {icon}
        {children}
      </div>

      <div
        className="mt-1 w-8 h-px"
        style={{
          background: "var(--accent-2)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}


function ArchitectureSection({
  architecture,
}: {
  architecture: {
    summary: string;
    flow: string[];
  };
}) {
  return (
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
              key={`${step}-${index}`}
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
                  border:
                    "1px solid var(--border)",
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
  );
}