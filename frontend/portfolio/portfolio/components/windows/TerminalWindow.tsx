"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  PROFILE,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  TERMINAL_HELP,
} from "@/lib/data";

type Line = {
  type: "input" | "output";
  text: string;
};

function runCommand(cmd: string): string {
  const c = cmd.trim().toLowerCase();

  switch (c) {
    case "help":
      return TERMINAL_HELP;

    case "whoami":
      return `${PROFILE.name}
${PROFILE.fullTitle}
${PROFILE.tagline}
Location: ${PROFILE.location}
${PROFILE.relocation}`;

    case "about":
      return `${PROFILE.name} — ${PROFILE.fullTitle}

${PROFILE.bio.join("\n\n")}`;

    case "skills":
      return Object.entries(SKILLS)
        .map(
          ([category, items]) =>
            `${category}:
  ${items.join(" · ")}`
        )
        .join("\n\n");

    case "projects":
      return PROJECTS
        .map(
          (project) =>
            `${project.name}
${project.tagline}
${project.description}`
        )
        .join("\n\n");

    case "experience":
      return EXPERIENCE
        .map(
          (experience) =>
            `${experience.role} @ ${experience.company}
${experience.period} · ${experience.location}

${experience.points
  .map((point) => `• ${point}`)
  .join("\n")}`
        )
        .join("\n\n");

    case "education":
      return `${EDUCATION.degree}
${EDUCATION.institution}
${EDUCATION.period}
${EDUCATION.location}`;

    case "certifications":
      return CERTIFICATIONS
        .map(
          (certification) =>
            `${certification.name} — ${certification.issuer}`
        )
        .join("\n");

    case "resume":
      window.open(
        PROFILE.resumeUrl,
        "_blank"
      );

      return "Opening resume...";

    case "github":
      window.open(
        PROFILE.github,
        "_blank"
      );

      return "Opening GitHub...";

    case "contact":
      return `Email: ${PROFILE.email}
GitHub: ${PROFILE.github}
LinkedIn: ${PROFILE.linkedin}`;

    case "":
      return "";

    default:
      return `command not found: ${c}. type 'help' for a list of commands.`;
  }
}

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: `Welcome to ${PROFILE.name}'s terminal.\nType 'help' to get started.`,
    },
  ]);

  const [input, setInput] = useState("");

  const [history, setHistory] =
    useState<string[]>([]);

  const [historyIndex, setHistoryIndex] =
    useState(-1);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [lines]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const command = input;

    if (
      command.trim().toLowerCase() ===
      "clear"
    ) {
      setLines([]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    const trimmed =
      command.trim();

    if (trimmed) {
      setHistory((previous) => [
        ...previous,
        trimmed,
      ]);
    }

    const output =
      runCommand(command);

    setLines((previous) => [
      ...previous,
      {
        type: "input",
        text: command,
      },
      ...(output
        ? [
            {
              type: "output" as const,
              text: output,
            },
          ]
        : []),
    ]);

    setInput("");
    setHistoryIndex(-1);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!history.length) {
        return;
      }

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(
              0,
              historyIndex - 1
            );

      setHistoryIndex(nextIndex);
      setInput(
        history[nextIndex]
      );
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (
        historyIndex === -1
      ) {
        return;
      }

      const nextIndex =
        historyIndex + 1;

      if (
        nextIndex >=
        history.length
      ) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(
        history[nextIndex]
      );
    }
  }

  return (
    <div
      className="mono text-[10px] h-full flex flex-col min-h-0"
      style={{
        color: "var(--text)",
      }}
      onClick={focusInput}
    >
      {/* Terminal status bar */}
      <div
        className="flex items-center justify-between gap-3 pb-2.5 mb-2.5 shrink-0"
        style={{
          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background:
                "var(--accent)",
              boxShadow:
                "0 0 8px rgba(125,211,252,0.35)",
            }}
          />

          <span
            className="text-[9px] uppercase tracking-[0.16em]"
            style={{
              color:
                "var(--text-muted)",
            }}
          >
            Terminal
          </span>
        </div>

        <span
          className="text-[8px]"
          style={{
            color:
              "var(--text-faint)",
          }}
        >
          interactive
        </span>
      </div>

      {/* Terminal history */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-2 pr-1"
        onClick={focusInput}
      >
        {lines.map((line, index) => (
          <div key={index}>
            {line.type === "input" ? (
              <div className="break-all">
                <span
                  style={{
                    color:
                      "var(--accent)",
                  }}
                >
                  shivam@portfolio
                </span>

                <span
                  style={{
                    color:
                      "var(--text-faint)",
                  }}
                >
                  :~$
                </span>{" "}

                <span
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  {line.text}
                </span>
              </div>
            ) : (
              <div
                className="whitespace-pre-wrap leading-[1.65] break-words"
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                {line.text}
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1.5 mt-2 pt-2.5 shrink-0"
        style={{
          borderTop:
            "1px solid var(--border)",
        }}
      >
        <span
          className="shrink-0"
          style={{
            color:
              "var(--accent)",
          }}
        >
          shivam@portfolio
        </span>

        <span
          className="shrink-0"
          style={{
            color:
              "var(--text-faint)",
          }}
        >
          :~$
        </span>

        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(event) =>
            setInput(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{
            color:
              "var(--text)",
            caretColor:
              "var(--accent)",
          }}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command"
        />

        <span
          className="w-[5px] h-3 rounded-sm animate-pulse shrink-0"
          style={{
            background:
              "var(--accent)",
          }}
        />
      </form>
    </div>
  );
}