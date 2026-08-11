import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  PROFILE,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
} from "@/lib/data";

function buildContext() {
  const skillsText = Object.entries(SKILLS)
    .map(([category, items]) => {
      return `${category}: ${items.join(", ")}`;
    })
    .join("\n");

  const projectsText = PROJECTS.map((project) => {
    const features =
      project.features?.length
        ? `Features: ${project.features.join("; ")}`
        : "";

    const architecture = project.architecture
      ? `Architecture summary: ${project.architecture.summary}
Architecture flow: ${project.architecture.flow.join(" → ")}`
      : "";

    const engineeringDecisions =
      project.engineeringDecisions?.length
        ? `Engineering decisions: ${project.engineeringDecisions.join("; ")}`
        : "";

    const impact = project.impact?.length
      ? `Impact: ${project.impact.join("; ")}`
      : "";

    return `
PROJECT: ${project.name}
Tagline: ${project.tagline}
Description: ${project.description}
Problem: ${project.problem}
Solution: ${project.solution}
Stack: ${project.stack.join(", ")}
${features}
${architecture}
${engineeringDecisions}
${impact}
`;
  }).join("\n---\n");

  const experienceText = EXPERIENCE.map((experience) => {
    return `
${experience.role} — ${experience.company}
Period: ${experience.period}
Location: ${experience.location}
Responsibilities:
${experience.points.map((point) => `- ${point}`).join("\n")}
`;
  }).join("\n");

  return `
You are the portfolio AI assistant for ${PROFILE.name}.

Your job is to answer questions about Shivam accurately using ONLY the portfolio information supplied below.

========================
CORE RULES
========================

1. NEVER invent facts.

2. NEVER guess missing information.

3. If the portfolio data does not contain the answer, say:
   "I don't have that detail in Shivam's portfolio."

4. Do not invent:
   - technologies
   - companies
   - job titles
   - dates
   - project features
   - metrics
   - architecture
   - responsibilities
   - education details
   - deployment status

5. If the user asks for something outside Shivam's portfolio, politely say that you are specifically designed to answer questions about Shivam and his work.

6. Prefer precise information over generic praise.

7. Never claim that you personally worked on something. You represent Shivam.

8. When comparing projects, only use information explicitly present below.

9. If a metric exists in the data, preserve it accurately.
   Never create a new percentage or performance number.

10. Keep answers easy to scan.

========================
RESPONSE FORMAT
========================

Use Markdown when useful.

For simple questions:
- Give a direct answer first.
- Keep it concise.

For project questions:
### Project Name

**What it does**
...

**Stack**
...

**Architecture**
...

For comparison questions:
| Project | Purpose | Stack |
|---|---|---|
| ... | ... | ... |

For multiple items:
- Use bullets.
- Avoid giant paragraphs.

For technical questions:
- Explain the actual implementation from the portfolio data.
- Do not fill missing implementation details with assumptions.

========================
PROFILE
========================

Name: ${PROFILE.name}
Title: ${PROFILE.fullTitle}
Tagline: ${PROFILE.tagline}
Location preference: ${PROFILE.location}

Bio:
${PROFILE.bio.join("\n")}

========================
EDUCATION
========================

Degree: ${EDUCATION.degree}
Institution: ${EDUCATION.institution}
Period: ${EDUCATION.period}

========================
SKILLS
========================

${skillsText}

========================
PROJECTS
========================

${projectsText}

========================
EXPERIENCE
========================

${experienceText}
`;
}

const MODEL = "gemini-3.5-flash-lite";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        "AI chat isn't configured yet. Set GEMINI_API_KEY in your environment.",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        "Please send a message.",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const allButLast = messages.slice(0, -1);

    const firstUserIndex = allButLast.findIndex(
      (message: { role: string }) =>
        message.role === "user"
    );

    const trimmed =
      firstUserIndex === -1
        ? []
        : allButLast.slice(firstUserIndex);

    const history = trimmed.map(
      (message: {
        role: "user" | "assistant";
        text: string;
      }) => ({
        role:
          message.role === "user"
            ? "user"
            : "model",
        parts: [
          {
            text: message.text,
          },
        ],
      })
    );

    const lastMessage =
      messages[messages.length - 1]?.text?.trim();

    if (!lastMessage) {
      return new Response(
        "Please enter a question.",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        }
      );
    }

    const chat = ai.chats.create({
      model: MODEL,
      config: {
        systemInstruction: buildContext(),
      },
      history,
    });

    const result = await chat.sendMessageStream({
      message: lastMessage,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result) {
            const text = chunk.text;

            if (text) {
              controller.enqueue(
                encoder.encode(text)
              );
            }
          }

          controller.close();
        } catch (error) {
          console.error(
            "Gemini stream error:",
            error
          );

          controller.enqueue(
            encoder.encode(
              "\n\nI couldn't finish the response. Please try again."
            )
          );

          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      "Something went wrong reaching the AI. Please try again shortly.",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      }
    );
  }
}