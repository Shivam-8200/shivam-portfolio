"use client";

import { motion } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
} from "lucide-react";

type FinderItem = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
};

type FinderWindowProps = {
  onOpen: (
    id: "about" | "skills" | "experience"
  ) => void;
  onOpenEducation: () => void;
  onOpenCertifications: () => void;
};

export default function FinderWindow({
  onOpen,
  onOpenEducation,
  onOpenCertifications,
}: FinderWindowProps) {
  const items: FinderItem[] = [
    {
      id: "about",
      name: "About Me",
      description: "Profile, background and introduction",
      icon: <User size={22} />,
      action: () => onOpen("about"),
    },
    {
      id: "skills",
      name: "Skills",
      description: "Languages, web, AI and infrastructure",
      icon: <Code2 size={22} />,
      action: () => onOpen("skills"),
    },
    {
      id: "experience",
      name: "Experience",
      description: "Professional experience and responsibilities",
      icon: <Briefcase size={22} />,
      action: () => onOpen("experience"),
    },
    {
  id: "education",
  name: "Education",
  description: "B.Tech Computer Science & Engineering",
  icon: <GraduationCap size={22} />,
  action: onOpenEducation,
},
    {
  id: "certifications",
  name: "Certifications",
  description: "Courses and professional certifications",
  icon: <Award size={22} />,
  action: onOpenCertifications,
},
    {
  id: "resume",
  name: "Resume.pdf",
  description: "View the complete resume",
  icon: <FileText size={22} />,
  action: () => {
    window.open(
      "/files/Resume4me.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  },
},
  ];

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-5">
        <div
  className="graffiti text-xl"
  style={{ color: "var(--text)" }}
>
  Home
</div>

        <p
          className="text-xs mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Explore Shivam&apos;s profile, experience and technical background.
        </p>
      </div>

      {/* Finder grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={item.action}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.035,
              duration: 0.2,
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="text-left rounded-xl p-4 transition-colors"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,211,252,0.18), rgba(167,139,250,0.16))",
                color: "var(--accent)",
              }}
            >
              {item.icon}
            </div>

            <div
  className="graffiti text-base"
  style={{ color: "var(--text)" }}
>
  {item.name}
</div>

            <div
              className="text-[11px] leading-relaxed mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              {item.description}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom status */}
      <div
        className="mt-5 px-3 py-2.5 rounded-lg flex items-center gap-2"
        style={{
          background: "rgba(125,211,252,0.045)",
          border: "1px solid var(--border)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#4ade80" }}
        />

        <span
          className="mono text-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          workspace://shivam.dev/home
        </span>
      </div>
    </div>
  );
}