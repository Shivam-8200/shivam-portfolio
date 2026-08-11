import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, EDUCATION } from "@/lib/data";

// Build a grounding context from the actual portfolio data so the model
// answers precisely instead of hallucinating or being vague.
function buildContext() {
  const skillsText = Object.entries(SKILLS)
    .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
    .join("\n");

  const projectsText = PROJECTS.map(
    (p) => `- ${p.name}: ${p.description} Stack: ${p.stack.join(", ")}.`
  ).join("\n");

  const experienceText = EXPERIENCE.map(
    (e) => `- ${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`
  ).join("\n");

  return `You are answering questions on behalf of ${PROFILE.name}, a ${PROFILE.fullTitle}.
Answer ONLY using the facts below. If something isn't covered, say you don't have that detail
and suggest contacting ${PROFILE.name} directly — never invent facts. Keep answers concise (2-4 sentences),
specific, and in a confident first-person-adjacent tone (e.g. "He built..." or "Shivam's approach was...").

EDUCATION: ${EDUCATION.degree}, ${EDUCATION.institution} (${EDUCATION.period})
LOCATION PREFERENCE: ${PROFILE.location}

SKILLS:
${skillsText}

PROJECTS:
${projectsText}

EXPERIENCE:
${experienceText}
`;
}

// Current free-tier Gemini model as of Aug 2026. If Google renames/retires
// this again, swap the string here — nothing else needs to change.
const MODEL = "gemini-3.5-flash-lite";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "AI chat isn't configured yet — set GEMINI_API_KEY in your environment." },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Gemini requires chat history to start with a "user" turn — drop any
    // leading assistant greeting before building history.
    const allButLast = (messages || []).slice(0, -1);
    const firstUserIndex = allButLast.findIndex((m: { role: string }) => m.role === "user");
    const trimmed = firstUserIndex === -1 ? [] : allButLast.slice(firstUserIndex);

    const history = trimmed.map((m: { role: string; text: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const lastMessage = messages[messages.length - 1]?.text || "";

    const chat = ai.chats.create({
      model: MODEL,
      config: { systemInstruction: buildContext() },
      history,
    });

    const result = await chat.sendMessage({ message: lastMessage });
    const reply = result.text;

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "Something went wrong reaching the AI. Try again shortly." },
      { status: 200 }
    );
  }
}
