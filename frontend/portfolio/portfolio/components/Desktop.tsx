"use client";

import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { User, Code2, Briefcase, TerminalSquare, Mail } from "lucide-react";
import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import Dock, { DockApp } from "./Dock";
import StartMenu, { AppId } from "./StartMenu";
import { FolderIcon, FileIcon } from "./FolderIcon";
import Window from "./Window";
import AboutWindow from "./windows/AboutWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import TerminalWindow from "./windows/TerminalWindow";
import ChatWindow from "./windows/ChatWindow";
import ContactWindow from "./windows/ContactWindow";
import ProjectDetailWindow from "./windows/ProjectDetailWindow";
import { PROFILE, PROJECTS } from "@/lib/data";

const APP_META: Record<AppId, { title: string; icon: string; width: number; height: number; accent: "teal" | "amber" }> = {
  about: { title: "about-me.md", icon: "👤", width: 480, height: 380, accent: "teal" },
  skills: { title: "skills.json", icon: "🧩", width: 460, height: 420, accent: "amber" },
  experience: { title: "experience.log", icon: "💼", width: 480, height: 320, accent: "amber" },
  terminal: { title: "terminal", icon: "⌨️", width: 520, height: 380, accent: "teal" },
  chat: { title: "ask-ai.exe", icon: "✨", width: 420, height: 460, accent: "amber" },
  contact: { title: "contact.form", icon: "✉️", width: 420, height: 460, accent: "teal" },
};

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  about: AboutWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  terminal: TerminalWindow,
  chat: ChatWindow,
  contact: ContactWindow,
};

const DOCK_APPS: { id: AppId; label: string; icon: React.ReactNode; bg: string }[] = [
  {
    id: "about",
    label: "About Me",
    icon: <User size={22} color="#fff" strokeWidth={2.25} />,
    bg: "linear-gradient(135deg, #FDBA74, #F97316)",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Code2 size={22} color="#fff" strokeWidth={2.25} />,
    bg: "conic-gradient(from 200deg, #5EEAD4, #818CF8, #F472B6, #FBBF24, #5EEAD4)",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase size={22} color="#fff" strokeWidth={2.25} />,
    bg: "linear-gradient(135deg, #60A5FA, #2563EB)",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <TerminalSquare size={22} color="#5EEAD4" strokeWidth={2.25} />,
    bg: "linear-gradient(160deg, #1c2230, #05070b)",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail size={22} color="#fff" strokeWidth={2.25} />,
    bg: "linear-gradient(135deg, #22D3EE, #0891B2)",
  },
];

type WinKind = "app" | "project";
type OpenWindow = { key: string; kind: WinKind; id: string; z: number; x: number; y: number; minimized: boolean; maximized: boolean };

let zCounter = 10;

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const launch = useCallback((kind: WinKind, id: string) => {
    setStartOpen(false);
    const key = `${kind}:${id}`;
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.key === key);
      zCounter += 1;
      if (existing) {
        return prev.map((w) => (w.key === key ? { ...w, z: zCounter, minimized: false } : w));
      }
      const offset = prev.length * 24;
      return [...prev, { key, kind, id, z: zCounter, x: 70 + offset, y: 70 + offset, minimized: false, maximized: false }];
    });
  }, []);

  const closeWindow = useCallback((key: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.key !== key));
  }, []);

  const minimizeWindow = useCallback((key: string) => {
    setOpenWindows((prev) => prev.map((w) => (w.key === key ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((key: string) => {
    setOpenWindows((prev) => prev.map((w) => (w.key === key ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const focusWindow = useCallback((key: string) => {
    zCounter += 1;
    setOpenWindows((prev) => prev.map((w) => (w.key === key ? { ...w, z: zCounter } : w)));
  }, []);

  const dockClick = useCallback(
    (id: string) => {
      const key = `app:${id}`;
      const existing = openWindows.find((w) => w.key === key);
      if (!existing || existing.minimized) {
        launch("app", id);
      } else {
        focusWindow(key);
      }
    },
    [openWindows, launch, focusWindow]
  );

  const focusedWindow = useMemo(() => {
    const visible = openWindows.filter((w) => !w.minimized);
    if (visible.length === 0) return undefined;
    return visible.reduce((top, w) => (w.z > top.z ? w : top), visible[0]);
  }, [openWindows]);

  const activeTitle = useMemo(() => {
    if (!focusedWindow) return undefined;
    if (focusedWindow.kind === "app") return APP_META[focusedWindow.id as AppId].title;
    const project = PROJECTS.find((p) => p.id === focusedWindow.id);
    return project?.name;
  }, [focusedWindow]);

  const dockApps: DockApp[] = [
    ...DOCK_APPS.map((app) => ({
      id: app.id,
      label: app.label,
      icon: app.icon,
      bg: app.bg,
      running: !!openWindows.find((w) => w.key === `app:${app.id}`),
    })),
    { id: "chat", label: "Ask Me", icon: null, special: true },
  ];

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden" onClick={() => startOpen && setStartOpen(false)}>
      <div className="wallpaper" />
      <div className="wallpaper-grain" />
      <div className="wallpaper-vignette" />

      <MenuBar activeTitle={activeTitle} onLogoClick={() => setStartOpen((v) => !v)} />

      {/* Desktop icons: projects as folders + resume file */}
      <div className="absolute top-14 left-3 flex flex-col gap-1 z-10">
        {PROJECTS.map((p) => (
          <FolderIcon key={p.id} label={p.name} onClick={() => launch("project", p.id)} />
        ))}
        <FileIcon label="Resume.pdf" href={PROFILE.resumeUrl} />
      </div>

      {/* Welcome text, background layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <p className="script text-2xl md:text-3xl mb-1" style={{ color: "var(--text)" }}>
          Hey, I&apos;m {PROFILE.name}! welcome to my
        </p>
        <h1 className="marker text-5xl md:text-7xl" style={{ color: "var(--text)" }}>
          PORTFOLIO
        </h1>
        <p className="text-sm mt-4 max-w-md" style={{ color: "var(--text-muted)" }}>
          {PROFILE.fullTitle}
        </p>
      </div>

      {/* Open windows */}
      <AnimatePresence>
        {openWindows
          .filter((w) => !w.minimized)
          .map((w) => {
            const meta = w.kind === "app" ? APP_META[w.id as AppId] : null;
            const project = w.kind === "project" ? PROJECTS.find((p) => p.id === w.id) : null;
            const title = meta ? meta.title : project?.name || "";
            const icon = meta ? meta.icon : "📁";
            const width = meta ? meta.width : 480;
            const height = meta ? meta.height : 460;
            const accent = meta ? meta.accent : "teal";

            let Content: React.ReactNode = null;
            if (w.kind === "app") {
              const Comp = APP_COMPONENTS[w.id as AppId];
              Content = <Comp />;
            } else if (project) {
              Content = <ProjectDetailWindow project={project} />;
            }

            return (
              <Window
                key={w.key}
                title={title}
                icon={icon}
                width={width}
                height={height}
                x={w.x}
                y={w.y}
                zIndex={w.z}
                accent={accent}
                maximized={w.maximized}
                onClose={() => closeWindow(w.key)}
                onMinimize={() => minimizeWindow(w.key)}
                onMaximize={() => toggleMaximize(w.key)}
                onFocus={() => focusWindow(w.key)}
              >
                {Content}
              </Window>
            );
          })}
      </AnimatePresence>

      {/* Start / spotlight menu */}
      <AnimatePresence>{startOpen && <StartMenu onLaunch={(id) => launch("app", id)} />}</AnimatePresence>

      <Dock apps={dockApps} onLaunch={(id) => (id === "chat" ? dockClick("chat") : dockClick(id))} />
    </div>
  );
}
