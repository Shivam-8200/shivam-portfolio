// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this file to update
// anything shown on the site — no need to touch components.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Shivam",
  fullTitle: "Full-Stack Developer (MERN) & AI Automation Builder",
  tagline: "B.Tech CSE, KIIT University — Class of 2026",
  location: "Open to relocation: Bengaluru, Hyderabad, Noida, Gurgaon",
  email: "your.email@example.com", // TODO: replace with real email
  github: "https://github.com/Shivam-8200",
  linkedin: "https://linkedin.com/in/your-linkedin", // TODO: replace
  leetcode: "https://leetcode.com/your-handle", // TODO: replace
  resumeUrl: "/files/resume.pdf",
  bio: [
    "I'm a 2026 CSE graduate who builds full-stack products end to end — from schema design to shipped UI — using the MERN stack, and increasingly, AI-driven automation.",
    "During my internship at Tata Steel, I was handed no fixed project — so I designed and built a complaint management system from scratch, end to end.",
    "Outside of client work, I build tools that solve my own problems: an n8n pipeline that automates my job search, and an AI career coach that gives structured feedback on interview prep.",
  ],
};

export const SKILLS = {
  "Languages": ["JavaScript", "TypeScript", "Java", "HTML/CSS"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Redux"],
  "Backend": ["Node.js", "Express", "REST APIs", "Prisma"],
  "Database": ["MongoDB", "PostgreSQL"],
  "AI / Automation": ["n8n", "Gemini API", "LangChain (basics)", "Agentic pipelines", "Inngest"],
  "Tools": ["Git", "GitHub", "Postman", "Vercel", "Docker (basics)"],
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  highlight?: string;
  why: string;
  what: string;
  how: string;
};

export const PROJECTS: Project[] = [
  {
    id: "job-hunter-pipeline",
    name: "Job Hunter Pipeline",
    tagline: "22-node n8n automation that finds and tracks jobs for me, daily",
    description:
      "An end-to-end automation built in n8n that scrapes and filters new job postings, uses the Gemini API to score relevance against my profile, deduplicates against a running Google Sheet, and sends me a Telegram alert for anything worth applying to — cutting my manual job-search time dramatically.",
    stack: ["n8n", "Gemini API", "Google Sheets API", "Telegram Bot API"],
    github: "https://github.com/Shivam-8200",
    highlight: "22 automated nodes · daily runs · zero manual triage",
    why: "Manually browsing five job boards a day and cross-checking which ones I'd already applied to was eating hours I needed for DSA practice and actual applications. I wanted the search to run itself.",
    what: "A 22-node n8n workflow that continuously pulls new postings, scores each one against my profile using the Gemini API, checks a running Google Sheet to skip anything already seen, and pushes a Telegram alert only for postings worth my time.",
    how: "Built the trigger and scraping nodes first, then added a Gemini API node that reads the job description and returns a relevance score with reasoning. Deduplication happens against a Google Sheet acting as a lightweight database. The whole pipeline runs on a schedule with no manual step in between.",
  },
  {
    id: "ai-career-coach",
    name: "AI Career Coach",
    tagline: "A structured, AI-driven interview and career prep tool",
    description:
      "A full-stack app that generates personalized interview questions, reviews answers, and tracks prep progress over time, backed by a Postgres schema via Prisma and background jobs via Inngest for scheduled feedback loops.",
    stack: ["Next.js", "Prisma", "Inngest", "Gemini API", "PostgreSQL"],
    github: "https://github.com/Shivam-8200",
    highlight: "Full-stack · background jobs · real prep data",
    why: "Generic interview-prep resources aren't tailored to a specific candidate's background. I wanted something that actually knew my projects and skill gaps and coached me against them.",
    what: "A full-stack app that generates interview questions personalized to a user's profile, evaluates their answers, and tracks prep progress over time — closer to a coach than a static question bank.",
    how: "Next.js on the frontend and API layer, Prisma over PostgreSQL for structured prep-session data, and Inngest running background jobs for scheduled feedback and reminders. The Gemini API handles question generation and answer evaluation.",
  },
  {
    id: "complaint-management-system",
    name: "Complaint Management System",
    tagline: "Built independently during my Tata Steel internship",
    description:
      "Given no fixed brief during my internship, I identified a real internal need and built a complaint management system end to end — covering ticket intake, status tracking, and resolution workflows — using the MERN stack.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    highlight: "Self-initiated · shipped during internship",
    why: "I wasn't handed a pre-scoped project at Tata Steel — I had to find a real gap myself. Complaint tracking was being done informally, with no structured way to log status or ownership.",
    what: "A MERN-stack system covering ticket intake, status tracking, and resolution workflows — letting complaints be logged, assigned, and tracked to closure instead of living in email threads.",
    how: "Designed the MongoDB schema first around ticket state transitions, built the Express/Node API around it, then the React frontend for intake and tracking views. Owned every layer — requirements, schema, backend, frontend, and deployment — solo.",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Tata Steel",
    role: "Web Development Intern",
    period: "May 2025 — July 2025",
    location: "Remote / Onsite",
    points: [
      "Independently conceived, designed, and built a complaint management system using the MERN stack after receiving no pre-assigned project.",
      "Owned the project end to end — requirements, schema design, frontend, backend, and deployment.",
    ],
  },
];

export const EDUCATION = {
  institution: "KIIT University, Bhubaneswar",
  degree: "B.Tech, Computer Science & Engineering",
  period: "2022 — 2026",
};

export const SYSTEM_STATS = [
  { label: "Applications sent", value: "~1/day", note: "tracked across Superset + direct portals" },
  { label: "DSA practice", value: "Daily", note: "Java · Arrays, Strings, Sliding Window, Stack/Queue" },
  { label: "Target stack", value: "MERN + AI", note: "React · Next.js · Node · Express · MongoDB" },
  { label: "Relocation ready", value: "4 cities", note: "Bengaluru · Hyderabad · Noida · Gurgaon" },
];

export const TERMINAL_HELP = `Available commands:
  about       - who I am
  skills      - technical skills
  projects    - what I've built
  experience  - work history
  contact     - how to reach me
  resume      - download my resume
  clear       - clear the terminal
  help        - show this message`;
