"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { PROFILE } from "@/lib/data";
import {
  Send,
  Sparkles,
  RotateCcw,
} from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  text: string;
};

function formatAssistantText(text: string) {
  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return (
        <div
          key={index}
          className="h-2"
        />
      );
    }

    // ### Heading
    if (trimmed.startsWith("### ")) {
      return (
        <div
          key={index}
          className="display text-xs font-semibold mt-2 mb-1"
          style={{
            color: "var(--accent)",
          }}
        >
          {trimmed.replace(/^###\s*/, "")}
        </div>
      );
    }

    // ## Heading
    if (trimmed.startsWith("## ")) {
      return (
        <div
          key={index}
          className="display text-sm font-semibold mt-2 mb-1"
          style={{
            color: "var(--text)",
          }}
        >
          {trimmed.replace(/^##\s*/, "")}
        </div>
      );
    }

    // Bullet
    if (
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ")
    ) {
      return (
        <div
          key={index}
          className="flex gap-2 text-[11px] leading-relaxed"
          style={{
            color: "var(--text-muted)",
          }}
        >
          <span
            className="mt-[6px] w-1 h-1 rounded-full shrink-0"
            style={{
              background: "var(--accent)",
            }}
          />

          <span>
            {formatInlineText(
              trimmed.slice(2)
            )}
          </span>
        </div>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const match =
        trimmed.match(/^(\d+)\.\s(.*)$/);

      if (match) {
        return (
          <div
            key={index}
            className="flex gap-2 text-[11px] leading-relaxed"
            style={{
              color: "var(--text-muted)",
            }}
          >
            <span
              className="mono shrink-0"
              style={{
                color: "var(--accent-2)",
              }}
            >
              {match[1]}.
            </span>

            <span>
              {formatInlineText(
                match[2]
              )}
            </span>
          </div>
        );
      }
    }

    // Normal paragraph
    return (
      <p
        key={index}
        className="text-[11px] leading-[1.65]"
        style={{
          color: "var(--text-muted)",
        }}
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });
}

function formatInlineText(text: string) {
  const parts = text.split(
    /(\*\*[^*]+\*\*|`[^`]+`)/
  );

  return parts.map((part, index) => {
    if (
      part.startsWith("**") &&
      part.endsWith("**")
    ) {
      return (
        <strong
          key={index}
          style={{
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (
      part.startsWith("`") &&
      part.endsWith("`")
    ) {
      return (
        <code
          key={index}
          className="mono text-[10px] px-1 py-0.5 rounded"
          style={{
            color: "var(--accent)",
            background:
              "rgba(125,211,252,0.08)",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export default function ChatWindow() {
  const [messages, setMessages] =
    useState<Msg[]>([
      {
        role: "assistant",
        text: `Hi! I'm Shivam's portfolio AI assistant.

Ask me about his projects, skills, experience, education, or technical approach.`,
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: loading
        ? "auto"
        : "smooth",
    });
  }, [messages, loading]);

  function autoResize() {
    const textarea =
      textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      120
    )}px`;
  }

  async function handleSend(
    event?: React.FormEvent
  ) {
    event?.preventDefault();

    const text = input.trim();

    if (!text || loading) {
      return;
    }

    const userMessage: Msg = {
      role: "user",
      text,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    setMessages([
  ...nextMessages,
  {
    role: "assistant",
    text: "",
  },
]);

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "auto";
    }

    try {
 

  const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages: nextMessages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error(
          "No response stream"
        );
      }

      

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let accumulated = "";

      while (true) {
        const { value, done } =
          await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        accumulated += chunk;

        setMessages((previous) => {
          const updated = [
            ...previous,
          ];

          const lastIndex =
            updated.length - 1;

          if (
            updated[lastIndex]?.role ===
            "assistant"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: accumulated,
            };
          }

          return updated;
        });
      }

      // Flush any remaining decoder data.
      const remaining =
        decoder.decode();

      if (remaining) {
        accumulated += remaining;

        setMessages((previous) => {
          const updated = [
            ...previous,
          ];

          const lastIndex =
            updated.length - 1;

          if (
            updated[lastIndex]?.role ===
            "assistant"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: accumulated,
            };
          }

          return updated;
        });
      }
    } catch (error) {
      console.error(
        "Chat request failed:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "I couldn't reach the AI right now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  }

  function clearConversation() {
    if (loading) return;

    setMessages([
      {
        role: "assistant",
        text: `Hi! I'm Shivam's portfolio AI assistant.

Ask me about his projects, skills, experience, education, or technical approach.`,
      },
    ]);

    setInput("");

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-3 mb-3 shrink-0"
        style={{
          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(94,234,212,0.16), rgba(167,139,250,0.16))",
              border:
                "1px solid var(--border)",
            }}
          >
            <Sparkles
              size={13}
              style={{
                color: "var(--accent)",
              }}
            />
          </div>

          <div>
            <div
              className="display text-xs font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Portfolio AI
            </div>

            <div
              className="mono text-[8px]"
              style={{
                color: "var(--text-faint)",
              }}
            >
              GROUNDED · STREAMING
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={clearConversation}
          disabled={loading}
          aria-label="Clear conversation"
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-30 hover:bg-white/5"
          title="Clear conversation"
        >
          <RotateCcw
            size={12}
            style={{
              color:
                "var(--text-muted)",
            }}
          />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
        {messages.map((message, index) => {
          const isUser =
            message.role === "user";

          const isStreaming =
            loading &&
            index ===
              messages.length - 1 &&
            !isUser;

          return (
            <div
              key={`${index}-${message.role}`}
              className={`flex ${
                isUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[90%]
                  rounded-xl
                  px-3
                  py-2.5
                `}
                style={
                  isUser
                    ? {
                        background:
                          "var(--accent)",
                        color: "#05100e",
                      }
                    : {
                        background:
                          "rgba(255,255,255,0.035)",
                        border:
                          "1px solid var(--border)",
                        color:
                          "var(--text)",
                      }
                }
              >
                {!isUser && (
                  <div
                    className="flex items-center gap-1 mb-1.5"
                    style={{
                      color:
                        "var(--accent)",
                    }}
                  >
                    <Sparkles size={10} />

                    <span className="mono text-[8px] uppercase tracking-wider">
                      AI
                    </span>
                  </div>
                )}

                {isUser ? (
  <p className="text-[11px] leading-relaxed whitespace-pre-wrap">
    {message.text}
  </p>
) : (
  <div>
    {message.text ? (
      <>
        {formatAssistantText(message.text)}

        {isStreaming && (
          <span
            className="inline-block w-[5px] h-3 ml-0.5 align-middle rounded-sm animate-pulse"
            style={{
              background: "var(--accent)",
            }}
          />
        )}
      </>
    ) : (
      isStreaming && (
        <div className="flex items-center gap-2 py-0.5">
          <span
            className="mono text-[9px]"
            style={{
              color: "var(--text-faint)",
            }}
          >
            Thinking
          </span>

          <span className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: "var(--accent)",
                animationDelay: "0ms",
              }}
            />

            <span
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: "var(--accent)",
                animationDelay: "150ms",
              }}
            />

            <span
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: "var(--accent)",
                animationDelay: "300ms",
              }}
            />
          </span>
        </div>
      )
    )}
  </div>
)}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="shrink-0 mt-3 pt-3"
        style={{
          borderTop:
            "1px solid var(--border)",
        }}
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about projects, skills, experience..."
            rows={1}
            disabled={loading}
            className="
              flex-1
              resize-none
              outline-none
              px-3
              py-2.5
              rounded-xl
              text-[11px]
              leading-relaxed
              disabled:opacity-60
            "
            style={{
              maxHeight: "120px",
              background:
                "rgba(255,255,255,0.035)",
              border:
                "1px solid var(--border)",
              color: "var(--text)",
            }}
          />

          <button
            type="submit"
            disabled={
              loading ||
              !input.trim()
            }
            aria-label="Send message"
            className="
              w-9
              h-9
              shrink-0
              rounded-xl
              flex
              items-center
              justify-center
              transition-all
              disabled:opacity-30
            "
            style={{
              background:
                "var(--accent)",
            }}
          >
            <Send
              size={14}
              style={{
                color: "#05100e",
              }}
            />
          </button>
        </div>

        <div
          className="mono text-[8px] mt-1.5 text-right"
          style={{
            color: "var(--text-faint)",
          }}
        >
          Enter to send · Shift+Enter for new line
        </div>
      </form>
    </div>
  );
}