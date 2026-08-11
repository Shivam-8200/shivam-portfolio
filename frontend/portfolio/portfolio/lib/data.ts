// ─────────────────────────────────────────────────────────────
// SHIVAM.DEV — Canonical Portfolio Data
//
// Keep professional facts centralized here.
// UI components, Terminal, AI context, Projects, Finder,
// Recruiter Mode and other experiences should read from this data.
//
// IMPORTANT:
// - Do not add unverified experience or metrics here.
// - Keep this file aligned with the latest resume.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Shivam Prasad",

  shortName: "Shivam",

  fullTitle: "Full-Stack Developer • AI • Automation",

  tagline: "Computer Science graduate building full-stack products, AI systems, and automation workflows.",

  education: "B.Tech in Computer Science & Engineering",

  university: "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",

  graduation: "2026",

  location: "Uttar Pradesh, India",

  availability: "Open to opportunities",

  relocation: "Open to relocation across India",

  email: "sp.shivamprasad@gmail.com",

  github: "https://github.com/Shivam-8200",

  linkedin: "https://www.linkedin.com/in/shivam-prasad-8a3920269/",

  leetcode: "",

  resumeUrl: "https://drive.google.com/file/d/1hh4Vm_I51H51dXb4sad7Jn5Smvw-6a7l/view?usp=drive_link",

  bio: [
    "Computer Science graduate focused on full-stack development, AI-driven systems, and workflow automation.",
    "Built production-oriented projects across Next.js, React, Node.js, Gemini, Prisma, Inngest, n8n, Docker, and API-driven workflows.",
    "Currently focused on building reliable software systems, improving problem-solving skills, and turning repetitive workflows into useful automation.",
  ],
} as const;


// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────

export const SKILLS = {
  "Programming Languages": [
    "C",
    "C++",
    "Python",
    "Java",
    "JavaScript",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Express.js",
    "REST APIs",
  ],

  "AI & Automation": [
    "n8n",
    "Gemini API",
    "LLM Integration",
    "Agentic AI Pipelines",
    "Inngest",
    "Workflow Orchestration",
  ],

  "DevOps & Infrastructure": [
    "Docker",
    "Serverless Architecture",
    "Cloud Deployment",
  ],

  Databases: [
    "MongoDB",
    "MySQL",
    "Prisma",
  ],

  Tools: [
    "Git",
    "GitHub",
    "Postman",
    "Google Sheets API",
    "Telegram Bot API",
  ],

  "Computer Science": [
    "Data Structures",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "OOP",
  ],
} as const;


// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;

  stack: string[];

  github?: string;
  live?: string;

  highlight?: string;

  problem: string;
  solution: string;

  features: string[];

  architecture?: {
    summary: string;
    flow: string[];
  };

  engineeringDecisions?: string[];

  impact?: string[];

  screenshots?: string[];
};


export const PROJECTS: Project[] = [
  {
    id: "job-hunter",

    name: "Job Hunter",

    tagline: "Autonomous AI Job Hunting Pipeline",

    description:
      "A self-hosted automation workflow that orchestrates job discovery, AI-powered profile matching, persistent deduplication, and Telegram notifications.",

    stack: [
      "n8n",
      "Docker",
      "Gemini API",
      "Google Sheets API",
      "Telegram Bot API",
    ],

    github: "https://github.com/Shivam-8200/ai-job-hunter-urf-job-shikari.git",

    highlight:
      "22-node automation pipeline with AI-driven job matching and persistent deduplication.",

    problem:
      "Manually searching across multiple job sources and repeatedly reviewing similar listings creates repetitive work and makes it harder to focus on applications and preparation.",

    solution:
      "Built an automated workflow that discovers job opportunities, evaluates relevance using Gemini, prevents duplicate processing with Google Sheets, and sends relevant matches through Telegram.",

    features: [
      "Scheduled job discovery workflow",
      "AI-powered job-profile matching",
      "Persistent deduplication using Google Sheets",
      "Real-time Telegram notifications",
      "Self-hosted n8n workflow",
      "Multi-service orchestration",
    ],

    architecture: {
      summary:
        "Scheduled automation orchestrates job discovery, filtering, AI matching, deduplication, and notifications.",

      flow: [
        "Scheduled trigger",
        "Job source collection",
        "Job filtering / processing",
        "Gemini-powered relevance matching",
        "Google Sheets deduplication",
        "Telegram notification",
      ],
    },

    engineeringDecisions: [
      "Used self-hosted n8n to make the workflow independently controllable.",
      "Used Google Sheets as a lightweight persistent deduplication store.",
      "Used Telegram for immediate notification delivery.",
    ],

    impact: [
      "Built a 22-node automation pipeline.",
      "Reduced manual job-search effort by approximately 80%.",
    ],

    screenshots: [],
  },

  {
    id: "ai-career-coach",

    name: "AI Career Coach",

    tagline: "Full-Stack AI Career & Interview Platform",

    description:
      "A full-stack AI platform that provides personalized career guidance, interview preparation, resume-oriented insights, and AI-powered workflows.",

    stack: [
      "Next.js",
      "Prisma",
      "Inngest",
      "Gemini API",
      "Serverless",
    ],

    github: "https://github.com/Shivam-8200/ai-career-coach.git",
    live: "https://ai-career-coach-nu-liard.vercel.app/",

    highlight:
      "Full-stack AI platform with asynchronous workflow orchestration and persistent user data.",

    problem:
      "Generic career and interview resources do not adapt well to an individual candidate's skills, background, and progress.",

    solution:
      "Built a personalized AI career platform that combines user data, AI-generated guidance, and asynchronous workflows into one full-stack application.",

    features: [
      "Personalized AI career recommendations",
      "AI-powered interview preparation",
      "Persistent user data",
      "Asynchronous workflow orchestration",
      "Gemini-based inference",
      "Serverless application architecture",
    ],

    architecture: {
      summary:
        "The application combines a Next.js application layer with Gemini inference, Prisma data access, and Inngest-based asynchronous workflows.",

      flow: [
        "User interaction",
        "Next.js application layer",
        "Gemini AI inference",
        "Prisma data layer",
        "Inngest asynchronous workflows",
        "Personalized result",
      ],
    },

    engineeringDecisions: [
      "Used Prisma for structured database access.",
      "Used Inngest for asynchronous workflow orchestration.",
      "Separated AI inference from persistent application data.",
    ],

    impact: [
      "Improved workflow reliability through asynchronous orchestration.",
      "Reduced execution failures by 60% according to the current resume.",
    ],

    screenshots: [],
  },

  
];


// ─────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};


export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "TATA STEEL Pvt. Ltd.",

    role: "Web Development Intern",

    period: "May 2025 — July 2025",

    location: "India",

    points: [
      "Developed a complaint management web application with user registration and ticket tracking functionality using HTML, CSS, JavaScript, and SQL.",
      "Built and enhanced frontend UI components to improve form flow and user interaction experience.",
      "Designed backend logic with SQL for data storage and retrieval supporting the operational use case.",
    ],
  },
];


// ─────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────

export const EDUCATION = {
  institution: "Kalinga Institute of Industrial Technology",

  shortInstitution: "KIIT University",

  location: "Bhubaneswar",

  degree: "B.Tech in Computer Science and Engineering",

  period: "2022 — 2026",
} as const;


// ─────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────

export const CERTIFICATIONS = [
  {
    name: "AWS Cloud Virtual Internship",
    issuer: "AICTE",
  },

  {
    name: "Blockchain Developer Certification",
    issuer: "Timechain Labs",
  },
] as const;


// ─────────────────────────────────────────────────────────────
// SYSTEM / TERMINAL DATA
// ─────────────────────────────────────────────────────────────

export const SYSTEM_STATS = [
  {
    label: "Primary Focus",
    value: "Full Stack + AI",
    note: "Web applications, AI systems and workflow automation",
  },

  {
    label: "Current Education",
    value: "B.Tech CSE",
    note: "KIIT University · 2022–2026",
  },

  {
    label: "Featured Projects",
    value: "2",
    note: "Automation · AI ",
  },

  {
    label: "Availability",
    value: "Open",
    note: "Open to opportunities",
  },
] as const;


export const TERMINAL_HELP = `Available commands:

  whoami       - profile summary
  about        - about Shivam
  skills       - technical skills
  projects     - featured projects
  experience   - work experience
  education    - education
  certifications - certifications
  resume       - open resume
  github       - open GitHub
  contact      - contact information
  clear        - clear the terminal
  help         - show this message`;